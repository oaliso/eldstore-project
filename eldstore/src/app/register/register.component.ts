import { Component, ViewChild, ElementRef, ChangeDetectionStrategy, NgModule } from '@angular/core';
import JsBarcode from 'jsbarcode';
import { ProdutoService } from '../produto.service';
import { provideHttpClient, withFetch } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [],
  providers: [ProdutoService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RegisterComponent {

  constructor(private produtoService: ProdutoService){ }

  generatedCode: string = '';
  contador: number = 0;
  namerequest = ""

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

  onNameChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.namerequest = inputElement.value;
  }

  rpdt(){

    const produto ={
      BARCODE: this.generatedCode,
      NAME: this.namerequest,
      AMOUNT: this.contador
    }

    this.produtoService.createProduct(produto).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error(error);
      }
    );
  }

}
