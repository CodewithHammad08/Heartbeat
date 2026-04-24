/* ============================================================
   script.js — Full vanilla JS replacement for all React components
   ============================================================ */

// ── Data ──
const admireItems = [
  {
    title: "How hard you work",
    text: "I watch you give so much to your work and your responsibilities. I just want you to know that your effort doesn't go unnoticed. I see how tired you get, and I just want to hold you close and let you rest.",
    caption: "My hardworking girl.",
    image: "https://images.pexels.com/photos/1963056/pexels-photo-1963056.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    title: "Your gentle heart",
    text: "Even when your own day is entirely overwhelming, you still find a way to be kind to the people around you. Let me be the one who takes care of you for a change. You deserve it.",
    caption: "Let me take care of you.",
    image: "https://images.pexels.com/photos/1826084/pexels-photo-1826084.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    title: "Just being you",
    text: "You don't need to try so hard when you're with me. Just sitting next to you, hearing about your day, or sitting in completely peaceful silence together... it's my favorite part of any day.",
    caption: "My favorite place is with you.",
    image: "https://images.pexels.com/photos/2085527/pexels-photo-2085527.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];

const NOTE_COLORS = ["note-yellow", "note-pink", "note-purple", "note-green", "note-blush"];

// ── Boot ──
document.addEventListener("DOMContentLoaded", () => {
  initScrollReveal();
  createFloatingHearts();
  renderAdmireSection();
  initMusicPlayer();
  initHiddenMessage();
  initPhotoAlbum();
  initPlansBoard();
  lucide.createIcons();
});

/* ============================================================
   SCROLL REVEAL  (replaces framer-motion whileInView)
   ============================================================ */
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("active");
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

// Re-observe dynamically added .reveal elements
function observeNew(el) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("active");
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
  );
  el.querySelectorAll(".reveal").forEach((r) => observer.observe(r));
  if (el.classList.contains("reveal")) observer.observe(el);
}

/* ============================================================
   FLOATING HEARTS
   ============================================================ */
function createFloatingHearts() {
  const container = document.getElementById("hearts-container");
  for (let i = 0; i < 12; i++) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const size = Math.random() * 18 + 10;
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("width", size);
    svg.setAttribute("height", size);
    svg.setAttribute("fill", "currentColor");
    svg.setAttribute("stroke", "none");
    svg.innerHTML = '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>';

    const div = document.createElement("div");
    div.className = "heart-particle";
    div.style.left = Math.random() * 100 + "vw";
    div.style.top = Math.random() * 100 + "vh";
    div.appendChild(svg);
    container.appendChild(div);

    const dur = (Math.random() * 12 + 10) * 1000;
    const xMid = (Math.random() * 60 - 30) + "px";
    const xEnd = (Math.random() * 100 - 50) + "px";
    div.animate(
      [
        { transform: "translate(0,0)", opacity: 0 },
        { transform: `translate(${xMid},-200px)`, opacity: 0.7, offset: 0.5 },
        { transform: `translate(${xEnd},-400px)`, opacity: 0 }
      ],
      { duration: dur, iterations: Infinity, delay: Math.random() * 5000, easing: "linear" }
    );
  }
}

/* ============================================================
   ADMIRE SECTION
   ============================================================ */
function renderAdmireSection() {
  const container = document.getElementById("admire-items");
  admireItems.forEach((item, i) => {
    const isEven = i % 2 === 0;
    const row = document.createElement("div");
    row.className = `admire-row ${isEven ? "" : "reverse"} reveal`;
    row.innerHTML = `
      <div class="admire-photo-wrap">
        <div class="washi-tape"></div>
        <div class="polaroid-card ${isEven ? "tilt-right" : "tilt-left"}">
          <div class="polaroid-image-wrap">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
          </div>
          <p class="polaroid-caption">${item.caption}</p>
        </div>
      </div>
      <div class="admire-text-wrap ${isEven ? "align-left" : "align-right"}">
        <span class="admire-heart">♡</span>
        <h3 class="admire-title">${item.title}</h3>
        <p class="admire-desc">${item.text}</p>
      </div>
    `;
    container.appendChild(row);
  });
}

/* ============================================================
   MUSIC PLAYER
   ============================================================ */
function initMusicPlayer() {
  const audio = document.getElementById("bg-audio");
  const btn = document.getElementById("music-toggle");
  const iconOff = document.getElementById("music-icon-off");
  const iconOn = document.getElementById("music-icon-on");
  let playing = false;

  btn.addEventListener("click", () => {
    if (playing) {
      audio.pause();
      iconOff.style.display = "";
      iconOn.style.display = "none";
    } else {
      audio.play().catch((e) => console.error("Audio playback error:", e));
      iconOff.style.display = "none";
      iconOn.style.display = "";
    }
    playing = !playing;
  });
}

