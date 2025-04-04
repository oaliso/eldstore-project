import { Component, Renderer2, Injector, ApplicationRef, ComponentFactoryResolver, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { jsPDF } from 'jspdf';
import Chart from 'chart.js/auto';
import { TableComponent } from '../table/table.component';
import { ProdutoService } from '../produto.service';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { LoadingComponent } from '../loading/loading.component';

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
    private dialog: MatDialog
  ) {}
  
  @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef;

  qtdt = 0;
  good = 0;
  low = 0;
  out = 0;
  chart!: Chart;

  ngOnInit(){
    this.countProduct() 
  }



  createChart() {

    if (this.chart) {
      this.chart.destroy(); // Destroi o gráfico anterior antes de recriar
    }

    const canvas = this.chartCanvas.nativeElement as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    ctx?.clearRect(0, 0, canvas.width, canvas.height);

    const dataNormalized = [
      (this.good / this.qtdt) * 100,
      (this.low / this.qtdt) * 100,
      (this.out / this.qtdt) * 100,
    ];

    this.chart = new Chart(canvas, {
      type: 'pie',
      data: {
        labels: ['Bom', 'Mediano', 'Esgotado'],
        datasets: [{
          data: dataNormalized,
          backgroundColor: ['#A2AF2D', '#F1B941', '#C01D07']
        }]
      },
      options: {
        responsive: true, // Impede que o canvas se ajuste ao tamanho da tela
        maintainAspectRatio: false, // Impede distorção no PDF
        plugins: {
          legend: {
            position: 'bottom',
          }
        },
        elements: {
          arc: {
            borderWidth: 0 // Remove a separação entre as fatias
          }
        }
      }
    });

    this.cdr.detectChanges()
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

    setTimeout(() => {

    const canvas = this.chartCanvas.nativeElement as HTMLCanvasElement;
    const imgData = canvas.toDataURL('image/png');

    if (!imgData || imgData.length < 100) {
      console.error("Erro: Imagem não gerada corretamente!");
      return;
    }

    const doc = new jsPDF();

    // Título
    doc.setFontSize(18);
    doc.text('Relatório de Estoque', 105, 20, { align: 'center' });

    // Linha separadora
    doc.line(20, 30, 190, 30);

    // Tabela
    doc.setFontSize(12);
    doc.text('Quantidade de Itens total:', 20, 40);
    doc.text(`${this.qtdt}`, 170, 40);

    doc.text('Quantidade de itens com estoque bom:', 20, 50);
    doc.text(`${this.good}`, 170, 50);

    doc.text('Quantidade de itens com estoque mediano:', 20, 60);
    doc.text(`${this.low}`, 170, 60);

    doc.text('Quantidade de itens esgotados:', 20, 70);
    doc.text(`${this.out}`, 170, 70);
    
    console.log("Imagem Base64:", imgData);

    doc.addImage(imgData, 'PNG', 20, 80, 170, 100);

    doc.save('dashboard.pdf')

    }, 10000);

  }

      openDialog(){
  
        let dialogRef = this.dialog.open(LoadingComponent, {
          
          height: '250px',
          width: '250px',
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
        
        
    
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
