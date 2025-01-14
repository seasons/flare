import { createGlobalStyle } from "styled-components"

export const FontStyles = createGlobalStyle`
    @font-face {
        font-family: 'Apercu-Mono';
        src: url('/fonts/apercu_mono-webfont.woff2') format('woff2'),
            url('/fonts/apercu_mono-webfont.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }
    @font-face {
        font-family: 'ProximaNova-Thin';
        src: url('/fonts/proxima_nova_thin-webfont.woff2') format('woff2'),
            url('/fonts/proxima_nova_thin-webfont.woff') format('woff');
        font-weight: normal;
        font-style: normal;

    }
    @font-face {
        font-family: 'ProximaNova-Medium';
        src: url('/fonts/proxima_nova_medium-webfont.woff2') format('woff2'),
            url('/fonts/proxima_nova_medium-webfont.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }
    @font-face {
        font-family: 'ProximaNova-Bold';
        src: url('/fonts/proxima_nova_bold-webfont.woff2') format('woff2'),
            url('/fonts/proxima_nova_bold-webfont.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }    
    @font-face {
        font-family: 'NBAkademieProRegular';
        src: url('/fonts/NBAK-Regular.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }
`
