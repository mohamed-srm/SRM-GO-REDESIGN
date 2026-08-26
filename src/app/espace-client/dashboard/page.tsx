"use client";

import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/session";
import { useLanguage } from "../../context/LanguageContext";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/espace-client");
  }

  const stats = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      identifier: true,
      createdAt: true,
      _count: {
        select: {
          demandes: true,
          reclamations: true,
        },
      },
    },
  });

  if (!stats) {
    redirect("/espace-client");
  }

  return (
    <DashboardContent
      identifier={stats.identifier}
      userId={user.id}
      demandes={stats._count.demandes}
      reclamations={stats._count.reclamations}
    />
  );
}

function DashboardContent({
  identifier,
  userId,
  demandes,
  reclamations,
}: {
  identifier: string;
  userId: number;
  demandes: number;
  reclamations: number;
}) {
  const { language } = useLanguage();

  const t = {
    eyebrow:
      language === "ar"
        ? "فضاء الزبون"
        : language === "ber"
          ? "ⴰⵙⵏⵓⵔⴰⵢ"
          : "ESPACE CLIENT",

    hello:
      language === "ar"
        ? "مرحباً،"
        : language === "ber"
          ? "ⵣⵓⵍⵍ,"
          : "Bonjour,",

    intro:
      language === "ar"
        ? "تجدون هنا خدماتكم وطلباتكم وشكاياتكم."
        : language === "ber"
          ? "ⴰⴷ ⵜⴰⴼⴷ ⴷⴰ ⵉⵎⵙⵙⵔⵏ ⴷ ⵉⵙⵏⴰⵙⵏ ⵏⵏⴽ."
          : "Retrouvez vos services, vos demandes et vos réclamations au même endroit.",

    back:
      language === "ar"
        ? "← العودة إلى الموقع"
        : language === "ber"
          ? "← ⵓⵔⴰⵔ ⵙ ⵓⵙⵏⴰ"
          : "← Retour au site",

    active:
      language === "ar"
        ? "الحساب نشط"
        : language === "ber"
          ? "ⴰⵙⵏⵓⵔⴰⵢ ⵉⵙⵙⵏ"
          : "COMPTE ACTIF",

    welcome:
      language === "ar"
        ? "فضاؤكم الخاص"
        : language === "ber"
          ? "ⵓⵙⵏⵓⵔⴰⵢ ⵏⵏⴽ"
          : "Votre espace client",

    welcomeText:
      language === "ar"
        ? "دبّروا بسهولة جميع طلباتكم لدى الشركة الجهوية متعددة الخدمات كلميم واد نون."
        : language === "ber"
          ? "ⵙⵙⵏ ⵉⵎⵙⵙⵔⵏ ⴷ ⵉⵙⵏⴰⵙⵏ ⵏⵏⴽ ⵙ ⵓⵙⵎⵔⵙ ⵏ ⵓⵙⵏⵓⵔⴰⵢ."
          : "Gérez facilement vos démarches auprès de la SRM Guelmim – Oued Noun.",

    clientId:
      language === "ar"
        ? "معرّف الزبون"
        : language === "ber"
          ? "ⴰⵎⵎⴰⵍ ⵏ ⵓⵙⴰⵎⵓ"
          : "IDENTIFIANT CLIENT",

    service:
      language === "ar"
        ? "الخدمة"
        : language === "ber"
          ? "ⴰⵎⵙⵙⵔ"
          : "SERVICE",

    invoices:
      language === "ar"
        ? "فواتيري"
        : language === "ber"
          ? "ⵉⵏⵎⵍⵏ ⵏⵏⴽ"
          : "Mes factures",

    invoicesText:
      language === "ar"
        ? "اطلعوا على فواتيركم وأدواها عبر الإنترنت بواسطة Fatourati."
        : language === "ber"
          ? "ⵣⵔ ⴷ ⵔⵔ ⵉⵏⵎⵍⵏ ⵏⵏⴽ ⵙ ⵓⵙⵔⵉⴼ."
          : "Consultez et payez votre facture en ligne via Fatourati.",

    demands:
      language === "ar"
        ? "طلباتي"
        : language === "ber"
          ? "ⵉⵙⵏⴰⵙⵏ ⵏⵏⴽ"
          : "Mes demandes",

    demandsText:
      language === "ar"
        ? "تتبعوا طلباتكم واطلعوا على مراجعها."
        : language === "ber"
          ? "ⵙⵙⵏ ⵉⵙⵏⴰⵙⵏ ⵏⵏⴽ."
          : "Suivez vos démarches et consultez leurs références.",

    complaints:
      language === "ar"
        ? "شكاياتي"
        : language === "ber"
          ? "ⵉⵙⵙⵓⴼⵔⵏ ⵏⵏⴽ"
          : "Mes réclamations",

    complaintsText:
      language === "ar"
        ? "ضعوا شكاية وتتبعوا تطورها."
        : language === "ber"
          ? "ⵔⵏⵓ ⵢⴰⵏ ⵓⵙⵙⵓⴼⵔ ⴷ ⵙⵙⵏ ⵉⵎⵙⵙⵉ."
          : "Déposez une réclamation et suivez son évolution.",

    account:
      language === "ar"
        ? "الحساب"
        : language === "ber"
          ? "ⴰⵙⵏⵓⵔⴰⵢ"
          : "COMPTE",

    profile:
      language === "ar"
        ? "ملفي الشخصي"
        : language === "ber"
          ? "ⴰⵙⵏⴰⵙ ⵉⵎⴰⵏ"
          : "Mon profil",

    profileText:
      language === "ar"
        ? "دبّروا حسابكم وإعدادات الأمان."
        : language === "ber"
          ? "ⵙⵙⵏ ⴰⵙⵏⵓⵔⴰⵢ ⴷ ⵜⵉⵙⵙⴰⵙ ⵏ ⵓⵎⴰⵏ."
          : "Gérez votre compte et vos paramètres de sécurité.",

    access:
      language === "ar"
        ? "الدخول إلى الخدمة"
        : language === "ber"
          ? "ⴽⵛⵎ ⵖⵔ ⵓⵎⵙⵙⵔ"
          : "Accéder au service",

    demandsCount:
      language === "ar"
        ? `${demandes} طلب`
        : language === "ber"
          ? `${demandes} ⵉⵙⵏⴰⵙⵏ`
          : `${demandes} demande(s)`,

    complaintsCount:
      language === "ar"
        ? `${reclamations} شكاية`
        : language === "ber"
          ? `${reclamations} ⵉⵙⵙⵓⴼⵔⵏ`
          : `${reclamations} réclamation(s)`,

    activeAccount:
      language === "ar"
        ? "حساب نشط"
        : language === "ber"
          ? "ⴰⵙⵏⵓⵔⴰⵢ ⵉⵙⵙⵏ"
          : "Compte actif",

    steps:
      language === "ar"
        ? "طلباتي"
        : language === "ber"
          ? "ⵉⵙⵏⴰⵙⵏ ⵏⵏⴽ"
          : "MES DÉMARCHES",

    activity:
      language === "ar"
        ? "نشاطكم"
        : language === "ber"
          ? "ⴰⵎⵙⵙⵉ ⵏⵏⴽ"
          : "Votre activité",

    requests:
      language === "ar"
        ? "الطلبات"
        : language === "ber"
          ? "ⵉⵙⵏⴰⵙⵏ"
          : "Demandes",

    complaintsStat:
      language === "ar"
        ? "الشكايات"
        : language === "ber"
          ? "ⵉⵙⵙⵓⴼⵔⵏ"
          : "Réclamations",

    accountStat:
      language === "ar"
        ? "الحساب"
        : language === "ber"
          ? "ⴰⵙⵏⵓⵔⴰⵢ"
          : "Compte",

    help:
      language === "ar"
        ? "تحتاجون إلى المساعدة؟"
        : language === "ber"
          ? "ⵜⵙⵙⵓⵔⴷ ⴰⵙⵙⵉⵏ?"
          : "BESOIN D'AIDE ?",

    helpTitle:
      language === "ar"
        ? "فريقنا رهن إشارتكم."
        : language === "ber"
          ? "ⴰⵎⴰⵙ ⵏⵏⵖ ⵉⵍⴰ ⴷⴰⵔⴽ."
          : "Notre équipe reste à votre écoute.",

    helpText:
      language === "ar"
        ? "لأي سؤال يتعلق بفضاء الزبون، تواصلوا مع الشركة الجهوية متعددة الخدمات كلميم واد نون."
        : language === "ber"
          ? "ⵉ ⵎⴰ ⵢⴰⵏ ⵙⵇⵙⴰ ⵖⴼ ⵓⵙⵏⵓⵔⴰⵢ, ⵙⵙⵉⵡⵍ ⴷ SRM."
          : "Pour toute question concernant votre espace client, contactez la SRM Guelmim – Oued Noun.",
  };

  return (
    <main className="dashboard-page dashboard-page--home">
      <div className="dashboard-home-container">
        <header className="dashboard-home-header">
          <div>
            <span className="dashboard-label">
              {t.eyebrow}
            </span>

            <h1>
              {t.hello} <span>{identifier}</span>.
            </h1>

            <p>{t.intro}</p>
          </div>

          <div className="dashboard-home-actions">
            <Link href="/" className="dashboard-back">
              {t.back}
            </Link>

            <LogoutButton />
          </div>
        </header>

        <section className="dashboard-welcome">
          <div className="dashboard-welcome-main">
            <div className="dashboard-avatar">
              {identifier.charAt(0).toUpperCase()}
            </div>

            <div>
              <span className="dashboard-welcome-status">
                <i></i>
                {t.active}
              </span>

              <h2>{t.welcome}</h2>

              <p>{t.welcomeText}</p>
            </div>
          </div>

          <div className="dashboard-welcome-id">
            <span>{t.clientId}</span>
            <strong>
              #{String(userId).padStart(5, "0")}
            </strong>
          </div>
        </section>

        <section className="dashboard-service-grid">
          <Link
            href="/espace-client/factures"
            className="dashboard-service-card dashboard-service-card--blue"
          >
            <div className="dashboard-service-top">
              <span>01</span>
              <span className="dashboard-service-icon">↗</span>
            </div>

            <div>
              <span className="dashboard-service-label">
                {t.service}
              </span>

              <h2>{t.invoices}</h2>

              <p>{t.invoicesText}</p>
            </div>

            <div className="dashboard-service-bottom">
              <span>{t.access}</span>
              <strong>→</strong>
            </div>
          </Link>

          <Link
            href="/espace-client/demandes"
            className="dashboard-service-card"
          >
            <div className="dashboard-service-top">
              <span>02</span>
              <span className="dashboard-service-icon">→</span>
            </div>

            <div>
              <span className="dashboard-service-label">
                {t.service}
              </span>

              <h2>{t.demands}</h2>

              <p>{t.demandsText}</p>
            </div>

            <div className="dashboard-service-bottom">
              <span>{t.demandsCount}</span>
              <strong>→</strong>
            </div>
          </Link>

          <Link
            href="/espace-client/reclamations"
            className="dashboard-service-card"
          >
            <div className="dashboard-service-top">
              <span>03</span>
              <span className="dashboard-service-icon">→</span>
            </div>

            <div>
              <span className="dashboard-service-label">
                {t.service}
              </span>

              <h2>{t.complaints}</h2>

              <p>{t.complaintsText}</p>
            </div>

            <div className="dashboard-service-bottom">
              <span>{t.complaintsCount}</span>
              <strong>→</strong>
            </div>
          </Link>

          <Link
            href="/espace-client/profil"
            className="dashboard-service-card"
          >
            <div className="dashboard-service-top">
              <span>04</span>
              <span className="dashboard-service-icon">→</span>
            </div>

            <div>
              <span className="dashboard-service-label">
                {t.account}
              </span>

              <h2>{t.profile}</h2>

              <p>{t.profileText}</p>
            </div>

            <div className="dashboard-service-bottom">
              <span>{t.activeAccount}</span>
              <strong>→</strong>
            </div>
          </Link>
        </section>

        <section className="dashboard-overview">
          <div className="dashboard-overview-card">
            <div>
              <span className="dashboard-overview-label">
                {t.steps}
              </span>

              <h3>{t.activity}</h3>
            </div>

            <div className="dashboard-overview-stats">
              <div>
                <strong>{demandes}</strong>
                <span>{t.requests}</span>
              </div>

              <div>
                <strong>{reclamations}</strong>
                <span>{t.complaintsStat}</span>
              </div>

              <div>
                <strong>01</strong>
                <span>{t.accountStat}</span>
              </div>
            </div>
          </div>

          <div className="dashboard-overview-card dashboard-overview-card--help">
            <div>
              <span className="dashboard-overview-label">
                {t.help}
              </span>

              <h3>{t.helpTitle}</h3>

              <p>{t.helpText}</p>
            </div>

            <a
              href="tel:0800002026"
              className="dashboard-help-button"
            >
              08 00 00 20 26
              <span>→</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
