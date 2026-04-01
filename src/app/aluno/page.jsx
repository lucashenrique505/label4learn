"use client";

import {
  ArrowRight,
  CheckCircle,
  Clock,
  FolderOpen,
  GraduationCap,
  Image,
  LogOut,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import "./styles.css";

const availableProjects = [
  {
    id: 1,
    name: "Classificação de Animais",
    teacher: "Prof. Fernando",
    totalImages: 150,
    deadline: "15/04/2026",
  },
  {
    id: 2,
    name: "Reconhecimento de Objetos",
    teacher: "Prof. Marina",
    totalImages: 300,
    deadline: "20/05/2026",
  },
];

const myProjects = [
  {
    id: 3,
    name: "Detecção de Plantas",
    teacher: "Prof. Fernando",
    labeledImages: 45,
    totalImages: 200,
    status: "in-progress",
  },
  {
    id: 4,
    name: "Classificação de Veículos",
    teacher: "Prof. Carlos",
    labeledImages: 80,
    totalImages: 80,
    status: "completed",
  },
];

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("mine");
  const [searchTerm, setSearchTerm] = useState("");

  const projectPercentage = (labeled, total) => {
    return Math.round((labeled / total) * 100);
  };

  return (
    <>
      <div className="dashboard">
        <aside className="sidebar">
          <Link href="/" className="sidebar-logo">
            <div className="sidebar-logo-icon">
              <GraduationCap />
            </div>
            <span className="logo-text">
              Label<span className="logo-highlight">4Learn</span>
            </span>
          </Link>

          <nav className="sidebar-menu">
            <a href="#" className="menu-item active">
              <FolderOpen /> Projetos
            </a>
          </nav>

          <div className="sidebar-user">
            <div className="user-info">
              <div className="user-avatar">AM</div>
              <div className="user-data">
                <p className="user-name">Ana Maria</p>
                <p className="user-email">aluna@uni.edu.br</p>
              </div>
              <button className="logout-button">
                <LogOut />
              </button>
            </div>
          </div>
        </aside>

        <main className="dashboard-content">
          <div style={{ marginBottom: "32px" }}>
            <h1 className="dashboard-title">Olá, Ana!</h1>
            <p className="dashboard-subtitle">
              Continue aprendendo com projetos de rotulagem
            </p>
          </div>

          <div className="stats-grid stats-grid-3">
            <div className="stats-card">
              <div className="stats-card-header">
                <div className="stats-card-icon">
                  <Image />
                </div>
                <span className="stats-card-label">Imagens Rotuladas</span>
              </div>
              <p className="stats-card-value">125</p>
            </div>
            <div className="stats-card">
              <div className="stats-card-header">
                <div className="stats-card-icon">
                  <FolderOpen />
                </div>
                <span className="stats-card-label">Projetos Ativos</span>
              </div>
              <p className="stats-card-value">2</p>
            </div>
            <div className="stats-card">
              <div className="stats-card-header">
                <div className="stats-card-icon">
                  <CheckCircle />
                </div>
                <span className="stats-card-label">Concluídos</span>
              </div>
              <p className="stats-card-value">1</p>
            </div>
          </div>

          <div className="tabs-container">
            <button
              onClick={() => setActiveTab("mine")}
              className={`tab-button ${activeTab === "mine" ? "tab-active" : ""}`}
            >
              Meus Projetos
            </button>
            <button
              onClick={() => setActiveTab("available")}
              className={`tab-button ${activeTab === "available" ? "tab-active" : ""}`}
            >
              Disponíveis
            </button>
          </div>

          <div className="search-bar">
            <Search />
            <input
              type="text"
              placeholder="Buscar projetos..."
              value={searchTerm}
              onChange={(evento) => setSearchTerm(evento.target.value)}
              className="input-field input-field-with-icon"
            />
          </div>

          {activeTab === "mine" && (
            <div className="projects-grid">
              {myProjects.map((project) => (
                <div key={project.id} className="project-card">
                  <div className="project-card-header">
                    <div>
                      <h3 className="project-card-title">{project.name}</h3>
                      <p className="project-card-teacher">{project.teacher}</p>
                    </div>
                    <span
                      className={`status-badge ${project.status === "completed" ? "completed" : "in-progress"}`}
                    >
                      {project.status === "completed"
                        ? "Concluído"
                        : "Em Progresso"}
                    </span>
                  </div>

                  <div className="project-card-progress">
                    <div className="project-card-progress-info">
                      <span>Progresso</span>
                      <span>
                        {project.labeledImages}/{project.totalImages}
                      </span>
                    </div>

                    <div className="progress-bar" style={{ maxWidth: "100%" }}>
                      <div
                        className="progress-bar-fill"
                        style={{
                          width: `${projectPercentage(project.labeledImages, project.totalImages)}%`,
                        }}
                      />
                    </div>
                  </div>

                  <Link href={`/aluno/projetos/rotulagem/${project.id}`}>
                    <button className="button primary-button large-button">
                      {project.status === "completed"
                        ? "Ver resultados"
                        : "Continuar rotulagem"}
                      <ArrowRight size={16} />
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {activeTab === "available" && (
            <div className="projects-grid">
              {availableProjects.map((project) => (
                <div key={project.id} className="project-card">
                  <div className="project-card-header">
                    <div>
                      <h3 className="project-card-title">{project.name}</h3>
                      <p className="project-card-teacher">{project.teacher}</p>
                    </div>
                  </div>

                  <div className="project-card-details">
                    <div className="project-card-detail">
                      <Image size={16} />
                      {project.totalImages} imagens
                    </div>
                    <div className="project-card-detail">
                      <Clock size={16} />
                      até {project.deadline}
                    </div>
                  </div>

                  <button className="button secondary-button large-button">
                    Participar do projeto
                    <ArrowRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default StudentDashboard;
