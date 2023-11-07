import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { MainPaddingContainer } from "../../commons/style/mobileStyle/MobileLayoutStyle";
import TraderSubtitle from "../../components/atoms/trader/TraderSubtitle";
import TraderHeader from "../../components/organisms/trader/TraderHeader";
import TraderInputTitle from "../../components/organisms/trader/TraderInputTitle";
import TraderInfoTitle from "../../components/organisms/trader/TraderInfoTitle";
import TraderCalendarTitle from "../../components/organisms/trader/TraderCalendarTitle";
import TraderDropdownTitle from "../../components/organisms/trader/TraderDropdownTitle";
import TraderBtn from "../../components/atoms/trader/TraderBtn";
import { customAxios } from "../../components/api/customAxios";

interface Item {
  seq: number;
  name: string;
}

interface Company {
  companySeq: number;
  companyName: string;
}

interface Branch {
  branchSeq: number;
  branchName: string;
}

const TraderCreatePage = () => {
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [isValid, setIsValid] = useState(false); // 모든 입력값이 유효한지에 대한 상태

  // company 목록 조회
  const [companys, setCompanys] = useState<Company[]>([]);

  // 선택 company 정보
  const [selectedCompanySeq, setSelectedCompanySeq] = useState<number>();
  // const [selectedCompanyName, setSelectedCompanyName] = useState<string>("");

  // company의 branch 목록 조회
  const [branchs, setBranchs] = useState<Branch[]>([]);

  // 선택 branch 정보
  const [selectedBranchSeq, setSelectedBranchSeq] = useState<number>();
  // const [selectedBranchName, setSelectedBranchName] = useState<string>("");

  //company에 대한 드롭다운 항목
  const companyDropdownItems = companys.map((company) => ({
    seq: company.companySeq,
    name: company.companyName,
  }));

  // branch에 대한 드롭다운 항목
  const branchDropdownItems = branchs.map((branch) => ({
    seq: branch.branchSeq,
    name: branch.branchName,
  }));

  //거래일자
  const [selectedDate, setSelectedDate] = useState<Date | Date[] | null>(
    new Date()
  );

  const [selectedCompany, setSelectedCompany] = useState<Item | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<Item | null>(null);

  const handleSelectCompany = (item: Item) => {
    setSelectedCompany(item);
    setSelectedCompanySeq(item.seq);
  };

  const handleSelectBranch = (item: Item) => {
    setSelectedBranch(item);
    setSelectedBranchSeq(item.seq);
  };
  useEffect(() => {
    // 업체 목록 조회 API
    customAxios("/client/worker/company/list").then((res) => {
      console.log(res.data.data.companyList);
      setCompanys(res.data.data.companyList);
    });
  }, []);

  useEffect(() => {
    if (selectedCompanySeq) {
      customAxios(`client/worker/branch/list/${selectedCompanySeq}`).then(
        (res) => {
          // console.log(res.data.data.branchList);
          setBranchs(res.data.data.branchList);
        }
      );
    }
  }, [selectedCompanySeq]);

  const checkValidity = () => {
    const isCompanySelected = selectedCompany !== null;
    const isBranchSelected = selectedBranch !== null;
    const isDateSelected = selectedDate instanceof Date && !isNaN(selectedDate.valueOf());
   
    setIsValid(isCompanySelected && isBranchSelected && isDateSelected);
  };

  useEffect(() => {
    checkValidity();
  }, [selectedCompany, selectedBranch, selectedDate]);

  // useEffect(() => {
  //   console.log(selectedDate);
  // }, [selectedDate]);

  return (
    <StyledContainer>
      <StyledHeader>
        <TraderHeader title="거래 명세서 생성" />
        <TraderSubtitle subtitle="거래 업체 등록" />
      </StyledHeader>

      <StyledBody>
        <MainPaddingContainer>
          <TraderInfoTitle infoTitle="인수자 정보" />
          <TraderDropdownTitle
            inputTitle="업체명"
            items={companyDropdownItems}
            selectedItem={selectedCompany}
            onSelect={handleSelectCompany}
          />
          <TraderDropdownTitle
            inputTitle="관할 구역"
            items={branchDropdownItems}
            selectedItem={selectedBranch}
            onSelect={handleSelectBranch}
          />
          <TraderInfoTitle infoTitle="거래 일자 등록" />
          <TraderCalendarTitle
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
        </MainPaddingContainer>
      </StyledBody>

      <StyledFooter>
        <TraderBtn
          size="Large"
          color={isValid ? "Blue" : "Grey"}
          onClick={() => {
            navigate("/m/create/item");
          }}
          disabled={!isValid}
        >
          다음
        </TraderBtn>
      </StyledFooter>
    </StyledContainer>
  );
};

export default TraderCreatePage;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledHeader = styled.div`
  width: 100%;
`;

const StyledBody = styled.div``;

const StyledFooter = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
`;
