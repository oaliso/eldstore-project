import { Component, ViewChild, ElementRef } from '@angular/core';
import JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-edit',
  imports: [],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
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
