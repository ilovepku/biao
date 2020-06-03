import React, { useState } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import MapView from "react-native-maps";

import { InitialRegion } from "../utils/types";

const { width, height } = Dimensions.get("window");
const aspectRadio = width / height;

const Map = ({
  initialRegion: { latitude, longitude, latitudeDelta },
}: {
  initialRegion: InitialRegion;
}) => {
  const [region, setRegion] = useState({
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta: latitudeDelta * aspectRadio,
  });

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        mapType="terrain" // add switch / fallback for iOS
        onRegionChangeComplete={(region) => setRegion(region)}
      ></MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
