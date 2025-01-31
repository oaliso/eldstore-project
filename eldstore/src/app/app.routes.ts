import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { EditComponent } from './edit/edit.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'edit', component: EditComponent},
    // {path: 'acimadamedia', component: AdmComponent},
    // {path: 'abaixodamedia', component: DdmComponent},
    // {path: 'esgotado', component: LowComponent}
];
