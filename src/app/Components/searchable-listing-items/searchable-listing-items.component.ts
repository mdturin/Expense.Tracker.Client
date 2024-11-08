import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../Features/shared/shared.module';
import { SnackBarService } from '../../Services/snack-bar.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DialogService } from '../../Services/dialog.service';
import { DialogModel } from '../../Features/shared/Models/dialog.model';

@Component({
  selector: 'app-searchable-listing-items',
  standalone: true,
  imports: [FormsModule, CommonModule, SharedModule],
  templateUrl: './searchable-listing-items.component.html',
  styleUrl: './searchable-listing-items.component.css',
})
export class SearchableListingItemsComponent implements OnInit {
  @Input() items: string[] = [];
  @Output() addItem = new EventEmitter<string>();
  @Output() editItem = new EventEmitter<string>();
  @Output() deleteItem = new EventEmitter<string>();

  filteredItems: string[] = [];
  searchTerm: string = '';

  constructor(
    private snackBar: SnackBarService,
    private cdr: ChangeDetectorRef,
    private dialog: DialogService
  ) {}

  ngOnInit(): void {
    this.filteredItems = this.items;
  }

  onSearchKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onFilterItems();
    }
  }

  onFilterItems() {
    this.filteredItems = this.items.filter((item) => {
      return item.toLowerCase().startsWith(this.searchTerm.toLowerCase());
    });
  }

  onAddItem() {
    if (
      this.filteredItems.some(
        (item) => item.toLowerCase() === this.searchTerm.toLowerCase()
      )
    ) {
      this.snackBar.showSnackBarMessage('Item already exists!');
      return;
    }

    this.dialog
      .showStringInputDialog(
        new DialogModel({
          title: 'Add Item',
          cancleCaption: 'Cancle',
          okCaption: 'Add',
          input: {
            title: 'Item Name',
            invalidateNames: this.items,
            errorMessage: 'Item already exists!',
          },
          disabled: true
        }),
        '400px'
      )
      .subscribe({
        next: (itemName) => {
          if(!itemName) return;
          this.addItem.emit(itemName);
        }
      });
    // this.items.push(this.searchTerm);
    // this.filteredItems = [...this.items];
    // this.snackBar.showSnackBarMessage('Item added successfully!');
    // this.addItem.emit(this.searchTerm);
    // this.searchTerm = '';
  }

  onEditItem(index: number) {
    let item = this.filteredItems[index];
    let itemIndex = this.items.findIndex((i) => i === item);
    if (itemIndex !== -1) {
      this.items[itemIndex] = this.searchTerm;
      this.filteredItems = [...this.items];
      this.editItem.emit(this.searchTerm);
    }
  }

  onDeleteItem(index: number) {
    let item = this.filteredItems[index];
    let itemIndex = this.items.findIndex((i) => i === item);
    if (itemIndex !== -1) {
      this.items.splice(itemIndex, 1);
      this.cdr.detectChanges();
      this.filteredItems = [...this.items];
      this.deleteItem.emit(item);
    }
  }

  // Method to handle the drop event and reorder items
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.filteredItems,
      event.previousIndex,
      event.currentIndex
    );
  }
}
