"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

type Reclamation = {
  id: number;
  title: string;
  description: string;
  status: string;
  reference: string;
  createdAt: string;
};

const translations = {
  fr: {
    client: "ESPACE CLIENT",
    title: "Mes réclamations.",
    intro: "Consultez vos réclamations et leur suivi auprès de la SRM.",
    back: "← Retour au dashboard",
    close: "Fermer",
    new: "Nouvelle réclamation",
    object: "Objet",
    objectPlaceholder: "Ex. Problème de facture",
    description: "Description",
    descriptionPlaceholder: "Décrivez votre réclamation...",
    creating: "Création...",
    submit: "Déposer la réclamation",
    success: "Votre réclamation a été créée avec succès.",
    loading: "Chargement...",
    loadingText: "Nous récupérons vos réclamations.",
    errorTitle: "Une erreur est survenue",
    empty: "Aucune réclamation",
    emptyText:
      "Vous n’avez encore aucune réclamation enregistrée dans votre espace.",
    label: "RÉCLAMATION",
    reference: "RÉFÉRENCE",
    created: "DATE DE CRÉATION",
    serverError: "Impossible de contacter le serveur.",
    createError: "Impossible de créer la réclamation.",
  },

  ar: {
    client: "فضاء الزبون",
    title: "شكاياتي.",
    intro: "اطلعوا على شكاياتكم وتتبعوا وضعيتها لدى الشركة الجهوية متعددة الخدمات.",
    back: "← العودة إلى لوحة التحكم",
    close: "إغلاق",
    new: "شكاية جديدة",
    object: "الموضوع",
    objectPlaceholder: "مثال: مشكل في الفاتورة",
    description: "الوصف",
    descriptionPlaceholder: "صفوا شكايتكم...",
    creating: "جارٍ الإنشاء...",
    submit: "إيداع الشكاية",
    success: "تم إنشاء شكايتكم بنجاح.",
    loading: "جارٍ التحميل...",
    loadingText: "نسترجع شكاياتكم.",
    errorTitle: "حدث خطأ",
    empty: "لا توجد شكايات",
    emptyText: "ليس لديكم أي شكاية مسجلة في فضائكم بعد.",
    label: "الشكاية",
    reference: "المرجع",
    created: "تاريخ الإنشاء",
    serverError: "تعذر الاتصال بالخادم.",
    createError: "تعذر إنشاء الشكاية.",
  },

  ber: {
    client: "ⴰⵙⵏⵓⵔⴰⵢ",
    title: "ⵉⵙⵙⵓⴼⵔⵏ ⵏⵏⴽ.",
    intro: "ⵙⵙⵏ ⵉⵙⵙⵓⴼⵔⵏ ⵏⵏⴽ ⴷ ⵓⵙⵏⴼⵍ ⵏⵙⵏ ⵙⵔ ⵙⵔⵎ.",
    back: "← ⵓⵔⴰⵔ ⵙ ⵍⵓⵃⴰ",
    close: "ⵎⵎⵏ",
    new: "ⵉⵙⵙⵓⴼⵔ ⴰⵎⴰⵢⵏⵓ",
    object: "ⴰⵙⵏⴼⵍ",
    objectPlaceholder: "ⵎⴷ: ⵓⵙⵙⵉ ⵏ ⵍⴼⴰⵜⵓⵔⴰ",
    description: "ⴰⵙⵏⵓⵔⵉ",
    descriptionPlaceholder: "ⵔⵏⵓ ⴰⵙⵏⵓⵔⵉ ⵏ ⵓⵙⵙⵓⴼⵔ...",
    creating: "ⵉⵜⵜⵡⴰⵙⵏⵓⵔⴰⵢ...",
    submit: "ⴰⵣⵏ ⵉⵙⵙⵓⴼⵔ",
    success: "ⵉⵜⵜⵡⴰⵙⵏⵓⵔⴰⵢ ⵉⵙⵙⵓⴼⵔ ⵙ ⵓⵙⵏⴼⵍ.",
    loading: "ⵉⵜⵜⵡⴰⵙⵙⵏ...",
    loadingText: "ⵏⵙⵙⵏ ⵉⵙⵙⵓⴼⵔⵏ ⵏⵏⴽ.",
    errorTitle: "ⵉⵎⴰⵏ ⵉⵎⵎⵓⵜⵏ",
    empty: "ⵓⵔ ⵖⵓⵔⴽ ⵉⵙⵙⵓⴼⵔⵏ",
    emptyText: "ⵓⵔ ⵖⵓⵔⴽ ⵢⴰⵏ ⵉⵙⵙⵓⴼⵔ ⵎⵙⵙⵏ.",
    label: "ⵉⵙⵙⵓⴼⵔ",
    reference: "ⴰⵙⵏⴼⵍ",
    created: "ⴰⵣⵎⵣ ⵏ ⵓⵙⵏⵓⵔⴰⵢ",
    serverError: "ⵓⵔ ⵉⵎⴽ ⴰⴷ ⵏⵙⵙⵏ ⴷ ⵓⵙⵏⵓⵔ.",
    createError: "ⵓⵔ ⵉⵎⴽ ⴰⴷ ⵙⵏⵓⵔⴰⵢ ⵉⵙⵙⵓⴼⵔ.",
  },
} as const;

