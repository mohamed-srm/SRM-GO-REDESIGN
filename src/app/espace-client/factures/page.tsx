import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function FacturesPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("srm_client_session");

  const userId = Number(session?.value);

  if (!Number.isInteger(userId) || userId <= 0) {
    redirect("/espace-client");
  }

  return (
    <main className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <span className="dashboard-label">ESPACE CLIENT</span>

          <h1>Mes factures.</h1>

          <p>
            Consultez vos informations de facturation et accédez au paiement
            en ligne.
          </p>
        </div>

        <Link
          href="/espace-client/dashboard"
          className="dashboard-back"
        >
          ← Retour au dashboard
        </Link>
      </div>

      <section className="invoice-hero">
        <div>
          <span className="invoice-eyebrow">PAIEMENT EN LIGNE</span>

          <h2>Payez votre facture simplement.</h2>

          <p>
            Accédez à la plateforme Fatourati pour consulter votre facture
            et effectuer votre paiement en ligne.
          </p>
        </div>

        <a
          href="https://www.fatourati.ma/FatLite/ma/MTC/formulaire?cid=01&fid=1170"
          target="_blank"
          rel="noopener noreferrer"
          className="invoice-pay-button"
        >
          Payer ma facture
          <span>↗</span>
        </a>
      </section>

      <section className="invoice-grid">
        <article className="invoice-card invoice-card--blue">
          <span className="invoice-card-number">01</span>

          <span className="invoice-card-label">FACTURATION</span>

          <h2>Accéder à ma facture</h2>

          <p>
            Utilisez Fatourati pour consulter les informations de votre
            facture et procéder au paiement.
          </p>

          <a
            href="https://www.fatourati.ma/FatLite/ma/MTC/formulaire?cid=01&fid=1170"
            target="_blank"
            rel="noopener noreferrer"
            className="invoice-card-link"
          >
            Ouvrir Fatourati
            <span>↗</span>
          </a>
        </article>

        <article className="invoice-card">
          <span className="invoice-card-number">02</span>

          <span className="invoice-card-label">ASSISTANCE</span>

          <h2>Besoin d'aide ?</h2>

          <p>
            Pour toute question concernant votre facture ou votre paiement,
            contactez la SRM Guelmim – Oued Noun.
          </p>

          <a
            href="tel:0800002026"
            className="invoice-card-link"
          >
            08 00 00 20 26
            <span>→</span>
          </a>
        </article>
      </section>
    </main>
  );
}
