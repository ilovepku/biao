import { COLOR_THEME } from "./general";

const BATTLES = [
  {
    title: "Battle of Sybota",
    color: COLOR_THEME.neutral,
    coordinate: {
      latitude: 39.4033333,
      longitude: 20.2152778,
    },
    year: -433,
    type: "naval",
    location: "Off Corcyra",
    result: "Stalemate, both Corinth and Corcyra claimed victory",
    link: "https://en.wikipedia.org/wiki/Battle_of_Sybota",
  },
  {
    title: "Battle of Potidaea",
    color: COLOR_THEME.delian,
    coordinate: {
      latitude: 40.1937,
      longitude: 23.3278,
    },
    year: -432,
    type: "siege",
    location: "Potidaea",
    result: "Athenian victory",
    link: "https://en.wikipedia.org/wiki/Battle_of_Potidaea",
  },
  {
    title: "Battle of Spartolos",
    color: COLOR_THEME.peloponnesian,
    coordinate: {
      latitude: 40.2832,
      longitude: 23.2954,
    },
    year: -429,
    type: "land",
    location: "Chalcidice",
    result: "Chalcidian victory",
    link: "https://en.wikipedia.org/wiki/Battle_of_Spartolos",
  },
  {
    title: "Battle of Rhium",
    color: COLOR_THEME.delian,
    coordinate: {
      latitude: 38.3,
      longitude: 21.783333,
    },
    year: -429,
    type: "naval",
    location: "Mouth of the Corinthian Gulf, near present-day Rio, Greece",
    result: "Athenian victory",
    link: "https://en.wikipedia.org/wiki/Battle_of_Rhium",
  },
  {
    title: "Battle of Naupactus",
    color: COLOR_THEME.delian,
    coordinate: {
      latitude: 38.393889,
      longitude: 21.830556,
    },
    year: -429,
    type: "naval",
    location: "Off Naupactus",
    result: "Athenian victory",
    link: "https://en.wikipedia.org/wiki/Battle_of_Naupactus",
  },
  {
    title: "Siege of Plataea",
    color: COLOR_THEME.peloponnesian,
    coordinate: {
      latitude: 38.219992,
      longitude: 23.273853,
    },
    year: -429,
    endYear: -427,
    type: "siege",
    location: "Plataea",
    result: "Theban victory, Plataea razed to the ground",
    link: "https://en.wikipedia.org/wiki/Siege_of_Plataea",
  },
  {
    title: "Mytilenean revolt",
    color: COLOR_THEME.delian,
    coordinate: {
      latitude: 39.21,
      longitude: 26.28,
    },
    year: -428,
    endYear: -427,
    type: "revolt",
    location: "Lesbos",
    result: "Athenian victory",
    link: "https://en.wikipedia.org/wiki/Mytilenean_revolt",
  },
  {
    title: "Battle of Tanagra",
    color: COLOR_THEME.delian,
    coordinate: {
      latitude: 38.316667,
      longitude: 23.533333,
    },
    year: -426,
    type: "land",
    location: "Tanagra",
    result: "Athenian victory",
    link: "https://en.wikipedia.org/wiki/Battle_of_Tanagra_(426_BC)",
  },
  {
    title: "Aetolian campaign",
    color: COLOR_THEME.peloponnesian,
    coordinate: {
      latitude: 38.5054294,
      longitude: 21.8091625,
    },
    year: -426,
    type: "land",
    location: "Aetolia",
    result: "Aetolian victory",
    link: "https://en.wikipedia.org/wiki/Aetolian_campaign",
  },
  {
    title: "Battle of Olpae",
    color: COLOR_THEME.delian,
    coordinate: {
      latitude: 38.949996,
      longitude: 21.149835,
    },
    year: -426,
    type: "land",
    location: "Olpae",
    result: "Athenian victory",
    link: "https://en.wikipedia.org/wiki/Battle_of_Olpae",
  },
  {
    title: "Battle of Idomene",
    color: COLOR_THEME.delian,
    coordinate: {
      latitude: 38.85,
      longitude: 21.166667,
    },
    year: -426,
    type: "land",
    location: "Idomene",
    result: "Athenian Victory",
    link: "https://en.wikipedia.org/wiki/Battle_of_Idomene",
  },
  {
    title: "Battle of Pylos",
    color: COLOR_THEME.delian,
    coordinate: {
      latitude: 36.916667,
      longitude: 21.7,
    },
    year: -425,
    type: "land",
    location: "Pylos",
    result: "Athenian victory",
    link: "https://en.wikipedia.org/wiki/Battle_of_Pylos",
  },
  {
    title: "Battle of Sphacteria",
    color: COLOR_THEME.delian,
    coordinate: {
      latitude: 36.930136,
      longitude: 21.665725,
    },
    year: -425,
    type: "land",
    location: "Sphacteria, a small island at the entrance to the bay of Pylos",
    result: "Athenian victory",
    link: "https://en.wikipedia.org/wiki/Battle_of_Sphacteria",
  },
  {
    title: "Battle of Megara",
    color: COLOR_THEME.delian,
    coordinate: {
      latitude: 37.996389,
      longitude: 23.344444,
    },
    year: -424,
    type: "land",
    location: "Megara, Greece",
    result: "Athenian victory",
    link: "https://en.wikipedia.org/wiki/Battle_of_Megara",
  },
  {
    title: "Battle of Delium",
    color: COLOR_THEME.peloponnesian,
    coordinate: {
      latitude: 38.346208,
      longitude: 23.661354,
    },
    year: -424,
    type: "land",
    location: "Delium",
    result: "Boeotian victory",
    link: "https://en.wikipedia.org/wiki/Battle_of_Delium",
  },
  {
    title: "Battle of Amphipolis",
    color: COLOR_THEME.peloponnesianHighlight,
    coordinate: {
      latitude: 40.818333,
      longitude: 23.84,
    },
    year: -422,
    type: "land",
    location: "Amphipolis",
    result: "Decisive Spartan victory",
    link: "https://en.wikipedia.org/wiki/Battle_of_Amphipolis",
  },
  {
    title: "Battle of Mantinea",
    color: COLOR_THEME.peloponnesian,
    coordinate: {
      latitude: 37.617642,
      longitude: 22.392869,
    },
    year: -418,
    type: "land",
    location: "Mantinea",
    result: "Spartan victory",
    link: "https://en.wikipedia.org/wiki/Battle_of_Mantinea_(418_BC)",
  },
  {
    title: "Battle of Hysiae",
    color: COLOR_THEME.peloponnesianHighlight,
    coordinate: {
      latitude: 37.519836,
      longitude: 22.585884,
    },
    year: -417,
    type: "siege",
    location: "Hysiae, Argolis",
    result: "Decisive Spartan victory",
    link: "https://en.wikipedia.org/wiki/Battle_of_Hysiae_(417_BC)",
  },
  {
    title: "Battle of Orneae",
    color: COLOR_THEME.delian,
    coordinate: {
      latitude: 37.713973,
      longitude: 22.557292,
    },
    year: -417,
    type: "siege",
    location: "Orneae, Argolis",
    result: "Athenian/Argive Victory",
    link: "https://en.wikipedia.org/wiki/Battle_of_Orneae",
  },
  {
    title: "Siege of Melos",
    color: COLOR_THEME.delian,
    coordinate: {
      latitude: 36.683333,
      longitude: 24.416667,
    },
    year: -416,
    type: "siege",
    location: "Melos",
    result: "Athenian victory",
    link: "https://en.wikipedia.org/wiki/Siege_of_Melos",
  },
  {
    title: "Sicilian Expedition",
    color: COLOR_THEME.peloponnesianHighlight,
    coordinate: {
      latitude: 37.0833,
      longitude: 15.2833,
    },
    year: -415,
    endYear: -413,
    type: "land",
    location: "Sicily, Italy",
    result:
      "Decisive Spartan/Syracusan victory, Athenian expeditionary force completely destroyed",
    link: "https://en.wikipedia.org/wiki/Sicilian_Expedition",
  },
  {
    title: "Battle of Syme",
    color: COLOR_THEME.peloponnesian,
    coordinate: {
      latitude: 36.583333,
      longitude: 27.833333,
    },
    year: -411,
    month: 8,
    type: "naval",
    location: "Off Syme",
    result: "Spartan victory",
    link: "https://en.wikipedia.org/wiki/Battle_of_Syme",
  },
  {
    title: "Battle of Eretria",
    color: COLOR_THEME.peloponnesian,
    coordinate: {
      latitude: 38.3927202,
      longitude: 23.7930669,
    },
    year: -411,
    month: 8,
    type: "naval",
    location: "Off the coast of Euboea",
    result: "Spartan victory",
    link: "https://en.wikipedia.org/wiki/Battle_of_Eretria",
  },
  {
    title: "Battle of Cynossema",
    color: COLOR_THEME.delian,
    coordinate: {
      latitude: 40.148611,
      longitude: 26.379167,
    },
    year: -411,
    type: "naval",
    location: "Off Cynossema, in the Thracian Chersonese",
    result: "Athenian victory",
    link: "https://en.wikipedia.org/wiki/Battle_of_Cynossema",
  },
  {
    title: "Battle of Abydos",
    color: COLOR_THEME.delian,
    coordinate: {
      latitude: 40.195278,
      longitude: 26.405,
    },
    year: -411,
    month: 10,
    type: "naval",
    location: "Near Abydos, in the Hellespont",
    result: "Athenian victory",
    link: "https://en.wikipedia.org/wiki/Battle_of_Abydos",
  },
  {
    title: "Battle of Cyzicus",
    color: COLOR_THEME.delianHighlight,
    coordinate: {
      latitude: 40.38,
      longitude: 27.89,
    },
    year: -410,
    type: "naval",
    location: "Near Cyzicus, Hellespont, modern-day Turkey",
    result:
      "Decisive Athenian victory, Cyzicus and other cities in the region captured by Athens",
    link: "https://en.wikipedia.org/wiki/Battle_of_Cyzicus",
  },
  {
    title: "Battle of Notium",
    color: COLOR_THEME.peloponnesian,
    coordinate: {
      latitude: 37.992778,
      longitude: 26.8475,
    },
    year: -406,
    type: "naval",
    location: "Near Ephesus and Notium",
    result: "Spartan victory",
    link: "https://en.wikipedia.org/wiki/Battle_of_Notium",
  },
  {
    title: "Battle of Mytilene",
    color: COLOR_THEME.peloponnesian,
    coordinate: {
      latitude: 39.1,
      longitude: 26.55,
    },
    year: -406,
    type: "naval",
    location: "Mytilene",
    result: "Spartan victory",

    link: "https://en.wikipedia.org/wiki/Battle_of_Mytilene_(406_BC)",
  },
  {
    title: "Battle of Arginusae",
    color: COLOR_THEME.delian,
    coordinate: {
      latitude: 39.033333,
      longitude: 26.8,
    },
    year: -406,
    type: "naval",
    location: "Arginusae Islands",
    result: "Athenian victory",
    link: "https://en.wikipedia.org/wiki/Battle_of_Arginusae",
  },
  {
    title: "Battle of Aegospotami",
    color: COLOR_THEME.peloponnesianHighlight,
    coordinate: {
      latitude: 40.25,
      longitude: 26.55,
    },
    year: -405,
    type: "naval",
    location:
      "Aegospotami, Hellespont (present-day Çanakkale Province, Turkey)",
    result:
      "Decisive Spartan victory: - Athens besieged and then surrendered in March 404 BC, ending the Peloponnesian War",
    link: "https://en.wikipedia.org/wiki/Battle_of_Aegospotami",
  },
];

export default BATTLES;
