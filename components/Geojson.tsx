import React from "react";
import { Marker, Polyline, Polygon, LatLng } from "react-native-maps";
import { Feature } from "geojson";
import { GeojsonType } from "../types";
import IconMarker from "./IconMarker";
import { COLOR_MAP } from "../assets/peloponnesian_war/settings";

type LayeredLatLng = LatLng[] | LatLng[][];
type Coordinates = LatLng | LayeredLatLng;

interface Overlay {
  feature: Feature;
  coordinates?: Coordinates;
  holes?: LayeredLatLng;
  type?: string;
}

const makePoint = (c: number[]) => ({ latitude: c[1], longitude: c[0] });

const makeLine = (l: number[][]) => l.map(makePoint);

const makeCoordinates = ({ geometry }: Feature) => {
  switch (geometry.type) {
    case "Point":
      return [makePoint(geometry.coordinates)];
    case "MultiPoint":
      return geometry.coordinates.map(makePoint);
    case "LineString":
      return [makeLine(geometry.coordinates)];
    case "MultiLineString":
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
  if (
    (Array.isArray(coordinates) && feature.geometry.type === "Polygon") ||
    feature.geometry.type === "MultiPolygon"
  ) {
    overlay.coordinates = (coordinates as LayeredLatLng)[0];
    if ((coordinates as LayeredLatLng).length > 1) {
      overlay.holes = (coordinates as LayeredLatLng).slice(1);
    }
  } else {
    overlay.coordinates = coordinates;
  }
  return overlay;
};

export const makeOverlays = (features: Feature[]) => {
  const points = features
    .filter(
      ({ geometry: { type } }) => type === "Point" || type === "MultiPoint"
    )
    .map((feature) =>
      (makeCoordinates(feature) as Coordinates[]).map((coordinates) =>
        makeOverlay(coordinates, feature)
      )
    )
    .flat()
    .map((overlay) => ({ ...overlay, type: "point" }));

  const lines = features
    .filter(
      ({ geometry: { type } }) =>
        type === "LineString" || type === "MultiLineString"
    )
    .map((feature) =>
      (makeCoordinates(feature) as Coordinates[]).map((coordinates) =>
        makeOverlay(coordinates, feature)
      )
    )
    .flat()
    .map((overlay) => ({ ...overlay, type: "polyline" }));

  const multipolygons = features
    .filter((f) => f.geometry.type === "MultiPolygon")
    .map((feature) =>
      (makeCoordinates(feature) as Coordinates[]).map((coordinates) =>
        makeOverlay(coordinates, feature)
      )
    )
    .flat();

  const polygons = features
    .filter((f) => f.geometry.type === "Polygon")
    .map((feature) =>
      makeOverlay(makeCoordinates(feature) as LatLng[][], feature)
    )
    .flat()
    .concat(multipolygons)
    .map((overlay) => ({ ...overlay, type: "polygon" }));

  return points.concat(lines).concat(polygons);
};

interface Props {
  geojson: GeojsonType;
  color?: string;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: number;
}

const Geojson = ({
  geojson,
  color,
  strokeColor,
  fillColor,
  strokeWidth,
}: Props) => {
  const overlays = makeOverlays(geojson.features);
  return (
    <>
      {overlays.map((overlay, index) => {
        switch (overlay.type) {
          case "point":
            return (
              <Marker
                key={index}
                title={overlay.feature.properties!.name as string}
                description={overlay.feature.properties!.description}
                pinColor={color}
                coordinate={overlay.coordinates as LatLng}
                anchor={{ x: 1, y: 1 }}
                calloutAnchor={{ x: 0, y: 0 }}
                rotation={45}
              >
                <IconMarker
                  name={overlay.feature.properties!.type}
                  png={overlay.feature.properties!.status === "attraction"}
                  color={
                    overlay.feature.properties!.highlight
                      ? COLOR_MAP[
                          `${overlay.feature.properties!.status}Highlight`
                        ]
                      : COLOR_MAP[overlay.feature.properties!.status]
                  }
                />
              </Marker>
            );
          case "polygon":
            return (
              <Polygon
                key={index}
                coordinates={overlay.coordinates as LatLng[]}
                holes={overlay.holes as LatLng[][]}
                strokeColor={strokeColor}
                fillColor={
                  fillColor
                    ? fillColor
                    : COLOR_MAP[`${overlay.feature.properties!.status}Area`]
                }
                strokeWidth={strokeWidth}
              />
            );
          case "polyline":
            return (
              <Polyline
                key={index}
                coordinates={overlay.coordinates as LatLng[]}
                strokeColor={strokeColor}
                strokeWidth={strokeWidth}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
};

export default Geojson;
