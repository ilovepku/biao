import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Container, View, Text, Fab, Button } from "native-base";
import MapView, { PROVIDER_GOOGLE, MapTypes, Marker } from "react-native-maps";
import ClusteredMapView from "react-native-map-clustering";
import { Modalize } from "react-native-modalize";

import { INITIAL_REGION } from "../assets/peloponnesian_war/settings";
import {
  DEFAULT_LATITUDE_DELTA,
  DEFAULT_ANIMATE_DURATION,
  EDGE_PADDING_PORTRAIT,
  EDGE_PADDING_LANDSCAPE,
} from "../settings";
import { MARKER_COLOR_MAP } from "../assets/peloponnesian_war/settings";
import { DrawerParamList } from "../types";
import { RootState } from "../redux/store";
import LOCATIONS from "../assets/peloponnesian_war/locations.json";
import AREAS from "../assets/peloponnesian_war/areas.json";
import TIMELINE from "../assets/peloponnesian_war/timeline.json";
import PolygonGeojson from "./PolygonGeojson";
import IconMarker from "./IconMarker";
import TabViewModal from "./TabViewModal";

const { width, height } = Dimensions.get("window");
const aspectRatio = width / height;
const { latitude, longitude, latitudeDelta } = INITIAL_REGION;

type MapScreenNavigationProp = DrawerNavigationProp<DrawerParamList, "Map">;

type Props = {
  navigation: MapScreenNavigationProp;
};

const MapScreen = ({ navigation }: Props) => {
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

  // fit map to active location markers on activeLocations change
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      let features = LOCATIONS.features;
      if (activeLocations.length) {
        features = activeLocations
          .map((location) =>
            features.filter((feature) => feature.id === location)
          )
          .flat();
      }
      const coordinates = features.map((feature) => ({
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
              orientation === "landscape"
                ? EDGE_PADDING_LANDSCAPE
                : EDGE_PADDING_PORTRAIT,
          });
      }
    }
    return () => {
      isInitialMount.current = false;
    };
  }, [activeLocations]);

  const handleMapTypeChange = (type: string) => {
    setMarkerFilters({
      ...markerFilters,
      [type]: !markerFilters[type],
    });
  };

  const handleOpenModal = () => {
    modalRef.current && modalRef.current.open();
  };

  const handleResetToInitialRegion = () => {
    setActiveLocations([]);
    modalRef.current && modalRef.current.close();
  };

  return (
    <Container style={styles.container}>
      <ClusteredMapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        mapType={mapType}
        onRegionChangeComplete={(region) => setRegion(region)}
        radius={10} // SuperCluster radius
        renderCluster={({
          id,
          geometry: { coordinates },
          properties: { point_count },
        }) => (
          <Marker
            key={`cluster-${id}`}
            coordinate={{
              latitude: coordinates[1],
              longitude: coordinates[0],
            }}
            tracksViewChanges={false}
          >
            <View
              style={[
                styles.cluster,
                { width: 16 + 2 * point_count, height: 16 + 2 * point_count },
              ]}
            >
              <Text
                style={[styles.clusterText, { fontSize: 10 + 2 * point_count }]}
              >
                {point_count}
              </Text>
            </View>
          </Marker>
        )}
      >
        <PolygonGeojson geojson={AREAS} strokeWidth={0} />

        {LOCATIONS.features
          .filter((feature) =>
            !activeLocations.length
              ? Object.keys(markerFilters)
                  .filter((item) => markerFilters[item])
                  .includes(feature.properties.type)
              : activeLocations.includes(feature.id as string) &&
                Object.keys(markerFilters)
                  .filter((item) => markerFilters[item])
                  .includes(feature.properties.type)
          )
          .map(
            ({
              id,
              geometry: { coordinates },
              properties: { name, type, description, highlight, status },
            }) => (
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
                      ? MARKER_COLOR_MAP[`${status}Highlight`].color
                      : MARKER_COLOR_MAP[status].color
                  }
                />
              </Marker>
            )
          )}
      </ClusteredMapView>

      <Fab
        style={[styles.fab, styles.fabMain]}
        active={fabActive.top}
        direction="down"
        position="topLeft"
        onPress={() => setFabActive({ ...fabActive, top: !fabActive.top })}
      >
        <MaterialCommunityIcons
          style={styles.fabIcon}
          name={"layers-outline"}
        />
        {[
          { name: "standard", label: "Default", icon: "map" },
          { name: "hybrid", label: "Satellite", icon: "satellite" },
          { name: "terrain", label: "Terrain", icon: "terrain" },
        ].map(({ name, label, icon }) => (
          <Button
            key={`mapType-${name}`}
            style={
              mapType === name ? [styles.fab, styles.activeFab] : styles.fab
            }
            disabled={mapType === name}
            onPress={() => setMapType(name as MapTypes)}
          >
            <Text style={[styles.fabLabel, styles.fabLabelLeft]}>{label}</Text>
            <MaterialCommunityIcons name={icon} size={24} />
          </Button>
        ))}

        <Button
          style={[styles.fab, { marginTop: 15 }]}
          onPress={handleResetToInitialRegion}
        >
          <Text style={[styles.fabLabel, styles.fabLabelLeft]}>Reset View</Text>
          <MaterialCommunityIcons name="restore" size={24} />
        </Button>
      </Fab>

      <Fab
        style={[styles.fab, styles.fabMain]}
        active={fabActive.bottom}
        direction="down"
        position="topRight"
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
          {
            name: "city",
            label: "Cities",
            icon: "home-outline",
            iconActive: "home",
          },
          {
            name: "battle",
            label: "Battles",
            icon: "skull-outline",
            iconActive: "skull",
          },
        ].map(({ name, label, icon, iconActive }) => (
          <Button
            key={`filter-${name}`}
            style={styles.fab}
            onPress={() => handleMapTypeChange(name)}
          >
            <Text style={[styles.fabLabel, styles.fabLabelRight]}>{label}</Text>
            <MaterialCommunityIcons
              name={markerFilters[name] ? iconActive : icon}
              size={24}
            />
          </Button>
        ))}
      </Fab>

      <Fab
        style={[styles.fab, styles.fabMain]}
        position="bottomLeft"
        onPress={() => navigation.openDrawer()}
      >
        <MaterialCommunityIcons style={styles.fabIcon} name={"menu"} />
      </Fab>

      <Fab
        style={[styles.fab, styles.fabMain]}
        position="bottomRight"
        onPress={handleOpenModal}
      >
        <MaterialCommunityIcons style={styles.fabIcon} name={"timeline-text"} />
      </Fab>

      <TabViewModal
        tabRoutes={TIMELINE}
        setActiveLocations={setActiveLocations}
        ref={modalRef}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },

  cluster: {
    borderRadius: 50,
    backgroundColor: "rgba(92, 184, 92, .75)",
    borderWidth: 1,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  clusterText: { color: "#FFF" },

  fab: {
    backgroundColor: "#FFF",
    elevation: 0,
  },

  fabMain: {
    width: 45,
    height: 45,
  },

  fabLabel: {
    position: "absolute",
    color: "#000",
    backgroundColor: "#FFF",
    padding: 1,
    borderRadius: 5,
  },

  fabLabelRight: {
    right: 50,
  },

  fabLabelLeft: {
    left: 50,
  },

  fabIcon: {
    color: "#000",
  },

  activeFab: {
    borderWidth: 1,
    borderColor: "blue",
  },
});

export default MapScreen;
