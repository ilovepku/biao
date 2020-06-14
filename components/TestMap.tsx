import React, { useRef, useState } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
// import * as ScreenOrientation from "expo-screen-orientation";
// @ts-ignore: temp fix for @types/react-native-maps
import MapView, { Geojson, Marker, LatLng } from "react-native-maps";
import { Modalize } from "react-native-modalize";
import { FAB } from "react-native-paper";

import {
  InitialRegion,
  Battle,
  Attraction,
  GeojsonType,
  GeojsonWrapper,
  Timeline,
} from "../types";
import { Feature } from "geojson";
import { MARKER_ICONS } from "../utils/markerIcons";
import IconMarker from "../components/IconMarker";
import MiniMarker from "./MiniMarker";
import TabViewModal from "./TabViewModal";

const DEFAULT_LATITUDE_DELTA = 1;
const DEFAULT_ANIMATE_DURATION = 2000;

interface Props {
  initialRegion: InitialRegion;
  cities: GeojsonType;
  battles: Battle[];
  attractions: Attraction[];
  timeline: Timeline;
  geojsons: GeojsonWrapper[];
}

const Map = ({
  initialRegion: { latitude, longitude, latitudeDelta },
  cities,
  battles,
  attractions,
  timeline,
  geojsons,
}: Props) => {
  const mapRef = useRef<MapView>(null);
  const markerRefs: Array<Marker | null> = [];
  const modalRef = useRef<Modalize>(null);
  // const bottomSheetRef = useRef<BottomSheet>(null);
  // @ts-ignore: bad practice, needs future fix
  // const carouselRef = useRef<Carousel>(null);

  // const [orientation, setOrientation] = useState(0);
  const [viewport, setViewport] = useState(Dimensions.get("window"));
  const aspectRadio = viewport.width / viewport.height;
  const [region, setRegion] = useState({
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta: latitudeDelta * aspectRadio,
  });

  /* useEffect(() => {
    ScreenOrientation.addOrientationChangeListener(() => {
      ScreenOrientation.getOrientationAsync().then((orientation) =>
        setOrientation(orientation)
      );
      bottomSheetRef.current && bottomSheetRef.current.snapTo(2);
    });
    return () => ScreenOrientation.removeOrientationChangeListeners();
  }, []); */

  const handleOpen = () => {
    modalRef.current && modalRef.current.open();
  };

  const onMarkerPressed = (coordinate: LatLng, index: number) => {
    mapRef.current &&
      mapRef.current.animateToRegion(
        {
          ...coordinate,
          latitudeDelta: DEFAULT_LATITUDE_DELTA,
          longitudeDelta: DEFAULT_LATITUDE_DELTA * aspectRadio,
        },
        DEFAULT_ANIMATE_DURATION
      );
    // bottomSheetRef.current && bottomSheetRef.current.snapTo(1);
    // carouselRef.current && carouselRef.current.snapToItem(index);
  };

  const resetToInitialRegion = () => {
    mapRef.current &&
      mapRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta: latitudeDelta * aspectRadio,
      });
    // bottomSheetRef.current && bottomSheetRef.current.snapTo(2);
  };

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
        {geojsons.map(({ name, color, geojson }) => (
          <Geojson
            key={`geojson_${name}`}
            geojson={geojson}
            fillColor={color}
            strokeWidth={0}
          />
        ))}

        <Geojson
          geojson={{
            ...cities,
            features: cities.features.filter(
              (feature: Feature) => feature.properties!.name === "Athens"
            ),
          }}
        />

        {/* battles.map(({ title, color, coordinate, type }, index) => (
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
            {region.latitudeDelta <= 5.5 ? (
              <IconMarker name={MARKER_ICONS[type]} color={color} />
            ) : (
              <MiniMarker color={color} />
            )}
          </Marker>
        )) */}

        {/* attractions.map(({ title, coordinate, type }) => (
          <Marker
            key={`attraction_${JSON.stringify(coordinate)}`}
            title={title}
            coordinate={coordinate}
            anchor={{ x: 1, y: 1 }}
            calloutAnchor={{ x: 0, y: 0 }}
            rotation={45}
            tracksViewChanges={false}
          >
            {region.latitudeDelta <= 0.25 ? (
              <IconMarker name={type} png />
            ) : (
              <MiniMarker />
            )}
          </Marker>
        )) */}
      </MapView>

      <FAB
        style={styles.fab}
        icon="skip-backward"
        small
        onPress={resetToInitialRegion}
      />

      <FAB
        style={styles.fab2}
        icon="skip-backward"
        small
        onPress={handleOpen}
      />

      <TabViewModal tabRoutes={timeline} ref={modalRef} />
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

  fab: {
    position: "absolute",
    margin: 16,
    top: 0,
    right: 0,
  },

  fab2: {
    position: "absolute",
    margin: 16,
    bottom: 0,
    right: 0,
  },
});

export default Map;
