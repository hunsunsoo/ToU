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


    /* 스크롤바 */
    ::-webkit-scrollbar{
        width: 8px;
    }

    /* 스크롤바 막대 설정*/
    ::-webkit-scrollbar-thumb{
        background: linear-gradient(#fff, #ffe498);
        border-radius: 12px; 
    }
    /* 스크롤바 뒷 배경 설정*/
    ::-webkit-scrollbar-track{
        border-radius: 12px; 
        background-color: rgba(0,0,0,0.5);
        overflow: hidden;
    }
    .slick-list {
        margin-right: -24px;
    }
 
    .slick-slide {
        padding-right: 24px;
    }
`;
