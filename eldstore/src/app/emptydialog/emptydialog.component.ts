import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-emptydialog',
  imports: [MatButton],
  templateUrl: './emptydialog.component.html',
  styleUrl: './emptydialog.component.css'
})
export class EmptydialogComponent {

  constructor(private dialogRef: MatDialog) {}

  closeDialog(){

    this.dialogRef.closeAll()

  }

}

