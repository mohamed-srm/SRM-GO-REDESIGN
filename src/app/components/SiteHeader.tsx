"use client";

import { useLanguage } from "../context/LanguageContext";
import MobileMenu from "./MobileMenu";

export default function SiteHeader() {
  const { setLanguage } = useLanguage();

  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">

          <div className="topbar-left">
            <span>◷</span>
            <span>Ouvert de 08:00 à 16:30 · Lundi au vendredi</span>
          </div>

          <div className="topbar-right">
            <span>☎ 08 00 00 20 26</span>
            <span className="separator">|</span>
            <span>✉ contact@srm-go.ma</span>
            <span className="separator">|</span>

            <button className="language-switch" onClick={()=>setLanguage("fr")}>
              FR
            </button>

            <button className="language-switch" onClick={()=>setLanguage("ar")}>
              العربية
            </button>

            <button className="language-switch" onClick={()=>setLanguage("ber")}>
              ⵜⵉⴼⵉⵏⴰⵖ
            </button>

            <a className="social" href="#">in</a>
            <a className="social" href="#">◎</a>
            <a className="social" href="#">f</a>
            <a className="social" href="#">▶</a>
          </div>

        </div>
      </div>

      <header className="navbar">
        <div className="container nav-inner">

          <a href="/" className="brand-logo">
            <img src="/logo-srm.png" alt="SRM Guelmim Oued Noun" />
          </a>

          <nav className="nav-links">
            <a href="#about">Qui sommes-Nous ? <span>⌄</span></a>
            <a href="#services">Espace Client <span>⌄</span></a>
            <a href="#offers">Appels d’offres <span>⌄</span></a>
            <a href="#rh">Espace RH <span>⌄</span></a>
            <a href="#media">Média <span>⌄</span></a>
            <a href="/contact">Contact</a>
          </nav>

          <a href="/espace-client" className="client-button">
            <span className="client-icon">♙</span>
            Espace Client
            <strong>→</strong>
          </a>

          <MobileMenu />

        </div>
      </header>
    </>
  );
}
