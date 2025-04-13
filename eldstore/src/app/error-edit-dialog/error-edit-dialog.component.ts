import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-error-edit-dialog',
  imports: [MatButton],
  templateUrl: './error-edit-dialog.component.html',
  styleUrl: './error-edit-dialog.component.css'
})
export class ErrorEditDialogComponent {

  status: string = 'atualizar'

  constructor(private dialogRef: MatDialog) {}

  closeDialog(){

    this.dialogRef.closeAll()

  }

}
