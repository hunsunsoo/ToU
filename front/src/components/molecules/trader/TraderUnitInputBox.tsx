import styled from "styled-components";
import TraderInputBox from "../../atoms/trader/TraderInputBox";
import TraderUnitDropdown from "../../atoms/trader/TraderUnitDropdown";

interface TraderUnitInputBoxProps {
  value: string;
  selectedUnit: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


const TraderUnitInputBox = ({ value, selectedUnit, onChange, ...props }: TraderUnitInputBoxProps) => {

  return (
    <Container>
      <TraderInputBox size="Small" value={value} onChange={onChange} {...props} />
      <TraderUnitDropdown selectedUnit={selectedUnit}/>
    </Container>
  );
};

export default TraderUnitInputBox;

const Container = styled.div`
    display: flex;
    width: 100%;
`;