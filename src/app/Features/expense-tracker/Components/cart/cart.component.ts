import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Expense } from '../../../shared/Models/expense.model';
import { ExpenseService } from '../../Services/expense.service';
import { DialogService } from '../../../../Services/dialog.service';
import { AddExpenseComponent } from '../add-expense/add-expense.component';
import { DialogModel } from '../../../shared/Models/dialog.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit, OnChanges, OnDestroy {
  @Input() selectedDate!: Date;
  @Output() onClose: EventEmitter<void> = new EventEmitter();

  modelReady = false;
  expenses: Expense[] = [];

  private ngUnsubscribes$ = new Subject<void>();
  constructor(
    private dialogService: DialogService,
    private expenseService: ExpenseService
  ) {}

  ngOnInit(): void {
    this.modelReady = false;
    this.loadExpenses();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDate']) {
      this.modelReady = false;
      this.loadExpenses();
    }
  }

  onCartClose() {
    this.onClose.emit();
  }

  loadExpenses(): void {
    this.expenses = this.expenseService.getExpensesByDate(this.selectedDate);
    this.modelReady = true;
  }

  openAddExpense(): void {
    const model = new DialogModel({
      title: 'Add Expense',
      component: AddExpenseComponent,
      okCaption: 'Add',
    });

    this.dialogService.showOkCancelDialog(model, '500px').subscribe({
      next: (result: Expense) => {
        this.expenses.push(result);
        this.expenseService.addExpense(this.selectedDate, result);
      },
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribes$.next();
    this.ngUnsubscribes$.complete();
  }
}
