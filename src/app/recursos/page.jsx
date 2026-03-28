"use cliente";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BarChart3, BookOpen, CheckCircle, Download, Tags } from "lucide-react";
import "./styles.css";

const resourcesList = [
  {
    icon: BookOpen,
    title: "Projetos Educacionais",
    badge: "Disponível",
    description:
      "Professores podem criar projetos de rotulagem personalizados para suas turmas, definindo classes, descrições e objetivos pedagógicos. Cada projeto funciona como uma atividade prática onde os alunos aprendem os fundamentos da preparação de dados para IA.",
    features: [
      "Definição de classes e rótulos personalizados",
      "Descrição de objetivos de aprendizado",
      "Upload de imagens de domínio público",
      "Configuração de número mínimo de rótulos por imagem",
      "Controle de acesso por turma",
      "Prazos e cronogramas configuráveis",
    ],
  },
  {
    icon: Tags,
    title: "Interface de Rotulagem",
    badge: "Disponível",
    description:
      "Uma interface intuitiva e acessível que permite aos alunos rotular imagens de forma rápida e eficiente. Com navegação por teclado, indicadores de progresso e feedback visual, a experiência é fluida e produtiva.",
    features: [
      "Seleção de rótulos com um clique",
      "Navegação com atalhos de teclado",
      "Barra de progresso em tempo real",
      "Zoom e visualização detalhada",
      "Histórico de rotulagens anteriores",
      "Modo de revisão de rótulos",
    ],
  },
  {
    icon: BarChart3,
    title: "Estatísticas e Métricas",
    badge: "Em breve",
    description:
      "Acompanhe o progresso dos projetos com dashboards completos. Visualize a taxa de concordância entre rotuladores, participação dos alunos e distribuição dos rótulos para avaliar a qualidade do dataset.",
    features: [
      "Dashboard com visão geral do projeto",
      "Taxa de concordância entre rotuladores",
      "Gráficos de distribuição de rótulos",
      "Ranking de participação dos alunos",
      "Exportação de relatórios",
      "Alertas de inconsistência",
    ],
  },
  {
    icon: Download,
    title: "Exportação de Datasets",
    badge: "Disponível",
    description:
      "Quando o projeto é concluído, exporte o dataset rotulado em formato CSV, pronto para ser utilizado em projetos de Machine Learning. Os dados seguem convenções padrão da indústria.",
    features: [
      "Exportação em formato CSV",
      "Metadados completos por imagem",
      "Filtros por confiança do rótulo",
      "Compatível com bibliotecas populares de ML",
      "Inclui estatísticas de concordância",
      "Download em lote",
    ],
  },
];

const Resources = () => {
  return (
    <>
      <main>
        <Navbar />

        <section className="hero">
          <div className="hero-content">
            <span className="hero-label">Recursos</span>
            <h1 className="hero-title">
              Ferramentas poderosas para ensino e aprendizado de IA
            </h1>
            <p className="hero-subtitle">
              Conheça em detalhes cada funcionalidade do Label4Learn e como ela
              pode transformar a experiência de ensino de Inteligência
              Artificial.
            </p>
          </div>
        </section>

        {resourcesList.map((resource, index) => {
          const Icon = resource.icon;

          return (
            <section key={index} className="resource-section">
              <div className="resource-section-header">
                <div className="resource-section-icon">
                  <Icon />
                </div>
                <div>
                  <h2 className="resource-section-title">
                    {resource.title}
                    <span className="resource-section-badge">
                      {resource.badge}
                    </span>
                  </h2>
                </div>
              </div>
              <p className="resource-section-text">{resource.description}</p>
              <ul className="resource-section-list">
                {resource.features.map((item, i) => (
                  <li key={i} className="resource-section-list-item">
                    <CheckCircle />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        <section className="plans-section">
          <h2 className="plans-title">Simples e Gratuito</h2>
          <p className="plans-subtitle">
            O Label4Learn é uma ferramenta acadêmica gratuita. Confirma o que
            está incluso.
          </p>
          <div className="plans-grid">
            <div className="plan-card highlight">
              <h3 className="plan-name">Para Professores</h3>
              <p className="plan-price">Grátis</p>
              <p className="plan-description">
                Tudo que você precisa para criar projetos de rotulagem para sua
                turma.
              </p>
              <ul className="plan-list">
                <li>
                  <CheckCircle /> Projetos ilimitados
                </li>
                <li>
                  <CheckCircle /> Até 500 imagens por projeto
                </li>
                <li>
                  <CheckCircle /> Convite de alunos por link
                </li>
                <li>
                  <CheckCircle /> Dashboard de acompanhamento
                </li>
                <li>
                  <CheckCircle /> Exportação em CSV
                </li>
                <li>
                  <CheckCircle /> Suporte por e-mail
                </li>
              </ul>
            </div>
            <div className="plan-card">
              <h3 className="plan-name">Para Alunos</h3>
              <p className="plan-price">Grátis</p>
              <p className="plan-description">
                Participe dos projetos da sua turma e aprenda na prática.
              </p>
              <ul className="plan-list">
                <li>
                  <CheckCircle /> Acesso a todos os projetos da sua turma
                </li>
                <li>
                  <CheckCircle /> Interface de rotulagem completa
                </li>
                <li>
                  <CheckCircle /> Progresso pessoal
                </li>
                <li>
                  <CheckCircle /> Histórico de contribuições
                </li>
                <li>
                  <CheckCircle /> Certificado de participação
                </li>
                <li>
                  <CheckCircle /> Sem limite de rotulagens
                </li>
              </ul>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Resources;
