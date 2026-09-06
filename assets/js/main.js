/**
 * Cabinet Orthéna — script principal
 * Navigation, animations discrètes au scroll, injection de la configuration,
 * accordéon FAQ, galerie/lightbox, bandeau cookies.
 * Aucune dépendance externe. Respecte prefers-reduced-motion.
 */
(function () {
  "use strict";

  var cfg = window.ORTHENA_CONFIG || {};
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("DOMContentLoaded", function () {
    applyConfig();
    initHeader();
    initMobileNav();
    initMobileCTA();
    initReveal();
    initSubnav();
    initTimeline();
    initGallery();
    initCookieBanner();
    initFooterYear();
    initHeroParallax();
  });

  /* -------------------------------------------------------------------
     Injection de la configuration centrale dans le DOM
     ------------------------------------------------------------------- */
  function applyConfig() {
    // Tous les boutons "Prendre rendez-vous" (header, hero, sections RDV,
    // footer...) pointent vers l'URL Doctolib définie dans config.js.
    // Il suffit de changer cette seule valeur pour mettre à jour tous les
    // boutons du site en une fois (voir assets/js/config.js).
    var doctolibLinks = document.querySelectorAll("[data-doctolib]");
    doctolibLinks.forEach(function (el) {
      if (cfg.doctolibUrl) {
        el.setAttribute("href", cfg.doctolibUrl);
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener noreferrer");
      }
    });

    setText("[data-cfg='phoneDisplay']", cfg.phoneDisplay);
    setText("[data-cfg='emailDisplay']", cfg.emailDisplay);
    setText("[data-cfg='addressLine1']", cfg.addressLine1);
    setText("[data-cfg='addressStreet']", cfg.addressStreet);
    setText("[data-cfg='addressPostal']", cfg.addressPostal);
    setText("[data-cfg='addressNote']", cfg.addressNote);
    setText("[data-cfg='openingHoursNote']", cfg.openingHoursNote);

    document.querySelectorAll("[data-cfg='mapHref']").forEach(function (el) {
      if (cfg.addressFullOneLine) {
        el.setAttribute("href", "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(cfg.addressFullOneLine));
      }
    });

    // Liste des jours/horaires connus (voir assets/js/config.js) — le texte
    // de repli (data-cfg="openingHoursNote") reste affiché en dessous pour
    // les jours non encore communiqués.
    if (cfg.openingHours && cfg.openingHours.length) {
      document.querySelectorAll("[data-hours-list]").forEach(function (list) {
        cfg.openingHours.forEach(function (entry) {
          var li = document.createElement("li");
          var day = document.createElement("span");
          day.className = "hours-day";
          day.textContent = entry.day;
          var hours = document.createElement("span");
          hours.className = "hours-time";
          hours.textContent = entry.hours;
          li.appendChild(day);
          li.appendChild(hours);
          list.appendChild(li);
        });
      });
    }
    setText("[data-cfg='emergencyNumber']", cfg.emergencyNumber);
    setText("[data-cfg='assistantRole']", cfg.assistantRole);

    document.querySelectorAll("[data-cfg='phoneHref']").forEach(function (el) {
      if (cfg.phone) { el.setAttribute("href", "tel:" + cfg.phone.replace(/\s/g, "")); }
    });
    document.querySelectorAll("[data-cfg='emailHref']").forEach(function (el) {
      if (cfg.email) { el.setAttribute("href", "mailto:" + cfg.email); }
    });

    if (cfg.assistantName) {
      document.querySelectorAll("[data-cfg='assistantName']").forEach(function (el) {
        el.textContent = cfg.assistantName;
      });
      document.querySelectorAll(".assistant-placeholder-chip").forEach(function (el) {
        el.style.display = "none";
      });
    }
  }

  function setText(selector, value) {
    if (!value) return;
    document.querySelectorAll(selector).forEach(function (el) {
      el.textContent = value;
    });
  }

  /* -------------------------------------------------------------------
     Header sticky
     ------------------------------------------------------------------- */
  function initHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var threshold = 40;

    function onScroll() {
      if (window.scrollY > threshold) {
        header.classList.add("is-solid");
      } else {
        header.classList.remove("is-solid");
      }
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* -------------------------------------------------------------------
     Navigation mobile (menu plein écran)
     ------------------------------------------------------------------- */
  function initMobileNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".mobile-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* -------------------------------------------------------------------
     Bouton "Prendre rendez-vous" sticky mobile — apparaît après le hero
     ------------------------------------------------------------------- */
  function initMobileCTA() {
    var bar = document.querySelector(".mobile-cta-bar");
    if (!bar) return;
    var revealAfter = window.innerHeight * 0.55;

    function onScroll() {
      if (window.scrollY > revealAfter) {
        bar.classList.add("is-visible");
      } else {
        bar.classList.remove("is-visible");
      }
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* -------------------------------------------------------------------
     Apparition progressive des sections au scroll
     ------------------------------------------------------------------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -60px 0px" });

    items.forEach(function (el) { observer.observe(el); });
  }

  /* -------------------------------------------------------------------
     Sous-navigation d'ancrage (mise en évidence de la section active)
     ------------------------------------------------------------------- */
  function initSubnav() {
    var subnav = document.querySelector(".subnav");
    if (!subnav) return;
    var links = subnav.querySelectorAll("a");
    var sections = [];
    links.forEach(function (a) {
      var id = a.getAttribute("href").replace("#", "");
      var section = document.getElementById(id);
      if (section) sections.push({ link: a, section: section });
    });
    if (!sections.length || !("IntersectionObserver" in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var match = sections.find(function (s) { return s.section === entry.target; });
        if (!match) return;
        if (entry.isIntersecting) {
          links.forEach(function (l) { l.classList.remove("is-active"); });
          match.link.classList.add("is-active");
        }
      });
    }, { rootMargin: "-40% 0px -50% 0px" });

    sections.forEach(function (s) { observer.observe(s.section); });
  }

  /* -------------------------------------------------------------------
     Timeline du parcours patient — remplissage progressif de la ligne
     ------------------------------------------------------------------- */
  function initTimeline() {
    var timeline = document.querySelector(".timeline");
    if (!timeline) return;
    var fill = timeline.querySelector(".timeline-track-fill");
    var steps = timeline.querySelectorAll(".timeline-step");

    if (reduceMotion || !("IntersectionObserver" in window)) {
      steps.forEach(function (s) { s.classList.add("is-visible"); });
      if (fill) fill.style.height = "100%";
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
      updateFill();
    }, { threshold: 0.4 });

    steps.forEach(function (s) { observer.observe(s); });

    function updateFill() {
      if (!fill) return;
      var visibleCount = timeline.querySelectorAll(".timeline-step.is-visible").length;
      var pct = (visibleCount / steps.length) * 100;
      fill.style.height = pct + "%";
    }
  }

  /* -------------------------------------------------------------------
     Galerie + lightbox
     ------------------------------------------------------------------- */
  function initGallery() {
    var items = document.querySelectorAll(".gallery-item[data-full], .cabinet-feature[data-full]");
    var lightbox = document.querySelector(".lightbox");
    if (!items.length || !lightbox) return;

    var lbImg = lightbox.querySelector("img");
    var lbCaption = lightbox.querySelector(".lightbox-caption");
    var closeBtn = lightbox.querySelector(".lightbox-close");

    items.forEach(function (item) {
      item.addEventListener("click", function () {
        open(item);
      });
      var btn = item.querySelector(".expand");
      if (btn) {
        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          open(item);
        });
      }
    });

    function open(item) {
      lbImg.setAttribute("src", item.getAttribute("data-full"));
      lbImg.setAttribute("alt", item.querySelector("img") ? item.querySelector("img").alt : "");
      lbCaption.textContent = item.getAttribute("data-caption") || "";
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }
    function close() {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
    }
    closeBtn.addEventListener("click", close);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  /* -------------------------------------------------------------------
     Bandeau cookies (consentement simple)
     ------------------------------------------------------------------- */
  function initCookieBanner() {
    var banner = document.querySelector(".cookie-banner");
    if (!banner) return;
    var KEY = "orthena_cookie_consent";

    try {
      if (localStorage.getItem(KEY)) return;
    } catch (e) { /* localStorage indisponible */ }

    window.setTimeout(function () { banner.classList.add("is-visible"); }, 900);

    banner.querySelectorAll("[data-cookie-action]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        try { localStorage.setItem(KEY, btn.getAttribute("data-cookie-action")); } catch (e) {}
        banner.classList.remove("is-visible");
      });
    });
  }

  /* -------------------------------------------------------------------
     Parallaxe très subtile de l'image du hero (desktop uniquement,
     amplitude volontairement faible pour rester discrète et premium)
     ------------------------------------------------------------------- */
  function initHeroParallax() {
    var img = document.querySelector(".hero-media img");
    if (!img || reduceMotion || window.innerWidth < 720) return;

    var ticking = false;
    var maxShift = 34; // pixels — déplacement maximal, volontairement discret

    function update() {
      var y = window.scrollY;
      var shift = Math.min(y * 0.06, maxShift);
      img.style.transform = "scale(1.08) translateY(" + shift + "px)";
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
  }

  /* -------------------------------------------------------------------
     Année courante dans le footer
     ------------------------------------------------------------------- */
  function initFooterYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }
})();
