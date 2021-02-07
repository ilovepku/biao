import 'react-native-gesture-handler'
import React, {FC, useEffect} from 'react'
import {Provider} from 'react-redux'
import {StyleSheet} from 'react-native'
import * as ScreenOrientation from 'expo-screen-orientation'
import {useFonts} from 'expo-font'
import {Container, Spinner} from 'native-base'

import {store} from './src/redux/store'
import {updateOrientation} from './src/redux/actions'
import Navigation from './src/navigation/Navigation'

ScreenOrientation.unlockAsync()

const App: FC = () => {
  const [loaded] = useFonts({
    // eslint-disable-next-line global-require
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
      <Navigation />
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
