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
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import "./styles.css";

const supabase = createClient();

const StudentDashboardClient = ({ user }) => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("mine");
  const [searchTerm, setSearchTerm] = useState("");
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
  });
  const [availableProjects, setAvailableProjects] = useState([]);
  const [myProjects, setMyProjects] = useState([]);
  const [stats, setStats] = useState({
    labeledImages: 0,
    activeProjects: 0,
    completedProjects: 0,
  });

  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return new Date(year, month - 1, day).toLocaleDateString("pt-BR");
  };

  // get user infos
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
  }, [user.id]);

  // get available projects
  const fetchAvailableProjects = async () => {
    const { data, error } = await supabase.from("projects").select(
      `
        id,
        name,
        deadline,
        images_per_student,
        project_users (
          role,
          user_id,
          user:profiles(
            full_name
          )
        )
        `,
    );

    if (error) {
      console.log(error);
      return;
    }

    const formatted = data
      .filter((p) => {
        const userInProject = p.project_users.some(
          (u) => u.user_id === user.id,
        );
        return !userInProject;
      })
      .map((p) => {
        const teacher = p.project_users.find((u) => u.role === "teacher");

        return {
          id: p.id,
          name: p.name,
          teacher: teacher?.user?.full_name || "Professor",
          totalImages: p.images_per_student,
          deadline: formatDate(p.deadline),
        };
      });

    setAvailableProjects(formatted);
  };

  useEffect(() => {
    const loadProjects = async () => {
      await fetchAvailableProjects();
    };

    loadProjects();
  }, []);

  // get student projects
  const fetchMyProjects = async () => {
    const { data, error } = await supabase
      .from("project_users")
      .select(
        `
          project:projects (
            id,
            name,
            images_per_student,
            project_files (
              id,
              user_id,
              annotations (user_id)
            ),
            project_users (
              role,
              user:profiles (full_name)
            )
          )
          `,
      )
      .eq("user_id", user.id)
      .eq("role", "student");

    if (error) {
      console.log(error);
      return;
    }

    const formatted = data.map(({ project: p }) => {
      const teacher = p.project_users.find((u) => u.role === "teacher");

      const imagesToImport = p.images_per_student || 0;

      const importedImages =
        p.project_files?.filter((file) => file.user_id === user.id).length || 0;

      const labeledImages =
        p.project_files?.reduce((acc, file) => {
          const userAnnotations =
            file.annotations?.filter((a) => a.user_id === user.id) || [];
          return acc + userAnnotations.length;
        }, 0) || 0;

      return {
        id: p.id,
        name: p.name,
        teacher: teacher?.user?.full_name,
        importedImages,
        imagesToImport,
        labeledImages,
        imagesToLabel: importedImages,
        status:
          importedImages > 0 && labeledImages === importedImages
            ? "completed"
            : "in-progress",
      };
    });

    setMyProjects(formatted);

    const labeledImages = formatted.reduce(
      (acc, p) => acc + p.labeledImages,
      0,
    );

    const activeProjects = formatted.filter(
      (p) => p.status === "in-progress",
    ).length;

    const completedProjects = formatted.filter(
      (p) => p.status === "completed",
    ).length;

    setStats({
      labeledImages,
      activeProjects,
      completedProjects,
    });
  };

  useEffect(() => {
    const loadProjects = async () => {
      await fetchMyProjects();
    };

    loadProjects();
  }, []);

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

  const handleJoinProject = async (projectId) => {
    const { error } = await supabase.from("project_users").insert([
      {
        project_id: projectId,
        user_id: user.id,
        role: "student",
      },
    ]);

    if (error) {
      console.log(error);
      alert("Erro ao entrar no projeto");
      return;
    }

    alert("Você entrou no projeto!");

    await fetchAvailableProjects();
    await fetchMyProjects();
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
          <div style={{ marginBottom: "32px" }}>
            <h1 className="dashboard-title">
              Olá, {profile.full_name?.split(" ")[0]}!
            </h1>
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
              <p className="stats-card-value">{stats.labeledImages}</p>
            </div>
            <div className="stats-card">
              <div className="stats-card-header">
                <div className="stats-card-icon">
                  <FolderOpen />
                </div>
                <span className="stats-card-label">Projetos Ativos</span>
              </div>
              <p className="stats-card-value">{stats.activeProjects}</p>
            </div>
            <div className="stats-card">
              <div className="stats-card-header">
                <div className="stats-card-icon">
                  <CheckCircle />
                </div>
                <span className="stats-card-label">Concluídos</span>
              </div>
              <p className="stats-card-value">{stats.completedProjects}</p>
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
                      <span>Importação</span>
                      <span>
                        {project.importedImages}/{project.imagesToImport}
                      </span>
                    </div>

                    <div className="progress-bar" style={{ maxWidth: "100%" }}>
                      <div
                        className="progress-bar-fill"
                        style={{
                          width: `${projectPercentage(project.importedImages, project.imagesToImport)}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="project-card-progress">
                    <div className="project-card-progress-info">
                      <span>Rotulagem</span>
                      <span>
                        {project.labeledImages}/{project.imagesToLabel}
                      </span>
                    </div>

                    <div className="progress-bar" style={{ maxWidth: "100%" }}>
                      <div
                        className="progress-bar-fill"
                        style={{
                          width: `${projectPercentage(project.labeledImages, project.imagesToLabel)}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="project-card-actions">
                    <Link href={`/aluno/projetos/imagem/${project.id}`}>
                      <button className="button secondary-button large-button">
                        Adicionar Imagens
                        <ArrowRight size={16} />
                      </button>
                    </Link>

                    <Link href={`/aluno/projetos/rotulagem/${project.id}`}>
                      <button className="button primary-button large-button">
                        {project.status === "completed"
                          ? "Ver resultados"
                          : "Continuar rotulagem"}
                        <ArrowRight size={16} />
                      </button>
                    </Link>
                  </div>
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

                  <button
                    onClick={() => handleJoinProject(project.id)}
                    className="button secondary-button large-button"
                  >
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

export default StudentDashboardClient;
