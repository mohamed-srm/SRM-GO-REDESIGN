"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type DemandeFile = {
  id: number;
  originalName: string;
  mimeType: string;
  size: number;
};

type Demande = {
  id: number;
  title: string;
  description: string;
  status: string;
  reference: string;
  createdAt: string;
  files: DemandeFile[];
};

type RequestType = "neuf" | "provisoire" | "compteur";

const requestTypes = [
  {
    id: "neuf" as RequestType,
    label: "Branchement Neuf",
    title: "Demande de branchement neuf",
    intro:
      "Pour toute nouvelle demande de branchement d’eau, d’assainissement liquide et d’électricité, veuillez vous présenter aux agences de la SRM-GO muni des pièces suivantes :",
    documents: [
      "Formulaire de branchement rempli.",
      "Copie de la carte d’identité (C.I.N.E, carte de séjour ou passeport pour les personnes physiques).",
      "Copie des statuts et extrait de registre de commerce, ICE et CIN du gérant pour les personnes morales.",
      "Copie de titre de propriété ou tout document justifiant la propriété.",
      "Copie des plans de construction approuvés par les autorités compétentes.",
      "Copie de l’autorisation de construction.",
      "Copie d’autorisation spéciale délivrée par l’autorité compétente si le demandeur ne dispose pas de l’autorisation de construction et des plans.",
    ],
  },
  {
    id: "provisoire" as RequestType,
    label: "Branchement Provisoire",
    title: "Demande de branchement provisoire",
    intro:
      "Pour un branchement provisoire, veuillez vous rendre aux agences de la SRM-GO muni des pièces suivantes :",
    documents: [
      "Une demande de branchement provisoire précisant la nature des travaux à effectuer, l’adresse et la durée du branchement.",
      "Autorisation du propriétaire signée et légalisée.",
      "Copie de la carte d’identité (C.I.N.E).",
      "Copie légalisée de l’acte de propriété.",
    ],
  },
  {
    id: "compteur" as RequestType,
    label: "Ajout Compteur",
    title: "Ajout d’un nouveau compteur",
    intro:
      "Pour l’ajout d’un nouveau compteur, veuillez vous munir des documents suivants :",
    documents: [
      "Copie de la carte d’identité nationale (C.I.N.E).",
      "Copie de titre de propriété.",
      "Copie des plans modificatifs approuvés.",
      "Reçu de paiement de devis initial.",
    ],
  },
];

