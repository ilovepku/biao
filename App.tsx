import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { View, StyleSheet } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { useFonts } from "expo-font";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Spinner } from "native-base";

import { DrawerParamList } from "./types";
import { store } from "./redux/store";
import { updateOrientation } from "./redux/actions";
import MapScreen from "./components/MapScreen";
import AboutScreen from "./components/AboutScreen";

// @TODO
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings([
  "Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`",
]);

ScreenOrientation.unlockAsync();

const Drawer = createDrawerNavigator<DrawerParamList>();

const App = () => {
  const [loaded] = useFonts({
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
  });

  useEffect(() => {
    ScreenOrientation.addOrientationChangeListener(() => {
      ScreenOrientation.getOrientationAsync().then((orientation) => {
        store.dispatch(
          updateOrientation(
            orientation === 3 || orientation === 4 ? "landscape" : "portrait"
          )
        );
      });
    });
    return () => ScreenOrientation.removeOrientationChangeListeners();
  }, []);

  return loaded ? (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Map">
          <Drawer.Screen name="Map" component={MapScreen} />
          <Drawer.Screen name="About" component={AboutScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  ) : (
    <View style={styles.container}>
      <Spinner />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
