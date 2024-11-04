import {
  Injectable,
  Injector,
  Type,
  ViewContainerRef,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DynamicComponentHelperService {
  private components: { [key: string]: Type<any> } = {};
  constructor(private injector: Injector) {}

  register(key: string, type: Type<any>) {
    this.components[key] = type;
  }

  loadComponent(key: string, viewContainerRef: ViewContainerRef) {
    const componentType = this.components[key];
    if (!componentType)
      throw new Error(`Component for key '${key}' is not registered.`);

    return viewContainerRef.createComponent(componentType, {
      injector: this.injector,
    });
  }
}
