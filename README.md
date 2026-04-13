# 🎮 RG GAMERS — Complete Website

A fully functional PC game download website built with HTML, CSS, and JavaScript.

---

## 📁 FOLDER STRUCTURE

```
RG-Gamers/
│
├── index.html              ← HOME PAGE (open this first)
│
├── css/
│   └── style.css           ← All styling (dark gaming theme)
│
├── js/
│   └── main.js             ← All JavaScript (games data, download, search)
│
├── images/
│   ├── placeholder.jpg     ← Default image when no cover is set
│   ├── gta5.jpg            ← Add your game cover images here
│   ├── minecraft.jpg
│   └── (more game images)
│
├── game-files/
│   ├── GTA5.rar            ← Put your actual .rar game files here
│   └── (more game files)
│
└── pages/
    ├── games.html          ← All Games list page
    ├── game-detail.html    ← Individual game page (auto-loads from URL)
    ├── categories.html     ← Browse by category
    ├── about.html          ← About RG Gamers
    ├── contact.html        ← Contact form
    └── admin.html          ← ADMIN UPLOAD PANEL ⭐
```

---

## 🚀 HOW TO RUN ON YOUR LAPTOP

### Method 1 — Simple (Double Click)
1. Open the `RG-Gamers` folder
2. Double-click `index.html`
3. It will open in your browser ✅

> ⚠️ Note: Some features like file downloads work best with Method 2 below.

### Method 2 — Using VS Code (Recommended)
1. Install **Visual Studio Code** (free at code.visualstudio.com)
2. Install the **Live Server** extension in VS Code
3. Open the `RG-Gamers` folder in VS Code
4. Right-click `index.html` → "Open with Live Server"
5. Website opens at `http://127.0.0.1:5500` ✅

### Method 3 — Using Python (if installed)
1. Open a terminal/command prompt
2. Navigate to the RG-Gamers folder: `cd path/to/RG-Gamers`
3. Run: `python -m http.server 8000`
4. Open browser: `http://localhost:8000` ✅

---

## 🎮 HOW TO ADD YOUR GTA 5 FILE

### Step 1 — Add the game image
- Put a GTA 5 cover image (jpg/png) in the `images/` folder
- Name it: `gta5.jpg`

### Step 2 — Add the RAR file
- Put your `GTA5.rar` file inside the `game-files/` folder
- The path should be: `RG-Gamers/game-files/GTA5.rar`

### Step 3 — The game is already in the database!
GTA 5 is already pre-loaded in the website with all details.
The download button will automatically look for `game-files/GTA5.rar`.

### Step 4 — To add MORE games via Admin Panel
1. Go to `pages/admin.html` in your browser
2. Fill in the game title, category, description, file size
3. Upload a cover image
4. Upload the .rar file
5. Click "Upload Game" ✅
The game page is auto-created and appears in the games list immediately!

---

## 🌐 PAGES OVERVIEW

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Featured, trending, recent games |
| All Games | `pages/games.html` | Full list with search & filter |
| Game Detail | `pages/game-detail.html?id=gta5` | Individual game page |
| Categories | `pages/categories.html` | Browse by genre |
| About | `pages/about.html` | About the website |
| Contact | `pages/contact.html` | Contact/game request form |
| **Admin** | `pages/admin.html` | **Upload & manage games** |

---

## ⚙️ HOW IT WORKS (For Beginners)

**Game Database:** All games are stored in your browser's `localStorage`.
This means the games save automatically and stay there even after closing the browser.

**Adding Games:** Use the Admin Panel to upload games. The website creates
the game page automatically — you don't need to write any code!

**Search:** The search bar on the Games page searches game titles and descriptions.

**Filter:** Use the category dropdown to show only games from a specific genre.

**Download:** When you click Download, a loading animation plays for 3 seconds,
then the .rar file starts downloading from the `game-files/` folder.

---

## 🎨 CUSTOMIZATION

### Change the website name:
Search for "RG Gamers" in the HTML files and replace with your name.

### Change colors:
Open `css/style.css` and find the `:root` section at the top.
Change `--neon-green`, `--neon-blue`, `--neon-pink` to your preferred colors.

### Add more categories:
In `pages/admin.html` and `pages/games.html`, find the `<select>` with categories
and add more `<option>` tags.

---

## 📱 COMPATIBILITY

- ✅ Google Chrome
- ✅ Mozilla Firefox
- ✅ Microsoft Edge
- ✅ Safari
- ✅ Mobile browsers
- ✅ Works offline (after first load)

---

## 🛠️ REQUIREMENTS

- No server needed for basic browsing
- For downloads to work: run via Live Server or Python http.server
- WinRAR required by users to extract downloaded files
- Internet needed only for Google Fonts (optional — works without it)

---

Built with ❤️ for RG Gamers — A student gaming project.
