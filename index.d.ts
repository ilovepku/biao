export interface InitialRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
}

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface City {
  title: string;
  description: string;
  color: string;
  coordinate: Coordinate;
}

export interface Battle {
  title: string;
  color: string;
  coordinate: Coordinate;
  year: number;
  type: string;
  location: string;
  result: string;
  link: string;
}

export interface Attraction {
  title: string;
  description: string;
  coordinate: Coordinate;
  type: string;
  address: string;
  link: string;
}

export interface GeojsonWrapper {
  name: string;
  color: string;
  geojson: GeoJSON;
}
