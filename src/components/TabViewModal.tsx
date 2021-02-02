import React, {
  Dispatch,
  SetStateAction,
  forwardRef,
  Ref,
  useRef,
  useCallback,
  useEffect,
} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {ScrollView, Animated, View, StyleSheet} from 'react-native'
import {Container, Text} from 'native-base'
import {Modalize} from 'react-native-modalize'

import {Timeline} from '../types.d'
import {RootState} from '../redux/store'
import {updateModalPosition, updateModalTabIndexObj} from '../redux/actions'
import TabBarItem from './TabBarItem'
import Tabs from './Tabs'
import {
  HEADER_COLLAPSE,
  HEADER_LIST,
  HEADER_HEIGHT,
  TAB_BAR_ITEM_WIDTH,
  TAB_BAR_ITEM_MARGIN,
  EMOJI_MAP,
  MODAL_HEIGHT_PORTRAIT,
  MODAL_HEIGHT_LANDSCAPE,
} from '../settings'

type Props = {
  tabRoutes: Timeline
  setActiveLocations: Dispatch<SetStateAction<string[]>>
}

const TabViewModal = forwardRef(
  ({tabRoutes, setActiveLocations}: Props, ref: Ref<Modalize>) => {
    const {orientation, darkMode, modalTabIndexObj} = useSelector(
      (state: RootState) => state,
    )
    const {index} = modalTabIndexObj
    const dispatch = useDispatch()

    const isInitialMount = useRef(true)
    const scrollViewRef = useRef<ScrollView>(null)
    const scrollY = useRef(new Animated.Value(0)).current

    const animateToTabBarItem = useCallback(() => {
      const width = TAB_BAR_ITEM_WIDTH
      const margin = TAB_BAR_ITEM_MARGIN
      const x = (width + margin) * index

      if (scrollViewRef.current)
        scrollViewRef.current.scrollTo({x, animated: true})
    }, [index])

    const handleIndexChange = useCallback(() => {
      setActiveLocations(tabRoutes[index].locations)
      animateToTabBarItem()
    }, [animateToTabBarItem, index, setActiveLocations, tabRoutes])

    useEffect(() => {
      // run effect only on updates with mutable ref
      if (isInitialMount.current) {
        isInitialMount.current = false
      } else {
        handleIndexChange()
      }
      return () => {
        isInitialMount.current = false
      }
    }, [modalTabIndexObj, handleIndexChange])

    const handleModalClose = () => {
      setActiveLocations([])
      dispatch(updateModalPosition('closed'))
    }

    const TabBarHeadingContainer = darkMode
      ? styles.tabBar__heading__darkContainer
      : {}

    const TabBarListContainer = darkMode
      ? styles.tabBar__list__darkContainer
      : {}

    const renderTabBar = (
      <Container
        style={[
          styles.tabBar,
          {
            height: orientation === 'landscape' ? HEADER_LIST : HEADER_HEIGHT,
          },
        ]}
      >
        <Animated.View
          style={{
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, 0],
                  extrapolate: 'clamp',
                }),
              },
            ],
          }}
        >
          {orientation === 'portrait' && (
            <View style={[styles.tabBar__heading, TabBarHeadingContainer]}>
              <Text note style={styles.tabBar__headingText}>
                Timeline of the Peloponnesian War (431−404 BC)
              </Text>
              {/* @TODO: dynamic name from props */}
            </View>
          )}

          <ScrollView
            ref={scrollViewRef}
            style={[styles.tabBar__list, TabBarListContainer]}
            contentContainerStyle={styles.tabBar__listContent}
            showsHorizontalScrollIndicator={false}
            horizontal
          >
            {tabRoutes.map(({key, year, type}, i) => (
              <TabBarItem
                key={`${key}-tabBarItem`}
                active={index === i}
                year={year}
                emoji={EMOJI_MAP[type].emoji}
                onPress={() => dispatch(updateModalTabIndexObj({index: i}))}
              />
            ))}
          </ScrollView>
        </Animated.View>
      </Container>
    )

    const ContainerStyle = darkMode ? styles.darkContainer : {}

    return (
      <Modalize
        ref={ref}
        scrollViewProps={{
          onScroll: Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {
              useNativeDriver: true,
            },
          ),
          scrollEventThrottle: 16,
        }}
        modalStyle={ContainerStyle}
        handleStyle={styles.modal__handle}
        snapPoint={
          orientation === 'landscape'
            ? MODAL_HEIGHT_LANDSCAPE
            : MODAL_HEIGHT_PORTRAIT
        }
        handlePosition="inside"
        closeSnapPointStraightEnabled={false}
        withOverlay={false}
        HeaderComponent={renderTabBar}
        onClosed={handleModalClose}
        onPositionChange={position => dispatch(updateModalPosition(position))}
      >
        <Tabs
          tabRoutes={tabRoutes}
          active={index}
          onIndexChange={i => dispatch(updateModalTabIndexObj({index: i}))}
        />
      </Modalize>
    )
  },
)

const styles = StyleSheet.create({
  darkContainer: {backgroundColor: '#1a1d21'},

  modal__handle: {backgroundColor: '#75777a'},

  tabBar: {
    position: 'absolute',
    top: 20,
    zIndex: 1,
  },

  tabBar__heading: {
    height: HEADER_COLLAPSE,
  },

  tabBar__heading__darkContainer: {backgroundColor: '#212428'},

  tabBar__headingText: {
    marginLeft: 20,
    fontSize: 12,
    textTransform: 'uppercase',
  },

  tabBar__list: {
    height: HEADER_LIST,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },

  tabBar__list__darkContainer: {
    borderTopColor: '#313437',
    borderBottomColor: '#313437',
    backgroundColor: '#1a1d21',
  },

  tabBar__listContent: {
    paddingLeft: 20,
  },
})

export default TabViewModal
