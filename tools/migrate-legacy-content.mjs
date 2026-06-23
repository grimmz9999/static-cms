import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = fileURLToPath(new URL("..", import.meta.url));
const contentRoot = join(root, "content");
const readLegacyWindow = async (file) => {
  const context = { window: {} };
  vm.runInNewContext(await readFile(join(root, file), "utf8"), context, { filename: file });
  return context.window;
};
const richText = (value) => {
  if (!Array.isArray(value)) return String(value || "");
  return value.map((part) => {
    if (typeof part === "string") return part;
    const text = part.strong ? `**${part.text}**` : part.text;
    return part.href ? `[${text}](${part.href})` : text;
  }).join("");
};
const write = async (file, value) => {
  const destination = join(contentRoot, file);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, `${JSON.stringify(value, null, 2)}\n`, "utf8");
};

const researchSource = await readLegacyWindow("assets/research/research-content.js");
await Promise.all((researchSource.RESEARCH_CONTENT || []).map((area, order) => write(
  `research/${area.slug}.json`,
  {
    ...area,
    order,
    description: (area.description || []).map(richText),
    examples: (area.examples || []).map((example) => ({
      ...example,
      body: (example.body || []).map(richText),
      bullets: (example.bullets || []).map(richText)
    }))
  }
)));

const publicationsSource = await readLegacyWindow("assets/publications-data.js");
const publicationGroups = publicationsSource.PUBLICATION_VIEWS || {};
await Promise.all(Object.entries(publicationGroups).flatMap(([category, items]) =>
  (items || []).map((item, order) => write(
    `publications/${category}-${String(order + 1).padStart(3, "0")}.json`,
    { ...item, category, order }
  ))
));

const newsSource = await readLegacyWindow("assets/news/news-data.js");
await Promise.all((newsSource.NEWS_CONTENT || []).map((item, order) => {
  const slug = `${item.year}-${item.dateLabel}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return write(`news/${slug}.json`, {
    ...item,
    slug,
    order,
    summary: richText(item.summary),
    details: (item.details || []).map(richText)
  });
}));

const siteFile = join(contentRoot, "site.json");
const site = JSON.parse(await readFile(siteFile, "utf8"));
site.researchIntro = {
  ...(researchSource.RESEARCH_INTRO || {}),
  body: (researchSource.RESEARCH_INTRO?.body || []).map(richText)
};
await writeFile(siteFile, `${JSON.stringify(site, null, 2)}\n`, "utf8");
