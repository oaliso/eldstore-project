import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { HomeComponent } from "./home/home.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditComponent } from './edit/edit.component';
import { TableComponent } from './table/table.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,  DashboardComponent, NavbarComponent, HomeComponent, TableComponent, SearchBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'eldstore';
}
