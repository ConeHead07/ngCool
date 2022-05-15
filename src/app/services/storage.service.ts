import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public readonly fridgeIdKey = 'fridgeId';

  constructor() { }

  setFridgeId(val: string): this {
    this.set(this.fridgeIdKey, val);
    return this;
  }

  getFridgeId(): string {
    const val = this.get(this.fridgeIdKey);
    return (typeof val === 'string') ? val : '';
  }

  hasFridgeId(): boolean {
    if (!this.has(this.fridgeIdKey)) {
      return false;
    }
    const val = this.get(this.fridgeIdKey);
    return (typeof val === 'string' && (val as string).length > 0);
  }

  removeFridgeId(): this {
    this.remove(this.fridgeIdKey);
    return this;
  }

  set(key: string, val: any): this {
    localStorage.setItem(key, JSON.stringify(val));
    return this;
  }

  get(key: string): any {
    const val = localStorage.getItem(key);
    return val !== null ? JSON.parse(val) : null;
  }

  has(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  remove(key: string): this {
    if (this.has(key)) {
      localStorage.removeItem(key);
    }
    return this;
  }
}
