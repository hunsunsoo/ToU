import React from "react";
import styled from "styled-components";

type Item = {
  md: string;
  quantity: string;
  price: string;
  supplyPrice: string;
};

type SummaryItem = {
  sum: string;
  receiver: string;
  call: string;
};

// 상단 표의 타입과 데이터를 정의
type TopTableItem = {
  registerNumber: string;
  date: string;
  businessNumber: string;
  name: string;
  businessName: string;
  address: string;
};

const topTableHeaders = [
  { text: "등록번호", value: "registerNumber" },
  { text: "날 짜", value: "date" },
  { text: "사업자 등록번호", value: "businessNumber" },
  { text: "성 명", value: "name" },
  { text: "상 호", value: "businessName" },
  { text: "주 소", value: "address" },
];

const topTableItems: TopTableItem = {
  registerNumber: "20231018-0933052",
  date: "2023-10-18",
  businessNumber: "339-95-00113",
  name: "김싸피",
  businessName: "하위하위",
  address: "대전광역시 유성구 어쩌구 저쩌구",
};

const summaryItems: SummaryItem[] = [
  {
    sum: "1200",
    receiver: "유뇽수산",
    call: "010-1234-5678",
  },
];

const headers = [
  {
    text: "품 목",
    value: "md",
  },
  {
    text: "수 량",
    value: "quantity",
  },
  {
    text: "단 가",
    value: "price",
  },
  {
    text: "공급가액",
    value: "supplyPrice",
  },
];

const items: Item[] = [
  {
    md: "키조개",
    quantity: "20",
    price: "20",
    supplyPrice: "400",
  },
  {
    md: "키조개",
    quantity: "20",
    price: "20",
    supplyPrice: "400",
  },
  {
    md: "키조개",
    quantity: "20",
    price: "20",
    supplyPrice: "400",
  },
];

const summaryHeaders = [
  {
    text: "합 계",
    value: "sum",
  },
  {
    text: "인수자",
    value: "receiver",
  },
  {
    text: "연락처",
    value: "call",
  },
];

function FormComponent() {
  // value 순서에 맞게 테이블 데이터를 출력하기 위한 배열
  const headerKey = headers.map((header) => header.value as keyof Item);
  const summaryHeaderKeys = summaryHeaders.map((header) => header.value);
  const topTableHeaderKeys = topTableHeaders.map((header) => header.value);
  return (
    <Styles>
      <h2>거래명세표</h2>

      <table>
        <tbody>
          {topTableHeaderKeys.map((key, index) => (
            <tr key={index}>
              <th>{topTableHeaders.find((h) => h.value === key)?.text}</th>
              <td>{topTableItems[key as keyof TopTableItem]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header.text}>{header.text}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              {headerKey.map((key) => (
                <td key={key + index}>{item[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <div>2023년 10월 29일 업체명 귀하</div>
        <div>아래와 같이 계산합니다.</div>
      </div>

      <table>
        <thead>
          <tr>
            {summaryHeaders.map((header) => (
              <th key={header.text}>{header.text}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {summaryItems.map((item, index) => (
            <tr key={index}>
              {summaryHeaderKeys.map((key) => (
                <td key={key + index}>
                  {key in item ? item[key as keyof SummaryItem] : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Styles>
  );
}

export default FormComponent;

const Styles = styled.div`

  table {
    border-spacing: 0;
    border-collapse: collapse;
    width: 100%;

    th, td {
      padding: 0.5rem;
      border: 1px solid black; // 모든 셀에 테두리를 적용
    }

    th {
      background-color: #eaeaea; // 헤더의 배경색을 회색으로 변경
    }

    td {
      background-color: white; // 아이템의 배경색을 흰색으로 변경
    }
  }
`;
