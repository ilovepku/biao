import React, { forwardRef, Ref, useRef, useState } from "react";
import { ScrollView, Animated, View, Text, StyleSheet } from "react-native";
import { Modalize } from "react-native-modalize";
import { Timeline } from "../types";
import TabBarItem from "./TabBarItem";
import Tabs from "./Tabs";
import {
  HEADER_COLLAPSE,
  HEADER_LIST,
  HEADER_HEIGHT,
} from "../assets/settings";
import EMOJI_MAP from "../assets/emoji_map";

interface Props {
  tabRoutes: Timeline;
}

const TabViewModal = forwardRef(({ tabRoutes }: Props, ref: Ref<Modalize>) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);

  const handleIndexChange = (i: number) => {
    const width = 55; // item width
    const margin = 25; // item margin
    const x = (width + margin) * i;

    setIndex(i);

    scrollViewRef.current &&
      scrollViewRef.current.scrollTo({ x, animated: true });
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
                  outputRange: [0, -HEADER_COLLAPSE],
                  extrapolate: "clamp",
                }),
              },
            ],
          },
        ]}
      >
        <View style={styles.tabbar__heading}>
          <Text style={styles.tabbar__headingText}>
            Timeline of the Peloponnesian War
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
      snapPoint={400}
      closeSnapPointStraightEnabled={false}
      HeaderComponent={renderTabBar}
      modalStyle={{ backgroundColor: "#1a1d21" }}
      handleStyle={{ width: 35, backgroundColor: "#75777a" }}
      childrenStyle={{
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        overflow: "hidden",
      }}
      scrollViewProps={{
        onScroll: Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
          }
        ),
        scrollEventThrottle: 16,
      }}
    >
      <Tabs
        tabRoutes={tabRoutes}
        active={index}
        onIndexChange={handleIndexChange}
      />
    </Modalize>
  );
});

const styles = StyleSheet.create({
  tabbar: {
    position: "absolute",
    top: 0,
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
    paddingTop: 9,

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
});

export default TabViewModal;
