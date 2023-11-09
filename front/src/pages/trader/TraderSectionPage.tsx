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

export interface TableRow {
  companyName: string;
  productName: string;
  tradeDate: string;
  workerName: string;
  statementSeq: number;
}

interface Statement {
  statementSeq: number;
  reqBranchSeq: number;
  reqBranchName: string;
  resBranchSeq: number;
  resBranchName: string;
  productName: string;
  tradeDate: string;
}

const TraderSectionPage = () => {
  const currentCompanySeq = useRecoilValue(CompanyInfoState).companySeq;

  const [branchs, setBranchs] = useState<Branch[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<Item | null>(null);
  const [selectedBranchSeq, setSelectedBranchSeq] = useState<number>();

  const [tableData, setTableData] = useState<TableRow[]>([]); // 테이블 데이터를 위한 상태 정의

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
        setBranchs(res.data.data.branchList);
      });
  }, [currentCompanySeq]);

  useEffect(() => {
    if (selectedBranchSeq) {
      customAxios.get(`/statement/worker/list/completion`).then((res) => {
        const statements: Statement[] = res.data.data.statementList;

        const filteredStatements = statements.filter(
          (statement) =>
            statement.reqBranchSeq === selectedBranchSeq ||
            statement.resBranchSeq === selectedBranchSeq
        );

        setTableData(
          filteredStatements.map((statement) => ({
            companyName: res.data.data.companyName,
            productName: statement.productName,
            tradeDate: statement.tradeDate,
            workerName:
              statement.reqBranchSeq === selectedBranchSeq
                ? statement.resBranchName
                : statement.reqBranchName,
            statementSeq: statement.statementSeq,
          }))
        );
      });
    }
  }, [selectedBranchSeq]);

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

        {!selectedBranch && <p>관할 구역을 선택해주세요.</p>}

        {selectedBranch && tableData.length === 0 && (
          <p>거래명세서가 존재하지 않습니다.</p>
        )}

        {selectedBranch && tableData.length > 0 && (
          <TraderSectionTable data={tableData} />
        )}
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
