import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

// import { Container } from './styles';

export default class App extends Component {
  state = {
    origin: {latitude: -1.3707141, longitude: -48.4489327}, // Parque Shopping
    destination: {latitude: -1.3889826, longitude: -48.4668376}, // Clube de Engenharia
    embarqueDesejado: {latitude: -1.3808008, longitude: -48.4547614},
    embarque: {latitude: 0, longitude: 0},
    distanciaPercorrer: 50,
  };

  toRad = degrees => {
    var pi = Math.PI;
    return degrees * (pi / 180);
  };

  getDistance = (pontoA, pontoB) => {
    const raio = 6371;
    let distancia =
      raio *
      Math.acos(
        Math.cos(this.toRad(90 - pontoA.latitude)) *
          Math.cos(this.toRad(90 - pontoB.latitude)) +
          Math.sin(this.toRad(90 - pontoA.latitude)) *
            Math.sin(this.toRad(90 - pontoB.latitude)) *
            Math.cos(this.toRad(pontoA.longitude - pontoB.longitude)),
      );
    return distancia;
  };

  getPontoEmbarque = coordinates => {
    const {distanciaPercorrer, embarqueDesejado} = this.state;
    let distancia;
    let menor = null;
    let embarque = {latitude: 0, longitude: 0};

    coordinates.map(ponto => {
      distancia = this.getDistance(embarqueDesejado, ponto) * 1000;
      if (distancia <= distanciaPercorrer) {
        if (distancia < menor || !menor) {
          embarque = ponto;
          menor = distancia;
        }
      }
    });

    this.setState({embarque: embarque});
    // console.log(menor, embarque);
  };

  render() {
    const {origin, destination, embarque, embarqueDesejado} = this.state;
    const GOOGLE_MAPS_APIKEY = 'KEY';

    return (
      <MapView
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.0042,
          longitudeDelta: 0.0045,
        }}
        style={styles.mapView}>
        <MapView.Marker coordinate={origin} />

        <MapView.Marker coordinate={destination} />

        <MapView.Marker coordinate={embarqueDesejado} />

        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={5}
          strokeColor="#00a0e5"
          onReady={params => this.getPontoEmbarque(params.coordinates)}
        />

        <MapView.Marker coordinate={embarque} />
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
