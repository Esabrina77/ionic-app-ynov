import fs from 'fs';
import path from 'path';

// Fonction pour récupérer une adresse email aléatoire à partir du fichier
export const getRandomEmail = (type: string) => {
    const filePath = path.join(__dirname, 'emails.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    const emails = JSON.parse(data);

    if (!emails[type] || emails[type].length === 0) {
        throw new Error(`No emails found for type: ${type}`);
    }

    const randomIndex = Math.floor(Math.random() * emails[type].length);
    return emails[type][randomIndex];
};

export const getNameFromEmail = (email: string) => {
    const parts = email.split('@')[0].split('.');
    return {
        prenom: parts[0] || '',
        nom: parts[1] || '',
    };
};