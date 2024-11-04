import { NgModule } from '@angular/core';
import { ExpenseTrackerComponent } from './Components/expense-tracker/expense-tracker.component';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './Components/calendar/calendar.component';
import { AddExpenseItemsComponent } from './Components/add-expense-items/add-expense-items.component';
import { ExpenseSettingsComponent } from './Components/expense-settings/expense-settings.component';

const routes: Routes = [
  {
    path: '',
    component: ExpenseTrackerComponent,
  },
  { path: 'calendar', component: CalendarComponent },
  {
    path: 'add-items',
    component: AddExpenseItemsComponent,
  },
  {
    path: 'settings',
    component: ExpenseSettingsComponent,
  },

  // Add additional routes here if needed
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpenseTrackerRoutingModule {}
