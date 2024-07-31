import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-absence',
  standalone: true,
  templateUrl: './absence.component.html',
  styleUrl: './absence.component.scss',
  imports: [CommonModule]
})

export class AbsenceComponent implements OnInit {
  absences: any[] = [];
  errorMessage: string = '';

  constructor() { }

  ngOnInit(): void {
    this.fetchabsences();
  }

  fetchabsences(): void {
    fetch('/api/abs')
      .then(response => response.json())
      .then(data => {
        console.log(data[0].props.annee_id)
        this.absences = data;
      })
      .catch(error => {
        this.errorMessage = 'An error occurred while fetching the data.';
        console.error('Error fetching absences:', error);
      });
  }
}
