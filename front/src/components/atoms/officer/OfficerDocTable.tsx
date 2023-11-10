import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { customAxios } from "../../api/customAxios";

interface statementList {
  statementSeq: number;
  companyName: string;
  myWorkerName?: string;
  otherWorkerName?: string;
  productName: string;
  totalPrice?: number;
  tradeDate: Date;
  statementStatus: string;
}

interface pageConfig {
  currentPage?: number;
  totalPages: number | undefined;
  size?: number;
}

interface paramConfig {
  page: number;
  type: "req" | "res";
  companyName?: string;
  isMine: boolean;
  myWorkerName?: string;
  otherWorkerName?: string;
  productName?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
}

interface OfficerDocTableProps {
  isSupply: boolean;
  params: paramConfig;
  setParams: React.Dispatch<React.SetStateAction<paramConfig>>;
}

const Pagination: React.FC<pageConfig & { onChangePage: (page: number) => void }> = ({ totalPages, currentPage, onChangePage }) => {
  if (totalPages === undefined) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const changePage = (page: number) => {
    onChangePage(page);
  };

  return (
    <PaginationDiv>
      {pages.map((page) => (
        <StyledBtn key={page} onClick={() => changePage(page)} disabled={currentPage === page}>
          {page}
        </StyledBtn>
      ))}
    </PaginationDiv>
  );
};

const PaginationDiv = styled.div`
  display: flex;
  justify-content: center;
`

const StyledBtn = styled.button`
  /* background-color: white; */
  border: 0;
  margin: 0 5px;
  /* font-size: 20px; */
`











const OfficerDocTable: React.FC<OfficerDocTableProps> = ({ isSupply, params, setParams  }) => {
  const navigate = useNavigate();
  // 상품 목록 조회
  const [statements, setStatements] = useState<statementList[]>([]);

  // 페이지네이션
  const [pageInfo, setPageInfo] = useState<pageConfig>();

  const handleRowClick = (statementSeq: number) => {
    // 페이지 이동 로직
    navigate(`/detail/${statementSeq}`);
  };

  useEffect(() => {
    // 토큰 들어오는거 기다리기
    const awaitToken = async () => {
      return new Promise((resolve) => {
        const checkToken = () => {
          const storedValue = localStorage.getItem("recoil-persist");
          const accessToken = storedValue && JSON.parse(storedValue)?.UserInfoState?.accessToken;
          
          if (accessToken) {
            resolve(accessToken);
          } else {
            setTimeout(checkToken, 1000); // 1초마다 토큰 체크
          }
        };
        checkToken();
      });
    };

    // 거래명세서 검색
    const awaitSearchStatement = async () => {
      try {
        const accessToken = await awaitToken();
        if (!accessToken) {
          return;
        }

        // 필요한 값이 있을 때만 paramsObject에 추가
        const getRequestParams = () => {
          const paramsObject: Record<string, any> = {};
      
          if (params.page) paramsObject.page = params.page;
          if (params.type) paramsObject.type = params.type;
          if (params.companyName) paramsObject.companyName = params.companyName;
          if (params.isMine !== undefined) paramsObject.isMine = params.isMine;
          if (params.myWorkerName !== null) paramsObject.myWorkerName = params.myWorkerName;
          if (params.otherWorkerName) paramsObject.otherWorkerName = params.otherWorkerName;
          if (params.productName) paramsObject.productName = params.productName;
          if (params.startDate) paramsObject.startDate = params.startDate;
          if (params.endDate) paramsObject.endDate = params.endDate;
          if (params.status) paramsObject.status = params.status;
      
          return paramsObject;
        };

        // API Axios
        const res = await customAxios.get(`statement/worker/list/web`, { params: getRequestParams() });
        setStatements(res.data.data.statementList || []);
        setPageInfo(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    awaitSearchStatement();

  }, [params]);

  const handleChangePage = (page: number) => {
    setParams({ ...params, page });
  };

  return (
    <>
      <StyledTable>
        <thead>
          <tr>
            <th></th>
            <th>업체명</th>
            {isSupply ? (
              <th>본사 담당자</th>
            ) : (
              <th>거래처 담당자</th>
            )}
            <th>품목</th>
            <th>금액</th>
            <th>거래 일시</th>
            <th>거래 상태</th>
          </tr>
        </thead>
        <tbody>
          {statements.length > 0 ? (
            statements.map((statement, index) => (
              <tr key={index} onClick={() => handleRowClick(statement.statementSeq)}>
                <td></td>
                <td>{statement.companyName}</td>
                {isSupply ? (
                  <td>{statement.myWorkerName}</td>
                ) : (
                  <td>{statement.otherWorkerName}</td>
                )}
                <td>{statement.productName}</td>
                <td>{statement.totalPrice}</td>
                {/* <td>{statement.tradeDate}</td> */}
                <td>{new Date(statement.tradeDate).toLocaleString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                }).replace(/(\d+)\/(\d+)\/(\d+),?/, '$3-$1-$2 ')}</td>
                <td>{statement.statementStatus}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>데이터가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </StyledTable>
      <Pagination totalPages={pageInfo?.totalPages} currentPage={pageInfo?.currentPage} onChangePage={handleChangePage} />
    </>
  );
};

export default OfficerDocTable;

const StyledTable = styled.table`
  margin: 10px;
  width: calc(100% - 20px);
  border-collapse: collapse;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }

  td {
    font-size: 14px;
    font-weight: normal;
    color: black;

    /* 각 td에 너비 지정 */
    &:nth-child(1) {
      width: 3%;
    }

    &:nth-child(2) {
      width: 12%;
    }

    &:nth-child(3) {
      width: 13%;
    }

    &:nth-child(4) {
      width: 20%;
    }

    &:nth-child(5) {
      width: 12%;
    }
  }

  th {
    background-color: rgba(217, 217, 217, 0.3);
  }
`;