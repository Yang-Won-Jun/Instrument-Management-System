import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 30px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 30px;
`;

const FilterSection = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
  font-size: 0.9rem;
`;

const Select = styled.select`
  padding: 10px;
  border: 2px solid #e1e8ed;
  border-radius: 6px;
  font-size: 0.9rem;
  background: white;
  min-width: 150px;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const Input = styled.input`
  padding: 10px;
  border: 2px solid #e1e8ed;
  border-radius: 6px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Th = styled.th`
  background: #f8f9fa;
  padding: 15px;
  text-align: left;
  font-weight: 600;
  color: #2c3e50;
  border-bottom: 2px solid #e1e8ed;
`;

const Td = styled.td`
  padding: 15px;
  border-bottom: 1px solid #e1e8ed;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  background: ${props => {
    switch (props.status) {
      case '정상': return '#d4edda';
      case '검교정 예정': return '#fff3cd';
      case '검교정 지연': return '#f8d7da';
      case '검교정중': return '#cce5ff';
      default: return '#e2e3e5';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case '정상': return '#155724';
      case '검교정 예정': return '#856404';
      case '검교정 지연': return '#721c24';
      case '검교정중': return '#004085';
      default: return '#383d41';
    }
  }};
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  margin-right: 5px;
  transition: all 0.3s ease;
  
  background: ${props => {
    switch (props.variant) {
      case 'primary': return '#667eea';
      case 'secondary': return '#6c757d';
      case 'danger': return '#dc3545';
      default: return '#667eea';
    }
  }};
  color: white;
  
  &:hover {
    opacity: 0.8;
  }
`;

// 샘플 데이터
const sampleData = [
  {
    id: 'INS001',
    name: '디지털 멀티미터',
    model: 'DMM-2000',
    manufacturer: 'Keysight',
    location: '실험실 A-101',
    lastCalibration: '2024-01-15',
    nextCalibration: '2024-07-15',
    status: '정상',
    department: '품질관리팀'
  },
  {
    id: 'INS002',
    name: '온도계',
    model: 'TEMP-100',
    manufacturer: 'Fluke',
    location: '실험실 B-203',
    lastCalibration: '2024-02-20',
    nextCalibration: '2024-05-20',
    status: '검교정 예정',
    department: '연구개발팀'
  },
  {
    id: 'INS003',
    name: '압력계',
    model: 'PRESS-500',
    manufacturer: 'WIKA',
    location: '공장 C-305',
    lastCalibration: '2023-12-10',
    nextCalibration: '2024-03-10',
    status: '검교정 지연',
    department: '생산관리팀'
  },
  {
    id: 'INS004',
    name: '길이계',
    model: 'LENGTH-300',
    manufacturer: 'Mitutoyo',
    location: '검사실 D-401',
    lastCalibration: '2024-03-01',
    nextCalibration: '2024-09-01',
    status: '검교정중',
    department: '품질관리팀'
  }
];

const CalibrationManagement: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = sampleData.filter(item => {
    const matchesStatus = !filterStatus || item.status === filterStatus;
    const matchesDepartment = !filterDepartment || item.department === filterDepartment;
    const matchesSearch = !searchTerm || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesDepartment && matchesSearch;
  });

  const handleCalibration = (id: string) => {
    alert(`계측기 ${id}의 검교정을 시작합니다.`);
  };

  const handleEdit = (id: string) => {
    alert(`계측기 ${id}의 정보를 수정합니다.`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm(`계측기 ${id}를 삭제하시겠습니까?`)) {
      alert(`계측기 ${id}가 삭제되었습니다.`);
    }
  };

  return (
    <Container>
      <Title>계측기 검교정 관리</Title>
      
      <FilterSection>
        <FilterGroup>
          <Label>상태별 필터</Label>
          <Select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">전체</option>
            <option value="정상">정상</option>
            <option value="검교정 예정">검교정 예정</option>
            <option value="검교정 지연">검교정 지연</option>
            <option value="검교정중">검교정중</option>
          </Select>
        </FilterGroup>

        <FilterGroup>
          <Label>부서별 필터</Label>
          <Select 
            value={filterDepartment} 
            onChange={(e) => setFilterDepartment(e.target.value)}
          >
            <option value="">전체</option>
            <option value="품질관리팀">품질관리팀</option>
            <option value="연구개발팀">연구개발팀</option>
            <option value="생산관리팀">생산관리팀</option>
          </Select>
        </FilterGroup>

        <FilterGroup>
          <Label>검색</Label>
          <Input
            type="text"
            placeholder="계측기명, 모델, ID 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </FilterGroup>

        <FilterGroup>
          <Label>&nbsp;</Label>
          <Button onClick={() => {
            setFilterStatus('');
            setFilterDepartment('');
            setSearchTerm('');
          }}>
            필터 초기화
          </Button>
        </FilterGroup>
      </FilterSection>

      <Table>
        <thead>
          <tr>
            <Th>계측기 ID</Th>
            <Th>계측기명</Th>
            <Th>모델</Th>
            <Th>제조사</Th>
            <Th>설치위치</Th>
            <Th>최근 검교정일</Th>
            <Th>다음 검교정일</Th>
            <Th>상태</Th>
            <Th>담당부서</Th>
            <Th>작업</Th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <Td>{item.id}</Td>
              <Td>{item.name}</Td>
              <Td>{item.model}</Td>
              <Td>{item.manufacturer}</Td>
              <Td>{item.location}</Td>
              <Td>{item.lastCalibration}</Td>
              <Td>{item.nextCalibration}</Td>
              <Td>
                <StatusBadge status={item.status}>
                  {item.status}
                </StatusBadge>
              </Td>
              <Td>{item.department}</Td>
              <Td>
                <ActionButton 
                  variant="primary" 
                  onClick={() => handleCalibration(item.id)}
                >
                  검교정
                </ActionButton>
                <ActionButton 
                  variant="secondary" 
                  onClick={() => handleEdit(item.id)}
                >
                  수정
                </ActionButton>
                <ActionButton 
                  variant="danger" 
                  onClick={() => handleDelete(item.id)}
                >
                  삭제
                </ActionButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      {filteredData.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px', 
          color: '#7f8c8d',
          fontSize: '1.1rem'
        }}>
          검색 조건에 맞는 계측기가 없습니다.
        </div>
      )}
    </Container>
  );
};

export default CalibrationManagement; 