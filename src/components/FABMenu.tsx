import React, {FC, useState} from 'react'
import {View, StyleSheet} from 'react-native'
import {Portal, Menu, FAB, Chip, Divider} from 'react-native-paper'

type MenuVisibility = {
  [key: string]: boolean | undefined
}

type MapType = 'standard' | 'hybrid' | 'terrain'

type MapFilters = {
  [key: string]: boolean | undefined
}

const FABMenu: FC = () => {
  const [visible, setVisible] = useState<MenuVisibility>({})
  const [mapType, setMapType] = useState<MapType>('hybrid')
  const [mapFilters, setMapFilters] = useState<MapFilters>({})

  const toggleMenu = (name: string) => () => {
    setVisible({...visible, [name]: !visible[name]})
  }

  const getMenuVisible = (name: string) => !!visible[name]

  const toggleMapFilters = (name: string) => () =>
    setMapFilters({...mapFilters, [name]: !mapFilters[name]})

  const getMapFilter = (name: string) => !!mapFilters[name]

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
        <View style={styles.chipRow}>
          {[
            {name: 'terrain', title: 'Terrain', icon: 'terrain'},
            {name: 'hybrid', title: 'Satellite', icon: 'satellite'},
            {name: 'standard', title: 'Default', icon: 'map'},
          ].map(({name, title, icon}) => (
            <Chip
              key={`mapType-${name}`}
              selected={name === mapType}
              icon={icon}
              onPress={() => setMapType(name as MapType)}
              style={styles.chip}
            >
              {title}
            </Chip>
          ))}
        </View>

        <Divider />

        <View style={styles.chipRow}>
          {[
            {
              name: 'naval-battles',
              title: 'Naval Battles',
              icon: 'ship-wheel',
            },
            {
              name: 'land-battles',
              title: 'Land Battles',
              icon: 'sword-cross',
            },
            {
              name: 'sieges',
              title: 'Sieges',
              icon: 'wall',
            },
            {
              name: 'cites',
              title: 'Cities',
              icon: 'home',
            },
          ].map(({name, title, icon}) => (
            <Chip
              key={`mapFilter-${name}`}
              selected={getMapFilter(name)}
              icon={icon}
              onPress={toggleMapFilters(name)}
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
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 4,
  },
})

export default FABMenu
