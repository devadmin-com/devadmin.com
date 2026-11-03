# devadmin.com

Static site for GitHub Pages: hand-written HTML in the repo root, with no framework and no build. See README.md for the layout.

- Header/footer markup is duplicated across `index.html`, `work-with-us/`, `values/`, `jobs/` and `404.html`. Keep them in sync, and set `aria-current="page"` on the current page's nav link.
- Bump `?v=N` on `site.css` / `site.js` references in all pages whenever those files change (cache busting).
- Page copy was migrated verbatim from the old WordPress site. Don't "fix" its wording unless asked.
- Images: only WebP from `assets/img/gallery/` (`name.webp` full, `name-sm.webp` thumb). Use root-absolute paths (`/assets/...`).
- Preview with `./serve.sh` (python http.server on :8080).
