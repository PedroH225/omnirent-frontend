import { Component, effect } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { Button } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { TranslatePipe } from '@core/i18n/translation-pipe';
import { LocaleService } from '@core/i18n/locale.service';
import { TranslationService } from '@core/i18n/translation.service';

@Component({
  selector: 'app-user-sidebar',
  imports: [PanelMenuModule, Button, DrawerModule, TranslatePipe],
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.scss',
})
export class UserSidebarComponent {
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
        icon: 'pi pi-home',
        routerLink: '/account',
      },

      {
        label: this.translationService.translate(
          'account.sidebar.listings.title',
        ),
        icon: 'pi pi-box',
        items: [
          {
            label: this.translationService.translate(
              'account.sidebar.listings.myListings',
            ),
            icon: 'pi pi-list',
            routerLink: '/account/my-items',
          },
          {
            label: this.translationService.translate(
              'account.sidebar.listings.create',
            ),
            icon: 'pi pi-plus',
            routerLink: '/account/create-item',
          },
        ],
      },

      {
        label: this.translationService.translate(
          'account.sidebar.rentals.title',
        ),
        icon: 'pi pi-calendar',
        items: [
          {
            label: this.translationService.translate(
              'account.sidebar.rentals.renting',
            ),
            icon: 'pi pi-shopping-cart',
            routerLink: '/account/renting',
          },
          {
            label: this.translationService.translate(
              'account.sidebar.rentals.rentingOut',
            ),
            icon: 'pi pi-briefcase',
            routerLink: '/account/renting-out',
          },
        ],
      },

      {
        label: this.translationService.translate(
          'account.sidebar.account.title',
        ),
        icon: 'pi pi-user',
        items: [
          {
            label: this.translationService.translate(
              'account.sidebar.account.profile',
            ),
            icon: 'pi pi-id-card',
            routerLink: '/account/profile',
          },
          {
            label: this.translationService.translate(
              'account.sidebar.account.addresses',
            ),
            icon: 'pi pi-map-marker',
            routerLink: '/account/addresses',
          },
          {
            label: this.translationService.translate(
              'account.sidebar.account.security',
            ),
            icon: 'pi pi-lock',
            routerLink: '/account/security',
          },
          {
            label: this.translationService.translate(
              'account.sidebar.account.settings',
            ),
            icon: 'pi pi-cog',
            routerLink: '/account/settings',
          },
        ],
      },

      {
        label: this.translationService.translate('account.sidebar.favorites'),
        icon: 'pi pi-heart',
        routerLink: '/account/favorites',
      },
    ];
  }
}
