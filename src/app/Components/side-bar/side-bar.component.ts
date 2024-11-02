import { Component, OnDestroy } from '@angular/core';
import { SideBarStoreService } from '../../Services/Store/side-bar-store.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SideBarItem } from '../../Features/shared/Models/side-bar-item.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent implements OnDestroy{
  header: string = '';
  items: SideBarItem[] = [];
  private ngUnsubscribe = new Subject<void>();
  constructor(private sideBarStore: SideBarStoreService) {
    this.sideBarStore.sideBarItems.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe({
      next: (items) => this.items = items,
      error: console.error
    });

    this.sideBarStore.sideBarHeader.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe({
      next: (header) => this.header = header,
      error: console.error
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
