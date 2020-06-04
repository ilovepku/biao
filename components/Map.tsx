import React, { useState } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { InitialRegion, City } from "../utils/types";

const { width, height } = Dimensions.get("window");
const aspectRadio = width / height;

const Map = ({
  initialRegion: { latitude, longitude, latitudeDelta },
  cities,
}: {
  initialRegion: InitialRegion;
  cities: City[];
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
      >
        {cities.map(({ title, description, pinColor, coordinate }) => (
          <Marker
            key={`city_${JSON.stringify(coordinate)}`}
            title={title}
            description={description}
            pinColor={pinColor}
            coordinate={coordinate}
            tracksViewChanges={false}
          />
        ))}
      </MapView>
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
