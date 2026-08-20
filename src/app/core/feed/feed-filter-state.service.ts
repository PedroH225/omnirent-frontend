import { inject, Injectable, signal } from '@angular/core';
import { FeedFilterStateModel } from './model/feed-filter-state';
import { Params, Router } from '@angular/router';

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

  private readonly router = inject(Router);

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

  setFilters(filters: FeedFilterStateModel): void {
    this._filters.set(filters);
  }

  updateFeedUrl(): void {
    const queryParams: Params = {
      name: this.filters().title || null,
      category: this.filters().category || null,
      subCategory: this.filters().subCategory || null,
      itemCondition: this.filters().condition || null,
      sort: this.filters().sort || null,
      page: 0,
      size: 20
    };

    this.router.navigate(['/feed'], {
      queryParams
    });
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