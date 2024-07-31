import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Import FormsModule

@Component({
  selector: 'app-absence',
  standalone: true,
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.scss'],  // Corrigez styleUrl en styleUrls
  imports: [CommonModule, FormsModule]  // Importez CommonModule et FormsModule ici
})
export class AbsenceComponent implements OnInit {
  absences: any[] = [];
  users: any[] = [];  // Stocke les utilisateurs
  uniqueUsers: any[] = [];  // Stocke les utilisateurs uniques
  filteredAbsences: any[] = [];  // Absences filtrées par utilisateur sélectionné
  errorMessage: string = '';
  selectedAbsId: string = '';  // ID de l'étudiant sélectionné

  constructor() { }

  ngOnInit(): void {
    this.fetchAbsences();
    this.fetchUsers();
  }

  fetchAbsences(): void {
    fetch('/api/abs')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched absences:', data); // Ajoutez un log pour vérifier les données
        this.absences = data;
        this.filteredAbsences = data;  // Initialement, afficher toutes les absences
      })
      .catch(error => {
        this.errorMessage = 'An error occurred while fetching the data.';
        console.error('Error fetching absences:', error);
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
    this.filterAbsences(); // Filtrer les absences en fonction de l'utilisateur sélectionné
  }

  filterAbsences(): void {
    console.log('Before filtering absences:', this.absences); // Ajoutez un log pour vérifier les absences avant le filtrage
    console.log('Selected ID for filtering:', this.selectedAbsId); // Ajoutez un log pour vérifier l'ID sélectionné
    this.filteredAbsences = this.absences.filter(absence => {
      console.log('Comparing:', absence.props.etudiant_id, this.selectedAbsId); // Ajoutez un log pour vérifier la comparaison
      return absence.props.etudiant_id == this.selectedAbsId;
    });
    console.log('Filtered absences:', this.filteredAbsences); // Ajoutez un log pour vérifier les absences filtrées
  }
}
