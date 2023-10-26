import { styled } from 'styled-components';

const ShopperTitle = () => {
    return (
        <StyeldContainer>
            안동 간고등어
            생산 - 입고 - 가공 - 판매
        </StyeldContainer>
    );
};

export default ShopperTitle;

const StyeldContainer = styled.div`
    font-weight: bold;
    text-align: center;
`