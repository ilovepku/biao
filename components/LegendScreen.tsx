import React from "react";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  Header,
  Left,
  Button,
  Body,
  Content,
  ListItem,
  Text,
} from "native-base";
import { DrawerNavigationProp } from "@react-navigation/drawer";

import { DrawerParamList } from "../types";
import {
  AREA_COLOR_MAP,
  MARKER_COLOR_MAP,
} from "../assets/peloponnesian_war/settings";
import { EMOJI_MAP } from "../settings";
import IconMarker from "./IconMarker";

type AboutScreenNavigationProp = DrawerNavigationProp<DrawerParamList, "About">;

type Props = {
  navigation: AboutScreenNavigationProp;
};

const LegendScreen = ({ navigation }: Props) => (
  <Container>
    <Header>
      <Left>
        <Button transparent onPress={() => navigation.goBack()}>
          <Ionicons name="ios-arrow-back" size={24} color="black" />
        </Button>
      </Left>
      <Body />
    </Header>
    <Content>
      <ListItem itemDivider>
        <Text>Area Fill Colors:</Text>
      </ListItem>
      {Object.keys(AREA_COLOR_MAP).map((key, index, array) => (
        <ListItem
          key={`legend-area-${key}`}
          icon
          last={index === array.length - 1}
        >
          <Left>
            <MaterialCommunityIcons
              name="square"
              size={24}
              color={AREA_COLOR_MAP[key].color}
            />
          </Left>
          <Body>
            <Text>{AREA_COLOR_MAP[key].name}</Text>
          </Body>
        </ListItem>
      ))}

      <ListItem itemDivider>
        <Text>City Markers:</Text>
      </ListItem>
      {Object.keys(MARKER_COLOR_MAP).map((key, index, array) => (
        <ListItem
          key={`legend-marker-city-${key}`}
          icon
          last={index === array.length - 1}
        >
          <Left style={styles.marker}>
            <IconMarker name="city" color={MARKER_COLOR_MAP[key].color} />
          </Left>
          <Body>
            <Text>{MARKER_COLOR_MAP[key].city}</Text>
          </Body>
        </ListItem>
      ))}

      <ListItem itemDivider>
        <Text>Battle Markers:</Text>
      </ListItem>
      {Object.keys(MARKER_COLOR_MAP).map((key, index, array) => (
        <ListItem
          key={`legend-marker-battle-${key}`}
          icon
          last={index === array.length - 1}
        >
          <Left style={styles.marker}>
            <IconMarker name="battle" color={MARKER_COLOR_MAP[key].color} />
          </Left>
          <Body>
            <Text>{MARKER_COLOR_MAP[key].battle}</Text>
          </Body>
        </ListItem>
      ))}

      <ListItem itemDivider>
        <Text>Timeline Icons:</Text>
      </ListItem>
      {Object.keys(EMOJI_MAP).map((key, index, array) => (
        <ListItem
          key={`legend-timeline-icon-${key}`}
          icon
          last={index === array.length - 1}
        >
          <Left>
            <Text>{EMOJI_MAP[key].emoji}</Text>
          </Left>
          <Body>
            <Text>{EMOJI_MAP[key].name}</Text>
          </Body>
        </ListItem>
      ))}
    </Content>
  </Container>
);

const styles = StyleSheet.create({
  marker: {
    transform: [{ rotate: "45deg" }],
  },
});

export default LegendScreen;
