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
    <div className="stat-slider">
      <span>{period} :</span>
      <IonText color="danger">{value} {unit}</IonText>
      <span>{label}</span>
    </div>
  );
};

export default StatSlider;