"use client";

import MobileMenu from "./MobileMenu";

export default function SiteHeader() {
  return (
    <header className="navbar">
      <div className="container nav-inner">

        <a href="/" className="brand-logo">
          <img src="/logo-srm.png" alt="SRM Guelmim Oued Noun" />
        </a>

        <nav className="nav-links">
          <a href="#about">
            Qui sommes-Nous ? <span>⌄</span>
          </a>

          <a href="#services">
            Espace Client <span>⌄</span>
          </a>

          <a href="#offers">
            Appels d’offres <span>⌄</span>
          </a>

          <a href="#rh">
            Espace RH <span>⌄</span>
          </a>

          <a href="#media">
            Média <span>⌄</span>
          </a>

          <a href="/contact">
            Contact
          </a>
        </nav>

        <a href="/espace-client" className="client-button">
          <span className="client-icon">♙</span>
          Espace Client
          <strong>→</strong>
        </a>

        <MobileMenu />

      </div>
    </header>
  );
}
