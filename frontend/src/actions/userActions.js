import {
    USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,

    USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_RESET,

    USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_RESET,

    USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL,

} from "../constants/UserConstants";
import api from '../utils/api';

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
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
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
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
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
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
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
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
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
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        })
    }
}
