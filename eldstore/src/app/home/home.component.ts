import { ChangeDetectorRef, Component } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { LoadingComponent } from '../loading/loading.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TableComponent, LoadingComponent, NgIf], 
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private cdr: ChangeDetectorRef){}

  loading = true

  ngOnInit(){
    setTimeout(()=>{
      this.loading = false
      this.cdr.detectChanges()
    }, 1000)
  }

}
