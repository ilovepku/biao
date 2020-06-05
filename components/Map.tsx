import React, { useState, useRef } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import BottomSheet from "reanimated-bottom-sheet";
import Carousel from "react-native-snap-carousel";

import { InitialRegion, Coordinate, City, Battle } from "../utils/types";
import { MARKER_ICONS } from "../utils/markerIcons";
import IconMarker from "../components/IconMarker";
import BottomSheetHeader from "./BottomSheetHeader";
import CarouselItem from "./CarouselItem";

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
  const [viewport, setViewport] = useState(Dimensions.get("window"));
  const aspectRadio = viewport.width / viewport.height;
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

  const BottomSheetContent = () => (
    <View style={styles.bottomSheetPanel}>
      <Carousel
        ref={carouselRef}
        data={battles}
        renderItem={CarouselItem}
        itemWidth={Math.round(viewport.width * 0.7)} // add itemHeight & sliderHeight for vertical carousel in landscape mode
        sliderWidth={viewport.width}
        onSnapToItem={(index) => onCarouselItemChange(index)}
      />
    </View>
  );

  return (
    <View
      style={styles.container}
      onLayout={() => {
        setViewport(Dimensions.get("window"));
      }}
    >
      <MapView
        style={styles.map}
        ref={mapRef}
        initialRegion={region}
        mapType="terrain" // add switch / fallback for iOS
        onRegionChangeComplete={(region) => setRegion(region)}
      >
        {cities.map(({ title, description, color, coordinate }) => (
          <Marker
            key={`city_${JSON.stringify(coordinate)}`}
            title={title}
            description={description}
            coordinate={coordinate}
            anchor={{ x: 1, y: 1 }}
            calloutAnchor={{ x: 0, y: 0 }}
            rotation={45}
            tracksViewChanges={false}
          >
            <IconMarker name={"home-map-marker"} color={color} />
          </Marker>
        ))}

        {battles.map(({ title, color, coordinate, type }, index) => (
          <Marker
            key={`battle_${JSON.stringify(coordinate)}`}
            ref={(ref) => (markerRefs[index] = ref)}
            title={title}
            coordinate={coordinate}
            anchor={{ x: 1, y: 1 }}
            calloutAnchor={{ x: 0, y: 0 }}
            rotation={45}
            tracksViewChanges={false}
            onPress={() => onMarkerPressed(coordinate, index)}
          >
            <IconMarker name={MARKER_ICONS[type]} color={color} />
          </Marker>
        ))}
      </MapView>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={["30%", "3%", "3%"]}
        initialSnap={1}
        renderContent={BottomSheetContent}
        renderHeader={BottomSheetHeader}
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
  bottomSheetPanel: {
    padding: 10,
    backgroundColor: "#f7f5eee8",
  },
});

export default Map;
