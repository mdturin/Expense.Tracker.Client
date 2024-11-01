import { Component } from '@angular/core';
import { SideBarItem } from '../../../shared/Models/side-bar-item.model';

@Component({
  selector: 'app-expense-tracker',
  templateUrl: './expense-tracker.component.html',
  styleUrl: './expense-tracker.component.css'
})
export class ExpenseTrackerComponent {
  items: SideBarItem[] = [
    {
      icon: 'fas fa-calendar-days',
      route: 'calender',
      title: 'Calendar'
    }
  ]
}
