import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { LAYOUT, LayoutModule } from './layout.declaration';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Observable, ReplaySubject, map, shareReplay, tap } from 'rxjs';
import {
  PermissionSet,
  Workspace,
} from '../user/interfaces/permission-set.interface';
import { Router } from '@angular/router';
import { WORKSPACE_DICTIONARY } from './workspaces.dictionary';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  isExpanded = false;

  public selectedWorkspace?: Workspace;
  public selectedWorkspace$ = new ReplaySubject<Workspace | undefined>(1);

  get workspaceAllowed(): boolean {
    if (!this.selectedWorkspace) {
      return true;
    }
    return (
      this.userService.permissions?.workspaces.includes(
        this.selectedWorkspace
      ) || false
    );
  }
  get availableWorkspaces(): Workspace[] {
    return this.userService.permissions?.workspaces || [];
  }

  public mode: MatDrawerMode = 'side';
  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      tap((result) => {
        if (result.matches) {
          this.mode = 'over';
          this.isExpanded = false;
        } else {
          this.mode = 'side';
          this.isExpanded = true;
        }
      }),
      map((result) => result.matches),
      shareReplay()
    );
  public isDesktop$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Large)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private userService: UserService,
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    // listen to permission changes
    this.userService.permissions$.subscribe(this.handlePermissionChange);
    // when workspace changes, we need to check if the route is still allowed
    this.selectedWorkspace$.subscribe((workspace) => {
      if (
        workspace &&
        !this.checkIfRouteIsAllowedInWorkspace(this.router.url, workspace)
      ) {
        console.log('WORKSPACE NOT ALLOWED');
        this.router.navigate(['/']);
      }
    });
  }

  get authorizedLayout(): LayoutModule[] {
    const modules = this.getModules();
    return this.filterModules(modules);
  }

  toggleDrawer() {
    this.isExpanded = !this.isExpanded;
  }

  retrieveWorkspace(): boolean {
    const retreivedWorkspace = localStorage.getItem(
      'myynov-selected-workspace'
    );
    if (
      retreivedWorkspace &&
      this.userService.permissions?.workspaces.includes(
        retreivedWorkspace as Workspace
      )
    ) {
      this.selectWorkspace(retreivedWorkspace as Workspace);
      return true;
    }
    return false;
  }
  selectWorkspace(workspace?: Workspace) {
    if (!workspace) {
      return localStorage.removeItem('myynov-selected-workspace');
    }
    localStorage.setItem('myynov-selected-workspace', workspace);
    this.selectedWorkspace$.next(workspace);
    this.selectedWorkspace = workspace;
  }

  private handlePermissionChange = (permissions: PermissionSet) => {
    if (!this.retrieveWorkspace()) {
      // if there is only one workspace, we select it by default
      if (permissions.workspaces.length === 1) {
        this.selectWorkspace(permissions.workspaces[0]);
      }
      // if the selected workspace is not allowed, we reset it
      if (
        this.selectedWorkspace &&
        !permissions.workspaces.includes(this.selectedWorkspace)
      ) {
        this.selectedWorkspace = undefined;
        this.selectWorkspace(undefined);
      }
    }
  };

  getWorkspaceName(workspace?: Workspace) {
    if (!workspace) return '';
    return WORKSPACE_DICTIONARY[workspace];
  }

  private getModules() {
    if (!this.userService.permissions) {
      return [];
    }
    return LAYOUT.filter((item) => {
      const hasPermision = this.userService.permissions?.modules.some(
        (userModule) => userModule === item.module
      );
      // if the module is workspace specific, we need to check if the user has access to the workspace and if the workspace is currently selected
      if (item.workspaces) {
        return (
          hasPermision &&
          item.workspaces.some((workspace) =>
            this.userService.permissions?.workspaces.includes(workspace)
          ) &&
          this.selectedWorkspace &&
          this.userService.permissions?.workspaces.includes(
            this.selectedWorkspace
          ) &&
          item.workspaces.includes(this.selectedWorkspace)
        );
      }

      return hasPermision;
    });
  }

  private filterModules(layoutModules: LayoutModule[]) {
    // If there's no disabled feature which matches the module name, we can skip the logic altogether
    for (const layoutModule of layoutModules) {
      const disabledModulesAndFeatures =
        this.userService.permissions?.disabledFeatures.filter(
          (disabledFeature) => disabledFeature.module === layoutModule.module
        );
      if (disabledModulesAndFeatures?.length) {
        for (const disabledModuleAndFeature of disabledModulesAndFeatures) {
          layoutModule.children = layoutModule.children.filter(
            (layoutChild) =>
              !disabledModuleAndFeature.features.includes(layoutChild.feature)
          );
        }
      }
    }
    return layoutModules;
  }

  private checkIfRouteIsAllowedInWorkspace(url: string, workspace: Workspace) {
    const parts = url.slice(1).split('/');
    if (!parts.length) {
      // let the router take care of the root url
      return true;
    }

    if (!this.selectedWorkspace) {
      // let the workspace selector take care of it
      return true;
    }

    const module = LAYOUT.find((module) => module.route === parts[0]);

    if (!module?.workspaces) {
      // module is not scoped
      return true;
    }
    if (module.workspaces?.includes(workspace)) {
      return true;
    }

    return false;
  }
}
