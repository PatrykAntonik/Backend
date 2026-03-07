import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from "../actions/userActions";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const drawerWidth = 240;

// Changed from styled('main') to styled('div') — the <main> landmark now lives in App.js
const LayoutSpacer = styled('div', {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

function HideOnScroll(props) {
    const {children, window} = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;
    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails
    const isHospital = userInfo?.is_hospital;
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const firstDrawerItemRef = React.useRef(null);
    const [logoutSnackbarOpen, setLogoutSnackbarOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const logoutHandler = () => {
        setLogoutSnackbarOpen(true);
        setTimeout(() => {
            dispatch(logout());
            navigate('/');
        }, 1500);
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    // T010: move focus into drawer when it opens so keyboard users land inside it
    React.useEffect(() => {
        if (open && firstDrawerItemRef.current) {
            firstDrawerItemRef.current.focus();
        }
    }, [open]);

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <HideOnScroll>
                <AppBar position="fixed" open={open}>
                    <Toolbar>

                        {
                            userInfo && (
                                isHospital ? (
                                    <IconButton
                                        color="inherit"
                                        aria-label="open drawer"
                                        onClick={handleDrawerOpen}
                                        edge="start"
                                        sx={{mr: 2, ...(open && {display: 'none'})}}
                                    >
                                        <MenuIcon/>
                                    </IconButton>
                                ) : (
                                    <>
                                        {/* T009: corrected aria-label — opens a nav menu, not the user account */}
                                        <IconButton
                                            size="large"
                                            aria-label="open navigation menu"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true"
                                            onClick={handleOpenNavMenu}
                                            color="inherit"
                                            sx={{
                                                display: {xs: 'flex', sm: 'none', md: 'none'}
                                            }}
                                        >
                                            <MenuIcon/>
                                        </IconButton>
                                        <Menu
                                            id="menu-appbar"
                                            anchorEl={anchorElNav}
                                            anchorOrigin={{
                                                vertical: 'bottom', horizontal: 'left',
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top', horizontal: 'left',
                                            }}
                                            open={Boolean(anchorElNav)}
                                            onClose={handleCloseNavMenu}
                                            sx={{
                                                display: {xs: 'block', md: 'none'},
                                            }}
                                        >
                                            <MenuItem onClick={handleCloseNavMenu}>
                                                <Link to={`/account`} style={{textDecoration: 'none', color: 'inherit'}}>
                                                    <Typography textAlign="center">
                                                        Account
                                                    </Typography>
                                                </Link>
                                            </MenuItem>
                                            <MenuItem onClick={handleCloseNavMenu}>
                                                <Link to={`/donation/mydonations`}
                                                      style={{textDecoration: 'none', color: 'inherit'}}>
                                                    <Typography textAlign="center">
                                                        Donations
                                                    </Typography>
                                                </Link>
                                            </MenuItem>
                                        </Menu>
                                    </>
                                )
                            )
                        }

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textDecoration: 'none',
                                color: 'inherit',
                                marginLeft: {xs: 'auto', md: 10},
                                marginRight: {xs: 'auto', md: 0},
                            }}
                            component={Link}
                            to={``}
                        >
                            <VolunteerActivismIcon
                                fontSize="large"
                                sx={{
                                    mr: 1,
                                    display: { xs: 'none', sm: 'block'}
                                }}
                            />
                            <Typography
                                component="span"
                                variant="h6"
                                noWrap
                                sx={{
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.1rem',
                                }}
                            >
                                TransplantApp
                            </Typography>
                        </Box>

                        {/* T006: nav landmark for desktop main navigation links */}
                        <Box
                            component="nav"
                            aria-label="Main navigation"
                            sx={{marginLeft: "2rem", flexGrow: 1, display: {xs: 'none', md: 'flex'}}}
                        >
                            {userInfo && !isHospital ? (
                                <>
                                    <Button
                                        component={Link}
                                        to={`/account`}
                                        sx={{my: 2, color: 'white', display: 'block'}}
                                    >
                                        Account
                                    </Button>
                                    <Button
                                        component={Link}
                                        to={`/donation/mydonations`}
                                        sx={{my: 2, color: 'white', display: 'block'}}
                                    >
                                        Donations
                                    </Button>

                                </>
                            ) : (
                                <Box/>
                            )}
                        </Box>
                        <Box sx={{flexGrow: 0, marginRight: {xs: '0', md: 5},}}>
                            {userInfo ? (
                                <Button
                                    onClick={logoutHandler}
                                    sx={{
                                        textDecoration: 'none',
                                        color: 'white',
                                        border: '2px solid white',
                                        width: "7rem",
                                    }}
                                    variant="outlined"
                                    size="large"
                                >
                                    Logout
                                </Button>
                            ) : (
                                <Button
                                    component={Link}
                                    to={`/login`}
                                    sx={{
                                        textDecoration: 'none',
                                        color: 'white',
                                        border: '2px solid white',
                                        width: "7rem",
                                    }}
                                    variant="outlined"
                                    size="large"
                                >
                                    Login
                                </Button>
                            )}
                        </Box>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    {/* T008: aria-label for icon-only close button */}
                    <IconButton onClick={handleDrawerClose} aria-label="close navigation drawer">
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                {/* T006: nav landmark for drawer navigation links */}
                <nav aria-label="Drawer navigation">
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to={`/account`} ref={firstDrawerItemRef}>
                                <ListItemIcon>
                                    <InboxIcon/>
                                </ListItemIcon>
                                <ListItemText primary={'Account'}/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to={`/donation/`}>
                                <ListItemIcon>
                                    <InboxIcon/>
                                </ListItemIcon>
                                <ListItemText primary={'All Donations'}/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to={`/users/`}>
                                <ListItemIcon>
                                    <InboxIcon/>
                                </ListItemIcon>
                                <ListItemText primary={'Donors'}/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to={`/questions/`}>
                                <ListItemIcon>
                                    <InboxIcon/>
                                </ListItemIcon>
                                <ListItemText primary={'Donation questions'}/>
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider/>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to={`/contact`}>
                                <ListItemIcon>
                                    <InboxIcon/>
                                </ListItemIcon>
                                <ListItemText primary={'Contact'}/>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </nav>
            </Drawer>
            <LayoutSpacer open={open}>
                <DrawerHeader/>
            </LayoutSpacer>
            <Snackbar
                open={logoutSnackbarOpen}
                autoHideDuration={1500}
                onClose={() => setLogoutSnackbarOpen(false)}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            >
                <Alert severity="info" variant="filled">Logged out successfully</Alert>
            </Snackbar>
        </Box>
    )
        ;
}
