/* ========================================
   RG GAMERS - Main JavaScript
   All site logic: games data, search,
   filter, download, admin upload
   ======================================== */

// =========================================
// GAMES DATABASE (stored in localStorage)
// =========================================

// Default games to pre-populate the site
const DEFAULT_GAMES = [
   {
    id: 'processing-i3',
    title: 'Processing I3 3.5.4',
    category: 'Other',
    description: 'Processing is a Java-based creative coding software. Version 3.5.4 — perfect for beginners learning programming and creative visual coding.',
    size: '111 MB',
    image: 'images/processing.jpg',
    file: 'https://pixeldrain.com/u/4Bk9SWp6',
    sysReq: {
      os: 'Windows 7/8/10/11',
      cpu: 'Intel Core i3 or equivalent',
      ram: '2 GB',
      gpu: 'Any',
      storage: '200 MB'
    },
    trending: false,
    downloads: 0,
    uploadDate: '2025-04-13'
  },
  {
    id: 'gta5',
    title: 'Grand Theft Auto V',
    category: 'Action',
    description: 'Experience the sprawling open world of Los Santos in one of the best open-world games ever made. Complete missions, explore the city, and cause chaos in GTA V.',
    size: '65 GB',
    image: 'images/gta5.jpg',
    file: 'game-files/GTA5.rar',
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
    image: 'images/minecraft.jpg',
    file: 'game-files/Minecraft.rar',
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
    image: 'images/valorant.jpg',
    file: 'game-files/Valorant.rar',
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
    image: 'images/nfs.jpg',
    file: 'game-files/NFS_Heat.rar',
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
    description: 'An open-world action-adventure set in Night City. Create your character V, navigate the cyberpunk world, and fight for survival in a mega-city obsessed with power.',
    size: '70 GB',
    image: 'images/cyberpunk.jpg',
    file: 'game-files/Cyberpunk2077.rar',
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
    description: '100 players drop onto an island, gather weapons, and build structures to be the last one standing. The most popular battle royale game in the world.',
    size: '28 GB',
    image: 'images/fortnite.jpg',
    file: 'game-files/Fortnite.rar',
    sysReq: {
      os: 'Windows 10 64-bit',
      cpu: 'Core i5-7300U 3.5 GHz, Ryzen 3 3300U',
      ram: '8 GB',
      gpu: 'NVIDIA GTX 960, AMD R9 280',
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
   localStorage.setItem('rg_games', JSON.stringify(DEFAULT_GAMES));
    return DEFAULT_GAMES;
  }
  return JSON.parse(stored);
}

function saveGames(games) {
  localStorage.setItem('rg_games', JSON.stringify(games));
}

function addGame(game) {
  const games = getGames();
  games.unshift(game); // Add new game to top
  saveGames(games);
}

function deleteGame(id) {
  const games = getGames().filter(g => g.id !== id);
  saveGames(games);
}

function getGameById(id) {
  return getGames().find(g => g.id === id);
}

// =========================================
// CARD HTML GENERATOR
// =========================================

function createGameCard(game) {
  return `
    <div class="game-card" onclick="goToGame('${game.id}')">
      <div class="card-image">
        <img src="${game.image}" alt="${game.title}" onerror="this.src='images/placeholder.jpg'">
        <div class="card-badge">${game.category}</div>
        ${game.trending ? '<div class="badge-trending">🔥 Hot</div>' : ''}
        <div class="card-overlay">
          <div class="overlay-btn">VIEW DETAILS</div>
        </div>
      </div>
      <div class="card-body">
        <div class="card-title">${game.title}</div>
        <div class="card-meta">
          <span class="card-size">📦 ${game.size}</span>
          <span class="card-downloads">⬇️ ${formatNumber(game.downloads)}</span>
        </div>
        <div class="card-desc">${game.description}</div>
        <button class="card-download-btn" onclick="event.stopPropagation(); startDownload('${game.id}')">
          ⬇️ DOWNLOAD RAR
        </button>
      </div>
    </div>
  `;
}

// Format numbers like 1000 -> 1K
function formatNumber(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n;
}

// =========================================
// NAVIGATION
// =========================================

function goToGame(id) {
  window.location.href = `pages/game-detail.html?id=${id}`;
}

function goToGames() {
  window.location.href = 'pages/games.html';
}

// =========================================
// DOWNLOAD SYSTEM
// =========================================

function startDownload(gameId) {
  const game = getGameById(gameId);
  if (!game) return;

  // Show download modal
  const overlay = document.getElementById('downloadOverlay');
  const dlName = document.getElementById('dlGameName');
  const dlSize = document.getElementById('dlGameSize');

  if (overlay) {
    if (dlName) dlName.textContent = game.title;
    if (dlSize) dlSize.textContent = game.size;
    overlay.classList.add('active');

    // After 3 seconds, start actual download
    setTimeout(() => {
      overlay.classList.remove('active');
      // Increment download count
      const games = getGames();
      const idx = games.findIndex(g => g.id === gameId);
      if (idx !== -1) {
        games[idx].downloads = (games[idx].downloads || 0) + 1;
        saveGames(games);
      }
      // Trigger file download
      triggerFileDownload(game);
      showToast(`✅ ${game.title} download started!`);
    }, 3000);
  }
}

function triggerFileDownload(game) {
  if (game.file.startsWith('http')) {
    // External link (Pixeldrain etc.) — open in new tab
    window.open(game.file, '_blank');
  } else {
    // Local file — download directly
    const a = document.createElement('a');
    a.href = '../' + game.file;
    a.download = game.title.replace(/\s+/g, '_') + '.rar';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
}

function closeDownloadModal() {
  const overlay = document.getElementById('downloadOverlay');
  if (overlay) overlay.classList.remove('active');
}

// =========================================
// SEARCH & FILTER
// =========================================

let currentCategory = 'All';
let currentSearch = '';

function renderGamesGrid(containerId, games) {
  const container = document.getElementById(containerId);
  if (!container) return;
  if (games.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="empty-icon">🎮</div>
        <h3>No Games Found</h3>
        <p>Try a different search or category.</p>
      </div>
    `;
    return;
  }
  container.innerHTML = games.map(createGameCard).join('');
}

function filterGames() {
  const games = getGames();
  return games.filter(game => {
    const matchCat = currentCategory === 'All' || game.category === currentCategory;
    const matchSearch = game.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
                        game.description.toLowerCase().includes(currentSearch.toLowerCase());
    return matchCat && matchSearch;
  });
}

function onSearchInput(value) {
  currentSearch = value;
  const filtered = filterGames();
  renderGamesGrid('gamesGrid', filtered);
}

function onCategoryChange(value) {
  currentCategory = value;
  const filtered = filterGames();
  renderGamesGrid('gamesGrid', filtered);
}

// =========================================
// TOAST NOTIFICATIONS
// =========================================

function showToast(message, type = 'success') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-icon">✅</span><span class="toast-text"></span>`;
    document.body.appendChild(toast);
  }
  toast.querySelector('.toast-text').textContent = message;
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
    if (window.scrollY > 300) btn.classList.add('visible');
    else btn.classList.remove('visible');
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// =========================================
// MOBILE NAV
// =========================================

function initMobileNav() {
  const ham = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (ham && navLinks) {
    ham.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }
}

// =========================================
// ADMIN UPLOAD
// =========================================

function initAdminForm() {
  const form = document.getElementById('adminForm');
  if (!form) return;

  // Drag & drop styling for file boxes
  document.querySelectorAll('.file-upload-box').forEach(box => {
    const input = box.querySelector('input[type="file"]');
    box.addEventListener('dragover', e => {
      e.preventDefault();
      box.classList.add('drag-over');
    });
    box.addEventListener('dragleave', () => box.classList.remove('drag-over'));
    box.addEventListener('drop', e => {
      e.preventDefault();
      box.classList.remove('drag-over');
      if (input && e.dataTransfer.files.length > 0) {
        input.files = e.dataTransfer.files;
        updateFileLabel(box, e.dataTransfer.files[0].name);
      }
    });
    if (input) {
      input.addEventListener('change', () => {
        if (input.files.length > 0) updateFileLabel(box, input.files[0].name);
      });
    }
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    submitGame();
  });

  renderAdminList();
}

function updateFileLabel(box, filename) {
  const text = box.querySelector('.upload-text');
  if (text) text.innerHTML = `<strong>${filename}</strong> selected ✅`;
}

function submitGame() {
  const title = document.getElementById('gameTitle').value.trim();
  const category = document.getElementById('gameCategory').value;
  const description = document.getElementById('gameDesc').value.trim();
  const size = document.getElementById('gameSize').value.trim();
  const imageFile = document.getElementById('gameImage').files[0];
  const rarFile = document.getElementById('gameFile').files[0];

  // System requirements
  const os = document.getElementById('sysOS').value.trim();
  const cpu = document.getElementById('sysCPU').value.trim();
  const ram = document.getElementById('sysRAM').value.trim();
  const gpu = document.getElementById('sysGPU').value.trim();
  const storage = document.getElementById('sysStorage').value.trim();

  if (!title || !category || !description || !size) {
    showToast('⚠️ Please fill in all required fields!');
    return;
  }

  // Create object URL for local image preview
  const imageUrl = imageFile ? URL.createObjectURL(imageFile) : 'images/placeholder.jpg';
  const fileUrl = rarFile ? rarFile.name : '';

  const newGame = {
    id: 'game_' + Date.now(),
    title,
    category,
    description,
    size,
    image: imageUrl,
    file: 'game-files/' + fileUrl,
    sysReq: { os, cpu, ram, gpu, storage },
    trending: false,
    downloads: 0,
    uploadDate: new Date().toISOString().split('T')[0]
  };

  addGame(newGame);
  showToast(`✅ "${title}" uploaded successfully!`);
  document.getElementById('adminForm').reset();
  document.querySelectorAll('.upload-text').forEach(t => {
    if (!t.classList.contains('static')) {
      t.innerHTML = '<strong>Click to upload</strong> or drag & drop';
    }
  });
  renderAdminList();
}

function renderAdminList() {
  const list = document.getElementById('adminGamesList');
  if (!list) return;
  const games = getGames();
  if (games.length === 0) {
    list.innerHTML = '<p style="color:var(--text-muted); text-align:center; padding:2rem">No games uploaded yet.</p>';
    return;
  }
  list.innerHTML = games.map(game => `
    <div class="admin-game-item" id="admin_${game.id}">
      <img class="admin-game-thumb" src="${game.image}" alt="${game.title}" onerror="this.src='../images/placeholder.jpg'">
      <div class="admin-game-info">
        <div class="admin-game-title">${game.title}</div>
        <div class="admin-game-meta">
          <span>📂 ${game.category}</span>
          <span>📦 ${game.size}</span>
          <span>⬇️ ${formatNumber(game.downloads)} downloads</span>
          <span>📅 ${game.uploadDate}</span>
        </div>
      </div>
      <div class="admin-actions">
        <button class="btn btn-outline btn-sm" onclick="viewGame('${game.id}')">👁️ View</button>
        <button class="btn btn-pink btn-sm" onclick="confirmDelete('${game.id}', '${game.title.replace(/'/g, "\\'")}')">🗑️ Delete</button>
      </div>
    </div>
  `).join('');
}

function viewGame(id) {
  window.location.href = `game-detail.html?id=${id}`;
}

function confirmDelete(id, title) {
  if (confirm(`Delete "${title}"? This cannot be undone.`)) {
    deleteGame(id);
    showToast(`🗑️ "${title}" deleted.`);
    renderAdminList();
  }
}

// =========================================
// GAME DETAIL PAGE LOADER
// =========================================

function loadGameDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) { window.location.href = '../pages/games.html'; return; }

  const game = getGameById(id);
  if (!game) {
    document.getElementById('gameDetailContent').innerHTML = `
      <div class="empty-state" style="padding:5rem 2rem">
        <div class="empty-icon">🎮</div>
        <h3>Game Not Found</h3>
        <p>This game doesn't exist or was removed.</p>
        <br><a href="games.html" class="btn btn-primary" style="display:inline-flex">Back to Games</a>
      </div>`;
    return;
  }

  // Update page title
  document.title = `${game.title} - RG Gamers`;

  document.getElementById('gameDetailContent').innerHTML = `
    <div class="game-detail-header">
      <div class="game-cover">
        <img src="../${game.image}" alt="${game.title}" onerror="this.src='../images/placeholder.jpg'">
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
        </div>
        <button class="btn btn-download" onclick="startDownload('${game.id}')">
          ⬇️ DOWNLOAD ${game.title.toUpperCase()} — ${game.size}
        </button>
      </div>
    </div>

    <div class="sysreq-box">
      <h3>⚙️ System Requirements</h3>
      <div class="sysreq-grid">
        <div class="sysreq-item"><span class="sysreq-key">OS:</span><span class="sysreq-val">${game.sysReq.os || 'N/A'}</span></div>
        <div class="sysreq-item"><span class="sysreq-key">CPU:</span><span class="sysreq-val">${game.sysReq.cpu || 'N/A'}</span></div>
        <div class="sysreq-item"><span class="sysreq-key">RAM:</span><span class="sysreq-val">${game.sysReq.ram || 'N/A'}</span></div>
        <div class="sysreq-item"><span class="sysreq-key">GPU:</span><span class="sysreq-val">${game.sysReq.gpu || 'N/A'}</span></div>
        <div class="sysreq-item"><span class="sysreq-key">Storage:</span><span class="sysreq-val">${game.sysReq.storage || 'N/A'}</span></div>
      </div>
    </div>

    <div style="text-align:center; margin-top:2rem">
      <button class="btn btn-download" onclick="startDownload('${game.id}')">
        ⬇️ DOWNLOAD NOW — ${game.size}
      </button>
      <p style="color:var(--text-muted); font-size:0.8rem; margin-top:0.8rem">
        File will download in WinRAR (.rar) format. Requires WinRAR to extract.
      </p>
    </div>
  `;
}

// =========================================
// HOME PAGE INIT
// =========================================

function initHomePage() {
  const games = getGames();

  // Featured game (first trending or first)
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
        <div style="display:flex; gap:1rem; flex-wrap:wrap">
          <button class="btn btn-primary" onclick="startDownload('${featured.id}')">⬇️ Download Now</button>
          <button class="btn btn-outline" onclick="goToGame('${featured.id}')">📄 Details</button>
        </div>
      </div>
    `;
  }

  // Trending games
  const trending = games.filter(g => g.trending).slice(0, 4);
  renderGamesGrid('trendingGames', trending);

  // Recent games (by date, newest first)
  const recent = [...games]
    .sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))
    .slice(0, 8);
  renderGamesGrid('recentGames', recent);
}

// =========================================
// CATEGORIES PAGE INIT
// =========================================

function initCategoriesPage() {
  const categories = [
    { name: 'Action',    icon: '⚔️' },
    { name: 'Racing',    icon: '🏎️' },
    { name: 'Shooting',  icon: '🔫' },
    { name: 'Adventure', icon: '🗺️' },
    { name: 'Sports',    icon: '⚽' },
    { name: 'Strategy',  icon: '♟️' },
    { name: 'RPG',       icon: '🧙' },
    { name: 'Horror',    icon: '👻' },
    { name: 'Fighting',  icon: '🥊' },
    { name: 'Puzzle',    icon: '🧩' },
    { name: 'Simulator', icon: '🎮' },
    { name: 'Other',     icon: '🌐' },
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
        <div class="category-count">${count} games</div>
      </a>
    `;
  }).join('');
}

