import React, { useState } from 'react';
import styled from 'styled-components';
import Dashboard from './components/Dashboard';
import InstrumentRegistration from './components/InstrumentRegistration';
import CalibrationManagement from './components/CalibrationManagement';
import HistoryManagement from './components/HistoryManagement';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  font-family: 'Noto Sans KR', sans-serif;
`;

const Sidebar = styled.div`
  width: 250px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px 0;
  box-shadow: 2px 0 10px rgba(0,0,0,0.1);
`;

const SidebarHeader = styled.div`
  padding: 0 20px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  margin-bottom: 20px;
`;

const SidebarTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: white;
`;

const SidebarSubtitle = styled.p`
  font-size: 0.9rem;
  margin: 5px 0 0;
  opacity: 0.8;
`;

const TabList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TabItem = styled.li<{ active: boolean }>`
  margin: 0;
  
  button {
    width: 100%;
    padding: 15px 20px;
    background: ${props => props.active ? 'rgba(255,255,255,0.2)' : 'transparent'};
    border: none;
    color: white;
    text-align: left;
    font-size: 1rem;
    font-weight: ${props => props.active ? '600' : '400'};
    cursor: pointer;
    transition: all 0.3s ease;
    border-left: 4px solid ${props => props.active ? 'white' : 'transparent'};
    
    &:hover {
      background: rgba(255,255,255,0.1);
    }
  }
`;

const MainContent = styled.div`
  flex: 1;
  background: #f8f9fa;
  overflow-y: auto;
`;

const ContentArea = styled.div`
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

type TabType = 'dashboard' | 'registration' | 'calibration' | 'history';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  const tabs = [
    { id: 'dashboard' as TabType, label: '홈', component: Dashboard },
    { id: 'registration' as TabType, label: '계측기 등록', component: InstrumentRegistration },
    { id: 'calibration' as TabType, label: '계측기 검교정 관리', component: CalibrationManagement },
    { id: 'history' as TabType, label: '계측기 이력 관리', component: HistoryManagement },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || Dashboard;

  return (
    <AppContainer>
      <Sidebar>
        <SidebarHeader>
          <SidebarTitle>계측기 관리 시스템</SidebarTitle>
          <SidebarSubtitle>Instrument Management System</SidebarSubtitle>
        </SidebarHeader>
        
        <TabList>
          {tabs.map((tab) => (
            <TabItem key={tab.id} active={activeTab === tab.id}>
              <button onClick={() => setActiveTab(tab.id)}>
                {tab.label}
              </button>
            </TabItem>
          ))}
        </TabList>
      </Sidebar>
      
      <MainContent>
        <ContentArea>
          <ActiveComponent />
        </ContentArea>
      </MainContent>
    </AppContainer>
  );
};

export default App; 