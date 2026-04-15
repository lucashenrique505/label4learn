import createClient from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import StudentDashboardClient from "./client";

const StudentDashboardPage = async () => {
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
  if (profile.role === "teacher") {
    redirect("/professor");
  }

  return <StudentDashboardClient user={user} />;
};

export default StudentDashboardPage;
