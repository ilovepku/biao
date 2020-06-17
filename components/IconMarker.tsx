import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import getIconPngSource from "../utils/getIconPngSource";

interface Props {
  name: string;
  color?: string;
  png?: boolean;
}

const IconMarker = ({ name, color = "#c30b82", png = false }: Props) => (
  <View style={[styles.container, { backgroundColor: color }]}>
    {png ? (
      <Image
        source={getIconPngSource(name)}
        fadeDuration={0}
        style={styles.png}
      />
    ) : (
      <MaterialCommunityIcons
        style={styles.icon}
        name={name}
        size={16}
        color={"white"}
      />
    )}
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
  png: {
    width: 12,
    height: 12,
    transform: [{ rotate: "-45deg" }],
  },
  icon: {
    transform: [{ rotate: "-45deg" }],
  },
});

export default IconMarker;
