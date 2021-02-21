import React, {FC} from 'react'
import {StyleSheet} from 'react-native'
import {Marker} from 'react-native-maps'
import {View, Text} from 'native-base'

type Props = {
  coordinates: number[]
  pointCount: number
}

const ClusteredMarker: FC<Props> = ({coordinates, pointCount}: Props) => (
  <Marker
    coordinate={{
      latitude: coordinates[1],
      longitude: coordinates[0],
    }}
    tracksViewChanges={false}
  >
    <View
      style={[
        styles.cluster,
        {width: 16 + 2 * pointCount, height: 16 + 2 * pointCount},
      ]}
    >
      <Text style={[styles.clusterText, {fontSize: 10 + 2 * pointCount}]}>
        {pointCount}
      </Text>
    </View>
  </Marker>
)

const styles = StyleSheet.create({
  cluster: {
    borderRadius: 50,
    backgroundColor: 'rgba(92, 184, 92, .75)',
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  clusterText: {
    color: '#FFF',
  },
})

export default ClusteredMarker
