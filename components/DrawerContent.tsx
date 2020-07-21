import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet } from "react-native";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Container, ListItem, Left, Text, Right, Switch } from "native-base";

import { RootState } from "../redux/store";
import { toggleDarkMode } from "../redux/actions";

const DrawerContent = (props: DrawerContentComponentProps) => {
  const { darkMode } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  const ContainerStyle = darkMode ? styles.darkContainer : {};

  return (
    <Container>
      <DrawerContentScrollView style={ContainerStyle} {...props}>
        <DrawerItemList inactiveTintColor={"#a7a7a7"} {...props} />
      </DrawerContentScrollView>

      <ListItem style={ContainerStyle} noIndent last>
        <Left>
          <Text note>Dark Mode</Text>
        </Left>
        <Right>
          <Switch value={darkMode} onValueChange={handleToggleDarkMode} />
        </Right>
      </ListItem>
    </Container>
  );
};

const styles = StyleSheet.create({
  darkContainer: { backgroundColor: "#1a1d21" },
});

export default DrawerContent;
