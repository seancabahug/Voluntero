import React from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Cookies from 'universal-cookie';

export default class MainApp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            drawerOpen: false
        }
    }

    render() {
        return (
            <div style={{ flexGrow: 1 }}>
                <Drawer
                    anchor="left"
                    open={this.state.drawerOpen}
                    onClose={() => {this.setState({drawerOpen: false})}}
                >
                    <div
                        onClick={() => {this.setState({drawerOpen: false})}}
                        onKeyDown={() => {this.setState({drawerOpen: false})}}
                    >
                        <List>
                            <ListItem button key="thing 1">
                                <ListItemText primary="thing 1" />
                            </ListItem>
                            <ListItem button key="thing 2">
                                <ListItemText primary="thing 2" />
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={() => {this.setState({drawerOpen: true})}}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" style={{ flexGrow: 1 }}>
                            Our App
                        </Typography>
                        <Button onClick={() => {

                        }} color="inherit">Logout</Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}
