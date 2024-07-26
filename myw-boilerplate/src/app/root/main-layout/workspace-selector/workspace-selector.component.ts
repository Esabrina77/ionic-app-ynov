import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { Workspace } from '../../../services/user/interfaces/permission-set.interface';
import { LayoutService } from '../../../services/layout/layout.service';
import { UserService } from '../../../services/user/user.service';
import { BrandingService } from '../../../services/branding/branding.service';

@Component({
  selector: 'app-workspace-selector',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule,
  ],
  templateUrl: './workspace-selector.component.html',
  styleUrl: './workspace-selector.component.scss',
})
export class WorkspaceSelectorComponent implements OnInit {
  @ViewChild('root', { static: true }) root?: ElementRef<HTMLDivElement>;
  selectedWorkspace?: Workspace;
  get background() {
    return `url(${this.brandingService.catalog.images.authBackground})`;
  }

  constructor(
    public readonly layoutService: LayoutService,
    private readonly userService: UserService,
    public brandingService: BrandingService
  ) {}

  ngOnInit(): void {
    if (this.root) {
      this.brandingService.style(this.root.nativeElement);
    }
  }

  selectWorkspace() {
    this.layoutService.selectWorkspace(this.selectedWorkspace);
  }
}
