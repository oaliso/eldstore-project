import { Component, Renderer2, Injector, ApplicationRef, ComponentFactoryResolver, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import Chart from 'chart.js/auto';
import { Produto, ProdutoService } from '../produto.service';
import { MatDialog } from '@angular/material/dialog';
import { LoadingComponent } from '../loading/loading.component';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [RouterLink, LoadingComponent, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(
    private produtoservice: ProdutoService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}
  
  @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef;

  loading = true
  qtdt = 0;
  good = 0;
  low = 0;
  out = 0;
  chart!: Chart;

  ngOnInit(){
    this.countProduct()
    setTimeout(() => {
      this.loading = false
    }, 1200);
  }

  createChart() {

    if (this.chart) {
      this.chart.destroy();
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
        responsive: true, 
        maintainAspectRatio: false, 
        plugins: {
          legend: {
            position: 'bottom',
          }
        },
        elements: {
          arc: {
            borderWidth: 0 
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
          console.log("Erro na contagem quantidade total");
          
      }
    )

    this.produtoservice.countProducts('good').subscribe(
      (data) => {
        this.good = data.counter;
        console.log(data);
      }, 
      (err) => {
        console.log("Erro na contagem")
      }
    )

    this.produtoservice.countProducts('low').subscribe(
      (data) => {
        this.low = data.counter;
        console.log(data);
      }, 
      (err) => {
        console.log("Erro na contagem")
      }
    )

    this.produtoservice.countProducts('out-stock').subscribe(
      (data) => {
        this.out = data.counter;
        console.log(data);
      }, 
      (err) => {
        console.log("Erro na contagem")
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

  gerarPdf() {
    setTimeout(() => {
      const canvas = this.chartCanvas.nativeElement as HTMLCanvasElement;
      const imgData = canvas.toDataURL('image/png');
  
      if (!imgData || imgData.length < 100) {
        console.error("Erro: Imagem não gerada corretamente!");
        return;
      }
  
      this.produtoservice.getAllProducts().subscribe((produtos: Produto[]) => {
        const doc = new jsPDF();
        let currentY = 40;
  
        const verificarEspaco = (alturaNecessaria: number): void => {
          const pageHeight = doc.internal.pageSize.height;
          if (currentY + alturaNecessaria > pageHeight) {
            doc.addPage();
            currentY = 20;
          }
        };
  
        doc.setFontSize(18);
        doc.text('Relatório de Estoque', 105, 20, { align: 'center' });
  
        doc.line(20, 30, 190, 30);
  
        currentY = 40;
  
        const gerarTabela = (titulo: string, dados: Produto[]) => {
          if (dados.length === 0) return;
  
          verificarEspaco(20);
          doc.setFontSize(14);
          doc.text(titulo, 20, currentY);
          currentY += 5;
  
          const body = dados.map(p => [p.NAME, p.AMOUNT.toString(), p.BARCODE]);
  
          autoTable(doc, {
            startY: currentY,
            head: [['Nome', 'Quantidade', 'Código de Barras']],
            body: body,
            theme: 'striped',
            margin: { left: 20, right: 20 }
          });
  
          const docTyped = doc as jsPDF & { lastAutoTable?: { finalY: number } };
          if (docTyped.lastAutoTable?.finalY) {
            currentY = docTyped.lastAutoTable.finalY + 15;
          }
        };

        const good = produtos.filter(p => p.CHECKSTOCK?.toLowerCase().trim() === 'good');
        const low = produtos.filter(p => p.CHECKSTOCK?.toLowerCase().trim() === 'low');
        const out = produtos.filter(p => p.CHECKSTOCK?.toLowerCase().trim() === 'out-stock');
  
        gerarTabela('Produtos com estoque bom', good);
        gerarTabela('Produtos com estoque mediano', low);
        gerarTabela('Produtos esgotados', out);
  
        doc.addPage()
        currentY = 20
        doc.setFontSize(14);
        doc.fill()
        doc.text('Resumo de Estoque', 20, currentY);
        currentY += 10;
        doc.setFontSize(12);
        doc.text('Quantidade de Itens total:', 20, currentY);
        doc.text(`${this.qtdt}`, 170, currentY);
        currentY += 10;
        doc.text('Quantidade de itens com estoque bom:', 20, currentY);
        doc.text(`${this.good}`, 170, currentY);
        currentY += 10;
        doc.text('Quantidade de itens com estoque mediano:', 20, currentY);
        doc.text(`${this.low}`, 170, currentY);
        currentY += 10;
        doc.text('Quantidade de itens esgotados:', 20, currentY);
        doc.text(`${this.out}`, 170, currentY);
        currentY += 20;

        verificarEspaco(70);
        doc.addImage(imgData, 'PNG', 52, currentY, 100, 65);
  
        doc.save('dashboard.pdf');
      }, error => {
        console.error("Erro ao buscar produtos:", error);
      });
    }, 1500);
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

}
