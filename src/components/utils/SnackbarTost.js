import React, { useState, useEffect } from "react";

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { snackbarFormat } from "./Formats";
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarTost = (props) => {
    const [snackbar, setSnackbar] = useState(snackbarFormat);
    useEffect(() => {
        setSnackbar((prev) => {
            return {
                ...prev,
                ...props.snackbar,
            }
        });
    },[snackbar.open]);
    return (<>
        <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={() => {
                setSnackbar((prev) => {
                    return {
                        ...prev,
                        open: false,
                        severity: 'info',
                        message: ``
                    }
                })
            }}
        >
            <Alert onClose={() => {
                setSnackbar((prev) => {
                    return {
                        ...prev,
                        open: false,
                        severity: 'info',
                        message: ``
                    }
                })
            }}
                severity={snackbar.severity} sx={{ width: '100%' }}>
                {snackbar.message}
            </Alert>
        </Snackbar>
    </>)
}

export default SnackbarTost;