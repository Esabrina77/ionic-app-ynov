import React, { useState } from 'react';
import { IonText, IonCard } from '@ionic/react';
import './ReasonSelector.scss';

interface ReasonSelectorProps {
  onChange: (reason: string, description: string) => void;
}

const ReasonSelector: React.FC<ReasonSelectorProps> = ({ onChange }) => {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleReasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newReason = event.target.value;
    setSelectedReason(newReason);
    onChange(newReason, description);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDescription = event.target.value;
    setDescription(newDescription);
    onChange(selectedReason, newDescription);
  };

  return (
    <div className="reason-selector">
      <IonCard className="slider">
        <select id="monselect" value={selectedReason} onChange={handleReasonChange}>
          <option value="" disabled>- -Choisissez un motif- -</option>
          <option value="unknow">Non connu</option>
          <option value="transport">Problème de transport</option>
          <option value="valeur3">Valeur 3</option>
        </select>
      </IonCard>
      <input 
        type="text" 
        placeholder="Décrivez votre motif ici au besoin" 
        value={description}
        onChange={handleDescriptionChange}
      />
    </div>
  );
};

export default ReasonSelector;
