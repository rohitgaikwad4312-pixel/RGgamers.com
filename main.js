/* =========================================
   RG GAMERS — Main JavaScript v3
   Owner: Rohit Gaikwad
   Multi-host · Secure · Enhanced
   ========================================= */

'use strict';

// =========================================
// SECURITY — HTML SANITIZER
// Prevents XSS from injected content
// =========================================

function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function sanitizeUrl(url) {
  if (!url) return '';
  const u = url.trim();
  if (!u.startsWith('http://') && !u.startsWith('https://')) return '';
  // Block javascript: protocol injections
  if (/^javascript:/i.test(u)) return '';
  return u;
}

// =========================================
// MULTI-HOST DETECTION
// Supports: Pixeldrain, MEGA, GoFile,
// MediaFire, WeTransfer, Catbox, Imgur
// =========================================

const HOSTS = {
  'pixeldrain.com':  { label: 'Pixeldrain',  icon: '☁️',  color: '#00c3ff', class: 'host-pixeldrain' },
  'mega.nz':         { label: 'MEGA',         icon: '🔷',  color: '#d4364e', class: 'host-mega' },
  'gofile.io':       { label: 'GoFile',       icon: '📁',  color: '#4caf50', class: 'host-gofile' },
  'mediafire.com':   { label: 'MediaFire',    icon: '🔥',  color: '#ff6600', class: 'host-mediafire' },
  'wetransfer.com':  { label: 'WeTransfer',   icon: '💧',  color: '#0078ff', class: 'host-wetransfer' },
  'catbox.moe':      { label: 'Catbox',       icon: '📦',  color: '#9b59b6', class: 'host-catbox' },
  'imgur.com':       { label: 'Imgur',        icon: '🖼️', color: '#85bf25', class: 'host-imgur' },
};

function detectHost(url) {
  if (!url) return null;
  try {
    const hostname = new URL(url).hostname.replace('www.', '');
    for (const [domain, info] of Object.entries(HOSTS)) {
      if (hostname === domain || hostname.endsWith('.' + domain)) return { domain, ...info };
    }
  } catch (_) {}
  return { label: 'External', icon: '🔗', color: '#7878aa', class: 'host-external' };
}

function getHostBadgeHtml(url) {
  const host = detectHost(url);
  if (!host) return '';
  return `<span class="host-badge ${escHtml(host.class)}" style="--host-color:${escHtml(host.color)}">
    ${host.icon} ${escHtml(host.label)}
  </span>`;
}

function isValidDownloadUrl(url) {
  if (!url) return false;
  const clean = sanitizeUrl(url);
  if (!clean) return false;
  try {
    const hostname = new URL(clean).hostname.replace('www.', '');
    return Object.keys(HOSTS).some(d => hostname === d || hostname.endsWith('.' + d));
  } catch (_) {
    return false;
  }
}

// =========================================
// ADMIN PASSWORD PROTECTION
// =========================================

const ADMIN_PASS_KEY = 'rg_admin_auth';
const ADMIN_PASSWORD  = 'RGAdmin2025'; // ← Change this to your preferred password

function isAdminAuthenticated() {
  return sessionStorage.getItem(ADMIN_PASS_KEY) === 'ok';
}

function initAdminAuth() {
  // Only run on admin page
  if (document.body.getAttribute('data-page') !== 'admin') return;

  if (!isAdminAuthenticated()) {
    showAdminLockScreen();
  } else {
    document.getElementById('adminContent').style.display = '';
  }
}

function showAdminLockScreen() {
  const lock = document.getElementById('adminLockScreen');
  const content = document.getElementById('adminContent');
  if (lock) lock.style.display = 'flex';
  if (content) content.style.display = 'none';
}

function unlockAdmin() {
  const input = document.getElementById('adminPassInput');
  const errEl = document.getElementById('adminPassError');
  if (!input) return;
  const val = input.value.trim();
  if (val === ADMIN_PASSWORD) {
    sessionStorage.setItem(ADMIN_PASS_KEY, 'ok');
    const lock = document.getElementById('adminLockScreen');
    const content = document.getElementById('adminContent');
    if (lock) lock.style.display = 'none';
    if (content) content.style.display = '';
    if (errEl) errEl.style.display = 'none';
    initAdminPage();
  } else {
    if (errEl) {
      errEl.textContent = '⚠️ Incorrect password. Try again.';
      errEl.style.display = 'block';
    }
    input.value = '';
    input.focus();
    // Shake animation
    const box = document.getElementById('adminLockBox');
    if (box) { box.classList.add('shake'); setTimeout(() => box.classList.remove('shake'), 500); }
  }
}

// =========================================
// CATEGORY COVER IMAGES (fallback per genre)
// =========================================

