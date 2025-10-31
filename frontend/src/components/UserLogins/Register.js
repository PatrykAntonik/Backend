import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Loader from "../Reusable/Loader";
import Message from "../Reusable/Message";
import {register} from "../../actions/userActions";
import {Link as RouterLink} from 'react-router-dom';
import {Box, Button, Container, CssBaseline, Grid, Link, Switch, TextField, Tooltip, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import InfoIcon from '@mui/icons-material/Info';
import {CustomTooltip} from "../Reusable/CustomTooltip";
import {isEmail, isMobilePhone, isURL, isPostalCode, isStrongPassword,} from 'validator';
import {useNavigate} from "react-router-dom";


function Register() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [is_hospital, setIsHospital] = useState(false);
    const [hospital_name, setHospitalName] = useState("");
    const [website_url, setWebsiteUrl] = useState("");
    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [urlError, setUrlError] = useState('');
    const [zipCodeError, setZipCodeError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const userRegister = useSelector(state => state.userRegister);
    const {loading, error, userInfo} = userRegister;
    const isLogged = useSelector(state => state.userLogin.userInfo);
    const navigate = useNavigate();


    const validateZipCode = (zip) => {
        if (!isPostalCode(zip, 'PL')) {
            setZipCodeError('Invalid zip code');
        } else {
            setZipCodeError('');
        }
    }

    const validateEmail = (email) => {
        if (!isEmail(email)) {
            setEmailError('Invalid email address');
        } else {
            setEmailError('');
        }
    };

    const validatePhoneNumber = (phone) => {
        if (!isMobilePhone(phone, 'any', {strictMode: false})) {
            setPhoneError('Invalid phone number');
        } else {
            setPhoneError('');
        }
    };

    const validateWebsiteUrl = (url) => {
        if (!isURL(url, {require_protocol: true})) {
            setUrlError('Invalid website URL');
        } else {
            setUrlError('');
        }
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        if (!isStrongPassword(newPassword, {
            minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0,
        })) {
            setPasswordError('Password must contain at least 6 characters, 1 lowercase, 1 uppercase and 1 number');
        } else {
            setPasswordError('');
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);

        if (newConfirmPassword !== password) {
            setConfirmPasswordError('Passwords do not match');
        } else {
            setConfirmPasswordError('');
        }
    };


    useEffect(() => {
        let timer;
        if (isLogged) {
            timer = setTimeout(() => {
                setMessage('Registration  Successful');
                navigate('/account');
            }, 2000);
        }
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [isLogged, navigate]);


    const handleChange = (event) => {
        setIsHospital(event.target.checked);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        setMessage("");
        if (emailError || phoneError || urlError || zipCodeError ||
            passwordError || confirmPasswordError || password !== confirmPassword) {
            setTimeout(() => {
                setMessage("Please ensure all fields are correctly filled out.");
            }, 0);
            return;
        }
        dispatch(register(email, password, firstName, lastName, city, zipCode, phoneNumber, is_hospital, hospital_name, website_url));
    };


    return (
        <Box>
            {loading && <Loader/>}
            {message && <Message variant="error">{message}</Message>}
            {error && <Message variant="error">{error}</Message>}
            <Container maxWidth="sm">
                <CssBaseline/>
                <Box
                    sx={{
                        marginBottom: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'custom.baseWhite', borderRadius: 5, padding: 5,

                    }}
                >
                    <CustomTooltip title={is_hospital ? "Hospital" : "User"}>
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            {is_hospital ? "H" : "U"}
                        </Avatar>
                    </CustomTooltip>
                    <Typography variant="h5">
                        Sign up
                    </Typography>

                    <Box onSubmit={submitHandler} component="form" sx={{mt: 3}}>
                        <Grid
                            container
                            spacing={2}
                        >
                            <Grid item xs={12} sm={6}
                                  sx={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: "flex-end",
                                      flexDirection: 'row'
                                  }}>
                                <Typography
                                    variant="h6"
                                >
                                    Check for hospital registration
                                </Typography>
                                <CustomTooltip
                                    title="Hospital registrations are subject to admin review before permissions are granted.">
                                    <InfoIcon color="info"/>
                                </CustomTooltip>

                            </Grid>
                            <Grid item xs={12} sm={6} sx={{textAlign: 'center'}}>
                                <Switch
                                    checked={is_hospital}
                                    onChange={handleChange}
                                    color="info"
                                    defaultChecked
                                />
                            </Grid>

                            {is_hospital && (
                                <>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            margin="dense"
                                            required
                                            fullWidth
                                            id="hospital_name"
                                            label="Hospital Name"
                                            name="hospital_name"
                                            autoComplete="hospital_name"
                                            autoFocus value={hospital_name}
                                            onChange={(e) => setHospitalName(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            margin="dense"
                                            required
                                            fullWidth
                                            id="website_url"
                                            label="Website URL"
                                            name="website_url"
                                            autoComplete="website_url"
                                            value={website_url}
                                            error={!!urlError}
                                            helperText={urlError}
                                            onChange={(e) => {
                                                setWebsiteUrl(e.target.value);
                                                validateWebsiteUrl(e.target.value);
                                            }}
                                        />
                                    </Grid>
                                </>
                            )}
                            {!is_hospital && (
                                <>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            margin="dense"
                                            required
                                            fullWidth
                                            id="first_name"
                                            label="First Name"
                                            name="first_name"
                                            autoComplete="first_name"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            margin="dense"
                                            fullWidth
                                            id="last_name"
                                            label="Last Name"
                                            name="last_name"
                                            autoComplete="family-name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </Grid>
                                </>
                            )}

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="dense"
                                    required
                                    fullWidth
                                    id="city"
                                    label="City"
                                    name="city"
                                    autoComplete="address-level2"
                                    value={city} onChange={(e) => setCity(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="dense"
                                    required
                                    fullWidth
                                    id="zip_code"
                                    label="Zip Code"
                                    name="zip_code"
                                    autoComplete="postal-code"
                                    value={zipCode}
                                    onChange={(e) => {
                                        setZipCode(e.target.value);
                                        validateZipCode(e.target.value);
                                    }}
                                    error={!!zipCodeError}
                                    helperText={zipCodeError}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="dense"
                                    required
                                    fullWidth
                                    id="phone_number"
                                    label="Phone Number"
                                    name="phone_number"
                                    autoComplete="phone"
                                    value={phoneNumber}
                                    error={!!phoneError}
                                    helperText={phoneError}
                                    onChange={(e) => {
                                        setPhoneNumber(e.target.value);
                                        validatePhoneNumber(e.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="dense"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    error={!!emailError}
                                    helperText={emailError}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        validateEmail(e.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password" id="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    error={!!passwordError}
                                    helperText={passwordError}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="passwordConfirm"
                                    label="Confirm Password"
                                    type="password" id="passwordConfirm"
                                    autoComplete="current-password"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    error={!!confirmPasswordError}
                                    helperText={confirmPasswordError}/>
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <RouterLink to={'/login'}>
                                    <Link variant="body2">
                                        {"Already have an account? Sign in"}
                                    </Link>
                                </RouterLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
        ;
}

export default Register;
