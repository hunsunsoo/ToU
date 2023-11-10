import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { styled } from "styled-components";
import { customAxios } from "../../components/api/customAxios";
import OfficerSideBar from "../../components/organisms/officer/OfficerSideBar";
import OfficerTitle from "../../components/atoms/officer/OfficerTitle";
import OfficerBtn from "../../components/atoms/officer/OfficerBtn";
import OfficerDemandDiv from "../../components/atoms/officer/OfficerDemandDiv";
import OfficerSupplyDiv from "../../components/atoms/officer/OfficerSupplyDiv";
import OfficerDetailTable from "../../components/atoms/officer/OfficerDetailTable";
import OfficerBillDiv from "../../components/atoms/officer/OfficerBillDiv";
import html2pdf from 'html2pdf.js';

interface SumDiv {
  SumKor: string;
  SumNum: number;
}

interface Item {
  id: number;
  stockSeq?: number; // 물품 seq번호
  stockCode?: number; // 물품 code번호
  date?: string;        // 날짜
  stockName?: string; // 물품명
  stockQuantity: number; // 물량
  stockUni?: string; // 단위
  stockTotalPrice: number; // 공급가액
  stockPrice1: number; // 단가
  stockPrice2: number; // 부가세
  state: string;
}

const OfficerDetailPage = () => {
  const { billId } = useParams<{ billId: string }>();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [items, setItems] = useState<Item[]>([]);

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
    
    // 판매용 재고 목록 조회
    customAxios.get(`statement/worker/detail/${billId}`)
    .then((res) => {
      console.log(res);

      setItems(res.data.data.itemList);
    })
    .catch((res) => {
      console.log(res);
    })


  }, [])

  // 한글로 숫자를 표시하는 함수
  const numberToKorean = (amount: number): string => {
    const units = ['', '만', '억', '조', '경'];
    const digits = amount.toString().split('').reverse();
    const result: string[] = [];

    for (let i = 0; i < digits.length; i += 4) {
      const chunk = digits.slice(i, i + 4).reverse().join('');
      const chunkNumber = parseInt(chunk, 10);

      if (chunkNumber !== 0) {
        const unit = units[Math.floor(i / 4)];
        result.push(numberToKoreanChunk(chunkNumber) + unit);
      }
    }

    return result.reverse().join('');
  };

  const numberToKoreanChunk = (chunk: number): string => {
    const digitNames = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
    const unitNames = ['', '십', '백', '천'];

    return chunk
      .toString()
      .split('')
      .reverse()
      .map((digit, index) => {
        const digitName = digitNames[parseInt(digit, 10)];
        const unitName = digit === '0' ? '' : unitNames[index];
        return digitName + unitName;
      })
      .reverse()
      .join('');
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


  const onClick = () => {

  }

  return( 
    <MainDiv>
      <OfficerSideBar/>
      <div ref={contentRef}>
      <ContentDiv>
        <OfficerTitle>
          거래명세서 상세보기
        </OfficerTitle>
        <Line/>
        <StyledDiv>
          <StyledDivLeft>
            <p>• 거래명세서 확인</p>
            <OfficerDemandDiv />
          </StyledDivLeft>
          <StyledDivRight>
            <OfficerSupplyDiv />
          </StyledDivRight>
        </StyledDiv>
        <StyledSumDiv>
          <span>금   액 : {numberToKorean(items.reduce((acc, item) => acc + item.stockTotalPrice, 0))} 원 정</span>
          <span>( ₩ {items.reduce((acc, item) => acc + item.stockTotalPrice, 0).toLocaleString()} )</span>
        </StyledSumDiv>
        <OfficerDetailTable />
        <OfficerBillDiv />
        <BtnDiv>
          <OfficerBtn
            isImg={false}
            isLarge={false}
            isActive={false}
            onClick={onClick}>
            삭제
          </OfficerBtn>
          <BtnDivSub>
            <OfficerBtn
              isImg={false}
              isLarge={false}
              isActive={false}
              onClick={onClick}>
              수정
            </OfficerBtn> 
            <OfficerBtn
              isImg={false}
              isLarge={false}
              isActive={true}
              onClick={handleGeneratePdf}>
              PDF 저장
            </OfficerBtn> 
          </BtnDivSub>
        </BtnDiv>
      </ContentDiv>
      </div>
    </MainDiv>
  )
}

export default OfficerDetailPage

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

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledDivLeft = styled.div`
  min-width: 45%;
`

const StyledDivRight = styled.div`
  min-width: 52%;
`

const StyledSpan = styled.span`
  
`

const StyledSumDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 50px;
  margin-top: 10px;
  border: 1px solid black;
  color: black;
  font-size: 27px;
  font-weight: normal;
`

const BtnDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`

const BtnDivSub = styled.div`
  display: flex;
  gap: 20px;
`