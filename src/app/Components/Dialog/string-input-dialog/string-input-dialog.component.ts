import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogView } from '../../../Features/shared/Models/dialog-view.model';
import { DialogModel } from '../../../Features/shared/Models/dialog.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { noneMatchStringArrayValidator } from '../../../Validators/string.validator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-string-input-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './string-input-dialog.component.html',
  styleUrl: './string-input-dialog.component.css',
  providers: [],
})
export class StringInputDialogComponent implements DialogView, OnInit {
  data!: DialogModel;
  inputControl: FormControl = new FormControl('');

  ngOnInit(): void {
    this.data.disabled = true;
    this.inputControl = new FormControl(
      this.data.input.value,
      noneMatchStringArrayValidator(this.data.input.invalidateNames)
    );
  }

  onChanges() {
    this.data.disabled =
      this.inputControl.invalid ?? this.inputControl.value === '';
  }

  getErrorMessage() {
    return this.data.input.errorMessage;
  }

  onOkClicked() {
    return this.inputControl.value;
  }
}
