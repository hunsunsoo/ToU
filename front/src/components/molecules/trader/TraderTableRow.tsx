import styled from "styled-components";

import TraderTableCell from "../../atoms/trader/TraderTableCell"; 

type TraderTableRowProps = {
  cells: (string | React.ReactNode)[];
  height?: string;
};

const TraderTableRow: React.FC<TraderTableRowProps> = ({ cells, height }) => {
  return (
    <tr>
      {cells.map((cell, idx) => (
        <TraderTableCell key={idx} content={cell}  height={height} />
      ))}
    </tr>
  );
};

export default TraderTableRow;