import { Component, ViewChild, ElementRef } from '@angular/core';
import JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  generatedCode: string = '';
  contador: number = 0;

  somar() {
    this.contador++;
  }

  subtrair() {
    this.contador--;
  }

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
}
