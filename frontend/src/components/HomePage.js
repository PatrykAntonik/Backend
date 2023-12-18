import React from 'react';
import {
    Box, Typography, Container, Paper, Grid, Button, Accordion,
    AccordionSummary, AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Link} from "react-router-dom";

function HomePage() {
    return (
        <Container maxWidth="lg">
            <Box sx={{my: 4}}>
                <Typography variant="h2" component="h1" gutterBottom>
                    Blood and Marrow Donation
                </Typography>
                <Typography variant="h5" gutterBottom>
                    A Lifesaving Gesture
                </Typography>
                <Paper elevation={3} sx={{p: 3, mt: 3}}>
                    <Typography variant="h6" gutterBottom>
                        Understanding Donation
                    </Typography>
                    <Typography paragraph>
                        Blood and marrow donation are critical practices that can save lives. Each year, thousands of
                        people rely on the generosity of donors to survive and combat various medical conditions.
                    </Typography>
                </Paper>
                <Accordion sx={{mt: 3}}>
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

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography variant="h6">How to Become a Donor?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography paragraph>
                            Becoming a donor is a straightforward process. For blood donation, it involves a quick and
                            safe procedure at a clinic or donation center. Marrow donation requires a more thorough
                            examination but can be a transformative gift for someone in need.
                        </Typography>
                    </AccordionDetails>
                </Accordion>


                <Paper elevation={3} sx={{p: 3, mt: 3}}>
                    <Typography variant="h6" gutterBottom>
                        Donation Questions
                    </Typography>
                    <Typography paragraph>
                        You can see questions you will be asked during the donation process by visiting our FAQ page.
                    </Typography>
                    <Button component={Link} to="/questions" variant="contained" color="primary">
                        Visit Our FAQ
                    </Button>
                </Paper>
            </Box>
        </Container>
    );
}

export default HomePage;
