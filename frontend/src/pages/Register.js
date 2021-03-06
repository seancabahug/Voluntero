import React from 'react';
import { Paper, Box, Button, TextField, Form, Snackbar } from "@material-ui/core";
import { Alert } from '@material-ui/lab';
import { Link } from "react-router-dom";
import './Register.css';
import { useHistory } from 'react-router-dom';
import APIUtils from '../utils/apiutil';
 
export default function Register() {
    let history = useHistory();

    const [usernameValue, setUsernameValue] = React.useState("");
    const [passwordValue, setPasswordValue] = React.useState("");
    const [emailValue, setEmailValue] = React.useState("");
    const [locationValue, setLocationValue] = React.useState("");
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    const handleClose = (event, reason) => {
        if (reason === 'clickaway'){
            return;
        }
        setSnackbarOpen(false);
    };

    return(
        <div className="container">
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Error! {errorMessage}
                </Alert>
            </Snackbar>
            <Paper className="square" elevation={3} square>
                <div className="content">
                    <Box display="flex" style={{height: "100%"}} flexDirection="column" alignItems="center" justifyContent="center" className="box">
                        <h1>Register!</h1>
                        <div className="buttonContainer">
                            <TextField placeholder="Username" onChange={event => setUsernameValue(event.target.value)} />
                            <TextField placeholder="Password" type="password" onChange={event => setPasswordValue(event.target.value)} />
                            <TextField placeholder="Email" onChange={event => setEmailValue(event.target.value)} />
                            <br/>
                            <Button variant="contained" color="primary" onClick={() => {
                                APIUtils.registerUser({
                                    username: usernameValue,
                                    password: passwordValue,
                                    email: emailValue
                                }, (status, error="") => {
                                    if (status) {
                                        history.push('/login');
                                    } else {
                                        setErrorMessage(error)
                                        setSnackbarOpen(true);
                                    }
                                });
                            }}>Register</Button>
                        </div>
                    </Box>
                </div>
            </Paper>
        </div>
    )
}

