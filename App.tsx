import 'react-native-gesture-handler'
import React, {FC, useEffect} from 'react'
import {Provider as StoreProvider} from 'react-redux'
import {ApolloProvider} from '@apollo/client'
import {Provider as PaperProvider} from 'react-native-paper'
import * as ScreenOrientation from 'expo-screen-orientation'

import {store} from './src/redux/store'
import {updateOrientation} from './src/redux/actions'
import client from './src/graphql/client'
import Navigation from './src/navigation/Navigation'

ScreenOrientation.unlockAsync()

const App: FC = () => {
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

  return (
    <StoreProvider store={store}>
      <ApolloProvider client={client}>
        <PaperProvider>
          <Navigation />
        </PaperProvider>
      </ApolloProvider>
    </StoreProvider>
  )
}

export default App
