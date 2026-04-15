"use client";

import {
  BarChart3,
  Edit,
  Eye,
  FolderOpen,
  GraduationCap,
  Image,
  LogOut,
  Plus,
  Search,
  Trash2,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import "../aluno/styles.css";
import "./styles.css";

const projectsList = [
  {
    id: 1,
    name: "Classificação de Animais",
    description: "Identificar espécies de animais em imagens",
    totalImages: 150,
    labeledImages: 89,
    participants: 12,
    status: "active",
  },
  {
    id: 2,
    name: "Detecção de Plantas",
    description: "Classificar tipos de folhas e flores",
    totalImages: 200,
    labeledImages: 200,
    participants: 18,
    status: "completed",
  },
  {
    id: 3,
    name: "Reconhecimento de Objetos",
    description: "Identificar objetos do cotidiano",
    totalImages: 300,
    labeledImages: 45,
    participants: 8,
    status: "active",
  },
];

const TeacherDashboardClient = ({ user }) => {
  const supabase = createClient();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
  });

  useEffect(() => {
    const getProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, email")
        .eq("id", user.id)
        .single();

      if (error) {
        console.log(error);
        return;
      }

      setProfile(data);
    };

    getProfile();
  }, [supabase, user.id]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

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
              <FolderOpen /> Meus Projetos
            </a>
          </nav>

          <div className="sidebar-user">
            <div className="user-info">
              <div className="user-avatar">
                {profile.full_name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>
              <div className="user-data">
                <p className="user-name">{profile.full_name}</p>
                <p className="user-email">{profile.email}</p>
              </div>
              <button className="logout-button" onClick={handleLogout}>
                <LogOut />
              </button>
            </div>
          </div>
        </aside>

        <main className="dashboard-content">
          <div className="dashboard-header">
            <div>
              <h1 className="dashboard-title">Meus Projetos</h1>
              <p className="dashboard-subtitle">
                Gerencie seus projetos de rotulagem de imagens
              </p>
            </div>
            <Link href="/professor/projetos/novo">
              <button className="button primary-button">
                <Plus size={16} />
                Novo Projeto
              </button>
            </Link>
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

          <div className="stats-grid stats-grid-4">
            <div className="stats-card">
              <div className="stats-card-header">
                <div className="stats-card-icon">
                  <FolderOpen />
                </div>
                <span className="stats-card-label">Projetos</span>
              </div>
              <p className="stats-card-value">3</p>
            </div>
            <div className="stats-card">
              <div className="stats-card-header">
                <div className="stats-card-icon">
                  <Image />
                </div>
                <span className="stats-card-label">Imagens</span>
              </div>
              <p className="stats-card-value">650</p>
            </div>
            <div className="stats-card">
              <div className="stats-card-header">
                <div className="stats-card-icon">
                  <BarChart3 />
                </div>
                <span className="stats-card-label">Rotuladas</span>
              </div>
              <p className="stats-card-value">334</p>
            </div>
            <div className="stats-card">
              <div className="stats-card-header">
                <div className="stats-card-icon">
                  <Users />
                </div>
                <span className="stats-card-label">Participantes</span>
              </div>
              <p className="stats-card-value">38</p>
            </div>
          </div>

          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Projeto</th>
                  <th>Progresso</th>
                  <th>Participantes</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {projectsList.map((project) => (
                  <tr key={project.id}>
                    <td>
                      <p className="table-project-name">{project.name}</p>
                      <p className="table-project-description">
                        {project.description}
                      </p>
                    </td>
                    <td>
                      <div className="progress-bar-container">
                        <div className="progress-bar">
                          <div
                            className="progress-bar-fill"
                            style={{
                              width: `${projectPercentage(project.labeledImages, project.totalImages)}%`,
                            }}
                          />
                        </div>
                        <span className="progress-bar-text">
                          {project.labeledImages}/{project.totalImages}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="table-project-participants">
                        <User
                          size={16}
                          style={{ color: "var(--cinza-medio" }}
                        />
                        <span>{project.participants}</span>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`status-badge ${project.status === "active" ? "active" : "completed"}`}
                      >
                        {project.status === "active" ? "Ativo" : "Concluído"}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button className="button-table-action">
                          <Eye />
                        </button>
                        <button className="button-table-action">
                          <Edit />
                        </button>
                        <button className="button-table-action">
                          <Trash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
};

export default TeacherDashboardClient;
