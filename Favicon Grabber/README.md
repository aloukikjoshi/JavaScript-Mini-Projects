# Favicon Grabber 🎯

Favicon Grabber is a simple web tool that fetches and displays the favicon of a given website. It also allows users to download the favicon.

---

## Features
- Fetch website favicons using **DuckDuckGo** and **Google Favicon APIs**.
- Options to select different favicon sizes (16x16, 32x32, 48x48, 64x64, 128x128).
- Preview the favicon before downloading.
- Download the favicon directly with a single click.

---

## How to Use
1. Open the project in your browser by launching `index.html`.
2. Enter the website URL (e.g., `google.com` or `https://example.com`).
3. Select a favicon size from the dropdown menu.
4. Click on **"Grab Favicon"** to preview the favicon.
5. Click on **"Download Favicon"** to save it to your device.

---

## Technologies Used
- **HTML**: For structure and layout.
- **CSS**: For styling and design.
- **JavaScript**: For logic and API integration.

---

## APIs Used
1. **DuckDuckGo Favicon API**  
   - URL: `https://icons.duckduckgo.com/ip3/{domain}.ico`
   - Fetches default favicon of a website.

2. **Google Favicon API**  
   - URL: `https://s2.googleusercontent.com/s2/favicons?domain={domain}&sz={size}`
   - Fetches favicons in multiple sizes.

---

## How to Run
1. Download or clone this repository:
   ```bash
   git clone https://github.com/your-username/Favicon-Grabber.git
   cd Favicon-Grabber

2. Open 'index.html' in your browser.
