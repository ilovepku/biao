import React, { useEffect } from "react";
import { Provider } from "react-redux";
import * as ScreenOrientation from "expo-screen-orientation";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

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

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Map">
          <Drawer.Screen name="Map" component={MapScreen} />
          <Drawer.Screen name="About" component={AboutScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
