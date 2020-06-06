export const INITIAL_REGION = {
  latitude: 38.672085700614446,
  longitude: 21.590127479285,
  latitudeDelta: 5.863403880667256,
};

const COLOR_THEME = {
  delian: "teal",
  delianHighlight: "navy",
  peloponnesian: "tomato",
  peloponnesianHighlight: "red",
  neutral: "gold",
};

export const CITIES = [
  {
    title: "Sparta",
    description: "Peloponnesian League HQ",
    color: COLOR_THEME.peloponnesianHighlight,
    coordinate: {
      latitude: 37.081944,
      longitude: 22.423611,
    },
  },
  {
    title: "Corinth",
    description: "Peloponnesian League",
    color: COLOR_THEME.peloponnesian,
    coordinate: {
      latitude: 37.905346,
      longitude: 22.880192,
    },
  },
  {
    title: "Elis",
    description: "Peloponnesian League",
    color: COLOR_THEME.peloponnesian,
    coordinate: {
      latitude: 37.89131,
      longitude: 21.37493,
    },
  },
  {
    title: "Megara",
    description: "Peloponnesian League",
    color: COLOR_THEME.peloponnesian,
    coordinate: {
      latitude: 37.996389,
      longitude: 23.344444,
    },
  },
  {
    title: "Thebes",
    description: "Dominant power in Boeotia",
    color: COLOR_THEME.peloponnesian,
    coordinate: {
      latitude: 38.316667,
      longitude: 23.316667,
    },
  },
  {
    title: "Athens",
    description: "Delian League HQ",
    color: COLOR_THEME.delianHighlight,
    coordinate: {
      latitude: 37.97,
      longitude: 23.72,
    },
  },
  {
    title: "Piraeus",
    description: "Port city of Athens",
    color: COLOR_THEME.delian,
    coordinate: {
      latitude: 37.943,
      longitude: 23.646944,
    },
  },
  {
    title: "Delos",
    description: "Delian League Treasury",
    color: COLOR_THEME.delian,
    coordinate: {
      latitude: 37.393333,
      longitude: 25.271111,
    },
  },
  {
    title: "Naxos",
    description: "Delian League",
    color: COLOR_THEME.delian,
    coordinate: {
      latitude: 37.0875,
      longitude: 25.403889,
    },
  },
  {
    title: "Chios",
    description: "Delian League",
    color: COLOR_THEME.delian,
    coordinate: {
      latitude: 38.4,
      longitude: 26.016667,
    },
  },
  {
    title: "Lesbos",
    description: "Delian League",
    color: COLOR_THEME.delian,
    coordinate: {
      latitude: 39.21,
      longitude: 26.28,
    },
  },
  {
    title: "Samos",
    description: "Delian League",
    color: COLOR_THEME.delian,
    coordinate: {
      latitude: 37.75,
      longitude: 26.833333,
    },
  },
  {
    title: "Corcyra",
    description: "Delian League",
    color: COLOR_THEME.delian,
    coordinate: {
      latitude: 39.583333,
      longitude: 19.866667,
    },
  },
  {
    title: "Argos",
    description: "Neutral",
    color: COLOR_THEME.neutral,
    coordinate: {
      latitude: 37.616667,
      longitude: 22.716667,
    },
  },
  {
    title: "Melos",
    description: "Neutral",
    color: COLOR_THEME.neutral,
    coordinate: {
      latitude: 36.683333,
      longitude: 24.416667,
    },
  },
];

