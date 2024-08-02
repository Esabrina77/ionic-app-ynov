import React, { useEffect, useCallback } from 'react';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';

interface Etudiant {
  nom: string[];
  prenom: string[];
  PromotionEtudiant: string[];
}

interface JsonLecteurProps {
  onDataLoaded: (data: Etudiant) => void;
}

const blobToString = (blob: Blob): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsText(blob);
  });
};

const readJSONFileCapacitor = async (path: string): Promise<Etudiant> => {
  try {
    const contents = await Filesystem.readFile({
      path,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });

    const fileContent: string | Blob = contents.data;
    const contentString = typeof fileContent === 'string' ? fileContent : await blobToString(fileContent);

    console.log('Contenu du fichier (Capacitor):', contentString);

    if (contentString.trim().startsWith('{') || contentString.trim().startsWith('[')) {
      return JSON.parse(contentString);
    } else {
      throw new Error('Le contenu n\'est pas du JSON valide');
    }
  } catch (error) {
    console.error('Erreur lors de la lecture du fichier JSON (Capacitor):', error);
    throw error;
  }
};

const readJSONFileWeb = async (path: string): Promise<Etudiant> => {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const fileContent: string = await response.text();

    console.log('Contenu du fichier (Web):', fileContent);

    if (fileContent.trim().startsWith('{') || fileContent.trim().startsWith('[')) {
      return JSON.parse(fileContent);
    } else {
      throw new Error('Le contenu n\'est pas du JSON valide');
    }
  } catch (error) {
    console.error('Erreur lors de la lecture du fichier JSON (Web):', error);
    throw error;
  }
};

export const JsonLecteur: React.FC<JsonLecteurProps> = ({ onDataLoaded }) => {
  const loadData = useCallback(async () => {
    try {
      const isNativePlatform = Capacitor.isNativePlatform();
      const filePath = isNativePlatform ? 'user.json' : '/user.json'; // Ajustez le chemin si nécessaire
      console.log('Chemin du fichier JSON:', filePath);

      const data: Etudiant = isNativePlatform 
        ? await readJSONFileCapacitor(filePath)
        : await readJSONFileWeb(filePath);

      onDataLoaded(data);
    } catch (error) {
      console.error('Erreur lors de la lecture du fichier JSON:', error);
    }
  }, [onDataLoaded]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return null;
};

export default JsonLecteur;
