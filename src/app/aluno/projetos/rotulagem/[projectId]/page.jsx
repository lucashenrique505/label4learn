"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Keyboard,
  SkipForward,
} from "lucide-react";
import "./styles.css";

const labelsList = [
  { id: 1, name: "Cachorro", shortcutKey: "1" },
  { id: 2, name: "Gato", shortcutKey: "2" },
  { id: 3, name: "Pássaro", shortcutKey: "3" },
  { id: 4, name: "Outro", shortcutKey: "4" },
];

const LabelingInterface = () => {
  const [currentImage, setCurrentImage] = useState(1);
  const [selectedLabel, setSelectedLabel] = useState(null);
  const totalImages = 150;
  const labeledImages = 45;

  const nextImage = () => {
    if (currentImage < totalImages) {
      setCurrentImage(currentImage + 1);
      setSelectedLabel(null);
    }
  };

  const backImage = () => {
    if (currentImage > 1) {
      setCurrentImage(currentImage - 1);
      setSelectedLabel(null);
    }
  };

  const confirmLabel = () => {
    if (selectedLabel) {
      console.log("Label Confirmed:", {
        image: currentImage,
        label: selectedLabel,
      });
      nextImage();
    }
  };

  return (
    <>
      <div className="labeling-interface">
        <header className="header">
          <div className="header-left">
            <Link href="/aluno" className="back-button">
              <ArrowLeft />
            </Link>
            <div className="labeling-project-info">
              <div className="labeling-project-icon">
                <GraduationCap />
              </div>
              <div>
                <p className="labeling-project-name">
                  Classificação de Animais
                </p>
                <p className="labeling-project-teacher">Prof. Fernando</p>
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
                  width: `${(labeledImages / totalImages) * 100}%`,
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
                disabled={currentImage === 1}
                className="navigation-button"
              >
                <ChevronLeft />
              </button>
              <span className="image-counter">
                Imagem {currentImage} de {totalImages}
              </span>
              <button
                onClick={nextImage}
                disabled={currentImage === totalImages}
                className="navigation-button"
              >
                <ChevronRight />
              </button>
            </div>

            <div className="image-container">
              <div className="image-placeholder">
                <div className="image-placeholder-box">
                  Imagem de exemplo #{currentImage}
                </div>
              </div>
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
                  <span className="shortcut-key">1-4</span> Selecionar rótulo
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
