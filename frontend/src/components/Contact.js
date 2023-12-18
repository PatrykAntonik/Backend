import React, {useState} from 'react';
import {Box, Container, Typography, TextField, Button, Grid} from '@mui/material';

function ContactPage() {
    const [contactInfo, setContactInfo] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setContactInfo({...contactInfo, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <Container maxWidth="md">
            <Box sx={{marginTop: 4, marginBottom: 4}}>
                <Typography variant="h4" gutterBottom>Contact Us</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={contactInfo.name}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={contactInfo.email}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Message"
                                name="message"
                                multiline
                                rows={4}
                                value={contactInfo.message}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                href={`mailto:${contactInfo.email}`}
                                variant="outlined"
                                color="primary"
                                sx={{marginTop: '1rem'}}
                            >
                                Contact Donor
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
}

export default ContactPage;
