# SolarSystemResource - Claude Code Guide

## Site
- URL: https://solarsystemresource.com
- Repo: https://github.com/corganb/solarsystemresource
- Host: Cloudflare Pages (auto-deploys from `main`)
- Cloudflare Pages project name: `solarsystemresource-site`
- Supabase project: `pxocavaczfjcpvqeiznt` (shared across all sibling sites)
- Engine: Spacekit (orbital simulation library by typpo), not Three.js directly

## Repo layout
- `public/index.html` - main app (single-HTML)
- `public/resource-systems-core.js` - shared RS namespace library
- `public/faq.html`, `public/privacy.html`, `public/terms.html`
- `public/_headers`, `public/robots.txt`, `public/sitemap.xml`

## Hard rules
1. **No em dashes.** Anywhere. Use hyphens, colons, or parentheses.
2. **`basePath` for Spacekit MUST include `/src`.** Use `basePath: 'https://typpo.github.io/spacekit/src'`. Spacekit internally does `replace("{{assets}}", basePath + "/assets")`, so leaving off `/src` makes every sprite texture 404 and planets render as invisible points. See `public/index.html` around line 587.
3. **Cache-bust core.js after edits.** Bump `?v=N` on the `<script src>` tag. Current: `v=16`.
4. **Verify syntax before pushing.** On the last `<script>` block, check `{` vs `}` balance and even backtick count.
5. **Commit early, commit often.** One logical change per commit.
6. **Python or Edit tool for multi-line edits.** Bash heredocs and repeated sed drop characters on this machine.
7. **Commit attribution: Corgan Studio, Inc. only.** Never add Co-Authored-By Claude.

## Shared RS.* API (core.js v=16)
- `RS.renderTopBar(opts)` - centralized top nav
- `RS.renderFootLinks()` - consistent footer nav
- `RS.showAnalysisPanel(data)` - click-to-inspect detail panel
- `RS.checkSession(onAuth)` - Supabase auth init
- `RS.fetchTier()` / `RS.isProUser()` / `RS.hasTier(minTier)`
- `RS.openUpgradeModal(reason, tier)`
- `RS.TIERS = { free:0, researcher:1, pro:1, team:2, enterprise:3 }`

## SolarSystem quirks
- Uses `Spacekit.Simulation(container, opts)` not `new THREE.Scene()`
- `jdPerSecond: 1` time rate by default
- Camera `initialPosition: [-3.2, -3.2, 2.4]`, `enableDrift: false`
- Planets draw via Spacekit's built-in ephemeris, not custom positions

## Deploy
Cloudflare Pages auto-deploys on push to `main`. Manual override:
```
wrangler pages deploy public --project-name=solarsystemresource-site
```

## Commit style
- Format: `type: short description` (e.g. `feat:`, `fix:`, `nav:`)
- No em dashes, no Co-Authored-By Claude
- Attribution: Corgan Studio, Inc.
