import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MapView, { PROVIDER_GOOGLE, MapTypes, Marker } from "react-native-maps";
import ClusteredMapView from "react-native-map-clustering";
import { Modalize } from "react-native-modalize";
import { Fab, Button } from "native-base";

import { RootState } from "../redux/store";
import { InitialRegion, GeojsonType, Timeline, PointFeature } from "../types";
import {
  DEFAULT_LATITUDE_DELTA,
  DEFAULT_ANIMATE_DURATION,
  EDGE_PADDING_PORTRAIT,
  EDGE_PADDING_LANDSCAPE,
} from "../settings";
import { COLOR_MAP } from "../assets/peloponnesian_war/settings";
import PolygonGeojson from "./PolygonGeojson";
import IconMarker from "./IconMarker";
import TabViewModal from "./TabViewModal";

const { width, height } = Dimensions.get("window");
const aspectRatio = width / height;

type Props = {
  initialRegion: InitialRegion;
  locations: GeojsonType;
  areas: GeojsonType;
  timeline: Timeline;
};

const Map = ({
  initialRegion: { latitude, longitude, latitudeDelta },
  locations,
  areas,
  timeline,
}: Props) => {
  const { orientation, modalPosition } = useSelector(
    (state: RootState) => state
  );

  const isInitialMount = useRef(true);
  const mapRef = useRef<MapView>(null);
  const modalRef = useRef<Modalize>(null);

  const [region, setRegion] = useState({
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta: latitudeDelta * aspectRatio,
  });
  // active map type
  const [mapType, setMapType] = useState<MapTypes>("terrain");
  // active timeline locations
  const [activeLocations, setActiveLocations] = useState<string[]>([]);
  // active fab popups
  const [fabActive, setFabActive] = useState({ top: false, bottom: false });
  // active marker types
  const [markerFilters, setMarkerFilters] = useState<{
    [index: string]: boolean;
  }>({
    battle: true,
    city: true,
  });

  // persist (initial) modal position after orientation change (top and closed auto kept)
  useEffect(() => {
    modalPosition === "initial" && modalRef.current && modalRef.current.open();
  }, [orientation]);

  const handleMapTypeChange = (type: string) => {
    setMarkerFilters({
      ...markerFilters,
      [type]: !markerFilters[type],
    });
  };

  const handleOpenModal = () => {
    modalRef.current && modalRef.current.open();
  };

  // fit map to active location markers on activeLocations change
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      let features = locations.features;
      if (activeLocations.length) {
        features = activeLocations
          .map((location) =>
            features.filter((feature: PointFeature) => feature.id === location)
          )
          .flat();
      }
      const coordinates = features.map((feature: PointFeature) => ({
        latitude: feature.geometry.coordinates[1],
        longitude: feature.geometry.coordinates[0],
      }));

      // use animateToRegion method instead of fitToCoordinates with only 1 active location to avoid over zooming
      if (activeLocations.length === 1) {
        mapRef.current &&
          mapRef.current.animateToRegion(
            {
              ...coordinates[0],
              latitudeDelta: DEFAULT_LATITUDE_DELTA,
              longitudeDelta: DEFAULT_LATITUDE_DELTA * aspectRatio,
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

  // @TODO: reset map to initialRegion (unused)
  const handleResetCamera = () => {
    setActiveLocations([]);
    modalRef.current && modalRef.current.close();
  };

  return (
    <View style={styles.container}>
      <ClusteredMapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        mapType={mapType}
        onRegionChangeComplete={(region) => setRegion(region)}
        radius={10} // SuperCluster radius
      >
        <PolygonGeojson geojson={areas} strokeWidth={0} />

        {locations.features
          .filter((feature: PointFeature) =>
            !activeLocations.length
              ? Object.keys(markerFilters)
                  .filter((item) => markerFilters[item])
                  .includes(feature.properties.type)
              : activeLocations.includes(feature.id as string)
          )
          .map(
            ({
              id,
              geometry: { coordinates },
              properties: { name, type, description, highlight, status },
            }: PointFeature) => (
              <Marker
                key={id}
                title={name}
                description={description}
                coordinate={{
                  latitude: coordinates[1],
                  longitude: coordinates[0],
                }}
                anchor={{ x: 1, y: 1 }}
                calloutAnchor={{ x: 0, y: 0 }}
                rotation={45}
                tracksViewChanges={false}
              >
                <IconMarker
                  name={type}
                  color={
                    highlight
                      ? COLOR_MAP[`${status}Highlight`]
                      : COLOR_MAP[status]
                  }
                />
              </Marker>
            )
          )}
      </ClusteredMapView>

      <Fab
        style={styles.fab}
        active={fabActive.top}
        direction="down"
        position="topRight"
        onPress={() => setFabActive({ ...fabActive, top: !fabActive.top })}
      >
        <MaterialCommunityIcons
          style={styles.fabIcon}
          name={"layers-outline"}
        />
        {[
          { name: "standard", icon: "map" },
          { name: "hybrid", icon: "satellite" },
          { name: "terrain", icon: "terrain" },
          { name: "none", icon: "selection-off" },
        ].map(({ name, icon }) => (
          <Button
            key={`mapType-${name}`}
            style={
              mapType === name ? [styles.fab, styles.activeFab] : styles.fab
            }
            disabled={mapType === name}
            onPress={() => {
              setMapType(name as MapTypes);
              setFabActive({ ...fabActive, top: !fabActive.top });
            }}
          >
            <MaterialCommunityIcons name={icon} size={24} />
          </Button>
        ))}
      </Fab>

      <Fab
        style={styles.fab}
        active={fabActive.bottom}
        direction="up"
        position="bottomRight"
        onPress={() =>
          setFabActive({ ...fabActive, bottom: !fabActive.bottom })
        }
      >
        <MaterialCommunityIcons
          style={styles.fabIcon}
          name={
            Object.values(markerFilters).every((item) => item)
              ? "filter-outline"
              : "filter"
          }
        />
        {[
          { name: "city", icon: "home-outline", iconActive: "home" },
          { name: "battle", icon: "skull-outline", iconActive: "skull" },
        ].map(({ name, icon, iconActive }) => (
          <Button
            key={`filter-${name}`}
            style={styles.fab}
            onPress={() => handleMapTypeChange(name)}
          >
            <MaterialCommunityIcons
              name={markerFilters[name] ? iconActive : icon}
              size={24}
            />
          </Button>
        ))}
      </Fab>

      <Fab style={styles.fab} position="bottomLeft" onPress={handleOpenModal}>
        <MaterialCommunityIcons style={styles.fabIcon} name={"timeline-text"} />
      </Fab>

      <TabViewModal
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
    backgroundColor: "#FFF",
    elevation: 0,
  },

  fabIcon: {
    color: "#000",
  },

  activeFab: {
    borderWidth: 1,
    borderColor: "blue",
  },
});

export default Map;
