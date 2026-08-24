"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Demande = {
  id: number;
  title: string;
  description: string;
  status: string;
  reference: string;
  createdAt: string;
};

export default function DemandesPage() {
  const [demandes, setDemandes] = useState<Demande[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const loadDemandes = async () => {
    try {
      const response = await fetch("/api/demandes");
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Impossible de charger vos demandes.");
        return;
      }

      setDemandes(data.demandes || []);
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDemandes();
  }, []);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/demandes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Impossible de créer la demande.");
        return;
      }

      setSuccess("Votre demande a été créée avec succès.");
      setTitle("");
      setDescription("");
      setShowForm(false);
      await loadDemandes();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <span className="dashboard-label">ESPACE CLIENT</span>
          <h1>Mes demandes.</h1>
          <p>
            Retrouvez ici le suivi de vos demandes auprès de la SRM.
          </p>
        </div>

        <Link
          href="/espace-client/dashboard"
          className="dashboard-back"
        >
          ← Retour au dashboard
        </Link>
      </div>

      <div
        style={{
          width: "min(1180px, calc(100% - 64px))",
          margin: "0 auto 30px",
        }}
      >
        <button
          type="button"
          className="dashboard-logout"
          onClick={() => {
            setShowForm((value) => !value);
            setError("");
            setSuccess("");
          }}
        >
          {showForm ? "Fermer" : "Nouvelle demande"}
        </button>
      </div>

      {showForm && (
        <section
          style={{
            width: "min(1180px, calc(100% - 64px))",
            margin: "0 auto 30px",
            padding: "30px",
            background: "#fff",
            border: "1px solid var(--border-light)",
            borderRadius: "10px",
          }}
        >
          <h2
            style={{
              margin: "0 0 20px",
              color: "var(--navy)",
              fontSize: "28px",
            }}
          >
            Nouvelle demande
          </h2>

          <form
            onSubmit={handleSubmit}
            style={{ display: "grid", gap: "14px" }}
          >
            <label
              htmlFor="title"
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--navy)",
              }}
            >
              Titre
            </label>

            <input
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Ex. Demande de branchement"
              required
            />

            <label
              htmlFor="description"
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--navy)",
              }}
            >
              Description
            </label>

            <textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Décrivez votre demande..."
              rows={6}
              required
            />

            <button
              type="submit"
              className="login-button"
              disabled={submitting}
            >
              {submitting ? "Création..." : "Créer la demande"}
              {!submitting && <span>→</span>}
            </button>
          </form>
        </section>
      )}

      <div
        style={{
          width: "min(1180px, calc(100% - 64px))",
          margin: "0 auto",
        }}
      >
        {success && (
          <p
            style={{
              marginBottom: "20px",
              color: "var(--blue)",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            {success}
          </p>
        )}

        {loading && (
          <section className="dashboard-grid">
            <div className="dashboard-card">
              <h2>Chargement...</h2>
              <p>Nous récupérons vos demandes.</p>
            </div>
          </section>
        )}

        {!loading && error && (
          <section className="dashboard-grid">
            <div className="dashboard-card">
              <h2>Une erreur est survenue</h2>
              <p>{error}</p>
            </div>
          </section>
        )}

        {!loading && !error && demandes.length === 0 && (
          <section className="dashboard-grid">
            <div className="dashboard-card dashboard-card--blue">
              <span className="dashboard-card__number">01</span>
              <h2>Aucune demande</h2>
              <p>
                Vous n’avez encore aucune demande enregistrée dans votre
                espace.
              </p>
            </div>
          </section>
        )}

        {!loading && !error && demandes.length > 0 && (
          <section className="dashboard-grid">
            {demandes.map((demande) => (
              <article className="request-card" key={demande.id}>
                <div className="request-card-top">
                  <div className="request-index">
                    #{String(demande.id).padStart(2, "0")}
                  </div>

                  <span
                    className={`request-status ${
                      demande.status.toLowerCase().includes("attente")
                        ? "request-status--pending"
                        : "request-status--active"
                    }`}
                  >
                    <i></i>
                    {demande.status}
                  </span>
                </div>

                <div className="request-card-body">
                  <span className="request-label">DEMANDE</span>

                  <h2>{demande.title}</h2>

                  <p>{demande.description}</p>
                </div>

                <div className="request-card-meta">
                  <div>
                    <span>RÉFÉRENCE</span>
                    <strong>{demande.reference}</strong>
                  </div>

                  <div>
                    <span>DATE DE CRÉATION</span>
                    <strong>
                      {new Date(demande.createdAt).toLocaleDateString(
                        "fr-FR"
                      )}
                    </strong>
                  </div>

                  <span className="request-card-arrow">→</span>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
