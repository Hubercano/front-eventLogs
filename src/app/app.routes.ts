import { Routes } from '@angular/router';
import { TableComponent } from './features/table/table.component';
import { RegisterComponent } from './features/register/register.component';
import { LoginComponent } from './features/login/login.component';
import { UpdateComponent } from './features/update/update.component';
import { ProfileComponent } from './features/profile/profile.component';

export const routes: Routes = [
    {
        path: "",
        component: RegisterComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "update",
        component: UpdateComponent
    },
    {
        path: "profile",
        component: ProfileComponent
    },
    {
        path: "table",
        component: TableComponent
    }
];
