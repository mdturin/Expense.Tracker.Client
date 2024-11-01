import { Component, Input } from '@angular/core';
import { SideBarItem } from '../../Models/side-bar-item.model';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  @Input() header!: string;
  @Input() items: SideBarItem[] = [];
}
