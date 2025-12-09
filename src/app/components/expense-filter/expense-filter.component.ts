import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expense-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './expense-filter.component.html'
})
export class ExpenseFilterComponent implements OnInit {

  @Output() filterChange = new EventEmitter<{ year: number; month: number }>();

  form!: FormGroup; // <-- inicializamos después
  months = [
    { value: 1, name: 'Enero' },
    { value: 2, name: 'Febrero' },
    { value: 3, name: 'Marzo' },
    { value: 4, name: 'Abril' },
    { value: 5, name: 'Mayo' },
    { value: 6, name: 'Junio' },
    { value: 7, name: 'Julio' },
    { value: 8, name: 'Agosto' },
    { value: 9, name: 'Septiembre' },
    { value: 10, name: 'Octubre' },
    { value: 11, name: 'Noviembre' },
    { value: 12, name: 'Diciembre' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // inicializamos el form aquí, después de que fb ya está disponible
    this.form = this.fb.group({
      year: [new Date().getFullYear()],
      month: [new Date().getMonth() + 1]
    });
  }

  applyFilter(): void {
    this.filterChange.emit(this.form.value);
  }
}
