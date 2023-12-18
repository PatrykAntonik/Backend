import React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import Collapse from "@mui/material/Collapse";


function Message({severity, children}) {
    const [open, setOpen] = React.useState(true);
    return (
        <Box sx={{textAlign: "center"}} mt={1}>
            <Collapse in={open}>
                <Alert
                    severity={severity}
                    variant="outlined"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit"/>
                        </IconButton>
                    }
                >
                    <Typography variant="h4" sx={{textAlign: "center"}}>
                        {children}
                    </Typography>
                </Alert>
            </Collapse>

        </Box>
    );
}

export default Message;