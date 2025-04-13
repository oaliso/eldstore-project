import { Component, ViewChild, ElementRef, ChangeDetectionStrategy, NgModule, ChangeDetectorRef } from '@angular/core';
import JsBarcode from 'jsbarcode';
import { Produto, ProdutoService } from '../produto.service';
import { ActivatedRoute } from '@angular/router';
import { Location, NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EDialogComponent } from '../e-dialog/e-dialog.component';
import { ErrorEditDialogComponent } from '../error-edit-dialog/error-edit-dialog.component';
import { EmptydialogComponent } from '../emptydialog/emptydialog.component';
import { LoadingComponent } from "../loading/loading.component";

@Component({
  selector: 'app-register',
  imports: [LoadingComponent, NgIf],
  providers: [ProdutoService],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EditComponent {

  constructor( 
    private route: ActivatedRoute, 
    private produtoService: ProdutoService, 
    private cdr: ChangeDetectorRef, 
    private location: Location,
    private dialog: MatDialog
  ){}

  loading = true

  namerequest = ""
  status = ""
  contador: number = 0;
  barcode: string = '';

  barcodeparams: string | null = '';
  titleProduct: string = '';

  ngOnInit(){
    this.route.paramMap.subscribe(params =>{
      this.barcodeparams = params.get('BARCODE')
      
      if(this.barcodeparams){
        this.getProduct()
        // setTimeout(()=>{
        //   this.loading = false
        //   this.cdr.detectChanges()
        // }, 9000)

        
        
        
      }
    })
  }

  ngOnDestroy(){
    window.location.reload()
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
                    this.loading = false
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
  
    this.typeResult = "deletado"
    this.openDialog()


  }

  // SALVAR AS ALTERAÇÕES :::::::::::::::::;;;

  onNameChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.titleProduct = inputElement.value;
  }

  onAmountChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.contador = inputElement.valueAsNumber;
  }

  rpdt(){

    // good : estoque bom : contador >= 50
    // low : alerta : contador < 50
    // out-stock : sem estoque : contador == 0

    if (!this.titleProduct.trim()) {
      this.openDialogEmpty()
      return;
    }

   if(this.contador >= 50){

    this.status = "good"

   }else{

    if(this.contador >= 1){
      this.status = 'low'

    }else{
      this.status = 'out-stock'

    }

   }

    const produto = {
      NAME: this.titleProduct,
      AMOUNT: this.contador,
      CHECKSTOCK: this.status
    }

    this.produtoService.updateProduct(this.barcode, produto).subscribe(
      response => {

        this.openDialog()
        
      },
      error => {
        this.opendDialogError()
        
        console.error(error);
      }
    );

    this.cdr.detectChanges()
  }

  typeResult = ""

    openDialog(){

      this.typeResult = "atualizado"

      let dialogRef = this.dialog.open(EDialogComponent, {
        
        data: {status: this.typeResult},
        height: '200px',
        width: '400px',
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
      
      
  
    }

    opendDialogError(){
      let dialogRef = this.dialog.open(ErrorEditDialogComponent, {
        height: '200px',
        width: '400px',
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result:${result}` )
      })
    }

    openDialogEmpty(){
      let dialogRef = this.dialog.open(EmptydialogComponent, {
        height: '200px',
        width: '400px',
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }

    exit(){
      this.location.back()
    }

}
