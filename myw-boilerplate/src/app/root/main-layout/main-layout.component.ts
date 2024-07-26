import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LayoutService } from '../../services/layout/layout.service';
import { UserService } from '../../services/user/user.service';
import { WorkspaceSelectorComponent } from './workspace-selector/workspace-selector.component';
import { HeaderComponent } from './header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DrawerComponent } from './drawer/drawer.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    WorkspaceSelectorComponent,
    HeaderComponent,
    MatSidenavModule,
    DrawerComponent,
    RouterOutlet,
    MatProgressSpinnerModule,
    CommonModule,
  ],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
  constructor(
    public userService: UserService,
    public layoutService: LayoutService,
    private router: Router
  ) {}

  get topMenuItems() {
    return this.layoutService.authorizedLayout.filter(
      (item) => item.position === 'top'
    );
  }

  get bottomMenuItems() {
    return this.layoutService.authorizedLayout.filter(
      (item) => item.position === 'bottom'
    );
  }

  getPath(parentRoute: string, childRoute: string) {
    return `/${parentRoute}/${childRoute}`;
  }

  hasChildActive(parentRoute: string) {
    return this.router.url.startsWith(`/${parentRoute}`);
  }

  logout() {
    console.log('MOCK LOGOUT');
  }

  home() {
    this.router.navigate(['/']);
  }

  async toggleDrawer() {
    this.layoutService.isHandset$.subscribe((isHandset) => {
      if (isHandset) {
        this.layoutService.toggleDrawer();
      } else {
        const drawer = document.querySelector('#sidenav') as HTMLElement;
        if (drawer) {
          if (this.layoutService.isExpanded) {
            this.decreaseSize(drawer, 78, 260);
          } else {
            this.increaseSize(drawer, 260, 78);
          }
        }
      }
    });
  }

  private decreaseSize(
    drawer: HTMLElement,
    targetWidth: number,
    width: number
  ) {
    this.layoutService.isExpanded = false;
    requestAnimationFrame(() => {
      if (width > targetWidth) {
        drawer.style.width = `${width}px`;
        this.decreaseSize(drawer, targetWidth, width - 30);
      } else {
        drawer.style.width = `${targetWidth}px`;
      }
    });
  }

  private increaseSize(
    drawer: HTMLElement,
    targetWidth: number,
    width: number
  ) {
    this.layoutService.isExpanded = true;
    requestAnimationFrame(() => {
      if (width < targetWidth) {
        drawer.style.width = `${width}px`;
        this.increaseSize(drawer, targetWidth, width + 30);
      } else {
        drawer.style.width = `${targetWidth}px`;
      }
    });
  }
}
