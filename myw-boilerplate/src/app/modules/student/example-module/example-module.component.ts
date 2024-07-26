import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-example-module',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './example-module.component.html',
  styleUrl: './example-module.component.scss',
})
export class ExampleModuleComponent {}
