import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



interface Produto {
  BARCODE: string;
  NAME: string;
  AMOUNT: number;
}

@Injectable({
  providedIn: 'root'
})

export class ProdutoService {

  private apiUrl = "http://localhost:3000"

  constructor(private http: HttpClient) { }

  createProduct(produto: Produto): Observable<any> {
    return this.http.post(this.apiUrl, produto);
  }

}
