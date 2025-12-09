import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../model/expense.model';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './expense-form.component.html'
})
export class ExpenseFormComponent implements OnInit {

  expenseForm!: FormGroup;
  expenseId?: number;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private service: ExpenseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();

    this.expenseId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.expenseId) {
      this.isEditMode = true;
      this.loadExpense(this.expenseId);
    }
  }

  createForm(): void {
    this.expenseForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(0.01)]],
      description: ['', Validators.required],
      expenseDate: ['', Validators.required]
    });
  }

  loadExpense(id: number): void {
    this.service.getExpenseById(id).subscribe(expense => {
      this.expenseForm.patchValue(expense);
    });
  }

  onSubmit(): void {
    if (this.expenseForm.invalid) return;

    const expense: Expense = this.expenseForm.value;

    if (this.isEditMode) {
      this.service.updateExpense(this.expenseId!, expense)
        .subscribe(() => this.router.navigate(['/expenses']));
    } else {
      this.service.createExpense(expense)
        .subscribe(() => this.router.navigate(['/expenses']));
    }
  }
}
