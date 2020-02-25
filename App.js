import React from 'react';
import {StyleSheet} from 'react-native';
import MapView from 'react-native-maps';

// import { Container } from './styles';

export default function App() {
  return (
    <MapView
      initialRegion={{
        latitude: -27.210671,
        longitude: -49.63627,
        latitudeDelta: 0.0042,
        longitudeDelta: 0.0045,
      }}
      style={styles.mapView}
    />
  );
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
