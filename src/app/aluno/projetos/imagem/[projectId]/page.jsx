"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle,
  GraduationCap,
  Images,
  Upload,
  X,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import "./styles.css";

const supabase = createClient();

const UploadImages = () => {
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [teacher, setTeacher] = useState("");
  const [imageGoal, setImageGoal] = useState(0);
  const [importedImages, setImportedImages] = useState([]);

  const fileInputRef = useRef(null);

  const projectPercentage = (importedImages, imageGoal) => {
    if (importedImages === 0 || imageGoal === 0) {
      return 0;
    }

    return Math.round((importedImages.length / imageGoal) * 100);
  };

  const fetchProject = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select(
        `
        id,
        name,
        images_per_student,
        project_files (
          id,
          file_name,
          file_path
        ),
        project_users (
          role,
          user:profiles (
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

    const teacherUser = data.project_users.find((u) => u.role === "teacher");

    setProject(data);
    setTeacher(teacherUser?.user?.full_name || "Professor");
    setImageGoal(data.images_per_student || 0);

    const formattedImages =
      data.project_files?.map((file) => {
        const {
          data: { publicUrl },
        } = supabase.storage.from("projects").getPublicUrl(file.file_path);

        return {
          id: file.id,
          name: file.file_name,
          preview: publicUrl,
        };
      }) || [];

    setImportedImages(formattedImages);
  };

  useEffect(() => {
    const loadProject = async () => {
      await fetchProject();
    };

    loadProject();
  }, []);

  const handleDrop = async (event) => {
    event.preventDefault();

    const files = Array.from(event.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/"),
    );

    await addImages(files);
  };

  const handleFileSelect = async (event) => {
    const files = Array.from(event.target.files);

    await addImages(files);
  };

  const addImages = async (files) => {
    const remainingSlots = imageGoal - importedImages.length;

    if (remainingSlots <= 0) {
      alert("Você já atingiu o limite de imagens deste projeto.");
      return;
    }

    const limitedFiles = files.slice(0, remainingSlots);

    if (files.length > remainingSlots) {
      alert(
        `Limite atingido! Apenas ${remainingSlots} imagem(ns) foram adicionadas.`,
      );
    }

    const uploadedImages = [];

    for (const file of limitedFiles) {
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = `${projectId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("projects")
        .upload(filePath, file);

      if (uploadError) {
        console.log(uploadError);
        continue;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("projects").getPublicUrl(filePath);

      await supabase.from("project_files").insert([
        {
          project_id: projectId,
          file_name: file.name,
          file_path: filePath,
        },
      ]);

      uploadedImages.push({
        id: filePath,
        name: file.name,
        size: file.size,
        preview: publicUrl,
      });
    }

    setImportedImages((prev) => [...prev, ...uploadedImages]);
  };

  const removeImage = async (imageId) => {
    const image = importedImages.find((img) => img.id === imageId);

    if (!image) return;

    // remove database
    const { error } = await supabase
      .from("project_files")
      .delete()
      .eq("id", imageId);

    if (error) {
      console.log(error);
      return;
    }

    // remove local state
    setImportedImages((prev) => prev.filter((image) => image.id !== imageId));
  };

  const openFileSelector = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <div className="upload-images">
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
                <p className="teacher-name">{teacher}</p>
              </div>
            </div>
          </div>

          <div className="progress">
            <div className="progress-text">
              <p className="progress-numbers">
                {importedImages.length}/{imageGoal}
              </p>
              <p className="progress-label">imagens importadas</p>
            </div>

            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{
                  width: `${Math.min(projectPercentage(importedImages, imageGoal), 100)}%`,
                }}
              />
            </div>
          </div>
        </header>

        <main className="content">
          <div
            className="drop-area"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={openFileSelector}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden-input"
            />

            <div className="area-icon">
              <Upload />
            </div>

            <h3 className="area-title">Arraste e solte suas imagens</h3>

            <p className="area-description">
              ou clique para selecionar arquivos
            </p>

            <p className="area-formats">
              PNG, JPG ou JPEG (máx. 10MB por arquivo)
            </p>
          </div>

          {importedImages.length > 0 && (
            <div className="counter">
              <div className="counter-info">
                <CheckCircle size={18} />
                <span>
                  {importedImages.length}{" "}
                  {importedImages.length === 1
                    ? "imagem importada"
                    : "imagens importadas"}
                </span>
              </div>

              <span className="counter-goal">Meta: {imageGoal} imagens</span>
            </div>
          )}

          {importedImages.length > 0 && (
            <div className="images-grid">
              {importedImages.map((image) => (
                <div key={image.id} className="image-item">
                  <Image
                    src={image.preview}
                    alt={image.name}
                    width={180}
                    height={110}
                    className="image-preview"
                    unoptimized
                    priority
                  />

                  <button
                    onClick={() => removeImage(image.id)}
                    className="remove-button"
                  >
                    <X size={12} />
                  </button>

                  <p className="image-name">{image.name}</p>
                </div>
              ))}
            </div>
          )}

          {importedImages.length === 0 && (
            <div className="empty-state">
              <Images size={48} />
              <p>Nenhuma imagem importada ainda</p>
              <p className="empty-state-sub">
                Arraste imagens ou clique na área para começar
              </p>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default UploadImages;
