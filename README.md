# Lab website CMS handoff

## Overview

This repository contains the static website for the Engineering Risk, Uncertainty, and Resilience Lab. The public website is static HTML/CSS/JavaScript, with routine content maintained through a Decap CMS editor at `/admin`.

Current Netlify URLs:

- Website: https://eur-lab.netlify.app
- CMS admin: https://eur-lab.netlify.app/admin/

The built website can be deployed anywhere that can host static files. The current no-code maintenance workflow, however, relies on GitHub and Netlify:

- GitHub stores the repository, content files, uploaded media, revision history, and GitHub Actions workflow.
- Netlify hosts the site, provides the CMS login through Netlify Identity, and connects Decap CMS to GitHub through Git Gateway.
- GitHub Actions rebuilds `generated/cms-content.js` after CMS/content changes so the repository stays in sync with the deployed site.

## Repository structure

- `content/` contains the editable CMS content.
- `content/site.json` controls site metadata, brand, navigation, hero, research intro, team heading, footer, and Site settings content.
- `content/bio.json`, `content/teaching.json`, and `content/contact.json` control independent homepage sections.
- `content/research/`, `content/team/`, `content/publications/`, and `content/news/` contain editable collection records.
- `content/hidden-drawers/legacy-overview.json` controls the hidden legacy overview drawer. In the CMS, it is edited under **Site settings**, not under Research.
- `assets/` contains curated site images and uploaded media. CMS uploads are stored in `assets/uploads/`.
- `admin/config.yml` defines the CMS collections, fields, media folder, and Git Gateway backend.
- `generated/cms-content.js` is the generated content bundle consumed by `index.html`.
- `tools/build-content.mjs` builds `generated/cms-content.js` from the JSON files in `content/`.
- `.github/workflows/build-cms-content.yml` rebuilds and commits `generated/cms-content.js` after CMS/content changes are pushed to GitHub.
- `index.html`, `styles.css`, `research-demo.css`, `research-demo.js`, `script.js`, `content-loader.js`, and `cms-icon-enhancements.js` define the site layout, styling, rendering, and interactions. Treat these as developer-maintained files.
- `index.legacy-static.html` is a reference copy of the old static page and is not the active website.

## Maintenance workflow

For routine content edits, use the CMS:

1. Visit https://eur-lab.netlify.app/admin/.
2. Sign in with the Netlify Identity account invited to the site.
3. Edit the relevant CMS collection and choose **Publish**.
4. Decap CMS commits the content or uploaded media changes to the GitHub repository on `master`.
5. GitHub Actions rebuilds `generated/cms-content.js` and commits the generated update back to GitHub.
6. Netlify redeploys the site automatically.

A normal CMS edit may create two Netlify deploys:

1. The CMS content/media commit.
2. The GitHub Actions commit that updates `generated/cms-content.js`.

The second deploy is the final synchronized version.

If editing directly in GitHub, edit content files only unless a developer is intentionally changing the site implementation. Commit changes to `master`; GitHub Actions and Netlify should handle the generated content update and deployment.

## Editing guidance

- Text fields marked Markdown support normal paragraphs, links, `*emphasis*`, `**bold**`, and lists.
- Smaller `Display order` numbers appear first in ordered CMS collections.
- Upload images through the CMS image selector when possible. Uploaded images go to `assets/uploads/`.
- Always provide useful image alt text and captions where the CMS asks for them.
- **Site settings** includes global/homepage settings and the hidden legacy overview drawer.
- **Biography**, **Research areas**, **Team members**, **Publications and presentations**, **Teaching**, **News**, and **Contact us** follow the order of the homepage sections.
- The visible Research section should remain exactly four cards unless a developer intentionally changes the design.
- `generated/cms-content.js` is generated. Avoid manual edits to it; let GitHub Actions or `node tools/build-content.mjs` recreate it.

## Safety and recovery

- Keep GitHub, Netlify, domain/DNS, and administrator accounts customer-owned.
- Do not store passwords, API keys, database credentials, private documents, or other secrets in this repository.
- To undo a content mistake, restore or revert the earlier GitHub commit, then let Netlify deploy the restored version.
- Keep `admin/config.yml`, build scripts, CSS, JavaScript, templates, and generated workflow logic under developer control. They define the website structure and should not be casually edited during routine maintenance.
- `index.legacy-static.html` is retained for reference only; it is not the active homepage.
- GitHub Actions must have repository write permission for automatic generated-content commits. In GitHub, check **Settings → Actions → General → Workflow permissions → Read and write permissions**.

## Important notes

- For future development or Codex-assisted edits, see `PROJECT_CONTEXT.md`. It records implementation decisions, design preferences, CMS structure, and known maintenance notes. Routine customer content editing should still be done through `/admin` or the `content/` files described above.
- The static website can be moved to another host, but the current CMS login and no-code maintenance workflow are tied to Netlify Identity, Netlify Git Gateway, GitHub, and GitHub Actions.
- Netlify runs `npm run build` during deploy. Local Node/npm installation is not required for routine CMS edits.
- If a developer wants to preview generated content locally, run `node tools/build-content.mjs` or `npm run build`, then serve the folder with a local static server.
- Opening `index.html` directly with `file://` may not behave exactly like the deployed Netlify site.