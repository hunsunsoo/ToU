import styled from "styled-components"

interface TraderSubtitleProps {
    subtitle: string;
}

const TraderSubtitle = (props: TraderSubtitleProps) => {

    let subTitle = props.subtitle;

    return (
        <StyledSubtitle>
            <div>{subTitle}</div>
        </StyledSubtitle>
    );
};

export default TraderSubtitle;

const StyledSubtitle = styled.div`
    height: 4vh;
    width: 100%;
    background-color: #F0F0F0;
    text-align: left;
    padding-left: 15px; 
    display: flex;
    align-items: center;
`