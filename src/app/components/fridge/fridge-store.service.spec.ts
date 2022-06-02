import { TestBed } from '@angular/core/testing';

import { FridgeStoreService } from './fridge-store.service';

describe('FridgeStoreService', () => {
  let service: FridgeStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FridgeStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
