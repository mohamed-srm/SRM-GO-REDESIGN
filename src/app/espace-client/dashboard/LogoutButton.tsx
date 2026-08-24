"use client";

export default function LogoutButton() {
  const handleLogout = async () => {
    const response = await fetch("/api/logout", {
      method: "POST",
    });

    if (response.ok) {
      window.location.href = "/espace-client";
    }
  };

  return (
    <button
      type="button"
      className="dashboard-logout"
      onClick={handleLogout}
    >
      Déconnexion
    </button>
  );
}
