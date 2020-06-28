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

export default class EventMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 39.8283,
            lng: 98.5795,
            zoom: 10
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
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.setState({lat: position.coords.latitude, lng: position.coords.longitude});
            });
        } else {
            this.setState({lat: 39.8283, lng: 98.5795, zoom: 5}); // Geographic center of the United States
        }
    }

    render() {
        const position = [this.state.lat, this.state.lng];
        return(
            <div style={{height: "100%"}}>
                <Map center={position} zoom={this.state.zoom} style={{width: "100%", height: "100%"}}>
                    <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url='https://{s}.tile.osm.org/{z}/{x}/{y}.png' />
                    <Marker position={position}>
                        <Popup>
                            yeaaaaahhhhhhh
                        </Popup>
                    </Marker>
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