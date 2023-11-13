import styled from "styled-components";
import TraderHeader from "../../components/organisms/trader/TraderHeader";
import TraderDropdownTitle from "../../components/organisms/trader/TraderDropdownTitle";
import { MainPaddingContainer } from "../../commons/style/mobileStyle/MobileLayoutStyle";
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
    customAxios.get(`/client/worker/branch/list`).then((res) => {
      console.log(res.data.data);
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
      <StyledDiv>
        <TraderDropdownTitle
          inputTitle="관할 구역"
          items={branchDropdownItems}
          selectedItem={selectedBranch}
          onSelect={handleSelectBranch}
        />
      </StyledDiv>
      <StyledMainPaddingContainer>
        {/* <TraderSectionFilter /> */}

        {!selectedBranch && <p>관할 구역을 선택해주세요.</p>}

        {selectedBranch && tableData.length === 0 && (
          <p>거래명세서가 존재하지 않습니다.</p>
        )}

        {selectedBranch && tableData.length > 0 && (
          <TraderSectionTable data={tableData} />
        )}
      </StyledMainPaddingContainer>
    </StyledContainer>
  );
};

export default TraderSectionPage;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f0f0f0;
  height: 100vh;
`;

const StyledHeader = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 12;
`;

const StyledMainPaddingContainer = styled(MainPaddingContainer)`
  background-color: #fff; // 내부 박스 배경색으로 흰색을 설정합니다.
  margin: 1rem; // 상하좌우 여백을 줍니다.
  border-radius: 20px; // 모서리를 둥글게 처리합니다.
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // 그림자 효과를 추가합니다.
  overflow-y: scroll;
  height: 100%;
`;

const StyledDiv = styled.div`
  margin: 0 1rem; // 상하좌우 여백을 줍니다.
`;
