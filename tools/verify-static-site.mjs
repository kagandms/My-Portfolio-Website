import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import vm from 'node:vm';

const BASE_URL = 'https://kagansametdurmus.com.tr';
const EXPECTED_HREFLANGS = ['en', 'ru', 'tr', 'x-default'];
const NOINDEX_HELPER_PAGES = new Set(['program.html', 'schedule.html', 'schedule-ru.html']);
const CONTACT_PAGES = ['contact.html', 'iletisim.html', 'contact-ru.html'];
const VERSIONED_ASSETS = ['styles.css', 'script.js'];
const FORM_ACTION = 'https://formspree.io/f/xgolarwd';
const failures = [];

function readText(relativePath) {
    return readFileSync(join(process.cwd(), relativePath), 'utf8');
}

function assertCondition(condition, message) {
    if (!condition) {
        failures.push(message);
    }
}

function listHtmlFiles() {
    return readdirSync(process.cwd())
        .filter((fileName) => fileName.endsWith('.html'))
        .sort();
}

function buildPageUrl(fileName) {
    if (fileName === 'index.html') {
        return `${BASE_URL}/`;
    }

    return `${BASE_URL}/${fileName}`;
}

function normalizeUrlPath(rawReference) {
    return rawReference.split('#')[0].split('?')[0];
}

