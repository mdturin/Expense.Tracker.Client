import { ComponentType } from '@angular/cdk/portal';
import { Component, Inject, ViewChild, ViewContainerRef } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '../../Services/dialog.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [],
  styleUrl: './dialog.component.css',
  template: `
    <div class="dialog-overlay" (click)="onBackdropClick()">
      <div class="dialog-container" (click)="$event.stopPropagation()">
        <button class="dialog-close-button" (click)="dialogRef.close()">
          ×
        </button>
        <ng-template #dialogContent></ng-template>
      </div>
    </div>
  `,
})
export class DialogComponent {
  @ViewChild('dialogContent', { read: ViewContainerRef, static: true })
  dialogContent!: ViewContainerRef;

  childComponent!: ComponentType<any>;

  constructor(
    public dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.childComponent) {
      this.dialogContent.clear();
      this.dialogContent.createComponent(this.childComponent, {
        injector: this.dialogContent.injector,
      });
    }
  }

  onBackdropClick(): void {
    this.dialogRef.close();
  }
}
