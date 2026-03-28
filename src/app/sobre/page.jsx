import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import {
  Code,
  GraduationCap,
  Heart,
  Lightbulb,
  Target,
  Users,
} from "lucide-react";
import "./styles.css";

const About = () => {
  return (
    <>
      <main>
        <Navbar />

        <section className="hero">
          <div className="hero-content">
            <span className="label">Sobre nós</span>
            <h1 className="title">
              Tornando a Inteligência Artificial acessível na educação
            </h1>
            <p className="subtitle">
              O Label4Learn nasceu da necessidade de aproximar estudantes e
              professores do universo da IA, oferecendo uma ferramenta prática e
              colaborativa para rotulagem de dados no contexto acadêmico.
            </p>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Nossa Missão</h2>
          <p className="section-text">
            Acreditamos que a melhor forma de aprender Aprendizagem de Máquina é
            praticando. O Label4Learn é uma plataforma educacional que permite a
            professores criar projetos de rotulagem de imagens e a alunos
            participarem ativamente do processo de construção de datasets — uma
            etapa fundamental no desenvolvimento de modelos de Machine Learning.
          </p>
          <p className="section-text">
            Nosso objetivo é democratizar o acesso ao aprendizado de IA,
            fornecendo uma ferramenta gratuita, intuitiva, e pensada para o
            ambiente universitário brasileiro.
          </p>
        </section>

        <section className="section" style={{ paddingTop: 0 }}>
          <h2 className="section-title">Nossos Valores</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <Target />
              </div>
              <h3 className="value-title">Foco Educacional</h3>
              <p className="value-description">
                Cada funcionalidade é pensada para maximizar o aprendizado, não
                apenas a produtividade.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <Heart />
              </div>
              <h3 className="value-title">Acessibilidade</h3>
              <p className="value-description">
                Plataforma gratuita e com interface simples, para que qualquer
                pessoa possa usar sem barreiras técnicas.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <Lightbulb />
              </div>
              <h3 className="value-title">Inovação</h3>
              <p className="value-description">
                Buscamos constantemente novas formas de tornar o ensino de IA
                mais engajante e efetivo.
              </p>
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 0 }}>
          <h2 className="section-title">Nossa Equipe</h2>
          <div className="team-grid">
            <div className="team-card">
              <div className="team-avatar">
                <GraduationCap />
              </div>
              <h3 className="team-name">Prof. Rodrigo Ribeiro</h3>
              <p className="team-position">Coordenador do Projeto</p>
              <p className="team-bio">
                Doutor em Ciência da Computação com foco em IA aplicada à
                educação.
              </p>
            </div>
            <div className="team-card">
              <div className="team-avatar">
                <Code />
              </div>
              <h3 className="team-name">Lucas Henrique da Silva</h3>
              <p className="team-position">Desenvolvedor Principal</p>
              <p className="team-bio">
                Engenheiro de software com experiência em plataformas
                educacionais
              </p>
            </div>
            <div className="team-card">
              <div className="team-avatar">
                <Users />
              </div>
              <h3 className="team-name">Victor Tavares</h3>
              <p className="team-position">Designer UX</p>
              <p className="team-bio">
                Especialista em design centrado no usuário para aplicações
                educacionais.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default About;
