"use client";

import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";

export default function FacturesContent() {
  const { language } = useLanguage();

  const t = {
    client:
      language === "ar"
        ? "فضاء الزبون"
        : language === "ber"
          ? "ⴰⵙⵏⵓⵔⴰⵢ"
          : "ESPACE CLIENT",

    title:
      language === "ar"
        ? "فواتيري."
        : language === "ber"
          ? "ⵉⵏⵎⵍⵏ ⵏⵏⴽ."
          : "Mes factures.",

    intro:
      language === "ar"
        ? "اطلعوا على معلومات الفوترة الخاصة بكم وولوجوا إلى الأداء عبر الإنترنت."
        : language === "ber"
          ? "ⵣⵔ ⵉⵎⵙⵙⵏ ⵏ ⵍⴼⴰⵜⵓⵔⴰ ⵏⵏⴽ ⴷ ⵙⵙⵔ ⵙ ⵓⵙⵔⵉⴼ."
          : "Consultez vos informations de facturation et accédez au paiement en ligne.",

    back:
      language === "ar"
        ? "← العودة إلى لوحة التحكم"
        : language === "ber"
          ? "← ⵓⵔⴰⵔ ⵙ ⵍⵓⵃⴰ"
          : "← Retour au dashboard",

    online:
      language === "ar"
        ? "الأداء عبر الإنترنت"
        : language === "ber"
          ? "ⴰⵙⵔⵉⴼ ⵙ ⵓⵙⵔⵉⴼ"
          : "PAIEMENT EN LIGNE",

    heroTitle:
      language === "ar"
        ? "أدوا فاتورتكم بسهولة."
        : language === "ber"
          ? "ⵔⵔ ⵍⴼⴰⵜⵓⵔⴰ ⵏⵏⴽ ⵙ ⵓⵙⵎⵔⵙ."
          : "Payez votre facture simplement.",

    heroText:
      language === "ar"
        ? "ولوجوا إلى منصة Fatourati للاطلاع على فاتورتكم وإجراء الأداء عبر الإنترنت."
        : language === "ber"
          ? "ⴽⵛⵎ ⵙ ⵖⵔ Fatourati ⴰⴼⴰ ⴰⴷ ⵜⵣⵔⵉⴷ ⵍⴼⴰⵜⵓⵔⴰ ⵏⵏⴽ ⴷ ⴰⴷ ⵜⵔⵔⴷ ⵙ ⵓⵙⵔⵉⴼ."
          : "Accédez à la plateforme Fatourati pour consulter votre facture et effectuer votre paiement en ligne.",

    pay:
      language === "ar"
        ? "أداء فاتورتي"
        : language === "ber"
          ? "ⵔⵔ ⵍⴼⴰⵜⵓⵔⴰ"
          : "Payer ma facture",

    billing:
      language === "ar"
        ? "الفوترة"
        : language === "ber"
          ? "ⵍⴼⴰⵜⵓⵔⴰ"
          : "FACTURATION",

    accessTitle:
      language === "ar"
        ? "الوصول إلى فاتورتي"
        : language === "ber"
          ? "ⴽⵛⵎ ⵖⵔ ⵍⴼⴰⵜⵓⵔⴰ"
          : "Accéder à ma facture",

    accessText:
      language === "ar"
        ? "استعملوا Fatourati للاطلاع على معلومات فاتورتكم وإتمام الأداء."
        : language === "ber"
          ? "ⵙⵙⵎⵔⵙ Fatourati ⴰⴼⴰ ⴰⴷ ⵜⵣⵔⵉⴷ ⵉⵎⵙⵙⵏ ⵏ ⵍⴼⴰⵜⵓⵔⴰ."
          : "Utilisez Fatourati pour consulter les informations de votre facture et procéder au paiement.",

    open:
      language === "ar"
        ? "فتح Fatourati"
        : language === "ber"
          ? "ⵍⴷ ⴼⴰⵜⵓⵔⴰⵜⵉ"
          : "Ouvrir Fatourati",

    assistance:
      language === "ar"
        ? "المساعدة"
        : language === "ber"
          ? "ⴰⵙⵙⵉⵏ"
          : "ASSISTANCE",

    helpTitle:
      language === "ar"
        ? "هل تحتاجون إلى المساعدة؟"
        : language === "ber"
          ? "ⵜⵙⵙⵓⵔⴷ ⴰⵙⵙⵉⵏ?"
          : "Besoin d'aide ?",

    helpText:
      language === "ar"
        ? "لأي سؤال بخصوص فاتورتكم أو الأداء، تواصلوا مع الشركة الجهوية متعددة الخدمات كلميم واد نون."
        : language === "ber"
          ? "ⵉ ⵎⴰ ⵢⴰⵏ ⵙⵇⵙⴰ ⵖⴼ ⵍⴼⴰⵜⵓⵔⴰ ⵏⵏⴽ, ⵙⵙⵉⵡⵍ ⴷ SRM."
          : "Pour toute question concernant votre facture ou votre paiement, contactez la SRM Guelmim – Oued Noun.",
  };

  return (
    <>
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

      <section className="invoice-hero">
        <div>
          <span className="invoice-eyebrow">{t.online}</span>

          <h2>{t.heroTitle}</h2>

          <p>{t.heroText}</p>
        </div>

        <a
          href="https://www.fatourati.ma/FatLite/ma/MTC/formulaire?cid=01&fid=1170"
          target="_blank"
          rel="noopener noreferrer"
          className="invoice-pay-button"
        >
          {t.pay}
          <span>↗</span>
        </a>
      </section>

      <section className="invoice-grid">
        <article className="invoice-card invoice-card--blue">
          <span className="invoice-card-number">01</span>

          <span className="invoice-card-label">
            {t.billing}
          </span>

          <h2>{t.accessTitle}</h2>

          <p>{t.accessText}</p>

          <a
            href="https://www.fatourati.ma/FatLite/ma/MTC/formulaire?cid=01&fid=1170"
            target="_blank"
            rel="noopener noreferrer"
            className="invoice-card-link"
          >
            {t.open}
            <span>↗</span>
          </a>
        </article>

        <article className="invoice-card">
          <span className="invoice-card-number">02</span>

          <span className="invoice-card-label">
            {t.assistance}
          </span>

          <h2>{t.helpTitle}</h2>

          <p>{t.helpText}</p>

          <a
            href="tel:0800002026"
            className="invoice-card-link"
          >
            08 00 00 20 26
            <span>→</span>
          </a>
        </article>
      </section>
    </>
  );
}
