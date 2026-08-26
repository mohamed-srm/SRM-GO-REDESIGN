import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import FacturesContent from "./FacturesContent";

export default async function FacturesPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("srm_client_session");

  const userId = Number(session?.value);

  if (!Number.isInteger(userId) || userId <= 0) {
    redirect("/espace-client");
  }

  return (
    <main className="dashboard-page">
      <FacturesContent />
    </main>
  );
}
