import createClient from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import TeacherDashboardClient from "./client";

const TeacherDashboardPage = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/login");
  }
  if (profile.role === "student") {
    redirect("/aluno");
  }

  return <TeacherDashboardClient user={user} />;
};

export default TeacherDashboardPage;
