import React from 'react';
import { Switch, Link, Route } from "react-router-dom";
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

class App extends React.Component {
  classes = useStyles();

  constructor(props){
    super(props);
    this.state = {authenticated: false};
  }

  render() {
    return (
      <div className={classes.root}>

      </div>
    );
  }
}

export default App;
