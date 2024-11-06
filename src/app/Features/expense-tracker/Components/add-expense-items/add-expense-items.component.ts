import { Component } from '@angular/core';

@Component({
  selector: 'app-add-expense-items',
  templateUrl: './add-expense-items.component.html',
  styleUrl: './add-expense-items.component.css'
})
export class AddExpenseItemsComponent {
  items = ["abc", "def", "ad"]
}
