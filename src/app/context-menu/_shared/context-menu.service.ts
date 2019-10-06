import {
  Injectable,
  ComponentFactoryResolver,
  ComponentFactory,
  ComponentRef,
  ViewContainerRef }
from '@angular/core';
import { ContextMenuComponent } from '../context-menu.component';
import { ContextMenuItem } from './context-menu-item';
import { Position } from 'src/app/_shared/position';

@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {

  isToggled: boolean;
  private rootViewContainerRef: ViewContainerRef;
  private factory: ComponentFactory<ContextMenuComponent>;
  private componentRef: ComponentRef<ContextMenuComponent>;

  constructor(private factoryResolver: ComponentFactoryResolver) {
    this.factory = this.factoryResolver.resolveComponentFactory(ContextMenuComponent);
    this.isToggled = false;
  }

  setViewContainerRef(viewContainerRef: ViewContainerRef): void {
    this.rootViewContainerRef = viewContainerRef;
  }

  create(items: ContextMenuItem[][], event: MouseEvent): void {
    event.preventDefault();
    this.componentRef = this.factory.create(this.rootViewContainerRef.parentInjector);
    this.rootViewContainerRef.clear();
    this.rootViewContainerRef.insert(this.componentRef.hostView);
    this.componentRef.instance.itemsGroup = items;
    this.componentRef.instance.clientPosition = this.getClientPosition(event);
    this.isToggled = true;
  }

  remove(): void {
    this.componentRef.destroy();
    this.rootViewContainerRef.clear();
    this.isToggled = false;
  }

  private getClientPosition(event: MouseEvent): Position {
    const el: any = this.componentRef.location.nativeElement;
    const elWidth: number = el.getElementsByClassName("context-menu").item(0).clientWidth;
    if (event.clientX >= (window.innerWidth - elWidth)) {
      return { x: event.clientX - elWidth, y: event.clientY };
    } else {
      return { x: event.clientX, y: event.clientY };
    }
  }
}