const CATEGORY_COVERS = {
  'Action':     'https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.jpg',
  'Racing':     'https://images.igdb.com/igdb/image/upload/t_cover_big/co5vmg.jpg',
  'Shooting':   'https://images.igdb.com/igdb/image/upload/t_cover_big/co1rgi.jpg',
  'Adventure':  'https://images.igdb.com/igdb/image/upload/t_cover_big/co2a3q.jpg',
  'Sports':     'https://images.igdb.com/igdb/image/upload/t_cover_big/co1l3p.jpg',
  'RPG':        'https://images.igdb.com/igdb/image/upload/t_cover_big/co4hna.jpg',
  'Strategy':   'https://images.igdb.com/igdb/image/upload/t_cover_big/co3wk8.jpg',
  'Horror':     'https://images.igdb.com/igdb/image/upload/t_cover_big/co1tmu.jpg',
  'Fighting':   'https://images.igdb.com/igdb/image/upload/t_cover_big/co5dl1.jpg',
  'Puzzle':     'https://images.igdb.com/igdb/image/upload/t_cover_big/co1x7d.jpg',
  'Simulator':  'https://images.igdb.com/igdb/image/upload/t_cover_big/co3wkb.jpg',
  'Other':      'https://images.igdb.com/igdb/image/upload/t_cover_big/co1wkz.jpg',
};

function getGameImage(game) {
  return game.image || CATEGORY_COVERS[game.category] || '../images/placeholder.jpg';
}

// =========================================
// DEFAULT GAMES DATABASE
// =========================================

const DEFAULT_GAMES = [
  {
    id: 'processing-3-5-4',
    title: 'Processing 3.5.4 (i3)',
    category: 'Simulator',
    description: 'A flexible software sketchbook and a language for learning how to code within the context of the visual arts. Built on Java, highly efficient for data processing and visual synthesis.',
    size: '111 MB',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Processing_2021_logo.svg/512px-Processing_2021_logo.svg.png',
    downloadUrl: 'https://pixeldrain.com/u/4Bk9SWp6',
    host: 'pixeldrain',
    sysReq: {
      os: 'Windows 7+, Linux, or macOS',
      cpu: 'Intel Core i3-3220 / AMD Phenom II X4',
      ram: '4 GB',
      gpu: 'OpenGL 2.1 compatible graphics card',
      storage: '500 MB'
    },
    trending: true,
    downloads: 1200,
    uploadDate: '2026-04-14'
  },
  {
    id: 'gta5',
    title: 'Grand Theft Auto V',
    category: 'Action',
    description: 'Experience the sprawling open world of Los Santos. Complete missions, explore the city, and cause chaos in one of the best open-world games ever made.',
    size: '65 GB',
    image: 'https://i.postimg.cc/NfxLbhTJ/Screenshot-2026-04-17-175013.png',
    downloadUrl: 'https://mega.nz/folder/r6Q3kARI#2Ml9zo7PXAdDtoQUcxGvxw',
    host: 'mega',
    sysReq: {
      os: 'Windows 10 64-bit',
      cpu: 'Intel Core i5-3470 / AMD X8 FX-8350',
      ram: '8 GB',
      gpu: 'NVIDIA GTX 660 2GB / AMD HD7870 2GB',
      storage: '72 GB HDD'
    },
    trending: true,
    downloads: 15420,
    uploadDate: '2025-01-10'
  },
  {
    id: 'minecraft',
    title: 'Minecraft Java Edition',
    category: 'Adventure',
    description: 'Build, explore, and survive in an infinitely generated world of blocks. Mine resources, craft tools, and survive the night against monsters.',
    size: '1.2 GB',
    image: 'https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png',
    downloadUrl: 'https://pixeldrain.com/u/example2',
    host: 'pixeldrain',
    sysReq: {
      os: 'Windows 7+',
      cpu: 'Intel Core i3-3210 / AMD A8-7600',
      ram: '4 GB',
      gpu: 'NVIDIA GeForce 400 / AMD Radeon HD 7000',
      storage: '4 GB SSD'
    },
    trending: true,
    downloads: 23100,
    uploadDate: '2025-01-08'
  },
  {
    id: 'valorant',
    title: 'Valorant',
    category: 'Shooting',
    description: '5v5 character-based tactical shooter. Use unique agent abilities and precise gunplay to outsmart and outshoot the enemy team.',
    size: '22 GB',
    image: 'https://upload.wikimedia.org/wikipedia/en/3/30/Valorant_logo_-_pink_color_version.png',
    downloadUrl: 'https://gofile.io/d/example3',
    host: 'gofile',
    sysReq: {
      os: 'Windows 10 64-bit',
      cpu: 'Intel Core i3-4150 / AMD Ryzen 3 1200',
      ram: '4 GB',
      gpu: 'NVIDIA GeForce GT 730 / Radeon R7 240',
      storage: '25 GB SSD'
    },
    trending: true,
    downloads: 18700,
    uploadDate: '2025-01-05'
  },
  {
    id: 'nfs-heat',
    title: 'Need for Speed Heat',
    category: 'Racing',
    description: 'Race by day, risk it all by night in Palm City. Build your rep in illegal street races after dark and compete in sanctioned events during the day.',
    size: '35 GB',
    image: 'https://upload.wikimedia.org/wikipedia/en/2/22/Need_for_Speed_Heat_cover.jpg',
    downloadUrl: 'https://mediafire.com/file/example4',
    host: 'mediafire',
    sysReq: {
      os: 'Windows 10 64-bit',
      cpu: 'Intel Core i5-6600k / AMD Ryzen 5 1600',
      ram: '8 GB',
      gpu: 'NVIDIA GTX 1060 / AMD RX 480',
      storage: '50 GB SSD'
    },
    trending: false,
    downloads: 9300,
    uploadDate: '2024-12-28'
  },
  {
    id: 'cyberpunk',
    title: 'Cyberpunk 2077',
    category: 'Action',
    description: 'An open-world action-adventure set in Night City. Fight for survival in a mega-city obsessed with power, glamour, and body modification.',
    size: '70 GB',
    image: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg',
    downloadUrl: 'https://pixeldrain.com/u/example5',
    host: 'pixeldrain',
    sysReq: {
      os: 'Windows 10 64-bit',
      cpu: 'Intel Core i7-6700K / AMD Ryzen 5 1600',
      ram: '12 GB',
      gpu: 'NVIDIA GTX 1060 / AMD RX 580',
      storage: '70 GB SSD'
    },
    trending: false,
    downloads: 12500,
    uploadDate: '2024-12-20'
  },
  {
    id: 'fortnite',
    title: 'Fortnite Battle Royale',
    category: 'Shooting',
    description: '100 players drop onto an island, gather weapons and build structures to be the last one standing. The most popular battle royale game in the world.',
    size: '28 GB',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Fortnite_F_lettermark_logo.png',
    downloadUrl: 'https://catbox.moe/example6',
    host: 'catbox',
    sysReq: {
      os: 'Windows 10 64-bit',
      cpu: 'Core i5-7300U / Ryzen 3 3300U',
      ram: '8 GB',
      gpu: 'NVIDIA GTX 960 / AMD R9 280',
      storage: '30 GB SSD'
    },
    trending: false,
    downloads: 21000,
    uploadDate: '2024-12-15'
  }
];

