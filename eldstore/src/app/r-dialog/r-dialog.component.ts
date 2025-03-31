import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-r-dialog',
  imports: [RouterLink, MatButton],
  templateUrl: './r-dialog.component.html',
  styleUrl: './r-dialog.component.css'
})
export class RDialogComponent {

  status: string = 'cadastrado'

  constructor(private dialogRef: MatDialog) {}

  closeDialog(){

    window.location.reload()

    this.dialogRef.closeAll()

  }

}
