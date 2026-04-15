"use client";

import { createClient } from "@/lib/supabase/client";
import {
  ArrowRight,
  BookOpen,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  Mail,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import "./styles.css";
import "../login/styles.css";

const Register = () => {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [userType, setUserType] = useState("student");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const supabase = createClient();

  const onSubmitForm = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.passwordConfirmation) {
      alert("Senhas não conferem!");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    const user = data.user;

    const { error: profileError } = await supabase.from("profiles").insert({
      id: user.id,
      full_name: formData.fullName,
      role: userType,
      email: formData.email,
    });

    if (profileError) {
      alert("Erro ao salvar cadastro: " + profileError.message);
      return;
    }

    alert("Conta criada com sucesso!");
  };

  const updateField = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  return (
    <>
      <div className="page">
        <div className="decorative-side">
          <div className="standard-backgroud" />
          <div className="decorative-content">
            <div className="decorative-icon">
              <Users />
            </div>
            <h2 className="decorative-title">Junte-se à Comunidade</h2>
            <p className="decorative-description">
              Milhares de professores e alunos já estão usando o Label4Learn
              para criar datasets de qualidade para projetos de IA.
            </p>
          </div>
        </div>

        <div className="form-side">
          <div className="form-content">
            <Link href="/" className="logo">
              <div className="logo-icon">
                <GraduationCap />
              </div>
              <span className="logo-text">
                Label<span className="logo-highlight">4Learn</span>
              </span>
            </Link>

            <div className="header">
              <h2 className="title">Criar sua Conta</h2>
              <p className="subtitle">
                Comece a criar e participar de projetos gratuitamente
              </p>
            </div>

            <div className="user-type-selection">
              <button
                type="button"
                onClick={() => setUserType("student")}
                className={`user-type-option ${userType === "student" ? "selected" : ""}`}
              >
                <BookOpen />
                <span>Aluno</span>
              </button>
              <button
                type="button"
                onClick={() => setUserType("teacher")}
                className={`user-type-option ${userType === "teacher" ? "selected" : ""}`}
              >
                <GraduationCap />
                <span>Professor</span>
              </button>
            </div>

            <form onSubmit={onSubmitForm} className="form">
              <div className="group-field">
                <label htmlFor="fullName" className="label-field">
                  Nome Completo
                </label>
                <div className="field-with-icon">
                  <User className="icon-field" />
                  <input
                    id="fullName"
                    type="text"
                    placeholder="Seu nome"
                    value={formData.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                    className="input-field input-field-with-icon high-input-field"
                  />
                </div>
              </div>

              <div className="group-field">
                <label htmlFor="email" className="label-field">
                  E-mail institucional
                </label>
                <div className="field-with-icon">
                  <Mail className="icon-field" />
                  <input
                    id="email"
                    type="email"
                    placeholder="seu@universidade.edu.br"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="input-field input-field-with-icon high-input-field"
                  />
                </div>
              </div>

              <div className="group-field">
                <label htmlFor="password" className="label-field">
                  Senha
                </label>
                <div className="field-with-icon">
                  <Lock className="icon-field" />
                  <input
                    id="password"
                    type={visiblePassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => updateField("password", e.target.value)}
                    className="input-password input-field input-field-with-icon high-input-field"
                  />
                  <button
                    type="button"
                    onClick={() => setVisiblePassword(!visiblePassword)}
                    className="password-visibility-button"
                  >
                    {visiblePassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              <div className="group-field">
                <label htmlFor="passwordConfirmation" className="label-field">
                  Confirmar senha
                </label>
                <div className="field-with-icon">
                  <Lock className="icon-field" />
                  <input
                    id="passwordConfirmation"
                    type="password"
                    placeholder="••••••••"
                    value={formData.passwordConfirmation}
                    onChange={(e) =>
                      updateField("passwordConfirmation", e.target.value)
                    }
                    className="input-field input-field-with-icon high-input-field"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="button primary-button big-button large-button"
              >
                Criar Conta
                <ArrowRight size={16} />
              </button>
            </form>

            <p className="terms">
              Ao criar uma conta, você concorda com nossos{" "}
              <a href="#">Termos de Uso</a> e{" "}
              <a href="#">Política de Privacidade</a>.
            </p>

            <p className="login-link">
              Já tem uma conta? <Link href="/login">Entrar</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
