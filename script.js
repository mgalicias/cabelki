/* ==========================================================================
   CABELKI CRÊPES — Interactions
   Vanilla JS only. Sections:
   1. Sticky header state
   2. Mobile navigation
   3. Smooth scroll + active link highlighting
   4. Reveal-on-scroll animations
   5. Back to top button
   6. Footer year
   ========================================================================== */

(function () {
  "use strict";

  /* ---------------------- 1. Sticky header state ---------------------- */
  const header = document.getElementById("site-header");

  function updateHeaderState() {
    if (window.scrollY > 12) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }
  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });

  /* ---------------------- 2. Mobile navigation ---------------------- */
  const navToggle = document.getElementById("navToggle");
  const primaryNav = document.getElementById("primaryNav");

  function closeMobileNav() {
    primaryNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  navToggle.addEventListener("click", function () {
    const isOpen = primaryNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  primaryNav.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", closeMobileNav);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMobileNav();
  });

  /* --------------- 3. Smooth scroll + active link highlight --------------- */
  const navLinks = Array.from(document.querySelectorAll(".nav-link[href^='#']"));
  const sections = navLinks
    .map(function (link) { return document.querySelector(link.getAttribute("href")); })
    .filter(Boolean);

  function setActiveLink(id) {
    navLinks.forEach(function (link) {
      link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    const navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActiveLink(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (section) { navObserver.observe(section); });
  }

  /* ---------------------- 4. Reveal-on-scroll animations ---------------------- */
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------------------- 5. Back to top button ---------------------- */
  const backToTop = document.getElementById("backToTop");

  function updateBackToTop() {
    backToTop.classList.toggle("is-visible", window.scrollY > 480);
  }
  updateBackToTop();
  window.addEventListener("scroll", updateBackToTop, { passive: true });

  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------------------- 6. Footer year ---------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
