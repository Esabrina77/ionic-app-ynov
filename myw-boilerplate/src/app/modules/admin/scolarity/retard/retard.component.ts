import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-retard',
  standalone: true,
  templateUrl: './retard.component.html',
  styleUrl: './retard.component.scss',
  imports: [CommonModule]
})

export class RetardComponent implements OnInit {
  retards: any[] = [];
  errorMessage: string = '';

  constructor() { }

  ngOnInit(): void {
    this.fetchRetards();
  }

  fetchRetards(): void {
    fetch('/api/retard')
      .then(response => response.json())
      .then(data => {
        console.log(data[0].props.annee_id)
        this.retards = data;
      })
      .catch(error => {
        this.errorMessage = 'An error occurred while fetching the data.';
        console.error('Error fetching retards:', error);
      });
  }
}
