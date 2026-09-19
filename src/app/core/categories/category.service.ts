import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, of, shareReplay, tap } from 'rxjs';
import { CategoryResponse } from './model/category.model';
import { CacheDuration, CacheService } from '@core/cache/cache.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private cacheService: CacheService,
  ) {}

  private readonly CATEGORIES_WITH_SUB_CACHE_KEY = 'categories-with-sub';

  getCategoriesWithSub(): Observable<CategoryResponse[]> {
    const cached = this.cacheService.get<CategoryResponse[]>(
      this.CATEGORIES_WITH_SUB_CACHE_KEY,
    );

    if (cached) {
      return of(cached);
    }

    return this.http
      .get<CategoryResponse[]>(`${this.apiUrl}/category/findAll`)
      .pipe(
        tap((response) => {
          this.cacheService.set(
            this.CATEGORIES_WITH_SUB_CACHE_KEY,
            response,
            CacheDuration.LONG,
          );
        }),
        shareReplay(1),
      );
  }
}
