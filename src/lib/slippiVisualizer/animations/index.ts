import { externalCharacterIDs } from "../characters";

const getAnimation = async (charId: number): Promise<any> => {
  switch (externalCharacterIDs[charId]) {
    case "FALCON": {
      return await import("./falcon");
    }
    case "FOX": {
      return await import("./fox");
    }
    case "MARTH": {
      return await import("./marth");
    }
    case "PUFF": {
      return await import("./puff");
    }
    case "FALCO": {
      return await import("./falco");
    }
    default: {
      return null;
    }
  }
};

export default getAnimation;
