import React from "react";
import APIUtil from "../utils/apiutil";
import {
    Card,
    CardContent,
    CardActions,
    CardMedia,
    Typography,
    Button,
    Grid,
} from "@material-ui/core";

export default class EventList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            registeredFor: [],
        };
    }

    componentDidMount() {
        APIUtil.getSelfInfo((status, data) => {
            this.setState(() => {return {registeredFor: data.registeredEvents}})
        })
        APIUtil.getAllEvents((status, data) => {
            console.log(data);
            this.setState((state) => {
                return { events: data.data };
            });
            console.log(this.state.events);
        });
    }

    render() {
        return (
            <Grid
                container
                spacing={3}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    padding: "30px",
                    fontFamily: 'Comfortaa'
                }}
                direction="row"
            >
                {this.state.events
                    ? this.state.events.map((event) => (
                          <Grid item>
                              <Card
                                  style={{ minWidth: 275 }}
                                  key={event.name}
                                  style={{
                                      margin: "2em",
                                      padding: "2em",
                                      borderRadius: "30px",
                                      transform: "scale(1.1)"
                                  }}
                              >
                                  <CardContent>
                                      <Typography variant="h5" component="h2">
                                          {event.name}
                                      </Typography>
                                      {event.imageUrl ? (
                                          <CardMedia image={event.imageUrl}/>
                                      ) : (
                                          ""
                                      )}
                                      <Typography
                                          style={{ marginBottom: 12 }}
                                          color="textSecondary"
                                      >
                                          {event.participants.length}{" "}
                                          {event.participants.length == 1
                                              ? "participant"
                                              : "participants"}
                                      </Typography>
                                      <Typography variant="body2" component="p">
                                          {event.description}
                                      </Typography>
                                  </CardContent>
                                  <CardActions>
                                        <Button size="small" onClick={() => {
                                            APIUtil.registerEvent()
                                        }}>{this.state.registeredFor.includes(event._id) ? "Unregister" : "Register"}</Button>
                                  </CardActions>
                              </Card>
                          </Grid>
                      ))
                    : "Loading..."}
            </Grid>
        );
    }
}
