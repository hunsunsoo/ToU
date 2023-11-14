import styled from "styled-components";
import TraderInputBox from "../../atoms/trader/TraderInputBox";
import { BooleanKeyframeTrack } from "three";

interface TraderInputTitleProps {
  inputTitle: string;
  size: "X-Large" | "Large" | "Medium" | "Small";
  value: string | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const TraderInputTitle = ({ inputTitle, size, value, onChange, disabled, ...props }: TraderInputTitleProps) => {
  return (
    <Container>
      <InputTitle>{inputTitle}</InputTitle>
      <TraderInputBox size={size} value={value} onChange={onChange} disabled={disabled}{...props} />
    </Container>
  );
};

export default TraderInputTitle;

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    /* gap: 10px; */
    margin: 25px 0 25px 0;
`;

const InputTitle = styled.span`
    font-size: 1rem;
`;