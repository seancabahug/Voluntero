import React from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import FaceIcon from "@material-ui/icons/Face";
import EventIcon from "@material-ui/icons/Event";
import MapIcon from "@material-ui/icons/Map";
import Cookies from 'universal-cookie';
import APIUtil from '../utils/apiutil';
import { Switch, Route } from 'react-router';
import { withRouter } from 'react-router-dom';
import EventMap from './EventMap';
import EventList from './EventList';

class MainApp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            drawerOpen: false,
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
                        style={{width: 250}}
                        onClick={() => {this.setState({drawerOpen: false})}}
                        onKeyDown={() => {this.setState({drawerOpen: false})}}
                    >
                        <List>
                            <ListItem button key="Map">
                                <ListItemIcon><MapIcon /></ListItemIcon>
                                <ListItemText primary="Map" />
                            </ListItem>
                            <ListItem button key="Events">
                                <ListItemIcon><EventIcon /></ListItemIcon>
                                <ListItemText primary="Events" />
                            </ListItem>
                            <ListItem button key="You">
                                <ListItemIcon><FaceIcon /></ListItemIcon>
                                <ListItemText primary="You" />
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
                <AppBar position="sticky" style={{zIndex: 2}}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={() => {this.setState({drawerOpen: true})}}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" style={{ flexGrow: 1 }}>
                            Volunteer
                        </Typography>
                        <Button onClick={() => {
                            APIUtil.logout(() => {
                                this.props.history.push("/");
                            });
                        }} color="inherit">Logout</Button>
                    </Toolbar>
                </AppBar>
                <Switch>
                    <Route exact path={this.props.match.path}>
                        <EventMap />
                        {/* <EventList /> */}
                    </Route>
                    <Route path={`${this.props.match.path}/events`}>
                        // TO-DO events
                    </Route>
                </Switch>
            </div>
        );
    }
}

// <EventMap />

export default withRouter(MainApp);