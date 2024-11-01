import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './Components/side-bar/side-bar.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SideBarComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [SideBarComponent]
})
export class SharedModule { }
