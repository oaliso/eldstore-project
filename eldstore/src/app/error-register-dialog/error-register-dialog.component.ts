import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-error-register-dialog',
  imports: [MatButton],
  templateUrl: './error-register-dialog.component.html',
  styleUrl: './error-register-dialog.component.css'
})
export class ErrorRegisterDialogComponent {

  status: string = 'cadastrar'

  constructor(private dialogRef: MatDialog) {}

  closeDialog(){

    this.dialogRef.closeAll()

  }

}
