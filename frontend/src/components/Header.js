import React from "react";
import logo from "./../images/logo.svg";
import { Route, Link } from 'react-router-dom';

function Header({ email, onSignOut }) {
  
  function handleSignOut() {
    onSignOut();
  }

  return (
    <header className="header container">
    <img className="header__logo" src={logo} alt="логотип-место" />
      <div className="header__box">
      <p className="header__mail">{email}</p>
        <Route exact path="/">
          <Link to="/sign-in" onClick={handleSignOut} className="header__link">Выйти</Link>
        </Route>
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link">Регистрация</Link>
        </Route>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link">Войти</Link>
        </Route>
      </div>
    </header>
    
  );
}

export default Header;