// =========================================
// STORAGE HELPERS
// =========================================

function getGames() {
  try {
    const stored = localStorage.getItem('rg_games_v3');
    if (!stored) {
      localStorage.setItem('rg_games_v3', JSON.stringify(DEFAULT_GAMES));
      return DEFAULT_GAMES;
    }
    return JSON.parse(stored);
  } catch (e) {
    return DEFAULT_GAMES;
  }
}

function saveGames(games) {
  try {
    localStorage.setItem('rg_games_v3', JSON.stringify(games));
  } catch (e) {
    showToast('⚠️ Storage full! Delete some games first.');
  }
}

function addGame(game) {
  const games = getGames();
  games.unshift(game);
  saveGames(games);
}

function deleteGame(id) {
  const games = getGames().filter(g => g.id !== id);
  saveGames(games);
}

function getGameById(id) {
  return getGames().find(g => g.id === id) || null;
}

function updateGame(id, updates) {
  const games = getGames();
  const idx = games.findIndex(g => g.id === id);
  if (idx !== -1) {
    games[idx] = { ...games[idx], ...updates };
    saveGames(games);
  }
}

// =========================================
// UTILS
// =========================================

function formatNumber(n) {
  n = parseInt(n) || 0;
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000)    return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}

function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

// =========================================
// GAME CARD HTML
// =========================================

function createGameCard(game, basePath = '') {
  const imgSrc   = escHtml(getGameImage(game));
  const fallback = basePath + 'images/placeholder.jpg';
  const detailUrl= basePath + 'pages/game-detail.html?id=' + encodeURIComponent(game.id);
  const hostInfo = detectHost(game.downloadUrl);
  const hostIcon = hostInfo ? hostInfo.icon : '☁️';
  const hostLabel= hostInfo ? hostInfo.label : 'Download';

  return `
    <div class="game-card">
      <div class="card-image">
        <img src="${imgSrc}" alt="${escHtml(game.title)}"
          onerror="this.onerror=null;this.src='${escHtml(fallback)}'"
          loading="lazy">
        <div class="card-badge">${escHtml(game.category)}</div>
        ${game.trending ? '<div class="badge-trending">🔥 Hot</div>' : ''}
        <div class="card-overlay">
          <div class="overlay-btn" onclick="window.location='${escHtml(detailUrl)}'">VIEW DETAILS</div>
        </div>
      </div>
      <div class="card-body">
        <div class="card-title" onclick="window.location='${escHtml(detailUrl)}'" style="cursor:pointer">${escHtml(game.title)}</div>
        <div class="card-meta">
          <span class="card-size">📦 ${escHtml(game.size)}</span>
          <span class="card-downloads">⬇️ ${formatNumber(game.downloads)}</span>
        </div>
        <div class="card-host-row">${hostIcon} <span style="font-size:0.75rem;color:var(--text-muted)">${escHtml(hostLabel)}</span></div>
        <div class="card-desc">${escHtml(game.description)}</div>
        <div style="display:flex;gap:8px;margin-top:auto">
          <button class="card-download-btn" onclick="startDownload('${escHtml(game.id)}','${escHtml(basePath)}')">⬇️ DOWNLOAD</button>
          <a href="${escHtml(detailUrl)}" class="card-detail-btn">📄</a>
        </div>
      </div>
    </div>
  `;
}

