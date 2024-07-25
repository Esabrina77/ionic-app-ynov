import React from 'react';
import { IonText, IonCard } from '@ionic/react';
import './ReasonSelector.scss';

const ReasonSelector: React.FC = () => {
  return (
    <div className="reason-selector">
      <IonCard className="slider">
        <select id="monselect">
          <option value="" selected>- -Choisissez un motif- -</option>
          <option value="unknow">Non connu</option>
          <option value="transport">Problème de transport</option>
          <option value="valeur3">Valeur 3</option>
        </select>
      </IonCard>
      <input type="text" placeholder="Décrivez votre motif ici au besoin" />
    </div>
  );
};

export default ReasonSelector;