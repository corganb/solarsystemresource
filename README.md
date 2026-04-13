# SolarSystemResource

Heliocentric 3D view of the solar system. Fourth sibling site in the Resource
Systems suite alongside TerraResource, MoonResource, and MarsResource.

- **Domain:** solarsystemresource.com (owned, DNS at Google Domains / Squarespace, not yet pointed at hosting)
- **3D engine:** [spacekit.js](https://typpo.github.io/spacekit/) (Three.js based, built for heliocentric views)
- **Shared library:** `public/resource-systems-core.js` (identical copy across all four sites)
- **Hosting target:** Cloudflare Pages (matching the other three sites)

## Status

**v0.1 scaffold complete. Not yet deployed.**

### What works in v0.1

- Heliocentric spacekit.js scene with the Sun and all 8 planets rendered from Keplerian presets
- Background starfield / NASA Tycho skybox
- Loading overlay with pulsing sun animation
- Top bar with Corgan Studio brand mark, cross-site planet navigation (via `RS.renderPlanetNav('hub')`), and auth button (via `RS.renderAuthButton()`)
- Left sidebar layer catalog with 14 layers across 5 categories (Bodies, Spacecraft, Small Bodies, Advanced, Infrastructure)
- Tier lock system wired to `core.js` (`RS.checkLayerAccess`, `RS.enforceProLockOnLoad`, `RS.openUpgradeModal`) - free tier limited to 3 active layers, pro layers show 🔒 icon
- Full Supabase auth from day one via `RS.checkSession` / `RS.toggleAuthModal` (no "sign in coming soon" placeholder like Moon/Mars had)
- Stripe checkout wired with live-mode Payment Links, auth guard, robust query-string separator (same hardening as Terra)
- Deep Space Network live panel polling the shared `dsn-status` Supabase Edge Function
- Status bar (heliocentric J2000 frame, Julian date epoch, body count, layer count, version)
- Historical missions data file (`public/historical_missions.json`) with 13 deep space missions
- Mobile responsive layout (sidebar hides behind toggle button under 768px)
- Full SEO metadata (title, description, Open Graph, Twitter Card, Schema.org JSON-LD, canonical, robots)

### What's stubbed in v0.1 (toasts fire when toggled)

These layers toggle correctly and respect tier locks, but don't yet render data. They show a
"coming in v0.2" toast when the user activates them. Wire them up in a future session:

- Dwarf planets (Pluto preset works, Ceres/Eris need custom orbital elements)
- Major moons (need per-planet moon ephemeris)
- Active spacecraft trajectories (need JPL Horizons API integration)
- Historical missions trajectory rendering (data file is loaded, just not drawn yet)
- Asteroid belt (need JPL SBDB integration or spacekit.js asteroid presets)
- Near-Earth Objects, Comets, Trojan Asteroids
- Kuiper Belt, Oort Cloud, Heliosphere visualizations
- Lagrange Points (Earth-Sun L1-L5 markers)

## Deployment checklist (TODO when you wake up)

These steps require your GitHub / Cloudflare / Google Domains access and cannot be
automated from a Claude Code session without your eyes.

### 1. Create the GitHub repository

```bash
cd ~/Documents/solarsystemresource
# If you have gh CLI:
gh repo create corganb/solarsystemresource --public --source=. --remote=origin --push
# Or use the GitHub web UI:
# 1. Go to https://github.com/new
# 2. Owner: corganb, Name: solarsystemresource, Public, no README/license/gitignore
# 3. Click Create repository
# 4. Back in terminal:
git remote add origin https://github.com/corganb/solarsystemresource.git
git branch -M main
git push -u origin main
```

### 2. Connect Cloudflare Pages

1. Go to https://dash.cloudflare.com/ -> Workers & Pages -> Create application -> Pages -> Connect to Git
2. Select the `corganb/solarsystemresource` repository
3. Framework preset: **None** (it's a static site)
4. Build command: (leave blank)
5. Build output directory: `public`
6. Root directory: (leave blank or `/`)
7. Click **Save and Deploy**

After deploy completes, Cloudflare will give you a preview URL like
`solarsystemresource.pages.dev`. Test it loads properly before continuing.

### 3. Migrate DNS from Google Domains to Cloudflare

Currently `solarsystemresource.com` uses Google Domains nameservers. You need to
migrate it to Cloudflare DNS so Cloudflare Pages can attach the custom domain.

1. In Cloudflare, click **Add a site** -> enter `solarsystemresource.com` -> **Free plan**
2. Cloudflare scans existing DNS records from Google. If there's an old
   Squarespace parking page record, you can remove it or leave it - Cloudflare
   Pages will take over the apex when you add the custom domain in step 4.
3. Cloudflare gives you two nameservers (e.g. `chris.ns.cloudflare.com` and
   `sandy.ns.cloudflare.com`). Copy them.
4. Go to the registrar (Google Domains or Squarespace, whichever owns it now)
   and update the nameservers to the Cloudflare pair. Propagation is usually
   seconds to minutes.
5. Wait for Cloudflare to detect the nameserver change (the site in the CF
   dashboard will flip from "Pending Nameserver Update" to "Active").

### 4. Attach the custom domain to Cloudflare Pages

1. In Cloudflare Pages, open the `solarsystemresource` project
2. **Custom domains** tab -> **Set up a custom domain**
3. Enter `solarsystemresource.com`
4. Cloudflare auto-creates the apex A/AAAA records pointing at Pages
5. Also add `www.solarsystemresource.com` as a second custom domain for the
   www -> apex redirect (same pattern as terraresource.net)

### 5. Verify

Open https://solarsystemresource.com in an incognito window. You should see:
- Loading pulse with sun animation
- Scene fades in showing Sun + 8 planets with orbit lines
- Top bar with SOLAR SYSTEM RESOURCE brand and cross-site nav
- Left sidebar with layer catalog
- DSN live panel bottom-right
- Sign In button top-right

### 6. Update cross-site nav on the other three sites

The other three sites render `RS.renderPlanetNav()` with their own site key
active. Once `solarsystemresource.com` is live, the hub entry in `RS.SITES`
(already present) will automatically link to it from the planet nav on
Terra/Moon/Mars. No changes needed.

## Local development

```bash
cd ~/Documents/solarsystemresource
python3 -m http.server 8080 --directory public
# then open http://localhost:8080 in a browser
```

The site is a static HTML file with no build step. Edit `public/index.html`
and refresh the browser. Spacekit.js is loaded from CDN
(`typpo.github.io/spacekit`) so you need internet access.

## Versioning `resource-systems-core.js`

When you edit core.js, bump the `?v=N` query string in `public/index.html`
(currently `v=6`). This is the same cache-busting pattern as the other three
sites.
