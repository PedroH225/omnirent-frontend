import { Injectable, signal } from '@angular/core';
import { FeedFilterStateModel } from './model/feed-filter-state';

@Injectable({
  providedIn: 'root'
})
export class FeedFilterStateService {

  private readonly _filters = signal<FeedFilterStateModel>({
    title: '',
    category: null,
    subCategory: null,
    condition: null,
    sort: null
  });

  readonly filters = this._filters.asReadonly();

  setTitle(title: string): void {
    this._filters.update(state => ({
      ...state,
      title
    }));

  }

  setCategory(category: string | null): void {
    this._filters.update(state => ({
      ...state,
      category
    }));

  }

  setSubCategory(subCategory: string | null): void {
    this._filters.update(state => ({
      ...state,
      subCategory
    }));

  }

  setCondition(condition: string | null): void {
    this._filters.update(state => ({
      ...state,
      condition
    }));

  }

  setSort(sort: string | null): void {
    this._filters.update(state => ({
      ...state,
      sort
    }));

  }

  reset(): void {
    this._filters.set({
      title: '',
      category: null,
      subCategory: null,
      condition: null,
      sort: null
    });

  }
}