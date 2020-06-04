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
  pinColor: string;
  coordinate: Coordinate;
}

export interface Battle {
  title: string;
  pinColor: string;
  coordinate: Coordinate;
  year: number;
  type: string;
  location: string;
  result: string;
  link: string;
}
