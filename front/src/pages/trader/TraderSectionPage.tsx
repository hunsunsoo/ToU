import styled from "styled-components";
import TraderHeader from "../../components/organisms/trader/TraderHeader";
import TraderDropdownTitle from "../../components/organisms/trader/TraderDropdownTitle";
import { MainPaddingContainer } from "../../commons/style/mobileStyle/MobileLayoutStyle";
import TraderSectionFilter from "../../components/molecules/trader/TraderSectionFilter";
import TraderSectionTable from "../../components/organisms/trader/TraderSectionTable";
import { useRecoilValue } from "recoil";
import { CompanyInfoState } from "../../store/State";
import { useEffect, useState } from "react";
import { customAxios } from "../../components/api/customAxios";

interface Item {
  seq: number;
  name: string;
}

interface Branch {
  branchSeq: number;
  branchName: string;
}

const TraderSectionPage = () => {
  const currentCompanySeq = useRecoilValue(CompanyInfoState).companySeq;

  const [branchs, setBranchs] = useState<Branch[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<Item | null>(null);
  const [selectedBranchSeq, setSelectedBranchSeq] = useState<number>();

  // branch에 대한 드롭다운 항목
  const branchDropdownItems = branchs.map((branch) => ({
    seq: branch.branchSeq,
    name: branch.branchName,
  }));

  const handleSelectBranch = (item: Item) => {
    setSelectedBranch(item);
    setSelectedBranchSeq(item.seq);
  };

  useEffect(() => {
    customAxios
      .get(`/client/worker/branch/list/${currentCompanySeq}`)
      .then((res) => {
        console.log(res);
        setBranchs(res.data.data.branchList);
      });
  }, [currentCompanySeq]);

  return (
    <StyledContainer>
      <StyledHeader>
        <TraderHeader title="거래 명세서 내역 조회" />
      </StyledHeader>

      <MainPaddingContainer>
        <TraderDropdownTitle
          inputTitle="관할 구역"
          items={branchDropdownItems}
          selectedItem={selectedBranch}
          onSelect={handleSelectBranch}
        />
        <TraderSectionFilter />
        <TraderSectionTable />
      </MainPaddingContainer>
    </StyledContainer>
  );
};

export default TraderSectionPage;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledHeader = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 12;
`;
