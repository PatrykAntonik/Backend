import React, {useState, useEffect} from "react";
import {Link, useParams, useNavigate} from "react-router-dom";
import {Box, Grid, Typography, List, ListItem, ListItemText, Divider} from "@mui/material";
import {listDonationDetails, ListQuestion, listDonationResponses, deleteDonation} from "../../actions/donationActions";
import {useDispatch, useSelector} from "react-redux";
import Message from "../Reusable/Message";
import Loader from "../Reusable/Loader";
import Button from "@mui/material/Button";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";


function DonationDetail() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const donationDetails = useSelector((state) => state.donationDetails);
    const {loading, error, donation} = donationDetails;

    const questionList = useSelector((state) => state.question);
    const {questions} = questionList;

    const userDetails = useSelector(state => state.userDetails)
    const {user} = userDetails
    const isHospital = user.is_hospital;

    const donationResponses = useSelector(state => state.donationResponses);
    const {responses} = donationResponses;

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const handleDeleteClick = () => {
        setOpenDeleteDialog(true);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteDonation(id));
        setOpenDeleteDialog(false);
        navigate("/donation/mydonations");
        navigate(0);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    const StyledListItemText = ({primary, secondary}) => (
        <ListItemText
            primary={primary}
            secondary={secondary}
            secondaryTypographyProps={{sx: {color: 'black', fontWeight: 'bold', textTransform: 'uppercase'}}}
        />
    );

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
                    <List sx={{backgroundColor: 'rgba(255,255,255,0.9)', color: 'black', borderRadius: 5}}>
                        <ListItem>
                            <StyledListItemText primary="First Name" secondary={donation.donor?.first_name || 'N/A'}/>
                        </ListItem>
                        <ListItem>
                            <StyledListItemText primary="Last Name" secondary={donation.donor?.last_name || 'N/A'}/>
                        </ListItem>
                        <ListItem>
                            <StyledListItemText primary="Date" secondary={donation.date}/>
                        </ListItem>
                        <ListItem>
                            <StyledListItemText primary="Donation Type" secondary={donation.donation_type}/>
                        </ListItem>
                    </List>
                    {isHospital ? (
                        <Button
                            href={`mailto:${donation.donor?.email}`}
                            variant="contained"
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
                            onClick={handleDeleteClick}
                        >
                            Delete Donation
                        </Button>
                    )}
                    <Dialog
                        open={openDeleteDialog}
                        onClose={handleCloseDeleteDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you want to delete this donation?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
                            <Button onClick={handleConfirmDelete} color="error">
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Typography variant="h6"
                    >Questions with responses</Typography>
                    <List sx={{backgroundColor: 'rgba(255,255,255,0.9)', color: 'black', borderRadius: 5}}>
                        {questions && questions.length > 0 ? (
                            questions.map((question, index) => (
                                <React.Fragment key={index}>
                                    <ListItem>
                                        <StyledListItemText
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
            </Grid>

        </Box>
    );
}

export default DonationDetail;