// =========================================
// GAMES LIST PAGE INIT
// =========================================

function initGamesPage() {
  // Check for ?category= in URL
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('category');
  if (cat) {
    currentCategory = cat;
    const sel = document.getElementById('categoryFilter');
    if (sel) sel.value = cat;
  }

  const filtered = filterGames();
  renderGamesGrid('gamesGrid', filtered);

  // Wire up search and filter inputs
  const searchInput = document.getElementById('searchInput');
  const catFilter = document.getElementById('categoryFilter');

  if (searchInput) {
    searchInput.addEventListener('input', e => onSearchInput(e.target.value));
  }
  if (catFilter) {
    catFilter.addEventListener('change', e => onCategoryChange(e.target.value));
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
// NAV SEARCH (HOME PAGE TOP BAR)
// =========================================

function initNavSearch() {
  const navSearchInput = document.getElementById('navSearchInput');
  if (navSearchInput) {
    navSearchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && this.value.trim()) {
        window.location.href = 'pages/games.html?search=' + encodeURIComponent(this.value.trim());
      }
    });
  }
}

// =========================================
// AUTO-INIT ON PAGE LOAD
// =========================================

document.addEventListener('DOMContentLoaded', function() {
  // Always init these
  initScrollTop();
  initMobileNav();
  initNavSearch();

  // Detect which page we are on
  const body = document.body;
  const pageId = body.getAttribute('data-page');

  if (pageId === 'home')       initHomePage();
  if (pageId === 'games')      initGamesPage();
  if (pageId === 'detail')     loadGameDetail();
  if (pageId === 'categories') initCategoriesPage();
  if (pageId === 'admin')      initAdminForm();
  if (pageId === 'contact')    initContactForm();

  // Handle URL search param on games page
  if (pageId === 'games') {
    const params = new URLSearchParams(window.location.search);
    const search = params.get('search');
    if (search) {
      currentSearch = search;
      const input = document.getElementById('searchInput');
      if (input) input.value = search;
    }
  }

  // Close download modal when clicking outside
  const overlay = document.getElementById('downloadOverlay');
  if (overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === this) closeDownloadModal();
    });
  }
});
