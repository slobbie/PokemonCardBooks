import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = () => {
  return (
    <Navbar>
      <Link to='/'>
        <Logo>LOGO</Logo>
      </Link>
    </Navbar>
  );
};

export default Nav;

const Navbar = styled.nav`
  width: 100%;
  border: 1px solid black;
  height: 50px;
  text-align: center;
`;

const Logo = styled.section`
  cursor: pointer;
`;
