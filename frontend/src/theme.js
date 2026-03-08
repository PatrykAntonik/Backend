import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        custom: {
            baseWhite: 'rgba(255,255,255,0.95)',
        },
        // T030: darkened secondary from #9c27b0 (~3.56:1) to #7B1FA2 (~5.12:1) against white
        secondary: {
            main: '#7B1FA2',
        },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        custom: {
            baseWhite: 'rgba(18, 18, 18, 0.97)',
        },
        secondary: {
            // Lighter purple for sufficient contrast on dark backgrounds
            main: '#CE93D8',
        },
    },
});

const highContrastTheme = createTheme({
    palette: {
        mode: 'dark',
        custom: {
            baseWhite: 'rgba(0, 0, 0, 1)',
        },
        background: {
            default: '#000000',
            paper: '#000000',
        },
        text: {
            primary: '#FFD700',
            secondary: '#FFFFFF',
        },
        primary: {
            main: '#FFD700',
            contrastText: '#000000',
        },
        secondary: {
            main: '#FFD700',
            contrastText: '#000000',
        },
        action: {
            active: '#FFD700',
        },
    },
    components: {
        // Input borders: always thick white, yellow on focus
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    color: '#FFFFFF',
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#FFFFFF',
                        borderWidth: 2,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#FFD700',
                        borderWidth: 2,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#FFD700',
                        borderWidth: 2,
                    },
                    '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255,255,255,0.5)',
                    },
                },
            },
        },
        // Labels: yellow by default (matches text.primary), white when focused
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: '#FFD700',
                    '&.Mui-focused': {
                        color: '#FFFFFF',
                    },
                },
            },
        },
        // Select dropdown icon
        MuiSelect: {
            styleOverrides: {
                icon: {
                    color: '#FFD700',
                },
            },
        },
        // Checkboxes: yellow
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: '#FFD700',
                    '&.Mui-checked': {
                        color: '#FFD700',
                    },
                },
            },
        },
        // Buttons: yellow filled with black text; outlined in yellow
        MuiButton: {
            styleOverrides: {
                contained: {
                    backgroundColor: '#FFD700',
                    color: '#000000',
                    '&:hover': {
                        backgroundColor: '#FFFFFF',
                        color: '#000000',
                    },
                },
                outlined: {
                    borderColor: '#FFD700',
                    color: '#FFD700',
                    borderWidth: 2,
                    '&:hover': {
                        borderColor: '#FFFFFF',
                        color: '#FFFFFF',
                        borderWidth: 2,
                    },
                },
                text: {
                    color: '#FFD700',
                    '&:hover': {
                        color: '#FFFFFF',
                    },
                },
            },
        },
        // Cards/Paper: white border so they're visible against black page background
        MuiPaper: {
            styleOverrides: {
                root: {
                    border: '1px solid #FFFFFF',
                    backgroundImage: 'none',
                },
            },
        },
        // Accordion: white border
        MuiAccordion: {
            styleOverrides: {
                root: {
                    border: '1px solid #FFFFFF',
                    backgroundImage: 'none',
                    '&:before': {
                        backgroundColor: '#FFFFFF',
                    },
                },
            },
        },
        // Tabs: white text, yellow when selected
        MuiTab: {
            styleOverrides: {
                root: {
                    color: '#FFFFFF',
                    '&.Mui-selected': {
                        color: '#FFD700',
                    },
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    backgroundColor: '#FFD700',
                },
            },
        },
        // List items
        MuiListItem: {
            styleOverrides: {
                root: {
                    color: '#FFD700',
                },
            },
        },
        // Dividers: visible white
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: 'rgba(255,255,255,0.5)',
                },
            },
        },
        // AppBar: black bg, yellow border, yellow inherited text/icons
        // (color="primary" on AppBar would otherwise set inherited color to
        // primary.contrastText='#000000', making Typography and icons invisible)
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#000000',
                    color: '#FFD700',
                    borderBottom: '2px solid #FFD700',
                },
            },
        },
        // DataGrid text and borders
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    color: '#FFFFFF',
                    borderColor: '#FFFFFF',
                    '& .MuiDataGrid-columnHeaders': {
                        borderBottomColor: '#FFD700',
                        color: '#FFD700',
                    },
                    '& .MuiDataGrid-cell': {
                        borderBottomColor: 'rgba(255,255,255,0.3)',
                    },
                    '& .MuiDataGrid-row:hover': {
                        backgroundColor: 'rgba(255,215,0,0.1)',
                    },
                },
            },
        },
        // Stepper labels
        MuiStepLabel: {
            styleOverrides: {
                label: {
                    color: '#FFFFFF',
                    '&.Mui-active': {
                        color: '#FFD700',
                    },
                    '&.Mui-completed': {
                        color: '#FFD700',
                    },
                },
            },
        },
        MuiStepIcon: {
            styleOverrides: {
                root: {
                    color: '#FFFFFF',
                    '&.Mui-active': {
                        color: '#FFD700',
                    },
                    '&.Mui-completed': {
                        color: '#FFD700',
                    },
                },
            },
        },
        // Drawer
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#000000',
                    borderRight: '2px solid #FFD700',
                },
            },
        },
        // Menu items (mobile nav, Select dropdowns)
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    color: '#FFD700',
                    '&:hover': {
                        backgroundColor: 'rgba(255,215,0,0.15)',
                    },
                    '&.Mui-selected': {
                        backgroundColor: 'rgba(255,215,0,0.2)',
                        color: '#FFD700',
                    },
                    '&.Mui-selected:hover': {
                        backgroundColor: 'rgba(255,215,0,0.3)',
                    },
                },
            },
        },
        // Menu container
        MuiMenu: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#000000',
                    border: '1px solid #FFFFFF',
                },
            },
        },
        // Helper and error text below inputs
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    color: '#FFD700',
                    '&.Mui-error': {
                        color: '#FF9999',
                    },
                },
            },
        },
        // Icon buttons (hamburger menu, drawer close, password visibility, theme toggle)
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: '#FFD700',
                    '&:hover': {
                        color: '#FFFFFF',
                        backgroundColor: 'rgba(255,215,0,0.1)',
                    },
                },
            },
        },
        // Icons inside list items (drawer nav)
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: '#FFD700',
                },
            },
        },
        // List item buttons (hover state in drawer nav, questions list)
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    color: '#FFD700',
                    '&:hover': {
                        backgroundColor: 'rgba(255,215,0,0.1)',
                        color: '#FFFFFF',
                    },
                },
            },
        },
        // Link elements
        MuiLink: {
            styleOverrides: {
                root: {
                    color: '#FFD700',
                    textDecorationColor: '#FFD700',
                    '&:hover': {
                        color: '#FFFFFF',
                        textDecorationColor: '#FFFFFF',
                    },
                },
            },
        },
        // Switch toggle (hospital registration)
        MuiSwitch: {
            styleOverrides: {
                switchBase: {
                    color: '#FFFFFF',
                    '&.Mui-checked': {
                        color: '#FFD700',
                    },
                    '&.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#FFD700',
                        opacity: 0.7,
                    },
                },
                track: {
                    backgroundColor: 'rgba(255,255,255,0.3)',
                },
            },
        },
        // Avatar (lock icon circles on login/register)
        MuiAvatar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#FFD700',
                    color: '#000000',
                },
            },
        },
        // Tooltip
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: '#FFD700',
                    color: '#000000',
                    border: '1px solid #FFFFFF',
                    fontSize: '0.85rem',
                },
                arrow: {
                    color: '#FFD700',
                },
            },
        },
        // Dialog (delete confirmation)
        MuiDialog: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#000000',
                    border: '2px solid #FFFFFF',
                },
            },
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    color: '#FFD700',
                },
            },
        },
        MuiDialogContentText: {
            styleOverrides: {
                root: {
                    color: '#FFFFFF',
                },
            },
        },
    },
});

const themes = {
    light: lightTheme,
    dark: darkTheme,
    'high-contrast': highContrastTheme,
};

export function getTheme(mode) {
    return themes[mode] || lightTheme;
}
