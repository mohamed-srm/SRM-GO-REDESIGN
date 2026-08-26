"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

type User = {
  id: number;
  identifier: string;
  createdAt: string;
  updatedAt: string;
};

const translations = {
  fr: {
    client: "ESPACE CLIENT",
    title: "Mon profil",
    intro: "Gérez vos informations et la sécurité de votre compte.",
    back: "← Retour au dashboard",
    loading: "Chargement de votre profil...",
    errorTitle: "Une erreur est survenue",
    active: "COMPTE ACTIF",
    clientLabel: "Client SRM Guelmim – Oued Noun",
    clientId: "IDENTIFIANT CLIENT",
    infoLabel: "INFORMATIONS",
    infoTitle: "Informations du compte",
    identifier: "Identifiant",
    verified: "Vérifié",
    created: "Compte créé",
    updated: "Dernière mise à jour",
    security: "SÉCURITÉ",
    secureTitle: "Votre compte est sécurisé",
    secureText:
      "Votre mot de passe est stocké de manière sécurisée. Vous pouvez le modifier à tout moment.",
    changePassword: "Modifier le mot de passe",
    account: "Compte",
    activeValue: "Actif",
    since: "Depuis",
    securityValue: "Sécurité",
    protected: "Protégée",
    help: "BESOIN D'AIDE ?",
    helpTitle: "Notre équipe reste à votre écoute.",
    helpText:
      "Pour toute question concernant votre espace client, contactez la SRM Guelmim – Oued Noun.",
  },
  ar: {
    client: "فضاء الزبون",
    title: "ملفي الشخصي",
    intro: "دبّروا معلوماتكم وإعدادات أمان حسابكم.",
    back: "← العودة إلى لوحة التحكم",
    loading: "جارٍ تحميل ملفكم الشخصي...",
    errorTitle: "حدث خطأ",
    active: "الحساب نشط",
    clientLabel: "زبون الشركة الجهوية متعددة الخدمات كلميم واد نون",
    clientId: "معرّف الزبون",
    infoLabel: "المعلومات",
    infoTitle: "معلومات الحساب",
    identifier: "المعرّف",
    verified: "موثّق",
    created: "تاريخ إنشاء الحساب",
    updated: "آخر تحديث",
    security: "الأمان",
    secureTitle: "حسابكم مؤمّن",
    secureText:
      "يتم تخزين كلمة المرور الخاصة بكم بشكل آمن، ويمكنكم تغييرها في أي وقت.",
    changePassword: "تغيير كلمة المرور",
    account: "الحساب",
    activeValue: "نشط",
    since: "منذ",
    securityValue: "الأمان",
    protected: "محمي",
    help: "تحتاجون إلى المساعدة؟",
    helpTitle: "فريقنا رهن إشارتكم.",
    helpText:
      "لأي سؤال متعلق بفضاء الزبون، تواصلوا مع الشركة الجهوية متعددة الخدمات كلميم واد نون.",
  },
  ber: {
    client: "ⴰⵙⵏⵓⵔⴰⵢ",
    title: "ⴰⵙⵏⴰⵙ ⵉⵎⴰⵏ",
    intro: "ⵙⵙⵏ ⵉⵎⵙⵙⵏ ⴷ ⵜⵉⵙⵙⴰⵙ ⵏ ⵓⵎⴰⵏ ⵏⵏⴽ.",
    back: "← ⵓⵔⴰⵔ ⵙ ⵍⵓⵃⴰ",
    loading: "ⵉⵜⵜⵡⴰⵙⵙⵏ ⵓⵙⵏⴰⵙ...",
    errorTitle: "ⵉⵎⴰⵏ ⵉⵎⵎⵓⵜⵏ",
    active: "ⴰⵙⵏⵓⵔⴰⵢ ⵉⵙⵙⵏ",
    clientLabel: "ⴰⵎⵙⵙⵔⵙ ⵏ SRM ⴳⵯⵍⵎⵉⵎ – ⵡⴰⴷ ⵏ ⵏⵓⵏ",
    clientId: "ⴰⵎⵎⴰⵍ ⵏ ⵓⵙⴰⵎⵓ",
    infoLabel: "ⵉⵎⵙⵙⵏ",
    infoTitle: "ⵉⵎⵙⵙⵏ ⵏ ⵓⵙⵏⵓⵔⴰⵢ",
    identifier: "ⴰⵎⵎⴰⵍ",
    verified: "ⵉⵜⵜⵡⴰⵙⵙⵏ",
    created: "ⴰⵙⵏⵓⵔⴰⵢ ⵉⵜⵜⵡⴰⵙⵙⵏ",
    updated: "ⵉⵙⵏⴼⵍ ⴰⵎⵎⴰⵢ",
    security: "ⵜⵉⵙⵙⴰⵙ",
    secureTitle: "ⴰⵙⵏⵓⵔⴰⵢ ⵏⵏⴽ ⵉⵜⵜⵡⴰⵙⵙⵏ",
    secureText:
      "ⵜⴰⵔⵔⴰⵙⵜ ⵏⵏⴽ ⵜⵜⵡⴰⵙⵙⵏ ⵙ ⵓⵎⴰⵏ. ⵜⵣⵎⵔⴷ ⴰⴷ ⵜⵜⵙⵙⵏⴼⵍⴷ ⵎⵍⵍⴰ.",
    changePassword: "ⵙⵙⵏⴼⵍ ⵜⴰⵔⵔⴰⵙⵜ",
    account: "ⴰⵙⵏⵓⵔⴰⵢ",
    activeValue: "ⵉⵙⵙⵏ",
    since: "ⵙⴳ",
    securityValue: "ⵜⵉⵙⵙⴰⵙ",
    protected: "ⵉⵜⵜⵡⴰⵙⵙⵏ",
    help: "ⵜⵙⵙⵓⵔⴷ ⴰⵙⵙⵉⵏ?",
    helpTitle: "ⴰⵎⴰⵙ ⵏⵏⵖ ⵉⵍⴰ ⴷⴰⵔⴽ.",
    helpText:
      "ⵉ ⵎⴰ ⵢⴰⵏ ⵙⵇⵙⴰ ⵖⴼ ⵓⵙⵏⵓⵔⴰⵢ, ⵙⵙⵉⵡⵍ ⴷ SRM ⴳⵯⵍⵎⵉⵎ – ⵡⴰⴷ ⵏ ⵏⵓⵏ.",
  },
} as const;

