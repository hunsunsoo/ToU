import styled from "styled-components";

import TraderTableRow from "../../molecules/trader/TraderTableRow";
import TraderTableHeaderRow from "../../molecules/trader/TraderTableHeaderRow";

type TraderTableProps = {
  subheaders: string[];
  rows: (string | React.ReactNode)[][];
  widths?: string[];
  height?: string;
};

const TraderTable: React.FC<TraderTableProps> = ({ subheaders, rows, widths, height }) => {
  return (
    <StyledTable>
      <TraderTableHeaderRow subheaders={subheaders} widths={widths} />
      <tbody>
        {rows.map((row, idx) => (
          <TraderTableRow key={idx} cells={row} />
        ))}
      </tbody>
    </StyledTable>
  );
};

export default TraderTable;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse; 
  `;
