// Horaire.tsx
import React from 'react';

const Horaire: React.FC = () => {
  const getCurrentDateTime = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} à ${hours}h${minutes}`;
  };

  return <>{getCurrentDateTime()}</>;
};

export default Horaire;
