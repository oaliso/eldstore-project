import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';



export interface Produto {
  BARCODE: string;
  NAME: string;
  AMOUNT: number;
}

export interface ProdutoAtualizado {
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

  updateProduct(barcode: string, produto: ProdutoAtualizado): Observable<any>{

    console.log(produto)

    return this.http.put(`${this.apiUrl}/${barcode}`, produto)
  }

  deleteProduct(barcode: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${barcode}`).pipe(
      catchError((error) => {
          console.error("Erro ao deletar produto:", error);
          return throwError(() => new Error("Falha ao deletar produto."));
      })
  )
  }

  getProductByID(barcode: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${barcode}`).pipe(
        catchError((error) => {
            console.error("Erro ao buscar produto:", error);
            return throwError(() => new Error("Falha ao carregar produto."));
        })
    );
  }

  getAllProducts(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }

  countProducts(checkstock: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/counter?checkstock=${checkstock}`).pipe(
      catchError((error) => {
        console.error("Erro ao buscar produto: ", error);
        return throwError(() => new Error("Falha ao contar produto"))
      })
    )
  }

  countAllProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/count`).pipe(
      catchError((error) => {
          console.error("Erro ao buscar produto:", error);
          return throwError(() => new Error("Falha ao carregar produto."));
      })
  );
  }

}
