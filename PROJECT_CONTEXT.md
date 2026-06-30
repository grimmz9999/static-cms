# Project Context: Sang-ri Yi Lab Website CMS

## Current Project

Main working folder:

`C:\Users\DELL\Documents\Web design\sangri-static-cms`

This is the current customer-deliverable version of Dr. Sang-ri Yi's Engineering Risk, Uncertainty, and Resilience Lab website. It started as a polished static HTML/CSS/JS site and has been converted into a lightweight Decap CMS site for customer editing.

The site is based on content from:

- https://uncertainty.blogs.rice.edu/
- https://uncertainty.blogs.rice.edu/research/
- https://uncertainty.blogs.rice.edu/teaching/

Current deployment / admin context:

- Netlify live site: https://eur-lab.netlify.app
- CMS admin route: https://eur-lab.netlify.app/admin/
- GitHub repository: https://github.com/grimmz9999/static-cms
- Git branch used by CMS: `master`
- CMS backend: Netlify Identity + Git Gateway
- Decap CMS is loaded from a local bundled file copied to `admin/decap-cms.js`, not from a CDN.

Important build files:

- `package.json`: `npm run build` runs the content build and Decap copy step.
- `netlify.toml`: Netlify runs `npm run build` and publishes the repo root.
- `tools/build-content.mjs`: reads JSON content and writes `generated/cms-content.js`.
- `tools/copy-decap-cms.mjs`: copies Decap CMS from `node_modules/decap-cms/dist/decap-cms.js` into `admin/decap-cms.js`.
- `.github/workflows/build-cms-content.yml`: rebuilds `generated/cms-content.js` on GitHub after content changes and commits the generated update back to `master`.
- `README.md`: customer-facing handoff and maintenance guide.

## Main Runtime Files

- `index.html`: static page shell and CMS data hooks.
- `content-loader.js`: renders global/homepage content from `window.CMS_CONTENT` into the shell.
- `research-demo.js`: renders the Research cards, right-side drawers, image lightbox, and hidden overview drawer.
- `script.js`: navigation, publications tabs, news archive, teaching carousel, and site lightbox behavior.
- `styles.css`: global layout, hero, bio, team, publications, teaching, news, contact, footer.
- `research-demo.css`: Research cards/drawers/lightbox plus hidden legacy drawer styling.
- `cms-icon-enhancements.js`: restores inline profile/footer icon treatments after CMS rendering.
- `generated/cms-content.js`: generated file; do not edit directly.

## Customer Editing Boundaries

Routine customer editing should happen through the CMS at `/admin` or, for GitHub-familiar maintainers, by editing JSON content files under `content/`.

Customer-editable content:

- `content/site.json`
- `content/bio.json`
- `content/teaching.json`
- `content/contact.json`
- `content/research/*.json`
- `content/hidden-drawers/legacy-overview.json`
- `content/team/*.json`
- `content/publications/*.json`
- `content/news/*.json`
- CMS-uploaded media in `assets/uploads/`

Developer-maintained files:

- `index.html`
- `styles.css`
- `research-demo.css`
- `content-loader.js`
- `research-demo.js`
- `script.js`
- `cms-icon-enhancements.js`
- `admin/config.yml`
- `tools/*.mjs`
- `.github/workflows/build-cms-content.yml`
- `netlify.toml`

Generated/reference files:

- `generated/cms-content.js` is generated from `content/`; do not manually edit it unless intentionally repairing a build problem.
- `index.legacy-static.html` is reference-only and is not the active homepage.

If the user asks to "remove or clearly label anything not meant for customer editing," prefer clear labels/comments and README guidance over deleting files. Do not delete developer-maintained files or reference files unless the user explicitly confirms removal.

## CMS Content Structure

Editable content lives in `content/` and is configured in `admin/config.yml`. The CMS sidebar should follow the webpage order: Site settings, Biography, Research areas, Team members, Publications and presentations, Teaching, News, Contact us.

Current content files / folders:

