import { externalCharacterIDs } from "../characters";

const importAnimation = async (charId: number): Promise<any> => {
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

const getAnimation = async (charId: number): Promise<any> => {
  const charAnimation = (await importAnimation(charId)).default;
  if (!charAnimation) {
    throw new Error(`Unsupported character id: ${charId}`);
  }
  const converted: any = {};
  Object.entries(charAnimation).forEach(([key, value]) => {
    converted[key] = (value as any).map((inner) => {
      console.log("inner");
      console.log(inner);
      return [new Int16Array(inner[0])];
    });
  });
  return converted;
};

export default getAnimation;
