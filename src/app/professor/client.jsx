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

const TeacherDashboardClient = ({ user }) => {
  const supabase = createClient();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
  });
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalImages: 0,
    labeledImages: 0,
    participants: 0,
  });

  // Route authentication
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

  // Projects info
  useEffect(() => {
    const fetchProjects = async () => {
      //search teacher projects
      const { data: projectsData, error } = await supabase
        .from("project_users")
        .select(
          `
          project:projects (
            id,
            name,
            description,
            status,
            project_files (
            id,
            annotations (
              image_id
            )
          ),
            project_users (id)
          )
        `,
        )
        .eq("user_id", user.id)
        .eq("role", "teacher");

      if (error) {
        console.log(error);
        return;
      }

      const formattedProjects = projectsData.map((p) => {
        const totalImages = p.project_files?.length || 0;

        const labeledImages = new Set(p.annotations?.map((a) => a.image_id))
          .size;

        const participants = p.project_users?.length || 0;

        return {
          id: p.project.id,
          name: p.project.name,
          description: p.project.description,
          status: p.project.status,
          totalImages,
          labeledImages,
          participants,
        };
      });

      setProjects(formattedProjects);

      // calculates general stats
      const totalProjects = formattedProjects.length;
      const totalImages = formattedProjects.reduce(
        (acc, p) => acc + p.totalImages,
        0,
      );
      const labeledImages = formattedProjects.reduce(
        (acc, p) => acc + p.labeledImages,
        0,
      );
      const participants = formattedProjects.reduce(
        (acc, p) => acc + p.participants,
        0,
      );

      setStats({
        totalProjects,
        totalImages,
        labeledImages,
        participants,
      });
    };

    fetchProjects();
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const projectPercentage = (labeled, total) => {
    if (labeled === 0 || total === 0) {
      return 0;
    }

    return Math.round((labeled / total) * 100);
  };

  const statusMap = {
    draft: {
      label: "Rascunho",
      className: "draft",
    },
    active: {
      label: "Ativo",
      className: "active",
    },
    finished: {
      label: "Concluído",
      className: "completed",
    },
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
              <p className="stats-card-value">{stats.totalProjects}</p>
            </div>
            <div className="stats-card">
              <div className="stats-card-header">
                <div className="stats-card-icon">
                  <Image />
                </div>
                <span className="stats-card-label">Imagens</span>
              </div>
              <p className="stats-card-value">{stats.totalImages}</p>
            </div>
            <div className="stats-card">
              <div className="stats-card-header">
                <div className="stats-card-icon">
                  <BarChart3 />
                </div>
                <span className="stats-card-label">Rotuladas</span>
              </div>
              <p className="stats-card-value">{stats.labeledImages}</p>
            </div>
            <div className="stats-card">
              <div className="stats-card-header">
                <div className="stats-card-icon">
                  <Users />
                </div>
                <span className="stats-card-label">Participantes</span>
              </div>
              <p className="stats-card-value">{stats.participants}</p>
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
                {projects.map((project) => {
                  return (
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
                            style={{ color: "var(--cinza-medio)" }}
                          />
                          <span>{project.participants}</span>
                        </div>
                      </td>
                      <td>
                        <span
                          className={`status-badge ${statusMap[project.status]?.className || ""}`}
                        >
                          {statusMap[project.status]?.label || project.status}
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
                  );
                })}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
};

export default TeacherDashboardClient;
