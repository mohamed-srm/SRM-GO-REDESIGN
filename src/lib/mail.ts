import nodemailer from "nodemailer";

const smtpPort = Number(process.env.SMTP_PORT || 587);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: smtpPort,
  secure: smtpPort === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendPasswordResetEmail(
  to: string,
  resetUrl: string
) {
  const from = process.env.SMTP_FROM;

  if (!from) {
    throw new Error("SMTP_FROM is not configured.");
  }

  await transporter.sendMail({
    from,
    to,
    subject: "Réinitialisation de votre mot de passe — SRM GO",
    text: `Bonjour,

Une demande de réinitialisation de mot de passe a été effectuée pour votre espace client SRM.

Utilisez ce lien pour choisir un nouveau mot de passe :
${resetUrl}

Ce lien est valable pendant une durée limitée.

Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet email.

SRM Guelmim – Oued Noun`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#062d46">
        <h2>Réinitialisation de votre mot de passe</h2>
        <p>Une demande de réinitialisation a été effectuée pour votre espace client SRM.</p>
        <p>
          <a
            href="${resetUrl}"
            style="display:inline-block;background:#087fc1;color:#fff;padding:14px 22px;text-decoration:none;border-radius:6px"
          >
            Réinitialiser mon mot de passe
          </a>
        </p>
        <p>Ce lien est valable pendant une durée limitée.</p>
        <p>Si vous n'êtes pas à l'origine de cette demande, ignorez simplement cet email.</p>
        <p>SRM Guelmim – Oued Noun</p>
      </div>
    `,
  });
}
