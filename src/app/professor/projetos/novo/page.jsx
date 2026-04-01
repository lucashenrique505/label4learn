"use client";

import {
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  Plus,
  Tags,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import "./styles.css";

const CreateProject = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    labels: [""],
  });

  const addLabel = () => {
    setProjectData({
      ...projectData,
      labels: [...projectData.labels, ""],
    });
  };

  const removeLabel = (index) => {
    const newLabels = projectData.labels.filter((_, i) => i !== index);
    setProjectData({ ...projectData, labels: newLabels });
  };

  const updateLabel = (index, newValue) => {
    const newLabels = [...projectData.labels];
    newLabels[index] = newValue;
    setProjectData({ ...projectData, labels: newLabels });
  };

  const updateField = (field, value) => {
    setProjectData({ ...projectData, [field]: value });
  };

  const getStepClass = (stepNumber) => {
    if (stepNumber === currentStep) return "step-indicator step-current";
    if (stepNumber < currentStep) return "step-indicator step-completed";
    return "step-indicator step-future";
  };

  return (
    <>
      <div className="create-project">
        <header className="header">
          <div className="header-left">
            <Link href="/professor" className="back-button">
              <ArrowLeft />
            </Link>

            <div className="labeling-project-info">
              <div className="labeling-project-icon">
                <GraduationCap />
              </div>
              <span className="header-title">Criar Novo Projeto</span>
            </div>
          </div>
          <div className="steps-indicator">
            {[1, 2].map((number) => (
              <div key={number} className={getStepClass(number)}>
                {number}
              </div>
            ))}
          </div>
        </header>

        <main className="content">
          {currentStep === 1 && (
            <div className="section">
              <div className="section-header">
                <h1 className="section-title">Informações do Projeto</h1>
                <p className="section-description">
                  Defina o nome e descrição do seu projeto de rotulagem
                </p>
              </div>

              <div className="fields">
                <div className="group-field">
                  <label htmlFor="projectName" className="label-field">
                    Nome do Projeto
                  </label>
                  <input
                    id="projectName"
                    type="text"
                    placeholder="Ex: Classificação de Animais"
                    value={projectData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="input-field high-input-field"
                  ></input>
                </div>
                <div className="group-field">
                  <label htmlFor="projectDescription" className="label-field">
                    Descrição
                  </label>
                  <textarea
                    id="projectDescription"
                    placeholder="Descreva o objetivo do projeto e instruções para os alunos..."
                    value={projectData.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    rows={4}
                    className="textarea"
                  ></textarea>
                </div>
              </div>
              <div className="navigation-right">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="button primary-button"
                >
                  Próximo <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="section">
              <div className="section-header">
                <h1 className="section-title">Definir Rótulos</h1>
                <p className="section-description">
                  Crie as categorias/classes que os alunos usarão para rotular
                  as imagens
                </p>
              </div>

              <div className="label-list-creation">
                {projectData.labels.map((label, index) => (
                  <div key={index} className="label-item">
                    <div className="label-item-icon">
                      <Tags />
                    </div>

                    <input
                      placeholder={`Rótulo ${index + 1} (ex: Cachorro)`}
                      value={label}
                      onChange={(e) => updateLabel(index, e.target.value)}
                      className="input-field high-input-field"
                    />

                    {projectData.labels.length > 1 && (
                      <button
                        onClick={() => removeLabel(index)}
                        className="remove-label-button"
                      >
                        <X />
                      </button>
                    )}
                  </div>
                ))}

                <button
                  onClick={addLabel}
                  className="button secondary-button large-button"
                >
                  <Plus size={16} />
                  Adicionar rótulo
                </button>
              </div>

              <div className="navigation">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="button secondary-button"
                >
                  Voltar
                </button>

                <button className="button primary-button">
                  Criar Projeto <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default CreateProject;
