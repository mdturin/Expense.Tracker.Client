import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogModel } from '../../../Features/shared/Models/dialog.model';
import { SharedModule } from '../../../Features/shared/shared.module';
import { DialogView } from '../../../Features/shared/Models/dialog-view.model';

@Component({
  selector: 'app-ok-cancle-dialog',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './ok-cancle-dialog.component.html',
  styleUrl: './ok-cancle-dialog.component.css',
})
export class OkCancleDialogComponent implements OnInit {
  dialogView: DialogView | undefined;

  @ViewChild('modal', { static: true, read: ViewContainerRef })
  viewContainerRef: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogModel,
    private dialogRef: MatDialogRef<OkCancleDialogComponent>
  ) {}

  ngOnInit(): void {
    const component = this.viewContainerRef.createComponent(
      this.data.component
    );
    this.dialogView = component.instance as DialogView;
    this.dialogView.data = this.data;
  }

  onConfirm(): void {
    let output = this.dialogView?.onOkClicked();
    this.dialogRef.close(output);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
