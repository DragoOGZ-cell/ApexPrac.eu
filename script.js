const SERVER_IP = "apexprac.folium.top";
const DISCORD_URL = "https://discord.gg/m3CpjNDu4D";

document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation
  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (menu && nav) {
    menu.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      menu.setAttribute("aria-expanded", "false");
    }));
  }

  // Copy server IP
  document.querySelectorAll(".copy-ip").forEach(button => {
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(SERVER_IP);
      } catch {
        const input = document.createElement("textarea");
        input.value = SERVER_IP;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        input.remove();
      }
      showToast();
    });
  });

  // Lightweight cursor glow on desktop
  const cursor = document.querySelector(".cursor-glow");
  if (cursor && matchMedia("(pointer:fine)").matches) {
    window.addEventListener("pointermove", e => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
  }

  // Scroll reveal
  const reveal = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveal.forEach(el => observer.observe(el));
  } else {
    reveal.forEach(el => el.classList.add("visible"));
  }

  // Optional live Minecraft status. If the API is unavailable, the UI explicitly says so.
  loadServerStatus();
});

let toastTimer;
function showToast() {
  const toast = document.querySelector(".toast");
  if (!toast) return;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

async function loadServerStatus() {
  const status = document.querySelector("[data-server-status]");
  const detail = document.querySelector("[data-server-status-detail]");
  const count = document.querySelector("[data-player-count]");
  const playerDetail = document.querySelector("[data-player-detail]");
  const dot = document.querySelector("[data-status-dot]");
  if (!status) return;

  try {
    const response = await fetch(`https://api.mcsrvstat.us/3/${encodeURIComponent(SERVER_IP)}`, {
      headers: { "Accept": "application/json" },
      cache: "no-store"
    });
    if (!response.ok) throw new Error("Status service unavailable");
    const data = await response.json();

    if (data.online === true) {
      status.textContent = "SERVER ONLINE";
      detail.textContent = "Live server response received.";
      if (dot) dot.style.background = "var(--green)";
      if (dot) dot.style.boxShadow = "0 0 16px rgba(92,255,154,.8)";
      if (typeof data.players?.online === "number") {
        count.textContent = data.players.online;
        playerDetail.textContent = "Players currently connected.";
      } else {
        count.textContent = "—";
        playerDetail.textContent = "Player count not provided.";
      }
    } else {
      status.textContent = "SERVER OFFLINE";
      detail.textContent = "The status service reports the server is offline.";
      if (dot) {
        dot.style.background = "#ff4d7a";
        dot.style.boxShadow = "0 0 16px rgba(255,77,122,.65)";
      }
      count.textContent = "0";
      playerDetail.textContent = "No players reported online.";
    }
  } catch {
    status.textContent = "STATUS UNAVAILABLE";
    detail.textContent = "Live status could not be reached from this page.";
    count.textContent = "—";
    playerDetail.textContent = "No live player count available.";
  }
}
