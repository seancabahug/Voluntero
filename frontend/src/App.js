import React from 'react';
import { Switch, Link, Route, Redirect } from "react-router-dom";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText,
  Drawer
} from "@material-ui/core";
import { makeStyles }  from "@material-ui/core/styles";
import APIUtil from "./utils/apiutil";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MainApp from './pages/MainApp';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

function AuthenticatedRoute({children, ...rest}) {
  console.log(APIUtil.isAuthenticated());
  return (
    <Route
      {...rest}
      render={
        ({location}) => APIUtil.isAuthenticated() ? children : (
          <Redirect to={{pathname: "/login", state: {from: location}}} />
        )
      }
    />
  )
}

function UnauthenticatedRoute({children, ...rest}) {
  console.log(APIUtil.isAuthenticated());
  return (
    <Route
      {...rest}
      render={
        ({location}) => !APIUtil.isAuthenticated() ? children : (
          <Redirect to={{pathname: "/app", state: {from: location}}} />
        )
      }
    />
  )
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {drawerOpen: false};
  }

  // <Container maxWidth="sm" style={{height: "100vh"}} >

  render() {
    return (
        <Switch>
          <UnauthenticatedRoute exact path="/">
            <Container maxWidth="sm" style={{height: "100vh"}} >
              <Home />
            </Container>
          </UnauthenticatedRoute>
          <UnauthenticatedRoute exact path="/login">
            <Container maxWidth="sm" style={{height: "100vh"}} >
              <Login />
            </Container>
          </UnauthenticatedRoute>
          <UnauthenticatedRoute exact path="/register">
            <Container maxWidth="sm" style={{height: "100vh"}} >
              <Register />
            </Container>
          </UnauthenticatedRoute>
          <AuthenticatedRoute path="/app">
            <MainApp />
          </AuthenticatedRoute>
        </Switch>
    );
  }
}

export default App;
