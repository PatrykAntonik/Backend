import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Paper} from "@mui/material";
import Container from "@mui/material/Container";

function Footer() {
    return (
        <Paper sx={{
            marginTop: 'calc(10% + 60px)',
            width: '100%',
            position: 'fixed',
            bottom: 0,
            backgroundColor: 'info.main',
        }} component="footer" square variant="outlined">
            <Container maxWidth="lg">
                <Box
                    sx={{
                        flexGrow: 1,
                        justifyContent: "center",
                        display: "flex",
                        my: 1
                    }}
                >
                </Box>
                <Box
                    sx={{
                        flexGrow: 1,
                        justifyContent: "center",
                        display: "flex",
                        mb: 2,
                    }}
                >
                    <Typography variant="caption" color="white">
                        Patryk Antonik ©2023
                    </Typography>
                </Box>
            </Container>
        </Paper>
    );
}

export default Footer;