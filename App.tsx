import 'react-native-gesture-handler'
import React, {useEffect} from 'react'
import {Provider} from 'react-redux'
import {StyleSheet} from 'react-native'
import * as ScreenOrientation from 'expo-screen-orientation'
import {useFonts} from 'expo-font'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {NavigationContainer} from '@react-navigation/native'
import {Container, Spinner} from 'native-base'

import {DrawerParamList} from './src/types.d'
import {store} from './src/redux/store'
import {updateOrientation} from './src/redux/actions'
import DrawerContent from './src/components/DrawerContent'
import MapScreen from './src/screens/MapScreen'
import LegendScreen from './src/screens/LegendScreen'
import AboutScreen from './src/screens/AboutScreen'

// @TODO
/* import { YellowBox } from "react-native";
YellowBox.ignoreWarnings([
  "Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`",
]); */

ScreenOrientation.unlockAsync()

const Drawer = createDrawerNavigator<DrawerParamList>()

const App = () => {
  const [loaded] = useFonts({
    Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
  })

  useEffect(() => {
    ScreenOrientation.addOrientationChangeListener(() => {
      ScreenOrientation.getOrientationAsync().then(orientation => {
        store.dispatch(
          updateOrientation(
            orientation === 3 || orientation === 4 ? 'landscape' : 'portrait',
          ),
        )
      })
    })
    return () => ScreenOrientation.removeOrientationChangeListeners()
  }, [])

  return loaded ? (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Map"
          drawerContent={props => <DrawerContent {...props} />}
        >
          <Drawer.Screen name="Map" component={MapScreen} />
          <Drawer.Screen name="Legend" component={LegendScreen} />
          <Drawer.Screen name="About" component={AboutScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  ) : (
    <Container style={styles.container}>
      <Spinner />
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default App
