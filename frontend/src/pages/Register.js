import React from 'react';
import { Paper, Box, Button, TextField, Form} from "@material-ui/core";
import { Link } from "react-router-dom";
import './Register.css';
import APIUtils from '../utils/apiutil';

export default function Register() {
    const [usernameValue, setUsernameValue] = React.useState("");
    const [passwordValue, setPasswordValue] = React.useState("");
    const [emailValue, setEmailValue] = React.useState("");
    const [locationValue, setLocationValue] = React.useState("");

    return(
        <div className="container">
            <Paper className="square" elevation={3} square>
                <div className="content">
                    <Box display="flex" style={{height: "100%"}} flexDirection="column" alignItems="center" justifyContent="center" className="box">
                        <h1>Register!</h1>
                        <div className="buttonContainer">
                            <TextField placeholder="Username" onChange={event => setUsernameValue(event.target.value)} />
                            <TextField placeholder="Password" type="password" onChange={event => setPasswordValue(event.target.value)} />
                            <TextField placeholder="Email" onChange={event => setEmailValue(event.target.value)} />
                            <TextField placeholder="Location" onChange={event => setLocationValue(event.target.value)} />
                            <br/>
                            <Button variant="contained" color="primary" onClick={() => {
                                APIUtils.registerUser({
                                    username: usernameValue,
                                    password: passwordValue,
                                    email: emailValue,
                                    location: locationValue
                                }, status => {
                                    switch(status){
                                        case 0:
                                            break;
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

//  box