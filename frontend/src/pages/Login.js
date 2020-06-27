import React from 'react';
import { Paper, Box, Button, TextField, Form } from "@material-ui/core";
import { Link } from "react-router-dom";
import './Login.css';

export default function Login() {
    const [usernameValue, setUsernameValue] = React.useState("");
    const [passwordValue, setPasswordValue] = React.useState("");

    return(
        <div className="container">
            <Paper className="square" elevation={3} square>
                <div className="content">
                    <Box display="flex" style={{height: "100%"}} flexDirection="column" alignItems="center" justifyContent="center" className="box">
                        <h1>Login!</h1>
                        <div className="buttonContainer">
                            <TextField placeholder="Username" onChange={event => setUsernameValue(event.target.value)} />
                            <TextField placeholder="Password" type="password" onChange={event => setPasswordValue(event.target.value)} />
                            <br/>
                            <Button variant="contained" color="primary" onClick={event => {alert(usernameValue + " and " + passwordValue)}}>Login</Button>
                        </div>
                    </Box>
                </div>
            </Paper>
        </div>
    )
}