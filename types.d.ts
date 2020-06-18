import { LatLng } from "react-native-maps";

export interface InitialRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
}

export interface City {
  title: string;
  description: string;
  color: string;
  coordinate: LatLng;
}

export interface Battle {
  title: string;
  color: string;
  coordinate: LatLng;
  year: number;
  type: string;
  location: string;
  result: string;
  link: string;
}

export interface Attraction {
  title: string;
  description: string;
  coordinate: LatLng;
  type: string;
  address: string;
  link: string;
}

export type GeojsonType = GeoJSON;

interface TimelineItem {
  key: string;
  year: number;
  type: string;
  title: string;
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
