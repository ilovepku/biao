import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { Card, Title, Paragraph } from "react-native-paper";

import { Battle } from "../utils/types";
import { MARKER_ICONS } from "../utils/markerIcons";

const CarouselItem = ({
  item: { title, pinColor, year, type, location, result, link },
}: {
  item: Battle;
}) => {
  return (
    <Card>
      <Card.Title
        title={title}
        subtitle={year}
        left={() => (
          <MaterialCommunityIcons
            name={MARKER_ICONS[type]}
            size={24}
            color={pinColor}
          />
        )}
        right={() => (
          <MaterialCommunityIcons
            name="wikipedia"
            size={24} 
            color="black"
            onPress={() => WebBrowser.openBrowserAsync(link)}
          />
        )}
      />
      <Card.Content>
        <Title>{result}</Title>
        <Paragraph>{location}</Paragraph>
      </Card.Content>
      {/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
    </Card>
  );
};

export default CarouselItem;
