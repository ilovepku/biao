import React from "react";
import { StyleSheet, View } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";

import Map from "./components/Map";
import {
  INITIAL_REGION,
  CITIES,
  BATTLES,
  ATTRACTIONS,
} from "./assets/peloponnesian_war";

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
