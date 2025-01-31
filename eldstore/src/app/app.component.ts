import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { HomeComponent } from "./home/home.component";
import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,  DashboardComponent, NavbarComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'eldstore';
}
