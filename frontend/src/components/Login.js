import React, {useState } from "react";

const Login = ({ textButton, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 const handleSubmit = (event) => {
   event.preventDefault();
   const userData = {
     email,
     password
   }
   onLogin(userData)
 }

  return (
    <div className="login">
      <p className="login__entrance">Вход</p>
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
          <button type="submit" className="login__link">{textButton}</button>
        </div>
      </form>
    </div>
  );
};

export default Login;