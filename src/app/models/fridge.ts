
export type fridgeId = string;

export interface FridgeItem {
  id: number;
  name: string;
  actual: number;
  target: number;
}

export type FridgeAddItem = Omit<FridgeItem, "id">

export interface Fridge {
  id: fridgeId;
}

export interface FridgeResponse extends Fridge {
  id: fridgeId;
  inventory: FridgeItem[]
}

export type FridgeUpdateItem = Partial<FridgeItem>;