- `content/site.json`: metadata, brand, navigation, hero, research heading/intro, team heading, footer.
- `content/bio.json`: Biography section, portrait, profile links, education.
- `content/teaching.json`: Teaching section text, course metadata, feature image, gallery.
- `content/contact.json`: Contact Us section and prospective student/open-position guidance.
- `content/research/*.json`: four visible research cards/drawers only.
- `content/hidden-drawers/legacy-overview.json`: hidden drawer opened from the hero `Learn more` link.
- `content/team/*.json`: team member records.
- `content/publications/*.json`: publications, conference presentations, dataset records.
- `content/news/*.json`: news archive entries.

Important CMS structure decision:

- Biography, Teaching, and Contact are independent CMS collections, not nested inside Site settings.
- Site settings should remain for global/header/hero/navigation/research-intro/footer type content.
- The hidden legacy drawer is edited as a subordinate file inside the Site settings CMS collection, not as a top-level CMS collection, and not inside Research areas.
- Research should remain exactly four visible cards unless the design is intentionally changed by a developer.

Image uploads are configured as:

- `media_folder: assets/uploads`
- `public_folder: /assets/uploads`

Existing curated/design images may remain elsewhere in `assets/`; future CMS uploads go to `assets/uploads/`.

## Overall Design Direction

The desired style is polished, editorial, restrained, and academic, inspired by BBC/OpenAI/Anthropic pages rather than a generic university WordPress site.

Important visual preferences:

- Keep the site clean, concise, and organized.
- Avoid redundant explanatory sections.
- Use wide, well-aligned section titles.
- Use thin gray dividers between major sections.
- Keep section gaps relatively compact.
- Use `Inter` for navigation, metadata, buttons, compact labels, and most link controls.
- Use `Source Serif 4` for important editorial prose paragraphs, especially bio, research summaries, drawer body copy, teaching description, and team bios.
- Avoid awkwardly cropped technical diagrams unless cropping is intentionally part of a background/hero treatment.
- Technical images should usually use `object-fit: contain`.
- Buttons/nav should feel close to OpenAI style: light weight, non-current nav black, hovered inactive nav gray, active item in a striking blue.
- Header should have transparent glass blur.

## Current Major Sections

The homepage includes:

- Hero / Computational UQ for resilient infrastructure
- About Sang-ri Yi
- Research
- Team
- Publications
- Teaching
- News
- Contact Us

The old redundant visible sections such as Welcome, Research Challenge, and Methods are not standalone homepage sections. The old Rice homepage content now lives in a hidden drawer opened from the hero paragraph.

## Hero / Header

The hero uses:

- `assets/uq-hero-background-clean.png`

The hero has a scroll snap-like behavior: scrolling down from the first screen moves to the Bio section.

Hero content is CMS-rendered from `content/site.json`. The hero paragraph includes an inline `Learn more` link rendered by `content-loader.js`.

Important Learn more link preferences:

- The hero `Learn more` appears inline immediately after the hero paragraph text.
- It opens the hidden legacy overview drawer using `data-hidden-drawer-open="legacy-overview"`.
- It reuses the Rice-profile link underline/color treatment but should not be bold.
- Its font family, font size, line height, and weight should inherit from the surrounding hero paragraph.

## Hidden Legacy Overview Drawer

The hidden drawer is defined by:

- `content/hidden-drawers/legacy-overview.json`
- `assets/legacy-uq-overview.png`
- special rendering in `research-demo.js`
- styling in `research-demo.css`

Purpose:

- Migrate the old homepage at https://uncertainty.blogs.rice.edu/ into the current site without adding a fifth visible Research card.

Behavior:

- It opens from the hero `Learn more` link.
- It uses the same right-side drawer shell, close behavior, Escape behavior, and overlay as the Research drawers.
- It is hidden from the visible Research card grid.

Layout preferences:

