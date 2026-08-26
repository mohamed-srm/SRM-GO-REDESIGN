import Link from "next/link";`r`nimport { useLanguage } from "../context/LanguageContext";

export default function SiteFooter() {`r`n  const { language } = useLanguage();
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
          <span>{language === "ar" ? "روابط سريعة" : language === "ber" ? "ⵉⵙⵖⵡⴰⵏ ⵉⵣⵔⵉⵏ" : "LIENS RAPIDES"}</span>
          <a href="#about">{language === "ar" ? "من نحن؟" : language === "ber" ? "ⵎⴰⵏ ⵏⵎⴽⴽ?" : "Qui sommes-Nous ?"}</a>
          <a href="#services">{language === "ar" ? "خدماتنا" : language === "ber" ? "ⵉⵎⵙⵙⵔⵏ ⵏⵏⴰⵖ" : "Nos services"}</a>
          <a href="#communications">{language === "ar" ? "التواصل" : language === "ber" ? "ⴰⵎⵙⴰⵡⴰⴹ" : "Communications"}</a>
          <a href="#news">{language === "ar" ? "الأخبار" : language === "ber" ? "ⵉⵙⵙⵓⴼⵔⵏ" : "Actualités"}</a>
        </div>

        <div className="site-footer__column">
          <span>{language === "ar" ? "الخدمات" : language === "ber" ? "ⵉⵎⵙⵙⵔⵏ" : "SERVICES"}</span>
          <a href="#citizen-services">{language === "ar" ? "فضاء المواطن" : language === "ber" ? "ⴰⵙⵏⵓⵔⴰⵢ ⵏ ⵓⵎⴰⵣⵉⵖ" : "Espace citoyen"}</a>
          <Link href="/espace-client">{language === "ar" ? "فضاء الزبون" : language === "ber" ? "ⴰⵙⵏⵓⵔⴰⵢ" : "Espace client"}</Link>
          <a href="#contact">Contact</a>
        </div>

        <div className="site-footer__contact">
          <span>{language === "ar" ? "اتصال" : language === "ber" ? "ⴰⵏⵎⵎⴰⵙ" : "CONTACT"}</span>
          <a href="tel:0800002026">08 00 00 20 26</a>
          <a href="mailto:contact@srm-go.ma">contact@srm-go.ma</a>
          <p>
            Guelmim – Oued Noun
            <br />
            Maroc
          </p>
        </div>
      </div>

      <div className="site-footer__bottom">
        <span>© {new Date().getFullYear()} SRM Guelmim – Oued Noun</span>

        <span>EAU · ÉLECTRICITÉ · ASSAINISSEMENT</span>
      </div>
    </footer>
  );
}


