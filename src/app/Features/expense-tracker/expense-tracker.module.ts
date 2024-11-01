import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseTrackerRoutingModule } from './expense-tracker-routing.module';
import { ExpenseTrackerComponent } from './Components/expense-tracker/expense-tracker.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ExpenseTrackerComponent
  ],
  imports: [
    CommonModule,
    ExpenseTrackerRoutingModule,
    SharedModule
]
})
export class ExpenseTrackerModule { }
