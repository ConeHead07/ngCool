import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from "@angular/forms";

import { ItemFormComponent } from './item-form.component';

describe('ItemFormComponent', () => {
  let component: ItemFormComponent;
  let fixture: ComponentFixture<ItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemFormComponent ],
      imports: [
        FormsModule
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(ItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
