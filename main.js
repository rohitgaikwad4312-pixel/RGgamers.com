/* =========================================
   RG GAMERS — Main JavaScript
   Owner: Rohit Gaikwad
   Supports Pixeldrain download links
   ========================================= */

// =========================================
// DEFAULT GAMES DATABASE
// =========================================

const DEFAULT_GAMES = [
  {
    id: 'gta5',
    title: 'Grand Theft Auto V',
    category: 'Action',
    description: 'Experience the sprawling open world of Los Santos. Complete missions, explore the city, and cause chaos in one of the best open-world games ever made.',
    size: '65 GB',
    image: 'https://upload.wikimedia.org/wikipedia/en/a/a5/GTA_V.png',
    downloadUrl: 'https://pixeldrain.com/u/example1',
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
    downloadUrl: 'https://pixeldrain.com/u/example3',
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
    downloadUrl: 'https://pixeldrain.com/u/example4',
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
    downloadUrl: 'https://pixeldrain.com/u/example6',
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
    const stored = localStorage.getItem('rg_games_v2');
    if (!stored) {
      localStorage.setItem('rg_games_v2', JSON.stringify(DEFAULT_GAMES));
      return DEFAULT_GAMES;
    }
    return JSON.parse(stored);
  } catch (e) {
    return DEFAULT_GAMES;
  }
}

function saveGames(games) {
  localStorage.setItem('rg_games_v2', JSON.stringify(games));
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
  return getGames().find(g => g.id === id);
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
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}

function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

// =========================================
// GAME CARD HTML
// =========================================

function createGameCard(game, basePath = '') {
  const imgSrc = game.image || basePath + 'images/placeholder.jpg';
  const detailUrl = basePath + 'pages/game-detail.html?id=' + game.id;
  return `
    <div class="game-card">
      <div class="card-image">
        <img src="${imgSrc}" alt="${game.title}" onerror="this.src='${basePath}images/placeholder.jpg'" loading="lazy">
        <div class="card-badge">${game.category}</div>
        ${game.trending ? '<div class="badge-trending">🔥 Hot</div>' : ''}
        <div class="card-overlay">
          <div class="overlay-btn" onclick="window.location='${detailUrl}'">VIEW DETAILS</div>
        </div>
      </div>
      <div class="card-body">
        <div class="card-title" onclick="window.location='${detailUrl}'" style="cursor:pointer">${game.title}</div>
        <div class="card-meta">
          <span class="card-size">📦 ${game.size}</span>
          <span class="card-downloads">⬇️ ${formatNumber(game.downloads)}</span>
        </div>
        <div class="card-desc">${game.description}</div>
        <div style="display:flex;gap:8px;margin-top:auto">
          <button class="card-download-btn" onclick="startDownload('${game.id}','${basePath}')">⬇️ DOWNLOAD</button>
          <a href="${detailUrl}" class="card-detail-btn">📄</a>
        </div>
      </div>
    </div>
  `;
}

// =========================================
// DOWNLOAD SYSTEM (Pixeldrain)
// =========================================

