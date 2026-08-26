"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <main className="srm-contact-page">
      <section className="srm-contact-hero">
        <div className="container">
          <Link href="/" className="srm-contact-back">
            ← Retour au site
          </Link>

          <div className="section-label">
            CONTACT
            <span></span>
          </div>

          <h1>
            Nous sommes
            <br />
            <strong>à votre écoute.</strong>
          </h1>

          <p>
            Une question, une demande d'information ou une remarque ?
            Contactez la SRM Guelmim – Oued Noun.
          </p>
        </div>
      </section>

      <section className="srm-contact-content">
        <div className="container">
          <div className="srm-contact-grid">

            <div className="srm-contact-form-card">
              <span className="srm-contact-eyebrow">
                NOUS ÉCRIRE
              </span>

              <h2>
                Envoyez-nous
                <br />
                votre message.
              </h2>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setSent(true);
                }}
              >
                <div className="srm-contact-row">
                  <div>
                    <label>Prénom</label>
                    <input
                      type="text"
                      placeholder="Votre prénom"
                      required
                    />
                  </div>

                  <div>
                    <label>Nom</label>
                    <input
                      type="text"
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                </div>

                <div className="srm-contact-row">
                  <div>
                    <label>Téléphone</label>
                    <input
                      type="tel"
                      placeholder="06 XX XX XX XX"
                    />
                  </div>

                  <div>
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label>Sujet</label>
                  <input
                    type="text"
                    placeholder="Objet de votre message"
                    required
                  />
                </div>

                <div>
                  <label>Votre message</label>
                  <textarea
                    rows={7}
                    placeholder="Écrivez votre message..."
                    required
                  />
                </div>

                <button type="submit">
                  {sent ? "Message envoyé ✓" : "Envoyer le message"}
                  {!sent && <span>→</span>}
                </button>
              </form>
            </div>

            <aside className="srm-contact-info">
              <div className="srm-contact-info-head">
                <span className="srm-contact-eyebrow">
                  COORDONNÉES
                </span>

                <h2>
                  Restons
                  <br />
                  en contact.
                </h2>

                <p>
                  Retrouvez ici les principaux moyens de contacter
                  la SRM Guelmim – Oued Noun.
                </p>
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

              <div className="srm-contact-socials">
                <span>NOUS SUIVRE</span>

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
  );
}
