"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    identifier: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const update = (
    key: keyof typeof form,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    if (form.password !== form.confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message || "Impossible de créer le compte."
        );
        return;
      }

      window.location.href = "/espace-client";
    } catch {
      setMessage("Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="client-page client-register-page">
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
            Rejoignez votre
            <br />
            <strong>espace client.</strong>
          </h1>

          <p>
            Créez votre compte pour retrouver vos démarches,
            vos demandes et vos services au même endroit.
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
            INSCRIPTION
          </div>

          <h2>Créer un compte</h2>

          <p className="client-form__intro">
            Créez votre espace client SRM pour accéder à vos services.
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="identifier">
              Identifiant client
            </label>

            <input
              id="identifier"
              type="text"
              value={form.identifier}
              onChange={(event) =>
                update("identifier", event.target.value)
              }
              placeholder="Votre identifiant"
              autoComplete="username"
              required
            />

            <label htmlFor="fullName">
              Nom complet
            </label>

            <input
              id="fullName"
              type="text"
              value={form.fullName}
              onChange={(event) =>
                update("fullName", event.target.value)
              }
              placeholder="Nom et prénom"
              required
            />

            <label htmlFor="email">
              Adresse e-mail
            </label>

            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(event) =>
                update("email", event.target.value)
              }
              placeholder="votre@email.com"
              autoComplete="email"
              required
            />

            <label htmlFor="phone">
              Téléphone
            </label>

            <input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(event) =>
                update("phone", event.target.value)
              }
              placeholder="06 XX XX XX XX"
              autoComplete="tel"
            />

            <label htmlFor="address">
              Adresse
            </label>

            <input
              id="address"
              type="text"
              value={form.address}
              onChange={(event) =>
                update("address", event.target.value)
              }
              placeholder="Votre adresse"
              autoComplete="street-address"
            />

            <label htmlFor="password">
              Mot de passe
            </label>

            <input
              id="password"
              type="password"
              value={form.password}
              onChange={(event) =>
                update("password", event.target.value)
              }
              placeholder="Minimum 8 caractères"
              autoComplete="new-password"
              minLength={8}
              required
            />

            <label htmlFor="confirmPassword">
              Confirmer le mot de passe
            </label>

            <input
              id="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={(event) =>
                update(
                  "confirmPassword",
                  event.target.value
                )
              }
              placeholder="Répétez le mot de passe"
              autoComplete="new-password"
              minLength={8}
              required
            />

            <button
              type="submit"
              className="client-form__submit"
              disabled={loading}
            >
              {loading
                ? "Création..."
                : "Créer mon compte"}

              {!loading && <span>→</span>}
            </button>
          </form>

          {message && (
            <p
              style={{
                marginTop: "18px",
                color: "#b42318",
                fontSize: "13px",
                lineHeight: 1.6,
              }}
            >
              {message}
            </p>
          )}

          <div className="client-form__help">
            <span>Vous avez déjà un compte ?</span>

            <Link href="/espace-client">
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

