const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self' https://formspree.io",
  "script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com",
  "connect-src 'self' https://formspree.io https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com",
  "img-src 'self' data: https://placehold.co https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com",
  "style-src 'self'",
  "font-src 'self'",
  "frame-src 'none'",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const IMMUTABLE_ASSETS = new Set([
  "/critical.css",
  "/styles.css",
  "/script.js",
  "/kagan-samet-durmus-profile.webp",
  "/myprofile.jpg",
  "/favicon.png",
  "/career-summit-certificate.jpg",
  "/social-impact-project-certificate.jpg",
  "/entrepreneurship-certificate.jpg",
  "/innovationday.jpg",
  "/linkedin-profile-visibility.jpg",
]);

const NOINDEX_PAGES = new Set([
  "/program.html",
  "/schedule.html",
  "/schedule-ru.html",
]);

function addSecurityHeaders(headers) {
  headers.set("Content-Security-Policy", CONTENT_SECURITY_POLICY);
  headers.set("X-Frame-Options", "DENY");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), accelerometer=(), gyroscope=(), magnetometer=()",
  );
  headers.set("Cross-Origin-Opener-Policy", "same-origin");
  headers.set("Cross-Origin-Resource-Policy", "same-origin");
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/index.html" || url.pathname === "/index") {
      return Response.redirect(new URL("/", url), 301);
    }

    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);
    addSecurityHeaders(headers);

    if (NOINDEX_PAGES.has(url.pathname)) {
      headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
      headers.set("Cache-Control", "no-store");
    } else if (
      IMMUTABLE_ASSETS.has(url.pathname) ||
      url.pathname.startsWith("/assets/")
    ) {
      headers.set("Cache-Control", "public, max-age=31536000, immutable");
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
