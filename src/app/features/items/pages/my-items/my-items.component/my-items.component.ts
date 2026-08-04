import { Component } from '@angular/core';
import { ItemService } from '@core/item/item.service';
import { ItemDisplay } from '@core/item/model/item-display-model';
import { ActivatedRoute } from '@angular/router';
import { PageResponse } from '../../../../../../shared/models/page.response.model';
import { environment } from '../../../../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { Button } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-items.component',
  imports: [CommonModule, Button, SelectButtonModule, DataViewModule, FormsModule],
  templateUrl: './my-items.component.html',
  styleUrl: './my-items.component.scss'
})
export class MyItemsComponent {


  layout: 'grid' | 'list' = 'grid';

  options = [
    { label: 'Grid', value: 'grid' },
    { label: 'List', value: 'list' }
  ];

  storageUrl = environment.storageUrl;

  items: ItemDisplay[] = [];

  constructor(private itemService: ItemService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const page = Number(params['page'] ?? 0);
      const size = Number(params['size'] ?? 20);


      this.getUserItems(page, size);
    });
  }

  getUserItems(page: number, size: number): void {
    this.itemService.getUserItems(page, size).subscribe({
      next: (response: PageResponse<ItemDisplay>) => {

        this.items = response.content.map(item => ({
          ...item,
          thumbnailKey: item.thumbnailKey
            ? `${this.storageUrl}/${item.thumbnailKey}`
            : null
        }));

        console.log(response);
                console.log(this.items);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
