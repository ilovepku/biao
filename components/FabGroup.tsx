import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Provider, Portal, FAB } from "react-native-paper";

interface Props {
  markerFilters: { [index: string]: boolean };
  setMarkerFilters: Function;
}

const FabGroup = ({ markerFilters, setMarkerFilters }: Props) => {
  const [open, setOpen] = useState(false);
  const onStateChange = ({ open }: { open: boolean }) => setOpen(open);

  return (
    <Provider>
      <Portal>
        <FAB.Group
          actions={[
            {
              icon: markerFilters.attraction ? "star" : "star-outline",
              label: "Attractions",
              style: styles.fab,
              onPress: () =>
                setMarkerFilters({
                  ...markerFilters,
                  attraction: !markerFilters.attraction,
                }),
            },
            {
              icon: markerFilters.battle ? "skull" : "skull-outline",
              label: "Battles",
              style: styles.fab,
              onPress: () =>
                setMarkerFilters({
                  ...markerFilters,
                  battle: !markerFilters.battle,
                }),
            },
            {
              icon: markerFilters.city ? "home" : "home-outline",
              label: "Cities",
              style: styles.fab,
              onPress: () =>
                setMarkerFilters({
                  ...markerFilters,
                  city: !markerFilters.city,
                }),
            },
          ]}
          icon={
            Object.values(markerFilters).every((item) => item)
              ? "filter-outline"
              : "filter"
          }
          open={open}
          onStateChange={onStateChange}
          visible={true}
          fabStyle={[styles.fab, styles.fabGroup]}
        />
      </Portal>
    </Provider>
  );
};

const styles = StyleSheet.create({
  fab: {
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  fabGroup: {
    backgroundColor: "#FFF",
  },
});

export default FabGroup;
