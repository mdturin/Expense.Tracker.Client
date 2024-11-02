import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogActions } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [FormsModule, MatDialogModule, MatButtonModule, MatDialogActions],
  providers: [],
})
export class SharedModule {}
