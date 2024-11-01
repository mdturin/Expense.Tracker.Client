import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CalendarDate } from '../../../shared/Models/calendar-date.model';
import { Expense, Unit } from '../../../shared/Models/expense.model';
import { ExpenseService } from '../../Services/expense.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnChanges {
  @Input() selectedDate!: Date;

  showModal: boolean = false;
  newExpense: Partial<Expense> = {};
  expenses: Expense[] = [];

  constructor(private expenseService: ExpenseService){}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDate']) {
      this.loadExpenses();
    }
  }

  loadExpenses(): void {
    this.expenses = this.expenseService.getExpensesByDate(this.selectedDate);
  }

  openAddExpense(): void {
    this.showModal = true;
    this.newExpense = {};
  }

  closeAddExpense(): void {
    this.showModal = false;
  }

  addExpense(): void {
    if (this.newExpense.description && this.newExpense.amount !== undefined && this.newExpense.quantity !== undefined && this.newExpense.unit) {
      this.expenseService.addExpense(this.selectedDate, this.newExpense as Expense);
      this.loadExpenses();
      this.closeAddExpense();
    } else {
      alert('Please fill in all fields.');
    }
  }
}
