import { clerkMiddleware } from '@clerk/astro/server';

const clerkHandler = clerkMiddleware();

export const onRequest = async (context: any, next: any) => {
  const url = new URL(context.request.url);

  // Rediriger si l'URL est tapée avec '&' (/admin&test=okok -> /admin?test=okok)
  if (url.pathname.startsWith('/admin&')) {
    const fixedUrl = new URL(context.request.url);
    fixedUrl.pathname = '/admin';
    const paramsPart = url.pathname.slice('/admin&'.length);
    const params = new URLSearchParams(paramsPart);
    params.forEach((value, key) => fixedUrl.searchParams.set(key, value));
    return context.redirect(fixedUrl.pathname + fixedUrl.search, 302);
  }

  try {
    return await clerkHandler(context, next);
  } catch (err: any) {
    console.warn('[Clerk Middleware Warning]:', err?.message || err);
    return next();
  }
};
