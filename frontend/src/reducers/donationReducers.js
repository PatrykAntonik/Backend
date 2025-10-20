import {
    DONATION_LIST_FAIL, DONATION_LIST_REQUEST, DONATION_LIST_SUCCESS,

    DONATION_DETAILS_FAIL, DONATION_DETAILS_REQUEST, DONATION_DETAILS_SUCCESS,

    DONATION_LIST_MY_FAIL, DONATION_LIST_MY_REQUEST, DONATION_LIST_MY_SUCCESS,

    QUESTION_REQUEST, QUESTION_SUCCESS, QUESTION_FAIL,

    DONATION_CREATE_REQUEST, DONATION_CREATE_SUCCESS, DONATION_CREATE_FAIL,
    DONATION_DELETE_REQUEST, DONATION_DELETE_SUCCESS, DONATION_DELETE_FAIL,

} from "../constants/donationConstants";

export const donationListReducers = (state = {donations: []}, action) => {
    switch (action.type) {
        case DONATION_LIST_REQUEST:
            return {
                loading: true, donations: []
            };
        case DONATION_LIST_SUCCESS:
            return {
                loading: false, success: true, donations: action.payload,
            };
        case DONATION_LIST_FAIL:
            return {
                loading: false, error: action.payload,
            };
        default:
            return state;
    }
}


export const donationDetailsReducers = (state = {donation: {}}, action) => {
    switch (action.type) {
        case DONATION_DETAILS_REQUEST :
            return {
                loading: true, ...state
            };
        case DONATION_DETAILS_SUCCESS:
            return {
                loading: false, success: true, donation: action.payload,
            };
        case DONATION_DETAILS_FAIL:
            return {
                loading: false, error: action.payload,
            };
        default:
            return state;
    }
}

export const donationListMyReducers = (state = {donations: []}, action) => {
    switch (action.type) {
        case DONATION_LIST_MY_REQUEST:
            return {
                loading: true, donations: []
            };
        case DONATION_LIST_MY_SUCCESS:
            return {
                loading: false, success: true, donations: action.payload,
            };
        case DONATION_LIST_MY_FAIL:
            return {
                loading: false, error: action.payload,
            };
        default:
            return state;
    }
}

export const questionReducers = (state = {questions: []}, action) => {
    switch (action.type) {
        case QUESTION_REQUEST:
            return {
                loading: true, questions: []
            };
        case QUESTION_SUCCESS:
            return {
                loading: false, success: true, questions: action.payload,
            };
        case QUESTION_FAIL:
            return {
                loading: false, error: action.payload,
            };
        default:
            return state;
    }
}

export const donationResponsesReducer = (state = {responses: []}, action) => {
    switch (action.type) {
        case 'DONATION_RESPONSES_REQUEST':
            return {loading: true};
        case 'DONATION_RESPONSES_SUCCESS':
            return {loading: false, responses: action.payload};
        case 'DONATION_RESPONSES_FAIL':
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const donationCreateReducers = (state = {}, action) => {
    switch (action.type) {
        case DONATION_CREATE_REQUEST:
            return {
                loading: true,
            };
        case DONATION_CREATE_SUCCESS:
            return {
                loading: false, success: true, donation: action.payload,
            };
        case DONATION_CREATE_FAIL:
            return {
                loading: false, error: action.payload,
            };
        default:
            return state;
    }
}

export const donationDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case 'DONATION_DELETE_REQUEST':
            return {loading: true};
        case 'DONATION_DELETE_SUCCESS':
            return {loading: false, success: true};
        case 'DONATION_DELETE_FAIL':
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};
