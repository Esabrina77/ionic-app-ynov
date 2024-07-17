import React from 'react';
import QRScanner from '../../../../../components/QrScanner/QrScanner';

const ExampleTab: React.FC = () => {
  return (
    <div className="example-tab">
      <p>
        hello scan le code
      </p>
      <div className="content">
        <QRScanner />
      </div>
    </div>
  );
};

export default ExampleTab;