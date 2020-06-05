import React from "react";
import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const IconMarker = ({ name, color }: { name: string; color: string }) => (
  <View style={[styles.container, { backgroundColor: color }]}>
    <View style={styles.circle}>
      <MaterialCommunityIcons name={name} size={20} color={color} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
  },
  circle: {
    width: 24,
    height: 24,
    margin: 3,
    backgroundColor: "#fff",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default IconMarker;
