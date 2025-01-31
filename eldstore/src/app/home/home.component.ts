import { Component } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TableComponent, SearchBarComponent], 
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {}
