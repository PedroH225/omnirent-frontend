import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ItemEnumsResponse } from './model/ItemEnumsResponse';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

    getItemEnums() : Observable<ItemEnumsResponse> {
      return this.http.get<ItemEnumsResponse>(this.apiUrl + "/item/enums");
    }
}
