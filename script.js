


// ⭐ RANDOM MEDIA LOADER
document.addEventListener("DOMContentLoaded", () => {

  const API = "https://poet-worker.psell515.workers.dev";
  const TOKEN = "my_subway";

  let cachedFiles = null;

  async function getFileList() {
    if (cachedFiles) return cachedFiles;
    const listURL = `${API}/list?token=${TOKEN}`;
    cachedFiles = await fetch(listURL).then(r => r.json());
    return cachedFiles;
  }

  async function loadRandomMedia() {
    try {
      const files = await getFileList();
      const randomFile = files[Math.floor(Math.random() * files.length)];
      const mediaURL = `${API}/?key=${encodeURIComponent(randomFile)}&token=${TOKEN}`;
      const lower = randomFile.toLowerCase();

      if (!lower.endsWith(".mp4")) {
        const preload = new Image();
        preload.src = mediaURL;
      }

      if (lower.endsWith(".mp4")) {
        document.getElementById("media").innerHTML = `
          <video autoplay loop muted playsinline class="player">
            <source src="${mediaURL}" type="video/mp4">
          </video>
        `;
      } else {
        document.getElementById("media").innerHTML = `
          <img src="${mediaURL}" class="player">
        `;
      }

    } catch (err) {
      console.error(err);
      document.getElementById("media").innerHTML = "Error loading media";
    }
  }

  loadRandomMedia();
  document.getElementById("more").onclick = () => loadRandomMedia();

});
