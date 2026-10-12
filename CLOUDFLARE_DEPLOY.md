# Cloudflare Workers deployment

This repository keeps its existing Vercel setup and adds an independent Cloudflare Workers deployment for the portfolio.

## One-time GitHub setup

Use a separate personal Cloudflare account for the portfolio, then add that account's credentials as repository Actions secrets under **Settings → Secrets and variables → Actions**:

- `CLOUDFLARE_API_TOKEN`: an API token with permission to edit Workers in the portfolio account.
- `CLOUDFLARE_ACCOUNT_ID`: the portfolio Cloudflare account ID.

Configure the portfolio account's Workers & Pages subdomain as `durmus`. The Worker name in `wrangler.jsonc` is `kagansamet`, which gives the portfolio this address:

```text
https://kagansamet.durmus.workers.dev
```

Cloudflare must allow the `durmus` account subdomain to be selected. Its availability can only be confirmed in the portfolio Cloudflare account's Workers & Pages settings.

Then open **Actions → Deploy to Cloudflare Workers → Run workflow**. The workflow runs the existing site verification before preparing the public static files and deploying the Worker.

The asset preparation step publishes the HTML pages, browser JavaScript/CSS, images, certificates, and sitemap files. It does not publish repository maintenance scripts or configuration files.

The deployment does not change the repository's existing `kagansametdurmus.com.tr` or Vercel configuration.
