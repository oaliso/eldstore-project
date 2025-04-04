import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-loading',
  imports: [MatProgressSpinnerModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {

  constructor(private dialogRef: MatDialog) {}

  ngOnInit(){
    this.executar()
  }


  executar(){
    setTimeout(() => {
      this.closeDialog()
    }, 10000)
  }

  closeDialog(){

    this.dialogRef.closeAll()

  }


}
