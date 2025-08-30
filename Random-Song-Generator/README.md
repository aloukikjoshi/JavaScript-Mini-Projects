# 🎶 Random Song Generator

A modern, responsive web app that generates **random Spotify songs** based on user-selected **mood**, **genre**, and **artist**. Built using **HTML, CSS, JavaScript**, and the **Spotify Web API**.  

This is a mini-project demonstrating API integration, frontend-backend interaction, and dynamic content rendering.  

---

### 🌟 Features

- Generate **random songs** using Spotify Web API  
- Select **Mood** and **Genre** from dropdowns for accurate search  
- Optionally search by **Artist**  
- **Responsive two-column layout**: Inputs on left, results on right  
- Glass-style cards and modern gradient background  
- Song cards display:
  - Album art  
  - Song name  
  - Artist  
  - Album  
  - Link to Spotify  

---

### 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js + Express  
- **API:** Spotify Web API (Client Credentials Flow)  
- **Environment Variables:** `.env` to store Spotify `CLIENT_ID` and `CLIENT_SECRET` securely  

---

## 📂 Project Structure

```sh
Random-Song-Generator/
├── backend/
│ ├── server.js # Express server to get Spotify token
│ └── .env # Environment variables (CLIENT_ID, CLIENT_SECRET, PORT)
├── frontend/
│ ├── index.html # Main frontend HTML
│ ├── script.js # Frontend JS to fetch songs
│ └── style.css # Styling
├── README.md
```

### 🚀 Setup Instructions

```sh
git clone https://github.com/<your-username>/JavaScript-Mini-Projects.git
cd JavaScript-Mini-Projects/Random-Song-Generator
```

### 2. Setup Backend

```sh
cd backend
npm install

```

Create a .env file:

```sh
CLIENT_ID=your_spotify_client_id
CLIENT_SECRET=your_spotify_client_secret
PORT=5000

```

Start the backend server:

```sh
node server.js

```

### 3. Setup Frontend

Open frontend/index.html in a browser (or use VSCode Live Server).

The frontend will request Spotify token from backend and display random songs.


### ⚙️ Usage

Select Mood and Genre from dropdowns

(Optional) Enter an Artist Name

Click Generate Song

Song card appears with album art, song details, and Spotify link

### 🔐 Security

Spotify Client Secret is never exposed in frontend

Backend handles token request securely using .env

### 💡 Contributing

Contributions are welcome!

Fork the repo

Create a branch: git checkout -b feature/your-feature

Commit your changes: git commit -m "Add your feature"

Push to the branch: git push origin feature/your-feature

Open a Pull Request

### 🎯 Author

Anish Kalbhor

GitHub: https://github.com/anishvkalbhor

Email: ✉️ anishkalbhor2020@gmail.com