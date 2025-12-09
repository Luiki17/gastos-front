import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-expense-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expense-chart.component.html'
})
export class ExpenseChartComponent implements OnChanges {

  @Input() expenses: { amount: number; expenseDate: string }[] = [];
  @ViewChild('chartCanvas') canvas!: ElementRef<HTMLCanvasElement>;

  private chart?: Chart;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['expenses']) {
      this.renderChart();
    }
  }

  private renderChart(): void {
    if (!this.canvas) return;

    // 🔥 Destruir gráfico anterior
    if (this.chart) {
      this.chart.destroy();
    }

    const monthlyData = new Array(12).fill(0);
    const labels = [
      'Enero','Febrero','Marzo','Abril','Mayo','Junio',
      'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
    ];

    this.expenses.forEach(e => {
      const month = new Date(e.expenseDate).getMonth();
      monthlyData[month] += e.amount;
    });

    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Gastos (€)',
            data: monthlyData,
            backgroundColor: '#0d6efd'
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
}
