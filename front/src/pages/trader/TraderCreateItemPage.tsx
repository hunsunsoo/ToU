import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { MainPaddingContainer } from "../../commons/style/mobileStyle/MobileLayoutStyle";
import TraderSubtitle from "../../components/atoms/trader/TraderSubtitle";
import TraderHeader from "../../components/organisms/trader/TraderHeader";
import TraderInputTitle from "../../components/organisms/trader/TraderInputTitle";
import TraderInfoTitle from "../../components/organisms/trader/TraderInfoTitle";
import TraderUnitInputTitle from "../../components/organisms/trader/TraderUnitInputTitle";
import TraderBtn from "../../components/atoms/trader/TraderBtn";
import TraderDropdownTitle from "../../components/organisms/trader/TraderDropdownTitle";

interface Item {
  unit: string;
  price: string;
  amount: string;
  note: string;
}

const TraderCreateItemPage: React.FC = () => {
  const navigate = useNavigate();

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
    <StyledContainer>

      <StyledHeader>
        <TraderHeader title="거래 명세서 생성" />
        <TraderSubtitle subtitle="거래 품목 등록" />
      </StyledHeader>

      <StyledBody>
        <MainPaddingContainer>
          {items.map((item, index) => (
            <div key={index}>
              <StyledInfoTitle>
                <TraderInfoTitle infoTitle="품목 정보" />
                <StyledSpan>
                  ( {index + 1} / {items.length} )
                </StyledSpan>
              </StyledInfoTitle>
              <TraderDropdownTitle inputTitle="품목" />
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
      </StyledBody>

      <StyledFooter>
        <TraderBtn
          size="Large"
          color={showNextButton ? "Blue" : "Grey"}
          onClick={() => handleItemClick(2)}
          disabled={!showNextButton}
        >
          다음
        </TraderBtn>
      </StyledFooter>

    </StyledContainer>
  );
};

export default TraderCreateItemPage;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

`;

const StyledHeader = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 12;
`;

const StyledBody = styled.div`
  padding-bottom: 70px;
`;

const StyledFooter = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
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
