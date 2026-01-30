export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/leads/:path*',
    '/pipeline/:path*',
    '/campaigns/:path*',
    '/services/:path*',
    '/pr-campaigns/:path*',
    '/media-contacts/:path*',
    '/pr-analytics/:path*',
    '/analytics/:path*',
    '/contacts/:path*',
    '/bookings/:path*',
    '/messages/:path*',
    '/competitors/:path*',
    '/partnerships/:path*',
    '/industries/:path*',
    '/targets/:path*',
    '/profile/:path*',
    '/honeybook-settings/:path*',
    '/settings/:path*',
  ],
};