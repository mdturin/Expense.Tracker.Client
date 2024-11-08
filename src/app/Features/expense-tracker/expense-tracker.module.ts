import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseTrackerRoutingModule } from './expense-tracker-routing.module';
import { ExpenseTrackerComponent } from './Components/expense-tracker/expense-tracker.component';
import { SharedModule } from '../shared/shared.module';
import { CalendarComponent } from './Components/calendar/calendar.component';
import { SideBar } from '../shared/Models/side-bar.model';
import { SideBarStoreService } from '../../Services/Store/side-bar-store.service';
import { CartComponent } from './Components/cart/cart.component';
import { AddExpenseComponent } from './Components/add-expense/add-expense.component';
import { ExpenseService } from './Services/expense.service';
import { DynamicComponentHelperService } from '../../Helpers/dynamic-component-helper.service';
import { AddExpenseItemsComponent } from './Components/add-expense-items/add-expense-items.component';
import { SearchableListingItemsComponent } from '../../Components/searchable-listing-items/searchable-listing-items.component';
import { ParticleStoreService } from '../../Services/Store/particle-store.service';
import { ExpenseTrackerConstant } from '../../Constants/expense-tracker.constant';

@NgModule({
  declarations: [
    ExpenseTrackerComponent,
    CalendarComponent,
    CartComponent,
    AddExpenseComponent,
    AddExpenseItemsComponent,
  ],
  imports: [
    CommonModule,
    ExpenseTrackerRoutingModule,
    SharedModule,
    SearchableListingItemsComponent,
  ],
})
export class ExpenseTrackerModule {
  state: SideBar = {
    header: 'Expenses',
    items: [
      {
        icon: 'fas fa-square-plus',
        route: '/expense-tracker/add-items',
        title: 'Add Items',
      },
      {
        icon: 'fas fa-calendar-days',
        route: '/expense-tracker/calendar',
        title: 'Calendar',
      },
      {
        icon: 'fas fa-gear',
        route: '/expense-tracker/settings',
        title: 'Settings',
      },
    ],
  };

  constructor(
    // dchs: DynamicComponentHelperService,
    expenseService: ExpenseService,
    sideBarStore: SideBarStoreService
  ) {
    sideBarStore.updateSideBar(this.state);
    expenseService.loadAllExpenseItems();
    expenseService.loadAllExpenses();
    // this.registerComponents(dchs);
  }

  // private registerComponents(service: DynamicComponentHelperService) {
  //   service.register('CalendarComponent', CalendarComponent);
  // }
}
