import React from 'react';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ContrastIcon from '@mui/icons-material/Contrast';
import {useDispatch, useSelector} from 'react-redux';
import {setTheme} from '../actions/themeActions';
import {THEME_CYCLE} from '../constants/themeConstants';

const THEME_ICONS = {
    light: <LightModeIcon/>,
    dark: <DarkModeIcon/>,
    'high-contrast': <ContrastIcon/>,
};

const THEME_LABELS = {
    light: 'light',
    dark: 'dark',
    'high-contrast': 'high contrast',
};

export default function ThemeToggleButton() {
    const dispatch = useDispatch();
    const activeTheme = useSelector((state) => state.theme.activeTheme);

    const currentIndex = THEME_CYCLE.indexOf(activeTheme);
    const nextTheme = THEME_CYCLE[(currentIndex + 1) % THEME_CYCLE.length];

    const handleClick = () => {
        dispatch(setTheme(nextTheme));
    };

    return (
        <IconButton
            onClick={handleClick}
            color="inherit"
            aria-label={`Current theme: ${THEME_LABELS[activeTheme]}. Switch to ${THEME_LABELS[nextTheme]}`}
        >
            {THEME_ICONS[activeTheme]}
        </IconButton>
    );
}