// =========================================
// DOWNLOAD SYSTEM — MULTI-HOST
// =========================================

// Rate limiting: prevent spam clicks
const _dlCooldown = {};
function canDownload(gameId) {
  const now = Date.now();
  if (_dlCooldown[gameId] && now - _dlCooldown[gameId] < 5000) return false;
  _dlCooldown[gameId] = now;
  return true;
}

function startDownload(gameId, basePath = '') {
  if (!canDownload(gameId)) {
    showToast('⏳ Please wait a moment before downloading again.');
    return;
  }

  const game = getGameById(gameId);
  if (!game) return;

  const overlay     = document.getElementById('downloadOverlay');
  const dlName      = document.getElementById('dlGameName');
  const dlSize      = document.getElementById('dlGameSize');
  const dlHost      = document.getElementById('dlGameHost');
  const progressFill= document.querySelector('.progress-fill');
  const progressText= document.querySelector('.progress-text');

  const hostInfo = detectHost(game.downloadUrl);

  if (overlay) {
    if (dlName) dlName.textContent = game.title;
    if (dlSize) dlSize.textContent = game.size;
    if (dlHost && hostInfo) dlHost.innerHTML = `${hostInfo.icon} Redirecting to <strong>${hostInfo.label}</strong>…`;
    if (progressText) progressText.textContent = hostInfo ? `🔄 Opening ${hostInfo.label}...` : '🔄 Preparing download...';
    overlay.classList.add('active');

    let width = 0;
    if (progressFill) {
      progressFill.style.width = '0%';
      const interval = setInterval(() => {
        width += Math.random() * 18 + 5;
        if (width >= 100) { width = 100; clearInterval(interval); }
        progressFill.style.width = width + '%';
      }, 180);
    }

    setTimeout(() => {
      overlay.classList.remove('active');
      if (progressFill) progressFill.style.width = '0%';

      const games  = getGames();
      const idx    = games.findIndex(g => g.id === gameId);
      if (idx !== -1) {
        games[idx].downloads = (games[idx].downloads || 0) + 1;
        saveGames(games);
      }

      const url = sanitizeUrl(game.downloadUrl);
      if (url) {
        const a = document.createElement('a');
        a.href   = url;
        a.target = '_blank';
        a.rel    = 'noopener noreferrer';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        showToast('✅ Download started! Check your new tab.');
      } else {
        showToast('⚠️ Download link not set. Contact admin.');
      }
    }, 2600);
  }
}

function closeDownloadModal() {
  const overlay = document.getElementById('downloadOverlay');
  if (overlay) overlay.classList.remove('active');
}

// =========================================
// RENDER GRID
// =========================================

function renderGamesGrid(containerId, games, basePath = '') {
  const container = document.getElementById(containerId);
  if (!container) return;
  if (!games || games.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="empty-icon">🎮</div>
        <h3>No Games Found</h3>
        <p>Try a different search or category.</p>
      </div>`;
    return;
  }
  container.innerHTML = games.map(g => createGameCard(g, basePath)).join('');
}

// =========================================
// TOAST
// =========================================

function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id        = 'toast';
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-icon">✅</span><span class="toast-text"></span>`;
    document.body.appendChild(toast);
  }
  const icon = toast.querySelector('.toast-icon');
  const text = toast.querySelector('.toast-text');
  const firstChar = message.charAt(0);
  if (icon) icon.textContent = /[✅⚠️🗑️⏳]/.test(firstChar) ? firstChar : '✅';
  if (text) text.textContent = message.replace(/^[\u2705\u26a0\ufe0f\ud83d\uddd1\ufe0f\u23f3]\s*/, '');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// =========================================
// SCROLL TO TOP
// =========================================

function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 300);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// =========================================
// MOBILE NAV
// =========================================

function initMobileNav() {
  const ham      = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!ham || !navLinks) return;
  ham.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    ham.classList.toggle('active');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      ham.classList.remove('active');
    });
  });
}

// =========================================
// NAV SEARCH
// =========================================

