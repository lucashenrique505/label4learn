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

  const stats = {
    totalProjects: projects.length,
    totalImages: projects.reduce((acc, p) => acc + p.totalImages, 0),
    labeledImages: projects.reduce((acc, p) => acc + p.labeledImages, 0),
    participants: projects.reduce((acc, p) => acc + p.participants, 0),
  };

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
            images_per_student,
            status,
            project_files (
            id,
            annotations (
              image_id
            )
          ),
            project_users (
              id,
              role
            )
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
        const totalImages = p.project.project_files?.length || 0;

        const allAnnotations =
          p.project.project_files?.flatMap((file) => file.annotations || []) ||
          [];

        const labeledImages = new Set(allAnnotations.map((a) => a.image_id))
          .size;

        const participants =
          p.project.project_users?.filter((u) => u.role === "student").length ||
          0;

        const projectGoal = participants * (p.project.images_per_student || 0);

        console.log(participants, "participants");
        console.log(
          p.project.images_per_student,
          "p.project.images_per_student",
        );

        let status = "draft";

        if (totalImages > 0) {
          status = labeledImages >= totalImages ? "finished" : "active";
        }

        return {
          id: p.project.id,
          name: p.project.name,
          description: p.project.description,
          status,
          totalImages,
          labeledImages,
          participants,
          projectGoal,
        };
      });

      setProjects(formattedProjects);
    };

    fetchProjects();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const projectPercentage = (current, goal) => {
    if (!goal) return 0;

    return Math.min(Math.round((current / goal) * 100), 100);
  };

  const handleDeleteProject = async (project) => {
    const isDraft = project.status === "draft";

    const message = isDraft
      ? "Deseja realmente excluir esse rascunho?"
      : "Este projeto possui alunos e/ou imagens em andamento.\n\nTem certeza que deseja excluir? Esta ação é irreversível!";

    const confirmDelete = window.confirm(message);

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", project.id);

    if (error) {
      console.log(error);
      alert("Erro ao excluir o projeto!");
      return;
    }

    setProjects((prev) => prev.filter((p) => p.id !== project.id));

    alert("Projeto excluído com sucesso!");
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

  const getInitials = (fullName) => {
    if (!fullName) return "";

    const names = fullName.trim().split(" ");

    if (names.length === 1) {
      return names[0][0].toUpperCase();
    }

    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
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
                {getInitials(profile.full_name)}
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
                {projects
                  .filter((project) => {
                    const term = searchTerm.trim().toLowerCase();
                    if (!term) return true;
                    return (
                      project.name.toLowerCase().includes(term) ||
                      project.description.toLowerCase().includes(term)
                    );
                  })
                  .map((project) => (
                    <tr key={project.id}>
                      <td>
                        <p className="table-project-name">{project.name}</p>
                        <p className="progress-bar-container">
                          {project.description}
                        </p>
                      </td>
                      <td>
                        <div className="progress-bar-container">
                          <div className="progress-bar">
                            <div
                              className="progress-bar-fill"
                              style={{
                                width: `${projectPercentage(project.labeledImages, project.projectGoal)}%`,
                              }}
                            />
                          </div>
                          <span className="progress-bar-text">
                            {project.labeledImages}/{project.projectGoal}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <Users
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
                          <Link href={`/professor/projetos/${project.id}`}>
                            <button className="button-table-action">
                              <Eye />
                            </button>
                          </Link>
                          <Link
                            href={`/professor/projetos/${project.id}/editar`}
                          >
                            <button className="button-table-action">
                              <Edit />
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDeleteProject(project)}
                            className="button-table-action"
                          >
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
