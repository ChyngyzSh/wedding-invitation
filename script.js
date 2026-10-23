(() => {
  "use strict";

  // The countdown targets the start of the wedding date in Bishkek (UTC+6).
  // If you know the ceremony time, change 00:00:00 below to the local start time.
  const weddingDate = new Date("2026-12-05T00:00:00+06:00");
  const fields = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds")
  };
  const note = document.getElementById("countdown-note");

  function updateCountdown() {
    const remaining = weddingDate.getTime() - Date.now();
    if (remaining <= 0) {
      Object.values(fields).forEach((field) => { field.textContent = "0"; });
      note.textContent = "Сегодня наш свадебный день";
      return;
    }

    const totalSeconds = Math.floor(remaining / 1000);
    fields.days.textContent = String(Math.floor(totalSeconds / 86400));
    fields.hours.textContent = String(Math.floor((totalSeconds % 86400) / 3600)).padStart(2, "0");
    fields.minutes.textContent = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    fields.seconds.textContent = String(totalSeconds % 60).padStart(2, "0");
  }

  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const music = document.getElementById("wedding-music");
  const musicToggle = document.getElementById("music-toggle");
  const musicLabel = document.getElementById("music-label");

  musicToggle.addEventListener("click", async () => {
    if (music.paused) {
      try {
        await music.play();
        musicToggle.classList.add("is-playing");
        musicToggle.setAttribute("aria-pressed", "true");
        musicLabel.textContent = "Выключить музыку";
      } catch (error) {
        musicLabel.textContent = "Добавьте music.mp3";
        musicToggle.setAttribute("aria-pressed", "false");
      }
    } else {
      music.pause();
      musicToggle.classList.remove("is-playing");
      musicToggle.setAttribute("aria-pressed", "false");
      musicLabel.textContent = "Включить музыку";
    }
  });

  music.addEventListener("error", () => {
    if (music.paused) {
      musicLabel.textContent = "Добавьте music.mp3";
    }
  });
})();
