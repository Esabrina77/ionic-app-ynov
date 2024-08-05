# IONIC RETARD APP
# Documentation du Projet Retard-Absence-Décharge_de_sorties

## Arborescence du Projet

- *src/components/* : Composants réutilisables.
- *src/src/pages/logged/students/tabs* : Pages principales de l'application.
- *src/services/* : Services pour les appels API.
- *src/assets/* : Fichiers statiques comme les images et les styles.

## Fonctionnalités
# BRANCHE : *app-apprenant*

### 1. Gestion des Retards (RetardsTab)

- *Fichier* : src/pages/retards/RetardsTab.tsx
- *Description* : Affiche les retards actuels et cumulés de l'utilisateur. Permet le scan de QR codes pour justifier les retards.

### MessageScan.tsx
- *Rôle :* Afficher un message de confirmation de la justification du retard

### Latejustify.tsx
- *Rôle :* Affiche le formulaire pour la justification du retard

#### Principales Fonctions :

- *fetchRetards* : Récupère les données de retard de l'utilisateur depuis l'API.
- *checkRetardAndScanValidity* : Vérifie si l'utilisateur est en retard ou absent et la validité du scan.
- *goToScanQR* : Redirige vers la page de scan de QR code.

### 2. Justification des Absences (AbsencesTab)

- *Fichier* : src/pages/absences/AbsencesTab.tsx
- *Description* : Affiche les absences justifiées et injustifiées. Permet de justifier les absences.
### MessageJustif.tsx
- *Rôle :* Afficher un message de confirmation de la justification du retard

### Justify.tsx
- *Rôle :* Affiche le formulaire pour la justification du retard
#### Principales Fonctions :

- *fetchAbsences* : Récupère les absences justifiées et injustifiées de l'utilisateur depuis l'API.
- *goToJustif* : Redirige vers le formulaire de justification d'absence avec les détails de l'absence.

### 3. Scan de QR Code (ScanPage)

- *Fichier* : src/pages/scan/ScanPage.tsx
- *Description* : Page dédiée au scan de QR code pour justifier les retards.

#### Principales Fonctions :

- *startScan* : Démarre le scan du QR code en utilisant le plugin BarcodeScanner.
- *decryptRSA* : Décrypte les données chiffrées du QR code.
- *goTojustifyLate* : Redirige vers la page de justification de retard avec les données décryptées.

## BRANCHE : *dechargeSortie*

### 4. Décharges de sorties
- *Fichier* : 
- *Description* : 

#### Principales Fonctions :
- 


## Appels API

### Services API

- *Fichier* : src/services/api/api.service.ts
- *Description* : Contient les appels API pour les retards et les absences.

#### Principales Fonctions :

- *getRetardByEtudiantId* : Récupère les retards d'un étudiant.
- *getUnjustifiedAbsences* : Récupère les absences injustifiées d'un étudiant.
- *getJustifiedAbsences* : Récupère les absences justifiées d'un étudiant.
- *markStudentAsAbsent* : Marque un étudiant comme absent.

### Services API Cours

- *Fichier* : src/services/apiCours/apiCours.service.ts
- *Description* : Contient les appels API spécifiques aux cours.

#### Principales Fonctions :

- *getCourseData* : Récupère les données des cours.
- *checkIfScanValid* : Vérifie si un scan est valide pour un cours spécifique.
- *calculateRetardDuration* : Calcule la durée des retards pour un cours.

## Gestion des Messages et des Formulaires

- *Affichage des erreurs et des confirmations* : Utilisation de useIonAlert pour afficher les messages.
- *Formulaires de justification* : Utilisation des paramètres d'URL pour pré-remplir les formulaires avec les données pertinentes (par exemple, goToJustif dans AbsencesTab).

## Conclusion
Cette documentation fournit une vue d'ensemble des fonctionnalités et de la structure du projet de gestion de retards et justifications d'absence et décharge de sortie
N'hésitez pas à nous contacter si besoin.
# Don't be shy!

