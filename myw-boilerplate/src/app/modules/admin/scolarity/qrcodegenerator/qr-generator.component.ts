import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, registerLocaleData, formatDate } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';
import localeFr from '@angular/common/locales/fr';

import * as forge from 'node-forge';


const rsa = forge.pki.rsa;
const private_key = "-----BEGIN RSA PRIVATE KEY-----\n" +
  "MIIBPAIBAAJBAN5xF1qi7bOd25l25apCJCvTFCz3buOlEsiCc/vwrr1EacpWtT/P\n" +
  "xMWdSYUwyotSyAbCAIFz7rrnweB6Mvpd9jECAwEAAQJAFG3oii96i0uNNpv/3dIz\n" +
  "Rj8dlD+pVIj9n6KzikkBk2pAMekDdofAqMsHRz7a0E3tVJ377kyISYJDBebV8vIG\n" +
  "0QIhAPx8AHHa0VTZ7JS1MvkOslZvyKiQkc3V7GRCI/yLais9AiEA4YoAHsBX6por\n" +
  "c1gWkcRjo3TkesM6D0jS2kXVbqChdgUCIQD6Bcli9a8JeWv/rpe1bkpHshZgZhkc\n" +
  "XdTjS2PbeCtAeQIhAJfNudz423Plht9g5/f+9o2bbPmQE7Eb9AfEPy7x4Rs9AiEA\n" +
  "9nXhX926prDeq0e9r8rR2cvpUaqhLMGz+zFIyJcsRHo=\n" +
  "-----END RSA PRIVATE KEY-----\n"
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
  SalutASamy: string = '';

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

  async generateQrCode(): Promise<void> {
    const SalutASamy = await this.oulala(new Date().toISOString());
    const currentTime = new Date();
    const timeDifference = Math.floor((currentTime.getTime() - this.courseStartTime.getTime()) / (1000 * 60)); // Différence en minutes
    let idStatusScan: number;
    this.SalutASamy = SalutASamy.toString();
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
      minutesLate: this.minutesLate,
      SalutASamy: this.SalutASamy
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

  async oulala(data: string): Promise<string> {
    const key = await GetKey();
    if (key) {
      var tmp = encryptRSA(data,key)
      console.log(tmp)
      decryptRSA(tmp,private_key)
      return encryptRSA(data, key);

    }
    return '';
  }
}

function GetKey() {
  return fetch('/api/key')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Convertir la réponse en JSON
    })
    .then(data => {
      if (Array.isArray(data) && data.length > 0 && data[0].props && data[0].props.key) {
        return data[0].props.key; // Retourner la clé publique
      } else {
        throw new Error('Attribut key non trouvé dans la réponse');
      }
    })
    .catch(error => {
      console.error('Il y a eu un problème avec la requête fetch:', error);
      return null; // Retourner null en cas d'erreur
    });
}

function encryptRSA(data: string, public_key: any): string {
  var key = forge.pki.publicKeyFromPem(public_key);
  var result = key.encrypt(data);


  return result;
}

function decryptRSA(data: string, private_key: any): string {
  var key = forge.pki.privateKeyFromPem(private_key);
  var result = key.decrypt(data);
  console.log("Decrypted: ", result);
  return result;
}
