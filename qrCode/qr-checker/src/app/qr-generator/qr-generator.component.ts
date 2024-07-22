import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';
import { formatDate } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

@Component({
  selector: 'app-qr-generator',
  standalone: true,
  imports: [CommonModule, QRCodeModule],
  templateUrl: './qr-generator.component.html',
  styleUrls: ['./qr-generator.component.scss']
})
export class QrGeneratorComponent implements OnInit, OnDestroy {
  qrData: string = '';
  statusMessage: string = '';
  minutesLate: number = 0;
  private intervalId: any;

  // Heure de début du cours fixée à 10h00
  private courseStartTime: Date;

  constructor() {
    // Enregistrer les données locales pour 'fr-FR'
    registerLocaleData(localeFr, 'fr-FR');

    // Initialiser l'heure de début du cours à 10h00
    this.courseStartTime = this.setCourseStartTime();
  }

  ngOnInit(): void {
    this.generateQrCode();
    this.startAutoRegeneration();
  }

  ngOnDestroy(): void {
    this.stopAutoRegeneration();
  }

  setCourseStartTime(): Date {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0, 0);
  }

  generateQrCode(): void {
    const currentTime = new Date();
    const timeDifference = Math.floor((currentTime.getTime() - this.courseStartTime.getTime()) / (1000 * 60)); // Différence en minutes
    let idStatusScan: number;
    if (timeDifference < 0) {
      this.statusMessage = 'Cours pas encore commencé';
      idStatusScan = 2;
      this.minutesLate = 0;
    } else if (timeDifference <= 30) {
      this.statusMessage = 'Présent';
      idStatusScan = 0;
      this.minutesLate = 0;
    } else {
      this.statusMessage = 'En retard';
      idStatusScan = 1;
      this.minutesLate = timeDifference;
    }

    this.qrData = JSON.stringify({
      idStatusScan,
      status: this.statusMessage,
      checkedAt: formatDate(currentTime, 'yyyy-MM-dd HH:mm:ss', 'fr-FR'),
      minutesLate: this.minutesLate
    });
  }

  startAutoRegeneration(): void {
    this.intervalId = setInterval(() => {
      this.generateQrCode();
    }, 5000); // 60000 ms = 1 minute
  }

  stopAutoRegeneration(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  resetQrCode(): void {
    this.courseStartTime = this.setCourseStartTime(); // Réinitialise l'heure de début du cours à 10h00
    this.generateQrCode();
  }
}