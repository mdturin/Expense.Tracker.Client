import { Injectable } from '@angular/core';
import { StateService } from './state.service';
import { SideBar } from '../Features/shared/Models/side-bar.model';

const initialState: SideBar = {
  header: '',
  items: [],
};

@Injectable({
  providedIn: 'root',
})
export class SideBarStoreService extends StateService<SideBar> {
  sideBarItems = this.select((state) => state.items);
  sideBarHeader = this.select((state) => state.header);

  constructor() {
    super(initialState);
  }

  updateSideBar(state: SideBar){
    this.setState(state);
  }
}
