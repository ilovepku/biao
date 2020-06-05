import React from "react";
import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const IconMarker = ({ name, color }: { name: string; color: string }) => (
  <View style={[styles.container, { backgroundColor: color }]}>
    <MaterialCommunityIcons
      style={styles.icon}
      name={name}
      size={16}
      color={"white"}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderWidth: 1,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    transform: [{ rotate: "-45deg" }],
  },
});

export default IconMarker;
