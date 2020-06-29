import React from 'react';
import {
    Map,
    TileLayer,
    Marker,
    Popup,
    ImageOverlay,
    WMSTileLayer
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import APIUtil from '../utils/apiutil';

// uh, when can you speak?
// like 
// i asked that a long time ago lol, i was in the middle of it then you switched tabs and i auto-followed you
// coincidence i checked on vsc the same time you respond
// uhh idk, i'll unmute when the house gets louder but holy fuck it's dead silent
// this is big brain time

export default class EventMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 39.8283,
            lng: 98.5795,
            zoom: 10,
            events: []
        }
    }

    componentDidMount() {
        /*fetch("https://api.ipgeolocationapi.com/geolocate", {
            mode: 'no-cors'
        }).then(async res => {
            var data = await res.json();
            console.log(data);
            this.setState({lat: data.geo.latitude, lng: data.geo.longitude});
        }).catch(() => {
            this.setState({lat: 39.8283, lng: 98.5795, zoom: 3}); // Geographic center of the United States, in case your mom messes things up. :D
        });*/
        APIUtil.getAllEvents((status, data) => {
            console.log(data)
            this.setState(() => {return {events: data.data}})
            console.log(this.state.events)
        });
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                this.setState({lat: pos.coords.latitude, lng: pos.coords.longitude});
            });
        }
    }

    render() {
        const position = [this.state.lat, this.state.lng];
        return(
            <div style={{height: "100%"}}>
                <Map center={position} zoom={this.state.zoom} style={{width: "100%", height: "100%"}}>
                    <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url='https://{s}.tile.osm.org/{z}/{x}/{y}.png' />
                    {this.state.events ? (
                        this.state.events.map(event => (
                            <Marker position={event.location} icon={L.icon({iconUrl: "/marker.webp", iconSize: [50, 50], iconAnchor: [25, 50]})}>
                                <Popup>{event.name}</Popup>
                            </Marker>
                        ))
                    ) : (
                        ""
                    )}
                </Map>
            </div>
        );
    }
}

/**
 * var coolDiv = document.getElementById('divID').height
 * console.log(coolDiv)
 */

/**
 *             <Map center={position} zoom={this.state.zoom} style={{width: "100%", height: "50%"}} renderer={L.SVG}>
                <WMSTileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url='https://{s}.tile.osm.org/{z}/{x}/{y}.png' />
                <Marker position={position}>
                    <Popup>
                        yeaaaaahhhhhhh
                    </Popup>
                </Marker>
            </Map>
 */

/**
 * <LayersControl position="topright">
  <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
    />
  </LayersControl.BaseLayer>
  <LayersControl.BaseLayer name="OpenStreetMap.Mapnik">
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
  </LayersControl.BaseLayer>
  <LayersControl.Overlay name="Marker with popup">
    <Marker position={[51.51, -0.06]}>
      <Popup>
        <span>
          A pretty CSS3 popup. <br /> Easily customizable.
        </span>
      </Popup>
    </Marker>
  </LayersControl.Overlay>
  <LayersControl.Overlay name="Feature group">
    <FeatureGroup color="purple">
      <Popup>
        <span>Popup in FeatureGroup</span>
      </Popup>
      <Circle center={[51.51, -0.06]} radius={200} />
    </FeatureGroup>
  </LayersControl.Overlay>
</LayersControl>
 */