- Match the original page flow: text, image, challenge list, Research Areas heading, research-area list, final inline link.
- Do not divide this drawer into cards or separate block panels.
- Do not render a top `Welcome` title.
- Include the original page image locally as `assets/legacy-uq-overview.png`; center it and keep it slightly smaller than full drawer width.
- The `Research Areas` heading should match the style of drawer example titles such as `Open-source regional resilience workflows` (the `.research-detail-copy h4` style: 18px, line-height 1.18, ink color).
- Body copy and list items should match other drawer body text: `Source Serif 4`, 17px, line-height 1.36.
- Preserve bold emphasis from the original welcome page using markdown `**...**` in the content JSON. Current original bold phrases are: `resilient urban infrastructure`, `uncertainty quantification (UQ)`, `scalable and robust`, `statistical tools`, `readily deployed to real-world engineering problems.`, `multi-scale`, `multi-fidelity`, `complex infrastructural systems`, and `computational UQ methods`.
- Do not collect links at the bottom. Links should remain inline in the relevant text.
- The final `Research` link should point to this lab site's `#research` section, not the old WordPress research page. Clicking it inside the drawer should close the drawer and scroll to the local Research section.

## About Sang-ri Yi

The Bio section includes:

- Full personal intro text
- Portrait image
- Education box
- Profile buttons/icons for Google Scholar, LinkedIn, ORCID
- GitHub icon moved to the footer

Important preferences:

- Portrait should not be cropped.
- Portrait should align visually with the bio/education content.
- Main bio paragraphs use `Source Serif 4`.
- Keywords/metadata/button text should remain `Inter`, not serif.

Bio content is now edited in `content/bio.json` and through the Biography CMS collection.

## Team

The Team section uses an editorial roster design rather than a simple letter-avatar card.

Current state:

- No large title in the Team section.
- Section label is `Team`.
- `Current Members` is a folding section opened by default.
- `Alumni` is a parallel folding section with no members listed yet.
- Dr. Seonghyun Lim is shown as a compact horizontal profile row with portrait, role, name, serif bio, topic tags, Email, and Google Scholar link.
- Sang-ri should remain out of this section because PI information belongs in the Bio section.

Design intent:

- With one member, the section should not look empty.
- With more members later, repeat the same profile card pattern or group by member type such as Current Members, Graduate Students, Visiting Researchers, and Alumni.
- Bio prose should use `Source Serif 4`; role, topics, and links should use `Inter`.

## Research Section

The visible Research section is the modal/drawer design.

Visible research content lives in:

- `content/research/*.json`

Research styling and interaction live in:

- `research-demo.css`
- `research-demo.js`

There should be exactly four visible Research cards/columns:

1. Surrogate Modeling
2. System-Reliability-based Resilience Assessment
3. Regional Risk Assessment
4. Random Vibrations and Random Fields

Do not add the legacy overview as a fifth visible Research card.

Current Research card order/structure:

1. Text block: title and summary
2. Zoomable image
3. Keywords and applications
4. `Learn more` button

Current Research card preferences:

- Four columns on desktop.
- Card summary text uses `Source Serif 4`.
- Keywords/applications remain `Inter`.
- Keywords are italicized.
- Card columns are compact: smaller text and reduced padding.
- Card images are zoomable.

Current drawer preferences:

- Drawer opens from the right.
- Drawer header/close bar has glass blur like the main header.
- Drawer should not repeat the main overview/card image.
- Drawer detail cards show text on the left and image on the right.
- Drawer body text uses `Source Serif 4`.
- Drawer keywords/applications remain `Inter`.
- Images inside normal Research drawers are zoomable with a lightbox.

## Publications

The Publications section uses compact tabs:

- Publications
- Conference Presentations
- Dataset

Important publication/content notes:

- Conference items must stay in the Conference Presentations tab, not mixed into Publications.
- The earlier `latest` migrated items were corrected so journal-like records use `category: publications` and conference-like records use `category: conferences`.
- Keep rows compact with aligned full-width dividers.

## Teaching

Teaching sits between Publications and News.

Source page:

- https://uncertainty.blogs.rice.edu/teaching/

Teaching content centers on:

- `CEVE456/556 Uncertainty Quantification`
- Fall semesters
- Civil & Environmental Engineering
- Graduate / advanced undergraduate

Teaching section should feel like an academic course feature, not a syllabus card.

It uses:

- Featured image
- Compact teaching image strip/grid
- Serif course description paragraph
- `View course page` link

