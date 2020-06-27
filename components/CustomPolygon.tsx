// temp fix for react-native-maps Polygon component fillColor bug on iOS
// https://github.com/react-native-community/react-native-maps/issues/3025#issuecomment-538345230

import React, { memo, useRef } from "react";
import { Polygon, MapPolygonProps } from "react-native-maps";

const CustomPolygon = memo((props: MapPolygonProps) => {
  const ref = useRef<Polygon>(null);

  const onLayout = () => {
    // @ts-ignore: temp fix
    ref.current && ref.current.setNativeProps({ fillColor: props.fillColor });
  };

  return <Polygon ref={ref} onLayout={onLayout} {...props} />;
});

export default CustomPolygon;
