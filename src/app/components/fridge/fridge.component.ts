import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {FridgeService} from "../../services/fridge.service";
import {FridgeAddItem, fridgeId, FridgeItem} from "../../models/fridge";
import {StorageService} from "../../services/storage.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {ItemCreateComponent} from "../item-create/item-create.component";
import {MatAccordion} from "@angular/material/expansion";
import {FridgeStoreService} from "./fridge-store.service";
import {ActivatedRoute} from "@angular/router";
import {filter, first, tap} from "rxjs";

@Component({
  selector: 'app-fridge',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.scss'],
//  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ FridgeStoreService]
})
export class FridgeComponent implements OnInit {

  fridgeId: fridgeId = "";
  inventory: FridgeItem[] = [];
  newItem: FridgeAddItem = {
    name: "",
    actual: 0,
    target: 1
  };
  isDebugMode = false;

  readonly fridgeId$ = this.fridgeStore.fridgeId$;
  readonly items$ = this.fridgeStore.items$;
  readonly loading$ = this.fridgeStore.loading$;
  readonly editing$ = this.fridgeStore.editing$;

  readonly addDisabled$ = this.fridgeStore.addDisabled$;
  readonly addEnabled$ = this.fridgeStore.addEnabled$;

  readonly successMsg$ = this.fridgeStore.successMsg$;
  readonly errorMsg$ = this.fridgeStore.errorMsg$;

  @ViewChild(MatAccordion) accordion!: MatAccordion;

  constructor(private route: ActivatedRoute,
              private fridgeStore: FridgeStoreService,
              private fridgeService: FridgeService,
              private storageService: StorageService,
              private snackbar: MatSnackBar,
              private bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
    this.fridgeId = this.storageService.getFridgeId();
    if (this.fridgeId) {
      // this.listItems();
      const loadList = this.fridgeStore.loadList(this.fridgeId);
      console.log({loadList});
    }

    this.successMsg$
      .subscribe( (m) => {
          (typeof m === "string" && m.length > 0) && this.showMessage( m );
      });

    this.errorMsg$
      .subscribe( (m) => {
        (typeof m === "string" && m.length > 0) && this.showError( m );
      });

  }

  async createFridge() {
    this.fridgeId$.pipe(first()).subscribe( (id) => {
      if (id.length) {
        this.showMessage('CoolSchrank wurde angelegt...');
        this.fridgeId = id;
        this.inventory.length = 0;
        this.storageService.setFridgeId(id);
      }
    });
  }

  async panelExpand(id: number) {
    console.log('panelExpand', id);
    this.fridgeStore.patchState({ editing: id });
  }
  async panelCollapse(id: number) {
    console.log('panelCollapse', id);
    this.fridgeStore.patchState({ editing: undefined });
  }

  async saveListItem(itemId: number, actual: string, target: number) {
    console.log('saveListItem', { itemId, actual: parseInt(actual, 10), target });
    const fridgeItem =  {id: itemId, actual: parseInt(actual, 10), target} as FridgeItem;
    await this.updateItem(fridgeItem);
  }

  async removeFridge() {
    if (!confirm('Möchten Sie wirklich den CoolSchrank und alle Inhalte entfernen?')) {
      return;
    }
    this.fridgeStore.removeFridge$();
    this.fridgeId = '';
    this.storageService.removeFridgeId();
    // await this.showMessage('CoolSchrank wurde entfernt und muss neu anelegt werden!');
  }

  async submitNewItem() {
    await this.addItem(this.newItem);
  }

  async addItem(newItem: FridgeAddItem) {
    // this.fridgeStore.addItem(newItem);
    // return;

    this.fridgeService
      .addItem(this.fridgeId, newItem)
      .pipe()
      .subscribe( (it) => {
        this.fridgeStore.appendItem(it);
        this.inventory.push(it);
      },
        err => {
          this.showError(
             "Inhalt konnte nicht angelegt werden." +
            "Bitte prüfen Sie die Angaben und die Eindeutigkeit des Namens!"
          );
        });
  }

  async readItem(itemId: number) {
    const foundIt = this.inventory.find( (fItem) => fItem.id === itemId);
    this.fridgeService.readItem(this.fridgeId, itemId).subscribe( (it) => {
      this.fridgeStore.rewriteItem$(it);
    });
  }

  async updateItem(item: FridgeItem) {
    this.fridgeStore.updateItem(item);
    return;
    const foundIt = this.inventory.find( (fItem) => fItem.id === item.id);

    this.fridgeService.updateItem(this.fridgeId, item).subscribe(
      it => {
          if (foundIt) {
            Object.assign(foundIt, it);
          } else {
            this.inventory.push(it);
          }
          setTimeout(() => {
            this.accordion.closeAll();
          }, 500);
          this.showMessage('Eintrag wurde aktualisiertt');
        },
      err => {
        this.showError("Eintrag konntent nicht gespeichert werden. Überprüfen Sie Ihre Angaben");
      }

      );
  }

  showCreateItem() {
    const sheet = this.bottomSheet.open(ItemCreateComponent);
    sheet.instance.input.id = 0;

    const subError = sheet.instance.error.subscribe( err => {
      this.showError(err);
    });

    const subCreate = sheet.instance.update.subscribe( item => {
      this.addItem(item);
      subCreate.unsubscribe();
      subCancel.unsubscribe();
      subError.unsubscribe();
      sheet.dismiss(true);
    });

    const subCancel = sheet.instance.cancel.subscribe( (msg) => {
      console.log('Closing sheet. Reason: ' + msg);
      subCreate.unsubscribe();
      subCancel.unsubscribe();
      subError.unsubscribe();
      sheet.dismiss(true);
    });

  }

  async showMessage(msg: string) {
    this.snackbar.open(msg, '', {
      duration: 2000
    });
  }

  async showError(err: string) {
    this.snackbar.open(err, '', {
      duration: 4000,
      panelClass: ['mat-warn' ]});
  }

  async listItems() {
    this.inventory.length = 0;

    if (!this.fridgeId) {
      return;
    }

    this.fridgeService.readFridge(this.fridgeId).subscribe( fr => {
      fr.inventory.forEach(it => {
        this.inventory.push(it);
      });
    });
  }

}
