import React from "react";
import { StyleSheet, View } from "react-native";

const MiniMarker = ({ color = "#c30b82" }: { color?: string }) => (
  <View style={[styles.miniIcon, { backgroundColor: color }]} />
);

export default MiniMarker;

const styles = StyleSheet.create({
  miniIcon: {
    width: 10,
    height: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#fff",
  },
});
