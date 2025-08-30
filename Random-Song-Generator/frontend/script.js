async function getSong() {
  const mood = document.getElementById("mood").value.trim();
  const genre = document.getElementById("genre").value.trim();
  const artist = document.getElementById("artist").value.trim();

  if (!mood && !genre && !artist) {
    document.getElementById("result").innerHTML = "<p>Please enter at least one input!</p>";
    return;
  }

  let query = "";
  if (artist) query += `artist:${artist} `;
  if (genre) query += `genre:${genre} `;
  if (mood) query += mood;

  try {
    // Get token from backend
    const tokenRes = await fetch("http://localhost:5000/token");
    const tokenData = await tokenRes.json();
    const token = tokenData.access_token;

    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=20`;
    const res = await fetch(url, { headers: { Authorization: "Bearer " + token } });
    const data = await res.json();

    if (!data.tracks || data.tracks.items.length === 0) {
      document.getElementById("result").innerHTML = "<p>No results found. Try different inputs!</p>";
      return;
    }

    const randomSong = data.tracks.items[Math.floor(Math.random() * data.tracks.items.length)];

    document.getElementById("result").innerHTML = `
      <div class="song">
        <img src="${randomSong.album.images[0].url}" alt="Album Art">
        <h2>${randomSong.name}</h2>
        <p><strong>Artist:</strong> ${randomSong.artists[0].name}</p>
        <p><strong>Album:</strong> ${randomSong.album.name}</p>
        <a href="${randomSong.external_urls.spotify}" target="_blank">🎧 Listen on Spotify</a>
      </div>
    `;
  } catch (error) {
    console.error(error);
    document.getElementById("result").innerHTML = "<p>Error fetching song. Try again later.</p>";
  }
}