function initNavSearch(basePath = '') {
  const input = document.getElementById('navSearchInput');
  if (!input) return;
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && this.value.trim()) {
      window.location.href = basePath + 'pages/games.html?search=' + encodeURIComponent(this.value.trim());
    }
  });
}

// =========================================
// HOME PAGE
// =========================================

function initHomePage() {
  const games    = getGames();
  const basePath = '';

  const totalEl = document.getElementById('totalGames');
  if (totalEl) totalEl.textContent = games.length + '+';

  // Featured game
  const featured  = games.find(g => g.trending) || games[0];
  const featuredEl= document.getElementById('featuredGame');
  if (featuredEl && featured) {
    const hostInfo  = detectHost(featured.downloadUrl);
    const hostBadge = hostInfo ? `<span class="host-badge ${escHtml(hostInfo.class)}" style="--host-color:${escHtml(hostInfo.color)}">${hostInfo.icon} ${escHtml(hostInfo.label)}</span>` : '';
    featuredEl.innerHTML = `
      <div class="featured-image">
        <img src="${escHtml(getGameImage(featured))}" alt="${escHtml(featured.title)}"
          onerror="this.onerror=null;this.src='images/placeholder.jpg'">
      </div>
      <div class="featured-info">
        <div class="featured-category">⭐ Featured Game</div>
        <div class="featured-title">${escHtml(featured.title)}</div>
        <div class="featured-desc">${escHtml(featured.description)}</div>
        <div class="featured-meta">
          <span>📦 <span class="highlight">${escHtml(featured.size)}</span></span>
          <span>📂 <span class="highlight">${escHtml(featured.category)}</span></span>
          <span>⬇️ <span class="highlight">${formatNumber(featured.downloads)}</span></span>
          ${hostBadge}
        </div>
        <div style="display:flex;gap:1rem;flex-wrap:wrap">
          <button class="btn btn-primary" onclick="startDownload('${escHtml(featured.id)}','')">⬇️ Download Now</button>
          <a href="pages/game-detail.html?id=${encodeURIComponent(featured.id)}" class="btn btn-outline">📄 View Details</a>
        </div>
      </div>`;
  }

  const trending = games.filter(g => g.trending).slice(0, 4);
  renderGamesGrid('trendingGames', trending, basePath);

  const recent = [...games]
    .sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))
    .slice(0, 8);
  renderGamesGrid('recentGames', recent, basePath);
}

// =========================================
// GAMES LIST PAGE
// =========================================

let currentCategory = 'All';
let currentSearch   = '';

function filterGames() {
  return getGames().filter(g => {
    const matchCat    = currentCategory === 'All' || g.category === currentCategory;
    const q           = currentSearch.toLowerCase();
    const matchSearch = !q || g.title.toLowerCase().includes(q) || g.description.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });
}

function initGamesPage() {
  const params = new URLSearchParams(window.location.search);
  const cat    = params.get('category');
  const search = params.get('search');

  if (cat)    { currentCategory = cat;    const sel = document.getElementById('categoryFilter'); if (sel) sel.value = cat; }
  if (search) { currentSearch   = search; const inp = document.getElementById('searchInput');    if (inp) inp.value = search; }

  renderGamesGrid('gamesGrid', filterGames(), '../');

  const searchInput = document.getElementById('searchInput');
  const catFilter   = document.getElementById('categoryFilter');

  if (searchInput) {
    searchInput.addEventListener('input', e => {
      currentSearch = e.target.value;
      renderGamesGrid('gamesGrid', filterGames(), '../');
    });
  }
  if (catFilter) {
    catFilter.addEventListener('change', e => {
      currentCategory = e.target.value;
      renderGamesGrid('gamesGrid', filterGames(), '../');
    });
  }
}

// =========================================
// CATEGORIES PAGE
// =========================================

function initCategoriesPage() {
  const categories = [
    { name: 'Action',    icon: '⚔️' }, { name: 'Racing',    icon: '🏎️' },
    { name: 'Shooting',  icon: '🔫' }, { name: 'Adventure', icon: '🗺️' },
    { name: 'Sports',    icon: '⚽' }, { name: 'Strategy',  icon: '♟️' },
    { name: 'RPG',       icon: '🧙' }, { name: 'Horror',    icon: '👻' },
    { name: 'Fighting',  icon: '🥊' }, { name: 'Puzzle',    icon: '🧩' },
    { name: 'Simulator', icon: '🎮' }, { name: 'Other',     icon: '🌐' },
  ];
  const games = getGames();
  const grid  = document.getElementById('categoriesGrid');
  if (!grid) return;
  grid.innerHTML = categories.map(cat => {
    const count = games.filter(g => g.category === cat.name).length;
    return `
      <a class="category-card" href="games.html?category=${encodeURIComponent(cat.name)}">
        <span class="category-icon">${cat.icon}</span>
        <div class="category-name">${escHtml(cat.name)}</div>
        <div class="category-count">${count} game${count !== 1 ? 's' : ''}</div>
      </a>`;
  }).join('');
}

