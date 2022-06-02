import { Injectable } from '@angular/core';
import {FridgeAddItem, FridgeItem} from "../../models/fridge";
import {ComponentStore, tapResponse} from "@ngrx/component-store";
import {FridgeService} from "../../services/fridge.service";
import {EMPTY, map, Observable, switchMap, tap, withLatestFrom} from "rxjs";
import {StorageService} from "../../services/storage.service";

interface FridgeState {
  fridgeId: string;
  items: FridgeItem[];
  loading: boolean;

  editing?: number;

  successMsg?: string;
  errorMsg?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FridgeStoreService extends ComponentStore<FridgeState> {
  // Default Selectors
  readonly fridgeId$ = this.select(({ fridgeId }) => fridgeId);
  readonly items$ = this.select(({ items }) => items);
  readonly numItems$ = this.select(({ items } ) => items.length);
  readonly loading$ = this.select(({ loading }) => loading);
  readonly editing$ = this.select(({ editing }) => editing);

  readonly successMsg$ = this.select(({ successMsg }) => successMsg);
  readonly errorMsg$ = this.select(({ errorMsg }) => errorMsg);


  // View Model
  readonly addDisabled$ = this.select(this.loading$, this.editing$, (loading, editing) => {
    return loading || editing !== undefined;
  });
  readonly addEnabled$ = this.select(this.loading$, this.editing$, (loading, editing) => {
    return !loading && editing === undefined;
  });

  readonly rewriteItem$ = this.updater( (state, item: FridgeItem) => {
    state.items = state.items.map( oldItem => oldItem.id !== item.id ? oldItem : item );
    return state;
  });

  readonly editItem$ = this.updater( (state, id: number | undefined) => {
    return { ...state, editing: id };
  });

  readonly removeFridge$ = this.updater( (state) => {
    return { fridgeId: '', items: [], loading: false, editing: undefined, successMsg: "CoolSchrank wurde entfernt und muss neu anelegt werden!" };
  });

  readonly appendItem = this.effect( (item$: Observable<FridgeItem>) => item$.pipe(
    withLatestFrom(this.state$),
    map(([item, state]) => {
      this.patchState({ items: state.items.concat(item) });
    })
  ));

  readonly createFridge = this.effect( (void$ ) => void$.pipe(
    tap( () => console.log("createFridge was called in fridgeStore #1")),
    switchMap(() => {
      console.log("createFridge was called in fridgeStore #2");
      this.patchState({ loading: true, successMsg: undefined, errorMsg: undefined });
      return this.fridgeService.createFridge().pipe(
        tapResponse( (result) => {
            this.setState( {
              fridgeId: result.id,
              items: result.inventory,
              loading: false,
              editing: undefined,
              successMsg: 'CoolSchrank wurde angelegt'
            });
          },
          () => this.patchState({
            loading: false,
            errorMsg: 'CoolSchrank konnte nicht angelegt werden!'
          })
        )
      )
    })
  ));

  readonly loadList = this.effect(( id$: Observable<string>) => id$.pipe(
    switchMap(id => {
      this.patchState({ loading: true, successMsg: undefined, errorMsg: undefined });
      return this.fridgeService.readFridge(id).pipe(
        tapResponse( (result) => {
          this.patchState({
            fridgeId: id,
            items: result.inventory,
            loading: false, editing: undefined,
            successMsg: "Liste wurde geladen"
          });
        },
          () => {
            this.patchState({
              loading: false,
              errorMsg: "Liste konnte nicht geladen werden!"
            });
          })
      );
  })));

  readonly addItem = this.effect( (add$: Observable<FridgeAddItem>) => add$.pipe(
    tap( (add) => console.log("addItem was called in fridgeStore #1", { add })),
    withLatestFrom(this.state$),
    map(([add, state]) => {
      console.log("addItem was called in fridgeStore #2", { add, state });
      this.patchState({ loading: true, successMsg: undefined, errorMsg: undefined });

      return this.fridgeService.addItem(state.fridgeId, add).pipe(
        tap( (add) => console.log("addItem was called in fridgeStore #3", { add })),
        tapResponse(
          (item: FridgeItem) => {
            const items = state.items.concat(item);
            this.patchState({
              items,
              editing: undefined,
              loading: false,
              successMsg: "Eintrag wurde hinzugefügt" })
          },
          () => this.patchState({
            loading: false,
            errorMsg: "Eintrag konnte nicht hinzugefügt werden. Überprüfen Sie Ihre Angaben und die Eindeutigkeit des Namens!"
          })
        )
      );
    })
  ));

  readonly updateItem = this.effect(
    (item$: Observable<FridgeItem>) =>
      item$.pipe(
        withLatestFrom(this.state$),
        map( ([item, state ]) => {
          this.patchState({ editing: undefined, loading: true, successMsg: undefined, errorMsg: undefined});

          return this.fridgeService.updateItem(state.fridgeId, item).pipe(
            tapResponse(
              updated => {
                const items = state.items.map(item => (item.id === updated.id ? updated : item));
                this.patchState({
                  items,
                  loading: false,
                  successMsg: "Eintrag wurde aktualisiert"
                });
              },
              () => this.patchState({
                loading: false,
                errorMsg: "Fehler beim Speichern, überprüfen Sie Ihre Angaben!"
              })
            )
          )
        })
      )
  );

  constructor(private fridgeService: FridgeService, private storageService: StorageService) {
    /**
     * Initialisieren des AusgangsState
     */
    super({ fridgeId: '', items: [], loading: false });

    const fridgeId = storageService.getFridgeId();
    if (fridgeId) {
      this.loadList(fridgeId);
    }
  }
}
