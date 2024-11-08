import { Component, OnInit } from '@angular/core';
import { DialogView } from '../../../shared/Models/dialog-view.model';
import { DialogModel } from '../../../shared/Models/dialog.model';
import { ParticleStoreService } from '../../../../Services/Store/particle-store.service';
import { ExpenseTrackerConstant } from '../../../../Constants/expense-tracker.constant';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.css',
})
export class AddExpenseComponent implements DialogView, OnInit {
  data!: DialogModel;
  modelReady = false;
  newExpense: any = {};
  expenseItems: string[] = [];
  filteredItems: string[] = [];

  expenseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private particleStore: ParticleStoreService
  ) {
    this.particleStore.getState(ExpenseTrackerConstant.ExpenseItem).subscribe({
      next: (items: string[]) => {
        this.expenseItems = items;
        this.filteredItems = items;
        this.modelReady = true;
      },
    });

    this.expenseForm = this.fb.group({
      description: [''],
      amount: [''],
      quantity: [''],
      unit: [''],
    });
  }

  ngOnInit(): void {
    this.data.disabled = true;
    this.expenseForm.valueChanges.subscribe((values) => {
      this.data.disabled = this.expenseForm.invalid;
    });
    
    this.expenseForm.get('description')?.valueChanges.subscribe((value) => {
      value = value?.toLowerCase();
      if (value) {
        this.filteredItems = this.expenseItems.filter((item) =>
          item.toLowerCase().startsWith(value)
        );
      } else this.filteredItems = [];
    });
  }

  onOkClicked() {
    return this.newExpense;
  }
}
