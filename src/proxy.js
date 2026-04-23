import { NextResponse } from "next/server";
import createClient from "@/lib/supabase/server";

export async function proxy(request) {
  let res = NextResponse.next();

  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const pathname = request.nextUrl.pathname;

    if (pathname.startsWith("/aluno") || pathname.startsWith("/professor")) {
      if (!user) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (!profile) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      if (pathname.startsWith("/aluno") && profile.role !== "student") {
        return NextResponse.redirect(new URL("/professor", request.url));
      }

      if (pathname.startsWith("/professor") && profile.role !== "teacher") {
        return NextResponse.redirect(new URL("/aluno", request.url));
      }
    }
    return res;
  } catch (err) {
    console.log("TRY CATCH:", err);
    return res;
  }
}

export const config = {
  matcher: ["/aluno/:path*", "/professor/:path*"],
};
