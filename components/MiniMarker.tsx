import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

interface Props {
  color?: string;
}

const MiniMarker = memo(({ color = "#c30b82" }: Props) => (
  <View style={[styles.miniIcon, { backgroundColor: color }]} />
));

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
