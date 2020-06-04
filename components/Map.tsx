import React, { useState } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";

import { InitialRegion, City, Battle } from "../utils/types";
import { MARKER_ICONS } from "../utils/markerIcons";

const { width, height } = Dimensions.get("window");
const aspectRadio = width / height;

const Map = ({
  initialRegion: { latitude, longitude, latitudeDelta },
  cities,
  battles,
}: {
  initialRegion: InitialRegion;
  cities: City[];
  battles: Battle[];
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

        {battles.map(({ title, pinColor, coordinate, type } /* , index */) => (
          <Marker
            key={`battle_${JSON.stringify(coordinate)}`}
            // ref={(ref) => (markerRefs[index] = ref)}
            title={title}
            coordinate={coordinate}
            //onPress={() => onMarkerPressed(coordinate, index)}
          >
            <MaterialCommunityIcons
              name={MARKER_ICONS[type]}
              size={24}
              color={pinColor}
              style={styles.icon}
            />
          </Marker>
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
  icon: {
    textShadowColor: "#000",
    textShadowRadius: 1,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
  },
});

export default Map;
