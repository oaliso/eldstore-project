import { Component, ViewChild, ElementRef, ChangeDetectionStrategy, NgModule } from '@angular/core';
import JsBarcode from 'jsbarcode';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RegisterComponent {

  // constructor(private produtoService: ProdutoService){ }

  generatedCode: string = '';
  contador: number = 0;

  //  PLUS AND MINUS BUTTON FOR QUANTITY {
  somar() {
    this.contador++;
  }

  subtrair() {
    this.contador--;
  }


  //  GENERATE RANDOM CODE AND SETTING BARCODE
  @ViewChild('barcode') barcodeElement!: ElementRef;

  generateRandomCode(): string {
    return Math.floor(100000000000 + Math.random() * 900000000000).toString();
  }

  generateBarcode(): void {
    this.generatedCode = this.generateRandomCode();

    JsBarcode(this.barcodeElement.nativeElement, this.generatedCode, {
      format: 'EAN13',
      lineColor: '#000',
      width: 2,
      height: 50,
      displayValue: true
    });
  }

  //ADDING REGISTER 

  // rpdt(){

  //   const produto ={
  //     BARCODE: this.generatedCode,
  //     NAME: 'PRODUTO EXEMPLO',
  //     AMOUNT: this.contador
  //   }

  //   this.produtoService.createProduct(produto).subscribe(
  //     response => {
  //       alert("Produto criado com sucesso!");
  //       console.log(response);
  //     },
  //     error => {
  //       alert("Erro ao criar o produto!");
  //       console.error(error);
  //     }
  //   );
  // }

}
