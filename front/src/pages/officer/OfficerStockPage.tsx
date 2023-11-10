import React, { useEffect, useState } from 'react';
import { styled } from "styled-components";
import OfficerSideBar from "../../components/organisms/officer/OfficerSideBar";
import OfficerTitle from "../../components/atoms/officer/OfficerTitle";
import OfficerBtn from "../../components/atoms/officer/OfficerBtn";
import OfficerInputDiv from "../../components/organisms/officer/OfficerInputDiv";
import Modal from "../../components/atoms/officer/OfficerItemModal";
import { customAxios } from '../../components/api/customAxios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router';

interface StockList {
  stockSeq: number;
  stockName: string;
  stockDate: Date;
  stockQuantity: number;
  stockUnit: string;
}

interface StockItems {
  stockSeq?: number;
  stockName?: string;
  stockDate: Date;
  stockQuantity?: number;
  stockUnit?: string;
  stockPrice?: number;
}

const OfficerStockPage = () => {
  const navigate = useNavigate();

  const [branchType, setBranchType] = useState("PROCESS");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stockItems, setStockItems] = useState<StockList[]>([]);
  
  // 기존 재고
  const [preStock, setPreStock] = useState<StockItems>();
  
  // 새로운 재고
  const [newStock, setNewStock] = useState<StockItems>();

  useEffect(() => {
    // 토큰 들어오는거 기다리기
    const awaitToken = async () => {
      return new Promise((resolve) => {
        const checkToken = () => {
          const storedValue = localStorage.getItem("recoil-persist");
          const accessToken = storedValue && JSON.parse(storedValue)?.UserInfoState?.accessToken;
          setBranchType(storedValue && JSON.parse(storedValue)?.UserInfoState?.branchType);
          
          if (accessToken) {
            resolve(accessToken);
          } else {
            setTimeout(checkToken, 1000); // 1초마다 토큰 체크
          }
        };
        checkToken();
      });
    };

    // 기존 재고 목록 가져오기
    const awaitStockItems = async () => {
      try {
        const accessToken = await awaitToken();
        if (!accessToken) {
          return;
        }

        const res = await customAxios.get(`/stock/officials/list/in`);
        setStockItems(res.data.data.stockList);
      } catch (error) {
        console.log(error);
      }
    };

    awaitStockItems();
  }, []);  

  // 모달 함수
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 조회 버튼 클릭
  const getItemList = () => {
    openModal();
  }

  // 기존 재고 선택 시
  const selectPreStock = (selectedItem: StockList) => {
    const { stockSeq, stockName, stockDate, stockQuantity, stockUnit } = selectedItem;
    setPreStock({
      stockSeq: stockSeq,
      stockName: stockName,
      stockDate: stockDate,
      stockQuantity: stockQuantity,
      stockUnit: stockUnit,
    });
    closeModal();
  }

  // 새로운 재고 업데이트
  const updateNewStock = (updatedStock: StockItems) => {
    setNewStock(updatedStock);
  };

  // 재고 수정(가공)
  const handleManufacture = () => {
    const body = {
      beforeStockSeq: preStock?.stockSeq,
      newStockName: newStock?.stockName,
      newStockQuantity: newStock?.stockQuantity,
      newStockUnit: newStock?.stockUnit,
      newStockPrice: newStock?.stockPrice,
    }
    customAxios.post(`stock/officials`, body)
    .then((res) => {
      if(res.status === 200) {
        toast.success("가공 공정을 성공했습니다.", {
          duration: 1000,
        });
        setTimeout(() => {
          navigate("/");
        }, 1000);
        
      } else {
        toast.error("요청이 실패했습니다.", {
          duration: 1000,
        });
        setTimeout(() => {
        }, 1000);
      }
    })
  }

  // 재고 수정(생산)
  const handleProduct = () => {
    const body = {
      stockName: newStock?.stockName,
      stockQuantity: newStock?.stockQuantity,
      stockUnit: newStock?.stockUnit,
      stockPrice: newStock?.stockPrice,
    }
    
    customAxios.post(`stock/producer`, body)
    .then((res) => {
      if(res.status === 200) {
        toast.success("재고 등록을 성공했습니다.", {
          duration: 1000,
        });
        setTimeout(() => {
          navigate("/");
        }, 1000);
        
      } else {
        toast.error("요청이 실패했습니다.", {
          duration: 1000,
        });
        setTimeout(() => {
        }, 1000);
      }
    })
  }

  // onClick 이벤트
  const onClick = () => {

  }

  return (
    <MainDiv>
      <OfficerSideBar/>
      <ContentDiv>
        <div><Toaster /></div>
        <OfficerTitle>
          공정/재고 관리
        </OfficerTitle>
        <Line/>
        { branchType !== "PRODUCT"?
        <>
          <StyledP>
            • 기존 재고
            <OfficerBtn
              isImg={false}
              isLarge={false}
              isActive={true}
              onClick={getItemList}>
              조회
            </OfficerBtn> 
          </StyledP>
          <OfficerInputDiv isStockManage={true} isInput={false} stock={preStock} />
        </>
         :
        null}

        { branchType === "PRODUCT"?
        <>
          <StyledP>
            • 재고 등록
          </StyledP>
          <OfficerInputDiv isStockManage={true} isInput={true} stock={newStock} updateStock={updateNewStock} />
          <BtnDiv>
            <OfficerBtn
              isImg={false}
              isLarge={false}
              isActive={true}
              onClick={handleProduct}>
              등록
            </OfficerBtn>
            <OfficerBtn
              isImg={false}
              isLarge={false}
              isActive={false}
              onClick={onClick}>
              초기화
            </OfficerBtn>
          </BtnDiv>
        </>
          :
        <>
          <StyledP>
            • 가공 상품 / 추가 재고
          </StyledP>
          <OfficerInputDiv isStockManage={true} isInput={true} stock={newStock} updateStock={updateNewStock} />
          <BtnDiv>
            <OfficerBtn
              isImg={false}
              isLarge={false}
              isActive={true}
              onClick={handleManufacture}>
              등록
            </OfficerBtn>
            <OfficerBtn
              isImg={false}
              isLarge={false}
              isActive={false}
              onClick={onClick}>
              초기화
            </OfficerBtn>
          </BtnDiv>
        </>
        }
      </ContentDiv>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        modalType={"type1"}
      >
        <div>
          <h2>기존 재고 조회</h2>
          {/* 모달 내용 추가 */}
          <StyledTable>
            <thead>
              <tr>
                <th>품명</th>
                <th>입고일시</th>
                <th>입고수량</th>
              </tr>
            </thead>
            <tbody>
              {stockItems.map((item, index) => (
                <tr key={index} onClick={() => selectPreStock(item)}>
                  <td>{item.stockName}</td>
                  <td>{item.stockDate.toLocaleString('en-US', { hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</td>
                  <td>{item.stockQuantity} {item.stockUnit}</td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </div>
      </Modal>

    </MainDiv>
  );
};

export default OfficerStockPage;

const MainDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  height: calc(100vh - 40px);
  overflow: hidden;
`

const ContentDiv = styled.div`
  padding: 20px;
  font-size: 17px;
  font-weight: bold;
  color: #545A96;
`

const Line = styled.div`
  height: 0px;
  border: 1px solid #666;
  margin-top: 10px;
  margin-bottom: 20px;
`

const StyledP = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  gap: 15px;
  font-size: 17px;
`

const BtnDiv = styled.div`
  display: flex;
  margin-left: 60%;
  gap: 50px
`

const StyledTable = styled.table`
  margin: 10px 0;
  width: 100%;
  border-collapse: collapse;
  color: #545A96;

  th, td {
    padding: 6px;
    text-align: center;
    font-weight: bold;
  }

  td {
    font-size: 14px;
  }

  th {
    font-size: 16px;
  }
`;