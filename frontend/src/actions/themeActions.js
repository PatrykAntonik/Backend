import { SET_THEME } from '../constants/themeConstants';

export const setTheme = (theme) => (dispatch) => {
    localStorage.setItem('transplantapp-theme', theme);
    dispatch({ type: SET_THEME, payload: { theme } });
};
