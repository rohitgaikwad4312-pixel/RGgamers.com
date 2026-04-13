# 🎮 RG GAMERS — Website v2
**Owner: Rohit Gaikwad**
**Email: rohit.gaikwad4312@gmail.com**
**Contact: 9975994312**

---

## 📁 FOLDER STRUCTURE

```
RGGamers/
├── index.html              ← HOME PAGE (open this first)
├── css/
│   └── style.css           ← All styling
├── js/
│   └── main.js             ← All JavaScript
├── images/
│   └── placeholder.jpg     ← Default cover image
└── pages/
    ├── games.html          ← All Games list
    ├── game-detail.html    ← Individual game page
    ├── categories.html     ← Browse by category
    ├── about.html          ← About page
    ├── contact.html        ← Contact form
    └── admin.html          ← ⭐ ADMIN UPLOAD PANEL
```

---

## 🚀 HOW TO RUN

### Method 1 — GitHub Pages (Recommended)
1. Upload this entire folder to your GitHub repository
2. Go to Settings → Pages → Deploy from main branch
3. Your site will be live at: `https://yourusername.github.io/reponame/`

### Method 2 — VS Code Live Server
1. Open this folder in VS Code
2. Install the "Live Server" extension
3. Right-click `index.html` → "Open with Live Server"

### Method 3 — Python
```
cd RGGamers
python -m http.server 8000
```
Then open `http://localhost:8000`

---

## ☁️ HOW TO ADD A GAME (PIXELDRAIN WORKFLOW)

### Step 1 — Upload to Pixeldrain
1. Go to **https://pixeldrain.com** and sign in (or create free account)
2. Upload your `.rar` game file
3. After upload, click **Share** or copy the file URL
4. You'll get a link like: `https://pixeldrain.com/u/xxxxxxxx`

### Step 2 — Add to Website via Admin Panel
1. Open `pages/admin.html` in your browser
2. Fill in:
   - **Game Title** (e.g. GTA 5)
   - **Category** (e.g. Action)
   - **File Size** (e.g. 65 GB)
   - **Pixeldrain URL** ← paste the link from Step 1
   - **Cover Image URL** ← optional, paste any image URL
   - **Description** and **System Requirements**
3. Click **"Add Game to RG Gamers"** ✅

The game appears instantly on the website. When users click Download,
they'll be redirected to Pixeldrain to download the file.

---

## ✏️ EDIT EXISTING GAME LINKS

In the Admin Panel, every game has an **"✏️ Edit Link"** button.
Click it to update the Pixeldrain URL for any game at any time.

---

## 🌐 PAGES OVERVIEW

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Featured, trending, recent games |
| All Games | `pages/games.html` | Full list with search & filter |
| Game Detail | `pages/game-detail.html?id=xxx` | Individual game page |
| Categories | `pages/categories.html` | Browse by genre |
| About | `pages/about.html` | About the website |
| Contact | `pages/contact.html` | Contact / game request form |
| **Admin** | **`pages/admin.html`** | **Upload & manage games** |

---

## ⚙️ HOW IT WORKS

- **Game Database:** Stored in the browser's `localStorage` — games save automatically and persist between visits.
- **Downloads:** When a user clicks Download, they're redirected to the Pixeldrain link you set in the Admin panel.
- **Search & Filter:** Real-time search by title/description, filter by category.
- **Pixeldrain:** All actual game files are hosted on Pixeldrain — the website just stores the links.

---

## 🎨 CUSTOMIZATION

### Change website name/owner:
Search for "RG Gamers" in HTML files to replace, and "Rohit Gaikwad" for owner info.

### Change colors:
Open `css/style.css`, find the `:root` section, and change:
- `--neon-green` → primary accent color
- `--neon-blue` → secondary accent
- `--neon-pink` → admin/alert color

---

Built with ❤️ for RG Gamers — Rohit Gaikwad
