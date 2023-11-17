import styled from "styled-components"

interface TraderSubtitleProps {
    subtitle: string;
}

const TraderSubtitle = (props: TraderSubtitleProps) => {

    let subTitle = props.subtitle;

    return (
        <StyledSubtitle>
            <StyledSpan>{subTitle}</StyledSpan>
        </StyledSubtitle>
    );
};

export default TraderSubtitle;

const StyledSubtitle = styled.div`
    height: 5vh;
    width: 100%;
    background-color: #F0F0F0;
    font-size: 20px;
    /* font-weight: 500; */
    text-align: left;
    /* padding-left: 20px;  */
    display: flex;
    align-items: center;
    /* border-bottom: 0.8px solid var(--festie-gray-600, #949494); */
`

const StyledSpan = styled.span`
    margin-left: 1rem;
`