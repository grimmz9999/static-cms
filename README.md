# Lab website CMS handoff

This is a static lab website with an editor dashboard at `/admin`. Routine content is stored in `content/`; the design, CSS, interactions, and CMS configuration remain developer-managed.

## Before launch

1. Create a GitHub repository in the customer's organization and push this folder to its `main` branch.
2. Import that repository into a customer-owned Netlify account. Netlify runs `node tools/build-content.mjs` for every deployment.
3. In Netlify, enable **Identity**, set registrations to **Invite only**, then enable **Git Gateway**.
4. Invite the named lab owner through Netlify Identity. Do not use a developer's personal account.
5. Replace both `YOUR-SITE.netlify.app` values in `admin/config.yml` with the Netlify preview URL, then with the final custom-domain URL after DNS is connected.
6. Add the custom domain in Netlify and add it to the allowed Identity redirect URLs.

## Editing and publishing

Visit `https://your-domain.example/admin`, sign in, select a content collection, make changes, and choose **Publish**. The CMS commits to the `main` branch; Netlify automatically builds and publishes the updated site.

- **Site settings** controls the hero, biography, navigation labels, teaching, contact area, and footer.
- **Research areas**, **Team members**, **Publications and presentations**, and **News** support add, edit, reorder, and delete actions. Smaller display-order numbers appear first.
- Use the image selector for every image. Uploads are stored in `assets/uploads/`; always provide useful alt text and a caption where available.
- Text fields marked Markdown support paragraphs, `*emphasis*`, `**bold**`, and `[link text](https://example.org)`.

## Safety and recovery

- Keep GitHub, Netlify, domain/DNS, and the administrator email customer-owned.
- Do not put passwords, API keys, database credentials, or private documents in this repository.
- To undo a content change, restore the earlier commit in GitHub, then let Netlify deploy it. The original static homepage is retained as `index.legacy-static.html` for reference only.
- Keep `admin/config.yml`, `tools/build-content.mjs`, CSS, and interaction scripts under developer control. They define the website structure and should be changed only by a developer.

## Local preview

After editing content locally, run `node tools/build-content.mjs`, then serve this folder with any static web server. Opening `index.html` directly can prevent browser features from behaving like the deployed site.
