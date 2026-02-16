'use strict';

// ----- Sidebar (profile card) toggle on mobile
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
function setSidebarCollapsed(collapsed) {
  if (sidebar) sidebar.classList.toggle("collapsed", collapsed);
}
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () {
    setSidebarCollapsed(!sidebar.classList.contains("collapsed"));
  });
}
// Start collapsed on small viewports
if (window.matchMedia("(max-width: 899px)").matches) setSidebarCollapsed(true);
window.matchMedia("(max-width: 899px)").addEventListener("change", function (e) {
  if (e.matches) setSidebarCollapsed(true);
});

// ----- Page navigation
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
navigationLinks.forEach(function (navLink) {
  navLink.addEventListener("click", function () {
    const targetPage = this.innerHTML.toLowerCase().trim();
    pages.forEach(function (page) {
      page.classList.toggle("active", page.dataset.page === targetPage);
    });
    navigationLinks.forEach(function (link) {
      link.classList.toggle("active", link === navLink);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// ----- Contact form (mailto fallback for static site)
const contactForm = document.querySelector("[data-contact-form]");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = (this.querySelector("[name=name]") || {}).value || "";
    const email = (this.querySelector("[name=email]") || {}).value || "";
    const message = (this.querySelector("[name=message]") || {}).value || "";
    const subject = encodeURIComponent("Portfolio contact from " + name);
    const body = encodeURIComponent((message || "").trim() + "\n\n— " + name + " (" + email + ")");
    window.location.href = "mailto:nc203412@gmail.com?subject=" + subject + "&body=" + body;
  });
}

// ----- Project card expand / collapse
const projectToggles = document.querySelectorAll("[data-project-toggle]");
projectToggles.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const card = this.closest("[data-project-card]");
    if (!card) return;
    const isExpanded = card.classList.toggle("expanded");
    this.setAttribute("aria-expanded", isExpanded);
    this.textContent = isExpanded ? "Show less" : "Show more";
  });
});