function startDownload(gameId, basePath = '') {
  const game = getGameById(gameId);
  if (!game) return;

  const overlay = document.getElementById('downloadOverlay');
  const dlName = document.getElementById('dlGameName');
  const dlSize = document.getElementById('dlGameSize');
  const progressFill = document.querySelector('.progress-fill');

  if (overlay) {
    if (dlName) dlName.textContent = game.title;
    if (dlSize) dlSize.textContent = game.size;
    overlay.classList.add('active');

    // Animate progress bar
    let width = 0;
    if (progressFill) {
      progressFill.style.width = '0%';
      const interval = setInterval(() => {
        width += Math.random() * 15 + 5;
        if (width >= 100) {
          width = 100;
          clearInterval(interval);
        }
        progressFill.style.width = width + '%';
      }, 200);
    }

    setTimeout(() => {
      overlay.classList.remove('active');
      if (progressFill) progressFill.style.width = '0%';

      // Increment download count
      const games = getGames();
      const idx = games.findIndex(g => g.id === gameId);
      if (idx !== -1) {
        games[idx].downloads = (games[idx].downloads || 0) + 1;
        saveGames(games);
      }

      // Open Pixeldrain link
      if (game.downloadUrl && game.downloadUrl.includes('pixeldrain')) {
        window.open(game.downloadUrl, '_blank');
        showToast('✅ Download started! Check the new tab.');
      } else if (game.downloadUrl) {
        window.open(game.downloadUrl, '_blank');
        showToast('✅ Download started!');
      } else {
        showToast('⚠️ Download link not set. Contact admin.');
      }
    }, 2500);
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
    toast.id = 'toast';
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-icon">✅</span><span class="toast-text"></span>`;
    document.body.appendChild(toast);
  }
  const icon = toast.querySelector('.toast-icon');
  const text = toast.querySelector('.toast-text');
  if (message.startsWith('⚠️')) {
    if (icon) icon.textContent = '⚠️';
  } else if (message.startsWith('🗑️')) {
    if (icon) icon.textContent = '🗑️';
  } else {
    if (icon) icon.textContent = '✅';
  }
  if (text) text.textContent = message.replace(/^[✅⚠️🗑️]\s*/, '');
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
  const ham = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!ham || !navLinks) return;
  ham.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    ham.classList.toggle('active');
  });
  // Close on link click
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
  const games = getGames();
  const basePath = '';

  // Update total count
  const totalEl = document.getElementById('totalGames');
  if (totalEl) totalEl.textContent = games.length + '+';

  // Featured game
  const featured = games.find(g => g.trending) || games[0];
  const featuredEl = document.getElementById('featuredGame');
  if (featuredEl && featured) {
    featuredEl.innerHTML = `
      <div class="featured-image">
        <img src="${featured.image}" alt="${featured.title}" onerror="this.src='images/placeholder.jpg'">
      </div>
      <div class="featured-info">
        <div class="featured-category">⭐ Featured Game</div>
        <div class="featured-title">${featured.title}</div>
        <div class="featured-desc">${featured.description}</div>
        <div class="featured-meta">
          <span>📦 <span class="highlight">${featured.size}</span></span>
          <span>📂 <span class="highlight">${featured.category}</span></span>
          <span>⬇️ <span class="highlight">${formatNumber(featured.downloads)}</span></span>
        </div>
        <div style="display:flex;gap:1rem;flex-wrap:wrap">
          <button class="btn btn-primary" onclick="startDownload('${featured.id}','')">⬇️ Download Now</button>
          <a href="pages/game-detail.html?id=${featured.id}" class="btn btn-outline">📄 View Details</a>
        </div>
      </div>`;
  }

  // Trending
  const trending = games.filter(g => g.trending).slice(0, 4);
  renderGamesGrid('trendingGames', trending, basePath);

  // Recent
  const recent = [...games]
    .sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))
    .slice(0, 8);
  renderGamesGrid('recentGames', recent, basePath);
}

// =========================================
// GAMES LIST PAGE
// =========================================

let currentCategory = 'All';
let currentSearch = '';

function filterGames() {
  return getGames().filter(g => {
    const matchCat = currentCategory === 'All' || g.category === currentCategory;
    const q = currentSearch.toLowerCase();
    const matchSearch = !q || g.title.toLowerCase().includes(q) || g.description.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });
}

function initGamesPage() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('category');
  const search = params.get('search');

  if (cat) {
    currentCategory = cat;
    const sel = document.getElementById('categoryFilter');
    if (sel) sel.value = cat;
  }
  if (search) {
    currentSearch = search;
    const inp = document.getElementById('searchInput');
    if (inp) inp.value = search;
  }

  renderGamesGrid('gamesGrid', filterGames(), '../');

  const searchInput = document.getElementById('searchInput');
  const catFilter = document.getElementById('categoryFilter');

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
    { name: 'Action', icon: '⚔️' },
    { name: 'Racing', icon: '🏎️' },
    { name: 'Shooting', icon: '🔫' },
    { name: 'Adventure', icon: '🗺️' },
    { name: 'Sports', icon: '⚽' },
    { name: 'Strategy', icon: '♟️' },
    { name: 'RPG', icon: '🧙' },
    { name: 'Horror', icon: '👻' },
    { name: 'Fighting', icon: '🥊' },
    { name: 'Puzzle', icon: '🧩' },
    { name: 'Simulator', icon: '🎮' },
    { name: 'Other', icon: '🌐' },
  ];
  const games = getGames();
  const grid = document.getElementById('categoriesGrid');
  if (!grid) return;
  grid.innerHTML = categories.map(cat => {
    const count = games.filter(g => g.category === cat.name).length;
    return `
      <a class="category-card" href="games.html?category=${cat.name}">
        <span class="category-icon">${cat.icon}</span>
        <div class="category-name">${cat.name}</div>
        <div class="category-count">${count} game${count !== 1 ? 's' : ''}</div>
      </a>`;
  }).join('');
}

