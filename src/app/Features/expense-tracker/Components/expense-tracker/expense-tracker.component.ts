import { Component, OnInit } from '@angular/core';
import { SideBarItem } from '../../../shared/Models/side-bar-item.model';
import { SideBarStoreService } from '../../../../Services/side-bar-store.service';
import { SideBar } from '../../../shared/Models/side-bar.model';

@Component({
  selector: 'app-expense-tracker',
  templateUrl: './expense-tracker.component.html',
  styleUrl: './expense-tracker.component.css'
})
export class ExpenseTrackerComponent {}
