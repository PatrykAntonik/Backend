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
import {green, red} from '@mui/material/colors';
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
    const [message, setMessage] = useState('');
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
                acc[question.id] = null;
                return acc;
            }, {});
            setResponses(initialResponses);
        }
    }, [questions]);


    const handleNext = () => {
        if (activeStep === 1) {
            const allQuestionsAnswered = questions.every(question => responses[question.id] !== null);

            if (!allQuestionsAnswered) {
                setMessage("Please answer all questions before proceeding.");
                window.scrollTo(0, 0);
            } else {
                setMessage("");
                setActiveStep(prevActiveStep => prevActiveStep + 1);
            }
        } else if (activeStep === steps.length - 1) {
            submitHandler();
        } else {
            setActiveStep(prevActiveStep => prevActiveStep + 1);
        }
    };


    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleResponseChange = (questionId, answer) => {
        setResponses((prevResponses) => ({
            ...prevResponses, [questionId]: answer,
        }));
        setMessage("");
    };

    const submitHandler = () => {
        const formattedResponses = Object.keys(responses).map((questionId) => ({
            question_id: questionId, answer: responses[questionId],
        }));
        dispatch(createDonationWithResponses({donation_type: donationType, responses: formattedResponses}));
    };

    const getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return (<FormControl fullWidth margin="normal" sx={{marginTop: '5rem', marginBottom: '5rem'}}>
                    <InputLabel id="donation-type-label" sx={{color: 'black'}}>Donation Type</InputLabel>
                    <Select
                        labelId="donation-type-label"
                        id="donation-type"
                        value={donationType}
                        label="Donation Type"
                        onChange={(e) => setDonationType(e.target.value)}
                        sx={{
                            backgroundColor: 'rgba(255,255,255,0.9)',
                            color: 'black',
                            '& .MuiSelect-icon': {color: 'black'},
                            '& .MuiSelect-root': {color: 'black'},
                            '& .MuiInputBase-root': {color: 'black'},
                            '& .MuiOutlinedInput-notchedOutline': {borderColor: 'black'},
                            '&:hover .MuiOutlinedInput-notchedOutline': {borderColor: 'black'},
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: 'black'},
                        }}
                    >
                        <MenuItem value="blood">Blood</MenuItem>
                        <MenuItem value="marrow">Marrow</MenuItem>
                    </Select>
                </FormControl>);
            case 1:
                return (
                    <>
                        <Box sx={{marginBottom: '1rem'}}>
                            {message && <Message severity="error">{message}</Message>}
                        </Box>
                        <Grid container
                              sx={{
                                  marginTop: '2rem', padding: 2, backgroundColor: 'rgba(255,255,255,0.9)',
                                  color: 'black',
                              }}>
                            <Grid item xs={8} md={10}>
                                <Typography
                                    variant="body1"
                                    sx={{fontWeight: 'bold', textTransform: 'uppercase'}}>Questions</Typography>
                            </Grid>
                            <Grid item xs={2} md={1} sx={{textAlign: 'center'}}>
                                <Typography
                                    variant="body1"
                                    sx={{fontWeight: 'bold', textTransform: 'uppercase'}}>Yes</Typography>
                            </Grid>
                            <Grid item xs={2} md={1} sx={{textAlign: 'center'}}>
                                <Typography
                                    variant="body1"
                                    sx={{fontWeight: 'bold', textTransform: 'uppercase'}}>No</Typography>
                            </Grid>
                        </Grid>

                        {questions && questions.map((question) => (
                            <Grid
                                container
                                key={question.id}
                                sx={{
                                    paddingRight: 2,
                                    paddingLeft: 2,
                                    paddingTop: 1,
                                    paddingBottom: 1,
                                    backgroundColor: 'rgba(255,255,255,0.9)',
                                    color: 'black',
                                }}
                                justifyContent={'center'}
                                alignItems={'center'}
                            >
                                <Grid item xs={8} md={10}>
                                    <Typography variant="body1">{question.text}</Typography>
                                </Grid>
                                <Grid item xs={2} md={1} sx={{textAlign: 'center'}}>
                                    <Checkbox
                                        checked={responses[question.id] === true}
                                        onChange={() => handleResponseChange(question.id, true)}
                                        sx={{
                                            '& .MuiSvgIcon-root': {fontSize: 32},
                                            color: 'black',
                                            '&.Mui-checked': {
                                                color: 'black',
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2} md={1} sx={{textAlign: 'center'}}>
                                    <Checkbox
                                        checked={responses[question.id] === false}
                                        onChange={() => handleResponseChange(question.id, false)}
                                        sx={{
                                            '& .MuiSvgIcon-root': {fontSize: 32},
                                            color: 'black',
                                            '&.Mui-checked': {
                                                color: 'black',
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider sx={{backgroundColor: 'rgba(0,0,0,0.5)'}}/>
                                </Grid>
                            </Grid>
                        ))}

                    </>

                )
                    ;
            case 2:
                return (<Box sx={{
                        marginBottom: '5rem',
                        marginTop: '3rem',
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%'
                    }}>
                        <Box>
                            <Typography variant="h6" sx={{textAlign: 'left', marginBottom: '1rem'}}>
                                Donation Type: {donationType.toUpperCase()}
                            </Typography>
                            <Accordion sx={{marginBottom: '1rem', backgroundColor: 'rgba(255,255,255,0.9)', color: 'black'}}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography sx={{fontWeight: 'bold'}}>Questions and Answers</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <List>
                                        {questions.map((question) => (<ListItem key={question.id} sx={{
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
                                                {responses[question.id] === true ? 'YES' : responses[question.id] === false ? 'NO' : 'No Answer'}                                                </Typography>
                                        </ListItem>))}
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
        <Box mb={5} sx={{width: '100%'}}>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => (<Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>))}
            </Stepper>
            <Box>
                {activeStep === steps.length ? (<Box>
                    {loading && <Loader/>}
                    {error && <Message severity="error">{error}</Message>}
                    {success && <Message severity="success">Donation Created Successfully</Message>}
                </Box>) : (<Box>
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
                </Box>)}
            </Box>
        </Box>
    );
}

export default DonationCreateScreen;