// =========================================
// GAME DETAIL PAGE
// =========================================

function loadGameDetail() {
  const params = new URLSearchParams(window.location.search);
  const id     = params.get('id');
  if (!id) { window.location.href = 'games.html'; return; }

  const game      = getGameById(id);
  const container = document.getElementById('gameDetailContent');

  if (!game) {
    if (container) container.innerHTML = `
      <div class="empty-state" style="padding:5rem 2rem">
        <div class="empty-icon">🎮</div>
        <h3>Game Not Found</h3>
        <p>This game doesn't exist or was removed.</p>
        <a href="games.html" class="btn btn-primary" style="display:inline-flex;margin-top:1rem">Back to Games</a>
      </div>`;
    return;
  }

  document.title = escHtml(game.title) + ' - RG Gamers';
  const hostInfo = detectHost(game.downloadUrl);
  const hostBadge= hostInfo
    ? `<span class="host-badge ${escHtml(hostInfo.class)}" style="--host-color:${escHtml(hostInfo.color)}">${hostInfo.icon} ${escHtml(hostInfo.label)}</span>`
    : '';

  container.innerHTML = `
    <div class="game-detail-header">
      <div class="game-cover">
        <img src="${escHtml(getGameImage(game))}" alt="${escHtml(game.title)}"
          onerror="this.onerror=null;this.src='../images/placeholder.jpg'">
        ${game.trending ? '<div class="trending-badge-detail">🔥 TRENDING</div>' : ''}
      </div>
      <div class="game-info-panel">
        <div class="game-category-tag">${escHtml(game.category)}</div>
        <h1 class="game-title-detail">${escHtml(game.title)}</h1>
        <p class="game-desc-detail">${escHtml(game.description)}</p>
        <div class="game-file-info">
          <div class="file-info-item">
            <div class="file-info-label">File Size</div>
            <div class="file-info-value">📦 ${escHtml(game.size)}</div>
          </div>
          <div class="file-info-item">
            <div class="file-info-label">Format</div>
            <div class="file-info-value">📂 WinRAR</div>
          </div>
          <div class="file-info-item">
            <div class="file-info-label">Downloads</div>
            <div class="file-info-value">⬇️ ${formatNumber(game.downloads)}</div>
          </div>
          <div class="file-info-item">
            <div class="file-info-label">Uploaded</div>
            <div class="file-info-value">📅 ${escHtml(game.uploadDate || 'N/A')}</div>
          </div>
        </div>
        <div style="margin-bottom:0.8rem">${hostBadge}</div>
        <button class="btn btn-download" onclick="startDownload('${escHtml(game.id)}','../')">
          ⬇️ DOWNLOAD — ${escHtml(game.size)}
        </button>
        <p style="color:var(--text-muted);font-size:0.78rem;margin-top:0.6rem">
          ${hostInfo ? hostInfo.icon + ' Hosted on ' + escHtml(hostInfo.label) : '☁️ Hosted externally'} · WinRAR (.rar) format · Extract with WinRAR
        </p>
      </div>
    </div>

    <div class="sysreq-box">
      <h3>⚙️ System Requirements</h3>
      <div class="sysreq-grid">
        <div class="sysreq-item"><span class="sysreq-key">OS</span><span class="sysreq-val">${escHtml(game.sysReq?.os || 'N/A')}</span></div>
        <div class="sysreq-item"><span class="sysreq-key">CPU</span><span class="sysreq-val">${escHtml(game.sysReq?.cpu || 'N/A')}</span></div>
        <div class="sysreq-item"><span class="sysreq-key">RAM</span><span class="sysreq-val">${escHtml(game.sysReq?.ram || 'N/A')}</span></div>
        <div class="sysreq-item"><span class="sysreq-key">GPU</span><span class="sysreq-val">${escHtml(game.sysReq?.gpu || 'N/A')}</span></div>
        <div class="sysreq-item"><span class="sysreq-key">Storage</span><span class="sysreq-val">${escHtml(game.sysReq?.storage || 'N/A')}</span></div>
      </div>
    </div>

    <div class="how-to-extract">
      <h3>📦 How to Extract & Install</h3>
      <div class="steps-grid">
        <div class="step"><div class="step-num">1</div><div class="step-text">Click Download and open the ${hostInfo ? escHtml(hostInfo.label) : 'file host'} link</div></div>
        <div class="step"><div class="step-num">2</div><div class="step-text">Install WinRAR from winrar.com if you don't have it</div></div>
        <div class="step"><div class="step-num">3</div><div class="step-text">Right-click the .rar file → "Extract Here"</div></div>
        <div class="step"><div class="step-num">4</div><div class="step-text">Run setup.exe or the game launcher and enjoy!</div></div>
      </div>
    </div>`;
}

