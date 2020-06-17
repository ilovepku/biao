import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import MapView from "react-native-maps";
import { Modalize } from "react-native-modalize";
import { FAB } from "react-native-paper";

import {
  InitialRegion,
  Battle,
  Attraction,
  GeojsonType,
  GeojsonWrapper,
  Timeline,
  PointFeature,
} from "../types";
import Geojson from "./Geojson";
import TabViewModal from "./TabViewModal";

const MODAL_HEIGHT_PORTRAIT = 275;
const MODAL_HEIGHT_LANDSCAPE = 175;

const EDGE_PADDING_PORTRAIT = {
  top: 100,
  right: 100,
  bottom: 100 + 2 * MODAL_HEIGHT_PORTRAIT,
  left: 100,
};
const EDGE_PADDING_LANDSCAPE = {
  top: 100,
  right: 100,
  bottom: 100 + 2 * MODAL_HEIGHT_LANDSCAPE,
  left: 100,
};

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
            cities.features.filter(
              (feature: PointFeature) => feature.id === location
            )
          )
          .flat()
          .map((feature) => ({
            latitude: feature.geometry.coordinates[1],
            longitude: feature.geometry.coordinates[0],
          }));
      } else {
        coordinates = cities.features.map((feature: PointFeature) => ({
          latitude: feature.geometry.coordinates[1],
          longitude: feature.geometry.coordinates[0],
        }));
      }
      mapRef.current &&
        mapRef.current.fitToCoordinates(coordinates, {
          edgePadding:
            orientation === 3 || orientation === 4 // orientation is landscape
              ? EDGE_PADDING_LANDSCAPE
              : EDGE_PADDING_PORTRAIT,
        });
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

        {!activeLocations.length && <Geojson geojson={cities} />}

        <Geojson
          geojson={{
            ...cities,
            features: cities.features.filter((feature: PointFeature) =>
              activeLocations.includes(feature.id as string)
            ),
          }}
        />
      </MapView>

      <FAB
        style={styles.fab}
        icon="skip-backward"
        small
        onPress={handleResetCamera}
      />

      <FAB
        style={styles.fab2}
        icon="skip-backward"
        small
        onPress={handleOpenModal}
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
