"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  Mail,
} from "lucide-react";
import "./styles.css";

const Login = () => {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSendForm = (event) => {
    event.preventDefault;
    console.log("Login:", { email, password });
  };

  const changePasswordVisibility = () => {
    setVisiblePassword(!visiblePassword);
  };

  return (
    <>
      <div className="page">
        <div className="form-side">
          <div className="form-content">
            <Link href="/" className="logo">
              <div className="logo-icon">
                <GraduationCap />
              </div>
              <span className="logo-text">
                Label<span className="logo-highlight">4Learn</span>
              </span>
            </Link>

            <div className="header">
              <h1 className="title">Bem-vindo de volta</h1>
              <p className="subtitle">
                Entre na sua conta para continuar aprendendo
              </p>
            </div>

            <form onSubmit={onSendForm} className="form">
              <div className="group-field">
                <label htmlFor="email" className="label-field">
                  E-mail
                </label>
                <div className="field-with-icon">
                  <Mail className="icon-field" />
                  <input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="input-field input-field-with-icon high-input-field"
                  />
                </div>
              </div>

              <div className="group-field">
                <div className="header-field">
                  <label htmlFor="password" className="label-field">
                    Senha
                  </label>
                  <a href="#" className="link-field">
                    Esqueceu a senha?
                  </a>
                </div>
                <div className="field-with-icon">
                  <Lock className="icon-field" />
                  <input
                    id="password"
                    type={visiblePassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="input-field input-field-with-icon high-input-field"
                    style={{ paddingRight: "42px" }}
                  />
                  <button
                    type="button"
                    onClick={changePasswordVisibility}
                    className="password-visibility-button"
                  >
                    {visiblePassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="button primary-button big-button large-button"
              >
                Entrar
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="divider">
              <div className="line-divider" />
              <span className="text-divider">Não tem uma conta?</span>
            </div>

            <Link href="/cadastro">
              <button className="button secondary-button big-button large-button">
                Criar conta gratuita
              </button>
            </Link>
          </div>
        </div>

        <div className="decorative-side">
          <div className="standard-backgroud" />
          <div className="decorative-content">
            <div className="decorative-icon">
              <GraduationCap />
            </div>
            <h2 className="decorative-title">Aprenda IA na Prática</h2>
            <p className="decorative-description">
              Participe de projetos colaborativos de rotulagem de imagens e
              desenvolva habilidades essencias em Machine Learning.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
