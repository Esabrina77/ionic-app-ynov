import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-error',
  templateUrl: './app-error.component.html',
  styleUrls: ['./app-error.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class AppErrorComponent {
  returnUrl = '';

  constructor(private router: Router) {
    // getting query params
    console.log(this.router.getCurrentNavigation());
    const queryParams =
      this.router.getCurrentNavigation()?.extractedUrl.queryParams;
    this.returnUrl = queryParams?.['returnUrl'] || '';
  }
}
