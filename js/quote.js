/* ============================================================
   quote.js — B2B enquiry form: validation → success state →
   handoff via Email (mailto) or WhatsApp with prefilled spec.
   Static-safe: no backend. File input records the filename and
   asks the buyer to attach it in the email/WhatsApp thread.
   ============================================================ */
(function () {
  "use strict";

  var form = document.querySelector("[data-quote-form]");
  if (!form) return;

  var SALES_EMAIL = "balajimetal09@gmail.com";
  var WHATSAPP = "917000683009"; // verified: company intro PDF lists 70009683009

  var fields = {
    name: form.querySelector("#q-name"),
    company: form.querySelector("#q-company"),
    email: form.querySelector("#q-email"),
    phone: form.querySelector("#q-phone"),
    product: form.querySelector("#q-product"),
    quantity: form.querySelector("#q-quantity"),
    message: form.querySelector("#q-message"),
    file: form.querySelector("#q-file")
  };

  function setError(input, msg) {
    if (!input) return true;
    var wrap = input.closest(".field");
    var err = wrap ? wrap.querySelector(".field__error") : null;
    var bad = !input.checkValidity() || (msg && true);
    if (msg) {
      input.setAttribute("aria-invalid", "true");
      if (err) {
        err.textContent = msg;
        err.classList.add("is-shown");
      }
      return false;
    }
    if (!input.checkValidity()) {
      input.setAttribute("aria-invalid", "true");
      if (err) err.classList.add("is-shown");
      return false;
    }
    input.removeAttribute("aria-invalid");
    if (err) err.classList.remove("is-shown");
    return true;
  }

  Object.keys(fields).forEach(function (k) {
    var el = fields[k];
    if (el) {
      el.addEventListener("input", function () {
        el.removeAttribute("aria-invalid");
        var wrap = el.closest(".field");
        var err = wrap ? wrap.querySelector(".field__error") : null;
        if (err) err.classList.remove("is-shown");
      });
    }
  });

  // Preselect product from ?product=slug
  try {
    var pre = new URLSearchParams(window.location.search).get("product");
    if (pre && fields.product) {
      var opt = fields.product.querySelector('option[value="' + pre + '"]');
      if (opt) fields.product.value = pre;
    }
  } catch (e) {
    /* URLSearchParams unavailable — ignore */
  }

  function summary() {
    var lines = [
      "New B2B enquiry — Balaji Metal Industries website",
      "",
      "Name: " + fields.name.value.trim(),
      "Company: " + (fields.company.value.trim() || "—"),
      "Email: " + fields.email.value.trim(),
      "Phone: " + fields.phone.value.trim(),
      "Product: " + (fields.product.options[fields.product.selectedIndex] || {}).text,
      "Quantity: " + (fields.quantity.value.trim() || "—"),
      "",
      "Requirement:",
      fields.message.value.trim() || "—"
    ];
    if (fields.file && fields.file.files && fields.file.files.length) {
      lines.push("", "Attachment to follow: " + fields.file.files[0].name);
    }
    return lines.join("\n");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = true;
    ok = setError(fields.name) && ok;
    ok = setError(fields.company) && ok;
    ok = setError(fields.email) && ok;
    ok = setError(fields.phone) && ok;
    if (fields.phone && !/^[+()\-.\s\d]{8,18}$/.test(fields.phone.value.trim())) {
      setError(fields.phone, "Enter a valid phone number.");
      ok = false;
    }
    ok = setError(fields.product) && ok;
    ok = setError(fields.message) && ok;
    if (!ok) {
      var firstBad = form.querySelector('[aria-invalid="true"]');
      if (firstBad) firstBad.focus();
      return;
    }

    var text = summary();
    var mail = document.querySelector("[data-quote-mail]");
    var wa = document.querySelector("[data-quote-wa]");
    if (mail) {
      mail.href =
        "mailto:" + SALES_EMAIL +
        "?subject=" + encodeURIComponent("Quote Request — " + fields.product.value) +
        "&body=" + encodeURIComponent(text);
    }
    if (wa) {
      wa.href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(text);
    }
    var echo = document.querySelector("[data-quote-echo]");
    if (echo) echo.textContent = text;

    form.style.display = "none";
    var done = document.querySelector("[data-quote-success]");
    if (done) {
      done.classList.add("is-shown");
      done.setAttribute("tabindex", "-1");
      done.focus({ preventScroll: false });
    }
    done && done.scrollIntoView({ behavior: "smooth", block: "start" });
  });
})();
