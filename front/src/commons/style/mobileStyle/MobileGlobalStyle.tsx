import { createGlobalStyle } from "styled-components";

export const MobileGlobalStyle = createGlobalStyle`
    * {
        padding: 0;
        text-decoration: none;
        font-family: "LINESeedKR-Rg";
    }

    @font-face {
    font-family: 'LINESeedKR-Rg';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/LINESeedKR-Rg.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
}
`;
