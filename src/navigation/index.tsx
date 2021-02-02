import React, {FC} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createDrawerNavigator} from '@react-navigation/drawer'

import {DrawerParamList} from '../types.d'
import DrawerContent from '../components/DrawerContent'
import MapScreen from '../screens/MapScreen'
import LegendScreen from '../screens/LegendScreen'
import AboutScreen from '../screens/AboutScreen'

const Drawer = createDrawerNavigator<DrawerParamList>()

const Navigation: FC = () => (
  <NavigationContainer>
    <Drawer.Navigator
      initialRouteName="Map"
      // eslint-disable-next-line react/jsx-props-no-spreading
      drawerContent={props => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Map" component={MapScreen} />
      <Drawer.Screen name="Legend" component={LegendScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
    </Drawer.Navigator>
  </NavigationContainer>
)

export default Navigation
