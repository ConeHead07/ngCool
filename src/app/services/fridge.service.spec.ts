import { TestBed} from '@angular/core/testing';

import { FridgeService } from './fridge.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

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
