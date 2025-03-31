import { Component, ViewChild, ElementRef, ChangeDetectorRef, model } from '@angular/core';
import JsBarcode from 'jsbarcode';
import { ProdutoService } from '../produto.service';
import { MatDialog, MatDialogRef} from '@angular/material/dialog'
import { RDialogComponent } from '../r-dialog/r-dialog.component';
import { ErrorRegisterDialogComponent } from '../error-register-dialog/error-register-dialog.component';

@Component({
  selector: 'app-register',
  imports: [],
  providers: [ProdutoService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})

export class RegisterComponent {

  constructor(
    private produtoService: ProdutoService,
    private cdr: ChangeDetectorRef, 
    private dialog: MatDialog){ }

  generatedCode: string = '';
  contador: number = 0;
  namerequest = ""
  status = ""

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
      BARCODE: this.generatedCode,
      NAME: this.namerequest,
      AMOUNT: this.contador,
      CHECKSTOCK: this.status
    }

    this.produtoService.createProduct(produto).subscribe(
      response => {
        this.openDialog()

      },
      error => {
        this.opendDialogError()
      }

      
    );
  }

  //modal

  openDialog(){

    let dialogRef = this.dialog.open(RDialogComponent, {
      height: '200px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); 
    });
    
  }

  opendDialogError(){
    let dialogRef = this.dialog.open(ErrorRegisterDialogComponent, {
      height: '200px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result:${result}` )
    })
  }

}
