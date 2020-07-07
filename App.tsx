import React from "react";
import { useFonts } from "expo-font";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Spinner } from "native-base";
import MapScreen from "./components/MapScreen";
import AboutScreen from "./components/AboutScreen";

// @TODO
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings([
  "Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`",
]);

export type DrawerParamList = {
  Map: undefined;
  About: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function App() {
  const [loaded] = useFonts({
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
  });

  return loaded ? (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Map">
        <Drawer.Screen name="Map" component={MapScreen} />
        <Drawer.Screen name="About" component={AboutScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  ) : (
    <Spinner />
  );
}
