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
    donationDeleteReducer,
} from "./reducers/donationReducers";
import {
    userLoginReducers,
    userRegisterReducers,
    userDetailsReducers,
    userUpdateProfileReducers,
    userListReducers,
} from "./reducers/userReducers";
import { themeReducer } from "./reducers/themeReducer";

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
    donationDelete: donationDeleteReducer,
    theme: themeReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo") ?
    JSON.parse(localStorage.getItem("userInfo")) :
    null;

const VALID_THEMES = ['light', 'dark', 'high-contrast'];

const themeFromStorage = (() => {
    const stored = localStorage.getItem('transplantapp-theme');
    if (VALID_THEMES.includes(stored)) return stored;
    // No stored preference — respect OS-level appearance setting
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
})();

const initialState = {
    userLogin: {userInfo: userInfoFromStorage},
    theme: {activeTheme: themeFromStorage},
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
