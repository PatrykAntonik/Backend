import React, {useEffect} from 'react';
import {
    Box, Typography, Paper, Button, Accordion, AccordionSummary, AccordionDetails, CssBaseline
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Link} from "react-router-dom";
import backgroundImage from '../static/background.webp';

function HomePage() {

    return (<CssBaseline>
            <Box sx={{my: 4, position: 'relative', zIndex: 1}}>
                <Typography sx={{color: 'black', fontWeight: '500'}} variant="h2" component="h1" gutterBottom>
                    Blood and Marrow Donation
                </Typography>
                <Typography sx={{color: 'black'}} variant="h5" gutterBottom>
                    A Lifesaving Gesture
                </Typography>


                <Accordion sx={{mt: 3, backgroundColor: 'rgba(255,255,255,0.9)', color: 'black'}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography variant="h6">Why Donate Blood and Marrow?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography paragraph>
                            Blood donation is a simple yet powerful way to help those in need and can be a lifeline in
                            an emergency. Marrow donation, though more involved, is crucial for treating patients with
                            certain types of cancers and other blood disorders.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion sx={{backgroundColor: 'rgba(255,255,255,0.9)', color: 'black'}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography variant="h6">How to Become a donor with our website?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography paragraph>
                            To become a donor, you must first register with our website. You will then be asked to
                            answer a series of {' '}
                            <Typography
                                component={Link}
                                to={'/questions'}
                                color="secondary"
                                underline={'hover'}
                            >
                                questions
                            </Typography>
                            {' '}to determine your eligibility. Once hospital staff have verified your eligibility,
                            you will be contacted via email to schedule an appointment.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Paper elevation={3}
                       sx={{p: 3, mt: 10, backgroundColor: 'rgba(255,255,255,0.9)', color: 'black', textAlign: 'center'}}
                >
                    <Typography variant="h6" gutterBottom>
                        Donation Questions
                    </Typography>
                    <Typography paragraph>
                        You can see questions you will be asked during the donation process.
                    </Typography>
                    <Button component={Link} to="/questions" variant="outlined" color="primary">
                        Questions
                    </Button>
                </Paper>
            </Box>
        </CssBaseline>);
}

export default HomePage;
