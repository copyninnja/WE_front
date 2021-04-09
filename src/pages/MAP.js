import React from 'react';

const { compose, withProps, withStateHandlers } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} = require("react-google-maps");
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");
//const demoFancyMapStyles = require("./demoFancyMapStyles.json");

 const StyledMapWithAnInfoBox = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLEMAP}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `1080px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    center: { lat: 52.242022399999996, lng:  -7.130316799999999},
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
    defaultZoom={10}
    defaultCenter={props.center}
    //defaultOptions={{ styles: demoFancyMapStyles }}
  >
    <Marker
      position={new window.google.maps.LatLng(props.center)}
      onClick={props.onToggleOpen}
    >
      {
        props.isOpen && 
          <InfoBox
            onCloseClick={props.onToggleOpen}
            options={{ closeBoxURL: ``, enableEventPropagation: true }}
          >
            <div style={{ backgroundColor: `white`, opacity: 0.75, padding: `12px` }}>
              <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                Hello, Welcome to join us!
              </div>
            </div>
          </InfoBox>
      }
    </Marker>
  </GoogleMap>
);

export default StyledMapWithAnInfoBox;