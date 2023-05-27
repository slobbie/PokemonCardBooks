import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Theme } from '../atom';

const Nav = () => {
  const [toggle, setToggle] = useState(false); // Toggle switch 를 관리하는 상태
  const setDarkAtom = useSetRecoilState(Theme);

  const onToggle = () => {
    setToggle(!toggle);
    setDarkAtom((prev) => !prev);
  }; // Toggle 이벤트
  return (
    <Navbar>
      <Link to='/'>
        <Logo>PokemonBook</Logo>
      </Link>
      {/* <Toggle className='toggleSwitchBox'>
        <div className={`boxinner ${toggle ? 'swichOn' : 'switchOff'}`} />
        <button
          onClick={() => onToggle()}
          className={
            toggle ? 'buttonOn toggleButton ' : 'buttonOff toggleButton'
          }
        />
      </Toggle> */}
    </Navbar>
  );
};

export default Nav;

const Navbar = styled.nav`
  max-width: 1200px;
  width: 100%;
  height: 100px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

const Logo = styled.div`
  cursor: pointer;

  font-family: 'Press Start 2P';
  font-size: 40px;
  color: ${(props) => props.theme.textColor};
  @media screen and (max-width: 768px) {
    font-size: 30px;
  }
`;

const Toggle = styled.div`
  width: 45px;
  height: 20px;
  border: none;
  border-radius: 20px;
  overflow: hidden;
  background-color: #c5c5c5;
  position: absolute;
  right: 4%;
  .boxinner {
    height: 100%;
    width: 100%;
    z-index: 2;
    left: -100px;
  }

  .toggleButton {
    width: 15px;
    height: 15px;
    display: block;
    border: none;
    border-radius: 15px;
    position: relative;
    cursor: pointer;
    top: -25px;
    margin: 7px;
    z-index: 5;
    right: 5px;
  }
  .swichOn {
    transform: translateX(100px);
    transition: 1.1s;
    position: relative;
    background-color: tomato;
    z-index: 2;
  }

  .switchOff {
    transform: translateX(-100px);
    transition: 2.3s;
    position: relative;
    z-index: 2;
    background-color: orange;
  }
  .buttonOn {
    transform: translateX(23px);
    transition: 1s;
  }

  .buttonOff {
    transition: 1s;
  }

  @media screen and (max-width: 768px) {
    top: 10%;
  }
  @media screen and (max-width: 425px) {
    top: 13%;
  }
`;
