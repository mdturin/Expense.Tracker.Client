import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Expense } from '../../../shared/Models/expense.model';
import { ExpenseService } from '../../Services/expense.service';
import { DialogService } from '../../../../Services/dialog.service';
import { AddExpenseComponent } from '../add-expense/add-expense.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnChanges {
  @Input() selectedDate!: Date;
  expenses: Expense[] = [];

  constructor(
    private dialogService: DialogService,
    private expenseService: ExpenseService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDate']) {
      this.loadExpenses();
    }
  }

  loadExpenses(): void {
    this.expenses = this.expenseService.getExpensesByDate(this.selectedDate);
  }

  openAddExpense(): void {
    this.dialogService
      .showOkCancelDialog({
        component: AddExpenseComponent,
        title: 'Expenses',
        input: {},
      })
      .subscribe({
        next: (result: Expense) => {
          this.expenses.push(result);
        },
      });
  }
}
