import React, { memo } from "react";
import { useSelector } from "react-redux";
import { ScrollView, StyleSheet, Dimensions } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { Card, CardItem, Text, Button, Icon, Left, Body } from "native-base";

import { RootState } from "../redux/store";

type Props = {
  route: {
    title: string;
    subtitle: string;
    description: { background: string; events: string; aftermath: string };
    links: [
      {
        name: string;
        icon: string;
        url: string;
      }
    ];
  };
};

const TabRoute = memo(
  ({
    route: {
      title,
      subtitle,
      description: { background, events, aftermath },
      links,
    },
  }: Props) => {
    const orientation = useSelector((state: RootState) => state.orientation);
    return (
      <ScrollView
        style={{
          height: Dimensions.get("window").height * 0.87, // magical number for android landscape
        }}
      >
        <Card transparent style={styles.card}>
          <CardItem header style={styles.transparentBg}>
            <Left>
              <Body>
                <Text style={styles.content__heading}>{title}</Text>
                {!!subtitle && (
                  <Text note style={styles.content__subheading}>
                    {subtitle}
                  </Text>
                )}
              </Body>
            </Left>
          </CardItem>
          {!!background && (
            <CardItem style={styles.transparentBg}>
              <Body>
                <Text note style={styles.content__subheading}>
                  Background
                </Text>
                <Text style={styles.content__paragraph}>{background}</Text>
              </Body>
            </CardItem>
          )}

          <CardItem style={styles.transparentBg}>
            <Body>
              {(!!background || !!aftermath) && (
                <Text note style={styles.content__subheading}>
                  Events
                </Text>
              )}
              <Text style={styles.content__paragraph}>{events}</Text>
            </Body>
          </CardItem>

          {!!aftermath && (
            <CardItem style={styles.transparentBg}>
              <Body>
                <Text note style={styles.content__subheading}>
                  Aftermath
                </Text>
                <Text style={styles.content__paragraph}>{aftermath}</Text>
              </Body>
            </CardItem>
          )}

          {links.map(({ name, icon, url }) => (
            <CardItem key={url} style={styles.transparentBg}>
              <Left>
                <Button
                  onPress={() => {
                    WebBrowser.openBrowserAsync(url);
                  }}
                >
                  <Icon name={icon} type="FontAwesome5" />
                  <Text>{name}</Text>
                </Button>
              </Left>
            </CardItem>
          ))}
        </Card>
      </ScrollView>
    );
  }
);

const styles = StyleSheet.create({
  card: { paddingTop: 12, paddingBottom: 50 },

  content__heading: {
    marginBottom: 2,

    fontSize: 20,
    fontWeight: "600",
    color: "#d1d2d2",
  },

  content__subheading: {
    color: "#9a9c9d",
  },

  content__paragraph: {
    fontSize: 15,
    fontWeight: "200",
    lineHeight: 22,
    color: "#666",
  },

  transparentBg: {
    backgroundColor: "#1a1d21",
  },
});

export default TabRoute;
