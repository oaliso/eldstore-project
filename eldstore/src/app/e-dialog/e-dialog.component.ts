import { Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-e-dialog',
  imports: [MatButton, RouterLink],
  templateUrl: './e-dialog.component.html',
  styleUrl: './e-dialog.component.css'
})
export class EDialogComponent {

  constructor(
    private dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { status: string },
    private location: Location
  ) {}

  closeDialog(){

    this.location.forward()

    this.dialogRef.closeAll()

  }

}
