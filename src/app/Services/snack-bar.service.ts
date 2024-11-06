import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  showSnackBarMessage(message: string, duration = 3000){
    this.snackBar.open(message, 'Close', {
      duration: duration,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }
}
