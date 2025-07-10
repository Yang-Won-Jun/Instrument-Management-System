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
      case '완료': return '#d4edda';
      case '진행중': return '#cce5ff';
      case '취소': return '#f8d7da';
      case '보류': return '#fff3cd';
      default: return '#e2e3e5';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case '완료': return '#155724';
      case '진행중': return '#004085';
      case '취소': return '#721c24';
      case '보류': return '#856404';
      default: return '#383d41';
    }
  }};
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' | 'info' }>`
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
      case 'info': return '#17a2b8';
      default: return '#667eea';
    }
  }};
  color: white;
  
  &:hover {
    opacity: 0.8;
  }
`;

const DetailModal = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #7f8c8d;
  
  &:hover {
    color: #2c3e50;
  }
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailLabel = styled.span`
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 5px;
`;

const DetailValue = styled.span`
  color: #7f8c8d;
`;

// 샘플 데이터
const sampleHistoryData = [
  {
    id: 'HIS001',
    instrumentId: 'INS001',
    instrumentName: '디지털 멀티미터',
    model: 'DMM-2000',
    action: '검교정',
    date: '2024-01-15',
    status: '완료',
    performer: '김철수',
    department: '품질관리팀',
    result: '합격',
    nextCalibration: '2024-07-15',
    notes: '정상 검교정 완료'
  },
  {
    id: 'HIS002',
    instrumentId: 'INS002',
    instrumentName: '온도계',
    model: 'TEMP-100',
    action: '검교정',
    date: '2024-02-20',
    status: '완료',
    performer: '이영희',
    department: '연구개발팀',
    result: '합격',
    nextCalibration: '2024-05-20',
    notes: '온도 보정 완료'
  },
  {
    id: 'HIS003',
    instrumentId: 'INS003',
    instrumentName: '압력계',
    model: 'PRESS-500',
    action: '정비',
    date: '2024-03-10',
    status: '진행중',
    performer: '박민수',
    department: '생산관리팀',
    result: '-',
    nextCalibration: '2024-06-10',
    notes: '부품 교체 작업 중'
  },
  {
    id: 'HIS004',
    instrumentId: 'INS004',
    instrumentName: '길이계',
    model: 'LENGTH-300',
    action: '검교정',
    date: '2024-03-01',
    status: '완료',
    performer: '최지영',
    department: '품질관리팀',
    result: '합격',
    nextCalibration: '2024-09-01',
    notes: '정밀도 검증 완료'
  }
];

const HistoryManagement: React.FC = () => {
  const [filterAction, setFilterAction] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHistory, setSelectedHistory] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredData = sampleHistoryData.filter(item => {
    const matchesAction = !filterAction || item.action === filterAction;
    const matchesStatus = !filterStatus || item.status === filterStatus;
    const matchesDepartment = !filterDepartment || item.department === filterDepartment;
    const matchesSearch = !searchTerm || 
      item.instrumentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.instrumentId.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesAction && matchesStatus && matchesDepartment && matchesSearch;
  });

  const handleViewDetails = (history: any) => {
    setSelectedHistory(history);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedHistory(null);
  };

  return (
    <Container>
      <Title>계측기 이력 관리</Title>
      
      <FilterSection>
        <FilterGroup>
          <Label>작업 유형</Label>
          <Select 
            value={filterAction} 
            onChange={(e) => setFilterAction(e.target.value)}
          >
            <option value="">전체</option>
            <option value="검교정">검교정</option>
            <option value="정비">정비</option>
            <option value="수리">수리</option>
            <option value="폐기">폐기</option>
          </Select>
        </FilterGroup>

        <FilterGroup>
          <Label>상태별 필터</Label>
          <Select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">전체</option>
            <option value="완료">완료</option>
            <option value="진행중">진행중</option>
            <option value="취소">취소</option>
            <option value="보류">보류</option>
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
            setFilterAction('');
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
            <Th>이력 ID</Th>
            <Th>계측기명</Th>
            <Th>모델</Th>
            <Th>작업 유형</Th>
            <Th>작업일자</Th>
            <Th>상태</Th>
            <Th>담당자</Th>
            <Th>결과</Th>
            <Th>작업</Th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <Td>{item.id}</Td>
              <Td>{item.instrumentName}</Td>
              <Td>{item.model}</Td>
              <Td>{item.action}</Td>
              <Td>{item.date}</Td>
              <Td>
                <StatusBadge status={item.status}>
                  {item.status}
                </StatusBadge>
              </Td>
              <Td>{item.performer}</Td>
              <Td>{item.result}</Td>
              <Td>
                <ActionButton 
                  variant="info" 
                  onClick={() => handleViewDetails(item)}
                >
                  상세보기
                </ActionButton>
                <ActionButton 
                  variant="secondary" 
                  onClick={() => alert(`이력 ${item.id}를 수정합니다.`)}
                >
                  수정
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
          검색 조건에 맞는 이력이 없습니다.
        </div>
      )}

      <DetailModal isOpen={isModalOpen} onClick={handleCloseModal}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>이력 상세 정보</ModalTitle>
            <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
          </ModalHeader>
          
          {selectedHistory && (
            <>
              <DetailGrid>
                <DetailItem>
                  <DetailLabel>이력 ID</DetailLabel>
                  <DetailValue>{selectedHistory.id}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>계측기 ID</DetailLabel>
                  <DetailValue>{selectedHistory.instrumentId}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>계측기명</DetailLabel>
                  <DetailValue>{selectedHistory.instrumentName}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>모델</DetailLabel>
                  <DetailValue>{selectedHistory.model}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>작업 유형</DetailLabel>
                  <DetailValue>{selectedHistory.action}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>작업일자</DetailLabel>
                  <DetailValue>{selectedHistory.date}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>상태</DetailLabel>
                  <DetailValue>
                    <StatusBadge status={selectedHistory.status}>
                      {selectedHistory.status}
                    </StatusBadge>
                  </DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>담당자</DetailLabel>
                  <DetailValue>{selectedHistory.performer}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>담당부서</DetailLabel>
                  <DetailValue>{selectedHistory.department}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>결과</DetailLabel>
                  <DetailValue>{selectedHistory.result}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>다음 검교정일</DetailLabel>
                  <DetailValue>{selectedHistory.nextCalibration}</DetailValue>
                </DetailItem>
              </DetailGrid>
              
              <DetailItem>
                <DetailLabel>비고</DetailLabel>
                <DetailValue>{selectedHistory.notes}</DetailValue>
              </DetailItem>
            </>
          )}
        </ModalContent>
      </DetailModal>
    </Container>
  );
};

export default HistoryManagement; 