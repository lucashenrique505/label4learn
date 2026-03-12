"use client";

import Link from "next/link";
import { BookOpen, Github, GraduationCap, Mail } from "lucide-react";
import "./styles.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="content">
        <div className="grid">
          <div className="mark">
            <Link href="/" className="logo">
              <div className="logo-icon">
                <GraduationCap />
              </div>
              <span className="logo-text">
                Label<span className="logo-highlight">4Learn</span>
              </span>
            </Link>
            <p className="description">
              Plataforma educacional para rotulagem colaborativa de imagens,
              voltado ao ensino de Machine Learning em ambientes acadêmicos.
            </p>
            <div className="social-medias">
              <a
                href="https://github.com/lucashenrique505/label4learn"
                target="_blank"
                rel="noopener noreferrer"
                className="social-media"
              >
                <Github />
              </a>
              <a
                href="mailto:lucashenriqued092@gmail.com"
                className="social-media"
              >
                <Mail />
              </a>
            </div>
          </div>

          <div>
            <h4 className="column-title">Plataforma</h4>
            <ul className="list-links">
              <li>
                <Link href="/login" className="link">
                  Entrar
                </Link>
              </li>
              <li>
                <Link href="/cadastro" className="link">
                  Cadastrar
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="link">
                  Sobre
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="column-title">Recursos</h4>
            <ul className="list-links">
              <li>
                <a href="#" className="link">
                  <BookOpen />
                  Documentação
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/lucashenrique505/label4learn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  <Github />
                  Github
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="bottom-footer">
          <p className="copyright">
            © 2026 Label4Learn. Projeto acadêmico de Engenharia de Software.
          </p>
          <div className="legal-links">
            <a href="#" className="legal-link">
              Privacidade
            </a>
            <a href="#" className="legal-link">
              Termos
            </a>
            <a href="#" className="legal-link">
              LGPD
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
