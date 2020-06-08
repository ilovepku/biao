import React from "react";
import { StyleSheet, View } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";

import { INITIAL_REGION } from "./assets/peloponnesian_war/general";
import CITIES from "./assets/peloponnesian_war/cities";
import BATTLES from "./assets/peloponnesian_war/battles";
import ATTRACTIONS from "./assets/peloponnesian_war/attractions";

import delian from "./assets/peloponnesian_war/delian.json";
import peloponnesian from "./assets/peloponnesian_war/peloponnesian.json";
import neutral from "./assets/peloponnesian_war/neutral.json";

import Map from "./components/Map";

ScreenOrientation.unlockAsync();

export default function App() {
  return (
    <View style={styles.container}>
      <Map
        initialRegion={INITIAL_REGION}
        cities={CITIES}
        battles={BATTLES}
        attractions={ATTRACTIONS}
        geojsons={[
          { name: "delian", color: "rgba(69,102,176,.75)", geojson: delian },
          {
            name: "peloponnesian",
            color: "rgba(218,76,76,.75)",
            geojson: peloponnesian,
          },
          { name: "neutral", color: "rgba(118,118,118,.75)", geojson: neutral },
        ]}
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
