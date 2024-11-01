import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ParticleStoreService } from '../../Services/particle-store.service';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnDestroy {
  sideBarIsOpend: boolean = true;
  private ngUnsubscribe = new Subject<void>();
  constructor(private particleStore: ParticleStoreService) {
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

  toggleSideBar() {
    this.particleStore.setStateValue('SideBar', !this.sideBarIsOpend);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
