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
  Download,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import JSZip from "jszip";
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
  const [projectGoal, setProjectGoal] = useState(0);

  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return new Date(year, month - 1, day).toLocaleDateString("pt-BR");
  };

  const projectPercentage = (current, goal) => {
    if (!goal) return 0;

    return Math.min(Math.round((current / goal) * 100), 100);
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
        images_per_student,
        created_at,
        project_files (
          id,
          file_name,
          file_path,
          annotations (
            id,
            user_id,
            label_id,
            created_at
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

      const students =
        data.project_users?.filter((u) => u.role === "student") || [];

      const goal = students.length * (data.images_per_student || 0);

      setProjectGoal(goal);

      setParticipants(students);

      setLabels(data.labels || []);

      const totalProjectImages = data.project_files?.length || 0;

      setTotalImages(totalProjectImages);

      const uniqueLabeledImages = new Set(
        data.project_files
          ?.filter((file) => file.annotations?.length > 0)
          .map((file) => file.id) || [],
      ).size;

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

  const exportDatasetCsv = async () => {
    const { data: annotations, error } = await supabase
      .from("annotations")
      .select(
        `
      id,
      image_id,
      user_id,
      label_id,
      created_at
    `,
      )
      .in(
        "image_id",
        project.project_files.map((file) => file.id),
      );

    if (error) {
      console.log(error);
      alert("Erro ao exportar dataset.");
      return;
    }

    const userIds = [...new Set(annotations.map((a) => a.user_id))];
    const labelIds = [...new Set(annotations.map((a) => a.label_id))];

    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, full_name")
      .in("id", userIds);

    const { data: projectLabels } = await supabase
      .from("labels")
      .select("id, name")
      .in("id", labelIds);

    const profilesMap = Object.fromEntries(
      profiles.map((profile) => [profile.id, profile.full_name]),
    );

    const labelsMap = Object.fromEntries(
      projectLabels.map((label) => [label.id, label.name]),
    );

    const filesMap = Object.fromEntries(
      project.project_files.map((file) => [file.id, file.file_name]),
    );

    const rows = [
      [
        "image_id",
        "file_name",
        "label",
        "annotated_by",
        "annotation_date",
      ].join(","),
    ];

    annotations.forEach((annotation) => {
      rows.push(
        [
          annotation.image_id,
          `"${filesMap[annotation.image_id] || ""}"`,
          `"${labelsMap[annotation.label_id] || ""}"`,
          `"${profilesMap[annotation.user_id] || ""}"`,
          annotation.created_at,
        ].join(","),
      );
    });

    const csvContent = rows.join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    const fileName = project.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_|_$/g, "");

    link.href = url;
    link.download = `${fileName}_dataset.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const exportImagesDataset = async () => {
    try {
      const zip = new JSZip();

      for (const file of project.project_files) {
        const { data } = supabase.storage
          .from("projects")
          .getPublicUrl(file.file_path);

        const response = await fetch(data.publicUrl);

        if (!response.ok) {
          console.error(`Erro ao baixar imagem: ${file.file_path}`);
          continue;
        }

        const blob = await response.blob();

        zip.file(file.file_name, blob);
      }

      const zipBlob = await zip.generateAsync({
        type: "blob",
      });

      const url = URL.createObjectURL(zipBlob);

      const link = document.createElement("a");

      const fileName = project.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_|_$/g, "");

      link.href = url;
      link.download = `${fileName}_images.zip`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Erro ao exportar imagens.");
    }
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
                <span className="header-title">{project.name}</span>
                <span
                  className={`status-badge status ${statusMap[status]?.className}`}
                >
                  {statusMap[status]?.label}
                </span>
              </div>
            </div>
          </div>
          <div className="actions">
            <button
              onClick={exportDatasetCsv}
              disabled={status !== "finished"}
              className="button secondary-button"
            >
              <Download size={16} />
              Exportar CSV
            </button>
            <button
              onClick={exportImagesDataset}
              disabled={status !== "finished"}
              className="button secondary-button"
            >
              <Image size={16} />
              Exportar Imagens
            </button>
            <Link href={`/professor/projetos/${project.id}/editar`}>
              <button className="button primary-button">
                <Edit size={16} />
                Editar Projeto
              </button>
            </Link>
          </div>
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
            <h2 className="section-title">Progresso da Rotulagem do Projeto</h2>

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
                    width: `${projectPercentage(labeledImages, projectGoal)}%`,
                  }}
                />
              </div>

              <span className="progress-bar-text">
                {labeledImages} de {projectGoal} (
                {projectPercentage(labeledImages, projectGoal)}
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
                    {getInitials(participant.user?.full_name)}
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
