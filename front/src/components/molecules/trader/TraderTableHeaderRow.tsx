import styled from "styled-components";

type TraderTableHeaderRowProps = {
    subheaders?: string[];
    widths?: string[];
  };
  
  const TraderTableHeaderRow: React.FC<TraderTableHeaderRowProps> = ({ subheaders, widths }) => {
    return (
      <thead>
        <tr>
        {subheaders?.map((subheader, idx) => (
            <StyledTh  key={subheader} style={{ width: widths ? widths[idx] : undefined }}>
              {subheaders[idx]}
            </StyledTh>
        ))}
        </tr>
      </thead>
    );
  };
  
  export default TraderTableHeaderRow;

  const StyledTh = styled.th`
    font-size: 20px; // 원하는 폰트 크기로 설정
    padding: 10px; // 필요한 경우 패딩 추가
    border-top: 1px solid black; // 각 셀의 위쪽 테두리 추가
    border-bottom: 1px solid black; // 각 셀의 아래쪽 테두리 추가
`;
