import React, {memo} from 'react'
import {LatLng, Polygon} from 'react-native-maps'
import {Feature} from 'geojson'
import {GeojsonType} from '../types.d'
import {AREA_COLOR_MAP} from '../../assets/peloponnesian_war/settings'

type LayeredLatLng = LatLng[] | LatLng[][]
type Coordinates = LatLng | LayeredLatLng

interface Overlay {
  feature: Feature
  coordinates?: Coordinates
  holes?: LayeredLatLng
  type?: string
}

interface IPolygon extends Overlay {
  type: string
  key: string
}

const makePoint = (c: number[]) => ({latitude: c[1], longitude: c[0]})

const makeLine = (l: number[][]) => l.map(makePoint)

const makeCoordinates = ({geometry}: Feature) => {
  switch (geometry.type) {
    case 'Polygon':
      return geometry.coordinates.map(makeLine)
    case 'MultiPolygon':
      return geometry.coordinates.map(p => p.map(makeLine))
    default:
      return []
  }
}

const makeOverlay = (coordinates: Coordinates, feature: Feature) => {
  const overlay: Overlay = {
    feature,
  }

  const [firstSetOfCoordinates] = coordinates as LayeredLatLng
  overlay.coordinates = firstSetOfCoordinates
  if ((coordinates as LayeredLatLng).length > 1) {
    overlay.holes = (coordinates as LayeredLatLng).slice(1)
  }

  return {
    feature,
    coordinates: (coordinates as LayeredLatLng)[0],
    holes:
      (coordinates as LayeredLatLng).length > 1
        ? (coordinates as LayeredLatLng).slice(1)
        : undefined,
  }
}

const mapFeatureToOverlay = (feature: Feature) =>
  (makeCoordinates(feature) as Coordinates[]).map(coordinates =>
    makeOverlay(coordinates, feature),
  )

export const makeOverlays = (features: Feature[]): IPolygon[] => {
  const multipolygons = features
    .filter(f => f.geometry.type === 'MultiPolygon')
    .map(mapFeatureToOverlay)
    .flat()

  const polygons = features
    .filter(f => f.geometry.type === 'Polygon')
    .map(feature =>
      makeOverlay(makeCoordinates(feature) as LatLng[][], feature),
    )
    .flat()
    .concat(multipolygons)
    .map((overlay, index) => ({
      ...overlay,
      type: 'polygon',
      key: `${overlay.feature.id}-${index}`,
    }))

  return polygons
}

type Props = {
  geojson: GeojsonType
  strokeWidth?: number
}

const PolygonGeojson: React.FunctionComponent<Props> = memo(
  ({geojson, strokeWidth}: Props) => {
    const overlays = makeOverlays(geojson.features)
    return (
      <>
        {overlays.map(overlay => (
          <Polygon
            key={overlay.key}
            coordinates={overlay.coordinates as LatLng[]}
            holes={overlay.holes as LatLng[][]}
            fillColor={
              overlay.feature.properties
                ? AREA_COLOR_MAP[overlay.feature.properties.status].color
                : '#000'
            }
            strokeWidth={strokeWidth}
          />
        ))}
      </>
    )
  },
)

PolygonGeojson.defaultProps = {
  strokeWidth: 0,
}

export default PolygonGeojson
