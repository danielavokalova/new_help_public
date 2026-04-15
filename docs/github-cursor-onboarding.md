# GitHub + Cursor Onboarding

This guide is for teammates who do **not** have local folder sharing and need to work through GitHub.

## 1. Access

- Request access to repository:
  - `https://github.com/Travelport-Czech/gitbook_golhelp`
- Install tools:
  - Git
  - Node.js (LTS, recommended 20+)
  - Cursor

## 2. Clone and open in Cursor

```bash
git clone https://github.com/Travelport-Czech/gitbook_golhelp.git
cd gitbook_golhelp
```

Open folder in Cursor:

- `File -> Open Folder -> gitbook_golhelp`

## 3. Initial setup

In Cursor terminal:

```bash
npm install
npm run dev
```

Open:

- `http://localhost:3000`

## 4. Where to edit content

Edit documentation in:

- `content/docs/getting-started/`
- `content/docs/configuration/`
- `content/docs/operations/`
- `content/docs/troubleshooting/`
- `content/docs/release-notes/`

## 5. Helpful maintenance commands

If imported pages still contain legacy external URLs:

```bash
npm run rewrite:links
```

If images are external and should be hosted locally:

```bash
npm run localize:images
```

## 6. Required check before push

```bash
npm run build
```

Build must pass.

## 7. Branch + PR workflow

```bash
git checkout -b docs/my-change
git add .
git commit -m "Update docs: short summary"
git push -u origin docs/my-change
```

Then open Pull Request to `main`.

## 8. Deploy behavior

- After merge to `main`, GitHub Actions deploys automatically to Vercel.
- Use PR previews for review before merge.
