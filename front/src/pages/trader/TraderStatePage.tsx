import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TraderBtn from "../../components/atoms/trader/TraderBtn";
import TraderRoleDropdown from "../../components/atoms/trader/TraderRoleDropdown";
import TraderHeader from "../../components/organisms/trader/TraderHeader";
import { MainPaddingContainer } from "../../commons/style/mobileStyle/MobileLayoutStyle";
import TraderStateFilter from "./../../components/molecules/trader/TraderStateFilter";
import TraderStateTable from "../../components/organisms/trader/TraderStateTable";
import styled from "styled-components";

const TraderStatePage = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("전체");

  const handleMainButtonClick = () => {
    navigate("/m/main");
  };

  return (
    <StyledContainer>
      <StyledHeader>
        <TraderHeader title="거래 상태 조회" />
        <TraderRoleDropdown setSelectedRole={setSelectedRole} />
      </StyledHeader>

      <MainPaddingContainer>
        <StyledBody>
          <TraderStateFilter />
          <TraderStateTable selectedRole={selectedRole} />
        </StyledBody>
      </MainPaddingContainer>

      <StyledFooter>
        <TraderBtn size="Large" color="Blue" onClick={handleMainButtonClick}>
          메인으로
        </TraderBtn>
      </StyledFooter>
    </StyledContainer>
  );
};

export default TraderStatePage;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 188px);
`;

const StyledHeader = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 12;
  background-color: #fff;
`;

const StyledFooter = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
`;
