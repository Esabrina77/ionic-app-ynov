import React, { useState } from 'react';
import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';
import styled from 'styled-components';

const StyledSegment = styled(IonSegment)`

    font-family: var(--font-medium);
  --background: transparent;
  border-bottom: 1px solid #ddd;
`;

const StyledSegmentButton = styled(IonSegmentButton)`
  --color: #666;
  --color-checked: #00a699;
  --indicator-color: #00a699;
  font-weight: normal;
  
  &.segment-button-checked {
    font-weight: bold;
  }
`;

interface Tab {
  value: string;
  label: string;
}

interface TabSwitcherProps {
  onTabChange: (tab: string) => void;
  tabs: Tab[];
  defaultTab?: string;
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({ onTabChange, tabs, defaultTab }) => {
  const [selectedTab, setSelectedTab] = useState(defaultTab || tabs[0].value);

  const handleTabChange = (event: CustomEvent) => {
    const tab = event.detail.value as string;
    setSelectedTab(tab);
    onTabChange(tab);
  };

  return (
    <StyledSegment value={selectedTab} onIonChange={handleTabChange}>
      {tabs.map((tab) => (
        <StyledSegmentButton key={tab.value} value={tab.value}>
          <IonLabel>{tab.label}</IonLabel>
        </StyledSegmentButton>
      ))}
    </StyledSegment>
  );
};

export default TabSwitcher;