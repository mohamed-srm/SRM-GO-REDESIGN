"use client";

import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

export default function SiteFooter() {
  const { language } = useLanguage();

  const t = {
    quickLinks:
      language === "ar"
        ? "روابط سريعة"
        : language === "ber"
          ? "ⵉⵙⵖⵡⴰⵏ ⵉⵣⵔⵉⵏ"
          : "LIENS RAPIDES",

    about:
      language === "ar"
        ? "من نحن؟"
        : language === "ber"
          ? "ⵎⴰⵏ ⵏⵎⴽⴽ?"
          : "Qui sommes-Nous ?",

    services:
      language === "ar"
        ? "خدماتنا"
        : language === "ber"
          ? "ⵉⵎⵙⵙⵔⵏ"
          : "Nos services",

    communications:
      language === "ar"
        ? "التواصل"
        : language === "ber"
          ? "ⴰⵎⵙⴰⵡⴰⴹ"
          : "Communications",

    news:
      language === "ar"
        ? "الأخبار"
        : language === "ber"
          ? "ⵉⵙⵙⵓⴼⵔⵏ"
          : "Actualités",

    citizen:
      language === "ar"
        ? "فضاء المواطن"
        : language === "ber"
          ? "ⴰⵙⵏⵓⵔⴰⵢ ⵏ ⵓⵎⵏⵙⴰ"
          : "Espace citoyen",

    client:
      language === "ar"
        ? "فضاء الزبون"
        : language === "ber"
          ? "ⴰⵙⵏⵓⵔⴰⵢ"
          : "Espace client",

    contact:
      language === "ar"
        ? "اتصل بنا"
        : language === "ber"
          ? "ⵏⵏⴰⵏ"
          : "Contact",

    contactTitle:
      language === "ar"
        ? "اتصال"
        : language === "ber"
          ? "ⴰⵏⵎⵎⴰⵙ"
          : "CONTACT",
  };

  return (
    <footer className="site-footer">
      <div className="site-footer__main">
        <div className="site-footer__brand">
          <Link href="/" className="site-footer__logo">
            <img
              src="/logo-srm.png"
              alt="SRM Guelmim Oued Noun"
            />
          </Link>

          <p>
            Société Régionale Multiservices
            <br />
            Guelmim – Oued Noun
          </p>
        </div>

        <div className="site-footer__column">
          <span>{t.quickLinks}</span>
          <a href="#about">{t.about}</a>
          <a href="#services">{t.services}</a>
          <a href="#communications">{t.communications}</a>
          <a href="#news">{t.news}</a>
        </div>

        <div className="site-footer__column">
          <span>SERVICES</span>
          <a href="#citizen-services">{t.citizen}</a>
          <Link href="/espace-client">{t.client}</Link>
          <Link href="/contact">{t.contact}</Link>
        </div>

        <div className="site-footer__contact">
          <span>{t.contactTitle}</span>
          <a href="tel:0800002026">08 00 00 20 26</a>
          <a href="mailto:contact@srm-go.ma">
            contact@srm-go.ma
          </a>
          <p>
            Guelmim – Oued Noun
            <br />
            Maroc
          </p>
        </div>
      </div>

      <div className="site-footer__bottom">
        <span>
          © {new Date().getFullYear()} SRM Guelmim – Oued Noun
        </span>

        <span>
          EAU · ÉLECTRICITÉ · ASSAINISSEMENT
        </span>
      </div>
    </footer>
  );
}
