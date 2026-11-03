# devadmin.com

Public website for Devadmin, served by GitHub Pages from the root of `main`.

Plain static HTML, one stylesheet, and a little vanilla JS, with **no build step and no dependencies**. What's in the repo is exactly what's served.

## Structure

```
index.html               Home
work-with-us/index.html  Work With Us (benefits, testimonials, summit photo gallery)
values/index.html        Our Values
jobs/index.html          Jobs
404.html                 Not-found page (GitHub Pages serves it automatically)
assets/css/site.css      All styles (colour tokens at the top)
assets/js/site.js        Mobile menu + gallery lightbox
assets/img/              Logo, favicons, gallery/ (NAME.webp full size, NAME-sm.webp thumbnail)
robots.txt               Blocks all crawlers (site is not meant to be crawled)
sitemap.xml              List of page URLs
CNAME                    Custom domain for GitHub Pages
.nojekyll                Tells Pages to serve files as-is (no Jekyll)
```

The page URLs (`/work-with-us/`, `/values/`, `/jobs/`) match the old WordPress site, so existing links keep working.

## Preview locally

```
./serve.sh        # http://localhost:8080/
```

Asset paths are root-absolute (`/assets/...`), so open the site through the server, not via `file://`.

## Editing

- The header and footer are repeated in each page. If you change the nav, update all five HTML files (`index.html`, the three page folders, `404.html`). On each page, the current page's link gets `aria-current="page"`.
- After editing `site.css` or `site.js`, bump the `?v=N` on their `<link>`/`<script>` tags in every page so browsers fetch the new version.
- To add a job, copy the `<article class="job">` block in `jobs/index.html`.
- To add gallery photos, make two WebPs (full ≤1600px, thumbnail ≤640px) in `assets/img/gallery/` and add a `<button data-full=...>` line in `work-with-us/index.html`:

  ```
  cwebp -q 80 -resize 1600 0 photo.jpg -o assets/img/gallery/name.webp
  cwebp -q 72 -resize 640 0  photo.jpg -o assets/img/gallery/name-sm.webp
  ```

  (Use `-resize 0 1600` / `0 640` for portrait photos.)

## Deploying

GitHub repo → Settings → Pages → *Deploy from a branch* → `main` / `/ (root)`. Set the custom domain to `devadmin.com` and enable *Enforce HTTPS*. Then point DNS at GitHub Pages: apex `A` records 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153, plus `www` as a `CNAME` to `<org>.github.io`.
