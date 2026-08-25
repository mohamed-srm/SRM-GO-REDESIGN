import Link from "next/link";

export default function SiteFooter() {
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
          <span>LIENS RAPIDES</span>
          <a href="#about">Qui sommes-Nous ?</a>
          <a href="#services">Nos services</a>
          <a href="#communications">Communications</a>
          <a href="#news">Actualités</a>
        </div>

        <div className="site-footer__column">
          <span>SERVICES</span>
          <a href="#citizen-services">Espace citoyen</a>
          <Link href="/espace-client">Espace client</Link>
          <a href="#contact">Contact</a>
        </div>

        <div className="site-footer__contact">
          <span>CONTACT</span>
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
