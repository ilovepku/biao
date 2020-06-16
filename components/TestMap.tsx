import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import MapView, { Marker, LatLng } from "react-native-maps";
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
import Geojson from "./Geojson";
import TabViewModal from "./TabViewModal";

const MODAL_HEIGHT_PORTRAIT = 275;
const MODAL_HEIGHT_LANDSCAPE = 175;

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
  const isInitialMount = useRef(true);
  const mapRef = useRef<MapView>(null);
  const markerRefs: Array<Marker | null> = [];
  const modalRef = useRef<Modalize>(null);

  const [orientation, setOrientation] = useState(0);
  const [viewport, setViewport] = useState(Dimensions.get("window"));
  const aspectRadio = viewport.width / viewport.height;
  const [region, setRegion] = useState({
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta: latitudeDelta * aspectRadio,
  });
  const [activeLocations, setActiveLocations] = useState([""]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      mapRef.current &&
        mapRef.current.fitToCoordinates(
          activeLocations
            .map((location) =>
              cities.features.filter(
                (feature: Feature) => feature.properties!.name === location
              )
            )
            .flat()
            .map((feature) => ({
              latitude: feature.geometry.coordinates[1],
              longitude: feature.geometry.coordinates[0],
            })),
          {
            edgePadding:
              orientation === 3 || orientation === 4 // orientation is landscape
                ? {
                    top: 100,
                    right: 100,
                    bottom: 100 + 2 * MODAL_HEIGHT_LANDSCAPE,
                    left: 100,
                  }
                : {
                    top: 100,
                    right: 100,
                    bottom: 100 + 2 * MODAL_HEIGHT_PORTRAIT,
                    left: 100,
                  },
          }
        );
    }
    return () => {
      isInitialMount.current = false;
    };
  }, [activeLocations]);

  useEffect(() => {
    ScreenOrientation.addOrientationChangeListener(() => {
      ScreenOrientation.getOrientationAsync().then((orientation) =>
        setOrientation(orientation)
      );
    });
    return () => ScreenOrientation.removeOrientationChangeListeners();
  }, []);

  const handleOpen = () => {
    modalRef.current && modalRef.current.open();
  };

  const resetToInitialRegion = () => {
    mapRef.current &&
      mapRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta: latitudeDelta * aspectRadio,
      });
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
            features: cities.features.filter((feature: Feature) =>
              activeLocations.includes(feature.properties!.name)
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

      <TabViewModal
        snapPoint={
          orientation === 3 || orientation === 4 // orientation is landscape
            ? MODAL_HEIGHT_LANDSCAPE
            : MODAL_HEIGHT_PORTRAIT
        }
        tabRoutes={timeline}
        setActiveLocations={setActiveLocations}
        ref={modalRef}
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
