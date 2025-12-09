import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ExpenseService, Expense } from '../../services/expense.service';
import { ExpenseChartComponent } from '../expense-chart/expense-chart.component';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, ExpenseChartComponent],
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {

  expenses: Expense[] = [];
  total = 0;
  filterForm!: FormGroup;

  months = [
    { name: 'Enero', value: 1 }, { name: 'Febrero', value: 2 }, 
    { name: 'Marzo', value: 3 }, { name: 'Abril', value: 4 },
    { name: 'Mayo', value: 5 }, { name: 'Junio', value: 6 },
    { name: 'Julio', value: 7 }, { name: 'Agosto', value: 8 },
    { name: 'Septiembre', value: 9 }, { name: 'Octubre', value: 10 },
    { name: 'Noviembre', value: 11 }, { name: 'Diciembre', value: 12 }
  ];

  constructor(private expenseService: ExpenseService, private fb: FormBuilder) {}

  ngOnInit(): void {
    // Formulario reactivo para el filtro
    this.filterForm = this.fb.group({
      year: [new Date().getFullYear()],
      month: [new Date().getMonth() + 1]
    });

    this.loadExpenses();
  }

  // Cargar todos los gastos
  loadExpenses(): void {
    this.expenseService.getExpenses().subscribe(data => {
      this.expenses = data;
      this.calculateTotal();
    });
  }

  // Aplicar filtro por mes/año
  applyFilter(): void {
    const { year, month } = this.filterForm.value;

    this.expenseService.getExpensesByMonth(year, month).subscribe(data => {
      console.log('Filtrado:', data);
      this.expenses = data;
      this.calculateTotal();
    });
  }

  // Calcular total de gastos
  calculateTotal(): void {
    this.total = this.expenses.reduce((sum, e) => sum + e.amount, 0);
  }

  // Eliminar gasto
  deleteExpense(id: number): void {
    if (confirm('¿Eliminar gasto?')) {
      this.expenseService.deleteExpense(id).subscribe(() => {
        this.expenses = this.expenses.filter(e => e.id !== id);
        this.calculateTotal();
      });
    }
  }
}
