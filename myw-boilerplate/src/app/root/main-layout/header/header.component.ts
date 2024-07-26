import { Component, EventEmitter, Output } from '@angular/core';
import { LayoutService } from '../../../services/layout/layout.service';
import { BrandingService } from '../../../services/branding/branding.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() toggleMenu = new EventEmitter();
  @Output() logoutClick = new EventEmitter();
  @Output() logoClick = new EventEmitter();

  constructor(
    public layoutService: LayoutService,
    public brandingService: BrandingService
  ) {}

  onToggleMenu() {
    this.toggleMenu.emit();
  }

  onLogoutClick() {
    this.logoutClick.emit();
  }

  onLogoClick() {
    this.logoClick.emit();
  }
}
