import React from "react";
import { Marker, Polyline, Polygon, LatLng } from "react-native-maps";
import { Feature } from "geojson";
import { GeojsonType } from "../types";

interface Overlay {
  feature: Feature;
  coordinates?: LatLng | LatLng[] | LatLng[][];
  holes?: LatLng[] | LatLng[][];
  type?: string;
}

const makePoint = (c: number[]) => ({ latitude: c[1], longitude: c[0] });

const makeLine = (l: number[][]) => l.map(makePoint);

const makeCoordinates = (feature: Feature) => {
  const g = feature.geometry;
  if (g.type === "Point") {
    return [makePoint(g.coordinates)];
  } else if (g.type === "MultiPoint") {
    return g.coordinates.map(makePoint);
  } else if (g.type === "LineString") {
    return [makeLine(g.coordinates)];
  } else if (g.type === "MultiLineString") {
    return g.coordinates.map(makeLine);
  } else if (g.type === "Polygon") {
    return g.coordinates.map(makeLine);
  } else if (g.type === "MultiPolygon") {
    return g.coordinates.map((p) => p.map(makeLine));
  } else {
    return [];
  }
};

const makeOverlay = (
  coordinates: LatLng | LatLng[] | LatLng[][],
  feature: Feature
) => {
  let overlay: Overlay = {
    feature,
  };
  if (
    (Array.isArray(coordinates) && feature.geometry.type === "Polygon") ||
    feature.geometry.type === "MultiPolygon"
  ) {
    overlay.coordinates = (coordinates as LatLng[] | LatLng[][])[0];
    if ((coordinates as LatLng[] | LatLng[][]).length > 1) {
      overlay.holes = (coordinates as LatLng[] | LatLng[][]).slice(1);
    }
  } else {
    overlay.coordinates = coordinates;
  }
  return overlay;
};

export const makeOverlays = (features: Feature[]) => {
  const points = features
    .filter(
      (f: Feature) =>
        f.geometry &&
        (f.geometry.type === "Point" || f.geometry.type === "MultiPoint")
    )
    .map((feature: Feature) =>
      (makeCoordinates(feature) as (
        | LatLng
        | LatLng[]
        | LatLng[][]
      )[]).map((coordinates: LatLng | LatLng[] | LatLng[][]) =>
        makeOverlay(coordinates, feature)
      )
    )
    .flat()
    .map((overlay: Overlay) => ({ ...overlay, type: "point" }));

  const lines = features
    .filter(
      (f) =>
        f.geometry &&
        (f.geometry.type === "LineString" ||
          f.geometry.type === "MultiLineString")
    )
    .map((feature) =>
      (makeCoordinates(feature) as (
        | LatLng
        | LatLng[]
        | LatLng[][]
      )[]).map((coordinates: LatLng | LatLng[] | LatLng[][]) =>
        makeOverlay(coordinates, feature)
      )
    )
    .flat()
    .map((overlay: Overlay) => ({ ...overlay, type: "polyline" }));

  const multipolygons = features
    .filter((f) => f.geometry && f.geometry.type === "MultiPolygon")
    .map((feature) =>
      (makeCoordinates(feature) as (
        | LatLng
        | LatLng[]
        | LatLng[][]
      )[]).map((coordinates: LatLng | LatLng[] | LatLng[][]) =>
        makeOverlay(coordinates, feature)
      )
    )
    .flat();

  const polygons = features
    .filter((f) => f.geometry && f.geometry.type === "Polygon")
    .map((feature) =>
      makeOverlay(makeCoordinates(feature) as LatLng[][], feature)
    )
    .flat()
    .concat(multipolygons)
    .map((overlay: Overlay) => ({ ...overlay, type: "polygon" }));

  return points.concat(lines).concat(polygons);
};

interface Props {
  geojson: GeojsonType;
  color?: string;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: number;
}

const Geojson = (props: Props) => {
  const overlays = makeOverlays(props.geojson.features);
  return (
    <React.Fragment>
      {overlays.map((overlay: Overlay, index: number) => {
        if (overlay.type === "point") {
          return (
            <Marker
              key={index}
              coordinate={overlay.coordinates as LatLng}
              pinColor={props.color}
            />
          );
        }
        if (overlay.type === "polygon") {
          return (
            <Polygon
              key={index}
              coordinates={overlay.coordinates as LatLng[]}
              holes={overlay.holes as LatLng[][]}
              strokeColor={props.strokeColor}
              fillColor={props.fillColor}
              strokeWidth={props.strokeWidth}
            />
          );
        }
        if (overlay.type === "polyline") {
          return (
            <Polyline
              key={index}
              coordinates={overlay.coordinates as LatLng[]}
              strokeColor={props.strokeColor}
              strokeWidth={props.strokeWidth}
            />
          );
        }
      })}
    </React.Fragment>
  );
};

export default Geojson;
