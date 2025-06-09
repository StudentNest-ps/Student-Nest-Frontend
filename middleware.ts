import { NextRequest, NextResponse } from 'next/server';
import { Role } from './module/@types';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('auth-token')?.value;
  const url = req.nextUrl;
  const pathname = url.pathname;
  const role = req.cookies.get('role')?.value;
  // Pages that require authentication
  const protectedRoutes = ['/apartments', '/landlords'];

  // Auth pages that should redirect if user is already logged in
  const authPages = ['/signin', '/signup'];

  // Redirect authenticated users away from auth pages
  if (authPages.includes(pathname) && token) {
    return NextResponse.redirect(new URL('/already-signed', req.url));
  }

  // Redirect admin users from home page to dashboard
  if (pathname === '/' && token) {
    if (role === Role.ADMIN) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  // Redirect unauthenticated users trying to access protected routes
  if (protectedRoutes.includes(pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    const role = req.cookies.get('role')?.value;

    // No role info? treat as unauthenticated
    if (!role) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    // Optional: redirect to specific dashboard if trying to access wrong page
    if (pathname === '/apartments' && role !== Role.STUDENT) {
      return roleBasedRedirect(req, role);
    }

    if (pathname === '/landlords' && role !== Role.OWNER) {
      return roleBasedRedirect(req, role);
    }
  }

  if (pathname == '/' && role == Role.OWNER) {
    return NextResponse.redirect(new URL('/dashboard-owner', req.url));
  }

  if (pathname == '/' && role == Role.ADMIN) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

// Helper to redirect based on role
function roleBasedRedirect(req: NextRequest, role: string): NextResponse {
  const base = req.nextUrl.origin;

  switch (role) {
    case Role.ADMIN:
      return NextResponse.redirect(`${base}/dashboard`);
    case Role.OWNER:
      return NextResponse.redirect(`${base}/dashboard-owner`);
    case Role.STUDENT:
      return NextResponse.redirect(`${base}/apartments`);
    default:
      return NextResponse.redirect(`${base}/signin`);
  }
}

export const config = {
  matcher: ['/', '/apartments', '/landlords', '/signin', '/signup'],
};
