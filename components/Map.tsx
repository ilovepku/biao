import React, { useState } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import Carousel from "react-native-snap-carousel";

import { InitialRegion, City, Battle } from "../utils/types";
import { MARKER_ICONS } from "../utils/markerIcons";
import carouselItem from "./CarouselItem";

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

      <Carousel
        // ref={carouselRef}
        containerCustomStyle={styles.carousal}
        data={battles}
        renderItem={carouselItem}
        itemWidth={350} // add itemHeight & sliderHeight for vertical carousel in landscape mode
        sliderWidth={width}
        // onSnapToItem={(index) => onCarouselItemChange(index)}
      />
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
  carousal: {
    position: "absolute",
    bottom: 0,
  },
});

export default Map;
