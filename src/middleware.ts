import { NextRequest, NextResponse } from 'next/server';

const MAX_FREE_FAQ_VIEWS = 3;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // apply only to answer pages
  if (!pathname.startsWith('/answers/')) return;

  // logged-in users with unlimited flag can bypass (JWT in cookie)
  const session = request.cookies.get('sb-access-token')?.value;
  if (session) {
    // naive check: if token contains "faq_unlimited", skip paywall
    try {
      const payloadPart = session.split('.')[1];
      const payload = JSON.parse(Buffer.from(payloadPart, 'base64').toString('utf8'));
      if (payload?.user_metadata?.faq_unlimited) return;
    } catch (_) {}
  }

  const viewsCookie = request.cookies.get('fv');
  const views = viewsCookie ? parseInt(viewsCookie.value, 10) || 0 : 0;

  if (views >= MAX_FREE_FAQ_VIEWS) {
    const url = request.nextUrl.clone();
    url.pathname = '/paywall/faq';
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  // increment and set cookie (30-day expiry)
  const res = NextResponse.next();
  res.cookies.set('fv', String(views + 1), {
    path: '/',
    maxAge: 30 * 24 * 60 * 60,
    httpOnly: true,
  });
  return res;
}

export const config = {
  matcher: ['/answers/:slug*'],
}; 