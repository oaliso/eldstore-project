import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



export interface Produto {
  BARCODE: string;
  NAME: string;
  AMOUNT: number;
}

@Injectable({
  providedIn: 'root'
})

export class ProdutoService {

  private apiUrl = "http://localhost:3000/produto"

  constructor(private http: HttpClient) { }

  createProduct(produto: Produto): Observable<any> {
    return this.http.post(this.apiUrl, produto);
  }

  getProductByID(barcode: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${barcode}`)
  }
  
  getAllProducts(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }

}
