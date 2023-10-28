import { createGlobalStyle } from "styled-components";

export const MobileGlobalStyle = createGlobalStyle`
    * {
        padding: 0;
        text-decoration: none;
        font-family: "SUITE-Regular";
    }

    @font-face {
    font-family: 'SUITE-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    }

`;
