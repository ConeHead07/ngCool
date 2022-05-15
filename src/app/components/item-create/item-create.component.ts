import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FridgeItem, FridgeAddItem } from '../../models/fridge';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.scss']
})
export class ItemCreateComponent implements OnInit {

  @Input() input: FridgeItem = {
    id: 0,
    name: '',
    actual: 0,
    target: 1
  }
  @Output() update: EventEmitter<FridgeAddItem> = new EventEmitter<FridgeAddItem>();
  @Output() cancel: EventEmitter<string> = new EventEmitter<string>();
  @Output() error: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onUpdate(item: FridgeItem) {
    const addItem = item as any;

    if ("id" in addItem) {
      delete addItem.id;
    }

    this.update.emit(addItem as FridgeAddItem);
  }

  onError(err: string) {
    this.error.emit(err);
  }

}
