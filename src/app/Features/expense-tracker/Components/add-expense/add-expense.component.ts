import { Component } from '@angular/core';
import { DialogView } from '../../../shared/Models/dialog-view.model';
import { DialogModel } from '../../../shared/Models/dialog.model';
import { Expense, Unit } from '../../../shared/Models/expense.model';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.css'
})
export class AddExpenseComponent implements DialogView {
  data!: DialogModel;
  newExpense: Expense = {
    id: 0,
    amount: 0,
    description: '',
    quantity: 0,
    unit: Unit.Kg
  };

  onOkClicked() {
    throw new Error('Method not implemented.');
  }
  
}
