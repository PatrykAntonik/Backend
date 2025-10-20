import React from 'react';
import { Box, Typography, Button } from '@mui/material';

function Contact() {
    const emailAddress = "patryka2000@gmail.com";

    const handleContactClick = () => {
        window.location.href = `mailto:${emailAddress}?subject=Suggestion for Donation Process`;
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            textAlign: 'left',
            p: 4,
        }}>
            <Typography variant="h4" gutterBottom>
                Have an idea to improve the donation process?
            </Typography>
            <Typography variant="h6" sx={{ mb: 10, mt:4 }}>
                If you have any ideas or feedback to make the donation process easier, like adding more questions for donors, please contact us.
            </Typography>
            <Button variant="contained" color="primary" onClick={handleContactClick}>
                Contact Us
            </Button>
        </Box>
    );
}

export default Contact;
