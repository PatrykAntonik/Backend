import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {Box, Grid, Typography, List, ListItem, ListItemText, Divider} from "@mui/material";
import {listDonationDetails, ListQuestion, listDonationResponses} from "../../actions/donationActions";
import {useDispatch, useSelector} from "react-redux";
import Message from "../Reusable/Message";
import Loader from "../Reusable/Loader";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";


function DonationDetail() {
    const {id} = useParams();
    const dispatch = useDispatch();

    const donationDetails = useSelector((state) => state.donationDetails);
    const {loading, error, donation} = donationDetails;

    const questionList = useSelector((state) => state.question);
    const {questions} = questionList;

    const userDetails = useSelector(state => state.userDetails)
    const {user} = userDetails
    const isHospital = user.is_hospital;

    const donationResponses = useSelector(state => state.donationResponses);
    const {responses} = donationResponses;

    useEffect(() => {
        dispatch(listDonationDetails(id));
        dispatch(listDonationResponses(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (donation && donation.donation_type) {
            dispatch(ListQuestion(donation.donation_type));
        }
    }, [dispatch, donation]);

    if (loading) {
        return <Loader/>;
    }
    if (error) {
        return <Message severity="error">{error}</Message>;
    }

    return (
        <Box mb={20} sx={{flexGrow: 1, margin: 4}}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Typography variant="h6">Donor Information</Typography>
                    <List>
                        <ListItem>
                            <ListItemText primary="First Name" secondary={donation.donor?.first_name || 'N/A'}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Last Name" secondary={donation.donor?.last_name || 'N/A'}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Date" secondary={donation.date}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Donation Type" secondary={donation.donation_type}/>
                        </ListItem>
                    </List>
                    {isHospital ? (
                        <Button
                            href={`mailto:${donation.donor?.email}`}
                            variant="outlined"
                            color="primary"
                            sx={{marginTop: '1rem'}}
                        >
                            Contact Donor
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            color="error"
                            sx={{marginTop: '1rem'}}
                        >
                            Delete Donation
                        </Button>
                    )}
                </Grid>

                <Grid item xs={12} md={8}>
                    <Typography variant="h6"
                    >Questions with responses</Typography>
                    <List>
                        {questions && questions.length > 0 ? (
                            questions.map((question, index) => (
                                <React.Fragment key={index}>
                                    <ListItem>
                                        <ListItemText
                                            primary={question.text}
                                            secondary={
                                                <Box
                                                    sx={{mt: '1rem'}}
                                                >
                                                    {responses && responses[index] ? (responses[index].answer ? 'Yes' : 'No') : 'No response'}
                                                </Box>
                                            }
                                        />
                                    </ListItem>
                                    {<Divider/>}
                                </React.Fragment>
                            ))
                        ) : (
                            <Typography>No questions found for this donation type.</Typography>
                        )}
                    </List>
                </Grid>

                {/*<Grid item xs={6} md={4}>*/}
                {/*    <Typography variant="h6" sx={{marginBottom: '1.5rem'}}>Donation Responses</Typography>*/}
                {/*    <List>*/}
                {/*        {responses && responses.length > 0 ? (*/}
                {/*            responses.map((response) => (*/}
                {/*                <React.Fragment key={response.id}>*/}
                {/*                    <ListItem>*/}
                {/*                        <ListItemText primary={response.answer ? 'Yes' : 'No'}/>*/}
                {/*                    </ListItem>*/}
                {/*                    <Divider/>*/}
                {/*                </React.Fragment>*/}
                {/*            ))*/}
                {/*        ) : (*/}
                {/*            <Typography>No responses found.</Typography>*/}
                {/*        )}*/}
                {/*    </List>*/}
                {/*</Grid>*/}


            </Grid>

        </Box>
    );
}

export default DonationDetail;
