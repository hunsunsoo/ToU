import styled from "styled-components";

const OfficeBillDiv = () => {
  return (
    <Table>
      <tr>
        <td className="title">수량</td>
        <td>2450 kg</td>
        <td className="title">공급가액</td>
        <td>6,350,000</td>
        <td className="title">VAT</td>
        <td>635,000</td>
        <td className="title">합계</td>
        <td>6,985,000</td>
        <td className="title">인수</td>
        <td>(인)</td>
      </tr>
    </Table>
  );
};

export default OfficeBillDiv;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: black;

  td {
    border: 1px solid black;
    height: 40px;
    /* padding: 0 10px; */

    &:not(.title) {
      font-weight: normal;
      padding-left: 20px;
    }
  }

  .title {
    text-align: center;
  }
`