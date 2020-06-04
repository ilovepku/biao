export interface InitialRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
}

export interface City {
  title: string;
  description: string;
  pinColor: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
}

export interface Battle {
  coordinate: {
    latitude: number;
    longitude: number;
  };
  title: string;
  year: number;
  location: string;
  type: string;
  result: string;
  pinColor: string;
  link: string;
}
