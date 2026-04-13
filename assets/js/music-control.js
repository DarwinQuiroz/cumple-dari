function setupMusicControls() {
  const music = document.getElementById("backgroundMusic");
  const musicBtn = document.getElementById("musicBtn");
  const playIcon = document.getElementById("playIcon");
  const pauseIcon = document.getElementById("pauseIcon");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  // const songTitleBtn = document.getElementById("songTitle");

  if (!music || !musicBtn || !prevBtn || !nextBtn) {
    console.error("Music or control elements not found");
    return;
  }

  // Lista de canciones
  const playlist = [
    { title: "Mike Bahia - Si dios fuera poeta", src: "assets/sound/si-dios-fuera-poeta.mp3" },
    { title: "Al2 - Contigo", src: "assets/sound/contigo.mp3" },
    { title: "El Chojin - Estoy contigo", src: "assets/sound/estoy-contigo.mp3" }
  ];

  let currentSongIndex = 0;

  function loadSong(index) {
    if (index >= 0 && index < playlist.length) {
      music.src = playlist[index].src;
      // if (songTitleBtn) {
      //   songTitleBtn.textContent = playlist[index].title;
      // }
      music.load();
    }
  }

  function playSong() {
    const playPromise = music.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          playIcon.style.display = "none";
          pauseIcon.style.display = "block";
        })
        .catch((error) => {
          console.warn("Playback prevented:", error.message);
          playIcon.style.display = "block";
          pauseIcon.style.display = "none";
        });
    }
  }

  function pauseSong() {
    music.pause();
    playIcon.style.display = "block";
    pauseIcon.style.display = "none";
  }

  function toggleMusic() {
    if (music.paused) {
      playSong();
    } else {
      pauseSong();
    }
  }

  function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    playSong();
  }

  function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
    playSong();
  }

  // Inicializar la primera canción
  loadSong(currentSongIndex);

  // Intentar reproducir automáticamente
  const initPlayPromise = music.play();
  if (initPlayPromise !== undefined) {
    initPlayPromise
      .then(() => {
        playIcon.style.display = "none";
        pauseIcon.style.display = "block";
      })
      .catch((error) => {
        console.warn("Autoplay blocked:", error.message);
        
        const playOnInteraction = () => {
          playSong();
          document.removeEventListener('click', playOnInteraction);
          document.removeEventListener('touchstart', playOnInteraction);
        };

        document.addEventListener('click', playOnInteraction);
        document.addEventListener('touchstart', playOnInteraction);
      });
  }

  // Event Listeners para botones
  musicBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMusic();
  });

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    nextSong();
  });

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    prevSong();
  });

  // Reproducir siguiente canción automáticamente al terminar la actual
  music.addEventListener("ended", () => {
    nextSong();
  });

  music.addEventListener("error", (e) => {
    console.error("Audio error / File not found");
    // Pasar a la siguiente canción tras un breve delay si falla
    setTimeout(nextSong, 2000);
  });
}
