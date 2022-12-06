export default interface MapboxFeature {
  place_name: string;
  geometry: {
    coordinates: number[];
  };
}
