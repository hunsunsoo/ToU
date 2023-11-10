import { useEffect, useState, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import {
  UserInfoState, CompanyInfoState
} from "../../store/State";
import OfficerSideBar from "../../components/organisms/officer/OfficerSideBar";
import OfficerTitle from "../../components/atoms/officer/OfficerTitle";
import OfficerBtn from "../../components/atoms/officer/OfficerBtn";
import { customAxios } from '../../components/api/customAxios';
import html2pdf from 'html2pdf.js';

interface StockList {
  stockSeq: number;
  stockName: string;
  stockDate: Date;
  stockQuantity: number;
  stockUnit: string;
  stockPrice: number;
}

const OfficerStockListPage = () => {
  const userInfo = useRecoilValue(UserInfoState);
  const companyInfo = useRecoilValue(CompanyInfoState);

  const [isSupply, setIsSupply] = useState(true);
  const [inItems, setInItems] = useState<StockList[]>([]);
  const [outItems, setOutItems] = useState<StockList[]>([]);

  // 공급, 수급 변경
  const handleIsSupply = () => {
    setIsSupply((prevIsSupply) => !prevIsSupply);
  }

  useEffect(() => {
    // 토큰 들어오는거 기다리기
    const awaitToken = async () => {
      return new Promise((resolve) => {
        const checkToken = () => {
          const storedValue = localStorage.getItem("recoil-persist");
          const accessToken = storedValue && JSON.parse(storedValue)?.UserInfoState?.accessToken;
          // setBranchType(storedValue && JSON.parse(storedValue)?.UserInfoState?.branchType);
          
          if (accessToken) {
            resolve(accessToken);
          } else {
            setTimeout(checkToken, 1000); // 1초마다 토큰 체크
          }
        };
        checkToken();
      });
    };

    // 기존 재고 목록 가져오기(in)
    const awaitInItems = async () => {
      try {
        const accessToken = await awaitToken();
        if (!accessToken) {
          console.log("Token not found");
          return;
        }

        const res = await customAxios.get(`/stock/officials/list/in`);
        setInItems(res.data.data.stockList);
      } catch (error) {
        console.log(error);
      }
    };

    awaitInItems();

    // 기존 재고 목록 가져오기(out)
    const awaitOutItems = async () => {
      try {
        const accessToken = await awaitToken();
        if (!accessToken) {
          console.log("Token not found");
          return;
        }

        const res = await customAxios.get(`/stock/worker/list/out`);
        setOutItems(res.data.data.stockList);
        console.log(res.data.data.stockList);
      } catch (error) {
        console.log(error);
      }
    };

    awaitOutItems();
  }, []);  

  const getCurrentTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    // return `${year}-${month}-${day}`;
  };


  // pdf 저장 로직
  const contentRef = useRef<HTMLDivElement | null>(null);
  const handleGeneratePdf = () => {
    const content = contentRef.current;

    if (content) {
      const set = {
        margin: 10, // 여백을 원하는 값으로 조정
        filename: 'certificate.pdf',
      }
      //@ts-ignore
      html2pdf(content, set);
    }
  };

  return (
    <MainDiv>
      <OfficerSideBar/>
      <ContentDiv>
        <OfficerTitle>
          재고 목록 조회
          {isSupply ? (
            <TagBtnDiv onClick={handleIsSupply}>
              <TagActiveBtn>발주</TagActiveBtn>
              <TagInActiveBtn>납품</TagInActiveBtn>
            </TagBtnDiv>
          ) : (
            <TagBtnDiv onClick={handleIsSupply}>
              <TagInActiveBtn>발주</TagInActiveBtn>
              <TagActiveBtn>납품</TagActiveBtn>
            </TagBtnDiv>
          )}
        </OfficerTitle>
        <Line/>
        <div ref={contentRef}>
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <div>{userInfo.companyName} {userInfo.branchName}</div>
            <div>{getCurrentTime()}</div>
          </div>
          <StyledTable>
            <thead>
              <tr>
                <th></th>
                <th>품명</th>
                <th>입고 일시</th>
                <th>수량</th>
                <th>단가</th>
                <th>비고</th>
              </tr>
            </thead>
            {isSupply ? (
            <tbody>
              {inItems.map((inItem, index) => (
                <tr key={index} >
                  <td>{index+1}</td>
                  <td>{inItem.stockName}</td>
                  <td>{new Date(inItem.stockDate).toLocaleString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  }).replace(/(\d+)\/(\d+)\/(\d+),?/, '$3-$1-$2 ')}</td>
                  <td>{inItem.stockQuantity} {inItem.stockUnit}</td>
                  <td>{inItem.stockPrice} 원</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
            ) : (
            <tbody>
              {outItems.map((outItem, index) => (
                <tr key={index} >
                  <td>{index+1}</td>
                  <td>{outItem.stockName}</td>
                  <td>{new Date(outItem.stockDate).toLocaleString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  }).replace(/(\d+)\/(\d+)\/(\d+),?/, '$3-$1-$2 ')}</td>
                  <td>{outItem.stockQuantity} {outItem.stockUnit}</td>
                  <td>{outItem.stockPrice} 원</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
            )}
          </StyledTable>
        </div>
        <Line/>

        <OfficerBtn
          isImg={false}
          isLarge={false}
          isActive={true}
          onClick={handleGeneratePdf}>
          PDF 출력
        </OfficerBtn>
      </ContentDiv>
    </MainDiv>
  )
}

export default OfficerStockListPage

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

const TagBtnDiv = styled.div`
  
`
const TagActiveBtn = styled.button`
  margin: 0 10px;
  width: 80px;
  height: 35px;
  background-color: #404DCD;
  border: 0;
  color: white;
  font-size: 18px;
`
const TagInActiveBtn = styled.button`
  margin: 0 10px;
  width: 80px;
  height: 35px;
  background-color: #CACACA;
  border: 0;
  color: white;
  font-size: 18px;
`

const Line = styled.div`
  height: 0px;
  border: 1px solid #666;
  margin-top: 10px;
  margin-bottom: 20px;
`

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
      width: 5%;
    }

    &:nth-child(2) {
      width: 25%;
    }

    &:nth-child(3) {
      width: 25%;
    }

    &:nth-child(4) {
      width: 15%;
    }

    &:nth-child(5) {
      width: 15%;
    }
  }

  th {
    background-color: rgba(217, 217, 217, 0.3);
  }

`

const TimeP = styled.p`
  margin: 5px 0 5px 85%;
`