export type BeadShape = "round" | "heart" | "star";

export type BeadColor = {
  id: string;
  name: string;
  hex: string;
};

export const beadColors: BeadColor[] = [
  { id: "coral", name: "Coral", hex: "#FF8E5E" },
  { id: "plum", name: "Plum", hex: "#9A7AA0" },
  { id: "sage", name: "Sage", hex: "#7BA695" },
  { id: "sun", name: "Sun", hex: "#F6C35A" },
  { id: "sky", name: "Sky", hex: "#7DB8D9" },
  { id: "pink", name: "Pink", hex: "#F5A7C0" },
  { id: "mint", name: "Mint", hex: "#A8D8C5" },
  { id: "lavender", name: "Lavender", hex: "#B9A3D4" },
];

export const beadShapes: BeadShape[] = ["round", "heart", "star"];

export const MAX_STRING_LENGTH = 18;

const encodeBead = (colorId: string, shape: BeadShape): string =>
  `${colorId}:${shape}`;

export const makeBead = encodeBead;

export const parseBead = (id: string): { colorId: string; shape: BeadShape } => {
  const [colorId, shape] = id.split(":");
  return { colorId, shape: (shape as BeadShape) ?? "round" };
};

export const getBeadColor = (colorId: string): BeadColor =>
  beadColors.find((c) => c.id === colorId) ?? beadColors[0];

export const randomPattern = (length: number, colors = beadColors): string[] => {
  const pool = colors.length >= 4 ? colors.slice(0, Math.min(6, colors.length)) : colors;
  const pattern: string[] = [];
  for (let i = 0; i < length; i++) {
    const color = pool[Math.floor(Math.random() * pool.length)];
    pattern.push(encodeBead(color.id, "round"));
  }
  return pattern;
};
