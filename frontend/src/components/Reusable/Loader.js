import React from "react";
import {CircularProgress} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Loader() {
    return (
        <Box role="status" aria-live="polite" sx={{textAlign:"center"}} mb={10} mt={10}>
            <Typography component="p" variant="h4">Loading</Typography>
            <CircularProgress size={100} aria-label="Loading, please wait"/>
        </Box>
    );

}

export default Loader;
