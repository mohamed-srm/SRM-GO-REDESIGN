"use client";

import Link from "next/link";
import { useState } from "react";

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (newPassword.length < 8) {
      setMessage("Le nouveau mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/profile/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Une erreur est survenue.");
        return;
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setMessage("Votre mot de passe a été modifié avec succès.");
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
            Protégez votre
            <br />
            <strong>compte.</strong>
          </h1>

          <p>
            Modifiez votre mot de passe régulièrement pour renforcer
            la sécurité de votre espace client.
          </p>
        </div>
      </div>

      <div className="client-page__form-area">
        <Link
          href="/espace-client/profil"
          className="client-page__back"
        >
          ← Retour au profil
        </Link>

        <div className="client-form">
          <div className="client-form__eyebrow">
            SÉCURITÉ
          </div>

          <h2>Modifier le mot de passe</h2>

          <p className="client-form__intro">
            Entrez votre ancien mot de passe puis choisissez le nouveau.
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="currentPassword">
              Mot de passe actuel
            </label>

            <input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(event) =>
                setCurrentPassword(event.target.value)
              }
              autoComplete="current-password"
              required
            />

            <label htmlFor="newPassword">
              Nouveau mot de passe
            </label>

            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(event) =>
                setNewPassword(event.target.value)
              }
              placeholder="Minimum 8 caractères"
              autoComplete="new-password"
              required
            />

            <label htmlFor="confirmPassword">
              Confirmer le nouveau mot de passe
            </label>

            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
              autoComplete="new-password"
              required
            />

            <button
              type="submit"
              className="client-form__submit"
              disabled={loading}
            >
              {loading ? "Modification..." : "Modifier le mot de passe"}
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
