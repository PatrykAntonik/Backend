import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {listMyDonations} from "../../../actions/donationActions";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Loader from "../../Reusable/Loader";
import Message from "../../Reusable/Message";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import BloodtypeOutlinedIcon from '@mui/icons-material/BloodtypeOutlined';
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

function UserDonations() {
    const dispatch = useDispatch();
    const donationListMy = useSelector((state) => state.donationListMy);
    const {loading: loadingDonations, error: errorDonations, donations} = donationListMy;

    useEffect(() => {
        dispatch(listMyDonations());
    }, [dispatch]);

    return (
        <Box mt={2} mb={2}>
            <Typography variant="h4" component="h1" sx={{marginBottom: '2rem'}}>
                My Donations
            </Typography>

            {loadingDonations ? <Loader/> : errorDonations ? <Message severity="error">{errorDonations}</Message> :
                <Grid container spacing={2} sx={{marginTop: '2rem'}}>
                    {donations && donations.length > 0 ? (donations.map((donation) => (
                        <Grid item xs={12} key={donation.id}>
                            <Paper elevation={3} sx={{padding: 2, backgroundColor: 'rgba(0,0,0,0.5)', color:'white'}}>
                                <Grid container spacing={2}>
                                    <Grid item xs={2} md={3}>
                                        <BloodtypeOutlinedIcon color="error"/>
                                    </Grid>
                                    <Grid item xs={5} md={3}>
                                        <Typography variant="h6" component="h2">
                                            {donation.donation_type.toUpperCase()}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={5} md={3} sx={{textAlign: {xs: 'left', md: 'center'}}}>
                                        <Typography variant="h6" component="h2">
                                            {donation.date}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} md={3} sx={{textAlign: 'right'}}>
                                        <Button
                                            component={Link}
                                            variant="text"
                                            to={`/donation/${donation.id}`}
                                            color="info"
                                        >
                                            Details
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>))) : (<Typography variant="h6" component="h6">
                        No donations
                    </Typography>)}
                </Grid>}

            <Box display="flex" justifyContent="flex-end">
                <Button
                    component={Link}
                    to="/donation/create"
                    color="primary"
                    size="large"
                    sx={{marginTop: '2rem', marginBottom: '5rem'}}
                >
                    Create New Donation
                </Button>
            </Box>
        </Box>
    );
}

export default UserDonations;
