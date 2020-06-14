import React, { memo, forwardRef, Ref, useRef, useState } from "react";
import {
  TouchableOpacity,
  Animated,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Platform,
  GestureResponderEvent,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { TabView, SceneMap } from "react-native-tab-view";

import EMOJI_MAP from "../assets/emoji_map";
import timeline from "../assets/peloponnesian_war/timeline.json";

const { width } = Dimensions.get("window");
const isAndroid = Platform.OS === "android";
const HEADER_COLLAPSE = 32;
const HEADER_LIST = 60;
const HEADER_HEIGHT = HEADER_LIST + HEADER_COLLAPSE;

const TAB_ROUTES = timeline;

const TabBarItem = memo(
  ({
    active,
    year,
    emoji,
    onPress,
  }: {
    active: boolean;
    year: number;
    emoji: string;
    onPress: (event: GestureResponderEvent) => void;
  }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <Text style={styles.item__emoji}>{emoji}</Text>
      <Text
        style={[styles.item__copy, { color: active ? "#1d9bd0" : "#d1d2d2" }]}
      >
        {year < 0 ? `${Math.abs(year)} BCE` : `${Math.abs(year)} CE`}
      </Text>
      {active && <View style={styles.item__line} />}
    </TouchableOpacity>
  )
);

const Route = ({
  route: { title, description },
}: {
  route: { title: string; description: string };
}) => {
  return (
    <View style={styles.route}>
      <View style={styles.content__header}>
        <Text style={styles.content__heading}>{title}</Text>
        {/* <Text style={styles.content__subheading}>{title}</Text> */}
      </View>

      <View style={styles.content__inside}>
        <Text style={styles.content__paragraph}>{description}</Text>
      </View>
    </View>
  );
};

const Tabs = memo(
  ({
    active,
    onIndexChange,
  }: {
    active: number;
    onIndexChange: (index: number) => void;
  }) => {
    const renderScene = SceneMap(
      timeline.reduce((result, { key }) => {
        result[key] = Route;
        return result;
      }, {} as { [index: string]: typeof Route })
    );

    return (
      <TabView
        navigationState={{ index: active, routes: TAB_ROUTES }}
        onIndexChange={onIndexChange}
        renderScene={renderScene}
        renderTabBar={() => null}
        initialLayout={{ width }}
        sceneContainerStyle={{ top: HEADER_HEIGHT }}
      />
    );
  }
);

const TabViewModal = forwardRef((_, ref: Ref<Modalize>) => {
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
          {TAB_ROUTES.map(({ year, type }, i) => (
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
    <>
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
        <Tabs active={index} onIndexChange={handleIndexChange} />
      </Modalize>
    </>
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

  item: {
    flexDirection: "row",
    alignItems: "center",

    marginRight: 25,

    height: "100%",
  },

  item__emoji: {
    fontSize: 22,
  },

  item__copy: {
    marginLeft: 4,

    fontSize: 14,

    color: "#d1d2d2",
  },

  item__line: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -1,

    height: 3,

    backgroundColor: "#1d9bd0",
  },

  route: {
    flex: 1,

    paddingTop: 12,
    paddingBottom: isAndroid ? 100 : 40,

    backgroundColor: "#1a1d21",
  },

  content__header: {
    padding: 15,
    paddingBottom: 0,
  },

  content__heading: {
    marginBottom: 2,

    fontSize: 24,
    fontWeight: "600",
    color: "#d1d2d2",
  },

  content__subheading: {
    marginBottom: 20,

    fontSize: 16,
    color: "#9a9c9d",
  },

  content__inside: {
    padding: 15,
  },

  content__paragraph: {
    fontSize: 15,
    fontWeight: "200",
    lineHeight: 22,
    color: "#666",
  },
});

export default TabViewModal;
