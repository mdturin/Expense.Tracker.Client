import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'expense-tracker',
    loadChildren: () =>
      import('./Features/expense-tracker/expense-tracker.module').then(
        (m) => m.ExpenseTrackerModule
      ),
  },
  // Add other routes here
  { path: '', redirectTo: '/expense-tracker', pathMatch: 'full' },
  { path: '**', redirectTo: '/expense-tracker' },
];
