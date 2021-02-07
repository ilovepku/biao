import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {render} from '../../../test/test-utils'

import AboutScreen from '../AboutScreen'

const Drawer = createDrawerNavigator()

// eslint-disable-next-line react/prop-types
const MockedNavigator = ({component, params = {}}) => (
  <NavigationContainer>
    <Drawer.Navigator>
      <Drawer.Screen
        name="MockedScreen"
        component={component}
        initialParams={params}
      />
    </Drawer.Navigator>
  </NavigationContainer>
)

jest.useFakeTimers()

describe('AboutScreen', () => {
  test('rendering', () => {
    const {findByText} = render(<MockedNavigator component={AboutScreen} />)
    expect(findByText(/version/i)).toBeTruthy()
  })
})
