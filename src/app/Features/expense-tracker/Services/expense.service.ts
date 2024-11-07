// expense.service.ts
import { Injectable } from '@angular/core';
import { Expense } from '../../shared/Models/expense.model';
import { ApiService } from '../../../Services/api.service';
import { getFormattedDate } from '../../../Utilities/date.utility';
import { take } from 'rxjs';
import { ParticleStoreService } from '../../../Services/Store/particle-store.service';
import { ExpenseTrackerConstant } from '../../../Constants/expense-tracker.constant';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private maxId = 1;
  private expenses: { [key: string]: Expense[] } = {};

  constructor(
    private apiService: ApiService,
    private particleStore: ParticleStoreService
  ) {}

  private addExpenseItem(dateKey: string, expense: Expense) {
    if (!this.expenses[dateKey]) this.expenses[dateKey] = [];
    this.expenses[dateKey].push(expense);
  }

  loadAllExpenses() {
    this.apiService
      .getAllExpenses()
      .pipe(take(1))
      .subscribe({
        next: (expenses: Expense[]) => {
          console.log(expenses);
          expenses.forEach((expense) => {
            let dateKey = getFormattedDate(expense.date!);
            this.addExpenseItem(dateKey, expense);
            this.maxId = Math.max(this.maxId, expense.id!);
          });
        },
      });
  }

  loadAllExpenseItems() {
    this.apiService
      .getAllExpenseItems()
      .pipe(take(1))
      .subscribe({
        next: (items: string[]) => {
          console.log(items);
          this.particleStore.setStateValue(
            ExpenseTrackerConstant.ExpenseItem,
            items
          );
        },
      });
  }

  getExpenseAmount(date: Date) {
    return this.getExpensesByDate(date).reduce(
      (total, e) => total + e.amount,
      0
    );
  }

  getExpensesByDate(date: Date): Expense[] {
    return this.expenses[getFormattedDate(date)] ?? [];
  }

  addExpense(date: Date, expense: Expense): void {
    const dateKey = getFormattedDate(date);
    expense.id = this.maxId++;
    expense.date = new Date(dateKey);
    this.addExpenseItem(dateKey, expense);
    this.apiService.addExpense(expense).subscribe({
      next: console.log,
      error: console.error,
    });
  }
}
