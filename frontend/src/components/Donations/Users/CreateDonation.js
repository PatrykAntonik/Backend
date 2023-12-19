import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createDonationWithResponses, ListQuestion} from '../../../actions/donationActions';
import {
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography,
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Grid,
    Checkbox,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Loader from '../../Reusable/Loader';
import Message from '../../Reusable/Message';
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

function getSteps() {
    return ['Select Donation Type', 'Answer Questions', 'Submit'];
}

function DonationCreateScreen() {
    const [activeStep, setActiveStep] = useState(0);
    const [donationType, setDonationType] = useState('blood');
    const [responses, setResponses] = useState({});
    const steps = getSteps();
    const dispatch = useDispatch();

    const questionList = useSelector((state) => state.question);
    const {loading: loadingQuestions, error: errorQuestions, questions} = questionList;

    const donationCreate = useSelector((state) => state.donationCreate);
    const {loading, error, success} = donationCreate;

    useEffect(() => {
        if (donationType) {
            dispatch(ListQuestion(donationType));
        }
    }, [dispatch, donationType]);

    useEffect(() => {
        if (success) {
            window.location.href = '/donation/mydonations';
        }
    }, [success]);

    useEffect(() => {
        if (questions && questions.length > 0) {
            const initialResponses = questions.reduce((acc, question) => {
                acc[question.id] = false;
                return acc;
            }, {});
            setResponses(initialResponses);
        }
    }, [questions]);


    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            submitHandler();
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleResponseChange = (questionId, answer) => {
        setResponses((prevResponses) => ({
            ...prevResponses,
            [questionId]: answer,
        }));
    };

    const submitHandler = () => {
        const formattedResponses = Object.keys(responses).map((questionId) => ({
            question_id: questionId,
            answer: responses[questionId],
        }));
        dispatch(createDonationWithResponses({donation_type: donationType, responses: formattedResponses}));
    };

    const getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return (
                    <FormControl fullWidth margin="normal" sx={{marginTop: '5rem', marginBottom: '5rem'}}>
                        <InputLabel id="donation-type-label">Donation Type</InputLabel>
                        <Select
                            labelId="donation-type-label"
                            id="donation-type"
                            value={donationType}
                            label="Donation Type"
                            onChange={(e) => setDonationType(e.target.value)}
                        >
                            <MenuItem value="blood">Blood</MenuItem>
                            <MenuItem value="marrow">Marrow</MenuItem>
                        </Select>
                    </FormControl>
                );
            case 1:
                return (
                    <List sx={{
                        marginTop: '2rem',
                        marginBottom: '5rem',
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        color: 'white'
                    }}>
                        {questions && questions.map((question, index) => (
                            <React.Fragment key={question.id}>
                                <ListItem>
                                    <ListItemText primary={question.text}/>
                                    <ListItemIcon style={{minWidth: 'auto'}}>
                                        <Checkbox
                                            edge="end"
                                            sx={{color: "white"}}
                                            checked={responses[question.id] || false}
                                            onChange={(e) => handleResponseChange(question.id, e.target.checked)}
                                        />
                                    </ListItemIcon>
                                </ListItem>
                                {index < questions.length - 1 && <Divider/>}
                            </React.Fragment>
                        ))}
                    </List>
                );
            case 2:
                return (
                    <Box sx={{
                        marginBottom: '5rem',
                        marginTop: '3rem',
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%'
                    }}>
                        <Box>
                            <Typography variant="h6" sx={{textAlign: 'left', marginBottom: '1rem'}}>Donation
                                Type: {donationType}</Typography>
                            <Accordion sx={{marginBottom: '1rem', backgroundColor: 'rgba(0,0,0,0.3)', color: 'white'}}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography sx={{fontWeight: 'bold'}}>Questions and Answers</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <List>
                                        {questions.map((question) => (
                                            <ListItem key={question.id} sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                marginBottom: '1rem'
                                            }}>
                                                <Typography sx={{textAlign: 'left'}}>
                                                    {question.text}
                                                </Typography>
                                                <Typography variant='body1'
                                                            sx={{
                                                                textAlign: 'right',
                                                                fontWeight: '500',
                                                                marginLeft: '50px'
                                                            }}>
                                                    {responses[question.id] ? 'Yes' : 'No'}
                                                </Typography>
                                            </ListItem>
                                        ))}
                                    </List>
                                </AccordionDetails>
                            </Accordion>

                        </Box>
                    </Box>

                );
            default:
                return 'Unknown step';
        }
    };

    return (
        <Box sx={{width: '100%'}}>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        {loading && <Loader/>}
                        {error && <Message severity="error">{error}</Message>}
                        {success && <Message severity="success">Donation Created Successfully</Message>}
                    </div>
                ) : (
                    <div>
                        {getStepContent(activeStep)}
                        <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{mr: 1}}
                            >
                                Back
                            </Button>
                            <Box sx={{flex: '1 1 auto'}}/>
                            <Button variant="contained" color="primary" onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                            </Button>
                        </Box>
                    </div>
                )}
            </div>
        </Box>
    );
}

export default DonationCreateScreen;
