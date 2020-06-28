import React from 'react';
import { Paper, Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import './Home.css';

export default function Home() {
    return(
        <div className="container">
            <Paper className="square" elevation={3} square>
                <div className="content">
                    <Box display="flex" style={{height: "100%"}} flexDirection="column" alignItems="center" justifyContent="center" className="box">
                        <h1>APP NAME</h1>
                        <div className="buttonContainer">
                            <Link to="/login">
                                <Button variant="contained" color="primary">Login</Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="contained" color="primary">Register</Button>
                            </Link>
                        </div>
                    </Box>
                </div>
            </Paper>
        </div>
    )
}

//  box