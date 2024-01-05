import { darkTheme, lightTheme } from './common/theme/theme';
import styled, { ThemeProvider } from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Theme } from '@atom/main/atom';
import Nav from '@common/layout/Nav';
import Search from '@feature/main/components/Search';
import MainPage from '@feature/main/page/MainPage';
import DetailPage from '@src/feature/main/page/DetailPage';
// import SearchPage from '@feature/search/SearchPage';

function App() {
  const ThemeColor = useRecoilValue(Theme);
  return (
    <ThemeProvider theme={ThemeColor ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Section>
        <Nav />
        <Search />
      </Section>
      <Routes>
        <Route path='/*' element={<MainPage />} />
        <Route path='detail/*' element={<DetailPage />} />
        {/* <Route path='search/*' element={<SearchPage />} /> */}
      </Routes>
    </ThemeProvider>
  );
}

export default App;

const Section = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  background-color: ${(props) => props.theme.bgColor};

}
a{
  text-decoration: none;
  color: inherit;
}
`;