function mapReferenceToLocalPath(rawReference) {
    const normalizedReference = normalizeUrlPath(rawReference);
    if (!normalizedReference || normalizedReference === '/') {
        return null;
    }

    if (normalizedReference.startsWith(`${BASE_URL}/`)) {
        return normalizedReference.replace(`${BASE_URL}/`, '') || 'index.html';
    }

    if (normalizedReference.startsWith('/')) {
        return normalizedReference.slice(1) || 'index.html';
    }

    if (/^(https?:|mailto:|tel:|data:|#)/.test(normalizedReference)) {
        return null;
    }

    return normalizedReference;
}

function extractPageReferences(htmlContent) {
    const attributeReferences = [...htmlContent.matchAll(/\b(?:href|src|action)=["']([^"']+)["']/g)]
        .map((match) => match[1]);
    const sameSiteReferences = [...htmlContent.matchAll(/https:\/\/kagansametdurmus\.com\.tr\/[^"'<)\s]+/g)]
        .map((match) => match[0]);

    return [...new Set([...attributeReferences, ...sameSiteReferences])];
}

function verifyLocalReferences(htmlFiles) {
    for (const fileName of htmlFiles) {
        const references = extractPageReferences(readText(fileName));
        for (const rawReference of references) {
            const localPath = mapReferenceToLocalPath(rawReference);
            if (localPath === null) {
                continue;
            }

            assertCondition(existsSync(join(process.cwd(), localPath)), `${fileName}: missing local reference ${rawReference}`);
        }
    }
}

function extractCanonical(htmlContent) {
    return htmlContent.match(/<link rel="canonical" href="([^"]+)">/)?.[1] ?? null;
}

function verifyCanonicalUrls(htmlFiles) {
    for (const fileName of htmlFiles) {
        const canonicalUrl = extractCanonical(readText(fileName));
        assertCondition(canonicalUrl === buildPageUrl(fileName), `${fileName}: canonical mismatch`);
    }
}

function extractHreflangMap(htmlContent) {
    const hreflangMap = new Map();
    const matches = htmlContent.matchAll(/<link rel="alternate" href="([^"]+)" hreflang="([^"]+)" \/>/g);
    for (const match of matches) {
        hreflangMap.set(match[2], match[1]);
    }

    return hreflangMap;
}

function verifyHreflangReciprocity(htmlFiles) {
    const indexableFiles = htmlFiles.filter((fileName) => !NOINDEX_HELPER_PAGES.has(fileName));
    for (const fileName of indexableFiles) {
        const hreflangMap = extractHreflangMap(readText(fileName));
        verifyHreflangSet(fileName, hreflangMap);
        verifyHreflangTargets(fileName, hreflangMap);
    }
}

function verifyHreflangSet(fileName, hreflangMap) {
    const languages = [...hreflangMap.keys()].sort();
    assertCondition(
        languages.join(',') === EXPECTED_HREFLANGS.join(','),
        `${fileName}: expected hreflangs ${EXPECTED_HREFLANGS.join(',')}, got ${languages.join(',')}`,
    );
}

function verifyHreflangTargets(fileName, hreflangMap) {
    for (const targetUrl of hreflangMap.values()) {
        const targetPath = mapReferenceToLocalPath(targetUrl);
        if (targetPath === null || !existsSync(join(process.cwd(), targetPath))) {
            failures.push(`${fileName}: hreflang target missing ${targetUrl}`);
            continue;
        }

        const targetMap = extractHreflangMap(readText(targetPath));
        for (const [language, sourceUrl] of hreflangMap.entries()) {
            assertCondition(targetMap.get(language) === sourceUrl, `${fileName}: reciprocal hreflang mismatch via ${targetPath}`);
        }
    }
}

function verifyJsonLd(htmlFiles) {
    for (const fileName of htmlFiles) {
        const htmlContent = readText(fileName);
        const jsonLdBlocks = htmlContent.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
        for (const jsonLdBlock of jsonLdBlocks) {
            try {
                JSON.parse(jsonLdBlock[1]);
            } catch (error) {
                failures.push(`${fileName}: invalid JSON-LD ${error.message}`);
            }
        }
    }
}

function verifySitemap(htmlFiles) {
    const sitemapXml = readText('sitemap.xml');
    const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
    const expectedUrls = htmlFiles.filter((fileName) => !NOINDEX_HELPER_PAGES.has(fileName)).map(buildPageUrl);
    const missingUrls = expectedUrls.filter((pageUrl) => !sitemapUrls.includes(pageUrl));
    const extraUrls = sitemapUrls.filter((pageUrl) => !expectedUrls.includes(pageUrl));

    assertCondition(sitemapUrls.length === expectedUrls.length, `sitemap: expected ${expectedUrls.length} URLs, got ${sitemapUrls.length}`);
    assertCondition(missingUrls.length === 0, `sitemap: missing URLs ${missingUrls.join(', ')}`);
    assertCondition(extraUrls.length === 0, `sitemap: unexpected URLs ${extraUrls.join(', ')}`);
}

function verifyNoindexHelpers() {
    const vercelConfig = JSON.parse(readText('vercel.json'));
    for (const fileName of NOINDEX_HELPER_PAGES) {
        const htmlContent = readText(fileName);
        assertCondition(/<meta name="robots" content="noindex, follow">/.test(htmlContent), `${fileName}: missing noindex meta`);
        verifyNoindexVercelHeaders(vercelConfig, fileName);
    }
}

function verifyNoindexVercelHeaders(vercelConfig, fileName) {
    const routeConfig = vercelConfig.headers.find((entry) => entry.source === `/${fileName}`);
    const xRobotsTag = findHeaderValue(routeConfig?.headers ?? [], 'X-Robots-Tag');
    const cacheControl = findHeaderValue(routeConfig?.headers ?? [], 'Cache-Control');

    assertCondition(xRobotsTag === 'noindex, nofollow, noarchive', `${fileName}: missing X-Robots-Tag noindex header`);
    assertCondition(cacheControl === 'no-store', `${fileName}: missing no-store cache header`);
}

function findHeaderValue(headers, key) {
    return headers.find((headerConfig) => headerConfig.key.toLowerCase() === key.toLowerCase())?.value ?? null;
}

function verifyContactForms() {
    for (const fileName of CONTACT_PAGES) {
        const htmlContent = readText(fileName);
        assertCondition(htmlContent.includes(`action="${FORM_ACTION}" method="POST"`), `${fileName}: Formspree action mismatch`);
        assertCondition(/name="_gotcha"/.test(htmlContent), `${fileName}: missing honeypot field`);
        assertCondition(/name="email"[^>]*type="email"|type="email"[^>]*name="email"/.test(htmlContent), `${fileName}: missing email field`);
        assertCondition(/name="phone"[^>]*type="tel"|type="tel"[^>]*name="phone"/.test(htmlContent), `${fileName}: missing phone field`);
        assertCondition(/name="message"[^>]*maxlength="3000"/.test(htmlContent), `${fileName}: missing bounded message field`);
    }
}

function buildAssetVersion(fileName) {
    return createHash('sha256').update(readText(fileName)).digest('hex').slice(0, 12);
}

function verifyAssetVersions(htmlFiles) {
    const assetVersions = new Map(VERSIONED_ASSETS.map((fileName) => [fileName, buildAssetVersion(fileName)]));
    for (const fileName of htmlFiles) {
        const htmlContent = readText(fileName);
        for (const [assetName, expectedVersion] of assetVersions.entries()) {
            const assetPattern = new RegExp(`${escapeRegex(assetName)}\\?v=([a-f0-9]{12})`, 'g');
            const versions = [...htmlContent.matchAll(assetPattern)].map((match) => match[1]);
            assertCondition(versions.length > 0, `${fileName}: missing ${assetName} version`);
            assertCondition(versions.every((version) => version === expectedVersion), `${fileName}: stale ${assetName} version`);
        }
    }
}

function escapeRegex(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function verifyVercelContract() {
    const vercelConfig = JSON.parse(readText('vercel.json'));
    verifyRedirects(vercelConfig);
    verifyGlobalSecurityHeaders(vercelConfig);
    verifyImmutableAssetHeaders(vercelConfig);
}

function verifyRedirects(vercelConfig) {
    const indexHtmlRedirect = vercelConfig.redirects.find((entry) => entry.source === '/index.html');
    assertCondition(indexHtmlRedirect?.destination === '/', 'vercel: /index.html must redirect to /');
    assertCondition(indexHtmlRedirect?.statusCode === 301, 'vercel: /index.html redirect must be permanent');
}

function verifyGlobalSecurityHeaders(vercelConfig) {
    const globalHeaders = vercelConfig.headers.find((entry) => entry.source === '/(.*)')?.headers ?? [];
    const contentSecurityPolicy = findHeaderValue(globalHeaders, 'Content-Security-Policy') ?? '';
    assertCondition(contentSecurityPolicy.includes("default-src 'self'"), 'vercel: CSP missing default-src');
    assertCondition(contentSecurityPolicy.includes('https://formspree.io'), 'vercel: CSP missing Formspree allowlist');
    assertCondition(findHeaderValue(globalHeaders, 'X-Frame-Options') === 'DENY', 'vercel: missing X-Frame-Options DENY');
    assertCondition(findHeaderValue(globalHeaders, 'X-Content-Type-Options') === 'nosniff', 'vercel: missing nosniff header');
}

function verifyImmutableAssetHeaders(vercelConfig) {
    for (const assetName of VERSIONED_ASSETS) {
        const routeConfig = vercelConfig.headers.find((entry) => entry.source === `/${assetName}`);
        const cacheControl = findHeaderValue(routeConfig?.headers ?? [], 'Cache-Control');
        assertCondition(cacheControl === 'public, max-age=31536000, immutable', `vercel: ${assetName} must be immutable`);
    }
}

function verifyScriptBehavior() {
    const scriptContext = buildScriptContext();
    vm.createContext(scriptContext);
    vm.runInContext(readText('script.js'), scriptContext);

    assertCondition(scriptContext.readStorageValue(STORAGE_THEME_KEY) === null, 'script: blocked storage read must return null');
    assertCondition(scriptContext.writeStorageValue(STORAGE_THEME_KEY, 'light') === false, 'script: blocked storage write must return false');
    verifyPhoneSanitizer(scriptContext);
}

const STORAGE_THEME_KEY = 'theme';

function buildScriptContext() {
    const browserWindow = {
        localStorage: {
            getItem: () => { throw new Error('storage blocked'); },
            setItem: () => { throw new Error('storage blocked'); },
        },
        addEventListener: () => undefined,
        location: { hostname: 'example.com' },
        matchMedia: () => ({ matches: false }),
        scrollTo: () => undefined,
    };

    return {
        window: browserWindow,
        document: { addEventListener: () => undefined },
        Error,
        Set,
        Date,
    };
}

function verifyPhoneSanitizer(scriptContext) {
    const sanitizedPhone = scriptContext.sanitizePhoneValue('+1 (234) 567-8900 ext 55');
    assertCondition(sanitizedPhone.includes('+1'), 'script: phone sanitizer must preserve leading country code plus');
    assertCondition(sanitizedPhone.includes('(234)'), 'script: phone sanitizer must preserve parentheses');
    assertCondition(sanitizedPhone.includes('-'), 'script: phone sanitizer must preserve hyphen separators');
    assertCondition(!/[A-Za-z]/.test(sanitizedPhone), 'script: phone sanitizer must remove letters');
    assertCondition(scriptContext.sanitizePhoneValue('12+34') === '1234', 'script: phone sanitizer must drop non-leading plus signs');
}

function runChecks() {
    const htmlFiles = listHtmlFiles();
    verifyLocalReferences(htmlFiles);
    verifyCanonicalUrls(htmlFiles);
    verifyHreflangReciprocity(htmlFiles);
    verifyJsonLd(htmlFiles);
    verifySitemap(htmlFiles);
    verifyNoindexHelpers();
    verifyContactForms();
    verifyAssetVersions(htmlFiles);
    verifyVercelContract();
    verifyScriptBehavior();
}

runChecks();

if (failures.length > 0) {
    console.error(`Static verification failed with ${failures.length} issue(s):`);
    for (const failure of failures) {
        console.error(`- ${failure}`);
    }

    process.exit(1);
}

console.log('Static verification passed');
