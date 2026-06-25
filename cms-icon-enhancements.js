(function () {
  const icons = {
    "Google Scholar": '<span class="link-icon scholar-icon image-icon" aria-hidden="true"><img src="assets/google-scholar.png?v=2" alt=""></span>',
    LinkedIn: '<span class="link-icon linkedin-icon svg-icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.32 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.1 20.45H3.54V9H7.1v11.45z"/></svg></span>',
    ORCID: '<span class="link-icon orcid-icon orcid-text-icon" aria-hidden="true">iD</span>',
    Email: '<span class="link-icon" aria-hidden="true">@</span>',
    GitHub: '<span class="link-icon github-icon svg-icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.16c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18A10.93 10.93 0 0 1 12 6.04c.98 0 1.95.13 2.87.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 3.04.11 3.04.74.8 1.19 1.83 1.19 3.08 0 4.42-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.13v3.18c0 .31.21.67.79.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg></span>'
  };

  const addProfileIcons = (selector) => {
    document.querySelectorAll(selector).forEach((link) => {
      const label = link.textContent.trim();
      if (!icons[label]) return;
      link.innerHTML = `${icons[label]}<span>${label}</span>`;
    });
  };

  addProfileIcons("[data-cms-bio-profiles] a, [data-cms-team] .profile-links a");
  document.querySelectorAll("[data-cms-footer-links] a").forEach((link) => {
    const label = link.textContent.trim();
    if (!icons[label]) return;
    link.classList.add("footer-icon-link");
    link.setAttribute("aria-label", label);
    link.innerHTML = icons[label];
  });
}());
