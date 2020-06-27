import { LatLng } from "react-native-maps";

export interface InitialRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
}

export type GeojsonType = GeoJSON;

interface TimelineItem {
  key: string;
  year: number;
  type: string;
  title: string;
  subtitle: string;
  description: string;
  locations: string[];
}

export type Timeline = TimelineItem[];

export interface PointFeature {
  id?: string | number;
  type: "Feature";
  geometry: { type: "Point"; coordinates: number[] };
  properties: { [name: string]: any };
}
