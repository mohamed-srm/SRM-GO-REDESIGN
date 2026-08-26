"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "../../../context/LanguageContext";

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { language } = useLanguage();

  const t = {
    client:
      language === "ar"
        ? "فضاء الزبون"
        : language === "ber"
          ? "ⴰⵙⵏⵓⵔⴰⵢ"
          : "ESPACE CLIENT",

    title1:
      language === "ar"
        ? "احموا"
        : language === "ber"
          ? "ⵃⵎⵓ"
          : "Protégez votre",

    title2:
      language === "ar"
        ? "حسابكم."
        : language === "ber"
          ? "ⴰⵙⵏⵓⵔⴰⵢ ⵏⵏⴽ."
          : "compte.",

    visualText:
      language === "ar"
        ? "غيّروا كلمة المرور بانتظام لتعزيز أمان فضاء الزبون الخاص بكم."
        : language === "ber"
          ? "ⵙⵙⵏⴼⵍ ⵜⴰⵔⵔⴰⵙⵜ ⵏⵏⴽ ⵙ ⵓⵣⵎⵣ ⴰⴼⴰ ⴰⴷ ⵜⵙⵙⵏⴷ ⵜⵉⵙⵙⴰⵙ."
          : "Modifiez votre mot de passe régulièrement pour renforcer la sécurité de votre espace client.",

    back:
      language === "ar"
        ? "← العودة إلى الملف الشخصي"
        : language === "ber"
          ? "← ⵓⵔⴰⵔ ⵙ ⵓⵙⵏⴰⵙ"
          : "← Retour au profil",

    security:
      language === "ar"
        ? "الأمان"
        : language === "ber"
          ? "ⵜⵉⵙⵙⴰⵙ"
          : "SÉCURITÉ",

    formTitle:
      language === "ar"
        ? "تغيير كلمة المرور"
        : language === "ber"
          ? "ⵙⵙⵏⴼⵍ ⵜⴰⵔⵔⴰⵙⵜ"
          : "Modifier le mot de passe",

    intro:
      language === "ar"
        ? "أدخلوا كلمة المرور الحالية ثم اختاروا كلمة مرور جديدة."
        : language === "ber"
          ? "ⴽⵛⵎ ⵜⴰⵔⵔⴰⵙⵜ ⵜⴰⵎⴰⵔⵓⵜ ⴷ ⵙⵙⵏⴼⵍ ⵜⵜ ⵙ ⵜⵎⴰⵢⵏⵓⵜ."
          : "Entrez votre ancien mot de passe puis choisissez le nouveau.",

    current:
      language === "ar"
        ? "كلمة المرور الحالية"
        : language === "ber"
          ? "ⵜⴰⵔⵔⴰⵙⵜ ⵜⴰⵎⴰⵔⵓⵜ"
          : "Mot de passe actuel",

    newPassword:
      language === "ar"
        ? "كلمة المرور الجديدة"
        : language === "ber"
          ? "ⵜⴰⵔⵔⴰⵙⵜ ⵜⴰⵎⴰⵢⵏⵓⵜ"
          : "Nouveau mot de passe",

    confirm:
      language === "ar"
        ? "تأكيد كلمة المرور الجديدة"
        : language === "ber"
          ? "ⵙⵙⵏ ⵜⴰⵔⵔⴰⵙⵜ ⵜⴰⵎⴰⵢⵏⵓⵜ"
          : "Confirmer le nouveau mot de passe",

    minimum:
      language === "ar"
        ? "8 أحرف على الأقل"
        : language === "ber"
          ? "ⵎⴰⵔⵔⴰ 8 ⵏ ⵉⵙⴽⴽⵉⵍⵏ"
          : "Minimum 8 caractères",

    loading:
      language === "ar"
        ? "جارٍ التعديل..."
        : language === "ber"
          ? "ⵉⵜⵜⵡⴰⵙⵙⵏ..."
          : "Modification...",

    submit:
      language === "ar"
        ? "تغيير كلمة المرور"
        : language === "ber"
          ? "ⵙⵙⵏⴼⵍ ⵜⴰⵔⵔⴰⵙⵜ"
          : "Modifier le mot de passe",

    weak:
      language === "ar"
        ? "يجب أن تتكون كلمة المرور الجديدة من 8 أحرف على الأقل."
        : language === "ber"
          ? "ⵜⴰⵔⵔⴰⵙⵜ ⵜⴰⵎⴰⵢⵏⵓⵜ ⵉⵍⴰ ⴰⴷ ⵜⴳ 8 ⵏ ⵉⵙⴽⴽⵉⵍⵏ."
          : "Le nouveau mot de passe doit contenir au moins 8 caractères.",

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
          : "Votre mot de passe a été modifié avec succès.",

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

    if (newPassword.length < 8) {
      setMessage(t.weak);
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage(t.mismatch);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/profile/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || t.serverError);
        return;
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setMessage(t.success);
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
          <span>{t.client}</span>

          <h1>
            {t.title1}
            <br />
            <strong>{t.title2}</strong>
          </h1>

          <p>{t.visualText}</p>
        </div>
      </div>

      <div className="client-page__form-area">
        <Link
          href="/espace-client/profil"
          className="client-page__back"
        >
          {t.back}
        </Link>

        <div className="client-form">
          <div className="client-form__eyebrow">
            {t.security}
          </div>

          <h2>{t.formTitle}</h2>

          <p className="client-form__intro">
            {t.intro}
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="currentPassword">
              {t.current}
            </label>

            <input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(event) =>
                setCurrentPassword(event.target.value)
              }
              autoComplete="current-password"
              required
            />

            <label htmlFor="newPassword">
              {t.newPassword}
            </label>

            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(event) =>
                setNewPassword(event.target.value)
              }
              placeholder={t.minimum}
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
