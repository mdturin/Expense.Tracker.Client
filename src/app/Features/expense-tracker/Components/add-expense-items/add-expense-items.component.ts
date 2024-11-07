import { Component, OnInit } from '@angular/core';
import { ParticleStoreService } from '../../../../Services/Store/particle-store.service';
import { ExpenseTrackerConstant } from '../../../../Constants/expense-tracker.constant';

@Component({
  selector: 'app-add-expense-items',
  templateUrl: './add-expense-items.component.html',
  styleUrl: './add-expense-items.component.css',
})
export class AddExpenseItemsComponent implements OnInit {
  items: string[] = [];
  modelReady: boolean = false;
  constructor(private particleStore: ParticleStoreService) {}

  ngOnInit(): void {
    this.particleStore.getState(ExpenseTrackerConstant.ExpenseItem).subscribe({
      next: (value: string[]) => {
        this.items = value ?? [];
        this.modelReady = true;
      },
      error: console.error,
    });
  }
}
