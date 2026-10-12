# Cloudflare Workers deployment

This repository keeps its existing Vercel setup and adds a separate Cloudflare Workers deployment.

## One-time GitHub setup

Add these repository Actions secrets under **Settings → Secrets and variables → Actions**:

- `CLOUDFLARE_API_TOKEN`: a Cloudflare API token with permission to edit Workers for the target account.
- `CLOUDFLARE_ACCOUNT_ID`: the target Cloudflare account ID.

Then open **Actions → Deploy to Cloudflare Workers → Run workflow**. The workflow runs the existing site verification before preparing the public static files and deploying the Worker.

The asset preparation step publishes the HTML pages, browser JavaScript/CSS, images, certificates, and sitemap files. It does not publish repository maintenance scripts or configuration files.

## workers.dev address

Cloudflare assigns each Worker an address in this form:

```text
<worker-name>.<account-subdomain>.workers.dev
```

This Worker is named `kagasametdurmus`. If the account subdomain is still `topkapiuni`, its address will be `kagasametdurmus.topkapiuni.workers.dev`. The bare `kagasametdurmus.workers.dev` is an account subdomain name, rather than this Worker's deploy URL. The account subdomain is managed in Cloudflare's Workers & Pages settings.

The deployment does not change the repository's existing `kagansametdurmus.com.tr` or Vercel configuration.
