import React from 'react';
import styled from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const DashboardContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 30px;
`;

// 외부 시스템 접속 링크 버튼 스타일
const ExternalSystemLink = styled.a`
  display: inline-block;
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const DashboardHeader = styled.div`
  margin-bottom: 30px;
`;

const DashboardTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 10px 0;
`;

const DashboardSubtitle = styled.p`
  font-size: 1.1rem;
  color: #7f8c8d;
  margin: 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(325px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 25px;
  border-radius: 12px;
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  opacity: 0.9;
`;

const ChartSection = styled.div`
  margin-bottom: 40px;
`;

const ChartTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 20px;
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ChartContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 130%; /* 기존 너비에서 30% 증가 */
  margin-left: -15%; /* 중앙 정렬을 위해 왼쪽으로 이동 */
`;

// 샘플 데이터
const monthlyData = [
  { month: '1월', 계획: 45, 실적: 42 },
  { month: '2월', 계획: 50, 실적: 48 },
  { month: '3월', 계획: 55, 실적: 52 },
  { month: '4월', 계획: 60, 실적: 58 },
  { month: '5월', 계획: 65, 실적: 63 },
  { month: '6월', 계획: 70, 실적: 67 },
  { month: '7월', 계획: 75, 실적: 72 },
  { month: '8월', 계획: 80, 실적: 78 },
  { month: '9월', 계획: 85, 실적: 82 },
  { month: '10월', 계획: 90, 실적: 87 },
  { month: '11월', 계획: 95, 실적: 91 },
  { month: '12월', 계획: 100, 실적: 95 },
];

const statusData = [
  { name: '정상', value: 65, color: '#4CAF50' },
  { name: '검교정 예정', value: 20, color: '#FF9800' },
  { name: '검교정 지연', value: 10, color: '#F44336' },
  { name: '폐기 예정', value: 5, color: '#9E9E9E' },
];

const Dashboard: React.FC = () => {
  return (
    <DashboardContainer>
      {/* 외부 시스템 접속 링크 */}
      <ExternalSystemLink
        href="https://instrument-management-system.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
      >
        🔗 외부 계측기 관리 시스템 접속
      </ExternalSystemLink>
      
      <DashboardHeader>
        <DashboardTitle>계측기 검교정 현황</DashboardTitle>
        <DashboardSubtitle>2024년 월별 계획 대비 실적 현황</DashboardSubtitle>
      </DashboardHeader>

      <StatsGrid>
        <StatCard>
          <StatNumber>1,250</StatNumber>
          <StatLabel>총 계측기 수</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>1,180</StatNumber>
          <StatLabel>정상 상태</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>45</StatNumber>
          <StatLabel>이번 달 검교정 완료</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>25</StatNumber>
          <StatLabel>검교정 예정</StatLabel>
        </StatCard>
      </StatsGrid>

      <ChartSection>
        <ChartTitle>월별 검교정 계획 대비 실적</ChartTitle>
        <ChartContainer>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="계획" fill="#667eea" />
              <Bar dataKey="실적" fill="#764ba2" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </ChartSection>

      <ChartSection>
        <ChartTitle>계측기 상태 분포</ChartTitle>
        <ChartGrid>
          <ChartContainer>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
          
          <ChartContainer>
            <div style={{ padding: '20px' }}>
              <h3 style={{ marginBottom: '20px', color: '#2c3e50' }}>상태별 상세 현황</h3>
              {statusData.map((item, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '15px',
                  padding: '10px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '6px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ 
                      width: '12px', 
                      height: '12px', 
                      backgroundColor: item.color, 
                      borderRadius: '50%',
                      marginRight: '10px'
                    }} />
                    <span>{item.name}</span>
                  </div>
                  <span style={{ fontWeight: '600' }}>{item.value}개</span>
                </div>
              ))}
            </div>
          </ChartContainer>
        </ChartGrid>
      </ChartSection>
    </DashboardContainer>
  );
};

export default Dashboard; 