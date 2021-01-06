import React, {memo} from 'react'
import {
  GestureResponderEvent,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native'
import {Text} from 'native-base'

import {TAB_BAR_ITEM_WIDTH, TAB_BAR_ITEM_MARGIN} from '../settings'

type Props = {
  active: boolean
  year: number
  emoji: string
  onPress: (event: GestureResponderEvent) => void
}

const TabBarItem = memo(({active, year, emoji, onPress}: Props) => (
  <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.75}>
    <Text style={styles.item__emoji}>{emoji}</Text>
    <Text
      style={[
        styles.item__text,
        {
          color: active ? '#007aff' : '#6b6b6b',
        },
      ]}
    >
      {year < 0 ? `${Math.abs(year)} BCE` : `${Math.abs(year)} CE`}
    </Text>
    {active && <View style={styles.item__line} />}
  </TouchableOpacity>
))

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: -2,
    marginRight: TAB_BAR_ITEM_MARGIN,
    width: TAB_BAR_ITEM_WIDTH,
  },

  item__emoji: {
    fontSize: 18,
  },

  item__text: {
    marginLeft: 4,
  },

  item__line: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 3,
    backgroundColor: '#007aff',
  },
})

export default TabBarItem
