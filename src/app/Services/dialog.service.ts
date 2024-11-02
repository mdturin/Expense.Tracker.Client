// src/app/services/dialog.service.ts
import {
  Injectable,
  Injector,
  ComponentRef,
  Type,
  InjectionToken,
} from '@angular/core';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { DialogComponent } from '../Components/dialog/dialog.component';

export const DIALOG_DATA = new InjectionToken<any>('DIALOG_DATA');

// Dialog Reference
export class DialogRef<T = any> {
  constructor(private overlayRef: OverlayRef) {}

  close(result?: T): void {
    this.overlayRef.dispose();
  }

  afterClosed() {
    return this.overlayRef.detachments();
  }
}

// Dialog configuration interface
export interface DialogConfig {
  hasBackdrop?: boolean;
  backdropClass?: string;
  panelClass?: string;
  data?: any;
}

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  open<T>(component: Type<T>, config?: DialogConfig): DialogRef<T> {
    const overlayRef = this.createOverlay(config);
    const dialogRef = new DialogRef<T>(overlayRef);
    const injector = this.createInjector(dialogRef, config?.data);
    const portal = new ComponentPortal(DialogComponent, null, injector);
    const componentRef: ComponentRef<DialogComponent> =
      overlayRef.attach(portal);
    componentRef.instance.childComponent = component;

    return dialogRef;
  }

  private createOverlay(config?: DialogConfig): OverlayRef {
    const overlayConfig = this.getOverlayConfig(config);
    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(config?: DialogConfig): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config?.hasBackdrop ?? true,
      backdropClass: config?.backdropClass ?? 'dialog-backdrop',
      panelClass: config?.panelClass ?? 'dialog-panel',
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy,
    });

    return overlayConfig;
  }

  private createInjector<T>(
    dialogRef: DialogRef<T>,
    data: any
  ): PortalInjector {
    const injectionTokens = new WeakMap();
    injectionTokens.set(DialogRef, dialogRef);
    injectionTokens.set(DIALOG_DATA, data);
    return new PortalInjector(this.injector, injectionTokens);
  }
}
