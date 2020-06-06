const getIconPngSource = (type: string) => {
  switch (type) {
    case "museum":
      return require("../assets/museum.png");
    case "monument":
      return require("../assets/monument.png");
    default:
      return require("../assets/ruins.png");
  }
};

export default getIconPngSource;