Teaching content is now edited in `content/teaching.json` and through the Teaching CMS collection.

## News

The News Atlas mosaic was removed from the active site.

Current News behavior:

- Keep the News section as an archive grouped by year.
- News/activity images should appear in the archive entry thumbnails only.
- Each activity should include at most one image.
- The earlier explanatory line `Recent updates are grouped as a timeline...` remains removed.

## Contact

The section is named `Contact Us`.

Gaps before the Contact section were reduced.

Contact content is now edited in `content/contact.json` and through the Contact us CMS collection.

## Icons / Footer

Profile/footer icon preferences:

- Use LinkedIn/GitHub icons in a style similar to OpenAI's footer icons.
- Google Scholar uses local asset `assets/google-scholar.png`.
- ORCID icon is styled as `iD`, with green lettering.
- GitHub icon links to https://github.com/yisangriB.
- Footer should not include Research/Publications text links.

Inline SVG/profile icons were not deleted from the legacy static file; they were restored dynamically for CMS-rendered links via `cms-icon-enhancements.js`.

## Hosting / Netlify / Identity Notes

- Netlify Identity registration should be invitation-only.
- Git Gateway must be enabled.
- CMS branch is `master`, not `main`.
- The invited lab owner must accept the Netlify Identity invitation and set a password; logging in with a Gmail address is not the same as Google OAuth unless an external provider is configured.
- The customer should own GitHub, Netlify, DNS/domain, and editor accounts.
- The static site can be hosted anywhere, but the current no-code CMS maintenance workflow relies on Netlify Identity, Netlify Git Gateway, GitHub, and GitHub Actions.
- GitHub Actions must have repository write permission: GitHub Settings -> Actions -> General -> Workflow permissions -> Read and write permissions.
- A normal CMS edit may trigger two Netlify deploys: first the CMS content/media commit, then the GitHub Actions commit that updates `generated/cms-content.js`. The second deploy is the final synchronized version.
- After GitHub Actions commits generated content, local developers should pull/fetch before making the next local commit so the local repo includes the bot-generated `generated/cms-content.js` update.

## Media Notes

- Decap media library shows files from `assets/uploads`.
- Existing curated site images live in `assets/` and subfolders; they will not appear in the media library unless copied/migrated into uploads.
- Do not set `media_folder: assets` casually, because that mixes uploads with curated assets and JS/data files.
- Media uploaded through Decap CMS can be committed into GitHub under `assets/uploads/` through Git Gateway.

## Current Cache Versions

Current active cache versions in `index.html` may change as edits continue. At the time of this update they include approximately:

- `styles.css?v=78`
- `research-demo.css?v=14`
- `content-loader.js?v=4`
- `research-demo.js?v=13`
- `script.js?v=11`

When editing CSS/JS, update the cache query version in `index.html` so browser refreshes show changes.

## Local / Build Notes

- Netlify runs `npm run build`, which builds content and copies the Decap CMS bundle.
- Local Node/npm is helpful for development but not required for routine customer CMS edits.
- In the Codex desktop environment used during this project, PowerShell did not expose `node`/`npm` and `node_modules` was not installed, but the Node REPL tool could still run `tools/build-content.mjs`.
- To rebuild generated content in a normal developer environment, run `node tools/build-content.mjs` or `npm run build`.
- Opening `index.html` directly with `file://` may not behave exactly like the deployed site. Prefer a local static server or the Netlify deployment for preview.

## Previous / Reference Files

- `index.legacy-static.html` is retained as a reference only.
- The original static context pointed to `C:\Users\DELL\Documents\Codex\2026-06-09\pdf\outputs\sangri-static-revised`, but the active repo for CMS work is now `C:\Users\DELL\Documents\Web design\sangri-static-cms`.

## How To Continue In A New Chat

In a new Codex chat, say:

`Please read PROJECT_CONTEXT.md first, then inspect index.html, content-loader.js, research-demo.js, research-demo.css, styles.css, admin/config.yml, tools/build-content.mjs, and the relevant content/*.json files before editing.`

Do not assume the context file is enough by itself. Always inspect the actual files before making changes.