// =========================================
// ADMIN PAGE
// =========================================

function initAdminPage() {
  if (!isAdminAuthenticated()) return;
  renderAdminStats();
  renderAdminList();
  initAdminForm();
  initImagePreview();
  initHostDetector();
}

function initImagePreview() {
  const imageUrlInput = document.getElementById('gameImageUrl');
  if (!imageUrlInput) return;
  imageUrlInput.addEventListener('input', function() {
    const preview = document.getElementById('imagePreview');
    const img     = document.getElementById('previewImg');
    if (!preview || !img) return;
    const url = sanitizeUrl(this.value);
    if (url) {
      img.src        = url;
      img.onerror    = () => preview.style.display = 'none';
      img.onload     = () => preview.style.display = 'block';
      preview.style.display = 'block';
    } else {
      preview.style.display = 'none';
    }
  });
}

function initHostDetector() {
  const urlInput  = document.getElementById('gameDownloadUrl');
  const indicator = document.getElementById('hostDetector');
  if (!urlInput || !indicator) return;
  urlInput.addEventListener('input', function() {
    const host = detectHost(this.value.trim());
    if (host && this.value.trim()) {
      indicator.innerHTML = `<span style="color:${escHtml(host.color)}">${host.icon} Detected: <strong>${escHtml(host.label)}</strong> ✅</span>`;
    } else {
      indicator.innerHTML = `<span style="color:var(--text-muted)">ℹ️ Supported: Pixeldrain · MEGA · GoFile · MediaFire · WeTransfer · Catbox · Imgur</span>`;
    }
  });
}

function renderAdminStats() {
  const games   = getGames();
  const totalEl = document.getElementById('statTotal');
  const dlEl    = document.getElementById('statDownloads');
  const trendEl = document.getElementById('statTrending');
  if (totalEl)  totalEl.textContent  = games.length;
  if (dlEl)     dlEl.textContent     = formatNumber(games.reduce((a, g) => a + (g.downloads || 0), 0));
  if (trendEl)  trendEl.textContent  = games.filter(g => g.trending).length;
}

function initAdminForm() {
  const form = document.getElementById('adminForm');
  if (!form) return;
  // Remove any existing listener first
  form.replaceWith(form.cloneNode(true));
  document.getElementById('adminForm').addEventListener('submit', function(e) {
    e.preventDefault();
    submitGame();
  });
}

function submitGame() {
  const title       = document.getElementById('gameTitle').value.trim();
  const category    = document.getElementById('gameCategory').value;
  const description = document.getElementById('gameDesc').value.trim();
  const size        = document.getElementById('gameSize').value.trim();
  const downloadUrl = document.getElementById('gameDownloadUrl').value.trim();
  const imageUrl    = document.getElementById('gameImageUrl').value.trim();
  const trending    = document.getElementById('gameTrending').checked;

  const os      = document.getElementById('sysOS').value.trim();
  const cpu     = document.getElementById('sysCPU').value.trim();
  const ram     = document.getElementById('sysRAM').value.trim();
  const gpu     = document.getElementById('sysGPU').value.trim();
  const storage = document.getElementById('sysStorage').value.trim();

  if (!title || !category || !description || !size || !downloadUrl) {
    showToast('⚠️ Please fill all required fields including download URL!');
    return;
  }

  const cleanUrl = sanitizeUrl(downloadUrl);
  if (!cleanUrl) {
    showToast('⚠️ Invalid URL. Must start with https://');
    return;
  }

  if (!isValidDownloadUrl(cleanUrl)) {
    showToast('⚠️ URL must be from a supported host: Pixeldrain, MEGA, GoFile, MediaFire, WeTransfer, Catbox, or Imgur.');
    return;
  }

  // Sanitize image URL
  const cleanImageUrl = sanitizeUrl(imageUrl);

  const hostInfo = detectHost(cleanUrl);

  const newGame = {
    id: 'game_' + Date.now(),
    title:       title.substring(0, 100),
    category,
    description: description.substring(0, 500),
    size:        size.substring(0, 20),
    image:       cleanImageUrl || '',
    downloadUrl: cleanUrl,
    host:        hostInfo ? hostInfo.label.toLowerCase() : 'external',
    sysReq:      { os, cpu, ram, gpu, storage },
    trending,
    downloads:   0,
    uploadDate:  new Date().toISOString().split('T')[0]
  };

  addGame(newGame);
  showToast('✅ "' + title + '" added successfully!');
  document.getElementById('adminForm').reset();
  const preview = document.getElementById('imagePreview');
  if (preview) preview.style.display = 'none';
  const detector = document.getElementById('hostDetector');
  if (detector) detector.innerHTML = '';
  renderAdminList();
  renderAdminStats();
}

