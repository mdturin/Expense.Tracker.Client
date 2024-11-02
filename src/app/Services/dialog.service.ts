// src/app/services/dialog.service.ts
import { Injectable } from '@angular/core';
import { DialogModel } from '../Features/shared/Models/dialog.model';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { OkCancleDialogComponent } from '../Components/Dialog/ok-cancle-dialog/ok-cancle-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}
  showOkCancelDialog(dialogModel: DialogModel): void {
    this.dialog.open(OkCancleDialogComponent, {
      width: '400px',
      data: dialogModel
    }).afterClosed().subscribe({
      next: console.log
    });
  }
}
