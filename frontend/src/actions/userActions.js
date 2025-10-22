import {
    USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,

    USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_RESET,

    USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_RESET,

    USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL,

} from "../constants/UserConstants";
import api from '../utils/api';

const extractErrorMessage = (error) => {
    const response = error?.response;
    const data = response?.data;

    // No server response (network error, CORS, timeout)
    if (!response) {
        if (error?.message) return error.message;
        try { return String(error); } catch { return 'Unexpected error'; }
    }

    // If backend returned plain text
    if (typeof data === 'string') {
        return data;
    }

    // Prefer common fields
    if (data?.detail) return data.detail;
    if (data?.message) return data.message;
    if (data?.error) return data.error;

    // Root-level array of errors
    if (Array.isArray(data) && data.length > 0) {
        const firstItem = data[0];
        if (typeof firstItem === 'string') return firstItem;
        if (firstItem?.message) return firstItem.message;
    }

    // DRF validation error shape: { field: ["msg"] } or { non_field_errors: ["msg"] }
    if (data && typeof data === 'object') {
        const keys = Object.keys(data);
        for (const key of keys) {
            const value = data[key];
            if (Array.isArray(value) && value.length > 0) {
                const firstValue = value[0];
                if (typeof firstValue === 'string') {
                    return key === 'non_field_errors' ? firstValue : `${key}: ${firstValue}`;
                }
                if (firstValue?.message) {
                    return key === 'non_field_errors' ? firstValue.message : `${key}: ${firstValue.message}`;
                }
            }
            if (typeof value === 'string' && value) {
                return key === 'non_field_errors' ? value : `${key}: ${value}`;
            }
        }
    }

    // Fallbacks
    if (response?.statusText) return response.statusText;
    return error?.message || 'Unexpected error';
}

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const {data} = await api.post("/api/users/login/", {'email': email, 'password': password}, config);
        dispatch({
            type: USER_LOGIN_SUCCESS, payload: data,
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: extractErrorMessage(error),
        });
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({type: USER_LOGOUT});
    dispatch({type: USER_DETAILS_RESET});
}

export const register = (email, password, first_name, last_name, city, zip_code, phone_number, is_hospital, hospital_name, website_url) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const {data} = await api.post("/api/users/register/", {
            'email': email,
            'password': password,
            'first_name': first_name,
            'last_name': last_name,
            'city': city,
            'zip_code': zip_code,
            'phone_number': phone_number,
            'is_hospital': is_hospital,
            'hospital_name': hospital_name,
            'website_url': website_url
        }, config);
        dispatch({
            type: USER_REGISTER_SUCCESS, payload: data,
        });
        dispatch({
            type: USER_LOGIN_SUCCESS, payload: data,
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: extractErrorMessage(error),
        });
    }
}


export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json', Authorization: `Bearer ${userInfo.token}`
            }
        }

        const url = id === 'profile' ? '/api/users/profile/' : `/api/users/${id}/`;
        const {data} = await api.get(url, config)

        dispatch({
            type: USER_DETAILS_SUCCESS, payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: extractErrorMessage(error),
        })
    }
}

export const UpdateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json', Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await api.put(`/api/users/profile/`, user, config)

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS, payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS, payload: data,
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: extractErrorMessage(error),
        })
    }
}

export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST
        })

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json', Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await api.get(`/api/users/`, config)

        dispatch({
            type: USER_LIST_SUCCESS, payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: extractErrorMessage(error),
        })
}
}
