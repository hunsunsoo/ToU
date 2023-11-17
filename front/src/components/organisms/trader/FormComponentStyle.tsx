import styled from "styled-components";

export const TableRow = styled.tr`
  text-align: left;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse; // If there are no gaps between cells
  table-layout: fixed; // If you want uniform column widths
  margin-bottom: 0.5rem;
`;

export const TableCell = styled.td`
  padding: 0.5rem 0;
  text-align: left; // Align text to left/right/center as required
`;

export const TableHeader = styled.th`
  padding: 0.5rem 0;
  text-align: left; // Align text to left/right/center as required
`;

export const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 0.5rem;
`;

export const StyledSpan = styled.span`
  display: flex;
  align-items: center;
`;

export const Styles = styled.div`
  * {
    text-align: left;
  }
  table {
    border-spacing: 0;
    border-collapse: collapse;
    width: 100%;
    font-size: 0.8rem;

    th,
    td {
      padding: 0.5rem 0;
    }
  }
`;

export const StyledTitle = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 1.6rem;
  margin: 1rem 0;
  align-items: flex-end;
`;

export const SignatureStatus = styled.span`
  margin-left: 1rem;
  font-size: 1rem;
`;

export const StyledDate = styled.div`
  font-weight: bold;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
`;

export const Line = styled.div`
  border: 1px solid black;
`;
