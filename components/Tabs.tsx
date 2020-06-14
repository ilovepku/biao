import React, { memo } from "react";
import { Dimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { Timeline } from "../types";
import TabRoute from "./TabRoute";

const { width } = Dimensions.get("window");

import { HEADER_HEIGHT } from "../assets/settings";

interface Props {
  tabRoutes: Timeline;
  active: number;
  onIndexChange: (index: number) => void;
}

const Tabs = memo(({ tabRoutes, active, onIndexChange }: Props) => {
  const renderScene = SceneMap(
    tabRoutes.reduce((sceneMap, { key }) => {
      sceneMap[key] = TabRoute;
      return sceneMap;
    }, {} as { [index: string]: typeof TabRoute })
  );

  return (
    <TabView
      navigationState={{ index: active, routes: tabRoutes }}
      onIndexChange={onIndexChange}
      renderScene={renderScene}
      renderTabBar={() => null}
      initialLayout={{ width }}
      sceneContainerStyle={{ top: HEADER_HEIGHT }}
    />
  );
});

export default Tabs;
