import { Component, ViewChild, ElementRef, ChangeDetectionStrategy, NgModule, ChangeDetectorRef } from '@angular/core';
import JsBarcode from 'jsbarcode';
import { Produto, ProdutoService } from '../produto.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [],
  providers: [ProdutoService],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EditComponent {

  namerequest: string = ''
  status: string = ''
  barcode: string = '';
  barcodeparams: string | null = '';
  titleProduct: string = '';
  contador: number = 0;

  constructor( private route: ActivatedRoute, private produtoService: ProdutoService, private cdr: ChangeDetectorRef, private location: Location){}

  ngOnInit(){

    this.route.paramMap.subscribe(params =>{
      this.barcodeparams = params.get('BARCODE')
      
      if(this.barcodeparams){
        this.getProduct()

      }
    })
  }

// AUMENTAR E DIMINUIR QUANTIDADE ::::::

  somar() {
    this.contador++;
  }

  subtrair() {
    this.contador--;
  }

  //Gerando código de barra :::::::

    @ViewChild('barcode') barcodeElement!: ElementRef;
  
    generateBarcode(): void {

      JsBarcode(this.barcodeElement.nativeElement, this.barcode,{
        format: 'EAN13',
        lineColor: '#000',
        width: 2,
        height: 50,
        displayValue: true
      });
    }

  // FUNÇÃO QUE PUXA OS DADOS DO BANCO PARA AS LACUNAS ::::::

  getProduct() {
    if (this.barcodeparams) {
        this.produtoService.getProductByID(this.barcodeparams).subscribe(
            (data) => {

              console.log("Dados recebidos da API:", data);
                
                if (data) {
                    this.titleProduct = data[0].NAME;
                    this.contador = data[0].AMOUNT;
                    this.barcode = data[0].BARCODE;
                    this.generateBarcode()
                    this.cdr.detectChanges()

                } else {
                  alert("Produto não encontrado.");
                }


            },
            (err) => {
                alert("Produto não encontrado.");
            }
        );
    }
  }

  // DELETAR UM PRODUTO :::::::::::::::;

  deleteProduct(){
    if(this.barcodeparams){
      this.produtoService.deleteProduct(this.barcodeparams).subscribe();
    }
    alert("Produto Deletado Com Sucesso")

    this.location.back();


  }

  // SALVAR AS ALTERAÇÕES :::::::::::::::::;;;

  onNameChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.titleProduct = inputElement.value;
  }

  rpdt(){

    // good : estoque bom : contador > 30
    // low : alerta : contador <= 30
    // out-stock : sem estoque : contador == 0

   if(this.contador >= 50){

    this.status = "good"

   }else{

    if(this.contador >= 1){
      this.status = 'low'

    }else{
      this.status = 'out-stock'

    }

   }

    const produto ={
      NAME: this.titleProduct,
      AMOUNT: this.contador,
      CHECKSTOCK: this.status
    }

    this.produtoService.updateProduct(this.barcode, produto).subscribe(
      response => {
        alert("Produto atualizado com sucesso!")
        console.log(response);

        
        this.location.back();
        
      },
      error => {
        alert('Erro ao atualizar produto')
        
        console.error(error);
      }
    );
  }

}
