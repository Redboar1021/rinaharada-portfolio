import styled from '@emotion/styled';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useState } from 'react';

const AdminContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  font-family: 'Inter', sans-serif;
`;

const AdminHeader = styled.header`
  background-color: #333;
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.h1`
  font-size: 1.2rem;
  font-weight: 500;
`;

const SignOutButton = styled.button`
  background-color: transparent;
  border: 1px solid white;
  color: white;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  
  &:hover {
    background-color: white;
    color: #333;
  }
`;

const AdminContent = styled.div`
  padding: 40px;
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SidebarItem = styled.button<{ isActive: boolean }>`
  background-color: ${props => props.isActive ? '#fff' : 'transparent'};
  border: ${props => props.isActive ? '1px solid #ddd' : 'none'};
  padding: 15px;
  text-align: left;
  cursor: pointer;
  font-weight: 500;
  border-radius: 4px;
  color: ${props => props.isActive ? '#333' : '#666'};
  
  &:hover {
    background-color: #fff;
  }
`;

const ContentPanel = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  min-height: 500px;
`;

const PanelTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

// Mock components for different management sections
const ManageSchedule = () => (
    <div>
        <h3>Manage Schedule</h3>
        <p>List of events (Mock for now)</p>
        {/* Implementation would go here */}
    </div>
);

const ManageVideos = () => (
    <div>
        <h3>Manage Videos</h3>
        <p>Video list (Mock for now)</p>
        {/* Implementation would go here */}
    </div>
);

export const Admin = () => {
    const [activeTab, setActiveTab] = useState<'schedule' | 'videos'>('schedule');

    return (
        <Authenticator>
            {({ signOut, user }: { signOut?: any; user?: any }) => (
                <AdminContainer>
                    <AdminHeader>
                        <HeaderTitle>Rina Harada Portfolio - Admin</HeaderTitle>
                        <div>
                            <span style={{ marginRight: '20px', fontSize: '0.9rem' }}>{user?.username}</span>
                            <SignOutButton onClick={signOut}>Sign Out</SignOutButton>
                        </div>
                    </AdminHeader>

                    <AdminContent>
                        <Sidebar>
                            <SidebarItem
                                isActive={activeTab === 'schedule'}
                                onClick={() => setActiveTab('schedule')}
                            >
                                Schedule
                            </SidebarItem>
                            <SidebarItem
                                isActive={activeTab === 'videos'}
                                onClick={() => setActiveTab('videos')}
                            >
                                Videos
                            </SidebarItem>
                        </Sidebar>

                        <ContentPanel>
                            <PanelTitle>{activeTab === 'schedule' ? 'Schedule Management' : 'Video Management'}</PanelTitle>
                            {activeTab === 'schedule' && <ManageSchedule />}
                            {activeTab === 'videos' && <ManageVideos />}
                        </ContentPanel>
                    </AdminContent>
                </AdminContainer>
            )}
        </Authenticator>
    );
};
