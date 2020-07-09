import { Platform } from "react-native";

// settings for react-native-maps
export const DEFAULT_LATITUDE_DELTA = 1;
export const DEFAULT_ANIMATE_DURATION = 2000;
export const MINI_MARKER_LATITUDE_DELTA_THRESHOLD = 1;

// settings for react-native-modalize
export const MODAL_HEIGHT_PORTRAIT = 275;
export const MODAL_HEIGHT_LANDSCAPE = 125;
const EDGE_PADDING = Platform.OS === "ios" ? 50 : 150;
const EXTRA_PORTRAIT_BOTTOM_PADDING =
  Platform.OS === "ios" ? MODAL_HEIGHT_PORTRAIT : 2 * MODAL_HEIGHT_PORTRAIT;
const EXTRA_LANDSCAPE_BOTTOM_PADDING =
  Platform.OS === "ios" ? MODAL_HEIGHT_PORTRAIT / 3 : MODAL_HEIGHT_PORTRAIT;
export const EDGE_PADDING_PORTRAIT = {
  top: EDGE_PADDING,
  right: EDGE_PADDING,
  bottom: EDGE_PADDING + EXTRA_PORTRAIT_BOTTOM_PADDING,
  left: EDGE_PADDING,
};
export const EDGE_PADDING_LANDSCAPE = {
  top: EDGE_PADDING,
  right: EDGE_PADDING,
  bottom: EDGE_PADDING + EXTRA_LANDSCAPE_BOTTOM_PADDING,
  left: EDGE_PADDING,
};

// settings for react-native-tab-view
export const HEADER_COLLAPSE = 20;
export const HEADER_LIST = 40;
export const HEADER_HEIGHT = HEADER_LIST + HEADER_COLLAPSE;
export const TAB_BAR_ITEM_WIDTH = 95;
export const TAB_BAR_ITEM_MARGIN = 25;

// resouce maps
export const ICON_MAP: { [key: string]: string } = {
  city: "home-map-marker",
  battle: "sword-cross",
  naval: "ship-wheel",
  siege: "tower-fire",
  revolt: "fire",
};

export const EMOJI_MAP: { [index: string]: { name: string; emoji: string } } = {
  art: {
    name: "Arts & Culture",
    emoji: "🎨",
  },
  city: {
    name: "Cities & Buildings",
    emoji: "🏛️",
  },
  science: {
    name: "Civilization & Science",
    emoji: "🧪",
  },
  diplomacy: {
    name: "Diplomacy & Trade",
    emoji: "🤝",
  },
  nature: {
    name: "Nature & Climate",
    emoji: "❄️",
  },
  philosophy: {
    name: "Philosophy & Religion",
    emoji: "📿",
  },
  politics: {
    name: "Politics & Rulers",
    emoji: "🗳️",
  },
  territory: {
    name: "States & Territories",
    emoji: "🚩",
  },
  revolt: {
    name: "Revolt & Unrest",
    emoji: "🔥",
  },
  battle: {
    name: "War(fare) & Battles",
    emoji: "⚔️",
  },
  naval: {
    name: "Naval Battle",
    emoji: "⚓",
  },
  siege: {
    name: "Siege Battle",
    emoji: "🛡️",
  },
};
