import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const Register = ({ textButton, onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password
    }
    onRegister(userData)
  }

  return (
    <div className="login">
      <p className="login__entrance">Регистрация</p>
      <form onSubmit={handleSubmit} className="login__form">
        <input
          required
          autoComplete="on"
          id="email"
          name="email"
          type="text"
          value={email}
          placeholder="Email"
          className="login__input"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          required
          id="password"
          name="password"
          type="password"
          value={password}
          placeholder="Пароль"
          className="login__input"
          onChange={e => setPassword(e.target.value)}
        />
        <div className="login__button-container">
          <button type="submit" className="login__link">
            {textButton}
          </button>
        </div>
        <p className="login__question">Уже зарегистрированы? <Link to="/sign-in" className="login__link login__link-little"> Войти</Link></p>
      </form>
    </div>
  );
};

export default Register;