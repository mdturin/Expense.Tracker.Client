import { Component, OnInit } from '@angular/core';
import { DialogView } from '../../../shared/Models/dialog-view.model';
import { DialogModel } from '../../../shared/Models/dialog.model';
import { ParticleStoreService } from '../../../../Services/Store/particle-store.service';
import { ExpenseTrackerConstant } from '../../../../Constants/expense-tracker.constant';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.css',
})
export class AddExpenseComponent implements DialogView, OnInit {
  data!: DialogModel;
  modelReady = false;
  newExpense: any = {};
  expenseItems: string[] = ['abc', 'def'];
  filteredItems: string[] = [];

  constructor(private particleStore: ParticleStoreService){}

  ngOnInit(): void {
    this.particleStore.getState(ExpenseTrackerConstant.ExpenseItem).subscribe({
      next: (items: string[]) => {
        this.expenseItems = items;
        this.filteredItems = items;
        this.modelReady = true;
      }
    })
  }

  onOkClicked() {
    return this.newExpense;
  }

  onDescriptionChanges(event: any) {
    let value = event?.target?.value?.toLowerCase();
    if (value) {
      this.filteredItems = this.expenseItems.filter(
        (item) => item.toLowerCase().startsWith(value)
      );
    } else this.filteredItems = [];
  }
}
