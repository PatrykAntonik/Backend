import React, {useState, useEffect} from 'react'
import {Link as RouterLink, Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getUserDetails, UpdateUserProfile} from "../../actions/userActions";
import {USER_UPDATE_PROFILE_RESET} from "../../constants/UserConstants";
import Box from "@mui/material/Box";
import Loader from "../Reusable/Loader";
import Message from "../Reusable/Message";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


function UserInfo() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [hospital_name, setHospitalName] = useState("");
    const [website_url, setWebsiteUrl] = useState("");
    const [is_hospital, setIsHospital] = useState(false);

    const [message, setMessage] = useState("");
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);


    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    const isHospital = user.is_hospital;

    useEffect(() => {
        if (!user || userInfo.id !== user.id || success) {
            dispatch({type: USER_UPDATE_PROFILE_RESET});
            dispatch(getUserDetails('profile'));
        } else {
            if (isHospital) {
                setIsHospital(true);
            }
            setUsername(user.username);
            setEmail(user.email);
            setFirstName(user.first_name);
            setLastName(user.last_name);
            setCity(user.city);
            setZipCode(user.zip_code);
            setPhoneNumber(user.phone_number);
            setHospitalName(user.hospital_name);
            setWebsiteUrl(user.website_url);
            setIsHospital(user.is_hospital);
        }
    }, [dispatch, userInfo, user]);


    const submitHandler = (e) => {
        e.preventDefault()
        if (password != confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(UpdateUserProfile({
                'id': userInfo.id,
                'username': username,
                'email': email,
                'password': password,
                'first_name': firstName,
                'last_name': lastName,
                'city': city,
                'zip_code': zipCode,
                'phone_number': phoneNumber,
                'hospital_name': hospital_name,
                'website_url': website_url,
                'is_hospital': is_hospital
            }))
            setShowSuccessAlert(true);
        }
    }


    return (
        <Box>
            {message && <Message variant="error">{message}</Message>}
            {error && <Message variant="error">{error}</Message>}
            {showSuccessAlert && <Message severity="success">Profile Updated</Message>}
            <Container maxWidth="sm">
                <CssBaseline/>
                <Box
                    sx={{
                        marginBottom: 10, display: 'flex', flexDirection: 'column', alignItems: 'center',
                    }}
                >
                    <Typography variant="h5">
                        Update Profile
                    </Typography>
                    <Box onSubmit={submitHandler} component="form" sx={{mt: 3}}>
                        <Grid
                            container
                            spacing={2}
                        >
                            {isHospital ? (
                                <>
                                    <Grid item xs={12}>
                                        <TextField
                                            margin="dense"
                                            fullWidth
                                            id="hospital_name"
                                            label="Hospital Name"
                                            name="hospital_name"
                                            autoComplete="hospital_name"
                                            value={hospital_name}
                                            // onChange={(e) => setHospitalName(e.target.value)}
                                            onChange={(e) => {
                                                setHospitalName(e.target.value);
                                                setIsHospital(true);
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            margin="dense"
                                            fullWidth
                                            id="website_url"
                                            label="Website URL"
                                            name="website_url"
                                            autoComplete="website_url"
                                            value={website_url}
                                            // onChange={(e) => setWebsiteUrl(e.target.value)}
                                            onChange={(e) => {
                                                setWebsiteUrl(e.target.value);
                                                setIsHospital(true);
                                            }}
                                        />
                                    </Grid>
                                </>
                            ) : (
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
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            margin="dense"
                                            required
                                            fullWidth
                                            id="last_name"
                                            label="Last Name"
                                            name="last_name"
                                            autoComplete="last_name"
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
                                    value={zipCode} onChange={(e) => setZipCode(e.target.value)}
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
                                    value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
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
                                    autoFocus value={email} onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="dense"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus value={username} onChange={(e) => setUsername(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    helperText={password.length < 6 ? "Password must be at least 6 characters" : ""}
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password" id="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    helperText={password.length < 6 ? "Password must be at least 6 characters" : ""}
                                    fullWidth
                                    name="passwordConfirm"
                                    label="Confirm Password"
                                    type="password" id="passwordConfirm"
                                    autoComplete="current-password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="success"
                            sx={{mt: 3, mb: 2}}
                        >
                            Update
                        </Button>
                    </Box>
                </Box>

            </Container>
        </Box>);

}

export default UserInfo;