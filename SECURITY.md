# Security Operations Runbook

This portfolio is a static Vercel site. The only user-submitted data path is the multilingual contact form that posts to Formspree.

## Production Controls

- Vercel serves the static site and owns response headers.
- Formspree receives contact submissions from `contact.html`, `iletisim.html`, and `contact-ru.html`.
- Google Analytics is loaded from `script.js` for page analytics only.
- Schedule pages are intentionally non-indexed helper pages. They must not contain private location, address, or credential data.

## Incident Response

1. Preserve evidence before changing configuration.
   - Capture the affected URL, timestamp with timezone, request samples, browser console output, and Vercel deployment id.
   - Export relevant Vercel and Formspree logs before deleting spam submissions.
2. Contain contact-form abuse.
   - Temporarily remove or rotate the Formspree form id in all three contact pages.
   - Enable or tighten Formspree spam filtering, CAPTCHA, and notification controls in the Formspree dashboard.
   - Keep the `_gotcha` honeypot field enabled in source.
3. Contain static-site compromise.
   - Revert to the last known-good Vercel deployment.
   - Verify `vercel.json` security headers are present on `/`, `/contact.html`, `/script.js`, and schedule pages.
   - Run a secrets scan on the current tree and git history before redeploying.
4. Recover.
   - Redeploy from a clean local tree.
   - Check the homepage, the three contact pages, `robots.txt`, and `sitemap.xml`.
   - Confirm security headers and CSP console health in a browser.
5. Post-incident review.
   - Record root cause, affected routes, timeline, data exposure assessment, and permanent fix.
   - If contact-form PII may have been exposed, preserve the Formspree export and decide whether user notification is required.

## Routine Verification

- Run `jq empty vercel.json` after editing deploy configuration.
- Run `python3 -m py_compile optimize_images.py` after editing Python helpers.
- Run a passive browser check after CSP changes and confirm there are no CSP violations.
- Review Formspree spam and submission volume after public announcements.
- Run `gitleaks` or `truffleHog` before making the repository public or rotating deployment ownership.

## Formspree Dashboard Checklist

- Confirm CAPTCHA or equivalent spam filtering is enabled.
- Confirm notification routing goes to the expected mailbox only.
- Confirm retention and deletion expectations for submitted name, email, optional phone, subject, and message.
- Confirm submission spike notifications are enabled where available.
