/* ============================================================
   main.js — navbar · mobile drawer · reveal · stat counters
   Minimal vanilla JS. Respects prefers-reduced-motion.
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- Sticky navbar: transparent → solid ---------- */
  var navbar = document.querySelector("[data-navbar]");
  var SOLID_AFTER = 40;

  function onScroll() {
    if (!navbar) return;
    navbar.classList.toggle("is-solid", window.scrollY > SOLID_AFTER);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile drawer ---------- */
  var toggle = document.querySelector("[data-nav-toggle]");
  var drawer = document.querySelector("[data-mobile-menu]");
  var scrim = drawer ? drawer.querySelector("[data-mobile-scrim]") : null;

  function setMenu(open) {
    if (!toggle || !drawer) return;
    toggle.setAttribute("aria-expanded", String(open));
    drawer.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      var first = drawer.querySelector("a");
      if (first) first.focus({ preventScroll: true });
    } else {
      toggle.focus({ preventScroll: true });
    }
  }

  if (toggle && drawer) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") !== "true";
      setMenu(open);
    });
    if (scrim) scrim.addEventListener("click", function () { setMenu(false); });
    drawer.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && drawer.classList.contains("is-open")) {
        setMenu(false);
      }
    });
  }

  /* ---------- Active nav link ---------- */
  var links = Array.prototype.slice.call(
    document.querySelectorAll("[data-nav-link]")
  );
  var sections = links
    .map(function (a) {
      var id = a.getAttribute("href");
      if (!id || id.charAt(0) !== "#") return null;
      return document.querySelector(id);
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length && !reduceMotion) {
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          links.forEach(function (a) {
            a.classList.toggle(
              "is-active",
              a.getAttribute("href") === "#" + en.target.id
            );
          });
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(function (s) { obs.observe(s); });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal, .img-reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var rObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("is-visible");
            rObs.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { rObs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Animated stat counters ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    if (isNaN(target)) return;
    if (reduceMotion) {
      el.textContent = formatNum(target) + suffix;
      return;
    }
    var dur = 1400;
    var start = null;
    function frame(t) {
      if (!start) start = t;
      var p = Math.min((t - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = formatNum(Math.round(target * eased)) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function formatNum(n) {
    return n.toLocaleString("en-IN");
  }

  var counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var cObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            animateCount(en.target);
            cObs.unobserve(en.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach(function (el) { cObs.observe(el); });
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- Featured product tabs (data-driven, lightweight) ---------- */
  (function featured() {
    var tabsWrap = document.querySelector("[data-featured-tabs]");
    if (!tabsWrap) return;
    var list =
      (window.BMI && window.BMI.products) || [];
    if (!list.length) return;

    var tabs = Array.prototype.slice.call(
      tabsWrap.querySelectorAll("[data-featured-tab]")
    );
    var panel = document.querySelector("[data-featured-panel]");
    var img = document.querySelector("[data-featured-img]");
    var count = document.querySelector("[data-featured-count]");
    var nameEl = document.querySelector("[data-featured-name]");
    var descEl = document.querySelector("[data-featured-desc]");
    var pointsEl = document.querySelector("[data-featured-points]");
    var appsEl = document.querySelector("[data-featured-apps]");
    var current = 0;

    /* Preload detail images for instant transitions */
    if (!reduceMotion) {
      list.forEach(function (p) {
        if (p.featuredImage) {
          var pre = new Image();
          pre.src = p.featuredImage;
        }
      });
    }

    function pad(n, total) {
      var s = String(n);
      return (s.length < 2 ? "0" + s : s) + " / " + (total < 10 ? "0" + total : total);
    }

    function render(i) {
      var p = list[i];
      if (!p) return;
      current = i;
      tabs.forEach(function (t, k) {
        var on = k === i;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
      });
      if (panel) {
        panel.setAttribute("aria-labelledby", "ftab-" + i);
      }
      if (img && p.featuredImage) {
        img.src = p.featuredImage;
        img.alt = p.featuredAlt || p.alt || p.name;
      }
      if (count) count.textContent = pad(i + 1, list.length);
      if (nameEl) nameEl.textContent = p.name;
      if (descEl) descEl.textContent = p.short;
      if (pointsEl && p.points) {
        pointsEl.innerHTML = "";
        p.points.forEach(function (pt) {
          var li = document.createElement("li");
          li.textContent = pt;
          pointsEl.appendChild(li);
        });
      }
      if (appsEl && p.applications) {
        appsEl.innerHTML = "";
        var b = document.createElement("b");
        b.className = "app-label";
        b.textContent = "Typical applications";
        appsEl.appendChild(b);
        p.applications.forEach(function (a) {
          var s = document.createElement("span");
          s.textContent = a;
          appsEl.appendChild(s);
        });
      }
    }

    function select(i, focusTab) {
      if (i === current) {
        if (focusTab) tabs[i].focus();
        return;
      }
      if (reduceMotion || !panel) {
        render(i);
      } else {
        panel.classList.add("is-switching");
        if (img) img.classList.add("is-next");
        window.setTimeout(function () {
          render(i);
          panel.classList.remove("is-switching");
          if (img) img.classList.remove("is-next");
        }, 180);
      }
      if (focusTab) tabs[i].focus();
    }

    tabs.forEach(function (t, k) {
      t.addEventListener("click", function () { select(k, false); });
    });

    tabsWrap.addEventListener("keydown", function (e) {
      var next = -1;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (current + 1) % tabs.length;
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (current - 1 + tabs.length) % tabs.length;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = tabs.length - 1;
      if (next > -1) {
        e.preventDefault();
        select(next, true);
      }
    });
  })();

  /* ---------- Gallery filter + lightbox ---------- */
  (function gallery() {
    var grid = document.querySelector("[data-gallery-grid]");
    if (!grid) return;
    var items = Array.prototype.slice.call(
      grid.querySelectorAll("[data-gallery-item]")
    );
    var filterBtns = Array.prototype.slice.call(
      document.querySelectorAll("[data-gallery-filter]")
    );

    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var f = btn.getAttribute("data-gallery-filter");
        filterBtns.forEach(function (b) {
          b.setAttribute("aria-pressed", String(b === btn));
        });
        items.forEach(function (it) {
          var show = f === "all" || it.getAttribute("data-cat") === f;
          it.classList.toggle("is-hidden", !show);
        });
        visibleItems();
      });
    });

    /* Lightbox */
    var lb = document.querySelector("[data-lightbox]");
    var lbImg = lb ? lb.querySelector("[data-lightbox-img]") : null;
    var lbCap = lb ? lb.querySelector("[data-lightbox-caption]") : null;
    var idx = 0;

    function visibleItems() {
      return items.filter(function (it) {
        return !it.classList.contains("is-hidden");
      });
    }

    function open(i) {
      var vis = visibleItems();
      if (!vis.length) return;
      idx = ((i % vis.length) + vis.length) % vis.length;
      var img = vis[idx].querySelector("img");
      if (lbImg && img) {
        lbImg.src = img.src;
        lbImg.alt = img.alt;
      }
      if (lbCap) {
        lbCap.textContent =
          vis[idx].getAttribute("data-caption") +
          "  ·  " +
          (idx + 1) +
          " / " +
          vis.length;
      }
      lb.classList.add("is-open");
      lb.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      var close = lb.querySelector("[data-lightbox-close]");
      if (close) close.focus({ preventScroll: true });
    }

    function close() {
      lb.classList.remove("is-open");
      lb.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    function step(d) {
      open(idx + d);
    }

    items.forEach(function (it) {
      it.addEventListener("click", function () {
        open(visibleItems().indexOf(it));
      });
    });

    if (lb) {
      lb.querySelector("[data-lightbox-scrim]").addEventListener("click", close);
      lb.querySelector("[data-lightbox-close]").addEventListener("click", close);
      lb.querySelector("[data-lightbox-prev]").addEventListener("click", function (e) {
        e.stopPropagation();
        step(-1);
      });
      lb.querySelector("[data-lightbox-next]").addEventListener("click", function (e) {
        e.stopPropagation();
        step(1);
      });
      document.addEventListener("keydown", function (e) {
        if (!lb.classList.contains("is-open")) return;
        if (e.key === "Escape") close();
        else if (e.key === "ArrowLeft") step(-1);
        else if (e.key === "ArrowRight") step(1);
      });
    }
  })();

  /* ---------- Document viewer (embedded company profile) ---------- */
  (function docViewer() {
    var root = document.querySelector("[data-docviewer]");
    if (!root) return;
    var frame = root.querySelector(".doc-viewer__frame");
    var img = root.querySelector("[data-doc-img]");
    var count = root.querySelector("[data-doc-count]");
    var thumbs = Array.prototype.slice.call(
      root.querySelectorAll("[data-doc-thumb]")
    );
            var pages = [
      { src: "assets/profile-p1.jpg", label: "Company profile, page 1 of 10: cover" },
      { src: "assets/profile-p2.jpg", label: "Company profile, page 2 of 10: welcome to Balaji Metal Industries" },
      { src: "assets/profile-p3.jpg", label: "Company profile, page 3 of 10: our products overview" },
      { src: "assets/profile-p4.jpg", label: "Company profile, page 4 of 10: spring steel screen cloths" },
      { src: "assets/profile-p5.jpg", label: "Company profile, page 5 of 10: stainless steel wiremesh" },
      { src: "assets/profile-p6.jpg", label: "Company profile, page 6 of 10: conveyor idler, frame and pulleys" },
      { src: "assets/profile-p7.jpg", label: "Company profile, page 7 of 10: kiln refractory anchors" },
      { src: "assets/profile-p8.jpg", label: "Company profile, page 8 of 10: casting and mechanical items" },
      { src: "assets/profile-p9.jpg", label: "Company profile, page 9 of 10: get in touch" },
      { src: "assets/profile-p10.jpg", label: "Company profile, page 10 of 10: thank you" },
    ];
    var current = 0;

    /* Preload all pages for instant flips */
    if (!reduceMotion) {
      pages.forEach(function (p) {
        var pre = new Image();
        pre.src = p.src;
      });
    }

    function pad(n) {
      var total = pages.length;
      return (n < 10 ? "0" + n : "" + n) + " / " + (total < 10 ? "0" + total : "" + total);
    }

    function render(i) {
      current = ((i % pages.length) + pages.length) % pages.length;
      if (img) {
        img.src = pages[current].src;
        img.alt = pages[current].label;
      }
      if (count) count.textContent = pad(current + 1);
      thumbs.forEach(function (t, k) {
        t.setAttribute("aria-current", String(k === current));
      });
    }

    function go(i) {
      if (i === current || !frame) {
        render(i);
        return;
      }
      if (reduceMotion) {
        render(i);
        return;
      }
      frame.classList.add("is-switching");
      window.setTimeout(function () {
        render(i);
        frame.classList.remove("is-switching");
      }, 160);
    }

    var prev = root.querySelector("[data-doc-prev]");
    var next = root.querySelector("[data-doc-next]");
    if (prev) prev.addEventListener("click", function (e) { e.stopPropagation(); go(current - 1); });
    if (next) next.addEventListener("click", function (e) { e.stopPropagation(); go(current + 1); });
    thumbs.forEach(function (t, k) {
      t.addEventListener("click", function () { go(k); });
    });
    if (frame) {
      frame.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft") { e.preventDefault(); go(current - 1); }
        else if (e.key === "ArrowRight") { e.preventDefault(); go(current + 1); }
        else if (e.key === "Home") { e.preventDefault(); go(0); }
        else if (e.key === "End") { e.preventDefault(); go(pages.length - 1); }
      });
    }
  })();

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
