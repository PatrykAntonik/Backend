import {Tooltip, Typography} from "@mui/material";
import React from "react";

export const CustomTooltip = ({title, children}) => {
    const CustomTooltipStyles = {
        tooltip: {
            fontSize: '1rem',
            textAlign: 'justify',
        },
    };

    return (
        <Tooltip title={<Typography style={CustomTooltipStyles.tooltip}>{title}</Typography>} placement="right">
            {children}
        </Tooltip>
    );
};