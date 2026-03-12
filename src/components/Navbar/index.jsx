"use client";

import Link from "next/link";
import { GraduationCap } from "lucide-react";
import "./styles.css";

const Navbar = () => {
  return (
    <nav className="nav-bar">
      <div className="nav-bar-content">
        {/* Logo */}
        <Link href="/" className="logo-link">
          <div className="logo-icon">
            <GraduationCap />
          </div>
          <span className="logo-text">
            Label<span className="logo-highlight">4Learn</span>
          </span>
        </Link>

        {/* Navegação */}
        <div className="navegation-links">
          <Link href="/" className="navegation-link">
            Início
          </Link>
          <Link href="/sobre" className="navegation-link">
            Sobre
          </Link>
          <Link href="/recursos" className="navegation-link">
            Recursos
          </Link>
        </div>

        {/* Entrar/Cadastrar */}
        <div className="navegation-buttons">
          <Link href="/login">
            <button className="button ghost-button">Entrar</button>
          </Link>
          <Link href="/cadastro">
            <button className="button primary-button">Cadastrar</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
