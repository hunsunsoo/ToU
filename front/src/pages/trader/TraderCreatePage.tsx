import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { MainPaddingContainer } from "../../commons/style/mobileStyle/MobileLayoutStyle";
import TraderSubtitle from "../../components/atoms/trader/TraderSubtitle";
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
  stockPrice2: number;
  note?: string;
}

interface Item {
  unit: string;
  price: string;
  amount: string;
  note: string;
}

const TraderCreatePage = () => {
  const navigate = useNavigate();

  const [reqStep, setReqStep] = useState(1);

  const [companyName, setCompanyName] = useState("");
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

  const [selectedCompany, setSelectedCompany] = useState<DropdownItem | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<DropdownItem | null>(null);
  const [selectedStock, setSelectedStock] = useState<StockDropdownItem | null>(null);
  

  const handleSelectCompany = (dropdownItem: DropdownItem) => {
    setSelectedCompany(dropdownItem);
    setSelectedCompanySeq(dropdownItem.seq);
  };

  const handleSelectBranch = (dropdownItem: DropdownItem) => {
    setSelectedBranch(dropdownItem);
    setSelectedBranchSeq(dropdownItem.seq);
  };

  const handleSelectStock = (dropdownItem: StockDropdownItem) => {
    setSelectedStock(dropdownItem);
    setSelectedStockSeq(dropdownItem.seq);
  };


  const [showAddButton, setShowAddButton] = useState(true);
  const [showNextButton, setShowNextButton] = useState(true);
  const [items, setItems] = useState<Item[]>([
    {
      unit: "",
      price: "",
      amount: "",
      note: "",
    },
  ]);


  const checkValidity = () => {
    const isCompanySelected = selectedCompany !== null;
    const isBranchSelected = selectedBranch !== null;
    const isDateSelected = selectedDate instanceof Date && !isNaN(selectedDate.valueOf());
   
    setIsValid(isCompanySelected && isBranchSelected && isDateSelected);
  };

  const nextHandler = (() => {
    setReqStep(prevReqStep => prevReqStep + 1);
  })

  const goBackToStep1 = () => {
    setReqStep(1); // 예를 들어, reqStep을 1로 설정하는 함수입니다.
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
          console.log(res.data.data.branchList);
          setBranchs(res.data.data.branchList);
        }
      );
    }
  }, [selectedCompanySeq]);

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

    // 가격 계산 함수
    const calculatePrice = (price: number, quantity: number) => {
      const price1 = Math.round(price * quantity);
      const price2 = Math.round(price * quantity / 10);
      return { price1, price2 };
    };

    // 판매용 재고 목록 조회
    customAxios(`stock/worker/list/out`)
      .then((res) => {
        console.log(res);
        console.log(res.data.data.stockList);
        const updatedStockItems = res.data.data.stockList.map((stockitem: Stock) => {
          const { price1, price2 } = calculatePrice(stockitem.stockPrice, stockitem.stockQuantity);
          return {
            ...stockitem,
            stockPrice1: price1,
            stockPrice2: price2,
          };
        });
        setStocks(updatedStockItems);
      })
    }, []);




  useEffect(() => {
    checkValidity();
  }, [selectedCompany, selectedBranch, selectedDate]);


  useEffect(() => {
    if (items.length >= 20) {
      setShowAddButton(false);
    }
  }, [items]);

  useEffect(() => {
    const allValid = items.every(
      (item) => item.unit && item.price && item.amount && item.note
    );
    setShowAddButton(allValid);
  }, [items]);

  useEffect(() => {
    const allValid =
      items.length > 0 &&
      items.every(
        (item) => item.unit && item.price && item.amount && item.note
      );
    setShowNextButton(allValid);
  }, [items]);

  const handleInputChange = (
    index: number,
    field: keyof Item,
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

  const handleItemClick = (billId: number) => {
    navigate(`/m/confirm/${billId}`);
  };

  const addItem = () => {
    setItems((prevItems) => [
      ...prevItems,
      { unit: "", price: "", amount: "", note: "" },
    ]);
  };

  const removeItem = (index: number) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  return (
    <>
       {reqStep === 1 ? (
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
              onClick={nextHandler}
              disabled={!isValid}
            >
              다음
            </TraderBtn>
          </StyledFooter>
        </StyledContainer>
        ) : reqStep === 2 ? (
          <StyledItemContainer>

          <StyledItemHeader>
            <TraderItemHeader title="거래 명세서 생성" onBack={goBackToStep1} />
            <TraderSubtitle subtitle="거래 품목 등록" />
          </StyledItemHeader>
    
          <StyledItemBody>
            <MainPaddingContainer>
              {items.map((item, index) => (
                <div key={index}>
                  <StyledInfoTitle>
                    <TraderInfoTitle infoTitle="품목 정보" />
                    <StyledSpan>
                      ( {index + 1} / {items.length} )
                    </StyledSpan>
                  </StyledInfoTitle>
                  <TraderItemDropdownTitle
                    inputTitle="품목"
                    items={stockDropdownItems}
                    selectedItem={selectedStock}
                    onSelect={handleSelectStock} />
                  <TraderUnitInputTitle
                    inputTitle="수량"
                    value={item.unit}
                    onChange={(e) =>
                      handleInputChange(index, "unit", e.target.value)
                    }
                  />
                  <TraderInputTitle
                    inputTitle="단가"
                    size="Large"
                    value={item.price}
                    onChange={(e) =>
                      handleInputChange(index, "price", e.target.value)
                    }
                  />
                  <TraderInputTitle
                    inputTitle="금액"
                    size="Large"
                    value={item.amount}
                    onChange={(e) =>
                      handleInputChange(index, "amount", e.target.value)
                    }
                  />
                  <StyledTraderInputTitle
                    inputTitle="비고"
                    size="X-Large"
                    value={item.note}
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
                  <TraderBtn size="X-Medium" color="Transparent" onClick={addItem}>
                    + 품목 추가
                  </TraderBtn>
                </StyledAddItemButton>
              )}
            </MainPaddingContainer>
          </StyledItemBody>
    
          <StyledFooter>
            <TraderBtn
              size="Large"
              color={showNextButton ? "Blue" : "Grey"}
              onClick={() => handleItemClick(2)} // 여기 billId 받아야 함
              disabled={!showNextButton}
            >
              다음
            </TraderBtn>
          </StyledFooter>
    
        </StyledItemContainer>
        ) : null
      }
  
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


// 공통
const StyledFooter = styled.div`
  width: 100%;
  position: fixed;
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
  padding-bottom: 30px;
  margin-bottom: 20px;
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
  align-items: center;
  height: 4vh;
  width: 80px;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 0.8px solid var(--festie-gray-600, #949494);
`;

const StyledTraderInputTitle = styled(TraderInputTitle)`
  > div {
    align-items: flex-start;
    margin: 0;
  }
`;
