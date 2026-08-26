"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function EspaceClientPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { language } = useLanguage();

  const t = {
    visualEyebrow:
      language === "ar"
        ? "فضاء الزبون"
        : language === "ber"
          ? "ⴰⵙⵏⵓⵔⴰⵢ"
          : "ESPACE CLIENT",

    visualTitle1:
      language === "ar"
        ? "خدماتكم،"
        : language === "ber"
          ? "ⵉⵎⵙⵙⵔⵏ ⵏⵏⴽ,"
          : "Vos services,",

    visualTitle2:
      language === "ar"
        ? "في مكان واحد."
        : language === "ber"
          ? "ⴷⵉ ⵢⴰⵏ ⵡⴰⵎⴰⵏ."
          : "au même endroit.",

    visualDescription:
      language === "ar"
        ? "ولوجوا إلى فضائكم الشخصي للاطلاع على طلباتكم وخدماتكم."
        : language === "ber"
          ? "ⴽⵛⵎ ⵖⵔ ⵓⵙⵏⵓⵔⴰⵢ ⵏⵏⴽ ⴰⴼⴰ ⴰⴷ ⵜⵣⵔⵉⴷ ⵉⵎⵙⵙⵔⵏ ⴷ ⵉⵙⵏⴰⵙⵏ ⵏⵏⴽ."
          : "Accédez à votre espace personnel pour retrouver vos démarches et services.",

    back:
      language === "ar"
        ? "← العودة إلى الموقع"
        : language === "ber"
          ? "← ⵓⵔⴰⵔ ⵙ ⵓⵙⵏⴰ"
          : "← Retour au site",

    eyebrow:
      language === "ar"
        ? "تسجيل الدخول"
        : language === "ber"
          ? "ⴽⵛⵎ"
          : "CONNEXION",

    welcome:
      language === "ar"
        ? "مرحباً"
        : language === "ber"
          ? "ⵉⵙⵡⵉ"
          : "Bienvenue",

    intro:
      language === "ar"
        ? "سجّلوا الدخول إلى فضاء الزبون."
        : language === "ber"
          ? "ⴽⵛⵎ ⵙ ⵖⵔ ⵓⵙⵏⵓⵔⴰⵢ ⵏ ⵓⵙⴰⵎⵓ."
          : "Connectez-vous à votre Espace Client.",

    identifier:
      language === "ar"
        ? "المعرّف"
        : language === "ber"
          ? "ⴰⵎⵎⴰⵍ"
          : "Identifiant",

    identifierPlaceholder:
      language === "ar"
        ? "المعرّف الخاص بكم"
        : language === "ber"
          ? "ⴰⵎⵎⴰⵍ ⵏⵏⴽ"
          : "Votre identifiant",

    password:
      language === "ar"
        ? "كلمة المرور"
        : language === "ber"
          ? "ⵜⴰⵔⵔⴰⵙⵜ"
          : "Mot de passe",

    passwordPlaceholder:
      language === "ar"
        ? "كلمة المرور الخاصة بكم"
        : language === "ber"
          ? "ⵜⴰⵔⵔⴰⵙⵜ ⵏⵏⴽ"
          : "Votre mot de passe",

    show:
      language === "ar"
        ? "إظهار"
        : language === "ber"
          ? "ⵙⵙⴽⵏ"
          : "Afficher",

    hide:
      language === "ar"
        ? "إخفاء"
        : language === "ber"
          ? "ⵎⵎⵏ"
          : "Masquer",

    forgot:
      language === "ar"
        ? "هل نسيتم كلمة المرور؟"
        : language === "ber"
          ? "ⵜⵙⵙⵏⴷ ⵜⴰⵔⵔⴰⵙⵜ?"
          : "Mot de passe oublié ?",

    noAccount:
      language === "ar"
        ? "ليس لديكم حساب بعد؟"
        : language === "ber"
          ? "ⵓⵔ ⵖⵓⵔⴽ ⵓⵙⵏⵓⵔⴰⵢ?"
          : "Vous n’avez pas encore de compte ?",

    create:
      language === "ar"
        ? "إنشاء حساب"
        : language === "ber"
          ? "ⵙⵏⵓⵔⴰⵢ ⵢⴰⵏ ⵓⵙⵏⵓⵔⴰⵢ"
          : "Créer un compte",

    submit:
      language === "ar"
        ? "تسجيل الدخول"
        : language === "ber"
          ? "ⴽⵛⵎ"
          : "Se connecter",

    help:
      language === "ar"
        ? "تحتاجون إلى المساعدة؟"
        : language === "ber"
          ? "ⵜⵙⵙⵓⵔⴷ ⴰⵙⵙⵉⵏ?"
          : "Besoin d'aide ?",

    error:
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

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: identifier.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || t.error);
        return;
      }

      window.location.href = "/espace-client/dashboard";
    } catch (error) {
      console.error("Login error:", error);
      alert(t.error);
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
            {t.visualTitle1}
            <br />
            <strong>{t.visualTitle2}</strong>
          </h1>

          <p>{t.visualDescription}</p>
        </div>
      </div>

      <div className="client-page__form-area">
        <Link href="/" className="client-page__back">
          {t.back}
        </Link>

        <div className="client-form">
          <div className="client-form__eyebrow">
            {t.eyebrow}
          </div>

          <h2>{t.welcome}</h2>

          <p className="client-form__intro">
            {t.intro}
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="identifier">
              {t.identifier}
            </label>

            <input
              id="identifier"
              type="text"
              value={identifier}
              onChange={(event) =>
                setIdentifier(event.target.value)
              }
              placeholder={t.identifierPlaceholder}
              autoComplete="username"
              required
            />

            <label htmlFor="password">
              {t.password}
            </label>

            <div className="client-password">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder={t.passwordPlaceholder}
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((value) => !value)
                }
              >
                {showPassword ? t.hide : t.show}
              </button>
            </div>

            <div className="client-form__options">
              <Link href="/espace-client/forgot-password">
                {t.forgot}
              </Link>
            </div>

            <div
              style={{
                marginTop: "18px",
                textAlign: "center",
                fontSize: "13px",
              }}
            >
              <span style={{ color: "var(--muted)" }}>
                {t.noAccount}
              </span>{" "}
              <Link
                href="/espace-client/register"
                style={{
                  color: "var(--blue)",
                  fontWeight: 700,
                }}
              >
                {t.create}
              </Link>
            </div>

            <button
              type="submit"
              className="client-form__submit"
            >
              {t.submit}
              <span>→</span>
            </button>
          </form>

          <div className="client-form__help">
            <span>{t.help}</span>

            <a href="tel:0800002026">
              08 00 00 20 26
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
