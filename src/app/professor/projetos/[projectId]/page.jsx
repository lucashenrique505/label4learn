"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  GraduationCap,
  ArrowLeft,
  Edit,
  Image,
  BarChart3,
  Users,
  CheckCircle,
  Tag,
  Clock,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import "@/app/aluno/styles.css";
import "@/app/professor/styles.css";
import "./styles.css";

const supabase = createClient();

const ProjectDetails = () => {
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [labels, setLabels] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [labeledImages, setLabeledImages] = useState(0);

  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return new Date(year, month - 1, day).toLocaleDateString("pt-BR");
  };

  const projectPercentage = (labeled, total) => {
    if (labeled === 0 || total === 0) {
      return 0;
    }

    return Math.round((labeled / total) * 100);
  };

  useEffect(() => {
    const fetchProject = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select(
          `
          id,
          name,
          description,
          created_at,
          project_files (
            id,
            annotations (
              id,
              image_id
            )
          ),
          labels (
            id,
            name
          ),
          project_users (
            role,
            user:profiles (
              full_name,
              email
            )
          )
        `,
        )
        .eq("id", projectId)
        .single();

      if (error) {
        console.log(error);
        return;
      }

      setProject(data);

      const students = data.project_users.filter((u) => u.role === "student");

      setParticipants(students);

      setLabels(data.labels || []);

      const totalProjectImages = data.project_files?.length || 0;

      setTotalImages(totalProjectImages);

      const allAnnotations =
        data.project_files?.flatMap((file) => file.annotations || []) || [];

      const uniqueLabeledImages = new Set(allAnnotations.map((a) => a.image_id))
        .size;

      setLabeledImages(uniqueLabeledImages);
    };

    fetchProject();
  }, [projectId]);

  if (!project) {
    return (
      <div className="details">
        <header className="header">
          <Link href="/professor" className="back-button">
            <ArrowLeft />
          </Link>

          <span className="header-title">Projeto não encontrado</span>
        </header>

        <main className="content">
          <p>O projeto solicitado não existe.</p>

          <Link href="/professor">
            <button className="button primary-button" style={{ marginTop: 16 }}>
              Voltar ao painel
            </button>
          </Link>
        </main>
      </div>
    );
  }

  const status =
    labeledImages >= totalImages && totalImages > 0
      ? "finished"
      : totalImages > 0
        ? "active"
        : "draft";

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
      <div className="project-details">
        <header className="header">
          <div className="header-left">
            <Link href="/professor" className="back-button">
              <ArrowLeft />
            </Link>

            <div className="header-info">
              <div className="header-icon">
                <GraduationCap />
              </div>

              <div>
                <p className="header-title">{project.name}</p>

                <span
                  className={`status-badge status ${statusMap[status]?.className}`}
                >
                  {statusMap[status]?.label}
                </span>
              </div>
            </div>
          </div>

          <Link href={`/professor/projetos/${project.id}/editar`}>
            <button className="button primary-button">
              <Edit size={16} />
              Editar Projeto
            </button>
          </Link>
        </header>

        <main className="content">
          <div className="stats-grid stats-grid-4">
            <div className="stats-card">
              <div className="stats-card-header">
                <div className="stats-card-icon">
                  <Image />
                </div>

                <span className="stats-card-label">Imagens</span>
              </div>

              <p className="stats-card-value">{totalImages}</p>
            </div>

            <div className="stats-card">
              <div className="stats-card-header">
                <div className="stats-card-icon">
                  <BarChart3 />
                </div>

                <span className="stats-card-label">Rotuladas</span>
              </div>

              <p className="stats-card-value">{labeledImages}</p>
            </div>

            <div className="stats-card">
              <div className="stats-card-header">
                <div className="stats-card-icon">
                  <Users />
                </div>

                <span className="stats-card-label">Participantes</span>
              </div>

              <p className="stats-card-value">{participants.length}</p>
            </div>

            <div className="stats-card">
              <div className="stats-card-header">
                <div className="stats-card-icon">
                  <Clock />
                </div>

                <span className="stats-card-label">Criado em</span>
              </div>

              <p className="stats-card-value">
                {formatDate(project.created_at.split("T")[0])}
              </p>
            </div>
          </div>

          <div className="section">
            <h2 className="section-title">Progresso do Projeto</h2>

            <div className="progress-bar-container" style={{ marginTop: 12 }}>
              <div
                className="progress-bar"
                style={{
                  height: 12,
                  borderRadius: 6,
                }}
              >
                <div
                  className="progress-bar-fill"
                  style={{
                    width: `${projectPercentage(labeledImages, totalImages)}%`,
                  }}
                />
              </div>

              <span className="progress-bar-text">
                {labeledImages} de {totalImages} (
                {projectPercentage(labeledImages, totalImages)}
                %)
              </span>
            </div>
          </div>

          <div className="section">
            <h2 className="section-title">Descrição</h2>

            <p className="description">{project.description}</p>
          </div>

          <div className="section">
            <h2 className="section-title">
              <Tag
                size={18}
                style={{
                  verticalAlign: "middle",
                  marginRight: 8,
                }}
              />
              Rótulos Definidos
            </h2>

            <div className="labels-list">
              {labels.map((label) => (
                <span key={label.id} className="label-tag">
                  <CheckCircle size={14} />
                  {label.name}
                </span>
              ))}
            </div>
          </div>

          <div className="section">
            <h2 className="section-title">
              <Users
                size={18}
                style={{
                  verticalAlign: "middle",
                  marginRight: 8,
                }}
              />
              Participantes
            </h2>

            <div className="participants-list">
              {participants.map((participant, index) => (
                <div key={index} className="participant-item">
                  <div className="participant-avatar">
                    {participant.user?.full_name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </div>

                  <span>{participant.user?.full_name}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProjectDetails;
