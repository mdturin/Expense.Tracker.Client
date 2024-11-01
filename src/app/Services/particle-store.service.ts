import { Injectable } from '@angular/core';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root',
})
export class ParticleStoreService extends StateService<any> {
  constructor() {
    super({});
  }

  getState(name: string){
    return this.select(state => state[name]);
  }

  setStateValue(name: string, value: any){
    this.setState({[name]: value});
  };
}
