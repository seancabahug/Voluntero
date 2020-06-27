import React from 'react';
import { Switch, Link, Route, Redirect } from "react-router-dom";
import {
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

function PrivateRoute({children, ...rest}) {
  return (
    <Route
      {...rest}
      render={
        ({location}) => APIUtil.authenticated ? children : (
          <Redirect to={{pathname: "/login", state: {from: location}}} />
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

  render() {
    return (
      <div style={{flexGrow: 1, height: "100vh"}}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            // TO-DO login page
          </Route>
          <Route exact path="/register">
            // TO-DO register page
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
