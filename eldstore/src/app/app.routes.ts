import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { EditComponent } from './edit/edit.component';
import { TableDashboardComponent } from './table-dashboard/table-dashboard.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'edit/:BARCODE', component: EditComponent},
    {path: 'table-dashboard', component: TableDashboardComponent},
    // {path: 'abaixodamedia', component: DdmComponent},
    // {path: 'esgotado', component: LowComponent}
];
