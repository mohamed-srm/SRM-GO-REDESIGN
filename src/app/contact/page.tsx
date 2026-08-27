"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import SiteHeader from "../components/SiteHeader";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const { language } = useLanguage();

  const t = {
    back:
      language === "ar"
        ? "← العودة إلى الموقع"
        : language === "ber"
          ? "← ⵓⵔⴰⵔ ⵙ ⵓⵙⵏⴰ"
          : "← Retour au site",

    label:
      language === "ar"
        ? "اتصل بنا"
        : language === "ber"
          ? "ⵏⵏⴰⵏ"
          : "CONTACT",

    title1:
      language === "ar"
        ? "نحن دائماً"
        : language === "ber"
          ? "ⵏⴽⴽⵏⵉ ⵏⵍⴰ"
          : "Nous sommes",

    title2:
      language === "ar"
        ? "في خدمتكم."
        : language === "ber"
          ? "ⴷⴰⵔ ⵡⴰⵡⵔⴰ."
          : "à votre écoute.",

    intro:
      language === "ar"
        ? "لديكم سؤال أو طلب معلومات أو ملاحظة؟ تواصلوا مع الشركة الجهوية متعددة الخدمات كلميم واد نون."
        : language === "ber"
          ? "ⵉⵙ ⵖⵓⵔⴽ ⵙⵏⴰ ⵖⵔ ⵓⵙⵇⵙⵉ ⵏⵉⵖ ⵉⵙⵇⵙⵉⵏ؟ ⵙⵙⵉⵡⵍ ⴷ SRM ⴳⵯⵍⵎⵉⵎ ⵡⴰⴷ ⵏ ⵏⵓⵏ."
          : "Une question, une demande d'information ou une remarque ? Contactez la SRM Guelmim – Oued Noun.",

    write:
      language === "ar"
        ? "اكتبوا إلينا"
        : language === "ber"
          ? "ⴰⵔⴰ ⴰⵏⵖ"
          : "NOUS ÉCRIRE",

    formTitle1:
      language === "ar"
        ? "أرسلوا لنا"
        : language === "ber"
          ? "ⴰⵣⵏ ⴰⵏⵖ"
          : "Envoyez-nous",

    formTitle2:
      language === "ar"
        ? "رسالتكم."
        : language === "ber"
          ? "ⵜⴰⵙⵏⴰⵢⵜ."
          : "votre message.",

    firstName:
      language === "ar" ? "الاسم" : language === "ber" ? "ⵉⵙⵎ" : "Prénom",
    lastName:
      language === "ar" ? "النسب" : language === "ber" ? "ⵙⵙⵎ" : "Nom",
    phone:
      language === "ar" ? "الهاتف" : language === "ber" ? "ⵜⵉⵍⵉⴼⵓⵏ" : "Téléphone",
    email:
      language === "ar" ? "البريد الإلكتروني" : language === "ber" ? "ⵉⵎⴰⵢⵍ" : "Email",
    subject:
      language === "ar" ? "الموضوع" : language === "ber" ? "ⴰⵙⵏⴼⵍ" : "Sujet",
    message:
      language === "ar" ? "رسالتكم" : language === "ber" ? "ⵜⴰⵙⵏⴰⵢⵜ ⵏⵏⴽ" : "Votre message",

    firstNamePlaceholder:
      language === "ar" ? "الاسم الشخصي" : language === "ber" ? "ⵉⵙⵎ ⵏⵏⴽ" : "Votre prénom",
    lastNamePlaceholder:
      language === "ar" ? "النسب" : language === "ber" ? "ⵙⵙⵎ ⵏⵏⴽ" : "Votre nom",
    phonePlaceholder:
      language === "ar" ? "06 XX XX XX XX" : "06 XX XX XX XX",
    emailPlaceholder:
      language === "ar" ? "votre@email.com" : "votre@email.com",
    subjectPlaceholder:
      language === "ar" ? "موضوع رسالتكم" : language === "ber" ? "ⴰⵙⵏⴼⵍ ⵏ ⵜⴰⵙⵏⴰⵢⵜ" : "Objet de votre message",
    messagePlaceholder:
      language === "ar" ? "اكتبوا رسالتكم..." : language === "ber" ? "ⴰⵔⴰ ⵜⴰⵙⵏⴰⵢⵜ ⵏⵏⴽ..." : "Écrivez votre message...",

    send:
      language === "ar"
        ? "إرسال الرسالة"
        : language === "ber"
          ? "ⴰⵣⵏ ⵜⴰⵙⵏⴰⵢⵜ"
          : "Envoyer le message",

    sent:
      language === "ar"
        ? "تم إرسال الرسالة ✓"
        : language === "ber"
          ? "ⵜⵜⵓⵣⵏ ⵜⴰⵙⵏⴰⵢⵜ ✓"
          : "Message envoyé ✓",

    coordinates:
      language === "ar"
        ? "معلومات الاتصال"
        : language === "ber"
          ? "ⵜⵉⵏⵎⵍⵜ"
          : "COORDONNÉES",

    contactTitle1:
      language === "ar"
        ? "ابقوا"
        : language === "ber"
          ? "ⵇⵇⵉⵎ"
          : "Restons",

    contactTitle2:
      language === "ar"
        ? "على تواصل."
        : language === "ber"
          ? "ⴷⴰⵔ ⵙ ⵏⵏⴰⵏ."
          : "en contact.",

    contactDesc:
      language === "ar"
        ? "تجدون هنا أهم وسائل التواصل مع الشركة الجهوية متعددة الخدمات كلميم واد نون."
        : language === "ber"
          ? "ⴰⴷ ⵜⵣⵔⵉⴷ ⴷⴰ ⵉⵎⵙⵙⵔⵏ ⵏ ⵓⵙⵉⵡⵍ ⴷ SRM ⴳⵯⵍⵎⵉⵎ ⵡⴰⴷ ⵏ ⵏⵓⵏ."
          : "Retrouvez ici les principaux moyens de contacter la SRM Guelmim – Oued Noun.",

    greenNumber:
      language === "ar"
        ? "الرقم الأخضر"
        : language === "ber"
          ? "ⵓⵟⵟⵓⵏ ⴰⵣⵣⵉⵢⵣ"
          : "NUMÉRO VERT",

    address:
      language === "ar" ? "العنوان" : language === "ber" ? "ⵜⴰⵏⵎⵎⵉⵔⵜ" : "ADRESSE",

    hours:
      language === "ar" ? "أوقات العمل" : language === "ber" ? "ⵉⵎⵉⵔ ⵏ ⵓⵙⵏⵓⵔⴰⵢ" : "HORAIRES",

    follow:
      language === "ar"
        ? "تابعونا"
        : language === "ber"
          ? "ⵙⵙⵉⵡⵍ ⵉⵙ"
          : "NOUS SUIVRE",

    weekdays:
      language === "ar"
        ? "من الإثنين إلى الجمعة"
        : language === "ber"
          ? "ⵙⴳ ⵉⵎⴰⵙⵙ ⴰⵔ ⵉⵎⴰⵙⵙ"
          : "Lundi au vendredi",
  };

  return (
    <>
    <SiteHeader />
    <main className="srm-contact-page">
      <section className="srm-contact-hero">
        <div className="container">
          <Link href="/" className="srm-contact-back">
            {t.back}
          </Link>

          <div className="section-label">
            {t.label}
            <span></span>
          </div>

          <h1>
            {t.title1}
            <br />
            <strong>{t.title2}</strong>
          </h1>

          <p>{t.intro}</p>
        </div>
      </section>

      <section className="srm-contact-content">
        <div className="container">
          <div className="srm-contact-grid">
            <div className="srm-contact-form-card">
              <span className="srm-contact-eyebrow">
                {t.write}
              </span>

              <h2>
                {t.formTitle1}
                <br />
                {t.formTitle2}
              </h2>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setSent(true);
                }}
              >
                <div className="srm-contact-row">
                  <div>
                    <label>{t.firstName}</label>
                    <input
                      type="text"
                      placeholder={t.firstNamePlaceholder}
                      required
                    />
                  </div>

                  <div>
                    <label>{t.lastName}</label>
                    <input
                      type="text"
                      placeholder={t.lastNamePlaceholder}
                      required
                    />
                  </div>
                </div>

                <div className="srm-contact-row">
                  <div>
                    <label>{t.phone}</label>
                    <input
                      type="tel"
                      placeholder={t.phonePlaceholder}
                    />
                  </div>

                  <div>
                    <label>{t.email}</label>
                    <input
                      type="email"
                      placeholder={t.emailPlaceholder}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label>{t.subject}</label>
                  <input
                    type="text"
                    placeholder={t.subjectPlaceholder}
                    required
                  />
                </div>

                <div>
                  <label>{t.message}</label>
                  <textarea
                    rows={7}
                    placeholder={t.messagePlaceholder}
                    required
                  />
                </div>

                <button type="submit">
                  {sent ? t.sent : t.send}
                  {!sent && <span>→</span>}
                </button>
              </form>
            </div>

            <aside className="srm-contact-info">
              <div className="srm-contact-info-head">
                <span className="srm-contact-eyebrow">
                  {t.coordinates}
                </span>

                <h2>
                  {t.contactTitle1}
                  <br />
                  {t.contactTitle2}
                </h2>

                <p>{t.contactDesc}</p>
              </div>

              <div className="srm-contact-info-list">
                <div className="srm-contact-info-item">
                  <span>{t.greenNumber}</span>
                  <a href="tel:0800002026">
                    08 00 00 20 26
                  </a>
                </div>

                <div className="srm-contact-info-item">
                  <span>EMAIL</span>
                  <a href="mailto:contact@srm-go.ma">
                    contact@srm-go.ma
                  </a>
                </div>

                <div className="srm-contact-info-item">
                  <span>{t.address}</span>
                  <p>
                    BP294, Avenue Mohamed VI,
                    <br />
                    Guelmim 81000
                  </p>
                </div>

                <div className="srm-contact-info-item">
                  <span>{t.hours}</span>
                  <p>
                    {t.weekdays}
                    <br />
                    08:00 à 16:30
                  </p>
                </div>
              </div>

              <div className="srm-contact-socials">
                <span>{t.follow}</span>

                <div>
                  <a
                    href="https://www.linkedin.com/company/srm-go/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    in
                  </a>

                  <a
                    href="https://www.instagram.com/srm_guelmim_oued_noun/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    ◎
                  </a>

                  <a
                    href="https://www.facebook.com/SRMGO/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    f
                  </a>

                  <a
                    href="https://www.youtube.com/channel/UCvFEUu8J2G5i-bLdhXXEy5w"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                  >
                    ▶
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <div className="srm-contact-bottom-line">
        <div className="container">
          EAU · ÉLECTRICITÉ · ASSAINISSEMENT · GUELMIM — OUED NOUN
        </div>
      </div>
    </main>
  </>
  );
}