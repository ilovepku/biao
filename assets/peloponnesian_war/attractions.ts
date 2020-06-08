const ATTRACTIONS = [
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

export default ATTRACTIONS;
