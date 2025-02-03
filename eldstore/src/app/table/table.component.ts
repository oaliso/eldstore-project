import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  imports: [CommonModule, RouterLink, SearchBarComponent],
})
export class TableComponent implements OnInit {
  filterType: string = ''; 
  searchText: string = ''; 
  produtos = [
    { nome: 'Arroz branco', quantidade: 50 },
    { nome: 'Açúcar', quantidade: 45 },
    { nome: 'Azeite', quantidade: 0 },
    { nome: 'Sal', quantidade: 213 },
    { nome: 'Macarrão espaguete', quantidade: 139 },
    { nome: 'Café', quantidade: 86 },
    { nome: 'Feijão preto', quantidade: 75 },
    { nome: 'Óleo de soja', quantidade: 0 },
    { nome: 'Farinha de trigo', quantidade: 0 },
    { nome: 'Leite em pó', quantidade: 0 },
    { nome: 'Manteiga', quantidade: 20 },
    { nome: 'Vinagre', quantidade: 25 },
    { nome: 'Achocolatado', quantidade: 0 },
    { nome: 'Milho em conserva', quantidade: 67 },
    { nome: 'Ervilha em conserva', quantidade: 50 },
    { nome: 'Molho de tomate', quantidade: 180 },
    { nome: 'Biscoito recheado', quantidade: 90 },
    { nome: 'Detergente', quantidade: 0 },
    { nome: 'Sabão em pó', quantidade: 30 },
    { nome: 'Papel higiênico', quantidade: 100 },
  ];

  ngOnInit(): void {
    //'filter' da URL
    this.filterType = this.route.snapshot.queryParams['filter'] || '';
  }

  constructor(private route: ActivatedRoute) {}

  //pesquisa vazia
  updateSearchText(newSearchText: string): void {
    this.searchText = newSearchText;
  
    if (!this.searchText) {
      this.filterType = ''; // Reseta 
    }
  }

  
  get filteredProducts() {
    let filtered = this.produtos;

    //tipo
    if (this.filterType === 'abastecido') {
      filtered = filtered.filter((produto) => produto.quantidade > 50);
    } else if (this.filterType === 'critico') {
      filtered = filtered.filter((produto) => produto.quantidade <= 50 && produto.quantidade > 0);
    } else if (this.filterType === 'esgotado') {
      filtered = filtered.filter((produto) => produto.quantidade === 0);
    }

    //pesquisa
    if (this.searchText) {
      filtered = filtered.filter((produto) =>
        produto.nome.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    return filtered;
  }

  getHeaderClass() {
    switch (this.filterType) {
      case 'abastecido':
        return 'header-abastecido';
      case 'critico':
        return 'header-critico';
      case 'esgotado':
        return 'header-esgotado';
      default:
        return 'header-todos';
    }
  }
}
