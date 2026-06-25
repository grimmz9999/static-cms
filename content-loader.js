(function () {
  const content = window.CMS_CONTENT;
  if (!content || !content.site) {
    console.error("CMS content is missing. Run node tools/build-content.mjs before deploying.");
    return;
  }

  const esc = (value) => String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;");
  const safeUrl = (value) => /^(https?:\/\/|mailto:|#|\/)/i.test(String(value || "")) ? String(value) : "#";
  const externalAttrs = (value) => /^https?:\/\//i.test(String(value || "")) ? ' target="_blank" rel="noreferrer"' : "";
  const markdown = (value) => {
    let html = esc(value);
    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
    return html.replace(/\[([^\]]+)\]\(([^\s)]+)\)/g, (_match, label, href) => `<a href="${esc(safeUrl(href))}"${externalAttrs(href)}>${label}</a>`);
  };
  const paragraphs = (items) => (items || []).map((item) => `<p>${markdown(item)}</p>`).join("");
  const setText = (selector, value) => { const element = document.querySelector(selector); if (element) element.textContent = value || ""; };
  const setHtml = (selector, value) => { const element = document.querySelector(selector); if (element) element.innerHTML = value; };
  const setAttr = (selector, attribute, value) => { const element = document.querySelector(selector); if (element && value) element.setAttribute(attribute, value); };

  const { site, research, team, publications, news } = content;
  const bio = content.bio || site.bio || {};
  const teaching = content.teaching || site.teaching || {};
  const contact = content.contact || site.contact || {};
  document.title = site.metadata?.title || document.title;
  setAttr('meta[name="description"]', "content", site.metadata?.description);
  setText("[data-cms-brand-mark]", site.brand?.mark); setText("[data-cms-brand-name]", site.brand?.name); setText("[data-cms-brand-subtitle]", site.brand?.subtitle);
  setHtml("[data-cms-nav]", (site.navigation || []).map((item) => `<a href="${esc(safeUrl(item.href))}">${esc(item.label)}</a>`).join(""));
  setText("[data-cms-hero-eyebrow]", site.hero?.eyebrow); setText("[data-cms-hero-title]", site.hero?.title); setHtml("[data-cms-hero-text]", `${esc(site.hero?.text)} <a class="contact-profile-link hero-learn-more" href="#legacy-overview" data-hidden-drawer-open="legacy-overview">Learn more</a>`);
  setHtml("[data-cms-hero-actions]", (site.hero?.actions || []).map((item) => `<a class="button ${esc(item.style || "secondary")}" href="${esc(safeUrl(item.href))}">${esc(item.label)}</a>`).join(""));
  setText("[data-cms-bio-kicker]", bio?.kicker); setText("[data-cms-bio-heading]", bio?.heading); setAttr("[data-cms-bio-image]", "src", bio?.portrait); setAttr("[data-cms-bio-image]", "alt", bio?.portraitAlt);
  setHtml("[data-cms-bio-paragraphs]", paragraphs(bio?.paragraphs));
  setHtml("[data-cms-bio-profiles]", (bio?.profiles || []).map((item) => `<a href="${esc(safeUrl(item.href))}"${externalAttrs(item.href)}><span>${esc(item.label)}</span></a>`).join(""));
  setText("[data-cms-education-heading]", bio?.educationHeading); setHtml("[data-cms-education]", (bio?.education || []).map((item) => `<span><strong>${esc(item.period)}</strong>${esc(item.detail)}</span>`).join(""));
  setText("[data-cms-research-kicker]", site.researchHeading?.kicker); setText("[data-cms-research-heading]", site.researchHeading?.title); setText("[data-cms-team-heading]", site.teamHeading);
  const groups = [{ id: "current", label: "Current Members", open: true }, { id: "alumni", label: "Alumni", open: false }];
  setHtml("[data-cms-team]", groups.map((group) => {
    const members = team.filter((item) => item.group === group.id);
    const rows = members.length ? members.map((member) => `<article class="team-member-card"><figure class="team-member-photo"><img src="${esc(member.photo)}" alt="${esc(member.photoAlt || member.name)}"></figure><div class="team-member-copy"><p class="team-member-role">${esc(member.role)}</p><h3>${esc(member.name)}</h3><p class="team-member-bio">${markdown(member.bio)}</p><div class="profile-links team-member-links">${(member.links || []).map((link) => `<a href="${esc(safeUrl(link.href))}"${externalAttrs(link.href)}><span>${esc(link.label)}</span></a>`).join("")}</div>${(member.topics || []).length ? `<div class="team-topic-row"><span class="team-topic-label">Topic:</span><div class="team-topic-list">${member.topics.map((topic) => `<span>${esc(topic)}</span>`).join("")}</div></div>` : ""}</div></article>`).join("") : '<p class="team-empty-state">No members listed yet.</p>';
    return `<details class="team-group"${group.open ? " open" : ""}><summary class="team-group-toggle"><span>${group.label}</span><span aria-hidden="true"></span></summary>${rows}</details>`;
  }).join(""));
  
  setText("[data-cms-teaching-kicker]", teaching.kicker); setText("[data-cms-teaching-title]", teaching.title); setHtml("[data-cms-teaching-meta]", (teaching.meta || []).map((item) => `<span>${esc(item)}</span>`).join("")); setText("[data-cms-teaching-description]", teaching.description); setText("[data-cms-teaching-link]", teaching.linkLabel); setAttr("[data-cms-teaching-link]", "href", teaching.linkHref);
  setHtml("[data-cms-teaching-feature]", teaching.feature ? `<button class="teaching-zoom" type="button" data-site-zoom-src="${esc(teaching.feature.src)}" data-site-zoom-alt="${esc(teaching.feature.caption || teaching.feature.alt)}" aria-label="Zoom image: ${esc(teaching.feature.alt)}"><img src="${esc(teaching.feature.src)}" alt="${esc(teaching.feature.alt)}"></button><figcaption>${esc(teaching.feature.caption || teaching.feature.alt)}</figcaption>` : "");
  setHtml("[data-cms-teaching-gallery]", (teaching.gallery || []).map((item) => `<figure><button class="teaching-zoom" type="button" data-site-zoom-src="${esc(item.src)}" data-site-zoom-alt="${esc(item.caption || item.alt)}" aria-label="Zoom image: ${esc(item.alt)}"><img src="${esc(item.src)}" alt="${esc(item.alt)}"></button><figcaption>${esc(item.caption || item.alt)}</figcaption></figure>`).join(""));
  
  setText("[data-cms-contact-title]", contact.title); setText("[data-cms-contact-description]", contact.description); setText("[data-cms-contact-profile]", contact.profileLabel); setAttr("[data-cms-contact-profile]", "href", contact.profileHref); setText("[data-cms-position-label]", contact.positionLabel); setText("[data-cms-position-title]", contact.positionTitle); setText("[data-cms-position-summary]", contact.positionSummary); setText("[data-cms-guidance-label]", contact.guidanceLabel); setText("[data-cms-guidance-title]", contact.guidanceTitle); setHtml("[data-cms-guidance-body]", paragraphs(contact.guidance));
  setText("[data-cms-footer-name]", site.footer?.name); setHtml("[data-cms-footer-links]", (site.footer?.links || []).map((item) => `<a href="${esc(safeUrl(item.href))}"${externalAttrs(item.href)}>${esc(item.label)}</a>`).join(""));
  window.RESEARCH_CONTENT = research || []; window.HIDDEN_DRAWERS = content.hiddenDrawers || []; window.RESEARCH_INTRO = site.researchIntro || {}; window.PUBLICATION_VIEWS = publications || {}; window.NEWS_CONTENT = news || []; window.cmsContentReady = Promise.resolve(content);
}());
