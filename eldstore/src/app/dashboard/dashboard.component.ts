import { Component, Renderer2, Injector, ApplicationRef, ComponentFactoryResolver } from '@angular/core';
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
    private produtoservice: ProdutoService
  ) {}


  quantity = 1500;
  adm = 351;
  ddm = 452;
  fdm = 7;

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

  
  gerarPdf() {
    const container = this.renderer.createElement('div');
    this.renderer.setStyle(container, 'display', 'none'); 
    document.body.appendChild(container);

    const factory = this.componentFactoryResolver.resolveComponentFactory(TableComponent);
    const componentRef = factory.create(this.injector);
    this.appRef.attachView(componentRef.hostView);
    
    this.renderer.appendChild(container, componentRef.location.nativeElement);

    setTimeout(() => {
      const content = componentRef.instance.getTableComponent();
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      doc.setFontSize(100); 
      
      doc.html(content, {
        x: 10,
        y: 10,
        width: 400,
        windowWidth: 1024, 

        callback: (doc) => {
          doc.save('dashboard.pdf'); 
          document.body.removeChild(container);
          this.appRef.detachView(componentRef.hostView);
          componentRef.destroy();
        },

      });
    }, 10);
  }

}
