import { memo } from 'react';
import logo from '../images/header/Logo_vector.svg';

function Header() {
  // console.log('Header');

  return (
    <header className="header page__section">
      <a href="#">
        <img src={logo} alt="Логотип" className="header__logo" />
      </a>
    </header>
  )
}

export default memo(Header)
