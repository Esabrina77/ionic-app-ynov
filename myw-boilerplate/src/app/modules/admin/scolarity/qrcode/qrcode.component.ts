import { Component } from '@angular/core';
import { QrCodeComponent, QrCodeModule } from 'ng-qrcode';

@Component({
  selector: 'app-qrcode',
  standalone: true,
  imports: [QrCodeModule],
  templateUrl: './qrcode.component.html',
  styleUrl: './qrcode.component.scss'
})
export class QrcodeComponent {

}