export default function ReclamationsPage() {
  const { language } = useLanguage();
  const t = translations[language];

  const [reclamations, setReclamations] = useState<Reclamation[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const loadReclamations = async () => {
    try {
      const response = await fetch("/api/reclamations");
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || t.serverError);
        return;
      }

      setReclamations(data.reclamations || []);
    } catch {
      setError(t.serverError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReclamations();
  }, []);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/reclamations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || t.createError);
        return;
      }

      setSuccess(t.success);
      setTitle("");
      setDescription("");
      setShowForm(false);

      await loadReclamations();
    } catch {
      setError(t.serverError);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <span className="dashboard-label">{t.client}</span>

          <h1>{t.title}</h1>

          <p>{t.intro}</p>
        </div>

        <Link
          href="/espace-client/dashboard"
          className="dashboard-back"
        >
          {t.back}
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
          {showForm ? t.close : t.new}
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
            {t.new}
          </h2>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "grid",
              gap: "14px",
            }}
          >
            <label
              htmlFor="reclamation-title"
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--navy)",
              }}
            >
              {t.object}
            </label>

            <input
              id="reclamation-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder={t.objectPlaceholder}
              required
            />

            <label
              htmlFor="reclamation-description"
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--navy)",
              }}
            >
              {t.description}
            </label>

            <textarea
              id="reclamation-description"
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              placeholder={t.descriptionPlaceholder}
              rows={6}
              required
            />

            <button
              type="submit"
              className="login-button"
              disabled={submitting}
            >
              {submitting ? t.creating : t.submit}
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
              <h2>{t.loading}</h2>
              <p>{t.loadingText}</p>
            </div>
          </section>
        )}

        {!loading && error && (
          <section className="dashboard-grid">
            <div className="dashboard-card">
              <h2>{t.errorTitle}</h2>
              <p>{error}</p>
            </div>
          </section>
        )}

        {!loading && !error && reclamations.length === 0 && (
          <section className="dashboard-grid">
            <div className="dashboard-card dashboard-card--blue">
              <span className="dashboard-card__number">01</span>
              <h2>{t.empty}</h2>
              <p>{t.emptyText}</p>
            </div>
          </section>
        )}

        {!loading && !error && reclamations.length > 0 && (
          <section className="dashboard-grid">
            {reclamations.map((reclamation) => (
              <article
                className="request-card"
                key={reclamation.id}
              >
                <div className="request-card-top">
                  <div className="request-index">
                    #{String(reclamation.id).padStart(2, "0")}
                  </div>

                  <span
                    className={`request-status ${
                      reclamation.status
                        .toLowerCase()
                        .includes("attente")
                        ? "request-status--pending"
                        : "request-status--active"
                    }`}
                  >
                    <i></i>
                    {reclamation.status}
                  </span>
                </div>

                <div className="request-card-body">
                  <span className="request-label">
                    {t.label}
                  </span>

                  <h2>{reclamation.title}</h2>

                  <p>{reclamation.description}</p>
                </div>

                <div className="request-card-meta">
                  <div>
                    <span>{t.reference}</span>
                    <strong>{reclamation.reference}</strong>
                  </div>

                  <div>
                    <span>{t.created}</span>
                    <strong>
                      {new Date(
                        reclamation.createdAt
                      ).toLocaleDateString(
                        language === "ar" ? "ar-MA" : "fr-FR"
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
