import React, {Dispatch, SetStateAction, FC, useState} from 'react'
import {View, StyleSheet} from 'react-native'
import {MapTypes} from 'react-native-maps'
import {Portal, Menu, FAB, Chip} from 'react-native-paper'

import {MapDetails} from '../types.d'

type Props = {
  mapType: MapTypes
  setMapType: Dispatch<SetStateAction<MapTypes>>
  mapDetails: MapDetails
  setMapDetails: Dispatch<SetStateAction<MapDetails>>
}

type MenuVisibility = {
  [key: string]: boolean | undefined
}

const FABMenu: FC<Props> = ({
  mapType,
  setMapType,
  mapDetails,
  setMapDetails,
}: Props) => {
  const [visible, setVisible] = useState<MenuVisibility>({})

  const toggleMenu = (name: string) => () => {
    setVisible({...visible, [name]: !visible[name]})
  }

  const getMenuVisible = (name: string) => !!visible[name]

  const toggleMapDetails = (name: string) => () =>
    setMapDetails({...mapDetails, [name]: !mapDetails[name]})

  const getMapFilter = (name: string) => !!mapDetails[name]

  return (
    <Portal>
      <Menu
        style={styles.menu}
        visible={getMenuVisible('menu2')}
        onDismiss={toggleMenu('menu2')}
        anchor={
          <View style={styles.fabContainer}>
            <FAB small icon="layers-outline" onPress={toggleMenu('menu2')} />
          </View>
        }
      >
        <Menu.Item title="Map Type" style={{padding: 0}} />
        <View style={styles.chipRow}>
          {[
            {name: 'standard', title: 'Default', icon: 'map'},
            {name: 'hybrid', title: 'Satellite', icon: 'satellite'},
            {name: 'terrain', title: 'Terrain', icon: 'terrain'},
          ].map(({name, title, icon}) => (
            <Chip
              key={`mapType-${name}`}
              selected={name === mapType}
              mode="outlined"
              icon={icon}
              onPress={() => setMapType(name as MapTypes)}
              style={styles.chip}
            >
              {title}
            </Chip>
          ))}
        </View>

        <Menu.Item title="Map Detail" />
        <View style={styles.chipRow}>
          {[
            {
              name: 'cites',
              title: 'Cities',
              icon: 'home',
            },
            {
              name: 'land-battles',
              title: 'Land Battles',
              icon: 'sword-cross',
            },
            {
              name: 'naval-battles',
              title: 'Naval Battles',
              icon: 'ship-wheel',
            },
            {
              name: 'sieges',
              title: 'Sieges',
              icon: 'wall',
            },
          ].map(({name, title, icon}) => (
            <Chip
              key={`mapFilter-${name}`}
              selected={getMapFilter(name)}
              mode="outlined"
              icon={icon}
              onPress={toggleMapDetails(name)}
              style={styles.chip}
            >
              {title}
            </Chip>
          ))}
        </View>
      </Menu>
    </Portal>
  )
}

const styles = StyleSheet.create({
  fabContainer: {
    alignItems: 'flex-end',
    paddingTop: 40,
    paddingRight: 16,
  },
  menu: {
    position: 'absolute',
    right: 16,
    left: '15%',
  },
  chipRow: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 4,
  },
})

export default FABMenu
