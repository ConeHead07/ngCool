import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import { FridgeService } from './fridge.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Fridge, FridgeAddItem, fridgeId, FridgeResponse, FridgeItem} from "../models/fridge";
import {HttpClient, HttpClientModule} from "@angular/common/http";

describe('FridgeService', () => {
  let service: FridgeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FridgeService]
    });
    service = TestBed.inject(FridgeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('fridgeService should be created', async () => {
    expect(service).toBeTruthy();
  });

});


fdescribe('Real API-Tests FridgeService', () => {
  let service: FridgeService;
  let fridgeId: fridgeId;
  let newFridge: Fridge;
  let itemId: number;

  const addItem: FridgeAddItem = {
    name: 'Apfelsaft',
    actual: 2,
    target: 3
  };

  let updateItem: FridgeItem = { ...addItem, ...{ id: 0, actual: 1 } };
  let updateResultItem: FridgeItem = { ...updateItem, ...{ actual: 3 } };

  beforeEach( async () => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ FridgeService ]
    });
    service = TestBed.inject(FridgeService);
  });

  beforeEach(() => {
    // TestBed.configureTestingModule({});
    // service = TestBed.inject(FridgeService);
  });

  it('fridgeService should be created', async () => {
    expect(service).toBeTruthy();
  });

  it('New Fridge should be created',async () => {

    await new Promise((resolve, reject) => {
      service.createFridge().subscribe( r => {
        newFridge = r;
        fridgeId = r.id;
        resolve(true);
      });
    });

    expect(fridgeId).toBeTruthy();
    expect('id' in newFridge).toBeTrue();
    expect( typeof newFridge.id).toEqual('string');
  });

  it('Fridge should be readable by ID', async () => {
    const f: FridgeResponse = await new Promise((resolve, reject) => {
      service.readFridge(fridgeId).subscribe(f => {
        resolve(f);
      });
    });

    expect(f).toBeTruthy();
    expect("id" in f).toBeTrue();
    expect( f.id).toBe(fridgeId);
  });

  it('New Item should be added and responsed with new id', async () => {
    const ax: FridgeItem = await new Promise( (resolve, reject) => {
      service.addItem(fridgeId, addItem).subscribe( it => {
        resolve(it);
      });
    });

    expect(ax).toBeTruthy();
    expect("id" in ax).toBeTrue();
    expect(typeof ax.id).toEqual('number');
    expect(addItem.name).toBe(ax.name);
    expect(addItem.actual).toBe(ax.actual);
    expect(addItem.target).toBe(ax.target);
    itemId = ax.id;
  });

  it( 'Fridge-Item should be editable', async () => {
    updateItem.id = itemId;
    updateResultItem.id = itemId;

    const ux: FridgeItem = await new Promise( (resolve, reject) => {
      service.updateItem(fridgeId, updateItem).subscribe( it => {
        resolve(it);
      });
    });

    expect(ux.name).toBe(updateResultItem.name);
    expect(ux.actual).toBe(updateResultItem.actual);
    expect(ux.target).toBe(updateResultItem.target);
  });

  it( 'Fridge-Item should be readable', async () => {
    const rx: FridgeItem = await new Promise( (resolve, reject) => {
      service.readItem(fridgeId, itemId).subscribe( it => {
        resolve(it);
      });
    });

    expect(updateItem.name).toBe(rx.name);
    expect(updateResultItem.actual).toBe(rx.actual);
    expect(updateItem.target).toBe(rx.target);
  });

  it('Fridge should list inventory', async () => {
    const f: FridgeResponse = await new Promise( (resolve, reject) => {
      service.readFridge(fridgeId).subscribe(rsp => {
        resolve(rsp);
      });
    });

    expect(f).toBeTruthy();
    expect("inventory" in f).toBeTrue();
    expect(Array.isArray(f.inventory)).toBeTrue();
    expect(f.inventory.length).toBeGreaterThan(0);
    expect(f.inventory[0].name = addItem.name);
  });

});

