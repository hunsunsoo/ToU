import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { customAxios } from "../../api/customAxios";

interface Demand {
  // res
  branchName: string;
  branchLocation: string;
  branchContact: string;
}

const OfficerDemandDiv = () => {
  // 수급자 정보
  const [demand, setDemand] = useState<Demand>();
  const { billId } = useParams<{ billId: string }>();

  useEffect(() => {
   // 수급자 정보 조회
   customAxios.get(`statement/worker/detail/${billId}`)
   .then((res) => {
      console.log(res);
      const { branchName, branchLocation, branchContact } = res.data.data.resInfo;

      setDemand({ branchName, branchLocation, branchContact });
   })
   .catch((res) => {
     console.log(res);
   })
 }, [])

  return (
    <StyledDemandDiv>
      <StyledP>(주) {demand?.branchName}</StyledP>
      <p>{demand?.branchLocation}</p>
      <p>{demand?.branchContact}</p>
    </StyledDemandDiv>
  );
};

export default OfficerDemandDiv;

const StyledDemandDiv = styled.div`
  text-align: center;
  border: 1px solid black;
  font-weight: normal;
  color: black;
  font-size: 20px;

  p {
    margin: 12px;
  }
`

const StyledP = styled.p`
  font-weight: bold;
  font-size: 23px;
`