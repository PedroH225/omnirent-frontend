import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { Button } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';

@Component({
  selector: 'app-user-sidebar',
  imports: [PanelMenuModule, Button, DrawerModule],
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.scss',
})
export class UserSidebarComponent {
  drawerVisible = false;

  readonly items: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      routerLink: '/account',
    },
    {
      label: 'Listings',
      icon: 'pi pi-box',
      items: [
        {
          label: 'My Listings',
          icon: 'pi pi-list',
          routerLink: '/account/my-items',
        },
        {
          label: 'Create Listing',
          icon: 'pi pi-plus',
          routerLink: '/account/create-item',
        },
      ],
    },
    {
      label: 'Rentals',
      icon: 'pi pi-calendar',
      items: [
        {
          label: 'Renting',
          icon: 'pi pi-shopping-cart',
          routerLink: '/account/renting',
        },
        {
          label: 'Renting Out',
          icon: 'pi pi-briefcase',
          routerLink: '/account/renting-out',
        },
      ],
    },
    {
      label: 'Account',
      icon: 'pi pi-user',
      items: [
        {
          label: 'Profile',
          icon: 'pi pi-id-card',
          routerLink: '/account/profile',
        },
        {
          label: 'Addresses',
          icon: 'pi pi-map-marker',
          routerLink: '/account/addresses',
        },
        {
          label: 'Security',
          icon: 'pi pi-lock',
          routerLink: '/account/security',
        },
        {
          label: 'Settings',
          icon: 'pi pi-cog',
          routerLink: '/account/settings',
        },
      ],
    },
    {
      label: 'Favorites',
      icon: 'pi pi-heart',
      routerLink: '/account/favorites',
    },
  ];
}
