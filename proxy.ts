import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const { pathname } = req.nextUrl;

        // Always allow auth routes, login, register
        if (
          pathname.startsWith("/api/auth") ||
          pathname === "/login" ||
          pathname === "/register"
        ) return true;

        // Public pages
        if (
          pathname === "/" ||
          pathname.startsWith("/men") ||
          pathname.startsWith("/women") ||
          pathname.startsWith("/product") ||
          pathname.startsWith("/about") ||
          pathname.startsWith("/wishlist") ||
          pathname.startsWith("/api/product")
        ) return true;

        // Admin and protected routes require a token
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};