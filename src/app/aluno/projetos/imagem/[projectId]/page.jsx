"use client";

import { useRef, useState } from "react";
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
import "./styles.css";

const UploadImages = () => {
  const [importedImages, setImportedImages] = useState([]);
  const imageGoal = 50;
  const fileInputRef = useRef(null);

  const projectPercentage = (importedImages, imageGoal) => {
    return Math.round((importedImages.length / imageGoal) * 100);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/"),
    );
    addImages(files);
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    addImages(files);
  };

  const addImages = (files) => {
    const newImages = files.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      size: file.size,
      preview: URL.createObjectURL(file),
    }));
    setImportedImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (imageId) => {
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
                <p className="project-name">Classificação de Animais</p>
                <p className="teacher-name">Prof. Fernando</p>
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
