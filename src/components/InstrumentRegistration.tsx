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

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 12px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const Select = styled.select`
  padding: 12px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const FullWidthGroup = styled(FormGroup)`
  grid-column: 1 / -1;
`;

const ButtonGroup = styled.div`
  grid-column: 1 / -1;
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  background: ${props => props.variant === 'primary' 
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
    : '#f8f9fa'};
  color: ${props => props.variant === 'primary' ? 'white' : '#2c3e50'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const InstrumentRegistration: React.FC = () => {
  const [formData, setFormData] = useState({
    instrumentName: '',
    modelNumber: '',
    manufacturer: '',
    serialNumber: '',
    category: '',
    location: '',
    department: '',
    purchaseDate: '',
    calibrationPeriod: '',
    lastCalibration: '',
    nextCalibration: '',
    status: 'active',
    description: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('계측기 등록:', formData);
    alert('계측기가 성공적으로 등록되었습니다.');
  };

  const handleReset = () => {
    setFormData({
      instrumentName: '',
      modelNumber: '',
      manufacturer: '',
      serialNumber: '',
      category: '',
      location: '',
      department: '',
      purchaseDate: '',
      calibrationPeriod: '',
      lastCalibration: '',
      nextCalibration: '',
      status: 'active',
      description: ''
    });
  };

  return (
    <Container>
      <Title>계측기 등록</Title>
      
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>계측기명 *</Label>
          <Input
            type="text"
            name="instrumentName"
            value={formData.instrumentName}
            onChange={handleInputChange}
            required
            placeholder="예: 디지털 멀티미터"
          />
        </FormGroup>

        <FormGroup>
          <Label>모델번호 *</Label>
          <Input
            type="text"
            name="modelNumber"
            value={formData.modelNumber}
            onChange={handleInputChange}
            required
            placeholder="예: DMM-2000"
          />
        </FormGroup>

        <FormGroup>
          <Label>제조사 *</Label>
          <Input
            type="text"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleInputChange}
            required
            placeholder="예: Keysight Technologies"
          />
        </FormGroup>

        <FormGroup>
          <Label>시리얼번호 *</Label>
          <Input
            type="text"
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleInputChange}
            required
            placeholder="예: SN123456789"
          />
        </FormGroup>

        <FormGroup>
          <Label>분류</Label>
          <Select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">분류 선택</option>
            <option value="전기계측기">전기계측기</option>
            <option value="온도계측기">온도계측기</option>
            <option value="압력계측기">압력계측기</option>
            <option value="길이계측기">길이계측기</option>
            <option value="질량계측기">질량계측기</option>
            <option value="기타">기타</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>설치위치</Label>
          <Input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="예: 실험실 A-101"
          />
        </FormGroup>

        <FormGroup>
          <Label>담당부서</Label>
          <Input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            placeholder="예: 품질관리팀"
          />
        </FormGroup>

        <FormGroup>
          <Label>구매일자</Label>
          <Input
            type="date"
            name="purchaseDate"
            value={formData.purchaseDate}
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>검교정 주기 (개월)</Label>
          <Input
            type="number"
            name="calibrationPeriod"
            value={formData.calibrationPeriod}
            onChange={handleInputChange}
            placeholder="예: 12"
          />
        </FormGroup>

        <FormGroup>
          <Label>최근 검교정일</Label>
          <Input
            type="date"
            name="lastCalibration"
            value={formData.lastCalibration}
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>다음 검교정일</Label>
          <Input
            type="date"
            name="nextCalibration"
            value={formData.nextCalibration}
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>상태</Label>
          <Select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          >
            <option value="active">사용중</option>
            <option value="maintenance">정비중</option>
            <option value="calibration">검교정중</option>
            <option value="retired">폐기</option>
          </Select>
        </FormGroup>

        <FullWidthGroup>
          <Label>비고</Label>
          <TextArea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="계측기에 대한 추가 정보를 입력하세요..."
          />
        </FullWidthGroup>

        <ButtonGroup>
          <Button type="submit" variant="primary">
            계측기 등록
          </Button>
          <Button type="button" onClick={handleReset}>
            초기화
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default InstrumentRegistration; 