import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Modalize } from "react-native-modalize";
import { FAB } from "react-native-paper";
import { InitialRegion, GeojsonType, Timeline, PointFeature } from "../types";
import Geojson from "./Geojson";
import TabViewModal from "./TabViewModal";
import FabGroup from "./FabGroup";
import {
  DEFAULT_LATITUDE_DELTA,
  MINI_MARKER_LATITUDE_DELTA_THRESHOLD,
  DEFAULT_ANIMATE_DURATION,
  MODAL_HEIGHT_PORTRAIT,
  MODAL_HEIGHT_LANDSCAPE,
  EDGE_PADDING_PORTRAIT,
  EDGE_PADDING_LANDSCAPE,
} from "../settings";

interface Props {
  initialRegion: InitialRegion;
  locations: GeojsonType;
  areas: GeojsonType;
  attractions: GeojsonType;
  timeline: Timeline;
}

const Map = ({
  initialRegion: { latitude, longitude, latitudeDelta },
  locations,
  areas,
  attractions,
  timeline,
}: Props) => {
  const isInitialMount = useRef(true);
  const mapRef = useRef<MapView>(null);
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
  const [activeLocations, setActiveLocations] = useState<string[]>([]);
  const [markerFilters, setMarkerFilters] = useState<{
    [index: string]: boolean;
  }>({
    attraction: true,
    battle: true,
    city: true,
  });

  useEffect(() => {
    ScreenOrientation.addOrientationChangeListener(() => {
      ScreenOrientation.getOrientationAsync().then((orientation) =>
        setOrientation(orientation)
      );
    });
    return () => ScreenOrientation.removeOrientationChangeListeners();
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      let coordinates;
      if (activeLocations.length) {
        coordinates = activeLocations
          .map((location) =>
            locations.features.filter(
              (feature: PointFeature) => feature.id === location
            )
          )
          .flat()
          .map((feature) => ({
            latitude: feature.geometry.coordinates[1],
            longitude: feature.geometry.coordinates[0],
          }));
      } else {
        coordinates = locations.features.map((feature: PointFeature) => ({
          latitude: feature.geometry.coordinates[1],
          longitude: feature.geometry.coordinates[0],
        }));
      }
      if (activeLocations.length === 1) {
        mapRef.current &&
          mapRef.current.animateToRegion(
            {
              ...coordinates[0],
              latitudeDelta: DEFAULT_LATITUDE_DELTA,
              longitudeDelta: DEFAULT_LATITUDE_DELTA * aspectRadio,
            },
            DEFAULT_ANIMATE_DURATION
          );
      } else {
        mapRef.current &&
          mapRef.current.fitToCoordinates(coordinates, {
            edgePadding:
              orientation === 3 || orientation === 4 // orientation is landscape
                ? EDGE_PADDING_LANDSCAPE
                : EDGE_PADDING_PORTRAIT,
          });
      }
    }
    return () => {
      isInitialMount.current = false;
    };
  }, [activeLocations]);

  const handleLayoutChange = () => {
    setViewport(Dimensions.get("window"));
  };

  const handleResetCamera = () => {
    setActiveLocations([]);
    modalRef.current && modalRef.current.close();
  };

  const handleOpenModal = () => {
    modalRef.current && modalRef.current.open();
  };

  return (
    <View style={styles.container} onLayout={handleLayoutChange}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        mapType="terrain" // add switch / fallback for iOS
        onRegionChangeComplete={(region) => setRegion(region)}
      >
        <Geojson geojson={areas} strokeWidth={0} />

        {markerFilters.attraction && (
          <Geojson
            geojson={attractions}
            miniIcon={
              region.latitudeDelta > MINI_MARKER_LATITUDE_DELTA_THRESHOLD
            }
          />
        )}

        {!activeLocations.length ? (
          <Geojson
            geojson={{
              ...locations,
              features: locations.features.filter((feature: PointFeature) =>
                Object.keys(markerFilters)
                  .filter((item) => markerFilters[item])
                  .includes(feature.properties.type)
              ),
            }}
          />
        ) : (
          <Geojson
            geojson={{
              ...locations,
              features: locations.features.filter((feature: PointFeature) =>
                activeLocations.includes(feature.id as string)
              ),
            }}
          />
        )}
      </MapView>

      <FAB
        style={[styles.fab, styles.fabTopLeft]}
        icon="skip-backward"
        small
        onPress={handleResetCamera}
      />

      <FAB
        style={[styles.fab, styles.fabBottomLeft]}
        icon="timeline-text"
        small
        onPress={handleOpenModal}
      />

      <FabGroup
        markerFilters={markerFilters}
        setMarkerFilters={setMarkerFilters}
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
    width: 35,
    height: 35,
    zIndex: 0,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },

  fabTopLeft: {
    top: 0,
    left: 0,
  },

  fabBottomLeft: {
    bottom: 0,
    left: 0,
  },
});

export default Map;
