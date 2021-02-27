/* global google */
import React, {PropTypes, Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';
const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
    constructor () {
        super()
        this.state={ownPosition:null}

      }
componentDidMount(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=> {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }; 
          this.setState({ownPosition: pos})     
      });
  }
}

  render() {
      console.log(this.state)

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:process.env.REACT_APP_GOOGLEMAP}}
          center={this.state.ownPosition}
          zoom={10}>
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default connect(state => ({ user: state.user, chat: state.chatMsgList }, {})) (SimpleMap)