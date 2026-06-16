"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Keyboard,
  SkipForward,
} from "lucide-react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import "./styles.css";

const supabase = createClient();

const LabelingInterface = () => {
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [teacher, setTeacher] = useState("");
  const [labelsList, setLabelsList] = useState([]);
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [labeledImages, setLabeledImages] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);

  // current image
  const currentImage = images[currentImageIndex];

  // get authenticated user
  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setCurrentUser(user);
  };

  useEffect(() => {
    const loadUser = async () => {
      await getUser();
    };

    loadUser();
  }, []);

  // get project data
  const fetchProject = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select(
        `
        id,
        name,
        labels (
          id,
          name
        ),
        project_files (
          id,
          file_name,
          file_path,
          annotations (
            id,
            user_id,
            label_id
          )
        ),
        project_users (
          role,
          user:profiles(
            full_name
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

    // teacher
    const teacherUser = data.project_users.find((u) => u.role === "teacher");

    setTeacher(teacherUser?.user?.full_name || "Professor");

    // labels
    const formattedLabels = data.labels.map((label, index) => ({
      id: label.id,
      name: label.name,
      shortcutKey: String(index + 1),
    }));

    setLabelsList(formattedLabels);

    // images
    const formattedImages =
      data.project_files?.map((file) => {
        const {
          data: { publicUrl },
        } = supabase.storage.from("projects").getPublicUrl(file.file_path);

        return {
          id: file.id,
          name: file.file_name,
          preview: publicUrl,
          annotations: file.annotations || [],
        };
      }) || [];

    setImages(formattedImages);

    const firstUnlabeledIndex = formattedImages.findIndex(
      (image) => !image.annotations.some((a) => a.user_id === currentUser.id),
    );

    if (firstUnlabeledIndex !== -1) {
      setCurrentImageIndex(firstUnlabeledIndex);
    } else {
      setCurrentImageIndex(0);
    }

    // labeled images count
    const labeledCount = formattedImages.filter((image) =>
      image.annotations.some((a) => a.user_id === currentUser.id),
    ).length;

    setLabeledImages(labeledCount);

    setProject(data);
  };

  useEffect(() => {
    if (!currentUser) return;
    const loadProject = async () => {
      await fetchProject();
    };

    loadProject();
  }, [currentUser]);

  // get labeled images
  const fetchSelectedLabel = async () => {
    if (!currentImage || !currentUser) return;

    const userAnnotation = currentImage.annotations?.find(
      (a) => a.user_id === currentUser.id,
    );

    if (userAnnotation) {
      setSelectedLabel(userAnnotation.label_id);
    } else {
      setSelectedLabel(null);
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      await fetchSelectedLabel();
    };

    loadUser();
  }, [currentImage, currentUser]);

  const totalImages = images.length;

  const nextImage = () => {
    if (currentImageIndex < totalImages - 1) {
      setCurrentImageIndex((prev) => prev + 1);
      setSelectedLabel(null);
    }
  };

  const backImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1);
      setSelectedLabel(null);
    }
  };

  const confirmLabel = async () => {
    if (!selectedLabel || !currentImage || !currentUser) return;

    // check existing annotation
    const existingAnnotation = currentImage.annotations.find(
      (a) => a.user_id === currentUser.id,
    );

    if (existingAnnotation) {
      if (existingAnnotation.label_id === selectedLabel) {
        if (currentImageIndex < totalImages - 1) {
          nextImage();
        }

        return;
      }

      const { error } = await supabase
        .from("annotations")
        .update({
          label_id: selectedLabel,
        })
        .eq("id", existingAnnotation.id);

      if (error) {
        console.log(error);
        alert("Erro ao atualizar rótulo");
        return;
      }

      existingAnnotation.label_id = selectedLabel;

      nextImage();
      return;
    }

    const { data: insertedAnnotation, error } = await supabase
      .from("annotations")
      .insert([
        {
          image_id: currentImage.id,
          label_id: selectedLabel,
          user_id: currentUser.id,
        },
      ])
      .select()
      .single();

    if (error) {
      console.log(error);
      alert("Erro ao salvar rótulo");
      return;
    }

    setImages((prev) =>
      prev.map((img) => {
        if (img.id !== currentImage.id) return img;

        return {
          ...img,
          annotations: [...img.annotations, insertedAnnotation],
        };
      }),
    );

    setLabeledImages((prev) => prev + 1);

    nextImage();
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const numericKey = Number(event.key);

      const label = labelsList.find(
        (l) => Number(l.shortcutKey) === numericKey,
      );

      if (label) {
        setSelectedLabel(label.id);
      }

      if (event.key === "Enter") {
        if (!selectedLabel) {
          nextImage();
          return;
        }

        confirmLabel();
      }

      if (event.key === "ArrowRight") {
        nextImage();
      }

      if (event.key === "ArrowLeft") {
        backImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedLabel, currentImageIndex, labelsList]);

  return (
    <>
      <div className="labeling-interface">
        <header className="header">
          <div className="header-left">
            <Link href="/aluno" className="back-button">
              <ArrowLeft />
            </Link>
            <div className="project-info">
              <div className="project-icon">
                <GraduationCap />
              </div>
              <div>
                <p className="project-name">{project?.name || "Projeto"}</p>
                <p className="project-teacher">{teacher}</p>
              </div>
            </div>
          </div>

          <div className="progress">
            <div className="progress-text">
              <p className="progress-numbers">
                {labeledImages} de {totalImages}
              </p>
              <p className="progress-info">imagens rotuladas</p>
            </div>

            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{
                  width:
                    totalImages > 0
                      ? `${(labeledImages / totalImages) * 100}%`
                      : "0%",
                }}
              />
            </div>
          </div>
        </header>

        <main className="main">
          <div className="image-area">
            <div className="image-navigation">
              <button
                onClick={backImage}
                disabled={currentImageIndex === 0}
                className="navigation-button"
              >
                <ChevronLeft />
              </button>
              <span className="image-counter">
                Imagem {currentImageIndex + 1} de {totalImages}
              </span>
              <button
                onClick={nextImage}
                disabled={currentImageIndex === totalImages - 1}
                className="navigation-button"
              >
                <ChevronRight />
              </button>
            </div>

            <div className="image-container">
              {currentImage ? (
                <Image
                  src={currentImage.preview}
                  alt={currentImage.name}
                  fill
                  unoptimized
                  className="labeling-image"
                />
              ) : (
                <div className="image-placeholder">
                  Nenhuma imagem encontrada
                </div>
              )}
            </div>
          </div>

          <aside className="panel-labels">
            <div className="panel-header">
              <h2 className="panel-title">Selecione o rótulo</h2>

              <p className="panel-description">
                Escolha a categoria que melhor descreve a imagem
              </p>
            </div>

            <div className="labels-list">
              {labelsList.map((label) => (
                <button
                  key={label.id}
                  onClick={() => setSelectedLabel(label.id)}
                  className={`option ${selectedLabel === label.id ? "selected-label" : ""}`}
                >
                  <span className="option-name">{label.name}</span>
                  <span className="option-shortcut">{label.shortcutKey}</span>
                </button>
              ))}
            </div>

            <div className="actions">
              <button
                onClick={confirmLabel}
                disabled={!selectedLabel}
                className="button primary-button large-button"
                style={{ opacity: selectedLabel ? 1 : 0.5 }}
              >
                <Check size={16} />
                Confirmar e avançar
              </button>
              <button
                onClick={nextImage}
                className="button secondary-button large-button"
              >
                <SkipForward size={16} />
                Pular imagem
              </button>
            </div>

            <div className="shortcuts">
              <div className="shortcuts-title">
                <Keyboard />
                <span>Atalhos de teclado</span>
              </div>
              <div className="shortcuts-list">
                <p>
                  <span className="shortcut-key">1-{labelsList.length}</span>{" "}
                  Selecionar rótulo
                </p>
                <p>
                  <span className="shortcut-key">Enter</span> Confirmar
                </p>
                <p>
                  <span className="shortcut-key">→</span> Próxima imagem
                </p>
                <p>
                  <span className="shortcut-key">←</span> Imagem anterior
                </p>
              </div>
            </div>
          </aside>
        </main>
      </div>
    </>
  );
};

export default LabelingInterface;
