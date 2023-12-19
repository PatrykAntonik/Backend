import axios from "axios";
import {
    DONATION_LIST_FAIL,
    DONATION_LIST_REQUEST,
    DONATION_LIST_SUCCESS,
    DONATION_DETAILS_FAIL,
    DONATION_DETAILS_REQUEST,
    DONATION_DETAILS_SUCCESS,
    DONATION_LIST_MY_FAIL,
    DONATION_LIST_MY_REQUEST,
    DONATION_LIST_MY_SUCCESS,
    QUESTION_REQUEST,
    QUESTION_SUCCESS,
    QUESTION_FAIL,
    DONATION_CREATE_REQUEST,
    DONATION_CREATE_SUCCESS,
    DONATION_CREATE_FAIL,




} from "../constants/donationConstants";

export const listDonations = () => async (dispatch, getState) => {
    try {
        dispatch({type: DONATION_LIST_REQUEST});
        const {userLogin: {userInfo}} = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const {data} = await axios.get("/api/donations", config);
        dispatch({type: DONATION_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({
            type: DONATION_LIST_FAIL,
            payload: error.message && error.response.data.detail ? error.response.data.detail : error.message,
        });
    }
}

export const listDonationDetails = (donationId) => async (dispatch, getState) => {
    try {
        dispatch({type: DONATION_DETAILS_REQUEST, payload: donationId});
        const {userLogin: {userInfo}} = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const {data} = await axios.get("/api/donations/" + donationId, config);
        dispatch({type: DONATION_DETAILS_SUCCESS, payload: data});
    } catch (error) {
        dispatch({
            type: DONATION_DETAILS_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
}

export const listMyDonations = () => async (dispatch, getState) => {
    try {
        dispatch({type: DONATION_LIST_MY_REQUEST});
        const {
            userLogin: {userInfo},
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const {data} = await axios.get("/api/donations/mydonations/", config);
        dispatch({type: DONATION_LIST_MY_SUCCESS, payload: data});
    } catch (error) {
        dispatch({
            type: DONATION_LIST_MY_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
}


export const ListQuestion = (donationType = '') => async (dispatch) => {
    try {
        dispatch({type: QUESTION_REQUEST});
        const {data} = await axios.get(`/api/donations/questions/?donation_type=${donationType}`);
        dispatch({
            type: QUESTION_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: QUESTION_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const listDonationResponses = (donationId) => async (dispatch, getState) => {
    try {
        dispatch({type: 'DONATION_RESPONSES_REQUEST'});

        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const {data} = await axios.get(`/api/donations/${donationId}/responses/`, config);

        dispatch({
            type: 'DONATION_RESPONSES_SUCCESS',
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: 'DONATION_RESPONSES_FAIL',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};


export const createDonationWithResponses = (donationData) => async (dispatch, getState) => {
    try {
        dispatch({type: DONATION_CREATE_REQUEST});

        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const requestData = {
            donation_type: donationData.donation_type,
            responses: donationData.responses,
        };

        const {data: donation} = await axios.post(
            `/api/donations/create/`,
            requestData,
            config
        );

        dispatch({type: DONATION_CREATE_SUCCESS, payload: donation});
    } catch (error) {
        dispatch({
            type: DONATION_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const deleteDonation = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'DONATION_DELETE_REQUEST' });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`/api/donations/${id}/delete/`, config);

        dispatch({ type: 'DONATION_DELETE_SUCCESS' });
    } catch (error) {
        dispatch({
            type: 'DONATION_DELETE_FAIL',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};




