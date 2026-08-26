import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/session";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/espace-client");
  }

  const stats = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      identifier: true,
      createdAt: true,
      _count: {
        select: {
          demandes: true,
          reclamations: true,
        },
      },
    },
  });

  if (!stats) {
    redirect("/espace-client");
  }

  return (
    <main className="dashboard-page dashboard-page--home">
      <div className="dashboard-home-container">
        <header className="dashboard-home-header">
          <div>
            <span className="dashboard-label">ESPACE CLIENT</span>

            <h1>
              Bonjour, <span>{stats.identifier}</span>.
            </h1>

            <p>
              Retrouvez vos services, vos demandes et vos
              réclamations au même endroit.
            </p>
          </div>

          <div className="dashboard-home-actions">
            <Link href="/" className="dashboard-back">
              ← Retour au site
            </Link>

            <LogoutButton />
          </div>
        </header>

        <section className="dashboard-welcome">
          <div className="dashboard-welcome-main">
            <div className="dashboard-avatar">
              {stats.identifier.charAt(0).toUpperCase()}
            </div>

            <div>
              <span className="dashboard-welcome-status">
                <i></i>
                COMPTE ACTIF
              </span>

              <h2>Votre espace client</h2>

              <p>
                Gérez facilement vos démarches auprès de la SRM
                Guelmim – Oued Noun.
              </p>
            </div>
          </div>

          <div className="dashboard-welcome-id">
            <span>IDENTIFIANT CLIENT</span>
            <strong>#{String(user.id).padStart(5, "0")}</strong>
          </div>
        </section>

        <section className="dashboard-service-grid">
          <Link
            href="/espace-client/factures"
            className="dashboard-service-card dashboard-service-card--blue"
          >
            <div className="dashboard-service-top">
              <span>01</span>
              <span className="dashboard-service-icon">↗</span>
            </div>

            <div>
              <span className="dashboard-service-label">
                SERVICE
              </span>

              <h2>Mes factures</h2>

              <p>
                Consultez et payez votre facture en ligne via
                Fatourati.
              </p>
            </div>

            <div className="dashboard-service-bottom">
              <span>Accéder au service</span>
              <strong>→</strong>
            </div>
          </Link>

          <Link
            href="/espace-client/demandes"
            className="dashboard-service-card"
          >
            <div className="dashboard-service-top">
              <span>02</span>
              <span className="dashboard-service-icon">→</span>
            </div>

            <div>
              <span className="dashboard-service-label">
                SERVICE
              </span>

              <h2>Mes demandes</h2>

              <p>
                Suivez vos démarches et consultez leurs
                références.
              </p>
            </div>

            <div className="dashboard-service-bottom">
              <span>{stats._count.demandes} demande(s)</span>
              <strong>→</strong>
            </div>
          </Link>

          <Link
            href="/espace-client/reclamations"
            className="dashboard-service-card"
          >
            <div className="dashboard-service-top">
              <span>03</span>
              <span className="dashboard-service-icon">→</span>
            </div>

            <div>
              <span className="dashboard-service-label">
                SERVICE
              </span>

              <h2>Mes réclamations</h2>

              <p>
                Déposez une réclamation et suivez son évolution.
              </p>
            </div>

            <div className="dashboard-service-bottom">
              <span>
                {stats._count.reclamations} réclamation(s)
              </span>
              <strong>→</strong>
            </div>
          </Link>

          <Link
            href="/espace-client/profil"
            className="dashboard-service-card"
          >
            <div className="dashboard-service-top">
              <span>04</span>
              <span className="dashboard-service-icon">→</span>
            </div>

            <div>
              <span className="dashboard-service-label">
                COMPTE
              </span>

              <h2>Mon profil</h2>

              <p>
                Gérez votre compte et vos paramètres de sécurité.
              </p>
            </div>

            <div className="dashboard-service-bottom">
              <span>Compte actif</span>
              <strong>→</strong>
            </div>
          </Link>
        </section>

        <section className="dashboard-overview">
          <div className="dashboard-overview-card">
            <div>
              <span className="dashboard-overview-label">
                MES DÉMARCHES
              </span>

              <h3>Votre activité</h3>
            </div>

            <div className="dashboard-overview-stats">
              <div>
                <strong>{stats._count.demandes}</strong>
                <span>Demandes</span>
              </div>

              <div>
                <strong>{stats._count.reclamations}</strong>
                <span>Réclamations</span>
              </div>

              <div>
                <strong>01</strong>
                <span>Compte</span>
              </div>
            </div>
          </div>

          <div className="dashboard-overview-card dashboard-overview-card--help">
            <div>
              <span className="dashboard-overview-label">
                BESOIN D'AIDE ?
              </span>

              <h3>Notre équipe reste à votre écoute.</h3>

              <p>
                Pour toute question concernant votre espace
                client, contactez la SRM Guelmim – Oued Noun.
              </p>
            </div>

            <a
              href="tel:0800002026"
              className="dashboard-help-button"
            >
              08 00 00 20 26
              <span>→</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