/* ============================================================
   HIDDEN MESSAGE
   ============================================================ */
function initHiddenMessage() {
  const btn = document.getElementById("msg-toggle");
  const msg = document.getElementById("hidden-msg");
  let open = false;

  btn.addEventListener("click", () => {
    open = !open;
    btn.textContent = open ? "Close message" : "Click if you need this today";
    if (open) {
      msg.classList.add("open");
    } else {
      msg.classList.remove("open");
    }
  });
}

/* ============================================================
   PHOTO ALBUM  (localStorage-based, replaces React state)
   ============================================================ */
function initPhotoAlbum() {
  const root = document.getElementById("photo-album");
  let photos = loadJSON("zubiya_photo_album", []);
  let adding = false;
  let tempImage = null;
  let pageIndex = 0;

  function getPages() {
    const p = [];
    for (let i = 0; i < photos.length; i += 2) p.push(photos.slice(i, i + 2));
    return p;
  }

  function render() {
    const pages = getPages();
    if (pageIndex >= pages.length && pages.length > 0) pageIndex = pages.length - 1;

    let html = `
      <div class="album-header">
        <h2 class="album-title">Little Moments</h2>
        <p class="album-sub">Some of my absolute favorite memories of you.</p>
      </div>
    `;

    if (!adding) {
      html += `
        <div style="display:flex;justify-content:center;margin-bottom:2.5rem;">
          <button class="album-add-btn" id="album-add-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            <span>Add a Memory</span>
          </button>
        </div>
      `;
    } else {
      html += renderAddForm();
    }

    if (!adding && photos.length === 0) {
      html += `<div class="album-empty">It's a little empty here. Frame a sweet memory...</div>`;
    }

    if (!adding && pages.length > 0) {
      html += renderPageViewer(pages);
    }

    root.innerHTML = html;
    attachAlbumEvents(pages);
    observeNew(root);
  }

  function renderAddForm() {
    return `
      <div class="album-form">
        <input type="file" accept="image/*" id="album-file" style="display:none;">
        ${!tempImage ? `
          <div class="album-dropzone" id="album-dropzone">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
            <p>Tap to select a photo</p>
          </div>
        ` : `
          <div class="album-preview-wrap">
            <img src="${tempImage}" alt="Preview">
            <button class="album-clear-btn" id="album-clear">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        `}
        <textarea class="album-desc-input" id="album-desc" placeholder="Write a sweet description for this memory..."></textarea>
        <div class="album-form-actions">
          <button class="album-cancel-btn" id="album-cancel">Cancel</button>
          <button class="album-save-btn" id="album-save" ${!tempImage ? "disabled" : ""}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
            Save to Album
          </button>
        </div>
      </div>
    `;
  }

  function renderPageViewer(pages) {
    const page = pages[pageIndex];
    let pageContent = "";

    if (page.length === 2) {
      pageContent = `
        <div class="page-two-photos">
          <div class="photo-top">${miniPolaroid(page[0], "tilt-left")}</div>
          <div class="descs-center">
            ${page[0].description ? `<p class="page-desc tilt-left">${esc(page[0].description)}</p>` : ""}
            <span class="page-separator">· ♡ ·</span>
            ${page[1].description ? `<p class="page-desc tilt-right" style="margin-top:0.5rem;">${esc(page[1].description)}</p>` : ""}
          </div>
          <div class="photo-bottom">${miniPolaroid(page[1], "tilt-right")}</div>
        </div>
      `;
    } else {
      pageContent = `
        <div class="page-single-photo">
          <div class="photo-center">${miniPolaroid(page[0], "tilt-sm")}</div>
          ${page[0].description ? `<p class="page-single-desc">${esc(page[0].description)}</p>` : ""}
        </div>
      `;
    }

    return `
      <div class="album-viewer">
        <div class="album-viewer-inner">
          <button class="album-nav-btn prev" id="album-prev" ${pageIndex === 0 ? "disabled" : ""}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div class="album-page">
            <div class="album-page-card">
              ${pageContent}
              <span class="page-number">${pageIndex + 1} / ${pages.length}</span>
            </div>
          </div>
          <button class="album-nav-btn next" id="album-next" ${pageIndex >= pages.length - 1 ? "disabled" : ""}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>
    `;
  }

  function miniPolaroid(photo, tiltClass) {
    return `
      <div class="mini-polaroid ${tiltClass}">
        <button class="delete-photo-btn" data-id="${photo.id}">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div class="washi-mini"></div>
        <div class="mini-img-wrap">
          <img src="${photo.dataUrl}" alt="Memory">
        </div>
      </div>
    `;
  }

  function attachAlbumEvents(pages) {
    const addBtn = document.getElementById("album-add-btn");
    if (addBtn) addBtn.onclick = () => { adding = true; render(); };

    const dropzone = document.getElementById("album-dropzone");
    if (dropzone) dropzone.onclick = () => document.getElementById("album-file").click();

    const fileIn = document.getElementById("album-file");
    if (fileIn) fileIn.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      tempImage = await processImage(file);
      render();
    };

    const clearBtn = document.getElementById("album-clear");
    if (clearBtn) clearBtn.onclick = () => { tempImage = null; render(); };

    const cancelBtn = document.getElementById("album-cancel");
    if (cancelBtn) cancelBtn.onclick = () => { adding = false; tempImage = null; render(); };

    const saveBtn = document.getElementById("album-save");
    if (saveBtn) saveBtn.onclick = () => {
      if (!tempImage) return;
      const desc = (document.getElementById("album-desc").value || "").trim();
      photos.unshift({ id: Date.now().toString(), dataUrl: tempImage, description: desc });
      saveJSON("zubiya_photo_album", photos);
      adding = false; tempImage = null; pageIndex = 0;
      render();
    };

    const prevBtn = document.getElementById("album-prev");
    if (prevBtn) prevBtn.onclick = () => { pageIndex--; render(); };

    const nextBtn = document.getElementById("album-next");
    if (nextBtn) nextBtn.onclick = () => { pageIndex++; render(); };

    root.querySelectorAll(".delete-photo-btn").forEach((btn) => {
      btn.onclick = () => {
        photos = photos.filter((p) => p.id !== btn.dataset.id);
        saveJSON("zubiya_photo_album", photos);
        render();
      };
    });
  }

  render();
}

