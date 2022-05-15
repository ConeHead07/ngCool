import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeComponent } from './fridge.component';
import { FridgeService} from "../../services/fridge.service";
import { StorageService} from "../../services/storage.service";
import { MatSnackBar} from "@angular/material/snack-bar";
import { MatBottomSheet} from "@angular/material/bottom-sheet";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { MatSnackBarModule} from "@angular/material/snack-bar";
import { FridgeMockService, mockData } from "../../test-data";

describe('FridgeComponent', () => {
  let component: FridgeComponent;
  let fixture: ComponentFixture<FridgeComponent>;
  let httpClientTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, MatSnackBarModule ],
      providers: [
        { provide: FridgeService, useClass: FridgeMockService},
        StorageService,
        MatSnackBar,
        MatBottomSheet
      ],
      declarations: [ FridgeComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FridgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClientTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
