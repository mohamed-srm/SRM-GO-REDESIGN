"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

export default function RegisterPage() {
  const [form, setForm] = useState({
    identifier: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
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
        ? "انضموا إلى"
        : language === "ber"
          ? "ⵔⵎⴷ ⴷ"
          : "Rejoignez votre",

    visualTitle2:
      language === "ar"
        ? "فضاء الزبون."
        : language === "ber"
          ? "ⴰⵙⵏⵓⵔⴰⵢ."
          : "espace client.",

    visualDescription:
      language === "ar"
        ? "أنشئوا حسابكم للوصول إلى طلباتكم وخدماتكم في مكان واحد."
        : language === "ber"
          ? "ⵙⵏⵓⵔⴰⵢ ⵢⴰⵏ ⵓⵙⵏⵓⵔⴰⵢ ⴰⴷ ⵜⵣⵔⵉⴷ ⵉⵙⵏⴰⵙⵏ ⴷ ⵉⵎⵙⵙⵔⵏ."
          : "Créez votre compte pour retrouver vos démarches, vos demandes et vos services au même endroit.",

    back:
      language === "ar"
        ? "← العودة إلى تسجيل الدخول"
        : language === "ber"
          ? "← ⵓⵔⴰⵔ ⵙ ⵓⴽⵛⵎ"
          : "← Retour à la connexion",

    eyebrow:
      language === "ar"
        ? "التسجيل"
        : language === "ber"
          ? "ⴰⵙⵏⵓⵔⴰⵢ"
          : "INSCRIPTION",

    title:
      language === "ar"
        ? "إنشاء حساب"
        : language === "ber"
          ? "ⵙⵏⵓⵔⴰⵢ ⵢⴰⵏ ⵓⵙⵏⵓⵔⴰⵢ"
          : "Créer un compte",

    intro:
      language === "ar"
        ? "أنشئوا فضاء الزبون الخاص بكم للوصول إلى خدمات SRM."
        : language === "ber"
          ? "ⵙⵏⵓⵔⴰⵢ ⵓⵙⵏⵓⵔⴰⵢ ⵏⵏⴽ ⴰⴼⴰ ⴰⴷ ⵜⵔⵉⴷ ⵉⵎⵙⵙⵔⵏ."
          : "Créez votre espace client SRM pour accéder à vos services.",

    identifier: language === "ar" ? "معرّف الزبون" : language === "ber" ? "ⴰⵎⵎⴰⵍ" : "Identifiant client",
    identifierPlaceholder: language === "ar" ? "المعرّف الخاص بكم" : language === "ber" ? "ⴰⵎⵎⴰⵍ ⵏⵏⴽ" : "Votre identifiant",

    fullName: language === "ar" ? "الاسم الكامل" : language === "ber" ? "ⵉⵙⵎ ⵓⵙⴷⵉⵙ" : "Nom complet",
    fullNamePlaceholder: language === "ar" ? "الاسم والنسب" : language === "ber" ? "ⵉⵙⵎ ⴷ ⵙⵙⵎ" : "Nom et prénom",

    email: language === "ar" ? "البريد الإلكتروني" : language === "ber" ? "ⵉⵎⴰⵢⵍ" : "Adresse e-mail",

    phone: language === "ar" ? "الهاتف" : language === "ber" ? "ⵜⵉⵍⵉⴼⵓⵏ" : "Téléphone",

    address: language === "ar" ? "العنوان" : language === "ber" ? "ⵜⴰⵏ⎺ⵎⵎⵉⵔⵜ" : "Adresse",

    addressPlaceholder: language === "ar" ? "عنوانكم" : language === "ber" ? "ⵜⴰⵏⵎⵎⵉⵔⵜ ⵏⵏⴽ" : "Votre adresse",

    password: language === "ar" ? "كلمة المرور" : language === "ber" ? "ⵜⴰⵔⵔⴰⵙⵜ" : "Mot de passe",

    passwordPlaceholder: language === "ar" ? "8 أحرف على الأقل" : language === "ber" ? "ⵎⴰⵔⵔⴰ 8 ⵏ ⵉⵙⴽⴽⵉⵍⵏ" : "Minimum 8 caractères",

    confirmPassword:
      language === "ar"
        ? "تأكيد كلمة المرور"
        : language === "ber"
          ? "ⵙⵙⵏ ⵜⴰⵔⵔⴰⵙⵜ"
          : "Confirmer le mot de passe",

    confirmPasswordPlaceholder:
      language === "ar"
        ? "أعيدوا كتابة كلمة المرور"
        : language === "ber"
          ? "ⴰⵍⵙ ⵓⵔⴰⵔ ⵜⴰⵔⵔⴰⵙⵜ"
          : "Répétez le mot de passe",

    creating:
      language === "ar"
        ? "جاري الإنشاء..."
        : language === "ber"
          ? "ⵉⵜⵜⵡⴰⵙⵏⵓⵔⴰⵢ..."
          : "Création...",

    create:
      language === "ar"
        ? "إنشاء حسابي"
        : language === "ber"
          ? "ⵙⵏⵓⵔⴰⵢ ⵓⵙⵏⵓⵔⴰⵢ"
          : "Créer mon compte",

    mismatch:
      language === "ar"
        ? "كلمتا المرور غير متطابقتين."
        : language === "ber"
          ? "ⵜⵉⵔⵔⴰⵙⵉⵏ ⵓⵔ ⵎⵎⵉⴷⵏⵜ."
          : "Les mots de passe ne correspondent pas.",

    createError:
      language === "ar"
        ? "تعذر إنشاء الحساب."
        : language === "ber"
          ? "ⵓⵔ ⵉⵎⴽ ⴰⴷ ⵙⵏⵓⵔⴰⵢ ⵓⵙⵏⵓⵔⴰⵢ."
          : "Impossible de créer le compte.",

    serverError:
      language === "ar"
        ? "تعذر الاتصال بالخادم."
        : language === "ber"
          ? "ⵓⵔ ⵉⵎⴽ ⴰⴷ ⵏⵙⵙⵏ ⴷ ⵓⵙⵏⵓⵔ."
          : "Impossible de contacter le serveur.",

    already:
      language === "ar"
        ? "لديكم حساب بالفعل؟"
        : language === "ber"
          ? "ⵉⵙ ⵖⵓⵔⴽ ⵢⴰⵏ ⵓⵙⵏⵓⵔⴰⵢ?"
          : "Vous avez déjà un compte ?",

    login:
      language === "ar"
        ? "تسجيل الدخول"
        : language === "ber"
          ? "ⴽⵛⵎ"
          : "Se connecter",
  };

  const update = (
    key: keyof typeof form,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    if (form.password !== form.confirmPassword) {
      setMessage(t.mismatch);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || t.createError);
        return;
      }

      window.location.href = "/espace-client";
    } catch {
      setMessage(t.serverError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="client-page client-register-page">
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
            <label htmlFor="identifier">
              {t.identifier}
            </label>

            <input
              id="identifier"
              type="text"
              value={form.identifier}
              onChange={(event) =>
                update("identifier", event.target.value)
              }
              placeholder={t.identifierPlaceholder}
              autoComplete="username"
              required
            />

            <label htmlFor="fullName">
              {t.fullName}
            </label>

            <input
              id="fullName"
              type="text"
              value={form.fullName}
              onChange={(event) =>
                update("fullName", event.target.value)
              }
              placeholder={t.fullNamePlaceholder}
              required
            />

            <label htmlFor="email">
              {t.email}
            </label>

            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(event) =>
                update("email", event.target.value)
              }
              placeholder="votre@email.com"
              autoComplete="email"
              required
            />

            <label htmlFor="phone">
              {t.phone}
            </label>

            <input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(event) =>
                update("phone", event.target.value)
              }
              placeholder="06 XX XX XX XX"
              autoComplete="tel"
            />

            <label htmlFor="address">
              {t.address}
            </label>

            <input
              id="address"
              type="text"
              value={form.address}
              onChange={(event) =>
                update("address", event.target.value)
              }
              placeholder={t.addressPlaceholder}
              autoComplete="street-address"
            />

            <label htmlFor="password">
              {t.password}
            </label>

            <input
              id="password"
              type="password"
              value={form.password}
              onChange={(event) =>
                update("password", event.target.value)
              }
              placeholder={t.passwordPlaceholder}
              autoComplete="new-password"
              minLength={8}
              required
            />

            <label htmlFor="confirmPassword">
              {t.confirmPassword}
            </label>

            <input
              id="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={(event) =>
                update("confirmPassword", event.target.value)
              }
              placeholder={t.confirmPasswordPlaceholder}
              autoComplete="new-password"
              minLength={8}
              required
            />

            <button
              type="submit"
              className="client-form__submit"
              disabled={loading}
            >
              {loading ? t.creating : t.create}
              {!loading && <span>→</span>}
            </button>
          </form>

          {message && (
            <p
              style={{
                marginTop: "18px",
                color: "#b42318",
                fontSize: "13px",
                lineHeight: 1.6,
              }}
            >
              {message}
            </p>
          )}

          <div className="client-form__help">
            <span>{t.already}</span>

            <Link href="/espace-client">
              {t.login}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
