import { Component, Input } from '@angular/core';
import { ContextMenuItem } from './_shared/context-menu-item';
import { Position } from '../_shared/position';

@Component({
  selector: 'dawjs-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent {

  @Input() itemsGroup: ContextMenuItem[][];
  @Input() clientPosition: Position;
  
}
