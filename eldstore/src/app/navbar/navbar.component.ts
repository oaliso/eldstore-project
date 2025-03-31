import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private produtoservice: ProdutoService, private cdr: ChangeDetectorRef){}

  notify = 0
  changenotify = true;
  low = 0;

  ngOnInit(){
    this.getNotify();
  }

  getNotify(){

    this.produtoservice.countProducts('out-stock').subscribe(
      (data) => {
        this.notify = data.counter;


        if(this.notify >= 1){
          this.changenotify = false;
        }else{
          this.changenotify = true;
        }

        this.cdr.detectChanges()

      }, 
      (err) => {
        alert("Erro na contagem")
      });
  }

  


}
