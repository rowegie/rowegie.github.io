# Rowegie P. Lambojon – portfolio

A two-page portfolio site (home and contact) built with Vite, React and TypeScript,
deployed to GitHub Pages with GitHub Actions.

All career content lives in [`src/data/profile.ts`](src/data/profile.ts) and comes from
Rowegie's resume. Edit that file to change what the site says; the components only lay it out.

## Develop

```sh
npm install
npm run dev        # http://localhost:5173/  (contact page at /contact)
```

## Check

```sh
npm run lint       # oxlint
npm test           # Vitest + Testing Library
npm run build      # type-check, then build to dist/
```

To preview the build the way GitHub Pages serves a project site (under `/<repo>/`):

```sh
BASE_PATH=/portfolio/ npm run build
npx vite preview --base /portfolio/   # http://localhost:4173/portfolio/
```

## Publish on GitHub Pages

1. Create a **public** repository on GitHub, for example `portfolio`. Name it
   `<your-username>.github.io` instead if you want the site at the root URL.
2. Push this folder to it:

   ```sh
   git init -b main
   git add .
   git commit -m "Add portfolio site"
   git remote add origin https://github.com/<your-username>/<repo>.git
   git push -u origin main
   ```

3. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
4. Open the **Actions** tab. If "Deploy to GitHub Pages" ran before Pages was enabled
   and failed, re-run it. When it finishes, the site is live at
   `https://<your-username>.github.io/<repo>/`, with the contact page at `.../contact`.

The workflow works out the base path from the repository name, so renaming the repo needs
no code change. There is no custom domain configured.

## Privacy

The site shows only the email address as contact information. The phone number and the
resume PDF are deliberately left out, `*.pdf` is git-ignored, and a test fails if the
rendered pages contain the phone number, a PDF link or private links.