function renderAdminList() {
  const list = document.getElementById('adminGamesList');
  if (!list) return;
  const games = getGames();
  if (games.length === 0) {
    list.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:2rem">No games yet. Add your first game above!</p>';
    return;
  }
  list.innerHTML = games.map(game => {
    const hostInfo  = detectHost(game.downloadUrl);
    const hostLabel = hostInfo ? `${hostInfo.icon} ${hostInfo.label}` : '☁️ Unknown';
    return `
    <div class="admin-game-item" id="admin_${escHtml(game.id)}">
      <img class="admin-game-thumb"
        src="${escHtml(getGameImage(game))}" alt="${escHtml(game.title)}"
        onerror="this.onerror=null;this.style.background='var(--bg-dark)';this.src='../images/placeholder.jpg'">
      <div class="admin-game-info">
        <div class="admin-game-title">${escHtml(game.title)}</div>
        <div class="admin-game-meta">
          <span>📂 ${escHtml(game.category)}</span>
          <span>📦 ${escHtml(game.size)}</span>
          <span>⬇️ ${formatNumber(game.downloads)} downloads</span>
          <span>📅 ${escHtml(game.uploadDate)}</span>
          ${game.downloadUrl ? `<span style="color:var(--neon-green)">✅ ${hostLabel}</span>` : '<span style="color:var(--neon-pink)">⚠️ No Link</span>'}
        </div>
      </div>
      <div class="admin-actions">
        <button class="btn btn-outline btn-sm" onclick="viewGameAdmin('${escHtml(game.id)}')">👁️ View</button>
        <button class="btn btn-sm" style="border:1px solid var(--neon-blue);color:var(--neon-blue);background:transparent;padding:6px 12px;border-radius:4px;font-size:0.78rem" onclick="editDownloadUrl('${escHtml(game.id)}')">✏️ Edit Link</button>
        <button class="btn btn-pink btn-sm" onclick="confirmDelete('${escHtml(game.id)}', '${escHtml(game.title.replace(/'/g, "\\'"))}')">🗑️ Delete</button>
      </div>
    </div>`;
  }).join('');
}

function viewGameAdmin(id) {
  window.location.href = 'game-detail.html?id=' + encodeURIComponent(id);
}

function editDownloadUrl(id) {
  const game = getGameById(id);
  if (!game) return;
  const newUrl = prompt('Enter download URL for "' + game.title + '":\nSupported: Pixeldrain, MEGA, GoFile, MediaFire, WeTransfer, Catbox, Imgur', game.downloadUrl || '');
  if (newUrl !== null) {
    const cleanUrl = sanitizeUrl(newUrl.trim());
    if (!cleanUrl) { showToast('⚠️ Invalid URL.'); return; }
    if (!isValidDownloadUrl(cleanUrl)) { showToast('⚠️ URL must be from a supported host.'); return; }
    const hostInfo = detectHost(cleanUrl);
    updateGame(id, { downloadUrl: cleanUrl, host: hostInfo ? hostInfo.label.toLowerCase() : 'external' });
    showToast('✅ Download URL updated!');
    renderAdminList();
  }
}

function confirmDelete(id, title) {
  if (confirm('Delete "' + title + '"? This cannot be undone.')) {
    deleteGame(id);
    showToast('🗑️ "' + title + '" deleted.');
    renderAdminList();
    renderAdminStats();
  }
}

// =========================================
// CONTACT FORM
// =========================================

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    showToast('✅ Message sent! We\'ll reply within 24 hours.');
    form.reset();
  });
}

// =========================================
// AUTO-INIT
// =========================================

document.addEventListener('DOMContentLoaded', function() {
  const pageId   = document.body.getAttribute('data-page');
  const isInPages= window.location.pathname.includes('/pages/');
  const basePath = isInPages ? '../' : '';

  initScrollTop();
  initMobileNav();
  initNavSearch(basePath);

  const overlay = document.getElementById('downloadOverlay');
  if (overlay) overlay.addEventListener('click', function(e) {
    if (e.target === this) closeDownloadModal();
  });

  // Keyboard: Escape closes download modal
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeDownloadModal();
  });

  if (pageId === 'home')       initHomePage();
  if (pageId === 'games')      initGamesPage();
  if (pageId === 'detail')     loadGameDetail();
  if (pageId === 'categories') initCategoriesPage();
  if (pageId === 'contact')    initContactForm();
  if (pageId === 'admin')      initAdminAuth();

  // Admin unlock button (event delegation)
  document.addEventListener('click', function(e) {
    if (e.target && e.target.id === 'adminUnlockBtn') unlockAdmin();
  });
  // Admin unlock on Enter key
  document.addEventListener('keydown', function(e) {
    const inp = document.getElementById('adminPassInput');
    if (e.key === 'Enter' && inp && document.activeElement === inp) unlockAdmin();
  });
});
