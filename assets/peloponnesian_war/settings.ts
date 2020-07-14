export const INITIAL_REGION = {
  latitude: 37.17615217644666,
  longitude: 20.915832035243508,
  latitudeDelta: 12.620493457720851,
};

export const AREA_COLOR_MAP: {
  [key: string]: { name: string; color: string };
} = {
  delian: { name: "Delian League and Allies", color: "rgba(13, 12, 92, .5)" },
  peloponnesian: {
    name: "Peloponnesian League and Allies",
    color: "rgba(246, 16, 27, .5)",
  },
  neutral: { name: "Neutral Greek States", color: "rgba(247, 186, 109, .5)" },
};

export const MARKER_COLOR_MAP: {
  [key: string]: { city: string; battle: string; color: string };
} = {
  delian: {
    city: "Delian League or Allied City",
    battle: "Delian League Victory",
    color: "teal",
  },
  delianHighlight: {
    city: "Highlighted Delian League City",
    battle: "Decisive Delian League Victory",
    color: "navy",
  },
  peloponnesian: {
    city: "Peloponnesian League or Allied City",
    battle: "Peloponnesian League Victory",
    color: "tomato",
  },
  peloponnesianHighlight: {
    city: "Highlighted Peloponnesian League City",
    battle: "Decisive Peloponnesian League Victory",
    color: "red",
  },
  neutral: {
    city: "Neutral Greek City",
    battle: "Stalemate",
    color: "gold",
  },
};
