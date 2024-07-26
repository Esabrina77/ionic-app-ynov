import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/services/user/interfaces/user.interface';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
  @Input({ required: true }) user!: User;
  @Output() click = new EventEmitter();
}
