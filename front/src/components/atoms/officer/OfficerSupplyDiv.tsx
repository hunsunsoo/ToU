import { styled } from "styled-components";

const OfficerSupplyDiv = () => {
  return (
    <StyledTable>
      <tr>
        <td rowSpan={4} colSpan={1}><p>공</p><p>급</p><p>자</p></td>
        <td>일 련 번 호</td>
        <td>20231018-0933052</td>
        <td>날짜</td>
        <td>2023-10-18</td>
      </tr>
      <tr>
        <td>사업자 등록 번호</td>
        <td>339-95-00113</td>
        <td>성명</td>
        <td>김싸피</td>
      </tr>
      <tr>
        <td>상호</td>
        <td colSpan={5}>(주)싸피수산</td>
      </tr>
      <tr>
        <td>주소</td>
        <td colSpan={5}><p>대전광역시 유성구 동서대로 98-39(덕명동)</p> <p>삼성화재 유성연수원</p></td>
      </tr>
    </StyledTable>
  );
};

export default OfficerSupplyDiv;

const StyledTable = styled.table`
  margin: 10px;
  height: calc(100% - 10px);
  width: calc(100% - 10px);
  border: 1px solid black;
  border-collapse: collapse;
  font-weight: normal;
  color: black;

  td {
    text-align: center;
    border: 1px solid black;
    padding: 0 10px;
  }
`
