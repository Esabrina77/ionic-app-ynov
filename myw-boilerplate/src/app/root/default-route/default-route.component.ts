import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LayoutService } from '../../services/layout/layout.service';
import { Workspace } from '../../services/user/interfaces/permission-set.interface';

@Component({
  selector: 'app-default-route',
  standalone: true,
  imports: [],
  templateUrl: './default-route.component.html',
  styleUrl: './default-route.component.scss',
})
export class DefaultRouteComponent implements OnDestroy {
  private subscription?: Subscription;

  constructor(private layoutService: LayoutService, private router: Router) {
    this.subscription = this.layoutService.selectedWorkspace$.subscribe(
      (workspace) => {
        switch (workspace) {
          case Workspace.Student:
            this.router.navigate(['/dashboard-student']);
            break;
          case Workspace.Collaborator:
            this.router.navigate(['/dashboard-admin']);
            break;
          default:
            this.router.navigate(['/404']);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
