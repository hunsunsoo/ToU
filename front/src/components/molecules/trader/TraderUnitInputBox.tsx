import styled from "styled-components";
import TraderInputBox from "../../atoms/trader/TraderInputBox";
import TraderUnitDropdown from "../../atoms/trader/TraderUnitDropdown";

interface TraderUnitInputBoxProps {
}

const TraderUnitInputBox = ({ ...props }: TraderUnitInputBoxProps) => {
  return (
    <Container>
      <TraderInputBox size = "Small" {...props} />
      <TraderUnitDropdown/>
    </Container>
  );
};

export default TraderUnitInputBox;

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`;