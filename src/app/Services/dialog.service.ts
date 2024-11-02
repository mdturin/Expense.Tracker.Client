// src/app/services/dialog.service.ts
import { Injectable } from '@angular/core';
import { DialogModel } from '../Features/shared/Models/dialog.model';
import { MatDialog } from '@angular/material/dialog';
import { OkCancleDialogComponent } from '../Components/Dialog/ok-cancle-dialog/ok-cancle-dialog.component';
import { filter, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}
  showOkCancelDialog(dialogModel: DialogModel): Observable<any> {
    return this.dialog
      .open(OkCancleDialogComponent, {
        width: '400px',
        data: dialogModel,
      })
      .afterClosed()
      .pipe(
        take(1),
        filter((result) => result !== undefined)
      );
  }
}
