import { Injectable } from '@angular/core';
import { AsyncSubject, ReplaySubject, lastValueFrom, timeout } from 'rxjs';
import {
  AppModule,
  Apps,
  PermissionSet,
  Workspace,
} from './interfaces/permission-set.interface';
import { User } from './interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user?: User;
  public permissions?: PermissionSet;
  public permissions$ = new ReplaySubject<PermissionSet>(1);
  private permissionsReady$ = new AsyncSubject<void>();

  constructor() {
    // mock implementation of user and permissions
    this.user = {
      Nom: 'Doe',
      Prenom: 'John',
      types: [''],
    };
    this.permissions$.next({
      apps: [Apps.MyYnov],
      modules: [AppModule.AdminDashboard, AppModule.ExampleModule],
      disabledFeatures: [],
      workspaces: [Workspace.Collaborator],
      updatedAt: new Date(),
    });
    this.permissions$.subscribe((permissions) => {
      this.permissions = permissions;
      this.ready();
    });
  }

  awaitPermissions() {
    return lastValueFrom(this.permissionsReady$.pipe(timeout(20000)));
  }

  private ready() {
    this.permissionsReady$.next();
    this.permissionsReady$.complete();
  }
}
