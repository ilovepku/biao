import React from "react";
import { StyleSheet, View } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";

import { INITIAL_REGION } from "./assets/peloponnesian_war/settings";
import LOCATIONS from "./assets/peloponnesian_war/locations.json";
import AREAS from "./assets/peloponnesian_war/areas.json";
import ATTRACTIONS from "./assets/peloponnesian_war/attractions";
import TIMELINE from "./assets/peloponnesian_war/timeline.json";

import TestMap from "./components/TestMap";

ScreenOrientation.unlockAsync();

export default function App() {
  return (
    <View style={styles.container}>
      <TestMap
        initialRegion={INITIAL_REGION}
        locations={LOCATIONS}
        attractions={ATTRACTIONS}
        timeline={TIMELINE}
        areas={AREAS}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
