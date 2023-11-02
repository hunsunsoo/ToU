import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan  } from "@fortawesome/sharp-light-svg-icons";
import { faCheck  } from "@fortawesome/sharp-regular-svg-icons";

import { MainPaddingContainer } from "../../commons/style/mobileStyle/MobileLayoutStyle";
import TraderSubtitle from "../../components/atoms/trader/TraderSubtitle";
import TraderHeader from "../../components/organisms/trader/TraderHeader";
import TraderInputTitle from "../../components/organisms/trader/TraderInputTitle";
import TraderInfoTitle from "../../components/organisms/trader/TraderInfoTitle";
import TraderBtn from "../../components/atoms/trader/TraderBtn";
import TraderItemSearchBox from "../../components/organisms/trader/TraderItemSearchBox";
import TraderConfirmTable from "../../components/organisms/trader/TraderConfirmTable";

const TraderConfirmPage = () => {
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [section, setSection] = useState("");
  const [managerName, setManagerName] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [icon, setIcon] = useState(faPenToSquare);
  const [tableIcon, setTableIcon] = useState(faPenToSquare);
  const [isEditable, setIsEditable] = useState(false);
  
  const handleIconClick = () => {
    setDisabled(!disabled);
    setIcon(disabled ? faCheck : faPenToSquare);
  };
  
  const handleItemIconClick = () => {
    setIsEditable(!isEditable);
    setTableIcon(isEditable ? faPenToSquare : faCheck);
  };

  return (
    <StyledContainer>
      <StyledHeader>
        <TraderHeader title="거래 명세서 검토" />
        <TraderSubtitle subtitle="거래 품목 확인" />
      </StyledHeader>
      <StyledBody>
        <MainPaddingContainer>
          <StyledInfoTitle>
            <TraderInfoTitle infoTitle="인수자 정보" />
            <StyledSpan>
              <FontAwesomeIcon
                icon={icon}
                size="xl"
                style={{ color: "#000000" }}
                onClick={handleIconClick}
              />
            </StyledSpan>
          </StyledInfoTitle>
          <TraderInputTitle
            inputTitle="업체명"
            size="Large"
            value="{companyName}"
            onChange={(e) => setCompanyName(e.target.value)}
            disabled={disabled}
          />
          <TraderInputTitle
            inputTitle="관할 구역"
            size="Large"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            disabled={disabled}
          />
          <TraderInputTitle
            inputTitle="담당자"
            size="Large"
            value={managerName}
            onChange={(e) => setManagerName(e.target.value)}
            disabled={disabled}
          />
          <StyledInfoTitle>
            <TraderInfoTitle infoTitle="품목 정보" />
            <StyledSpan>
              <FontAwesomeIcon
                icon={tableIcon}
                size="xl"
                style={{ color: "#000000" }}
                onClick= {handleItemIconClick}
              />
            </StyledSpan>
          </StyledInfoTitle>
          <TraderItemSearchBox/>
          <TraderConfirmTable isEditable={isEditable}/>
        </MainPaddingContainer>
      </StyledBody>
      <StyledFooter>
        <TraderBtn
          size="Large"
          color="Blue"
          onClick={() => {
            navigate("/m/create/sign");
          }}
        >
          다음
        </TraderBtn>
      </StyledFooter>
    </StyledContainer>
  );
};

export default TraderConfirmPage;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledHeader = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
`;
const StyledBody = styled.div`
  /* padding-top: 60px; */
  /* position: fixed; */
`;

const StyledFooter = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
`;

const StyledInfoTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledSpan = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  height: 4vh;
  width: 80px;
  border-bottom: 0.8px solid var(--festie-gray-600, #949494);
`;

