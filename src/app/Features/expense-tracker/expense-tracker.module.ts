import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseTrackerRoutingModule } from './expense-tracker-routing.module';
import { ExpenseTrackerComponent } from './Components/expense-tracker/expense-tracker.component';
import { SharedModule } from '../shared/shared.module';
import { CalendarComponent } from './Components/calendar/calendar.component';
import { SideBar } from '../shared/Models/side-bar.model';
import { SideBarStoreService } from '../../Services/side-bar-store.service';

@NgModule({
  declarations: [ExpenseTrackerComponent, CalendarComponent],
  imports: [CommonModule, ExpenseTrackerRoutingModule, SharedModule],
})
export class ExpenseTrackerModule {
  state: SideBar = {
    header: 'Expenses',
    items: [
      {
        icon: 'fas fa-calendar-days',
        route: '/expense-tracker/calendar',
        title: 'Calendar',
      },
    ],
  };

  constructor(private sideBarStore: SideBarStoreService) {
    this.sideBarStore.updateSideBar(this.state);
  }
}
