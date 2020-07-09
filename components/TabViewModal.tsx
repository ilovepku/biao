import React, { forwardRef, Ref, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView, Animated, View, Text, StyleSheet } from "react-native";
import { Modalize } from "react-native-modalize";

import { Timeline } from "../types";
import { RootState } from "../redux/store";
import { updateModalPosition } from "../redux/actions";
import TabBarItem from "./TabBarItem";
import Tabs from "./Tabs";
import {
  HEADER_COLLAPSE,
  HEADER_LIST,
  HEADER_HEIGHT,
  TAB_BAR_ITEM_WIDTH,
  TAB_BAR_ITEM_MARGIN,
  EMOJI_MAP,
  MODAL_HEIGHT_PORTRAIT,
  MODAL_HEIGHT_LANDSCAPE,
} from "../settings";

type Props = {
  tabRoutes: Timeline;
  setActiveLocations: Function;
};

const TabViewModal = forwardRef(
  ({ tabRoutes, setActiveLocations }: Props, ref: Ref<Modalize>) => {
    const orientation = useSelector((state: RootState) => state.orientation);
    const dispatch = useDispatch();

    const scrollViewRef = useRef<ScrollView>(null);
    const scrollY = useRef(new Animated.Value(0)).current;
    const [index, setIndex] = useState(0);

    const handleIndexChange = (i: number) => {
      const width = TAB_BAR_ITEM_WIDTH;
      const margin = TAB_BAR_ITEM_MARGIN;
      const x = (width + margin) * i;

      setIndex(i);

      scrollViewRef.current &&
        scrollViewRef.current.scrollTo({ x, animated: true });

      setActiveLocations(tabRoutes[i].locations);
    };

    const renderTabBar = (
      <View style={styles.tabbar}>
        <Animated.View
          style={[
            styles.tabbar__wrapper,
            {
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, 0],
                    extrapolate: "clamp",
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.tabbar__heading}>
            <Text style={styles.tabbar__headingText}>
              Timeline of the Peloponnesian War (431−404 BC)
            </Text>
            {/* dynamic name from props */}
          </View>

          <ScrollView
            ref={scrollViewRef}
            style={styles.tabbar__list}
            contentContainerStyle={styles.tabbar__listContent}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
          >
            {tabRoutes.map(({ year, type }, i) => (
              <TabBarItem
                key={i}
                active={index === i}
                year={year}
                emoji={EMOJI_MAP[type].emoji}
                onPress={() => handleIndexChange(i)}
              />
            ))}
          </ScrollView>
        </Animated.View>
      </View>
    );

    return (
      <Modalize
        ref={ref}
        scrollViewProps={{
          onScroll: Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            {
              useNativeDriver: true,
            }
          ),
          scrollEventThrottle: 16,
        }}
        modalStyle={styles.modal}
        handleStyle={styles.modal__handle}
        childrenStyle={styles.modal__children}
        snapPoint={
          orientation === 3 || orientation === 4 // orientation is landscape
            ? MODAL_HEIGHT_LANDSCAPE
            : MODAL_HEIGHT_PORTRAIT
        }
        handlePosition={"inside"}
        closeSnapPointStraightEnabled={false}
        withOverlay={false}
        HeaderComponent={renderTabBar}
        onOpened={() => handleIndexChange(index)}
        onClosed={() => {
          setActiveLocations([]);
          dispatch(updateModalPosition("closed"));
        }}
        onPositionChange={(position) => dispatch(updateModalPosition(position))}
      >
        <Tabs
          tabRoutes={tabRoutes}
          active={index}
          onIndexChange={handleIndexChange}
        />
      </Modalize>
    );
  }
);

const styles = StyleSheet.create({
  tabbar: {
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    zIndex: 9000,

    height: HEADER_HEIGHT,

    overflow: "hidden",

    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  tabbar__wrapper: {
    position: "absolute",

    width: "100%",
    height: "100%",
  },

  tabbar__heading: {
    height: HEADER_COLLAPSE,

    backgroundColor: "#212428",
  },

  tabbar__headingText: {
    marginLeft: 20,

    fontSize: 12,
    letterSpacing: 0.25,
    textTransform: "uppercase",

    color: "#d1d2d2",
  },

  tabbar__list: {
    height: HEADER_LIST,

    borderTopColor: "#313437",
    borderTopWidth: 1,
    borderBottomColor: "#313437",
    borderBottomWidth: 1,

    backgroundColor: "#1a1d21",
  },

  tabbar__listContent: {
    flexDirection: "row",
    alignItems: "center",

    paddingLeft: 20,
  },

  modal: {
    backgroundColor: "#1a1d21",
  },

  modal__handle: { width: 35, backgroundColor: "#75777a" },

  modal__children: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: "hidden",
  },
});

export default TabViewModal;
