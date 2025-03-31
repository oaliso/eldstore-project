import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { MatButton } from '@angular/material/button';
import JsBarcode from 'jsbarcode';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-bc-modal',
  imports: [MatButton],
  templateUrl: './bc-modal.component.html',
  styleUrl: './bc-modal.component.css'
})
export class BcModalComponent implements OnInit{

  constructor(
    private dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { code: string },
    private location: Location,
    private cdr: ChangeDetectorRef,
  ) {}

  code = ""

  @ViewChild('barcode') barcodeElement!: ElementRef;

  ngOnInit(){
    this.code = this.data.code;
    
  }

  ngAfterViewInit(){
    this.generateBarcode()
  }

    generateBarcode(): void {
  
      this.code = this.data.code;
  
      JsBarcode(this.barcodeElement.nativeElement, this.code, {
        format: 'EAN13',
        lineColor: '#000',
        width: 2,
        height: 50,
        displayValue: true
      });

      this.cdr.detectChanges()
    }

  closeDialog(){

    this.location.forward()

    this.dialogRef.closeAll()

  }

}
