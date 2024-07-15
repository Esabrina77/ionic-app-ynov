import React from 'react';
import { IonText } from '@ionic/react';
import './StatSlider.scss';

interface StatSliderProps {
  period: string;
  value: number;
  unit: string;
  label: string;
}

const StatSlider: React.FC<StatSliderProps> = ({ period, value, unit, label }) => {
    return (
        <div>
          <span>{period} :</span>
          <IonText className='danger'> &nbsp;{value} {unit} </IonText>
          <span>&nbsp;{label}</span>
        </div>
      );
};

export default StatSlider;