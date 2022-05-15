import {FridgeAddItem, fridgeId, FridgeItem, FridgeResponse, FridgeUpdateItem} from "./models/fridge";
import {Observable, of} from "rxjs";

interface IMockData {
  fridgeId: fridgeId,
  inventory: FridgeItem[];
  addItem: FridgeAddItem;
  updateItem: FridgeUpdateItem;
  createFridgeResponse: FridgeResponse;
  readFridgeResponse: FridgeResponse;
  addItemResponse: FridgeItem;
  readItemResponse: FridgeItem;
  updateItemResponse: FridgeItem;
}

const mockFridgeItems: FridgeItem[] = [
  {
    id: 1,
    name: 'Milch',
    actual: 0,
    target: 3
  },
  {
    id: 2,
    name: 'Joghurt',
    actual: 0,
    target: 5
  },
  {
    id: 3,
    name: 'Butter',
    actual: 0,
    target: 2
  },
  {
    id: 4,
    name: 'Quark',
    actual: 0,
    target: 3
  }
];

export const mockData: IMockData = {
  fridgeId: "aeb7821c-7e62-4912-8f50-ce53646aab20",
  inventory: mockFridgeItems,
  addItem: {
    name: 'Apfelsaft',
    actual: 1,
    target: 3
  },
  updateItem: {
    id: 5,
    actual: 1
  },
  createFridgeResponse: {
    "id": "aeb7821c-7e62-4912-8f50-ce53646aab20",
    "inventory": []
  },
  readFridgeResponse: {
    "id": "aeb7821c-7e62-4912-8f50-ce53646aab20",
    "inventory": mockFridgeItems
  },
  addItemResponse: {
    "id": 5,
    "name": 'Apfelsaft',
    "actual": 1,
    "target": 3
  },
  readItemResponse: {
    "id": 5,
    "name": 'Apfelsaft',
    "actual": 1,
    "target": 3
  },
  updateItemResponse: {
    "id": 5,
    "name": 'Apfelsaft',
    "actual": 2,
    "target": 3
  }
};

export class FridgeMockService {
  public createFridgeResponse: FridgeResponse = mockData.createFridgeResponse;
  public readFridgeResponse: FridgeResponse = mockData.readFridgeResponse;
  public addItemResponse: FridgeItem = mockData.addItemResponse;
  public readItemResponse: FridgeItem = mockData.readItemResponse;
  public updateItemResponse: FridgeItem = mockData.updateItemResponse;

  createFridge(): Observable<FridgeResponse> {
    return of(this.createFridgeResponse);
  }

  readFridge(id: fridgeId): Observable<FridgeResponse> {
    return of(this.readFridgeResponse);
  }

  addItem(fridgeId: fridgeId, item: FridgeAddItem): Observable<FridgeItem> {
    return of(this.addItemResponse);
  }

  readItem(fridgeId: fridgeId, itemId: number): Observable<FridgeItem> {
    return of(this.readItemResponse);
  }

  updateItem(fridgeId: fridgeId, item: FridgeItem): Observable<FridgeItem> {
    return of(this.updateItemResponse);
  }
}
