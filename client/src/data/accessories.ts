export type Accessory = {
  id: string;
  name: string;
  emoji?: string;
};

export const accessories: Accessory[] = [
  { id: "fox-scarf", name: "Fox Scarf" },
  { id: "bunny-ears", name: "Bunny Ears" },
  { id: "panda-hat", name: "Panda Hat" },
  { id: "cat-ears", name: "Cat Ears" },
  { id: "puppy-bow", name: "Puppy Bow" },
  { id: "owl-glasses", name: "Owl Glasses" },
  { id: "unicorn-horn", name: "Unicorn Horn" },
  { id: "bear-hood", name: "Bear Hood" },
];

export const accessoryIds = accessories.map((a) => a.id);

export const getAccessory = (id: string | null | undefined): Accessory | undefined =>
  id ? accessories.find((a) => a.id === id) : undefined;
