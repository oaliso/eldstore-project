import { Component } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-table-dashboard',
  imports: [TableComponent ],
  templateUrl: './table-dashboard.component.html',
  styleUrl: './table-dashboard.component.css'
})
export class TableDashboardComponent {

}
