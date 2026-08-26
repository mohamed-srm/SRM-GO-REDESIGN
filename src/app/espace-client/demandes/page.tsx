"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

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

const translations = {
  fr: {
    client: "ESPACE CLIENT",
    title: "Mes demandes.",
    intro: "Retrouvez ici le suivi de vos demandes auprès de la SRM.",
    back: "← Retour au dashboard",
    close: "Fermer",
    newRequest: "Nouvelle demande",
    newEyebrow: "NOUVELLE DEMANDE",
    choose: "Quelle demande souhaitez-vous effectuer ?",
    documents: "Pièces à fournir :",
    extra: "Informations complémentaires",
    extraPlaceholder: "Ajoutez les informations utiles à votre demande...",
    attachments: "Pièces justificatives",
    formats: "PDF, JPG ou PNG · 10 Mo maximum par fichier.",
    sendingFiles: "Envoi des documents...",
    creating: "Création...",
    send: "Envoyer la demande",
    success: "Votre demande et vos documents ont été envoyés avec succès.",
    loading: "Chargement...",
    loadingText: "Nous récupérons vos demandes.",
    errorTitle: "Une erreur est survenue",
    empty: "Aucune demande",
    emptyText: "Vous n’avez encore aucune demande enregistrée dans votre espace.",
    request: "DEMANDE",
    attachmentsLabel: "PIÈCES JOINTES",
    open: "Ouvrir →",
    reference: "RÉFÉRENCE",
    created: "DATE DE CRÉATION",
    typeError: "Format non autorisé",
    sizeError: "dépasse 10 Mo.",
    missingId: "La demande a été créée mais son identifiant est introuvable.",
    serverError: "Une erreur est survenue.",
    noContact: "Impossible de contacter le serveur.",
    uploadError: "Impossible d'envoyer",
  },
  ar: {
    client: "فضاء الزبون",
    title: "طلباتي.",
    intro: "تتبعوا هنا طلباتكم لدى الشركة الجهوية متعددة الخدمات.",
    back: "← العودة إلى لوحة التحكم",
    close: "إغلاق",
    newRequest: "طلب جديد",
    newEyebrow: "طلب جديد",
    choose: "ما هو الطلب الذي ترغبون في تقديمه؟",
    documents: "الوثائق المطلوبة:",
    extra: "معلومات إضافية",
    extraPlaceholder: "أضيفوا المعلومات المفيدة لطلبكم...",
    attachments: "الوثائق الداعمة",
    formats: "PDF أو JPG أو PNG · 10 ميغابايت كحد أقصى لكل ملف.",
    sendingFiles: "جارٍ إرسال الوثائق...",
    creating: "جارٍ الإنشاء...",
    send: "إرسال الطلب",
    success: "تم إرسال طلبكم ووثائقكم بنجاح.",
    loading: "جارٍ التحميل...",
    loadingText: "نسترجع طلباتكم.",
    errorTitle: "حدث خطأ",
    empty: "لا توجد طلبات",
    emptyText: "ليس لديكم أي طلب مسجل في فضائكم بعد.",
    request: "الطلب",
    attachmentsLabel: "الوثائق المرفقة",
    open: "فتح ←",
    reference: "المرجع",
    created: "تاريخ الإنشاء",
    typeError: "الصيغة غير مسموح بها",
    sizeError: "يتجاوز 10 ميغابايت.",
    missingId: "تم إنشاء الطلب لكن معرّفه غير متوفر.",
    serverError: "حدث خطأ.",
    noContact: "تعذر الاتصال بالخادم.",
    uploadError: "تعذر إرسال",
  },
  ber: {
    client: "ⴰⵙⵏⵓⵔⴰⵢ",
    title: "ⵉⵙⵏⴰⵙⵏ ⵏⵏⴽ.",
    intro: "ⵙⵙⵏ ⴷⴰ ⵉⵙⵏⴰⵙⵏ ⵏⵏⴽ ⵙⵔ ⵙⵔⵎ.",
    back: "← ⵓⵔⴰⵔ ⵙ ⵍⵓⵃⴰ",
    close: "ⵎⵎⵏ",
    newRequest: "ⵉⵙⵏⴰⵙ ⴰⵎⴰⵢⵏⵓ",
    newEyebrow: "ⵉⵙⵏⴰⵙ ⴰⵎⴰⵢⵏⵓ",
    choose: "ⵎⴰ ⵜⵙⵙⵏⴷ ⴰⴷ ⵜⵙⵙⵏⴷ?",
    documents: "ⵉⵙⴽⴽⴰ ⵏ ⵓⵙⵏⵓⵔⴰⵢ:",
    extra: "ⵉⵎⵙⵙⵏ ⵉⵎⵙⵙⵉ",
    extraPlaceholder: "ⴰⵔⴰ ⵉⵎⵙⵙⵏ ⵏ ⵓⵙⵏⵓⵔⴰⵢ...",
    attachments: "ⵉⵎⴰⵙⵙⴰ",
    formats: "PDF, JPG ⵏⵉⵖ PNG · 10 Mo ⵎⴰⵣⵉⵖ ⵏ ⵢⴰⵏ ⵓⴼⴰⵢⵍ.",
    sendingFiles: "ⴰⵣⵏ ⵏ ⵉⵎⴰⵙⵙⴰ...",
    creating: "ⵉⵜⵜⵡⴰⵙⵏⵓⵔⴰⵢ...",
    send: "ⴰⵣⵏ ⵉⵙⵏⴰⵙ",
    success: "ⵉⵜⵜⵓⵣⵏ ⵉⵙⵏⴰⵙ ⴷ ⵉⵎⴰⵙⵙⴰ ⵙ ⵓⵙⵏⴼⵍ.",
    loading: "ⵉⵜⵜⵡⴰⵙⵙⵏ...",
    loadingText: "ⵏⵙⵙⵏ ⵉⵙⵏⴰⵙⵏ ⵏⵏⴽ.",
    errorTitle: "ⵉⵎⴰⵏ ⵉⵎⵎⵓⵜⵏ",
    empty: "ⵓⵔ ⵖⵓⵔⴽ ⵉⵙⵏⴰⵙⵏ",
    emptyText: "ⵓⵔ ⵖⵓⵔⴽ ⵢⴰⵏ ⵉⵙⵏⴰⵙ ⵎⵙⵙⵏ.",
    request: "ⵉⵙⵏⴰⵙ",
    attachmentsLabel: "ⵉⵎⴰⵙⵙⴰ",
    open: "ⵔⵥ →",
    reference: "ⴰⵙⵏⴼⵍ",
    created: "ⴰⵣⵎⵣ ⵏ ⵓⵙⵏⵓⵔⴰⵢ",
    typeError: "ⵜⵉⵙⵏⵓⵔⴰⵢ ⵓⵔ ⵜⵜⵡⴰⵔⵔⴰ",
    sizeError: "ⵜⴰⴼⴰⵢⵜ ⵜⵣⵣⵔ 10 Mo.",
    missingId: "ⵉⵜⵜⵡⴰⵙⵏⵓⵔⴰⵢ ⵉⵙⵏⴰⵙ ⵎⴰⵛⴰ ⵓⵔ ⵉⵍⵉ ⵓⵎⵎⴰⵍ.",
    serverError: "ⵉⵎⴰⵏ ⵉⵎⵎⵓⵜⵏ.",
    noContact: "ⵓⵔ ⵉⵎⴽ ⴰⴷ ⵏⵙⵙⵏ ⴷ ⵓⵙⵏⵓⵔ.",
    uploadError: "ⵓⵔ ⵉⵎⴽ ⴰⴷ ⵏⴰⵣⵏ",
  },
} as const;

