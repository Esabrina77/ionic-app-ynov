import fs from 'fs';
import path from 'path';

// Définir une interface pour les données des e-mails
interface EmailData {
    [key: string]: string[];
}

// Fonction pour récupérer une adresse email aléatoire à partir du fichier
export const getRandomEmail = (type: string): string => {
    const filePath = path.join(__dirname, 'emails.json');
    
    // Lire le fichier JSON
    const data = fs.readFileSync(filePath, 'utf-8');
    
    // Analyser les données JSON en utilisant l'interface EmailData
    const emails: EmailData = JSON.parse(data);

    // Vérifier que le type d'e-mail existe et a des valeurs
    if (!emails[type] || emails[type].length === 0) {
        throw new Error(`No emails found for type: ${type}`);
    }

    // Sélectionner un e-mail aléatoire
    const randomIndex = Math.floor(Math.random() * emails[type].length);
    return emails[type][randomIndex];
};

// Fonction pour extraire le prénom et le nom à partir d'un e-mail
export const getNameFromEmail = (email: string): { prenom: string, nom: string } => {
    // Séparer l'adresse e-mail pour obtenir le prénom et le nom
    const parts = email.split('@')[0].split('.');
    return {
        prenom: parts[0] || '',
        nom: parts[1] || '',
    };
};
