import React from "react";
import {CircularProgress} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Loader() {
    return (
        <Box sx={{textAlign:"center"}} mb={10} mt={10}>
            <Typography variant="h4">Loading</Typography>
            <CircularProgress size={100}/>
        </Box>
    );

}

export default Loader;
