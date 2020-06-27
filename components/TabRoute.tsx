import React from "react";
import { Text, View, Platform, StyleSheet } from "react-native";

const isAndroid = Platform.OS === "android";

interface Props {
  route: { title: string; subtitle: string; description: string };
}

const TabRoute = ({ route: { title, subtitle, description } }: Props) => {
  return (
    <View style={styles.route}>
      <View style={styles.content__header}>
        <Text style={styles.content__heading}>{title}</Text>
        <Text style={styles.content__subheading}>{subtitle}</Text>
      </View>

      <View style={styles.content__inside}>
        <Text style={styles.content__paragraph}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  route: {
    flex: 1,

    paddingTop: 12,
    paddingBottom: isAndroid ? 100 : 40,

    backgroundColor: "#1a1d21",
  },

  content__header: {
    padding: 15,
    paddingBottom: 0,
  },

  content__heading: {
    marginBottom: 2,

    fontSize: 24,
    fontWeight: "600",
    color: "#d1d2d2",
  },

  content__subheading: {
    marginBottom: 20,

    fontSize: 16,
    color: "#9a9c9d",
  },

  content__inside: {
    padding: 15,
  },

  content__paragraph: {
    fontSize: 15,
    fontWeight: "200",
    lineHeight: 22,
    color: "#666",
  },
});

export default TabRoute;
