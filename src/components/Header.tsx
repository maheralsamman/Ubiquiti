import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Ubiquiti_logo.svg';

import './Header.scss';

const Header = () => (
  <header className="header">
    <Link to="/"><img className="header__img" src={logo} alt="logo" /></Link>
    <section className="header__text">
      <p className="header__text--title">Devices</p>
      <p className="header__text--message">Here you can Unifi your life</p>
      <p className="header__text--myName">Maher Alsamman</p>
    </section>
  </header>
);

export default Header;
