"use client";

import Link from "next/link";
import { useState } from "react";

export default function ResetPasswordForm({
  token,
}: {
  token: string;
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!token) {
      setMessage("Lien de récupération invalide.");
      return;
    }

    if (password.length < 8) {
      setMessage("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Une erreur est survenue.");
        return;
      }

      setMessage("Mot de passe modifié avec succès.");

      setTimeout(() => {
        window.location.href = "/espace-client";
      }, 1200);
    } catch {
      setMessage("Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="client-page">
      <div className="client-page__visual">
        <div className="client-page__brand">
          <Link href="/">
            <img
              src="/logo-srm.png"
              alt="SRM Guelmim Oued Noun"
            />
          </Link>
        </div>

        <div className="client-page__visual-content">
          <span>ESPACE CLIENT</span>

          <h1>
            Sécurisez votre
            <br />
            <strong>accès.</strong>
          </h1>

          <p>
            Choisissez un nouveau mot de passe pour sécuriser votre espace client.
          </p>
        </div>
      </div>

      <div className="client-page__form-area">
        <Link
          href="/espace-client"
          className="client-page__back"
        >
          ← Retour à la connexion
        </Link>

        <div className="client-form">
          <div className="client-form__eyebrow">
            NOUVEAU MOT DE PASSE
          </div>

          <h2>Réinitialiser</h2>

          <p className="client-form__intro">
            Entrez votre nouveau mot de passe.
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="password">
              Nouveau mot de passe
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Minimum 8 caractères"
              autoComplete="new-password"
              required
            />

            <label htmlFor="confirmPassword">
              Confirmer le mot de passe
            </label>

            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
              placeholder="Répétez le mot de passe"
              autoComplete="new-password"
              required
            />

            <button
              type="submit"
              className="client-form__submit"
              disabled={loading}
            >
              {loading ? "Traitement..." : "Modifier le mot de passe"}
              {!loading && <span>→</span>}
            </button>
          </form>

          {message && (
            <p
              style={{
                marginTop: "18px",
                color: "var(--blue)",
                fontSize: "13px",
                lineHeight: 1.6,
              }}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
