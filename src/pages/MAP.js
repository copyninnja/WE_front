import React from 'react';
import {excerpt2} from '../util'
const fetch = require("isomorphic-fetch");
const { compose, withProps, withHandlers,withStateHandlers } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} = require("react-google-maps");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");
var jsonData = require('../event.json');

const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLEMAP}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `1080px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    // center: this.state.location,

  }),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers()
      console.log(`Current clicked markers length: ${clickedMarkers.length}`)
      console.log(clickedMarkers)
    },
  }),
  withStateHandlers(() => ({
    isOpen: false,
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    })
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={2}
    center={props.center}
    >
    <Marker key="currentLoc" onClick={props.onToggleOpen} position={{lat:props.center.lat,lng:props.center.lng}} icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png">
    {
        props.isOpen && 
          <InfoBox
            onCloseClick={props.onToggleOpen}
            options={{ closeBoxURL: ``, enableEventPropagation: true }}
          >
            <div style={{ backgroundColor: `white`, opacity: 0.75, padding: `12px` }}>
              <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                Hello, You are here !
              </div>
            </div>
          </InfoBox>
      }
    </Marker>
    {console.log(props)}
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      
      enableRetinaIcons
      gridSize={60}
    >
      {props.markers.map(marker => (
        <Marker
          key={marker.photo_id}
          onClick={props.onToggleOpen}
          position={{ lat: marker.latitude, lng: marker.longitude }}
        >
        <InfoBox
        options={{ closeBoxURL: ``, enableEventPropagation: true }}
      >
        <div style={{ backgroundColor: `white`, opacity: 0.75, padding: `12px` }}>
          <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
            {excerpt2(marker.photo_title)}
          </div>
        </div>
      </InfoBox>
      </Marker>
      ))}
    </MarkerClusterer>
  </GoogleMap>
);

class DemoApp extends React.PureComponent {
  componentWillMount() {
    this.setState({ markers: [] })
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          var pos = {
           lng: Math.floor(position.coords.longitude*1000000)/1000000,
            lat:Math.floor(position.coords.latitude*1000000)/1000000
          }
          this.setState({center: pos})
        });
    }
    
  }
  

  componentDidMount() {
        this.setState({ markers: jsonData.photos });
  }

  render() {
    return (
      <MapWithAMarkerClusterer markers={this.state.markers} center={this.state.center}/>
    )
  }
}

export default DemoApp;