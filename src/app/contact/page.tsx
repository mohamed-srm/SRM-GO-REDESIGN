"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

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
      language === "ar"
        ? "البريد الإلكتروني"
        : language === "ber"
          ? "ⵉⵎⴰⵢⵍ"
          : "Email",

    subject:
      language === "ar"
        ? "الموضوع"
        : language === "ber"
          ? "ⴰⵙⵏⴼⵍ"
          : "Sujet",

    message:
      language === "ar"
        ? "رسالتكم"
        : language === "ber"
          ? "ⵜⴰⵙⵏⴰⵢⵜ"
          : "Votre message",

    firstNamePlaceholder:
      language === "ar"
        ? "الاسم الشخصي"
        : language === "ber"
          ? "ⵉⵙⵎ"
          : "Votre prénom",

    lastNamePlaceholder:
      language === "ar"
        ? "النسب"
        : language === "ber"
          ? "ⵙⵙⵎ"
          : "Votre nom",

    phonePlaceholder:
      language === "ar"
        ? "06 XX XX XX XX"
        : "06 XX XX XX XX",

    emailPlaceholder:
      language === "ar"
        ? "votre@email.com"
        : "votre@email.com",

    subjectPlaceholder:
      language === "ar"
        ? "موضوع رسالتكم"
        : language === "ber"
          ? "ⴰⵙⵏⴼⵍ"
          : "Objet de votre message",

    messagePlaceholder:
      language === "ar"
        ? "اكتبوا رسالتكم..."
        : language === "ber"
          ? "ⴰⵔⴰ ⵜⴰⵙⵏⴰⵢⵜ..."
          : "Écrivez votre message...",

    send:
      language === "ar"
        ? "إرسال الرسالة"
        : language === "ber"
          ? "ⴰⵣⵏ"
          : "Envoyer le message",

    sent:
      language === "ar"
        ? "تم إرسال الرسالة ✓"
        : language === "ber"
          ? "ⵜⵜⵓⵣⵏ ✓"
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
          ? "ⴷⵉ ⵓⵙⵙⴰⵡⴰⴹ."
          : "en contact.",
  };

  return (
    <>

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


                <form>

                  <div className="srm-contact-row">

                    <div>
                      <label>{t.firstName}</label>
                      <input placeholder={t.firstNamePlaceholder}/>
                    </div>

                    <div>
                      <label>{t.lastName}</label>
                      <input placeholder={t.lastNamePlaceholder}/>
                    </div>

                  </div>


                  <div className="srm-contact-row">

                    <div>
                      <label>{t.phone}</label>
                      <input placeholder={t.phonePlaceholder}/>
                    </div>

                    <div>
                      <label>{t.email}</label>
                      <input placeholder={t.emailPlaceholder}/>
                    </div>

                  </div>


                  <div>
                    <label>{t.subject}</label>
                    <input placeholder={t.subjectPlaceholder}/>
                  </div>


                  <div>
                    <label>{t.message}</label>
                    <textarea
                      rows={7}
                      placeholder={t.messagePlaceholder}
                    />
                  </div>


                  <button type="submit">
                    {sent ? t.sent : t.send}
                    <span>→</span>
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

                </div>


                <div className="srm-contact-info-list">

                  <div className="srm-contact-info-item">
                    <span>NUMÉRO VERT</span>
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
                    <span>ADRESSE</span>
                    <p>
                      BP294, Avenue Mohamed VI,
                      <br />
                      Guelmim 81000
                    </p>
                  </div>


                  <div className="srm-contact-info-item">
                    <span>HORAIRES</span>
                    <p>
                      Lundi au vendredi
                      <br />
                      08:00 à 16:30
                    </p>
                  </div>


                </div>

              </aside>

            </div>

          </div>
        </section>


      </main>
    </>
  );
}
