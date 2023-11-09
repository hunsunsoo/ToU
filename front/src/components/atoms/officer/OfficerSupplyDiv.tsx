import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { customAxios } from "../../api/customAxios";

interface Supply {
  // req
  registrationNumber: number; // 사업자 등록 번호
  workerName: string; // 이름
  branchName: string; // 상호
  branchLocation: string; // 주소
}

const OfficerSupplyDiv = () => {
  // 공급자 정보
  const [supply, setSupply] = useState<Supply>();
  const { billId } = useParams<{ billId: string }>();

  useEffect(() => {
    // 공급자 정보 조회
    customAxios.get(`statement/worker/detail/${billId}`)
    .then((res) => {
       console.log(res);
       const { registrationNumber, workerName, branchName, branchLocation } = res.data.data.reqInfo;
      
       setSupply({ registrationNumber, workerName, branchName, branchLocation });
    })
    .catch((res) => {
      console.log(res);
    })
  }, [])


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
        <td>{supply?.registrationNumber}</td>
        <td>성명</td>
        <td>{supply?.workerName}</td>
      </tr>
      <tr>
        <td>상호</td>
        <td colSpan={5}>(주){supply?.branchName}</td>
      </tr>
      <tr>
        <td>주소</td>
        <td colSpan={5}><p>{supply?.branchLocation}</p> <p>{supply?.branchName}</p></td>
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
