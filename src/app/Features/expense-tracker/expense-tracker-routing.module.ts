import { NgModule } from '@angular/core';
import { ExpenseTrackerComponent } from './Components/expense-tracker/expense-tracker.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ExpenseTrackerComponent },
  // Add additional routes here if needed
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpenseTrackerRoutingModule {}
