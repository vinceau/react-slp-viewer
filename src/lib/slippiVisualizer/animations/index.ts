import { externalCharacterIDs } from "../characters";

// Store all the imported animations here
const animationMap = new Map<number, any>();

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
      throw new Error(`Unsupported character id: ${charId}`);
    }
  }
};

export const fetchAnimation = async (charId: number): Promise<any> => {
  // Check if we've imported it before
  if (animationMap.has(charId)) {
    return animationMap.get(charId);
  }

  const charAnimation = (await importAnimation(charId)).default;
  const converted: any = {};
  Object.entries(charAnimation).forEach(([key, value]) => {
    converted[key] = (value as any).map((inner) => {
      return [new Int16Array(inner[0])];
    });
  });

  // Store it for later
  animationMap.set(charId, converted);
  return converted;
};
