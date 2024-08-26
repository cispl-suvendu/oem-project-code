import { NextResponse, NextRequest } from "next/server";
import { jwtToken } from "src/app/services/auth";

const authUrl = ["/login", "/register", "/forgot-password"];
const excludePath = [
  "/api/users/signup",
  "/api/users/login",
  "/api/users/forgot-password",
];
const adminPath = [
  "/dashboard",
  "/categories",
  "/leaderboard",
  "/profile",
  "/questions",
  "/users",
  "/exams",
];
const userPath = [
  "/userdashboard",
  "/userprofile",
];

// Function to check if a path matches any pattern in a list
const matchesAny = (path: string, patterns: any) => {
  return patterns.some(pattern => new RegExp(`^${pattern}`).test(path));
};

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const currentPath = request.nextUrl.pathname;

  // Handle API routes
  if (currentPath.includes("/api/")) {
    if (excludePath.includes(currentPath)) {
      return NextResponse.next();
    }

    let headerToken = request.headers.get("Authorization");
    if (!headerToken) {
      return NextResponse.json(
        {
          message: "Please add an authorized token",
          success: false,
        },
        { status: 401 }
      );
    }

    headerToken = headerToken.split("Bearer ")[1];
    const jwttoken = new jwtToken();
    const user = await jwttoken.valid(headerToken);

    if (!user) {
      return NextResponse.json(
        {
          message: "Unauthorized",
          success: false,
        },
        { status: 401 }
      );
    } else if (typeof user === "string") {
      return NextResponse.json(
        {
          message: user,
          success: false,
        },
        { status: 401 }
      );
    } else {
      return NextResponse.next();
    }
  }

  // Handle non-API routes
  const jwttoken = new jwtToken();
  const user = await jwttoken.valid(token?.value);

  if (!token) {
    if (matchesAny(currentPath, adminPath) || matchesAny(currentPath, userPath)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    if (Number(process.env.ADMIN_ROLE) !== user?.role && matchesAny(currentPath, adminPath)) {
      return NextResponse.redirect(new URL("/userdashboard", request.url));
    }

    if (Number(process.env.USER_ROLE) !== user?.role && matchesAny(currentPath, userPath)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (matchesAny(currentPath, authUrl)) {
      if (user.role === Number(process.env.ADMIN_ROLE)) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      } else if (user.role === Number(process.env.USER_ROLE)) {
        return NextResponse.redirect(new URL("/userdashboard", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
