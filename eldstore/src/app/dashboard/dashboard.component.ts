import { Component, Renderer2, Injector, ApplicationRef, ComponentFactoryResolver, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { jsPDF } from 'jspdf';
import { TableComponent } from '../table/table.component';
import { ProdutoService } from '../produto.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(
    private renderer: Renderer2,
    private injector: Injector,
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private produtoservice: ProdutoService,
    private cdr: ChangeDetectorRef,
  ) {}


  qtdt = 0;
  good = 0;
  low = 0;
  out = 0;

  ngOnInit(){
    this.countProduct()
  }

  countProduct(){

    this.produtoservice.countAllProducts().subscribe(
      (data) => {
          this.qtdt = data.counter;
          console.log(data);
          
      },
      (err) => {
          alert("Erro na contagem quantidade total");
          
      }
    )

    this.produtoservice.countProducts('good').subscribe(
      (data) => {
        this.good = data.counter;
        console.log(data);
      }, 
      (err) => {
        alert("Erro na contagem")
      }
    )

    this.produtoservice.countProducts('low').subscribe(
      (data) => {
        this.low = data.counter;
        console.log(data);
      }, 
      (err) => {
        alert("Erro na contagem")
      }
    )

    this.produtoservice.countProducts('out-stock').subscribe(
      (data) => {
        this.out = data.counter;
        console.log(data);
      }, 
      (err) => {
        alert("Erro na contagem")
      }
    )

    this.cdr.detectChanges()

  }

  filterProducts(status: string) {
    switch (status) {
      case 'abastecido':
        return 'abastecido'; 
      case 'critico':
        return 'critico'; 
      case 'esgotado':
        return 'esgotado'; 
      default:
        return ''; 
    }
  }

  gerarPdf(){
    const doc = new jsPDF()

    doc.setFontSize(18);
    doc.text('Relatório de Estoque', 105, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.text(`Quantidade de Itens total: ${this.qtdt}`, 20, 40);
    doc.text(`Quantidade de itens com o estoque bom: ${this.good}`, 20, 50);
    doc.text(`Quantidade de itens com o estoque mediano: ${this.low}`, 20, 60);
    doc.text(`Quantidade de itens esgotados: ${this.out}`, 20, 70);

    doc.save('dashboard.pdf');

  }
  
  // gerarPdf() {
  //   const container = this.renderer.createElement('div');
  //   this.renderer.setStyle(container, 'display', 'none'); 
  //   document.body.appendChild(container);

  //   const factory = this.componentFactoryResolver.resolveComponentFactory(TableComponent);
  //   const componentRef = factory.create(this.injector);
  //   this.appRef.attachView(componentRef.hostView);
    
  //   this.renderer.appendChild(container, componentRef.location.nativeElement);

  //   setTimeout(() => {
  //     const content = componentRef.instance.getTableComponent();
  //     const doc = new jsPDF({
  //       orientation: 'portrait',
  //       unit: 'mm',
  //       format: 'a4'
  //     });

  //     doc.setFontSize(100); 
      
  //     doc.html(content, {
  //       x: 10,
  //       y: 10,
  //       width: 400,
  //       windowWidth: 1024, 

  //       callback: (doc) => {
  //         doc.save('dashboard.pdf'); 
  //         document.body.removeChild(container);
  //         this.appRef.detachView(componentRef.hostView);
  //         componentRef.destroy();
  //       },

  //     });
  //   }, 10);
  // }

}
