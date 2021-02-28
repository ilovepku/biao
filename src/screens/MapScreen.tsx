import React, {FC, useRef, useState, useCallback} from 'react'
import {StyleSheet, Dimensions} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {useQuery} from '@apollo/client'
import {PROVIDER_GOOGLE, MapTypes, Marker} from 'react-native-maps'
import ClusteredMapView from 'react-native-map-clustering'
import {Modalize} from 'react-native-modalize'
import {Feature} from 'geojson'

import {MapDetails, Location, TimelineItem} from '../types.d'
import {
  INITIAL_REGION,
  MARKER_COLOR_MAP,
} from '../../assets/peloponnesian_war/settings'
import {RootState} from '../redux/store'
import {updateModalTabIndexObj} from '../redux/actions'
import storyQuery from '../graphql/queries/storyQuery'
import ClusteredMarker from '../components/ClusteredMarker'
import PolygonGeojson from '../components/PolygonGeojson'
import IconMarker from '../components/IconMarker'
import FABMenu from '../components/FABMenu'
import TabViewBottomSheet from '../components/TabViewBottomSheet'

const {width, height} = Dimensions.get('window')
const aspectRatio = width / height
const {latitude, longitude, latitudeDelta} = INITIAL_REGION

const MapScreen: FC = () => {
  const {
    modalTabIndexObj: {index},
  } = useSelector((state: RootState) => state)
  const dispatch = useDispatch()
  const {loading, error, data} = useQuery(storyQuery, {
    variables: {
      uuid: 'ddf1c9fa-e105-4d81-ab1b-ba359182f23d',
    },
  })

  const modalRef = useRef<Modalize>(null)

  const [mapType, setMapType] = useState<MapTypes>('hybrid')
  const [mapDetails, setMapDetails] = useState<MapDetails>({
    battle: true,
    naval: true,
    siege: true,
    revolt: true,
  })
  const [currRegion, setCurrRegion] = useState({
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta: latitudeDelta * aspectRatio,
  })

  // active timeline locations
  const [activeLocations] = useState<string[]>([])

  const handleOpenModal = useCallback(
    (i = index) => {
      if (modalRef.current) modalRef.current.open()
      dispatch(updateModalTabIndexObj({index: i}))
    },
    [dispatch, index],
  )

  return (
    <>
      <FABMenu
        mapType={mapType}
        setMapType={setMapType}
        mapDetails={mapDetails}
        setMapDetails={setMapDetails}
      />
      <TabViewBottomSheet />
      <ClusteredMapView
        style={styles.map} // Preventing 'Error using newLatLngBounds(LatLngBounds, int): Map size can’t be 0. Most likely, layout has not yet occurred for the map view.'
        provider={PROVIDER_GOOGLE}
        initialRegion={currRegion}
        mapType={mapType}
        onRegionChangeComplete={region => setCurrRegion(region)}
        radius={10} // SuperCluster radius
        renderCluster={({
          id,
          geometry: {coordinates},
          properties: {point_count: pointCount},
        }) => (
          <ClusteredMarker
            key={`cluster-${id}`}
            coordinates={coordinates}
            pointCount={pointCount}
          />
        )}
      >
        {!loading && !error && (
          <PolygonGeojson
            geojson={JSON.parse(data.stories_by_pk.areas[0].geojson)}
            strokeWidth={0}
          />
        )}

        {!loading &&
          !error &&
          JSON.parse(data.stories_by_pk.locations[0].geojson)
            .features.filter((feature: Feature) =>
              !activeLocations.length
                ? !!mapDetails[feature.properties?.type]
                : activeLocations.includes(feature.id as string) &&
                  !!mapDetails[feature.properties?.type],
            )
            .map(
              ({
                id,
                geometry: {coordinates},
                properties: {name, type, description, highlight, status},
              }: Location) => (
                <Marker
                  key={id}
                  title={name}
                  description={description}
                  coordinate={{
                    latitude: coordinates[1],
                    longitude: coordinates[0],
                  }}
                  anchor={{x: 1, y: 1}}
                  calloutAnchor={{x: 0, y: 0}}
                  rotation={45}
                  tracksViewChanges={false}
                  onPress={() => {
                    if (id.indexOf('-') !== -1) {
                      // @TODO: temp check for timeline event markers
                      handleOpenModal(
                        JSON.parse(
                          data.stories_by_pk.timelines[0].json,
                        ).findIndex((o: TimelineItem) =>
                          o.locations.includes(id),
                        ),
                      )
                    }
                  }}
                >
                  <IconMarker
                    type={type}
                    color={
                      highlight
                        ? MARKER_COLOR_MAP[`${status}Highlight`].color
                        : MARKER_COLOR_MAP[status].color
                    }
                  />
                </Marker>
              ),
            )}
      </ClusteredMapView>
    </>
  )
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
})

export default MapScreen
