export type DrawerParamList = {
  Map: undefined
  Legend: undefined
  About: undefined
}

export type MapDetails = {
  [key: string]: boolean | undefined
}

interface Location extends Feature {
  id: string
  geometry: Point
  properties: GeoJsonProperties
}

type TimelineItem = {
  key: string
  year: number
  type: string
  title: string
  subtitle: string
  description: {background: string; events: string; aftermath: string}
  locations: string[]
}

export type Timeline = TimelineItem[]
