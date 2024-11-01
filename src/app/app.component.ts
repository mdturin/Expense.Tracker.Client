import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { SharedModule } from './Features/shared/shared.module';
import { SideBarComponent } from './Components/side-bar/side-bar.component';
import { ParticleStoreService } from './Services/particle-store.service';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavBarComponent,
    SharedModule,
    SideBarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy{
  sideBarIsOpend = true;
  title = 'ExpenseTracker';

  private ngUnsubscribe = new Subject<void>();
  constructor(private particleStore: ParticleStoreService){}

  ngOnInit(): void {
    this.particleStore
      .getState('SideBar')
      .pipe(
        takeUntil(this.ngUnsubscribe),
        filter((sideBarIsOpend) => sideBarIsOpend !== undefined)
      )
      .subscribe({
        next: (sideBarIsOpend) => (this.sideBarIsOpend = !!sideBarIsOpend),
        error: console.error,
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
