import React, { useState, useRef } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import BottomSheet from "reanimated-bottom-sheet";
import Carousel from "react-native-snap-carousel";

import { InitialRegion, Coordinate, City, Battle } from "../utils/types";
import { MARKER_ICONS } from "../utils/markerIcons";
import carouselItem from "./CarouselItem";

const { width, height } = Dimensions.get("window");
const aspectRadio = width / height;
const DEFAULT_LATITUDE_DELTA = 1;
const DEFAULT_ANIMATE_DURATION = 2000;

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

  const mapRef = useRef<MapView>(null);
  const markerRefs: Array<Marker | null> = [];
  const bottomSheetRef = useRef<BottomSheet>(null);
  // @ts-ignore: bad practice, needs future fix
  const carouselRef = useRef<Carousel>(null);

  const onMarkerPressed = (coordinate: Coordinate, index: number) => {
    mapRef.current &&
      mapRef.current.animateToRegion(
        {
          ...coordinate,
          latitudeDelta: DEFAULT_LATITUDE_DELTA,
          longitudeDelta: DEFAULT_LATITUDE_DELTA * aspectRadio,
        },
        DEFAULT_ANIMATE_DURATION
      );
    bottomSheetRef.current && bottomSheetRef.current.snapTo(0);
    carouselRef.current && carouselRef.current.snapToItem(index);
  };

  const onCarouselItemChange = (index: number) => {
    mapRef.current &&
      mapRef.current.animateToRegion(
        {
          ...battles[index].coordinate,
          latitudeDelta: DEFAULT_LATITUDE_DELTA,
          longitudeDelta: DEFAULT_LATITUDE_DELTA * aspectRadio,
        },
        DEFAULT_ANIMATE_DURATION
      );
    markerRefs[index]!.showCallout(); // bad practice, needs future fix
  };

  const bottomSheetContent = () => (
    <View style={styles.panel}>
      <Carousel
        ref={carouselRef}
        data={battles}
        renderItem={carouselItem}
        itemWidth={(width * 3) / 4} // add itemHeight & sliderHeight for vertical carousel in landscape mode
        sliderWidth={width}
        onSnapToItem={(index) => onCarouselItemChange(index)}
      />
    </View>
  );

  const bottomSheetHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        ref={mapRef}
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

        {battles.map(({ title, pinColor, coordinate, type }, index) => (
          <Marker
            key={`battle_${JSON.stringify(coordinate)}`}
            ref={(ref) => (markerRefs[index] = ref)}
            title={title}
            coordinate={coordinate}
            onPress={() => onMarkerPressed(coordinate, index)}
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

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={["30%", "3%", "3%"]}
        initialSnap={1}
        renderContent={bottomSheetContent}
        renderHeader={bottomSheetHeader}
        enabledContentGestureInteraction={false}
        onOpenEnd={() =>
          carouselRef.current.currentIndex === 0 && onCarouselItemChange(0)
        }
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
  header: {
    backgroundColor: "#f7f5eee8",
    shadowColor: "#000000",
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panel: {
    height: 600,
    padding: 20,
    backgroundColor: "#f7f5eee8",
  },
});

export default Map;