export default function ProfilPage() {
  const { language } = useLanguage();
  const t = translations[language];

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

  const locale =
    language === "ar"
      ? "ar-MA"
      : language === "ber"
        ? "fr-FR"
        : "fr-FR";

  const createdDate = user
    ? new Date(user.createdAt).toLocaleDateString(locale, {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

  const updatedDate = user
    ? new Date(user.updatedAt).toLocaleDateString(locale, {
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
            <span className="profile-eyebrow">{t.client}</span>
            <h1>{t.title}</h1>
            <p>{t.intro}</p>
          </div>

          <Link
            href="/espace-client/dashboard"
            className="profile-back"
          >
            {t.back}
          </Link>
        </div>

        {loading && (
          <div className="profile-loading">
            {t.loading}
          </div>
        )}

        {!loading && error && (
          <div className="profile-error">
            <strong>{t.errorTitle}</strong>
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
                  {t.active}
                </span>

                <h2>{user.identifier}</h2>

                <p>{t.clientLabel}</p>
              </div>

              <div className="profile-id-box">
                <span>{t.clientId}</span>
                <strong>
                  #{String(user.id).padStart(5, "0")}
                </strong>
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
                      {t.infoLabel}
                    </span>

                    <h3>{t.infoTitle}</h3>
                  </div>
                </div>

                <div className="profile-info-list">
                  <div className="profile-info-row">
                    <div>
                      <span>{t.identifier}</span>
                      <strong>{user.identifier}</strong>
                    </div>

                    <span className="profile-info-badge">
                      {t.verified}
                    </span>
                  </div>

                  <div className="profile-info-row">
                    <div>
                      <span>{t.created}</span>
                      <strong>{createdDate}</strong>
                    </div>
                  </div>

                  <div className="profile-info-row">
                    <div>
                      <span>{t.updated}</span>
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
                      {t.security}
                    </span>

                    <h3>{t.secureTitle}</h3>
                  </div>
                </div>

                <p className="profile-security-text">
                  {t.secureText}
                </p>

                <Link
                  href="/espace-client/profil/password"
                  className="profile-action"
                >
                  {t.changePassword}
                  <span>→</span>
                </Link>
              </article>
            </section>

            <section className="profile-stats">
              <div className="profile-stat">
                <span className="profile-stat-number">01</span>
                <div>
                  <strong>{t.account}</strong>
                  <span>{t.activeValue}</span>
                </div>
              </div>

              <div className="profile-stat">
                <span className="profile-stat-number">02</span>
                <div>
                  <strong>{t.identifier}</strong>
                  <span>{user.identifier}</span>
                </div>
              </div>

              <div className="profile-stat">
                <span className="profile-stat-number">03</span>
                <div>
                  <strong>{t.since}</strong>
                  <span>{createdDate}</span>
                </div>
              </div>

              <div className="profile-stat">
                <span className="profile-stat-number">04</span>
                <div>
                  <strong>{t.securityValue}</strong>
                  <span>{t.protected}</span>
                </div>
              </div>
            </section>

            <section className="profile-help">
              <div>
                <span className="profile-help-label">
                  {t.help}
                </span>

                <h3>{t.helpTitle}</h3>

                <p>{t.helpText}</p>
              </div>

              <a
                href="tel:0800002026"
                className="profile-help-button"
              >
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
