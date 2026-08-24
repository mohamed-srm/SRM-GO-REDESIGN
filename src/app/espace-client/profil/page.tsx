"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type User = {
  id: number;
  identifier: string;
  createdAt: string;
  updatedAt: string;
};

export default function ProfilPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await fetch("/api/profil");
        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Impossible de charger votre profil.");
          return;
        }

        setUser(data.user);
      } catch {
        setError("Impossible de contacter le serveur.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const createdDate = user
    ? new Date(user.createdAt).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

  const updatedDate = user
    ? new Date(user.updatedAt).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <main className="profile-page">
      <div className="profile-container">

        <div className="profile-topbar">
          <div>
            <span className="profile-eyebrow">ESPACE CLIENT</span>
            <h1>Mon profil</h1>
            <p>
              Gérez vos informations et la sécurité de votre compte.
            </p>
          </div>

          <Link
            href="/espace-client/dashboard"
            className="profile-back"
          >
            ← Retour au dashboard
          </Link>
        </div>

        {loading && (
          <div className="profile-loading">
            Chargement de votre profil...
          </div>
        )}

        {!loading && error && (
          <div className="profile-error">
            <strong>Une erreur est survenue</strong>
            <span>{error}</span>
          </div>
        )}

        {!loading && !error && user && (
          <>
            <section className="profile-hero">
              <div className="profile-avatar">
                {user.identifier.charAt(0).toUpperCase()}
              </div>

              <div className="profile-hero-content">
                <span className="profile-status">
                  <i></i>
                  COMPTE ACTIF
                </span>

                <h2>{user.identifier}</h2>

                <p>
                  Client SRM Guelmim – Oued Noun
                </p>
              </div>

              <div className="profile-id-box">
                <span>IDENTIFIANT CLIENT</span>
                <strong>#{String(user.id).padStart(5, "0")}</strong>
              </div>
            </section>

            <section className="profile-grid">

              <article className="profile-card profile-card--main">
                <div className="profile-card-head">
                  <div className="profile-card-icon blue">
                    <span>◉</span>
                  </div>

                  <div>
                    <span className="profile-card-label">
                      INFORMATIONS
                    </span>

                    <h3>Informations du compte</h3>
                  </div>
                </div>

                <div className="profile-info-list">

                  <div className="profile-info-row">
                    <div>
                      <span>Identifiant</span>
                      <strong>{user.identifier}</strong>
                    </div>
                    <span className="profile-info-badge">
                      Vérifié
                    </span>
                  </div>

                  <div className="profile-info-row">
                    <div>
                      <span>Compte créé</span>
                      <strong>{createdDate}</strong>
                    </div>
                  </div>

                  <div className="profile-info-row">
                    <div>
                      <span>Dernière mise à jour</span>
                      <strong>{updatedDate}</strong>
                    </div>
                  </div>

                </div>
              </article>

              <article className="profile-card profile-card--security">
                <div className="profile-card-head">
                  <div className="profile-card-icon green">
                    <span>✓</span>
                  </div>

                  <div>
                    <span className="profile-card-label">
                      SÉCURITÉ
                    </span>

                    <h3>Votre compte est sécurisé</h3>
                  </div>
                </div>

                <p className="profile-security-text">
                  Votre mot de passe est stocké de manière sécurisée.
                  Vous pouvez le modifier à tout moment.
                </p>

                <Link
                  href="/espace-client/profil/password"
                  className="profile-action"
                >
                  Modifier le mot de passe
                  <span>→</span>
                </Link>
              </article>

            </section>

            <section className="profile-stats">

              <div className="profile-stat">
                <span className="profile-stat-number">01</span>
                <div>
                  <strong>Compte</strong>
                  <span>Actif</span>
                </div>
              </div>

              <div className="profile-stat">
                <span className="profile-stat-number">02</span>
                <div>
                  <strong>Identifiant</strong>
                  <span>{user.identifier}</span>
                </div>
              </div>

              <div className="profile-stat">
                <span className="profile-stat-number">03</span>
                <div>
                  <strong>Depuis</strong>
                  <span>{createdDate}</span>
                </div>
              </div>

              <div className="profile-stat">
                <span className="profile-stat-number">04</span>
                <div>
                  <strong>Sécurité</strong>
                  <span>Protégée</span>
                </div>
              </div>

            </section>

            <section className="profile-help">
              <div>
                <span className="profile-help-label">
                  BESOIN D'AIDE ?
                </span>

                <h3>Notre équipe reste à votre écoute.</h3>

                <p>
                  Pour toute question concernant votre espace client,
                  contactez la SRM Guelmim – Oued Noun.
                </p>
              </div>

              <a href="tel:0800002026" className="profile-help-button">
                08 00 00 20 26
                <span>→</span>
              </a>
            </section>
          </>
        )}
      </div>
    </main>
  );
}