import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  modalType: string;
}

const OfficerItemModal: React.FC<ModalProps> = ({ isOpen, onClose, children, modalType }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {renderModalContent(modalType, children)}
      </ModalContent>
    </ModalOverlay>
  );
};

const renderModalContent = (modalType: string, children: ReactNode) => {
  switch (modalType) {
    case 'type1':
      return <div>{children}</div>;
    case 'type2':
      return <div>{children}</div>;
    // 다른 모달 유형 추가 가능
    default:
      return <div>{children}</div>;
  }
};

export default OfficerItemModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
`;