import https from 'node:https';

const BASE_URL = 'https://kagansametdurmus.com.tr';
const failures = [];

function assertCondition(condition, message) {
    if (!condition) {
        failures.push(message);
    }
}

function requestRoute(route, method = 'HEAD') {
    return new Promise((resolve, reject) => {
        const request = https.request(`${BASE_URL}${route}`, { method, timeout: 10000 }, (response) => {
            let responseBody = '';
            response.on('data', (chunk) => {
                responseBody += chunk;
            });
            response.on('end', () => {
                resolve({ statusCode: response.statusCode, headers: response.headers, body: responseBody });
            });
        });

        request.on('timeout', () => {
            request.destroy(new Error(`${route} timed out`));
        });
        request.on('error', reject);
        request.end();
    });
}

function verifyHeaderIncludes(response, headerName, expectedValue, route) {
    const headerValue = String(response.headers[headerName.toLowerCase()] ?? '');
    assertCondition(headerValue.includes(expectedValue), `${route}: ${headerName} missing ${expectedValue}`);
}

async function verifyHead(route, expectedStatusCode) {
    const response = await requestRoute(route);
    assertCondition(response.statusCode === expectedStatusCode, `${route}: expected ${expectedStatusCode}, got ${response.statusCode}`);
    return response;
}

async function verifyHomePage() {
    const response = await verifyHead('/', 200);
    verifyHeaderIncludes(response, 'content-security-policy', "default-src 'self'", '/');
    verifyHeaderIncludes(response, 'content-security-policy', 'https://formspree.io', '/');
    verifyHeaderIncludes(response, 'x-frame-options', 'DENY', '/');
    verifyHeaderIncludes(response, 'x-content-type-options', 'nosniff', '/');
    verifyHeaderIncludes(response, 'referrer-policy', 'strict-origin-when-cross-origin', '/');
}

async function verifyIndexRedirect() {
    const response = await verifyHead('/index.html', 301);
    verifyHeaderIncludes(response, 'location', '/', '/index.html');
}

async function verifyRobotsAndSitemap() {
    const robotsResponse = await requestRoute('/robots.txt', 'GET');
    assertCondition(robotsResponse.statusCode === 200, `/robots.txt: expected 200, got ${robotsResponse.statusCode}`);
    assertCondition(robotsResponse.body.includes('Sitemap: https://kagansametdurmus.com.tr/sitemap.xml'), '/robots.txt: missing sitemap directive');

    const sitemapResponse = await requestRoute('/sitemap.xml', 'GET');
    const sitemapLocCount = [...sitemapResponse.body.matchAll(/<loc>/g)].length;
    assertCondition(sitemapResponse.statusCode === 200, `/sitemap.xml: expected 200, got ${sitemapResponse.statusCode}`);
    assertCondition(sitemapLocCount === 33, `/sitemap.xml: expected 33 URLs, got ${sitemapLocCount}`);
}

async function verifyNoindexRoute(route) {
    const response = await verifyHead(route, 200);
    verifyHeaderIncludes(response, 'x-robots-tag', 'noindex, nofollow, noarchive', route);
    verifyHeaderIncludes(response, 'cache-control', 'no-store', route);
}

async function verifyImmutableAsset(route) {
    const response = await verifyHead(route, 200);
    verifyHeaderIncludes(response, 'cache-control', 'public, max-age=31536000, immutable', route);
}

async function runChecks() {
    await verifyHomePage();
    await verifyIndexRedirect();
    await verifyRobotsAndSitemap();
    await verifyNoindexRoute('/program.html');
    await verifyNoindexRoute('/schedule.html');
    await verifyNoindexRoute('/schedule-ru.html');
    await verifyImmutableAsset('/styles.css');
    await verifyImmutableAsset('/script.js');
}

try {
    await runChecks();
} catch (error) {
    failures.push(error instanceof Error ? error.message : String(error));
}

if (failures.length > 0) {
    console.error(`Live verification failed with ${failures.length} issue(s):`);
    for (const failure of failures) {
        console.error(`- ${failure}`);
    }

    process.exit(1);
}

console.log('Live verification passed');
