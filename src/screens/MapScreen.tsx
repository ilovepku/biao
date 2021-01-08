import React, {useRef, useState, useCallback, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {StyleSheet, Dimensions} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {DrawerNavigationProp} from '@react-navigation/drawer'
import MapView, {PROVIDER_GOOGLE, MapTypes, Marker} from 'react-native-maps'
import ClusteredMapView from 'react-native-map-clustering'
import {Modalize} from 'react-native-modalize'
import {Container, View, Text, Fab, Icon, Button} from 'native-base'

import {
  INITIAL_REGION,
  MARKER_COLOR_MAP,
} from '../../assets/peloponnesian_war/settings'
import {
  DEFAULT_LATITUDE_DELTA,
  DEFAULT_ANIMATE_DURATION,
  EDGE_PADDING_PORTRAIT,
  EDGE_PADDING_LANDSCAPE,
} from '../settings'
import {RootState} from '../redux/store'
import {updateModalTabIndexObj} from '../redux/actions'
import LOCATIONS from '../../assets/peloponnesian_war/locations.json'
import AREAS from '../../assets/peloponnesian_war/areas.json'
import TIMELINE from '../../assets/peloponnesian_war/timeline.json'
import PolygonGeojson from '../components/PolygonGeojson'
import IconMarker from '../components/IconMarker'
import TabViewModal from '../components/TabViewModal'

const {width, height} = Dimensions.get('window')
const aspectRatio = width / height
const {latitude, longitude, latitudeDelta} = INITIAL_REGION

type DrawerParamList = Record<string, never>

const MapScreen: React.FC = () => {
  const {
    orientation,
    darkMode,
    modalPosition,
    modalTabIndexObj: {index},
  } = useSelector((state: RootState) => state)
  const dispatch = useDispatch()
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>()

  const layoutReady = useRef(true)
  const mapRef = useRef<MapView>(null)
  const modalRef = useRef<Modalize>(null)

  const [currRegion, setCurrRegion] = useState({
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta: latitudeDelta * aspectRatio,
  })
  // active map type
  const [mapType, setMapType] = useState<MapTypes>('hybrid')
  // active timeline locations
  const [activeLocations, setActiveLocations] = useState<string[]>([])
  // active fab popups
  const [fabActive, setFabActive] = useState({
    topLeft: false,
    topRight: false,
  })
  // active marker types
  const [markerFilters, setMarkerFilters] = useState<{
    [index: string]: boolean
  }>({
    battle: true,
    city: true,
  })

  const handleLayoutReady = () => {
    layoutReady.current = false
  }

  const handleMapTypeChange = (type: string) => {
    setMarkerFilters({
      ...markerFilters,
      [type]: !markerFilters[type],
    })
  }

  const handleResetToInitialRegion = () => {
    setActiveLocations([])
    if (modalRef.current) modalRef.current.close()
  }

  const handleToggleTopLeftFab = () =>
    setFabActive({...fabActive, topLeft: !fabActive.topLeft})

  const handleToggleTopRightFab = () =>
    setFabActive({...fabActive, topRight: !fabActive.topRight})

  const handleOpenModal = useCallback(
    (i = index) => {
      if (modalRef.current) modalRef.current.open()
      dispatch(updateModalTabIndexObj({index: i}))
    },
    [dispatch, index],
  )

  const handleOpenDrawer = () => {
    navigation.openDrawer()
  }

  const fitMaptoActiveMarkers = useCallback(() => {
    // run effect only after layout ready
    if (!layoutReady.current) {
      let {features} = LOCATIONS
      if (activeLocations.length) {
        features = activeLocations
          .map(location => features.filter(feature => feature.id === location))
          .flat()
      }
      const coordinates = features.map(feature => ({
        latitude: feature.geometry.coordinates[1],
        longitude: feature.geometry.coordinates[0],
      }))

      // use animateToRegion method instead of fitToCoordinates with only 1 active location to avoid over zooming
      if (activeLocations.length === 1) {
        if (mapRef.current)
          mapRef.current.animateToRegion(
            {
              ...coordinates[0],
              latitudeDelta: DEFAULT_LATITUDE_DELTA,
              longitudeDelta: DEFAULT_LATITUDE_DELTA * aspectRatio,
            },
            DEFAULT_ANIMATE_DURATION,
          )
      }
      if (mapRef.current)
        mapRef.current.fitToCoordinates(coordinates, {
          edgePadding:
            orientation === 'landscape'
              ? EDGE_PADDING_LANDSCAPE
              : EDGE_PADDING_PORTRAIT,
        })
    }
  }, [activeLocations, orientation])

  // persist (initial) modal position and refit map to markers after orientation change (top and closed auto kept)
  useEffect(() => {
    if (modalPosition === 'initial') handleOpenModal()
    fitMaptoActiveMarkers()
  }, [orientation, fitMaptoActiveMarkers, handleOpenModal, modalPosition])

  // fit map to markers on active locations change
  useEffect(() => {
    fitMaptoActiveMarkers()
  }, [activeLocations, fitMaptoActiveMarkers])

  const ThemeStyle = darkMode
    ? [styles.blackContainer, styles.whiteText]
    : [styles.whiteContainer, styles.darkText]

  const ContainerStyle = darkMode
    ? styles.blackContainer
    : styles.whiteContainer

  const TextSytle = darkMode ? styles.whiteText : styles.darkText

  return (
    <Container>
      <ClusteredMapView
        ref={mapRef}
        style={styles.map}
        onLayout={handleLayoutReady}
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
          <Marker
            key={`cluster-${id}`}
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
              <Text
                style={[styles.clusterText, {fontSize: 10 + 2 * pointCount}]}
              >
                {pointCount}
              </Text>
            </View>
          </Marker>
        )}
      >
        <PolygonGeojson geojson={AREAS} strokeWidth={0} />

        {LOCATIONS.features
          .filter(feature =>
            !activeLocations.length
              ? Object.keys(markerFilters)
                  .filter(item => markerFilters[item])
                  .includes(feature.properties.type)
              : activeLocations.includes(feature.id as string) &&
                Object.keys(markerFilters)
                  .filter(item => markerFilters[item])
                  .includes(feature.properties.type),
          )
          .map(
            ({
              id,
              geometry: {coordinates},
              properties: {name, type, description, highlight, status},
            }) => (
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
                      TIMELINE.findIndex(o => o.locations.includes(id)),
                    )
                  }
                }}
              >
                <IconMarker
                  name={type}
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

      {modalPosition !== 'top' && (
        <>
          <Fab
            style={[styles.fabSmall, ContainerStyle]}
            active={fabActive.topLeft}
            direction="down"
            position="topLeft"
            onPress={handleToggleTopLeftFab}
          >
            <Icon
              style={TextSytle}
              type="MaterialCommunityIcons"
              name="layers-outline"
            />
            {[
              {name: 'standard', label: 'Default', icon: 'map'},
              {name: 'hybrid', label: 'Satellite', icon: 'satellite'},
              {name: 'terrain', label: 'Terrain', icon: 'terrain'},
            ].map(({name, label, icon}) => (
              <Button
                key={`mapType-${name}`}
                style={[
                  mapType === name ? styles.activeFab : {},
                  ContainerStyle,
                ]}
                disabled={mapType === name}
                onPress={() => setMapType(name as MapTypes)}
              >
                <Text
                  style={[styles.fabLabel, styles.fabLabelLeft, ThemeStyle]}
                >
                  {label}
                </Text>
                <Icon
                  style={TextSytle}
                  type="MaterialCommunityIcons"
                  name={icon}
                />
              </Button>
            ))}

            <Button
              style={[styles.fabExtraButton, ContainerStyle]}
              onPress={handleResetToInitialRegion}
            >
              <Text style={[styles.fabLabel, styles.fabLabelLeft, ThemeStyle]}>
                Reset View
              </Text>
              <Icon
                style={TextSytle}
                type="MaterialCommunityIcons"
                name="restore"
              />
            </Button>
          </Fab>

          <Fab
            style={[styles.fabSmall, ContainerStyle]}
            active={fabActive.topRight}
            direction="down"
            position="topRight"
            onPress={handleToggleTopRightFab}
          >
            <Icon
              style={TextSytle}
              type="MaterialCommunityIcons"
              name={
                Object.values(markerFilters).every(item => item)
                  ? 'filter-outline'
                  : 'filter'
              }
            />
            {[
              {
                name: 'city',
                label: 'Cities',
                icon: 'home-outline',
                iconActive: 'home',
              },
              {
                name: 'battle',
                label: 'Battles',
                icon: 'skull-outline',
                iconActive: 'skull',
              },
            ].map(({name, label, icon, iconActive}) => (
              <Button
                key={`filter-${name}`}
                style={ContainerStyle}
                onPress={() => handleMapTypeChange(name)}
              >
                <Text
                  style={[styles.fabLabel, styles.fabLabelRight, ThemeStyle]}
                >
                  {label}
                </Text>
                <Icon
                  style={TextSytle}
                  type="MaterialCommunityIcons"
                  name={markerFilters[name] ? iconActive : icon}
                />
              </Button>
            ))}
          </Fab>
        </>
      )}

      {modalPosition === 'closed' && (
        <>
          <Fab
            style={[styles.fabSmall, ContainerStyle]}
            position="bottomLeft"
            onPress={handleOpenDrawer}
          >
            <Icon style={TextSytle} type="MaterialCommunityIcons" name="menu" />
          </Fab>

          <Fab
            style={styles.fabBig}
            position="bottomRight"
            onPress={handleOpenModal}
          >
            <Icon type="MaterialCommunityIcons" name="timeline-text-outline" />
          </Fab>
        </>
      )}

      <TabViewModal
        tabRoutes={TIMELINE}
        setActiveLocations={setActiveLocations}
        ref={modalRef}
      />
    </Container>
  )
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  blackContainer: {backgroundColor: '#000'},

  whiteContainer: {backgroundColor: '#fff'},

  darkText: {color: '#121212'},

  whiteText: {color: '#fff'},

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

  fabSmall: {
    width: 45,
    height: 45,
  },

  fabBig: {
    width: 50,
    height: 50,
    backgroundColor: '#1b74ea',
  },

  fabExtraButton: {
    marginTop: 10,
  },

  fabLabel: {
    position: 'absolute',
    padding: 1,
    borderRadius: 5,
  },

  fabLabelRight: {
    right: 50,
  },

  fabLabelLeft: {
    left: 50,
  },

  activeFab: {
    borderWidth: 2,
    borderColor: '#007aff',
  },
})

export default MapScreen
