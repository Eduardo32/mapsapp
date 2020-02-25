import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions'

// import { Container } from './styles';

export default class App extends Component {
  state = {
    origin: { latitude: -1.453505, longitude: -48.492556 },
    destination: { latitude: -1.3889826, longitude: -48.4668376 },
  }

  teste = () => {
    console.log("teste");
  }

  render() {
    const { origin, destination } = this.state;
    const GOOGLE_MAPS_APIKEY = 'KEY';

    return (
      <MapView
        initialRegion={{
          latitude: -1.453505,
          longitude: -48.492556,
          latitudeDelta: 0.0042,
          longitudeDelta: 0.0045,
        }}
        style={styles.mapView} 
      > 
        <MapView.Marker 
          coordinate={origin}
        />
  
        <MapView.Marker 
          coordinate={destination}
        />

        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={5}
          strokeColor='#00a0e5'
        />
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  mapView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
