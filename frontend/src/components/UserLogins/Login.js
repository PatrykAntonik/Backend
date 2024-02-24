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


function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const userLogin = useSelector(state => state.userLogin);
    const {loading, error, userInfo} = userLogin;
    const [message, setMessage] = useState("");

    useEffect(() => {
        let timer;
        if (userInfo) {
            setMessage('Login Successful');
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
            {message && <Message variant="error">{message}</Message>}
            {error && <Message severity="error">{error}</Message>}
            <Container maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 5, padding: 5,
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
                            autoFocus value={email} onChange={(e) => setEmail(e.target.value)}
                        />
                        {/*<TextField*/}
                        {/*    margin="normal"*/}
                        {/*    required*/}
                        {/*    fullWidth*/}
                        {/*    name="password"*/}
                        {/*    label="Password"*/}
                        {/*    type="password" id="password"*/}
                        {/*    autoComplete="current-password" value={password}*/}
                        {/*    onChange={(e) => setPassword(e.target.value)}*/}
                        {/*/>*/}
                        <FormControl
                            margin="normal"
                            fullWidth
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        >
                            <InputLabel>Password</InputLabel>
                            <OutlinedInput
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
                                <RouterLink to={'/register'}>
                                    <Link variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </RouterLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default Login;
