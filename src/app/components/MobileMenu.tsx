"use client";

import { useState } from "react";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={`mobile-menu-button ${open ? "is-open" : ""}`}
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {open && (
        <div className="mobile-menu">
          <a href="#about" onClick={() => setOpen(false)}>
            Qui sommes-Nous ?
            <span>→</span>
          </a>

          <a href="/espace-client" onClick={() => setOpen(false)}>
            Espace Client
            <span>→</span>
          </a>

          <a href="#offers" onClick={() => setOpen(false)}>
            Appels d’offres
            <span>→</span>
          </a>

          <a href="#rh" onClick={() => setOpen(false)}>
            Espace RH
            <span>→</span>
          </a>

          <a href="#media" onClick={() => setOpen(false)}>
            Média
            <span>→</span>
          </a>

          <a href="#contact" onClick={() => setOpen(false)}>
            Contact
            <span>→</span>
          </a>
        </div>
      )}
    </>
  );
}
