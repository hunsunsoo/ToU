import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { MainPaddingContainer } from "../../commons/style/mobileStyle/MobileLayoutStyle";
import TraderHeader from "../../components/organisms/trader/TraderHeader";
import TraderItemHeader from "../../components/organisms/trader/TraderItemHeader";
import TraderInputTitle from "../../components/organisms/trader/TraderInputTitle";
import TraderInfoTitle from "../../components/organisms/trader/TraderInfoTitle";
import TraderCalendarTitle from "../../components/organisms/trader/TraderCalendarTitle";
import TraderDropdownTitle from "../../components/organisms/trader/TraderDropdownTitle";
import TraderItemDropdownTitle from "../../components/organisms/trader/TraderItemDropdownTitle";
import TraderBtn from "../../components/atoms/trader/TraderBtn";
import TraderUnitInputTitle from "../../components/organisms/trader/TraderUnitInputTitle";
import { customAxios } from "../../components/api/customAxios";
import toast from "react-hot-toast";
import StepIndicator from "../../components/organisms/trader/TraderStepIndicator";

interface DropdownItem {
  seq: number;
  name: string;
}

interface StockDropdownItem {
  seq: number;
  name: string;
  date: Date;
}

interface Company {
  companySeq: number;
  companyName: string;
}

interface Branch {
  branchSeq: number;
  branchName: string;
}

interface Stock {
  stockSeq: number;
  stockDate: Date;
  stockQuantity: number;
  stockUnit: string;
  stockName: string;
  stockPrice: number;
  stockTotalPrice: number;
  note?: string;
  selectedStock?: StockDropdownItem;
}

