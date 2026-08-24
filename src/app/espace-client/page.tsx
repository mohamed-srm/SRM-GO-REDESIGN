"use client";

import Link from "next/link";
import { useState } from "react";

export default function EspaceClientPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
    ) => {
    event.preventDefault();

    const response = await fetch("/api/login", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        identifier,
        password,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        alert(data.message || "Erreur de connexion.");
        return;
    }

    window.location.href = "/espace-client/dashboard";
    };

  return (
    <main className="client-page">
      <div className="client-page__visual">
        <div className="client-page__brand">
          <Link href="/">
            <img src="/logo-srm.png" alt="SRM Guelmim Oued Noun" />
          </Link>
        </div>

        <div className="client-page__visual-content">
          <span>ESPACE CLIENT</span>

          <h1>
            Vos services,
            <br />
            <strong>au même endroit.</strong>
          </h1>

          <p>
            Accédez à votre espace personnel pour retrouver vos démarches et
            services.
          </p>
        </div>
      </div>

      <div className="client-page__form-area">
        <Link href="/" className="client-page__back">
          ← Retour au site
        </Link>

        <div className="client-form">
          <div className="client-form__eyebrow">CONNEXION</div>

          <h2>Bienvenue</h2>

          <p className="client-form__intro">
            Connectez-vous à votre Espace Client.
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

            <label htmlFor="password">
              Mot de passe
            </label>

            <div className="client-password">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Votre mot de passe"
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={
                  showPassword
                    ? "Masquer le mot de passe"
                    : "Afficher le mot de passe"
                }
              >
                {showPassword ? "Masquer" : "Afficher"}
              </button>
            </div>

            <div className="client-form__options">
                <Link href="/espace-client/forgot-password">
                    Mot de passe oublié ?
                </Link>
             </div>

            <button type="submit" className="client-form__submit">
              Se connecter
              <span>→</span>
            </button>
          </form>

          <div className="client-form__help">
            <span>Besoin d'aide ?</span>
            <a href="tel:0800002026">08 00 00 20 26</a>
          </div>
        </div>
      </div>
    </main>
  );
}