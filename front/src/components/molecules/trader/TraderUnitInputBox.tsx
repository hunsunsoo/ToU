import styled from "styled-components";
import TraderInputBox from "../../atoms/trader/TraderInputBox";
import TraderUnitDropdown from "../../atoms/trader/TraderUnitDropdown";

interface TraderUnitInputBoxProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TraderUnitInputBox = ({ value, onChange, ...props }: TraderUnitInputBoxProps) => {
  return (
    <Container>
      <TraderInputBox size="Small" value={value} onChange={onChange} {...props} />
      <TraderUnitDropdown/>
    </Container>
  );
};

export default TraderUnitInputBox;

const Container = styled.div`
    display: flex;
`;