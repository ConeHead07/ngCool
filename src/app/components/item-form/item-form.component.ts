import { Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { FridgeItem } from '../../models/fridge';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {

  @Input() input: FridgeItem = {
    id: 0,
    name: '',
    actual: 0,
    target: 0
  }
  @Input() editableTitle = false;
  @Output() update: EventEmitter<FridgeItem> = new EventEmitter<FridgeItem>();
  @Output() error: EventEmitter<string> = new EventEmitter<string>();
  @Output() cancel: EventEmitter<string> = new EventEmitter<string>();
  actualDiff = 0;

  constructor() { }

  ngOnInit(): void {
  }

  save(): void {
    const updateItem = { ...this.input, ...{ actual: this.actualDiff }};
    this.update.emit(updateItem);
  }

  abort(): void {
    this.cancel.emit('canceled');
  }

}
