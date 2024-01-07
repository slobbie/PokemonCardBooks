import { Outlet } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import Nav from '@src/common/layout/Nav';
import Search from '@feature/main/components/Search';
import { useRecoilValue } from 'recoil';
import { Theme } from '@src/atom/main/atom';
import { darkTheme, lightTheme } from '@common/theme/theme';
import { GlobalStyle } from '@common/theme/GlobalStyle';

/** 메인 공통 레이아웃 */
const MainLayout = () => {
  const ThemeColor = useRecoilValue(Theme);
  return (
    <ThemeProvider theme={ThemeColor ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Section>
        <Nav />
        <Search />
      </Section>
      <Outlet />
    </ThemeProvider>
  );
};

export default MainLayout;

const Section = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;
