import React, {memo} from 'react'
import {View, StyleSheet} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'

import {ICON_MAP} from '../settings'

type Props = {
  name: string
  color?: string
}

const IconMarker = memo(({name, color}: Props) => (
  <View style={[styles.container, {backgroundColor: color}]}>
    <MaterialCommunityIcons
      style={styles.icon}
      name={ICON_MAP[name]}
      size={16}
      color="#fff"
    />
  </View>
))

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    transform: [{rotate: '-45deg'}],
  },
})

export default IconMarker
