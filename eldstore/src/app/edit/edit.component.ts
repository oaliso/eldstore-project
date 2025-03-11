import { Component, ViewChild, ElementRef } from '@angular/core';
import JsBarcode from 'jsbarcode';
import { ProdutoService } from '../produto.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  imports: [],
  providers: [ProdutoService, ActivatedRoute],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  generatedCode: string = '';
  contador: number = 0;

  barcode: string | null = '';
  titleProduct: string | null = '';
  quantityProduct: number | null = 0;

  constructor( private route: ActivatedRoute, private produtoService: ProdutoService){}

  ngOnInit(){

    this.route.paramMap.subscribe(params =>{
      this.barcode = params.get('barcode')
      if(this.barcode){
        this.getProduct()
      }
    })

  }

  getProduct(){
    if(this.barcode){
      this.produtoService.getProductByID(this.barcode).subscribe(
        (dados) => {
          this.titleProduct = dados.NAME;
          this.quantityProduct= dados.AMOUNT;
          this.barcode = dados.BARCODE;
        }, 
        (err) => {
          alert('apo')
        }
      )
    }
  }

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
