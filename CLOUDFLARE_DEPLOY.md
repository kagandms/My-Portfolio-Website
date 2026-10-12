# Cloudflare Workers deployment

The portfolio's existing Cloudflare project remains connected to this repository. Its build prepares a dedicated `dist/` directory before Wrangler deploys the Worker. The existing Vercel project and `kagansametdurmus.com.tr` domain configuration remain unchanged.

## Cloudflare project settings

In **Workers & Pages → my-portfolio-website → Settings → Builds**, configure:

- Build command: `node tools/prepare-cloudflare-assets.mjs`
- Deploy command: `npx wrangler deploy`
- Root directory: `/`

The `assets.directory` setting in `wrangler.jsonc` directs Wrangler to `./dist`; the repository root is only the command's working directory. Cloudflare's existing project token is used by its build service, so no API token or account ID belongs in this repository.

The Worker name in `wrangler.jsonc` is `kagansamet`, which gives the portfolio this address:

```text
https://kagansamet.durmus.workers.dev
```

The asset preparation step publishes HTML pages and the static files they reference, including Open Graph images, `robots.txt`, and `sitemap.xml`. It excludes repository tools, tests, documentation, backups, and dependencies.