// =========================================
// GAME DETAIL PAGE
// =========================================

function loadGameDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) { window.location.href = 'games.html'; return; }

  const game = getGameById(id);
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

  document.title = game.title + ' - RG Gamers';

  container.innerHTML = `
    <div class="game-detail-header">
      <div class="game-cover">
        <img src="${game.image}" alt="${game.title}" onerror="this.src='../images/placeholder.jpg'">
        ${game.trending ? '<div class="trending-badge-detail">🔥 TRENDING</div>' : ''}
      </div>
      <div class="game-info-panel">
        <div class="game-category-tag">${game.category}</div>
        <h1 class="game-title-detail">${game.title}</h1>
        <p class="game-desc-detail">${game.description}</p>
        <div class="game-file-info">
          <div class="file-info-item">
            <div class="file-info-label">File Size</div>
            <div class="file-info-value">📦 ${game.size}</div>
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
            <div class="file-info-value">📅 ${game.uploadDate || 'N/A'}</div>
          </div>
        </div>
        <button class="btn btn-download" onclick="startDownload('${game.id}','../')">
          ⬇️ DOWNLOAD — ${game.size}
        </button>
        <p style="color:var(--text-muted);font-size:0.78rem;margin-top:0.6rem">
          Hosted on Pixeldrain · WinRAR (.rar) format · Extract with WinRAR
        </p>
      </div>
    </div>

    <div class="sysreq-box">
      <h3>⚙️ System Requirements</h3>
      <div class="sysreq-grid">
        <div class="sysreq-item"><span class="sysreq-key">OS</span><span class="sysreq-val">${game.sysReq?.os || 'N/A'}</span></div>
        <div class="sysreq-item"><span class="sysreq-key">CPU</span><span class="sysreq-val">${game.sysReq?.cpu || 'N/A'}</span></div>
        <div class="sysreq-item"><span class="sysreq-key">RAM</span><span class="sysreq-val">${game.sysReq?.ram || 'N/A'}</span></div>
        <div class="sysreq-item"><span class="sysreq-key">GPU</span><span class="sysreq-val">${game.sysReq?.gpu || 'N/A'}</span></div>
        <div class="sysreq-item"><span class="sysreq-key">Storage</span><span class="sysreq-val">${game.sysReq?.storage || 'N/A'}</span></div>
      </div>
    </div>

    <div class="how-to-extract">
      <h3>📦 How to Extract & Install</h3>
      <div class="steps-grid">
        <div class="step"><div class="step-num">1</div><div class="step-text">Download the .rar file from Pixeldrain</div></div>
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
  renderAdminStats();
  renderAdminList();
  initAdminForm();

  // Image preview
  const imageUrlInput = document.getElementById('gameImageUrl');
  if (imageUrlInput) {
    imageUrlInput.addEventListener('input', function() {
      const preview = document.getElementById('imagePreview');
      const img = document.getElementById('previewImg');
      if (this.value) {
        img.src = this.value;
        img.onerror = () => preview.style.display = 'none';
        img.onload = () => preview.style.display = 'block';
        preview.style.display = 'block';
      } else {
        preview.style.display = 'none';
      }
    });
  }
}

function renderAdminStats() {
  const games = getGames();
  const totalEl = document.getElementById('statTotal');
  const dlEl = document.getElementById('statDownloads');
  const trendEl = document.getElementById('statTrending');
  if (totalEl) totalEl.textContent = games.length;
  if (dlEl) dlEl.textContent = formatNumber(games.reduce((a, g) => a + (g.downloads || 0), 0));
  if (trendEl) trendEl.textContent = games.filter(g => g.trending).length;
}

function initAdminForm() {
  const form = document.getElementById('adminForm');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    submitGame();
  });
}

function submitGame() {
  const title = document.getElementById('gameTitle').value.trim();
  const category = document.getElementById('gameCategory').value;
  const description = document.getElementById('gameDesc').value.trim();
  const size = document.getElementById('gameSize').value.trim();
  const downloadUrl = document.getElementById('gameDownloadUrl').value.trim();
  const imageUrl = document.getElementById('gameImageUrl').value.trim();
  const trending = document.getElementById('gameTrending').checked;

  const os = document.getElementById('sysOS').value.trim();
  const cpu = document.getElementById('sysCPU').value.trim();
  const ram = document.getElementById('sysRAM').value.trim();
  const gpu = document.getElementById('sysGPU').value.trim();
  const storage = document.getElementById('sysStorage').value.trim();

  if (!title || !category || !description || !size || !downloadUrl) {
    showToast('⚠️ Please fill in all required fields including download URL!');
    return;
  }

  if (!downloadUrl.startsWith('http')) {
    showToast('⚠️ Download URL must start with https://');
    return;
  }

  const newGame = {
    id: 'game_' + Date.now(),
    title,
    category,
    description,
    size,
    image: imageUrl || '',
    downloadUrl,
    sysReq: { os, cpu, ram, gpu, storage },
    trending,
    downloads: 0,
    uploadDate: new Date().toISOString().split('T')[0]
  };

  addGame(newGame);
  showToast('✅ "' + title + '" added successfully!');
  document.getElementById('adminForm').reset();
  document.getElementById('imagePreview').style.display = 'none';
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
  list.innerHTML = games.map(game => `
    <div class="admin-game-item" id="admin_${game.id}">
      <img class="admin-game-thumb" src="${game.image || ''}" alt="${game.title}" onerror="this.style.background='var(--bg-dark)';this.src='../images/placeholder.jpg'">
      <div class="admin-game-info">
        <div class="admin-game-title">${game.title}</div>
        <div class="admin-game-meta">
          <span>📂 ${game.category}</span>
          <span>📦 ${game.size}</span>
          <span>⬇️ ${formatNumber(game.downloads)} downloads</span>
          <span>📅 ${game.uploadDate}</span>
          ${game.downloadUrl ? '<span style="color:var(--neon-green)">✅ Link Set</span>' : '<span style="color:var(--neon-pink)">⚠️ No Link</span>'}
        </div>
      </div>
      <div class="admin-actions">
        <button class="btn btn-outline btn-sm" onclick="viewGameAdmin('${game.id}')">👁️ View</button>
        <button class="btn btn-sm" style="border:1px solid var(--neon-blue);color:var(--neon-blue);background:transparent;padding:6px 12px;border-radius:4px;font-size:0.78rem" onclick="editDownloadUrl('${game.id}')">✏️ Edit Link</button>
        <button class="btn btn-pink btn-sm" onclick="confirmDelete('${game.id}', '${game.title.replace(/'/g, "\\'")}')">🗑️ Delete</button>
      </div>
    </div>
  `).join('');
}

function viewGameAdmin(id) {
  window.location.href = 'game-detail.html?id=' + id;
}

function editDownloadUrl(id) {
  const game = getGameById(id);
  if (!game) return;
  const newUrl = prompt('Enter Pixeldrain download URL for "' + game.title + '":', game.downloadUrl || '');
  if (newUrl !== null) {
    updateGame(id, { downloadUrl: newUrl.trim() });
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
    showToast('✅ Message sent! We will reply soon.');
    form.reset();
  });
}

// =========================================
// AUTO-INIT
// =========================================

document.addEventListener('DOMContentLoaded', function() {
  const pageId = document.body.getAttribute('data-page');
  const isInPages = window.location.pathname.includes('/pages/');
  const basePath = isInPages ? '../' : '';

  initScrollTop();
  initMobileNav();
  initNavSearch(basePath);

  // Close modal on overlay click
  const overlay = document.getElementById('downloadOverlay');
  if (overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === this) closeDownloadModal();
    });
  }

  if (pageId === 'home')       initHomePage();
  if (pageId === 'games')      initGamesPage();
  if (pageId === 'detail')     loadGameDetail();
  if (pageId === 'categories') initCategoriesPage();
  if (pageId === 'admin')      initAdminPage();
  if (pageId === 'contact')    initContactForm();
});
