# portfolio

Source of [gerodimos.dev](https://gerodimos.dev): a single static page (HTML, CSS,
a few lines of JS), no build step, served by GitHub Pages.

| Path | What |
|---|---|
| `index.html` | The page |
| `styles.css` | All styling |
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
| Onboard a service | [`Nq8XU3YVpOE`](https://youtu.be/Nq8XU3YVpOE) |

Built from `portfolio-video/service-onboarding/build.py` in the workspace. A
re-cut is a new upload with a new ID: update `data-video-id` and the link in
`index.html`.
