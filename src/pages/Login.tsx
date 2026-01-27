import React from "react";
import "../styles/login.scss";
import LoginForm from "../components/login/LoginForm";

const Login = () => {
  return (
    <section className="login">
      <div className="login__logo">
        <img src="/images/logo.svg" alt="logo" className="login__logo-img" />
      </div>
      <div className="login__container">
        <div className="login__placeholder">
          <img
            src="/images/pablo-sign.svg"
            alt="illustration"
            className="login__text-img"
          />
        </div>

        <div className="login__form">
          <LoginForm />
        </div>
      </div>
    </section>
  );
};

export default Login;
