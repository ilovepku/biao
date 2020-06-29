import React from "react";
import { StyleSheet, View } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Fab } from "native-base";
import { DrawerParamList } from "../App";
import { INITIAL_REGION } from "../assets/peloponnesian_war/settings";
import LOCATIONS from "../assets/peloponnesian_war/locations.json";
import AREAS from "../assets/peloponnesian_war/areas.json";
import TIMELINE from "../assets/peloponnesian_war/timeline.json";

import Map from "./Map";

type MapScreenNavigationProp = DrawerNavigationProp<DrawerParamList, "Map">;

type Props = {
  navigation: MapScreenNavigationProp;
};

ScreenOrientation.unlockAsync();

const MapScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Map
        initialRegion={INITIAL_REGION}
        locations={LOCATIONS}
        timeline={TIMELINE}
        areas={AREAS}
      />
      <Fab
        style={styles.fab}
        position="topLeft"
        onPress={() => navigation.openDrawer()}
      >
        <MaterialCommunityIcons style={styles.fabIcon} name={"menu"} />
      </Fab>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  fab: {
    backgroundColor: "#FFF",
  },

  fabIcon: {
    color: "#000",
  },
});

export default MapScreen;
