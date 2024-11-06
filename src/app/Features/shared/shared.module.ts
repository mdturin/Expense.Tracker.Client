import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialogModule,
  MatDialogActions,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatCommonModule,
  ],
  exports: [
    FormsModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogTitle,
    MatCommonModule,
    MatSnackBarModule,
  ],
  providers: [],
})
export class SharedModule {}
