import styled from "styled-components";

type TraderTableCellProps = {
    content: string | React.ReactNode;
    width?: string;
    height?: string;
  };
  
  const TraderTableCell: React.FC<TraderTableCellProps> = ({ content, width, height }) => {
    return <StyledTd style={{ width, height }}>{content}</StyledTd>;
  };
  
  export default TraderTableCell;
  
  const StyledTd = styled.td`
  padding: 10px; // 각 셀의 내부 여백을 설정
  border-bottom: 1px solid #949494; // 각 셀의 아래쪽 테두리 추가
  font-size: 20px;
  text-align: center;
`;