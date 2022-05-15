import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {fridgeId, FridgeAddItem, FridgeItem, FridgeResponse } from '../models/fridge';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FridgeService {
  private baseUrl = '';
  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  createFridge(): Observable<FridgeResponse> {
    let xr = this.httpClient.post<FridgeResponse>(`${this.baseUrl}/fridge`, {});
    xr.subscribe( (a) => {
      a.id;
      a.inventory
    })
    return this.httpClient.post<FridgeResponse>(`${this.baseUrl}/fridge`, {});
  }

  readFridge(id: fridgeId): Observable<FridgeResponse> {
    return this.httpClient.get<FridgeResponse>(`${this.baseUrl}/fridge/${id}`);
  }

  addItem(fridgeId: fridgeId, item: FridgeAddItem): Observable<FridgeItem> {
    return this.httpClient.post<FridgeItem>(`${this.baseUrl}/fridge/${fridgeId}/item`, item);
  }

  readItem(fridgeId: fridgeId, itemId: number): Observable<FridgeItem> {
    return this.httpClient.get<FridgeItem>(`${this.baseUrl}/fridge/${fridgeId}/item/${itemId}`)
  }

  updateItem(fridgeId: fridgeId, item: FridgeItem): Observable<FridgeItem> {
    return this.httpClient.post<FridgeItem>(`${this.baseUrl}/fridge/${fridgeId}/item/${item.id}`, item);
  }

}
