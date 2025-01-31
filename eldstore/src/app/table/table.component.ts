import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  imports: [CommonModule], 
})
export class TableComponent {
  produtos = [
    { nome: 'Arroz branco', quantidade: 54 },
    { nome: 'Açúcar', quantidade: 445 },
    { nome: 'Azeite', quantidade: 0 },
    { nome: 'Sal', quantidade: 213 },
    { nome: 'Macarrão espaguete', quantidade: 139 },
    { nome: 'Café', quantidade: 86 }
  ];
}