export default function DemandesPage() {
  const { language } = useLanguage();
  const t = translations[language];

  const [demandes, setDemandes] = useState<Demande[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [requestType, setRequestType] = useState<RequestType>("neuf");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const selectedType =
    requestTypes.find((item) => item.id === requestType) ??
    requestTypes[0];

  const localizedType =
    language === "ar"
      ? {
          label:
            requestType === "neuf"
              ? "ربط جديد"
              : requestType === "provisoire"
                ? "ربط مؤقت"
                : "إضافة عداد",
          title:
            requestType === "neuf"
              ? "طلب ربط جديد"
              : requestType === "provisoire"
                ? "طلب ربط مؤقت"
                : "إضافة عداد جديد",
          intro:
            requestType === "neuf"
              ? "بالنسبة لطلب ربط جديد بالماء والتطهير السائل والكهرباء، يرجى التوجه إلى وكالات SRM-GO مصحوبين بالوثائق التالية:"
              : requestType === "provisoire"
                ? "بالنسبة لطلب ربط مؤقت، يرجى التوجه إلى وكالات SRM-GO مصحوبين بالوثائق التالية:"
                : "بالنسبة لإضافة عداد جديد، يرجى الإدلاء بالوثائق التالية:",
          documents:
            requestType === "neuf"
              ? [
                  "استمارة طلب الربط مملوءة.",
                  "نسخة من بطاقة التعريف الوطنية أو بطاقة الإقامة أو جواز السفر للأشخاص الذاتيين.",
                  "نسخة من النظام الأساسي ومستخرج السجل التجاري وICE وبطاقة تعريف المسير للأشخاص المعنويين.",
                  "نسخة من سند الملكية أو أي وثيقة تثبت الملكية.",
                  "نسخة من تصاميم البناء المصادق عليها.",
                  "نسخة من رخصة البناء.",
                  "نسخة من الترخيص الخاص الصادر عن السلطة المختصة عند عدم توفر رخصة البناء والتصاميم.",
                ]
              : requestType === "provisoire"
                ? [
                    "طلب ربط مؤقت يحدد طبيعة الأشغال والعنوان ومدة الربط.",
                    "ترخيص المالك موقع ومصادق عليه.",
                    "نسخة من بطاقة التعريف الوطنية.",
                    "نسخة مصادق عليها من عقد الملكية.",
                  ]
                : [
                    "نسخة من بطاقة التعريف الوطنية.",
                    "نسخة من سند الملكية.",
                    "نسخة من التصاميم التعديلية المصادق عليها.",
                    "وصل أداء التقدير الأولي.",
                  ],
        }
      : language === "ber"
        ? {
            label:
              requestType === "neuf"
                ? "ⴰⵙⵏⵓⵔⴰⵢ ⴰⵎⴰⵢⵏⵓ"
                : requestType === "provisoire"
                  ? "ⴰⵙⵏⵓⵔⴰⵢ ⵓⵎⵉⵣ"
                  : "ⴰⵔⴰⵎ ⵏ ⵓⵎⴰⵣⵉⵔ",
            title: selectedType.title,
            intro: selectedType.intro,
            documents: selectedType.documents,
          }
        : {
            label: selectedType.label,
            title: selectedType.title,
            intro: selectedType.intro,
            documents: selectedType.documents,
          };

  const loadDemandes = async () => {
    try {
      const response = await fetch("/api/demandes");
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || t.noContact);
        return;
      }

      setDemandes(data.demandes || []);
    } catch {
      setError(t.noContact);
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
        errors.push(`"${file.name}" ${t.sizeError}`);
        continue;
      }

      if (
        !["application/pdf", "image/jpeg", "image/png"].includes(
          file.type
        )
      ) {
        errors.push(`${t.typeError} : "${file.name}".`);
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
        setError(data.message || t.serverError);
        return;
      }

      const demandeId = data.demande?.id;

      if (!demandeId) {
        setError(t.missingId);
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

          const uploadText = await uploadResponse.text();
          let uploadData: { message?: string } = {};

          try {
            uploadData = uploadText ? JSON.parse(uploadText) : {};
          } catch {
            uploadData = {};
          }

          if (!uploadResponse.ok) {
            throw new Error(
              uploadData.message ||
                `${t.uploadError} ${file.name}.`
            );
          }
        }
      }

      setSuccess(t.success);
      setDescription("");
      setFiles([]);
      setShowForm(false);

      await loadDemandes();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : t.serverError
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
          {showForm ? t.close : t.newRequest}
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
            {t.newEyebrow}
          </span>

          <h2
            style={{
              margin: "0 0 24px",
              color: "var(--navy)",
              fontSize: "30px",
            }}
          >
            {t.choose}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
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
                  {language === "ar"
                    ? item.id === "neuf"
                      ? "ربط جديد"
                      : item.id === "provisoire"
                        ? "ربط مؤقت"
                        : "إضافة عداد"
                    : language === "ber"
                      ? item.id === "neuf"
                        ? "ⴰⵙⵏⵓⵔⴰⵢ ⴰⵎⴰⵢⵏⵓ"
                        : item.id === "provisoire"
                          ? "ⴰⵙⵏⵓⵔⴰⵢ ⵓⵎⵉⵣ"
                          : "ⴰⵔⴰⵎ ⵏ ⵓⵎⴰⵣⵉⵔ"
                      : item.label}
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
              {localizedType.title}
            </h3>

            <p
              style={{
                margin: "0 0 18px",
                color: "var(--muted)",
                fontSize: "13px",
                lineHeight: 1.7,
              }}
            >
              {localizedType.intro}
            </p>

            <strong
              style={{
                display: "block",
                marginBottom: "10px",
                color: "var(--navy)",
                fontSize: "12px",
              }}
            >
              {t.documents}
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
              {localizedType.documents.map(
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
              {t.extra}
            </label>

            <textarea
              id="description"
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              placeholder={t.extraPlaceholder}
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
                {t.attachments}
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
                {t.formats}
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
                ? t.sendingFiles
                : submitting
                  ? t.creating
                  : t.send}

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

        {!loading && !error && demandes.length === 0 && (
          <section className="dashboard-grid">
            <div className="dashboard-card dashboard-card--blue">
              <span className="dashboard-card__number">01</span>
              <h2>{t.empty}</h2>
              <p>{t.emptyText}</p>
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
                    {t.request}
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
                        {t.attachmentsLabel}
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

                            <strong
                              style={{
                                color: "var(--blue)",
                              }}
                            >
                              {t.open}
                            </strong>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="request-card-meta">
                  <div>
                    <span>{t.reference}</span>
                    <strong>{demande.reference}</strong>
                  </div>

                  <div>
                    <span>{t.created}</span>
                    <strong>
                      {new Date(
                        demande.createdAt
                      ).toLocaleDateString(
                        language === "ar"
                          ? "ar-MA"
                          : language === "ber"
                            ? "fr-FR"
                            : "fr-FR"
                      )}
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
