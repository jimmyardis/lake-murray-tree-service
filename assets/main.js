/* Lake Murray Tree Service — minimal progressive-enhancement JS */
(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.getAttribute("data-open") === "true";
      nav.setAttribute("data-open", String(!open));
      toggle.setAttribute("aria-expanded", String(!open));
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.setAttribute("data-open", "false");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Current year in footer
  var y = document.getElementById("year");
  if (y) { y.textContent = new Date().getFullYear(); }

  /* Quote form — front-end stub.
     Replace with your real handler: Formspree, Netlify Forms, Web3Forms,
     or a POST to your CRM / call-tracking provider. See README. */
  var form = document.getElementById("quote-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = document.getElementById("form-status");
      if (status) {
        status.textContent =
          "Thanks — this demo form isn't wired to a mailbox yet. Connect it to Formspree or Netlify Forms (see README), then your request will land in your inbox.";
        status.style.color = "#7a4e2d";
      }
    });
  }
})();
