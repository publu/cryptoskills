// Cloudflare Worker for cryptoskills.sh
// KV binding: STATS
// Tracks views and downloads per skill. Increment only, rate-limited by IP.

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}

// Rate limit: 1 action per skill per IP per 60 seconds
async function isRateLimited(env, ip, skill, action) {
  const key = `rl:${ip}:${skill}:${action}`;
  const last = await env.STATS.get(key);
  if (last) {
    const elapsed = Date.now() - parseInt(last, 10);
    if (elapsed < 60_000) return true;
  }
  await env.STATS.put(key, Date.now().toString(), { expirationTtl: 120 });
  return false;
}

async function getStats(env, skill) {
  const raw = await env.STATS.get(`skill:${skill}`);
  if (!raw) return { views: 0, downloads: 0 };
  return JSON.parse(raw);
}

async function increment(env, skill, field) {
  const stats = await getStats(env, skill);
  stats[field] = (stats[field] || 0) + 1;
  await env.STATS.put(`skill:${skill}`, JSON.stringify(stats));
  return stats;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS });
    }

    // GET /api/stats — all skills
    if (path === '/api/stats' && request.method === 'GET') {
      const list = await env.STATS.list({ prefix: 'skill:' });
      const all = {};
      for (const key of list.keys) {
        const name = key.name.replace('skill:', '');
        const raw = await env.STATS.get(key.name);
        all[name] = raw ? JSON.parse(raw) : { views: 0, downloads: 0 };
      }
      return json(all);
    }

    // GET /api/stats/:skill
    const statsMatch = path.match(/^\/api\/stats\/([a-z0-9-]+)$/);
    if (statsMatch && request.method === 'GET') {
      return json(await getStats(env, statsMatch[1]));
    }

    // POST /api/view/:skill — increment view count
    const viewMatch = path.match(/^\/api\/view\/([a-z0-9-]+)$/);
    if (viewMatch && request.method === 'POST') {
      const skill = viewMatch[1];
      if (await isRateLimited(env, ip, skill, 'view')) {
        return json(await getStats(env, skill));
      }
      return json(await increment(env, skill, 'views'));
    }

    // POST /api/download/:skill — increment download count
    const dlMatch = path.match(/^\/api\/download\/([a-z0-9-]+)$/);
    if (dlMatch && request.method === 'POST') {
      const skill = dlMatch[1];
      if (await isRateLimited(env, ip, skill, 'download')) {
        return json(await getStats(env, skill));
      }
      return json(await increment(env, skill, 'downloads'));
    }

    // API 404
    if (path.startsWith('/api/')) {
      return json({ error: 'Not found' }, 404);
    }

    // Non-API: proxy to GitHub Pages
    // SPA fallback: /skill/* routes serve index.html
    const ghPath = (path === '/' || path.startsWith('/skill/')) ? '/index.html' : path;
    const ghUrl = `https://publu.github.io/cryptoskills${ghPath}`;
    const ghResp = await fetch(ghUrl, {
      headers: { 'User-Agent': 'cryptoskills-worker' },
    });

    const contentTypes = {
      '.html': 'text/html; charset=utf-8',
      '.json': 'application/json',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.svg': 'image/svg+xml',
      '.png': 'image/png',
      '.ico': 'image/x-icon',
    };

    const ext = ghPath.match(/\.[a-z]+$/)?.[0] || '.html';
    const ct = contentTypes[ext] || ghResp.headers.get('Content-Type');

    return new Response(ghResp.body, {
      status: ghResp.status,
      headers: { 'Content-Type': ct, 'Cache-Control': 'public, max-age=60' },
    });
  },
};
