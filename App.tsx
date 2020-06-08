import React from "react";
import { StyleSheet, View } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";

import { INITIAL_REGION } from "./assets/peloponnesian_war/general";
import CITIES from "./assets/peloponnesian_war/cities";
import BATTLES from "./assets/peloponnesian_war/battles";
import ATTRACTIONS from "./assets/peloponnesian_war/attractions";

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