export const BATTLES = [
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

export const ATTRACTIONS = [
  {
    title: "Acropolis Museum",
    description:
      "Ultramodern glass & steel museum housing ancient artifacts from the Acropolis archaeological site.",
    coordinate: {
      latitude: 37.9684499,
      longitude: 23.7285227,
    },
    type: "museum",
    address: "Dionysiou Areopagitou 15, Athina 117 42, Greece",
    link: "http://www.theacropolismuseum.gr/",
  },
  {
    title: "Acropolis of Athens",
    description:
      "Ruins of iconic 5th-century B.C. temple complex on Athens' rocky hilltop undergoing restoration.",
    coordinate: {
      latitude: 37.9715323,
      longitude: 23.7257492,
    },
    type: "ruins",
    address: "Athens 105 58, Greece",
    link: "http://odysseus.culture.gr/h/3/eh351.jsp?obj_id=2384",
  },
  {
    title: "Ancient Agora of Athens",
    description:
      "Famous landmark featuring the ruins of an ancient Greek gathering place & a museum with artifacts.",
    coordinate: {
      latitude: 37.9746208,
      longitude: 23.7219486,
    },
    type: "ruins",
    address: "Adrianou 24, Athina 105 55, Greece",
    link: "https://ancient-greece.org/archaeology/agora.html",
  },
  {
    title: "National Archaeological Museum",
    description:
      "Neoclassical museum of Ancient Greek art & archaeology, with sculpture, metalwork, vases & jewelry.",
    coordinate: {
      latitude: 37.98902289999999,
      longitude: 23.7327599,
    },
    type: "museum",
    address: "28is Oktovriou 44, Athina 106 82, Greece",
    link: "http://www.namuseum.gr/",
  },
  {
    title: "Temple of Poseidon",
    description:
      "5th-century BCE temple ruins with Doric-style columns, offering sweeping views of the sea.",
    coordinate: {
      latitude: 37.6501925,
      longitude: 24.024587,
    },
    type: "ruins",
    address: "Cape Sounio, Sounio 195 00, Greece",
    link:
      "http://www.visitgreece.gr/en/culture/archaeological_sites/the_archaeological_site_of_sounio",
  },
  {
    title: "Archaeological Museum of Sparta",
    description:
      "Museum displaying antiquities from Sparta's ancient acropolis & other local archaeological finds.",
    coordinate: {
      latitude: 37.0742171,
      longitude: 22.4314354,
    },
    type: "museum",
    address: "Sparti 231 00, Greece",
    link:
      "https://www.exploresparta.gr/tourism/en/archaeological-museum-of-sparta/",
  },
  {
    title: "The Acropolis of Sparta",
    description:
      "Remains of the temple of Athena Chalkioikos on the top of the Acropolis and a large Byzantine Basilica dated to the 10th century A.D. On the south side of the acropolis lies an ancient theater dated to the early imperial period. It preserves the orchestra and part of the cavea. Excavations carried out by the British Archaeological School of Athens gave evidence of decorated shops that served people attending theatrical performances.",
    coordinate: {
      latitude: 37.08229860000001,
      longitude: 22.4244179,
    },
    type: "ruins",
    address: "Sparti 231 00, Greece",
    link: "https://www.exploresparta.gr/tourism/en/the-acropolis-of-sparta/",
  },
  {
    title: "Sanctuary of Artemis Orthia",
    description:
      "Stone remains from a 9th-century BC temple, where young men were flogged for a blood sacrifice.",
    coordinate: {
      latitude: 37.0828745,
      longitude: 22.435114,
    },
    type: "ruins",
    address: "Kleomenous 4, Sparti 231 00, Greece",
    link:
      "https://www.exploresparta.gr/tourism/en/the-sanctuary-of-artemis-orthia/",
  },
  {
    title: "Statue of Leonidas",
    description:
      "Close to ancient Sparta, worth stopping for quick photo with the warrior king and leader of the 300.",
    coordinate: {
      latitude: 37.0791071,
      longitude: 22.4284239,
    },
    type: "monument",
    address: "Triakosion 77, Sparti 231 00, Greece",
    link:
      "https://www.exploresparta.gr/tourism/en/the-sanctuary-of-artemis-orthia/",
  },
  {
    title: "Portara",
    description:
      "Doorlike ruins of an ancient temple standing on a scenic point looking over the city & sea.",
    coordinate: {
      latitude: 37.1101474,
      longitude: 25.3723875,
    },
    type: "ruins",
    address: "Naxos 843 00, Greece",
    link: "https://www.naxos.gr/the-temple-of-apollo-portara/?lang=en",
  },
  {
    title: "Archaeological Museum of Thasos",
    description:
      "Archaeological museum displaying ancient sculptures, pottery & artifacts related to island history.",
    coordinate: {
      latitude: 40.7801253,
      longitude: 24.7119936,
    },
    type: "museum",
    address: "Meg. Alexandrou 2, Limenas Thassos 640 04, Greece",
    link: "http://odysseus.culture.gr/h/1/gh151.jsp?obj_id=3331",
  },
  {
    title: "Archaeological Site of Delos",
    description:
      "Doorlike ruins of an ancient temple standing on a scenic point looking over the city & sea.",
    coordinate: {
      latitude: 37.398929,
      longitude: 25.2651134,
    },
    type: "ruins",
    address: "Delos 846 00, Greece",
    link: "http://www.visitgreece.gr/en/greek_islands/cyclades/delos",
  },
  {
    title: "Akrokorinthos",
    description:
      "Site with architectural evidence of numerous invasions plus views of the Corinthian & Saronic Gulfs.",
    coordinate: {
      latitude: 37.890983,
      longitude: 22.87003,
    },
    type: "ruins",
    address: "Corinth 200 07, Greece",
    link:
      "http://www.visitgreece.gr/en/culture/archaeological_sites/akrokorinthos",
  },
  {
    title: "Archaeological Museum of Thebes",
    description:
      "The exhibits originate from excavations all around Boeotia and cover a long chronological period spanning from the Palaeolithic to the Post Byzantine periods.",
    coordinate: {
      latitude: 38.3237834,
      longitude: 23.3172017,
    },
    type: "museum",
    address: "Θρεψιάδου 1, Thiva 322 00, Greece",
    link: "https://www.mthv.gr/en/",
  },
  {
    title: "Archaeological Site of Olympia",
    description:
      "Ancient sanctuary & birthplace of the Olympic Games, with sculptures including Nike of Paionios.",
    coordinate: {
      latitude: 37.6384588,
      longitude: 21.6298796,
    },
    type: "ruins",
    address: "Archaia Olympia 270 65, Greece",
    link: "http://odysseus.culture.gr/h/3/gh30.jsp",
  },
  {
    title: "Archaeological Museum of Olympia",
    description:
      "Art & artifacts from the ruins of Olympia, models of the ancient city & excavation history exhibits.",
    coordinate: {
      latitude: 37.643573,
      longitude: 21.629643,
    },
    type: "museum",
    address: "Archaia Olympia 270 65, Greece",
    link: "http://odysseus.culture.gr/h/1/gh151.jsp?obj_id=7126",
  },
  {
    title: "Temple of Apollo Epikourios",
    description:
      "Secluded archeological site known for a unique, well-preserved temple built between 450 & 400 BCE.",
    coordinate: {
      latitude: 37.4291164,
      longitude: 21.899504,
    },
    type: "ruins",
    address: "Oichalia 270 61, Greece",
    link:
      "http://www.visitgreece.gr/en/culture/world_heritage_sites/temple_of_apollo_epicurius",
  },
  {
    title: "Delphi",
    description:
      "Ancient Greek archaeological site with a stadium, votive sites & temples, including one to Apollo.",
    coordinate: {
      latitude: 38.4823868,
      longitude: 22.5009699,
    },
    type: "ruins",
    address: "Delphi 330 54, Greece",
    link: "http://odysseus.culture.gr/h/3/eh351.jsp?obj_id=2507",
  },
  {
    title: "Delphi Archaeological Museum",
    description:
      "Mainly architectural sculptures, statues & minor objects donated to the famous ancient Greek oracle.",
    coordinate: {
      latitude: 38.4803028,
      longitude: 22.4997992,
    },
    type: "museum",
    address: "Delphi 330 54, Greece",
    link: "http://odysseus.culture.gr/h/1/eh151.jsp?obj_id=3404",
  },
];
