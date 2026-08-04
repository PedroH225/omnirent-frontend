import { Routes } from '@angular/router';
import { MainLayoutComponent } from '@layout/main-layout/main-layout.component';
import { authGuard } from '@core/auth/auth.guard';
import { LoginComponent } from '@features/auth/pages/login/login.component';
import { HomeComponent } from '@features/home/home-page/home.component';
import { MyItemsComponent } from '@features/items/pages/my-items/my-items.component/my-items.component';
import { DashboardComponent } from '@features/user/pages/dashboard/dashboard.component';
import { UserLayoutComponent } from '@features/user/layouts/user-layout/user-layout.component';
import { RentingComponent } from '@features/rentals/renting/renting.component';
import { RentingOutComponent } from '@features/rentals/renting-out/renting-out.component';
import { UserAddressComponent } from '@features/address/user-address/user-address.component';

export const routes: Routes = [
    {
    path: '',
    component: MainLayoutComponent,
    children: [
        {
            path: '',
            component: HomeComponent
        },
        {
            path: 'account',
            canActivate: [authGuard],
            component: UserLayoutComponent,
            children: [
                {
                    path: '',
                    component: DashboardComponent
                },
                {
                    path: 'my-items',
                    component: MyItemsComponent
                },
                {
                    path: 'renting',
                    component: RentingComponent
                },
                {
                    path: 'renting-out',
                    component: RentingOutComponent
                },
                {
                    path: 'addresses',
                    component: UserAddressComponent
                }
            ]
        }
    ]
},
    {
        path: 'login',
        component: LoginComponent
    },
];

