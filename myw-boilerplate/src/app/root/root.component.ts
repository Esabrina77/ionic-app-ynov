import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { Apps } from '../services/user/interfaces/permission-set.interface';
import { CommonModule } from '@angular/common';
import { AppErrorComponent } from './app-error/app-error.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    AppErrorComponent,
    LoadingScreenComponent,
  ],
  providers: [],
  templateUrl: './root.component.html',
  styleUrl: './root.component.scss',
})

export class RootComponent {
  constructor(private userService: UserService) {}

  public get loading() {
    return !this.userService.permissions;
  }

  public get denyApp() {
    return !this.userService.permissions?.apps.includes(Apps.MyYnov);
  }
}
