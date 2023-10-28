import styled from "styled-components";
import TraderInputBox from "../../atoms/trader/TraderInputBox";

interface TraderInputTitleProps {
  inputTitle: string;
  size: "X-Large" | "Large" | "Medium" | "Small";
  //color, placeholder, type, value
}

const TraderInputTitle = ({ inputTitle, size, ...props }: TraderInputTitleProps) => {
  return (
    <Container>
      <InputTitle>{inputTitle}</InputTitle>
      <TraderInputBox size={size} {...props} />
    </Container>
  );
};

export default TraderInputTitle;

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin: 25px 0 25px 0;
`;

const InputTitle = styled.span`
    margin-left: 10px;
    font-size: 20px;
`;