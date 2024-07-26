import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LayoutService } from '../../../services/layout/layout.service';
import { LayoutModule } from '../../../services/layout/layout.declaration';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-accordion',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './menu-accordion.component.html',
  styleUrls: ['./menu-accordion.component.scss'],
})
export class MenuAccordionComponent {
  @Input({ required: true }) menuItems!: LayoutModule[];
  @Input() collapsed = false;

  constructor(private router: Router, public layoutService: LayoutService) {}

  hasChildActive(parentRoute: string) {
    return this.router.url.startsWith(`/${parentRoute}`);
  }

  getPath(parentRoute: string, childRoute: string) {
    return `/${parentRoute}/${childRoute}`;
  }

  isRootItem(item: LayoutModule) {
    console.log(item)
    return !item.children.length;
  }
}
