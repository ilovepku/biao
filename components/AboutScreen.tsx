import React from "react";
import { StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { Ionicons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import {
  Container,
  Header,
  Left,
  Button,
  Body,
  Content,
  ListItem,
  Text,
  Right,
  Thumbnail,
} from "native-base";
import { DrawerNavigationProp } from "@react-navigation/drawer";

import { DrawerParamList } from "../types";

type AboutScreenNavigationProp = DrawerNavigationProp<DrawerParamList, "About">;

const LIBRARIES = [
  { url: "https://github.com/expo/expo", name: "expo" },
  { url: "https://github.com/reduxjs/redux", name: "redux" },
  {
    url: "https://github.com/react-navigation/react-navigation",
    name: "@react-navigation",
  },
  {
    url: "https://github.com/GeekyAnts/NativeBase",
    name: "native-base",
  },
  {
    url: "https://github.com/react-native-community/react-native-maps",
    name: "react-native-maps",
  },
  {
    url: "https://github.com/jeremybarbet/react-native-modalize",
    name: "react-native-modalize",
  },
  {
    url: "https://github.com/react-native-community/react-native-tab-view",
    name: "react-native-tab-view",
  },
  {
    url: "https://github.com/venits/react-native-map-clustering",
    name: "react-native-map-clustering",
  },
];

type Props = {
  navigation: AboutScreenNavigationProp;
};

const AboutScreen = ({ navigation }: Props) => (
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
        <Text>App</Text>
      </ListItem>
      <ListItem icon last>
        <Left>
          <Button>
            <Octicons name="versions" color="white" />
          </Button>
        </Left>
        <Body>
          <Text>Version</Text>
        </Body>
        <Right>
          <Text>1.0</Text>
        </Right>
      </ListItem>
      <ListItem itemDivider>
        <Text>People</Text>
      </ListItem>
      <ListItem
        thumbnail
        last
        onPress={() => {
          WebBrowser.openBrowserAsync("https://seanlee.netlify.com");
        }}
      >
        <Left>
          <Thumbnail
            square
            source={{
              uri:
                "https://seanlee.netlify.app/static/9b425e213ec5b64cfa3ef8bc2a8e6d7b/69585/profile.png",
            }}
          />
        </Left>
        <Body>
          <Text>Sean Lee</Text>
          <Text style={styles.note}>seanlee.netlify.com</Text>
        </Body>
        <Right>
          <Text style={styles.note}>Creator</Text>
        </Right>
      </ListItem>
      <ListItem itemDivider>
        <Text>Third-party projects that helped</Text>
      </ListItem>

      {LIBRARIES.map(({ name, url }, index, { length }) => (
        <ListItem
          key={`library-${name}`}
          icon
          last={index === length - 1}
          onPress={() => {
            WebBrowser.openBrowserAsync(url);
          }}
        >
          <Left>
            <Button>
              <Octicons name="mark-github" color="white" />
            </Button>
          </Left>
          <Body>
            <Text>{name}</Text>
          </Body>
        </ListItem>
      ))}
    </Content>
  </Container>
);

const styles = StyleSheet.create({
  note: {
    fontSize: 14,
    color: "#9a9c9d",
  },
});

export default AboutScreen;
