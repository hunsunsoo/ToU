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
    height: 5vh;
    width: 100%;
    background-color: #EAF6FF;
    font-size: 20px;
    /* font-weight: 500; */
    text-align: left;
    padding-left: 20px; 
    display: flex;
    align-items: center;
    /* border-bottom: 0.8px solid var(--festie-gray-600, #949494); */
`