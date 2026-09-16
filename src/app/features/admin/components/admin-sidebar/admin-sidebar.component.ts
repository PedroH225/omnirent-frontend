import { Component, effect } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { TranslatePipe } from '@core/i18n/translation-pipe';
import { TranslationService } from '@core/i18n/translation.service';
import { LocaleService } from '@core/i18n/locale.service';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [PanelMenuModule, ButtonModule, DrawerModule, TranslatePipe],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.scss',
})
export class AdminSidebarComponent {
  drawerVisible = false;

  items: MenuItem[] = [];

  constructor(
    private readonly localeService: LocaleService,
    private readonly translationService: TranslationService,
  ) {
    effect(() => {
      this.localeService.locale();

      this.updateItems();
    });
  }

  private updateItems(): void {
    this.items = [
      {
        label: this.translationService.translate('account.sidebar.dashboard'),
        icon: 'pi pi-shield',
        routerLink: '/admin',
      },
      {
        label: this.translationService.translate('admin.sidebar.users.title'),
        icon: 'pi pi-users',
        items: [
          {
            label: this.translationService.translate(
              'admin.sidebar.users.manage',
            ),
            icon: 'pi pi-user-edit',
            routerLink: '/admin/users',
          },
        ],
      },
      {
        label: this.translationService.translate('admin.sidebar.items.title'),
        icon: 'pi pi-box',
        items: [
          {
            label: this.translationService.translate(
              'admin.sidebar.items.review',
            ),
            icon: 'pi pi-search',
            routerLink: '/admin/items/review',
          },
          {
            label: this.translationService.translate(
              'admin.sidebar.items.blocked',
            ),
            icon: 'pi pi-lock',
            routerLink: '/admin/items/blocked',
          },
        ],
      },
    ];
  }
}
