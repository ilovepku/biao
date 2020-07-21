import { LatLng } from "react-native-maps";

export type DrawerParamList = {
  Map: undefined;
  Legend: undefined;
  About: undefined;
};

export type GeojsonType = GeoJSON;

type TimelineItem = {
  key: string;
  year: number;
  type: string;
  title: string;
  subtitle: string;
  description: { background: string; events: string; aftermath: string };
  locations: string[];
};

export type Timeline = TimelineItem[];
