"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Users, Image } from "lucide-react";
import "./styles.css";

const Hero = () => {
  return (
    <section className="section">
      <div className="background-pattern" />

      {/* Selo */}
      <div className="content">
        <div className="seal">
          <Sparkles className="seal-icon" />
          <span className="seal-text">
            Plataforma Educacional para Machine Learning
          </span>
        </div>

        {/* Título */}
        <h1 className="title">
          Aprenda <span className="gradient-text">IA na Prática</span>
          <br />
          com Rotulagem Colaborativa
        </h1>

        {/* Subtítulo */}
        <p className="subtitle">
          Crie, gerencie e participe de projetos de rotulagem de imagens em um
          ambiente acadêmico seguro. Transforme o aprendizado de Machine
          Learning em uma experiência prática e colaborativa.
        </p>

        {/* Botões */}
        <div className="buttons">
          <Link href="/cadastro">
            <button className="button primary-button hero-button">
              Começar Gratuitamente
              <ArrowRight size={20} />
            </button>
          </Link>
          <Link href="/sobre">
            <button className="button secondary-button big-button">
              Saiba Mais
            </button>
          </Link>
        </div>

        {/* Estatísticas */}
        <div className="statistics">
          <div className="statistic-item">
            <div className="statistic-icon">
              <Users />
            </div>
            <p className="statistic-value">50+</p>
            <p className="statistic-label">Usuários</p>
          </div>
          <div className="statistic-item">
            <div className="statistic-icon">
              <Image />
            </div>
            <p className="statistic-value">1000+</p>
            <p className="statistic-label">Imagens</p>
          </div>
          <div className="statistic-item">
            <div className="statistic-icon">
              <Sparkles />
            </div>
            <p className="statistic-value">100%</p>
            <p className="statistic-label">Gratuito</p>
          </div>
        </div>
      </div>

      {/* Onda */}
      <svg className="wave" viewBox="0 0 1440 120" fill="none">
        <path
          d="M0 120L60 105C120 90 240 60 360 52.5C480 45 600 60 720 67.5C840 75 960 75 1080 67.5C1200 60 1320 45 1380 37.5L1440 30V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
          fill="var(--branco)"
        />
      </svg>
    </section>
  );
};

export { Hero };
