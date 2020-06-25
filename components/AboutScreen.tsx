import React from "react";
import { View, Button } from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "../App";

type AboutScreenNavigationProp = DrawerNavigationProp<DrawerParamList, "About">;

type Props = {
  navigation: AboutScreenNavigationProp;
};

const AboutScreen = ({ navigation }: Props) => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Button onPress={() => navigation.goBack()} title="Go back home" />
  </View>
);

export default AboutScreen;
