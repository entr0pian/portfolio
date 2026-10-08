# portfolio

Source of [gerodimos.dev](https://gerodimos.dev): static HTML, CSS and a few lines
of JS, no build step, served by GitHub Pages. It is also the platform's canonical
architecture write-up: one page per architecture area.

| Path | What |
|---|---|
| `index.html` | The front page: hero, golden-path demo, architecture overview, code |
| `architecture/<area>/index.html` | One page per architecture area, linked from the front page's cards |
| `styles.css` | All styling, shared by every page |
| `main.js` | Click-to-load YouTube embed (no YouTube requests until play) |
| `assets/` | Video poster, favicon |
| `CNAME` | Custom domain for GitHub Pages |
| `.nojekyll` | Serve files as-is, no Jekyll processing |

## Hosting

GitHub Pages, deployed from `main` (root). It's deliberately **not** hosted on
the platform's own clusters: those are created and destroyed daily, and the
portfolio has to be up whenever someone opens it.

DNS lives in the long-lived `bootstrap-cluster/terraform/dns` root
(`portfolio.tf`): apex `A`/`AAAA` records to GitHub Pages, plus the
`_github-pages-challenge-entr0pian` TXT record that verifies the domain for
the `entr0pian` account (so no other account can claim it). GitHub issues the
TLS certificate; `.dev` is HSTS-preloaded, so **Enforce HTTPS** must be on.

## Demo videos

| Golden path | YouTube |
|---|---|
| Onboard a service | [`oI3ZWVAUfhw`](https://youtu.be/oI3ZWVAUfhw) |

Built from `portfolio-video/service-onboarding/build.py` in the workspace. A
re-cut is a new upload with a new ID: update `data-video-id` and the link in
`index.html`.

## Architecture pages

Each follows the same outline: the point in one line, four headline facts, a
hand-drawn inline SVG, how it works, design choices with their trade-offs, what
isn't built yet, and the repositories involved. In reading order:

| Page | Covers |
|---|---|
| `developer-experience` | Backstage: golden paths as pull requests, how it reads platform state |
| `scaffolding` | Versioned service templates and what every service gets by default |
| `platform-api` | `Component` as identity, `componentRef`, the operators |
| `service-bindings` | Database → Secrets Manager → `Release` → mounted files |
| `database-schemas` | Why schemas have their own forward-only lifecycle; migration package → `DatabaseSchema` → Atlas |
| `gitops-delivery` | `application-repositories` directories and their ApplicationSets |
| `hub-and-spoke` | The management cluster and how it reaches dev and prod |
| `observability` | Labels, recording rules, remote write to Mimir |

Every claim is checked against the code, not against plans. When something
changes, update the page in the same piece of work.
