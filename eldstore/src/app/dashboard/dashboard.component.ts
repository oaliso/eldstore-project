import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  quantity = 1500;
  adm = 351;
  ddm = 452;
  fdm = 7;

 
  filterProducts(status: string) {
    switch (status) {
      case 'abastecido':
        return 'abastecido'; 
      case 'critico':
        return 'critico'; 
      case 'esgotado':
        return 'esgotado'; 
      default:
        return ''; 
    }
  }
}
