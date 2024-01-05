// import { useState } from 'react';
import { Link } from 'react-router-dom';
// import { useSetRecoilState } from 'recoil';
import * as NavStyle from '@common/layout/style/nav.style';
// import { Theme } from '@atom/main/atom';

const Nav = () => {
  // const [toggle, setToggle] = useState(false); // Toggle switch 를 관리하는 상태
  // const setDarkAtom = useSetRecoilState(Theme);

  // const onToggle = () => {
  //   setToggle(!toggle);
  //   setDarkAtom((prev) => !prev);
  // }; // Toggle 이벤트
  return (
    <NavStyle.Navbar>
      <Link to='/'>
        <NavStyle.Logo>PokemonBook</NavStyle.Logo>
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
    </NavStyle.Navbar>
  );
};

export default Nav;
