// settings for react-native-maps
export const DEFAULT_LATITUDE_DELTA = 1;
export const DEFAULT_ANIMATE_DURATION = 2000;

// settings for react-native-modalize
export const MODAL_HEIGHT_PORTRAIT = 275;
export const MODAL_HEIGHT_LANDSCAPE = 125;
export const EDGE_PADDING_PORTRAIT = {
  top: 100,
  right: 100,
  bottom: 100 + 2 * MODAL_HEIGHT_PORTRAIT,
  left: 100,
};
export const EDGE_PADDING_LANDSCAPE = {
  top: 100,
  right: 100,
  bottom: 100 + 2 * MODAL_HEIGHT_LANDSCAPE,
  left: 100,
};

// settings for react-native-tab-view
export const HEADER_COLLAPSE = 18;
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
    emoji: "⚙️",
  },
};
