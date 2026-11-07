(() => {
  "use strict";

  const header = document.getElementById("siteHeader");
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("primaryNav");
  const categoryLinks = Array.from(document.querySelectorAll(".category-nav a"));
  const sections = categoryLinks.map((link) => document.querySelector(link.hash));
  let scrollQueued = false;

  const updateHeader = () => {
    header.classList.toggle("is-fixed", window.scrollY > 72);
    const categoryNav = document.querySelector(".category-nav");
    const offset = header.offsetHeight + categoryNav.offsetHeight + 24;
    let activeIndex = -1;
    sections.forEach((section, index) => {
      if (section.getBoundingClientRect().top <= offset) activeIndex = index;
    });
    if (sections.at(-1).getBoundingClientRect().bottom <= offset) activeIndex = -1;
    categoryLinks.forEach((link, index) => {
      if (index === activeIndex) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    scrollQueued = false;
  };

  const closeMenu = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.querySelector(".sr-only").textContent = "Abrir menú";
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.querySelector(".sr-only").textContent = isOpen ? "Cerrar menú" : "Abrir menú";
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      closeMenu();
      toggle.focus();
    }
  });
  window.addEventListener("scroll", () => {
    if (!scrollQueued) {
      scrollQueued = true;
      window.requestAnimationFrame(updateHeader);
    }
  }, { passive: true });
  window.addEventListener("resize", updateHeader);
  window.matchMedia("(min-width: 761px)").addEventListener("change", closeMenu);

  // Manual rotation keeps notices readable and respects reduced-motion preferences.
  const carousel = document.querySelector(".promo-carousel");
  const slides = Array.from(carousel.querySelectorAll(".promo-slide"));
  const controls = carousel.querySelector(".promo-controls");
  const dotsContainer = carousel.querySelector(".promo-dots");
  const status = document.getElementById("promoStatus");
  const slideTitles = slides.map((slide) => slide.getAttribute("aria-label").replace(/^\d+ de \d+:\s*/, ""));
  let activeSlide = 0;

  const dots = slides.map((slide, index) => {
    slide.setAttribute("aria-label", `${index + 1} de ${slides.length}: ${slideTitles[index]}`);
    const dot = document.createElement("button");
    dot.type = "button";
    dot.dataset.promoSlide = String(index);
    dot.setAttribute("aria-controls", slide.id);
    dot.setAttribute("aria-label", `Ver aviso ${index + 1}: ${slideTitles[index]}`);
    dot.addEventListener("click", () => showSlide(index));
    return dot;
  });
  dotsContainer.replaceChildren(...dots);

  function showSlide(index, announce = true) {
    activeSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => { slide.hidden = slideIndex !== activeSlide; });
    dots.forEach((dot, dotIndex) => {
      if (dotIndex === activeSlide) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
    document.getElementById("promoCurrent").textContent = String(activeSlide + 1).padStart(2, "0");
    if (announce) status.textContent = `Aviso ${activeSlide + 1} de ${slides.length}: ${slideTitles[activeSlide]}`;
  }

  document.querySelector(".promo-counter > span").textContent = `/ ${String(slides.length).padStart(2, "0")}`;
  document.getElementById("promoPrevious").addEventListener("click", () => showSlide(activeSlide - 1));
  document.getElementById("promoNext").addEventListener("click", () => showSlide(activeSlide + 1));
  controls.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      showSlide(activeSlide + (event.key === "ArrowRight" ? 1 : -1));
    }
  });

  const slideArea = document.getElementById("promoSlides");
  let touchStart = null;
  slideArea.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "touch" && !event.target.closest("a, button")) {
      touchStart = { x: event.clientX, y: event.clientY };
    }
  });
  slideArea.addEventListener("pointercancel", () => { touchStart = null; });
  slideArea.addEventListener("pointerup", (event) => {
    if (!touchStart) return;
    const dx = event.clientX - touchStart.x;
    const dy = event.clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) showSlide(activeSlide + (dx < 0 ? 1 : -1));
  });

  showSlide(0, false);
  controls.hidden = slides.length < 2;
  carousel.classList.add("is-ready");

  document.getElementById("year").textContent = new Date().getFullYear();
  updateHeader();
})();