export default function DemandesPage() {
  const [demandes, setDemandes] = useState<Demande[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [requestType, setRequestType] =
    useState<RequestType>("neuf");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const selectedType =
    requestTypes.find((item) => item.id === requestType) ??
    requestTypes[0];

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

  const selectType = (type: RequestType) => {
    setRequestType(type);
    setDescription("");
    setFiles([]);
    setError("");
    setSuccess("");
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = Array.from(event.target.files ?? []);
    const validFiles: File[] = [];
    const errors: string[] = [];

    for (const file of selectedFiles) {
      if (file.size > 10 * 1024 * 1024) {
        errors.push(`"${file.name}" dépasse 10 Mo.`);
        continue;
      }

      if (
        !["application/pdf", "image/jpeg", "image/png"].includes(
          file.type
        )
      ) {
        errors.push(`Format non autorisé : "${file.name}".`);
        continue;
      }

      validFiles.push(file);
    }

    setFiles(validFiles);
    setError(errors.join(" "));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const title = selectedType.title;

      const fullDescription = [
        `Type de demande : ${selectedType.label}`,
        "",
        description.trim(),
      ]
        .filter(Boolean)
        .join("\n");

      const response = await fetch("/api/demandes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description: fullDescription,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Impossible de créer la demande.");
        return;
      }

      const demandeId = data.demande?.id;

      if (!demandeId) {
        setError(
          "La demande a été créée mais son identifiant est introuvable."
        );
        return;
      }

      if (files.length > 0) {
        setUploading(true);

        for (const file of files) {
          const formData = new FormData();

          formData.append("demandeId", String(demandeId));
          formData.append("file", file);

          const uploadResponse = await fetch(
            "/api/demandes/upload",
            {
              method: "POST",
              body: formData,
            }
          );

          const uploadData = await uploadResponse.json();

          if (!uploadResponse.ok) {
            throw new Error(
              uploadData.message ||
                `Impossible d'envoyer ${file.name}.`
            );
          }
        }
      }

      setSuccess(
        "Votre demande et vos documents ont été envoyés avec succès."
      );
      setDescription("");
      setFiles([]);
      setShowForm(false);

      await loadDemandes();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Une erreur est survenue."
      );
    } finally {
      setSubmitting(false);
      setUploading(false);
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
          <span
            style={{
              display: "block",
              marginBottom: "8px",
              color: "var(--blue)",
              fontSize: "10px",
              fontWeight: 800,
              letterSpacing: "2px",
            }}
          >
            NOUVELLE DEMANDE
          </span>

          <h2
            style={{
              margin: "0 0 24px",
              color: "var(--navy)",
              fontSize: "30px",
            }}
          >
            Quelle demande souhaitez-vous effectuer ?
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(3, minmax(0, 1fr))",
              gap: "10px",
              marginBottom: "28px",
            }}
          >
            {requestTypes.map((item) => {
              const active = item.id === requestType;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectType(item.id)}
                  style={{
                    minHeight: "52px",
                    padding: "12px 16px",
                    border: active
                      ? "1px solid var(--green)"
                      : "1px solid var(--blue)",
                    background: active
                      ? "var(--green)"
                      : "#fff",
                    color: active
                      ? "#fff"
                      : "var(--navy)",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div
            style={{
              marginBottom: "24px",
              padding: "24px",
              background: "#f4f8fa",
              border: "1px solid var(--border-light)",
            }}
          >
            <h3
              style={{
                margin: "0 0 10px",
                color: "var(--navy)",
                fontSize: "22px",
              }}
            >
              {selectedType.title}
            </h3>

            <p
              style={{
                margin: "0 0 18px",
                color: "var(--muted)",
                fontSize: "13px",
                lineHeight: 1.7,
              }}
            >
              {selectedType.intro}
            </p>

            <strong
              style={{
                display: "block",
                marginBottom: "10px",
                color: "var(--navy)",
                fontSize: "12px",
              }}
            >
              Pièces à fournir :
            </strong>

            <ul
              style={{
                margin: 0,
                paddingLeft: "20px",
                color: "var(--muted)",
                fontSize: "13px",
                lineHeight: 1.8,
              }}
            >
              {selectedType.documents.map(
                (document, index) => (
                  <li key={index}>{document}</li>
                )
              )}
            </ul>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "grid",
              gap: "14px",
            }}
          >
            <label
              htmlFor="description"
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--navy)",
              }}
            >
              Informations complémentaires
            </label>

            <textarea
              id="description"
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              placeholder="Ajoutez les informations utiles à votre demande..."
              rows={6}
            />

            <div
              style={{
                padding: "18px",
                background: "#f8fbfc",
                border: "1px dashed #bfd0d8",
              }}
            >
              <strong
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "var(--navy)",
                  fontSize: "12px",
                }}
              >
                Pièces justificatives
              </strong>

              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
              />

              <p
                style={{
                  margin: "8px 0 0",
                  color: "var(--muted)",
                  fontSize: "11px",
                }}
              >
                PDF, JPG ou PNG · 10 Mo maximum par fichier.
              </p>

              {files.length > 0 && (
                <div style={{ marginTop: "12px" }}>
                  {files.map((file) => (
                    <div
                      key={`${file.name}-${file.size}`}
                      style={{
                        padding: "8px 10px",
                        marginBottom: "6px",
                        background: "#fff",
                        border: "1px solid var(--border-light)",
                        fontSize: "11px",
                        color: "var(--navy)",
                      }}
                    >
                      {file.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {error && (
              <p
                style={{
                  margin: 0,
                  color: "#b42318",
                  fontSize: "12px",
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              className="login-button"
              disabled={submitting || uploading}
            >
              {uploading
                ? "Envoi des documents..."
                : submitting
                  ? "Création..."
                  : "Envoyer la demande"}

              {!submitting && !uploading && (
                <span>→</span>
              )}
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
              <article
                className="request-card"
                key={demande.id}
              >
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
                  <span className="request-label">
                    DEMANDE
                  </span>

                  <h2>{demande.title}</h2>
                  <p>{demande.description}</p>
                  {demande.files?.length > 0 && (
                    <div
                      style={{
                        marginTop: "20px",
                        paddingTop: "16px",
                        borderTop: "1px solid var(--border-light)",
                      }}
                    >
                      <span
                        style={{
                          display: "block",
                          marginBottom: "10px",
                          color: "var(--navy)",
                          fontSize: "10px",
                          fontWeight: 800,
                          letterSpacing: "1.5px",
                        }}
                      >
                        PIÈCES JOINTES
                      </span>

                      <div
                        style={{
                          display: "grid",
                          gap: "8px",
                        }}
                      >
                        {demande.files.map((file) => (
                          <a
                            key={file.id}
                            href={`/api/demandes/files/${file.id}`}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: "12px",
                              padding: "10px 12px",
                              background: "#f8fbfc",
                              border: "1px solid var(--border-light)",
                              color: "var(--navy)",
                              fontSize: "11px",
                              textDecoration: "none",
                            }}
                          >
                            <span
                              style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              📄 {file.originalName}
                            </span>

                            <strong style={{ color: "var(--blue)" }}>
                              Ouvrir →
                            </strong>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="request-card-meta">
                  <div>
                    <span>RÉFÉRENCE</span>
                    <strong>{demande.reference}</strong>
                  </div>

                  <div>
                    <span>DATE DE CRÉATION</span>
                    <strong>
                      {new Date(
                        demande.createdAt
                      ).toLocaleDateString("fr-FR")}
                    </strong>
                  </div>

                  <span className="request-card-arrow">
                    →
                  </span>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

