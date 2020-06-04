export interface InitialRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
}

export interface Cities {
  latlng: {
    latitude: number;
    longitude: number;
  };
  name: string;
  description: string;
  color: string;
}
