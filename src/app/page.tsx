"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import MobileMenu from "./components/MobileMenu";
import SiteFooter from "./components/SiteFooter";

export default function Home() {
  const [activeCommunication, setActiveCommunication] = useState(0);

  const communications = [
    {
      id: "184",
      image: "/communication-1.png",
    },
    {
      id: "185",
      image: "/communication-2.png",
    },
    {
      id: "186",
      image: "/communication-3.png",
    },
  ];
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCommunication((current) => {
        if (current >= communications.length - 1) {
          return 0;
        }

        return current + 1;
      });
    }, 10000);

    return () => clearInterval(timer);
  }, [communications.length]);
  
  return (
    <main className="site">

      {/* TOP BAR */}
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
            <span>FR</span>
            <span>العربية</span>
            <span>ⵜⵉⴼⵉⵏⴰⵖ</span>
            <a className="social" href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">in</a>
            <a className="social" href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">f</a>
            <a className="social" href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">▶</a>
          </div>

        </div>
      </div>


      {/* NAVBAR */}
      <header className="navbar">
        <div className="container nav-inner">

          <a href="/" className="brand-logo">
            <img
              src="/logo-srm.png"
              alt="SRM Guelm Oued Noun"
            />
          </a>

          <nav className="nav-links">

            <a href="#about">
              Qui sommes-Nous ?
              <span>⌄</span>
            </a>

            <a href="#services">
              Espace Client
              <span>⌄</span>
            </a>

            <a href="#offers">
              Appels d’offres
              <span>⌄</span>
            </a>

            <a href="#rh">
              Espace RH
              <span>⌄</span>
            </a>

            <a href="#media">
              Média
              <span>⌄</span>
            </a>

            <a href="#contact">
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


      {/* HERO */}
      <section className="hero">

        <div className="hero-image">
          <img
            src="/hero-guelmim.jpg"
            alt="Guelmim - Oued Noun"
          />
        </div>

        <div className="hero-overlay"></div>

        {/* decorative waves */}
        <div className="hero-waves">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="container hero-content">

          <div className="hero-kicker">
            SRM GUELMIM — OUED NOUN
            <i></i>
          </div>

          <h1>
            L’eau.
            <br />
            L’énergie.
            <br />
            <span>La vie.</span>
          </h1>

          <p className="hero-description">
            Au cœur de Guelmim-Oued Noun, nous accompagnons chaque jour
            les territoires, les entreprises et les citoyens.
          </p>

          <div className="hero-actions">

            <a href="#about" className="primary-button">
              Découvrir la SRM
              <span>→</span>
            </a>

            <a href="#services" className="secondary-button">
              Nos services
            </a>

          </div>

        </div>

      </section>
         {/* IMPORTANT ANNOUNCEMENT */}
          <section className="announcement-feature">

            <div className="container">

              <div className="announcement-feature-card">

                <div className="announcement-shape announcement-shape-one"></div>
                <div className="announcement-shape announcement-shape-two"></div>

                <div className="announcement-main">

                  <div className="announcement-badge">
                    <span>!</span>
                    INFORMATION IMPORTANTE
                  </div>

                  <h2 dir="rtl">
                    إعلان هام
                  </h2>

                  <p dir="rtl">
                    للحصول على الرقم الجديد لعقد الاشتراك الخاصة بكم،
                    يمكنكم الاتصال بالرقم الأخضر أو الاتصال بوكالتكم التجارية.
                  </p>

                </div>


                <div className="announcement-phone">

                  <span>الرقم الأخضر</span>

                  <strong>
                    0800002026
                  </strong>

                  <a href="tel:0800002026" className="sidebar-action">
                    <span className="sidebar-action-icon">
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          d="M6.6 2.5 4.8 3.9c-.8.6-1.1 1.7-.7 2.6
                          2.2 5.5 6.1 9.4 11.6 11.6.9.4 2 .1 2.6-.7l1.4-1.8
                          c.5-.7.4-1.7-.2-2.3l-2.8-2.2c-.6-.5-1.5-.4-2 .1l-1
                          1c-2.1-1-3.8-2.7-4.8-4.8l1-1c.5-.5.6-1.4.1-2L8.9
                          2.7c-.6-.6-1.6-.7-2.3-.2Z"
                        />
                      </svg>
                    </span>

                    <span>Appeler maintenant</span>

                    <span className="sidebar-action-arrow">→</span>
                  </a>

                </div>

              </div>

            </div>

          </section>
          {/* COMMUNICATIONS */}
          <section className="communications-section" id="communications">
            <div className="container">

              <div className="communications-header">
                <div className="section-label">
                  COMMUNICATIONS
                  <span></span>
                </div>

                <h2>
                  Restez connectés
                  <br />
                  <strong>avec la SRM.</strong>
                </h2>
              </div>

              <div className="communications-slider">
                <div
                  className="communications-track"
                  style={{
                    transform: `translateX(-${activeCommunication * 100}%)`,
                  }}
                >
                  {communications.map((communication) => (
                    <div
                      className="communication-slide"
                      key={communication.id}
                    >
                      <img
                        src={communication.image}
                        alt={`Communication SRM ${communication.id}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>
     
      {/* SERVICES STRIP */}
      <section className="service-strip" id="services">

        <div className="container service-strip-inner">

          <div className="mini-service">
            <div className="mini-icon water-icon">♢</div>

            <div>
              <h3>Eau</h3>
              <p>
                Une ressource essentielle,
                <br />
                gérée avec exigence.
              </p>
            </div>
          </div>


          <div className="mini-service">
            <div className="mini-icon energy-icon">ϟ</div>

            <div>
              <h3>Électricité</h3>
              <p>
                Une énergie fiable pour accompagner
                <br />
                le quotidien et le développement.
              </p>
            </div>
          </div>


          <div className="mini-service">
            <div className="mini-icon sanitation-icon">≋</div>

            <div>
              <h3>Assainissement</h3>
              <p>
                Des solutions durables pour
                <br />
                préserver notre environnement.
              </p>
            </div>
          </div>


          <div className="mini-service">
            <div className="mini-icon people-icon">♧</div>

            <div>
              <h3>Proximité</h3>
              <p>
                Au service des citoyens
                <br />
                et des territoires.
              </p>
            </div>
          </div>

        </div>

      </section>

            {/* ABOUT / MISSION */}
      <section className="mission-section" id="about">

        <div className="container mission-grid">

          <div className="mission-copy">

            <div className="section-label">
              NOTRE MISSION
              <span></span>
            </div>

            <h2>
              Une région.
              <br />
              <strong>Une mission.</strong>
            </h2>

            <p>
              La SRM Guelmim-Oued Noun accompagne les habitants,
              les entreprises et les territoires dans la gestion
              de services essentiels au quotidien.
            </p>

            <a href="#services" className="text-link">
              Découvrir nos services
              <span>→</span>
            </a>

          </div>


          <div className="mission-panel">

            <div className="mission-panel-head">
              <span>SRM GO</span>
              <span>2025 — AUJOURD'HUI</span>
            </div>


            <div className="mission-lines">

              <div className="mission-line">
                <span className="mission-number">01</span>
                <div>
                  <h3>Eau</h3>
                  <p>Une ressource essentielle.</p>
                </div>
              </div>

              <div className="mission-line">
                <span className="mission-number">02</span>
                <div>
                  <h3>Électricité</h3>
                  <p>Une énergie pour le quotidien.</p>
                </div>
              </div>

              <div className="mission-line">
                <span className="mission-number">03</span>
                <div>
                  <h3>Assainissement</h3>
                  <p>Des territoires plus durables.</p>
                </div>
              </div>

            </div>


            <div className="mission-panel-footer">
              <span>GUELMIM · SIDI IFNI · TAN-TAN · ASSA-ZAG</span>
            </div>

          </div>

        </div>

      </section>
      {/* FEATURED NEWS */}
      <section className="featured-news-section">

        <div className="container">

          <div className="featured-news-header">
            <div>
              <div className="section-label">
                ACTUALITÉS
                <span></span>
              </div>

              <h2>
                Les dernières nouvelles
                <br />
                <strong>de la SRM.</strong>
              </h2>
            </div>

            <Link href="/actualites" className="news-view-all">
              Toutes les actualités
              <span>→</span>
            </Link>
          </div>

          <Link href="/actualites/184" className="featured-news-card">

            <div className="featured-news-image">
              <img
                src="/news-184.jpg"
                alt="Actualité SRM Guelmim Oued Noun"
              />
            </div>

            <div className="featured-news-content">

              <div className="news-meta-row">
                <span>ACTUALITÉ</span>
                <span>SRM GO</span>
              </div>

              <h3>
                Actualité de la Société Régionale
                Multiservices Guelmim – Oued Noun
              </h3>

              <p>
                Découvrez les dernières informations,
                communications et actualités de la SRM.
              </p>

              <span className="news-read-more">
                Lire l’article
                <span>↗</span>
              </span>

            </div>

          </Link>

        </div>

      </section>
            {/* REGION */}
      <section className="region-section" id="region">

        <div className="container region-grid">

          <div className="region-copy">

            <div className="section-label">
              NOTRE TERRITOIRE
              <span></span>
            </div>

            <h2>
              Au cœur de
              <br />
              <strong>Guelmim-Oued Noun.</strong>
            </h2>

            <p>
              Une région, quatre provinces, des territoires
              et des besoins différents. La SRM accompagne
              chaque espace avec la même exigence de service.
            </p>

            <div className="province-list">

              <button className="province-item active">
                <span className="province-number">01</span>
                <span>Guelmim</span>
                <span className="province-arrow">↗</span>
              </button>

              <button className="province-item">
                <span className="province-number">02</span>
                <span>Sidi Ifni</span>
                <span className="province-arrow">↗</span>
              </button>

              <button className="province-item">
                <span className="province-number">03</span>
                <span>Tan-Tan</span>
                <span className="province-arrow">↗</span>
              </button>

              <button className="province-item">
                <span className="province-number">04</span>
                <span>Assa-Zag</span>
                <span className="province-arrow">↗</span>
              </button>

            </div>

          </div>


          <div className="region-map">

            <div className="map-glow"></div>

            <div className="map-card">

              <div className="map-top">
                <span>GUELMIM — OUED NOUN</span>
                <span>01 / 04</span>
              </div>

              <div className="map-visual">

                <div className="map-outline"></div>

                <div className="map-point point-guelmim">
                  <span></span>
                  <small>Guelmim</small>
                </div>

                <div className="map-point point-ifni">
                  <span></span>
                  <small>Sidi Ifni</small>
                </div>

                <div className="map-point point-tantan">
                  <span></span>
                  <small>Tan-Tan</small>
                </div>

                <div className="map-point point-assazag">
                  <span></span>
                  <small>Assa-Zag</small>
                </div>

              </div>

              <div className="map-bottom">
                <span>EAU</span>
                <span>ÉLECTRICITÉ</span>
                <span>ASSAINISSEMENT</span>
              </div>

            </div>

          </div>

        </div>

      </section>
            {/* CITIZEN SERVICES */}
      <section className="citizen-section" id="citizen-services">

        <div className="container">

          <div className="citizen-header">

            <div>
              <div className="section-label">
                ESPACE CITOYEN
                <span></span>
              </div>

              <h2>
                Besoin d’un
                <br />
                <strong>service ?</strong>
              </h2>
            </div>

            <p>
              Retrouvez rapidement les principales démarches
              et services proposés par la SRM Guelmim-Oued Noun.
            </p>

          </div>


          <div className="citizen-grid">

            <a
              href="https://www.fatourati.ma/FatLite/ma/MTC/formulaire?cid=01&fid=1170"
              className="citizen-card featured"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="citizen-number">01</span>

              <div className="citizen-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M7 14h3" />
                </svg>
              </div>

              <div className="citizen-card-content">
                <h3>Payer ma facture</h3>
                <p>
                  Accédez rapidement à vos services
                  de paiement.
                </p>
              </div>

              <span className="citizen-arrow">↗</span>
            </a>


            <a href="#panne" className="citizen-card">
              <span className="citizen-number">02</span>

              <div className="citizen-icon">ϟ</div>

              <div className="citizen-card-content">
                <h3>Déclarer une panne</h3>
                <p>
                  Signalez une interruption ou
                  un incident sur le réseau.
                </p>
              </div>

              <span className="citizen-arrow">↗</span>
            </a>


            <a href="#reclamation" className="citizen-card">
              <span className="citizen-number">03</span>

              <div className="citizen-icon">!</div>

              <div className="citizen-card-content">
                <h3>Déposer une réclamation</h3>
                <p>
                  Faites-nous part de votre demande
                  ou de votre réclamation.
                </p>
              </div>

              <span className="citizen-arrow">↗</span>
            </a>


            <a href="#branchement" className="citizen-card">
              <span className="citizen-number">04</span>

              <div className="citizen-icon">+</div>

              <div className="citizen-card-content">
                <h3>Demander un branchement</h3>
                <p>
                  Découvrez les démarches nécessaires
                  à votre raccordement.
                </p>
              </div>

              <span className="citizen-arrow">↗</span>
            </a>


            <a href="#suivi" className="citizen-card">
              <span className="citizen-number">05</span>

              <div className="citizen-icon">⌁</div>

              <div className="citizen-card-content">
                <h3>Suivre une demande</h3>
                <p>
                  Consultez l’avancement de
                  vos démarches.
                </p>
              </div>

              <span className="citizen-arrow">↗</span>
            </a>


            <a href="#contact" className="citizen-card">
              <span className="citizen-number">06</span>

              <div className="citizen-icon">→</div>

              <div className="citizen-card-content">
                <h3>Contacter la SRM</h3>
                <p>
                  Une question ? Notre équipe
                  est à votre écoute.
                </p>
              </div>

              <span className="citizen-arrow">↗</span>
            </a>

          </div>

        </div>

      </section>
            {/* ACTUALITES & PROJETS */}
      <section className="news-section" id="news">

        <div className="container">

          <div className="news-heading">

            <div>
              <div className="section-label">
                ACTUALITÉS & PROJETS
                <span></span>
              </div>

              <h2>
                Ce qui fait
                <br />
                <strong>avancer la région.</strong>
              </h2>
            </div>

            <a href="#all-news" className="news-all-link">
              Voir toutes les actualités
              <span>→</span>
            </a>

          </div>


          <div className="news-layout">

            {/* FEATURED PROJECT */}
            <article className="featured-project">

              <div className="project-top">
                <span>PROJET</span>
                <span>01</span>
              </div>

              <div className="project-visual">

                <div className="project-ring ring-one"></div>
                <div className="project-ring ring-two"></div>
                <div className="project-line"></div>

                <div className="project-center">
                  <span>SRM</span>
                  <strong>GO</strong>
                </div>

              </div>

              <div className="project-content">

                <span className="project-category">
                  INFRASTRUCTURES
                </span>

                <h3>
                  Des infrastructures au service
                  du développement régional.
                </h3>

                <p>
                  Découvrez les projets, les interventions
                  et les initiatives qui accompagnent
                  l’évolution de nos territoires.
                </p>

                <a href="#project" className="project-link">
                  Découvrir le projet
                  <span>↗</span>
                </a>

              </div>

            </article>


            {/* NEWS */}
            <div className="news-list">

              <article className="news-item">

                <div className="news-meta">
                  <span>01</span>
                  <span>ACTUALITÉ</span>
                </div>

                <h3>
                  Les dernières informations de la SRM
                </h3>

                <p>
                  Retrouvez les communications et informations
                  importantes destinées aux citoyens.
                </p>

                <a href="#news-1">
                  Lire l’actualité
                  <span>→</span>
                </a>

              </article>


              <article className="news-item">

                <div className="news-meta">
                  <span>02</span>
                  <span>COMMUNIQUÉ</span>
                </div>

                <h3>
                  Informations et avis aux usagers
                </h3>

                <p>
                  Consultez les annonces, interventions
                  et informations utiles.
                </p>

                <a href="#news-2">
                  Lire le communiqué
                  <span>→</span>
                </a>

              </article>


              <article className="news-item">

                <div className="news-meta">
                  <span>03</span>
                  <span>PROJET</span>
                </div>

                <h3>
                  Des services pensés pour demain
                </h3>

                <p>
                  Suivez les initiatives qui contribuent
                  à une région plus connectée et durable.
                </p>

                <a href="#news-3">
                  Découvrir
                  <span>→</span>
                </a>

              </article>

            </div>

          </div>

        </div>

      </section>
            {/* KEY FIGURES */}
      <section className="figures-section">

        <div className="container">

          <div className="figures-header">

            <div className="section-label">
              SRM EN CHIFFRES
              <span></span>
            </div>

            <h2>
              Un service de proximité,
              <br />
              <strong>à l’échelle d’une région.</strong>
            </h2>

          </div>


          <div className="figures-grid">

            <div className="figure-item">
              <span className="figure-value">4</span>
              <span className="figure-label">
                Provinces couvertes
              </span>
            </div>

            <div className="figure-item">
              <span className="figure-value">3</span>
              <span className="figure-label">
                Services essentiels
              </span>
            </div>

            <div className="figure-item">
              <span className="figure-value">24/7</span>
              <span className="figure-label">
                Continuité de service
              </span>
            </div>

            <div className="figure-item">
              <span className="figure-value">1</span>
              <span className="figure-label">
                Région · Un engagement
              </span>
            </div>

          </div>


          <div className="figures-note">
            <span>EAU</span>
            <span>ÉLECTRICITÉ</span>
            <span>ASSAINISSEMENT</span>
            <span>GUELMIM — OUED NOUN</span>
          </div>

        </div>

      </section>

      <SiteFooter />
    </main>
  );
}



