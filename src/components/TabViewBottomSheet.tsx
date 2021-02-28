import React, {FC, useCallback, useMemo} from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {Portal} from 'react-native-paper'
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet'

const TabViewBottomSheet: FC = () => {
  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    [],
  )
  const snapPoints = ['1%', '25%', '90%']

  const renderItem = useCallback(
    item => (
      <View key={item} style={styles.itemContainer}>
        <Text>{item}</Text>
      </View>
    ),
    [],
  )

  return (
    <Portal>
      <View style={styles.container}>
        <BottomSheet index={0} snapPoints={snapPoints}>
          <BottomSheetScrollView>{data.map(renderItem)}</BottomSheetScrollView>
        </BottomSheet>
      </View>
    </Portal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee',
  },
})

export default TabViewBottomSheet
