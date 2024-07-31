import React, { useEffect } from 'react';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

interface Etudiant {
  nom: string[];
  prenom: string[];
  PromotionEtudiant: string[];
}

interface JsonLecteurProps {
  onDataLoaded: (data: Etudiant) => void;
}

export const JsonLecteur: React.FC<JsonLecteurProps> = ({ onDataLoaded }) => {
  useEffect(() => {
    const readJSONFile = async () => {
      try {
        // Assurez-vous que le chemin d'accès est correct pour votre environnement
        const contents = await Filesystem.readFile({
          path: 'user.json',
          directory: Directory.Documents,
          encoding: Encoding.UTF8,
        });

        if (typeof contents.data === 'string') {
          const data: Etudiant = JSON.parse(contents.data);
          onDataLoaded(data);
        } else {
          console.error('Le contenu du fichier n\'est pas de type string:', contents.data);
        }
      } catch (error) {
        console.error('Erreur lors de la lecture du fichier JSON:', error);
      }
    };

    readJSONFile();
  }, [onDataLoaded]);

  return null; // Ce composant ne rend rien directement
};

export default JsonLecteur;
