"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

export default function ResetPasswordForm({
  token,
}: {
  token: string;
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { language } = useLanguage();

  const t = {
    visualEyebrow:
      language === "ar"
        ? "فضاء الزبون"
        : language === "ber"
          ? "ⴰⵙⵏⵓⵔⴰⵢ"
          : "ESPACE CLIENT",

    title1:
      language === "ar"
        ? "أمّنوا"
        : language === "ber"
          ? "ⵙⵙⵉⵔⵉ"
          : "Sécurisez votre",

    title2:
      language === "ar"
        ? "ولوجكم."
        : language === "ber"
          ? "ⵓⵙⴰⵎⵎⵓ."
          : "accès.",

    visualDescription:
      language === "ar"
        ? "اختاروا كلمة مرور جديدة لحماية فضاء الزبون الخاص بكم."
        : language === "ber"
          ? "ⵙⵙⵏ ⵜⴰⵔⵔⴰⵙⵜ ⵜⴰⵎⴰⵢⵏⵓⵜ ⴰⴷ ⵜⴼⵔⵓⴷ ⵓⵙⵏⵓⵔⴰⵢ ⵏⵏⴽ."
          : "Choisissez un nouveau mot de passe pour sécuriser votre espace client.",

    back:
      language === "ar"
        ? "← العودة إلى تسجيل الدخول"
        : language === "ber"
          ? "← ⵓⵔⴰⵔ ⵙ ⵓⴽⵛⵎ"
          : "← Retour à la connexion",

    eyebrow:
      language === "ar"
        ? "كلمة مرور جديدة"
        : language === "ber"
          ? "ⵜⴰⵔⵔⴰⵙⵜ ⵜⴰⵎⴰⵢⵏⵓⵜ"
          : "NOUVEAU MOT DE PASSE",

    title:
      language === "ar"
        ? "إعادة التعيين"
        : language === "ber"
          ? "ⴰⵍⵙ"
          : "Réinitialiser",

    intro:
      language === "ar"
        ? "أدخلوا كلمة المرور الجديدة."
        : language === "ber"
          ? "ⴽⵛⵎ ⵜⴰⵔⵔⴰⵙⵜ ⵜⴰⵎⴰⵢⵏⵓⵜ."
          : "Entrez votre nouveau mot de passe.",

    password:
      language === "ar"
        ? "كلمة المرور الجديدة"
        : language === "ber"
          ? "ⵜⴰⵔⵔⴰⵙⵜ ⵜⴰⵎⴰⵢⵏⵓⵜ"
          : "Nouveau mot de passe",

    passwordPlaceholder:
      language === "ar"
        ? "8 أحرف على الأقل"
        : language === "ber"
          ? "ⵎⴰⵔⵔⴰ 8 ⵏ ⵉⵙⴽⴽⵉⵍⵏ"
          : "Minimum 8 caractères",

    confirm:
      language === "ar"
        ? "تأكيد كلمة المرور"
        : language === "ber"
          ? "ⵙⵙⵏ ⵜⴰⵔⵔⴰⵙⵜ"
          : "Confirmer le mot de passe",

    confirmPlaceholder:
      language === "ar"
        ? "أعيدوا كتابة كلمة المرور"
        : language === "ber"
          ? "ⴰⵍⵙ ⵓⵔⴰⵔ ⵜⴰⵔⵔⴰⵙⵜ"
          : "Répétez le mot de passe",

    submit:
      language === "ar"
        ? "تعديل كلمة المرور"
        : language === "ber"
          ? "ⵙⵙⵏ ⵜⴰⵔⵔⴰⵙⵜ"
          : "Modifier le mot de passe",

    loading:
      language === "ar"
        ? "جارٍ المعالجة..."
        : language === "ber"
          ? "ⵉⵜⵜⵡⴰⵙⵏ..."
          : "Traitement...",

    invalidToken:
      language === "ar"
        ? "رابط الاسترجاع غير صالح."
        : language === "ber"
          ? "ⴰⵙⵖⵏ ⵓⵔ ⵉⵎⵍⵉ."
          : "Lien de récupération invalide.",

    weak:
      language === "ar"
        ? "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل."
        : language === "ber"
          ? "ⵜⴰⵔⵔⴰⵙⵜ ⵉⵍⴰ ⴰⴷ ⵜⴳ 8 ⵏ ⵉⵙⴽⴽⵉⵍⵏ."
          : "Le mot de passe doit contenir au moins 8 caractères.",

    mismatch:
      language === "ar"
        ? "كلمتا المرور غير متطابقتين."
        : language === "ber"
          ? "ⵜⵉⵔⵔⴰⵙⵉⵏ ⵓⵔ ⵎⵎⵉⴷⵏⵜ."
          : "Les mots de passe ne correspondent pas.",

    success:
      language === "ar"
        ? "تم تغيير كلمة المرور بنجاح."
        : language === "ber"
          ? "ⵜⵜⵓⵙⵙⵏ ⵜⴰⵔⵔⴰⵙⵜ ⵙ ⵓⵙⵏⴼⵍ."
          : "Mot de passe modifié avec succès.",

    serverError:
      language === "ar"
        ? "تعذر الاتصال بالخادم."
        : language === "ber"
          ? "ⵓⵔ ⵉⵎⴽ ⴰⴷ ⵏⵙⵙⵏ ⴷ ⵓⵙⵏⵓⵔ."
          : "Impossible de contacter le serveur.",
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!token) {
      setMessage(t.invalidToken);
      return;
    }

    if (password.length < 8) {
      setMessage(t.weak);
      return;
    }

    if (password !== confirmPassword) {
      setMessage(t.mismatch);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Une erreur est survenue.");
        return;
      }

      setMessage(t.success);

      setTimeout(() => {
        window.location.href = "/espace-client";
      }, 1200);
    } catch {
      setMessage(t.serverError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="client-page">
      <div className="client-page__visual">
        <div className="client-page__brand">
          <Link href="/">
            <img
              src="/logo-srm.png"
              alt="SRM Guelmim Oued Noun"
            />
          </Link>
        </div>

        <div className="client-page__visual-content">
          <span>{t.visualEyebrow}</span>

          <h1>
            {t.title1}
            <br />
            <strong>{t.title2}</strong>
          </h1>

          <p>{t.visualDescription}</p>
        </div>
      </div>

      <div className="client-page__form-area">
        <Link
          href="/espace-client"
          className="client-page__back"
        >
          {t.back}
        </Link>

        <div className="client-form">
          <div className="client-form__eyebrow">
            {t.eyebrow}
          </div>

          <h2>{t.title}</h2>

          <p className="client-form__intro">
            {t.intro}
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="password">
              {t.password}
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder={t.passwordPlaceholder}
              autoComplete="new-password"
              required
            />

            <label htmlFor="confirmPassword">
              {t.confirm}
            </label>

            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
              placeholder={t.confirmPlaceholder}
              autoComplete="new-password"
              required
            />

            <button
              type="submit"
              className="client-form__submit"
              disabled={loading}
            >
              {loading ? t.loading : t.submit}
              {!loading && <span>→</span>}
            </button>
          </form>

          {message && (
            <p
              style={{
                marginTop: "18px",
                color: "var(--blue)",
                fontSize: "13px",
                lineHeight: 1.6,
              }}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
