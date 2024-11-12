import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
    "/profile", 
    "/predict-match",
    "/team-analytics",
    "/tournament-simulator",
];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");

  const isProtectedRoute = protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route));

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

// don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  }
