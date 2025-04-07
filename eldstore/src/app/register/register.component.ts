import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import JsBarcode from 'jsbarcode';
import { ProdutoService } from '../produto.service';
import { MatDialog } from '@angular/material/dialog';
import { RDialogComponent } from '../r-dialog/r-dialog.component';
import { ErrorRegisterDialogComponent } from '../error-register-dialog/error-register-dialog.component';
import { EmptydialogComponent } from '../emptydialog/emptydialog.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ProdutoService],
})
export class RegisterComponent {

  constructor(
    private produtoService: ProdutoService,
    private cdr: ChangeDetectorRef, 
    private dialog: MatDialog,
    private location: Location
  ) {}

  generatedCode: string = '';
  contador: number = 0;
  namerequest: string = '';
  status: string = '';

  //  PLUS AND MINUS BUTTON FOR QUANTITY
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

  onAmountChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.contador = inputElement.valueAsNumber;
  }

  rpdt() {
    // Verificar se o código gerado e o nome do produto não estão vazios
    if (!this.generatedCode || !this.namerequest.trim()) {
      this.openDialogEmpty()
      return;
    }

    // Condições de estoque
    if (this.contador >= 50) {
      this.status = "good";
    } else {
      if (this.contador >= 1) {
        this.status = 'low';
      } else {
        this.status = 'out-stock';
      }
    }

    const produto = {
      BARCODE: this.generatedCode,
      NAME: this.namerequest,
      AMOUNT: this.contador,
      CHECKSTOCK: this.status
    };

    // Chamada ao serviço
    this.produtoService.createProduct(produto).subscribe(
      response => {
        this.openDialog();
      },
      error => {
        this.opendDialogError();
      }
    );
  }

  // Modal de sucesso
  openDialog() {
    let dialogRef = this.dialog.open(RDialogComponent, {
      height: '200px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); 
    });
  }

  // Modal de erro
  opendDialogError() {
    let dialogRef = this.dialog.open(ErrorRegisterDialogComponent, {
      height: '200px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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
