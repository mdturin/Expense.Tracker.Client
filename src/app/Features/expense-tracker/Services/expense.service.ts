// expense.service.ts
import { Injectable } from '@angular/core';
import { Expense, Unit } from '../../shared/Models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private expenses: { [key: string]: Expense[] } = {
  };

  private nextId: number = 5; // Incremental ID for new expenses

  constructor() { }

  getExpensesByDate(date: Date): Expense[] {
    const dateKey = this.formatDate(date);
    return this.expenses[dateKey] || [];
  }

  addExpense(date: Date, expense: Expense): void {
    const dateKey = this.formatDate(date);
    if (!this.expenses[dateKey]) {
      this.expenses[dateKey] = [];
    }
    expense.id = this.nextId++;
    this.expenses[dateKey].push(expense);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
  }
}