/* ============================================================
   PLANS BOARD
   ============================================================ */
function initPlansBoard() {
  const root = document.getElementById("plans-board");
  let notes = loadJSON("zubiya_plans_board", [
    { id: "1", text: "Just a quiet coffee together ☕", color: "note-yellow" },
    { id: "2", text: "Sitting in absolute silence 🍿", color: "note-pink" }
  ]);

  function render() {
    root.innerHTML = `
      <div class="plans-pin left">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#FF8E9E" stroke="#FF8E9E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"/></svg>
      </div>
      <div class="plans-pin right">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#FF8E9E" stroke="#FF8E9E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"/></svg>
      </div>
      <div class="plans-header">
        <h2 class="plans-title">Little Things We Could Do</h2>
        <p class="plans-sub">Bookmark tiny ideas here for when you have the energy. Even if it's literally just sitting in silence together.</p>
      </div>
      <form class="plans-form" id="plans-form">
        <input type="text" class="plans-input" id="plans-input" placeholder="E.g. Ice cream date...">
        <button type="submit" class="plans-submit-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
      </form>
      <div class="plans-grid">
        ${notes.map((n) => `
          <div class="plan-note ${n.color}">
            <button class="plan-delete-btn" data-id="${n.id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <p class="plan-note-text">${esc(n.text)}</p>
          </div>
        `).join("")}
      </div>
    `;

    // Form submit
    document.getElementById("plans-form").onsubmit = (e) => {
      e.preventDefault();
      const input = document.getElementById("plans-input");
      const text = input.value.trim();
      if (!text) return;
      const color = NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)];
      notes.push({ id: Date.now().toString(), text, color });
      saveJSON("zubiya_plans_board", notes);
      render();
    };

    // Delete buttons
    root.querySelectorAll(".plan-delete-btn").forEach((btn) => {
      btn.onclick = () => {
        notes = notes.filter((n) => n.id !== btn.dataset.id);
        saveJSON("zubiya_plans_board", notes);
        render();
      };
    });

    observeNew(root);
  }

  render();
}

/* ============================================================
   UTILITIES
   ============================================================ */
function processImage(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const MAX = 500;
        let w = img.width, h = img.height;
        if (w > MAX) { h = Math.floor((h * MAX) / w); w = MAX; }
        const c = document.createElement("canvas");
        c.width = w; c.height = h;
        c.getContext("2d").drawImage(img, 0, 0, w, h);
        resolve(c.toDataURL("image/jpeg", 0.6));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function loadJSON(key, fallback) {
  try { const d = localStorage.getItem(key); return d ? JSON.parse(d) : fallback; }
  catch { return fallback; }
}

function saveJSON(key, data) {
  try { localStorage.setItem(key, JSON.stringify(data)); }
  catch { alert("Storage limit reached! Please delete some older items."); }
}

function esc(s) {
  const d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML;
}
