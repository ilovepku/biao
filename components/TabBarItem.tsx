import React, { memo } from "react";
import {
  GestureResponderEvent,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { TAB_BAR_ITEM_WIDTH, TAB_BAR_ITEM_MARGIN } from "../assets/settings";

interface Props {
  active: boolean;
  year: number;
  emoji: string;
  onPress: (event: GestureResponderEvent) => void;
}

const TabBarItem = memo(({ active, year, emoji, onPress }: Props) => (
  <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.75}>
    <Text style={styles.item__emoji}>{emoji}</Text>
    <Text
      style={[styles.item__copy, { color: active ? "#1d9bd0" : "#d1d2d2" }]}
    >
      {year < 0 ? `${Math.abs(year)} BCE` : `${Math.abs(year)} CE`}
    </Text>
    {active && <View style={styles.item__line} />}
  </TouchableOpacity>
));

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",

    marginRight: TAB_BAR_ITEM_MARGIN,

    height: "100%",
    width: TAB_BAR_ITEM_WIDTH,
  },

  item__emoji: {
    fontSize: 22,
  },

  item__copy: {
    marginLeft: 4,

    fontSize: 14,

    color: "#d1d2d2",
  },

  item__line: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -1,

    height: 3,

    backgroundColor: "#1d9bd0",
  },
});

export default TabBarItem;
