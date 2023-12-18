import {legacy_createStore as createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {
    donationListReducers,
    donationDetailsReducers,
    donationListMyReducers,
    questionReducers,
    donationCreateReducers,
    donationResponsesReducer,
} from "./reducers/donationReducers";
import {
    userLoginReducers,
    userRegisterReducers,
    userDetailsReducers,
    userUpdateProfileReducers,
    userListReducers,
} from "./reducers/userReducers";

const reducer = combineReducers({
    donationList: donationListReducers,
    donationDetails: donationDetailsReducers,
    userLogin: userLoginReducers,
    userRegister: userRegisterReducers,
    userDetails: userDetailsReducers,
    userUpdateProfile: userUpdateProfileReducers,
    donationListMy: donationListMyReducers,
    question: questionReducers,
    donationResponses: donationResponsesReducer,
    userList: userListReducers,
    donationCreate: donationCreateReducers,
});

const userInfoFromStorage = localStorage.getItem("userInfo") ?
    JSON.parse(localStorage.getItem("userInfo")) :
    null;

const initialState = {
    userLogin: {userInfo: userInfoFromStorage},

};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;