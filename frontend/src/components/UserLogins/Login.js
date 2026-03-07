import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Loader from "../Reusable/Loader";
import Message from "../Reusable/Message";
import {login} from "../../actions/userActions";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@mui/material/Link';
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import {useNavigate} from 'react-router-dom';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";


function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const userLogin = useSelector(state => state.userLogin);
    const {loading, error, userInfo} = userLogin;
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    // T014: unique page title for screen reader navigation
    useEffect(() => {
        document.title = 'Login | TransplantApp';
    }, []);

    useEffect(() => {
        let timer;
        if (userInfo) {
            setSnackbarOpen(true);
            timer = setTimeout(() => {
                navigate('/account');
            }, 2000);
        }
        return () => clearTimeout(timer);
    }, [userInfo, navigate]);


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Box>
            {loading && <Loader/>}
            {error && <Message severity="error">{error}</Message>}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            >
                <Alert severity="success" variant="filled">Login Successful</Alert>
            </Snackbar>
            <Container maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'custom.baseWhite', borderRadius: 5, padding: 5,
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box onSubmit={submitHandler} component="form">
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email} onChange={(e) => setEmail(e.target.value)}
                        />
                        {/* T013: added id="password" to OutlinedInput and htmlFor="password" to InputLabel
                            so the label is programmatically associated with the input */}
                        <FormControl
                            margin="normal"
                            fullWidth
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        >
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <OutlinedInput
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                {/* T011: fixed nested <a> — single MuiLink with component={RouterLink} */}
                                <Link component={RouterLink} to={'/register'} variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default Login;