const TraderCreatePage = () => {
  const navigate = useNavigate();

  const fetchToken = () => {
    const storedValue = localStorage.getItem("recoil-persist");
    return storedValue
      ? JSON.parse(storedValue)?.UserInfoState?.accessToken
      : null;
  };

  const [reqStep, setReqStep] = useState(1);

  const [isValid, setIsValid] = useState(false); // 모든 입력값이 유효한지에 대한 상태

  // company 목록 조회
  const [companys, setCompanys] = useState<Company[]>([]);
  // 선택 company 정보
  const [selectedCompanySeq, setSelectedCompanySeq] = useState<number>();

  // branch 목록 조회 (company의)
  const [branchs, setBranchs] = useState<Branch[]>([]);
  // 선택 branch 정보
  const [selectedBranchSeq, setSelectedBranchSeq] = useState<number>();

  // stock 목록 조회
  const [stocks, setStocks] = useState<Stock[]>([]);
  // 선택 Stock 정보
  const [selectedStockSeq, setSelectedStockSeq] = useState<number>();

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

  // stock에 대한 드롭다운 항목
  const stockDropdownItems = stocks.map((stock) => ({
    seq: stock.stockSeq,
    name: stock.stockName,
    date: stock.stockDate,
  }));

  //거래일자
  const [selectedDate, setSelectedDate] = useState<Date | Date[] | null>(
    new Date()
  );

  const [selectedCompany, setSelectedCompany] = useState<DropdownItem | null>(
    null
  );
  const [selectedBranch, setSelectedBranch] = useState<DropdownItem | null>(
    null
  );
  const [selectedStock, setSelectedStock] = useState<StockDropdownItem | null>(
    null
  );

  const [selectedSeqList, setSelectedSeqList] = useState<number[]>([]);

  const handleSelectCompany = (dropdownItem: DropdownItem) => {
    setSelectedCompany(dropdownItem);
    setSelectedCompanySeq(dropdownItem.seq);
  };

  const handleSelectBranch = (dropdownItem: DropdownItem) => {
    setSelectedBranch(dropdownItem);
    setSelectedBranchSeq(dropdownItem.seq);
  };

  const handleSelectStock = (
    index: number,
    dropdownItem: StockDropdownItem
  ) => {
    setSelectedStock(dropdownItem);
    setSelectedStockSeq(dropdownItem.seq);

    const stockDetails = stocks.find(
      (stock) => stock.stockSeq === dropdownItem.seq
    );
    if (stockDetails) {
      setItems((prevItems) => {
        const updatedItems = [...prevItems];
        updatedItems[index] = {
          ...updatedItems[index],
          ...stockDetails,
          stockTotalPrice: stockDetails.stockQuantity * stockDetails.stockPrice,
          selectedStock: dropdownItem,
        };
        return updatedItems;
      });

      // 이전에 선택된 품목이 있었다면, selectedSeqList에서 제거
      const previousSelectedItem = items[index].selectedStock;
      if (
        previousSelectedItem &&
        previousSelectedItem.seq !== dropdownItem.seq
      ) {
        setSelectedSeqList((prevSeqList) =>
          prevSeqList.filter((seq) => seq !== previousSelectedItem.seq)
        );
      }

      // selectedSeqList에 새로운 선택 항목 추가
      setSelectedSeqList((prevSeqList) => {
        // 이미 선택된 항목은 다시 추가하지 않음
        if (prevSeqList.includes(dropdownItem.seq)) {
          return prevSeqList;
        } else {
          return [...prevSeqList, dropdownItem.seq];
        }
      });
    }
  };

  // 드롭박스 목록에서 이미 선택된 품목을 제외하는 함수
  const getAvailableItems = () => {
    const selectedStockSeqs = items
      .map((item) => item.selectedStock?.seq)
      .filter(Boolean);
    return stockDropdownItems.filter(
      (item) => !selectedStockSeqs.includes(item.seq)
    );
  };

  const [showAddButton, setShowAddButton] = useState(true);
  const [showNextButton, setShowNextButton] = useState(true);

  const [items, setItems] = useState<Stock[]>([
    {
      stockSeq: -1,
      stockDate: new Date(),
      stockQuantity: 0,
      stockUnit: "",
      stockName: "",
      stockPrice: 0,
      stockTotalPrice: 0,
      note: "",
    },
  ]);

  const nextHandler = () => {
    setReqStep((prevReqStep) => prevReqStep + 1);
  };

  const goBackToStep = () => {
    setReqStep(reqStep - 1);
  };

  useEffect(() => {
    const accessToken = fetchToken();
    if (accessToken) {
      customAxios
        .get("/client/worker/company/list", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          setCompanys(res.data.data.companyList);
        });
    }
  }, []);

  useEffect(() => {
    const accessToken = fetchToken();
    if (accessToken && selectedCompanySeq) {
      customAxios
        .get(`client/worker/branch/list/${selectedCompanySeq}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          setBranchs(res.data.data.branchList);
        });
    }
  }, [selectedCompanySeq]);

  useEffect(() => {
    const accessToken = fetchToken();
    if (accessToken) {
      customAxios
        .get(`stock/worker/list/out`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          const updatedStockItems = res.data.data.stockList.map(
            (stockItem: Stock) => {
              return { ...stockItem };
            }
          );
          setStocks(updatedStockItems);
        });
    }
  }, []);

  const convertDateToString = (date: Date): string => {
    return date.toISOString().slice(0, 19);
  };

  const handleStatementCreate = () => {
    const accessToken = fetchToken();
    if (accessToken && selectedDate) {
      const dateToAdjust = Array.isArray(selectedDate)
        ? selectedDate[0]
        : selectedDate;

      // 9시간을 더한 새로운 Date 객체 생성
      const adjustedDate = new Date(
        dateToAdjust.getTime() + 18 * 60 * 60 * 1000
      );

      const body = {
        responseBranch: selectedBranchSeq,
        tradeDate: convertDateToString(adjustedDate),
        items: selectedSeqList,
      };

      console.log(body);

      customAxios
        .post(`statement/worker`, body, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          if (res.status === 200) {
            toast.success("거래명세서 생성을 성공했습니다.", {
              duration: 1000,
            });
            setTimeout(() => {}, 1000);
            const statementSeq: string = res.data.data.statementSeq;
            navigate(`/m/confirm/${statementSeq}`);
          } else {
            toast.error("요청이 실패했습니다.", {
              duration: 1000,
            });
            setTimeout(() => {}, 1000);
          }
        })
        .catch((res) => {
          toast.error("서버 에러", {
            duration: 1000,
          });
          setTimeout(() => {}, 1000);
        });
    }
  };

  const checkValidity = () => {
    const isCompanySelected = selectedCompany !== null;
    const isBranchSelected = selectedBranch !== null;
    const isDateSelected =
      selectedDate instanceof Date && !isNaN(selectedDate.valueOf());

    setIsValid(isCompanySelected && isBranchSelected && isDateSelected);
  };

  useEffect(() => {
    checkValidity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompany, selectedBranch, selectedDate]);

  useEffect(() => {
    // 모든 항목이 유효한지 검사.
    const allItemsValid = items.every((item) => {
      const isValidStock = item.stockSeq > -1;
      const isValidQuantity = item.stockQuantity > 0;
      const isValidPrice = item.stockPrice > 0;
      const isValidTotalPrice = item.stockTotalPrice > 0;
      return (
        isValidStock && isValidQuantity && isValidPrice && isValidTotalPrice
      );
    });

    setShowAddButton(allItemsValid);
    setShowNextButton(items.length > 0 && allItemsValid);
  }, [items]);

  const handleInputChange = (
    index: number,
    field: keyof Stock,
    value: string
  ) => {
    setItems((prevItems) => {
      return prevItems.map((item, idx) => {
        if (idx !== index) {
          return item;
        }
        return {
          ...item,
          [field]: value,
        };
      });
    });
  };

  const addItem = () => {
    setItems((prevItems) => [
      ...prevItems,
      {
        stockSeq: -1, // 적절한 기본값으로 설정해야 함
        stockDate: new Date(), // 현재 날짜나 적절한 기본값으로 설정
        stockQuantity: 0,
        stockUnit: "", // 기본 단위 설정이 필요할 수 있음
        stockName: "", // 기본 품목명 설정이 필요할 수 있음
        stockPrice: 0,
        stockTotalPrice: 0,
        note: "",
        selectedStockName: null,
      },
    ]);
  };

  const removeItem = (index: number) => {
    const removedItemSeq = items[index].selectedStock?.seq;

    setItems((prevItems) => prevItems.filter((_, i) => i !== index));

    if (removedItemSeq != null) {
      setSelectedSeqList((prevSeqList) =>
        prevSeqList.filter((seq) => seq !== removedItemSeq)
      );
    }
  };

  useEffect(() => {
    console.log("selectedStockSeqs:", selectedSeqList);
  }, [selectedSeqList]);

  // 가격 표기 형식 변환 및 '원' 단위 추가
  const formatPrice = (number: number) => {
    return `${new Intl.NumberFormat("ko-KR").format(number)} 원`;
  };

  return (
    <>
      {reqStep === 1 ? (
        <StyledContainer>
          <StyledHeader>
            <TraderHeader title="거래 명세서 생성" />
          </StyledHeader>

          <StyledBody>
            <MainPaddingContainer>
              <StepIndicator steps={3} currentStep={1} />
              <TraderInfoTitle infoTitle="인수자 정보 입력" />
              <StyledBodyInfo>
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
              </StyledBodyInfo>
            </MainPaddingContainer>
          </StyledBody>
          <StyledFooter>
            <TraderBtn
              size="Large"
              color={isValid ? "Blue" : "BlueDisabled"}
              onClick={nextHandler}
              disabled={!isValid}
            >
              다음
            </TraderBtn>
          </StyledFooter>
        </StyledContainer>
      ) : reqStep === 2 ? (
        <StyledContainer>
          <StyledHeader>
            <TraderItemHeader title="거래 명세서 생성" onBack={goBackToStep} />
          </StyledHeader>

          <StyledBody>
            <MainPaddingContainer>
              <StepIndicator steps={3} currentStep={2} />
              <TraderInfoTitle infoTitle="거래 일자 등록" />
              <StyledBodyInfo>
                <TraderCalendarTitle
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                />
              </StyledBodyInfo>
            </MainPaddingContainer>
          </StyledBody>

          <StyledFooter>
            <TraderBtn
              size="Large"
              color={isValid ? "Blue" : "BlueDisabled"}
              onClick={nextHandler}
              disabled={!isValid}
            >
              다음
            </TraderBtn>
          </StyledFooter>
        </StyledContainer>
      ) : reqStep === 3 ? (
        <StyledItemContainer>
          <StyledItemHeader>
            <TraderItemHeader title="거래 명세서 생성" onBack={goBackToStep} />
          </StyledItemHeader>
          <StyledItemBody>
            <MainPaddingContainer>
              <StepIndicator steps={3} currentStep={3} />
              <StyledInfoTitle>
                <TraderInfoTitle infoTitle="품목 정보 입력" />
              </StyledInfoTitle>
              {items.map((item, index) => (
                <div key={index}>
                  <StyledSpan>
                    ( {index + 1} / {items.length} )
                  </StyledSpan>
                  <TraderItemDropdownTitle
                    inputTitle="품목명"
                    items={getAvailableItems()}
                    selectedItem={item.selectedStock}
                    onSelect={(dropdownItem) =>
                      handleSelectStock(index, dropdownItem)
                    }
                  />
                  <TraderUnitInputTitle
                    inputTitle="수량"
                    value={`${item.stockQuantity}`}
                    selectedUnit={item.stockUnit}
                    onChange={(e) =>
                      handleInputChange(index, "stockQuantity", e.target.value)
                    }
                  />
                  <TraderInputTitle
                    inputTitle="단가"
                    size="Large"
                    value={`${formatPrice(item.stockPrice)}`}
                    onChange={(e) =>
                      handleInputChange(index, "stockPrice", e.target.value)
                    }
                  />
                  <TraderInputTitle
                    inputTitle="금액"
                    size="Large"
                    value={`${formatPrice(item.stockTotalPrice)}`}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "stockTotalPrice",
                        e.target.value
                      )
                    }
                  />

                  <StyledTraderInputTitle
                    inputTitle="비고"
                    size="X-Large"
                    value={item.note || ""}
                    onChange={(e) =>
                      handleInputChange(index, "note", e.target.value)
                    }
                  />
                  <StyledDeleteItem>
                    <TraderBtn
                      size="Small"
                      color="White"
                      onClick={() => removeItem(index)}
                    >
                      삭제
                    </TraderBtn>
                  </StyledDeleteItem>
                </div>
              ))}
              {showAddButton && (
                <StyledAddItemButton>
                  <TraderBtn
                    size="X-Medium"
                    color="Transparent"
                    onClick={addItem}
                  >
                    + 품목 추가
                  </TraderBtn>
                </StyledAddItemButton>
              )}
            </MainPaddingContainer>
          </StyledItemBody>

          <StyledFooter>
            <TraderBtn
              size="Large"
              color={showNextButton ? "Blue" : "BlueDisabled"}
              onClick={() => handleStatementCreate()}
              disabled={!showNextButton}
            >
              다음
            </TraderBtn>
          </StyledFooter>
        </StyledItemContainer>
      ) : null}
    </>
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

const StyledBodyInfo = styled.div`
  margin: 0 1rem 0 1rem;
`;

// 공통
const StyledFooter = styled.div`
  width: 100%;
  position: sticky;
  bottom: 0;
`;

////  itemPage

const StyledItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledItemHeader = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 12;
`;

const StyledItemBody = styled.div`
  padding-bottom: 70px;
`;

const StyledDeleteItem = styled.div`
  padding-top: 30px;
  padding-bottom: 1.875rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid var(--festie-gray-600, #010000);
`;

const StyledAddItemButton = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledInfoTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledSpan = styled.span`
  display: inline-flex;
  margin-top: 1rem;
  justify-content: right;
  height: 4vh;
  width: 100%;
  font-size: 20px;
  font-weight: bold;
`;

const StyledTraderInputTitle = styled(TraderInputTitle)`
  > div {
    align-items: flex-start;
    margin: 0;
  }
`;
