import { Component } from '@angular/core';
import { DialogView } from '../../../shared/Models/dialog-view.model';
import { DialogModel } from '../../../shared/Models/dialog.model';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.css',
})
export class AddExpenseComponent implements DialogView {
  data!: DialogModel;
  newExpense: any = {};

  onOkClicked() {
    return this.newExpense;
  }
}
