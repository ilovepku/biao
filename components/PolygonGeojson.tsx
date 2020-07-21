import React, { memo } from "react";
import { LatLng } from "react-native-maps";
import { Feature } from "geojson";
import { GeojsonType } from "../types";
import CustomPolygon from "./CustomPolygon";
import { AREA_COLOR_MAP } from "../assets/peloponnesian_war/settings";

type LayeredLatLng = LatLng[] | LatLng[][];
type Coordinates = LatLng | LayeredLatLng;

type Overlay = {
  feature: Feature;
  coordinates?: Coordinates;
  holes?: LayeredLatLng;
  type?: string;
};

const makePoint = (c: number[]) => ({ latitude: c[1], longitude: c[0] });

const makeLine = (l: number[][]) => l.map(makePoint);

const makeCoordinates = ({ geometry }: Feature) => {
  switch (geometry.type) {
    case "Polygon":
      return geometry.coordinates.map(makeLine);
    case "MultiPolygon":
      return geometry.coordinates.map((p) => p.map(makeLine));
    default:
      return [];
  }
};

const makeOverlay = (coordinates: Coordinates, feature: Feature) => {
  let overlay: Overlay = {
    feature,
  };

  overlay.coordinates = (coordinates as LayeredLatLng)[0];
  if ((coordinates as LayeredLatLng).length > 1) {
    overlay.holes = (coordinates as LayeredLatLng).slice(1);
  }

  return {
    feature,
    coordinates: (coordinates as LayeredLatLng)[0],
    holes:
      (coordinates as LayeredLatLng).length > 1
        ? (coordinates as LayeredLatLng).slice(1)
        : null,
  };
};

const mapFeatureToOverlay = (feature: Feature) =>
  (makeCoordinates(feature) as Coordinates[]).map((coordinates) =>
    makeOverlay(coordinates, feature)
  );

export const makeOverlays = (features: Feature[]) => {
  const multipolygons = features
    .filter((f) => f.geometry.type === "MultiPolygon")
    .map(mapFeatureToOverlay)
    .flat();

  const polygons = features
    .filter((f) => f.geometry.type === "Polygon")
    .map((feature) =>
      makeOverlay(makeCoordinates(feature) as LatLng[][], feature)
    )
    .flat()
    .concat(multipolygons)
    .map((overlay, index) => ({
      ...overlay,
      type: "polygon",
      key: `${overlay.feature.id}-${index}`,
    }));

  return polygons;
};

type Props = {
  geojson: GeojsonType;
  color?: string;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: number;
  miniIcon?: boolean;
};

const PolygonGeojson = memo(
  ({ geojson, strokeColor, fillColor, strokeWidth }: Props) => {
    const overlays = makeOverlays(geojson.features);
    return (
      <>
        {overlays.map((overlay) => (
          <CustomPolygon
            key={overlay.key}
            coordinates={overlay.coordinates as LatLng[]}
            holes={overlay.holes as LatLng[][]}
            strokeColor={strokeColor}
            fillColor={
              fillColor
                ? fillColor
                : AREA_COLOR_MAP[overlay.feature.properties!.status].color
            }
            strokeWidth={strokeWidth}
          />
        ))}
      </>
    );
  }
);

export default PolygonGeojson;
