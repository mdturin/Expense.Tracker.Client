// src/app/services/dialog.service.ts
import { Injectable } from '@angular/core';
import { DialogModel } from '../Features/shared/Models/dialog.model';
import { MatDialog } from '@angular/material/dialog';
import { OkCancleDialogComponent } from '../Components/Dialog/ok-cancle-dialog/ok-cancle-dialog.component';
import { filter, Observable, take } from 'rxjs';
import { StringInputDialogComponent } from '../Components/Dialog/string-input-dialog/string-input-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}
  showOkCancelDialog(dialogModel: DialogModel, width: string): Observable<any> {
    return this.dialog
      .open(OkCancleDialogComponent, {
        width: width,
        data: dialogModel,
      })
      .afterClosed()
      .pipe(
        take(1),
        filter((result) => result !== undefined)
      );
  }

  showStringInputDialog(dialogModel: DialogModel, width: string){
    dialogModel.component = StringInputDialogComponent;
    return this.showOkCancelDialog(dialogModel, width);
  }
}
