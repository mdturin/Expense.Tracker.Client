import { Component, OnInit } from '@angular/core';
import { ParticleStoreService } from '../../../../Services/Store/particle-store.service';
import { ExpenseTrackerConstant } from '../../../../Constants/expense-tracker.constant';
import { ApiService } from '../../../../Services/api.service';

@Component({
  selector: 'app-add-expense-items',
  templateUrl: './add-expense-items.component.html',
  styleUrl: './add-expense-items.component.css',
})
export class AddExpenseItemsComponent implements OnInit {
  items: string[] = [];
  modelReady: boolean = false;
  constructor(
    private particleStore: ParticleStoreService,
    private api: ApiService
  ) {}

  // Method to reload the listing component
  reloadListingComponent() {
    this.modelReady = false;
    setTimeout(() => {
      this.modelReady = true;
    }, 0); // Small delay to allow Angular to re-render
  }

  ngOnInit(): void {
    this.particleStore.getState(ExpenseTrackerConstant.ExpenseItem).subscribe({
      next: (value: string[]) => {
        this.items = value ?? [];
        this.reloadListingComponent();
      },
      error: console.error,
    });
  }

  onAddItem(item: string) {
    this.api.addExpenseItem(item).subscribe({
      next: () => {
        this.particleStore.setStateValue(ExpenseTrackerConstant.ExpenseItem, [
          ...this.items,
          item,
        ]);
      },
      error: console.error,
    });
  }

  onEditItem(item: string) {}

  onDeleteItem(item: string) {
    this.api.deleteExpenseItem(item).subscribe({
      next: () => {
        const index = this.items.findIndex((i) => i === item);
        if (index === -1) {
          return;
        }

        this.items.splice(index, 1);
        this.particleStore.setStateValue(
          ExpenseTrackerConstant.ExpenseItem,
          this.items
        );
      },
      error: console.error,
    });
  }
}
