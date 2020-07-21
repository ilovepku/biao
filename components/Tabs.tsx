import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Dimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";

import { RootState } from "../redux/store";
import { Timeline } from "../types";
import { HEADER_LIST, HEADER_HEIGHT } from "../settings";
import TabRoute from "./TabRoute";

type Props = {
  tabRoutes: Timeline;
  active: number;
  onIndexChange: (index: number) => void;
};

const Tabs = memo(({ tabRoutes, active, onIndexChange }: Props) => {
  const { orientation } = useSelector((state: RootState) => state);
  const renderScene = SceneMap(
    tabRoutes.reduce((sceneMap, { key }) => {
      sceneMap[key] = TabRoute;
      return sceneMap;
    }, {} as { [index: string]: typeof TabRoute })
  );

  const disableDefaultTabBar = () => null;

  return (
    <TabView
      navigationState={{ index: active, routes: tabRoutes }}
      onIndexChange={onIndexChange}
      renderScene={renderScene}
      renderTabBar={disableDefaultTabBar}
      initialLayout={{ width: Dimensions.get("window").width }}
      sceneContainerStyle={{
        top: orientation === "landscape" ? HEADER_LIST : HEADER_HEIGHT,
      }}
    />
  );
});

export default Tabs;
