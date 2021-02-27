import {Platform} from 'react-native'

export const MAP_TYPES = [
  {name: 'standard', title: 'Default', icon: 'map'},
  {name: 'hybrid', title: 'Satellite', icon: 'satellite'},
  {name: 'terrain', title: 'Terrain', icon: 'terrain'},
]

export const MAP_DETAILS = [
  {
    name: 'battle',
    title: 'Land Battles',
  },
  {
    name: 'naval',
    title: 'Naval Battles',
  },
  {
    name: 'siege',
    title: 'Sieges',
  },
  {
    name: 'revolt',
    title: 'Revolts',
  },
  {
    name: 'city',
    title: 'Cities',
  },
]

type ICON_TYPES = 'sword-cross' | 'ship-wheel' | 'wall' | 'fire' | 'home-group'

export const MAP_DETAIL_ICON: {[key: string]: ICON_TYPES} = {
  battle: 'sword-cross',
  naval: 'ship-wheel',
  siege: 'wall',
  revolt: 'fire',
  city: 'home-group',
}

// settings for react-native-maps
export const DEFAULT_LATITUDE_DELTA = 1
export const DEFAULT_ANIMATE_DURATION = 2000
export const MINI_MARKER_LATITUDE_DELTA_THRESHOLD = 1

// settings for react-native-modalize
export const MODAL_HEIGHT_PORTRAIT = 275
export const MODAL_HEIGHT_LANDSCAPE = 125
const EDGE_PADDING = Platform.OS === 'ios' ? 50 : 150
const EXTRA_PORTRAIT_BOTTOM_PADDING =
  Platform.OS === 'ios' ? MODAL_HEIGHT_PORTRAIT : 2 * MODAL_HEIGHT_PORTRAIT
const EXTRA_LANDSCAPE_BOTTOM_PADDING =
  Platform.OS === 'ios' ? MODAL_HEIGHT_PORTRAIT / 3 : MODAL_HEIGHT_PORTRAIT
export const EDGE_PADDING_PORTRAIT = {
  top: EDGE_PADDING,
  right: EDGE_PADDING,
  bottom: EDGE_PADDING + EXTRA_PORTRAIT_BOTTOM_PADDING,
  left: EDGE_PADDING,
}
export const EDGE_PADDING_LANDSCAPE = {
  top: EDGE_PADDING,
  right: EDGE_PADDING,
  bottom: EDGE_PADDING + EXTRA_LANDSCAPE_BOTTOM_PADDING,
  left: EDGE_PADDING,
}

// settings for react-native-tab-view
export const HEADER_COLLAPSE = 20
export const HEADER_LIST = 40
export const HEADER_HEIGHT = HEADER_LIST + HEADER_COLLAPSE
export const TAB_BAR_ITEM_WIDTH = 100
export const TAB_BAR_ITEM_MARGIN = 20

export const EMOJI_MAP: {[index: string]: {name: string; emoji: string}} = {
  battle: {
    name: 'Land Battle',
    emoji: '⚔️',
  },
  naval: {
    name: 'Naval Battle',
    emoji: '⚓',
  },
  revolt: {
    name: 'Revolt',
    emoji: '🔥',
  },
  siege: {
    name: 'Siege',
    emoji: '🛡️',
  },
}
