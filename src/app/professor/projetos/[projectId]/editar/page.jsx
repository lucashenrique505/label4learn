"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

import {
  GraduationCap,
  ArrowLeft,
  ArrowRight,
  Plus,
  X,
  Tags,
  Save,
} from "lucide-react";

import "./styles.css";

const supabase = createClient();

const EditProject = () => {
  const { projectId } = useParams();
  const [projectExist, setProjectExist] = useState(null);
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);

  const [project, setProject] = useState({
    name: "",
    description: "",
  });

  const [labels, setLabels] = useState([]);

  const fetchProject = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select(
        `
      id,
      name,
      description,
      labels (
        id,
        name
      )
    `,
      )
      .eq("id", projectId)
      .single();

    if (error) {
      console.log(error);
      return;
    }

    setProject({
      name: data.name,
      description: data.description,
    });

    setProjectExist(data);

    setLabels(
      data.labels.map((label) => ({
        id: label.id,
        name: label.name,
      })),
    );
  };

  useEffect(() => {
    fetchProject();
  }, []);

  const updateProjectField = (field, value) => {
    setProject((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addLabel = () => {
    setLabels((prev) => [
      ...prev,
      {
        name: "",
      },
    ]);
  };

  const removeLabel = (index) => {
    setLabels((prev) => prev.filter((_, i) => i !== index));
  };

  const updateLabel = (index, value) => {
    const updatedLabels = [...labels];

    updatedLabels[index] = {
      ...updatedLabels[index],
      name: value,
    };

    setLabels(updatedLabels);
  };

  const handleSaveProject = async () => {
    try {
      const { error: projectError } = await supabase
        .from("projects")
        .update({
          name: project.name,
          description: project.description,
        })
        .eq("id", projectId);

      if (projectError) throw projectError;

      const { data: currentLabels, error: labelsError } = await supabase
        .from("labels")
        .select("id, name")
        .eq("project_id", projectId);

      if (labelsError) throw labelsError;

      const screenIds = labels.filter((l) => l.id).map((l) => l.id);

      const labelsToDelete = currentLabels.filter(
        (dbLabel) => !screenIds.includes(dbLabel.id),
      );

      const labelsToUpdate = labels.filter((label) => label.id);

      const labelsToInsert = labels.filter(
        (label) => !label.id && label.name.trim() !== "",
      );

      if (labelsToDelete.length > 0) {
        const { error } = await supabase
          .from("labels")
          .delete()
          .in(
            "id",
            labelsToDelete.map((l) => l.id),
          );

        if (error) throw error;
      }

      for (const label of labelsToUpdate) {
        const original = currentLabels.find((l) => l.id === label.id);

        if (original && original.name !== label.name) {
          const { error } = await supabase
            .from("labels")
            .update({
              name: label.name,
            })
            .eq("id", label.id);

          if (error) throw error;
        }
      }

      if (labelsToInsert.length > 0) {
        const { error } = await supabase.from("labels").insert(
          labelsToInsert.map((label) => ({
            project_id: projectId,
            name: label.name,
          })),
        );

        if (error) throw error;
      }

      alert("Projeto atualizado com sucesso!");

      router.push(`/professor/projetos/${projectId}`);
    } catch (error) {
      console.log(error);
      alert("Erro ao salvar projeto.");
    }
  };

  const getStepClass = (stepNumber) => {
    if (stepNumber === currentStep)
      return "edit-project-step-indicator edit-project-step-indicator-current";

    if (stepNumber < currentStep)
      return "edit-project-step-indicator edit-project-step-indicator-complete";

    return "edit-project-step-indicator edit-project-step-indicator-future";
  };

  if (!projectExist) {
    return (
      <div className="edit-project">
        <header className="edit-project-header">
          <button
            type="button"
            onClick={() => router.back()}
            className="back-button"
          >
            <ArrowLeft />
          </button>

          <span className="edit-project-header-title">
            Projeto não encontrado
          </span>
        </header>

        <main className="edit-project-content">
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

  return (
    <div className="edit-project">
      <header className="edit-project-header">
        <div className="edit-project-header-left">
          <button
            type="button"
            onClick={() => router.back()}
            className="back-button"
          >
            <ArrowLeft />
          </button>

          <div className="edit-project-project-info">
            <div className="edit-project-project-icon">
              <GraduationCap />
            </div>

            <span className="edit-project-header-title">Editar Projeto</span>
          </div>
        </div>

        <div className="edit-project-steps-indicator">
          {[1, 2].map((step) => (
            <div key={step} className={getStepClass(step)}>
              {step}
            </div>
          ))}
        </div>
      </header>

      <main className="edit-project-content">
        {currentStep === 1 && (
          <div className="edit-project-section">
            <div className="edit-project-section-header">
              <h1 className="edit-project-section-title">
                Informações do Projeto
              </h1>

              <p className="edit-project-section-description">
                Atualize o nome e a descrição do projeto
              </p>
            </div>

            <div className="edit-project-fields">
              <div className="group-field">
                <label className="label-field">Nome do projeto</label>

                <input
                  type="text"
                  value={project.name}
                  onChange={(e) => updateProjectField("name", e.target.value)}
                  className="input-field input-field-high"
                />
              </div>

              <div className="group-field">
                <label className="label-field">Descrição</label>

                <textarea
                  value={project.description}
                  onChange={(e) =>
                    updateProjectField("description", e.target.value)
                  }
                  rows={4}
                  className="edit-project-textarea-field"
                />
              </div>
            </div>

            <div className="edit-project-navigation-right">
              <button
                onClick={() => setCurrentStep(2)}
                className="button primary-button"
              >
                Próximo
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="edit-project-section">
            <div className="edit-project-section-header">
              <h1 className="edit-project-section-title">Rótulos</h1>

              <p className="edit-project-section-description">
                Atualize os rótulos disponíveis
              </p>
            </div>

            <div className="edit-project-creation-labels-list">
              {labels.map((label, index) => (
                <div
                  key={label.id || index}
                  className="edit-project-creation-label-item"
                >
                  <div className="edit-project-label-item-icon">
                    <Tags />
                  </div>

                  <input
                    placeholder={`Rótulo ${index + 1}`}
                    value={label.name}
                    onChange={(event) => updateLabel(index, event.target.value)}
                    className="input-field high-input-field"
                  />

                  {labels.length > 1 && (
                    <button
                      onClick={() => removeLabel(index)}
                      className="edit-project-button-remove-label"
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

            <div className="edit-project-navigation">
              <button
                onClick={() => setCurrentStep(1)}
                className="button secondary-button"
              >
                Voltar
              </button>

              <button
                onClick={handleSaveProject}
                className="button primary-button"
              >
                <Save size={16} />
                Salvar Alterações
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default EditProject;
