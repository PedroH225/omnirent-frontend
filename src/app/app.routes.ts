import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { MyItemsComponent } from './features/items/pages/my-items/my-items.component/my-items.component';
import { LoginComponent } from './features/auth/pages/login/login.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'my-items',
        canActivate: [authGuard],
        component: MyItemsComponent
    }
];

