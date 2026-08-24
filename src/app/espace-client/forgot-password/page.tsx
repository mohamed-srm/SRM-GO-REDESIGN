"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [identifier, setIdentifier] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Une erreur est survenue.");
        return;
      }

      setMessage(data.message || "Demande envoyée.");
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
            Récupérez votre
            <br />
            <strong>accès.</strong>
          </h1>

          <p>
            Utilisez votre adresse e-mail pour recevoir les
            instructions nécessaires à la récupération de votre compte.
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
            RÉCUPÉRATION
          </div>

          <h2>Mot de passe oublié ?</h2>

          <p className="client-form__intro">
            Saisissez votre adresse e-mail pour continuer.
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="identifier">
              Identifiant
            </label>

            <input
              id="identifier"
              type="text"
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
              placeholder="Votre identifiant"
              autoComplete="username"
              required
            />

            <button
              type="submit"
              className="client-form__submit"
            >
              Continuer
              <span>→</span>
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

          <div className="client-form__help">
            <span>Besoin d'aide ?</span>

            <a href="tel:0800002026">
              08 00 00 20 26
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}