import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Import FormsModule

@Component({
  selector: 'app-retard',
  standalone: true,
  templateUrl: './retard.component.html',
  styleUrls: ['./retard.component.scss'],  // Corrigez styleUrl en styleUrls
  imports: [CommonModule, FormsModule]  // Importez CommonModule et FormsModule ici
})
export class RetardComponent implements OnInit {
  retards: any[] = [];
  users: any[] = [];  // Stocke les utilisateurs
  uniqueUsers: any[] = [];  // Stocke les utilisateurs uniques
  filteredRetards: any[] = [];  // Retards filtrées par utilisateur sélectionné
  errorMessage: string = '';
  selectedAbsId: string = '';  // ID de l'étudiant sélectionné

  constructor() { }

  ngOnInit(): void {
    this.fetchRetards();
    this.fetchUsers();
  }

  fetchRetards(): void {
    fetch('/api/retard')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched retards:', data); // Ajoutez un log pour vérifier les données
        this.retards = data;
        this.filteredRetards = data;  // Initialement, afficher toutes les retards
      })
      .catch(error => {
        this.errorMessage = 'An error occurred while fetching the data.';
        console.error('Error fetching retards:', error);
      });
  }

  fetchUsers(): void {
    fetch('/api/user')  // Assurez-vous que cette URL est correcte
      .then(response => response.json())
      .then(data => {
        console.log('Fetched users:', data); // Ajoutez un log pour vérifier les données
        this.users = data;
        this.filterUniqueUsers();  // Filtrer les utilisateurs une fois qu'ils sont chargés
      })
      .catch(error => {
        this.errorMessage = 'An error occurred while fetching user data.';
        console.error('Error fetching users:', error);
      });
  }

  getUserById(id: string): any {
    return this.users.find(user => user.props.ynov_id === id);
  }

  filterUniqueUsers(): void {
    const seen = new Set();
    this.uniqueUsers = this.users.filter(user => {
      const isDuplicate = seen.has(user.props.ynov_id);
      seen.add(user.props.ynov_id);
      return !isDuplicate;
    });
    console.log('Unique users:', this.uniqueUsers); // Ajoutez un log pour vérifier les utilisateurs uniques
  }

  getFullNameById(id: string): string {
    const user = this.getUserById(id);
    return user ? `${user.props.prenom} ${user.props.nom}` : 'Unknown';  // Retourne prénom + nom ou 'Unknown'
  }

  onUserSelect(event: any): void {
    const selectedId = event.target.value;
    console.log('Selected ID:', selectedId); // Ajoutez un log pour vérifier l'ID sélectionné
    this.selectedAbsId = selectedId;
    this.filterRetards(); // Filtrer les retards en fonction de l'utilisateur sélectionné
  }

  filterRetards(): void {
    console.log('Before filtering retards:', this.retards); // Ajoutez un log pour vérifier les retards avant le filtrage
    console.log('Selected ID for filtering:', this.selectedAbsId); // Ajoutez un log pour vérifier l'ID sélectionné
    this.filteredRetards = this.retards.filter(retard => {
      console.log('Comparing:', retard.props.etudiant_id, this.selectedAbsId); // Ajoutez un log pour vérifier la comparaison
      return retard.props.etudiant_id == this.selectedAbsId;
    });
    console.log('Filtered retards:', this.filteredRetards); // Ajoutez un log pour vérifier les retards filtrées
  }
}
