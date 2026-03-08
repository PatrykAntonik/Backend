import { SET_THEME } from '../constants/themeConstants';

const initialState = { activeTheme: 'light' };

export const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_THEME:
            return { activeTheme: action.payload.theme };
        default:
            return state;
    }
};
