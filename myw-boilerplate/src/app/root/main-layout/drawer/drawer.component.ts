import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../services/user/interfaces/user.interface';
import { MenuAccordionComponent } from '../menu-accordion/menu-accordion.component';
import { LayoutModule } from '../../../services/layout/layout.declaration';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [MenuAccordionComponent],
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent {
  @Input({ required: true }) user!: User;
  @Input({ required: true }) topMenuItems!: LayoutModule[];
  @Input({ required: true }) bottomMenuItems!: LayoutModule[];
  @Input() collapsed = false;

  constructor(private router: Router) {}

  home() {
    this.router.navigate(['/']);
  }
}
