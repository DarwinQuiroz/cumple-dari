function setupMusicControls() {
  const music = document.getElementById("backgroundMusic");
  const musicBtn = document.getElementById("musicBtn");
  const playIcon = document.getElementById("playIcon");
  const pauseIcon = document.getElementById("pauseIcon");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (!music || !musicBtn || !prevBtn || !nextBtn) {
    console.error("Music or control elements not found");
    return;
  }

  // Lista de canciones
  const playlist = [
    { title: "Si dios fuera poeta - Mike Bahia", src: "assets/sound/si-dios-fuera-poeta.mp3" },
    { title: "Contigo - Al2", src: "assets/sound/contigo.mp3" },
    { title: "Milagro - Al2", src: "assets/sound/milagro.mp3" }
  ];

  let currentSongIndex = 0;

  function loadSong(index) {
    if (index >= 0 && index < playlist.length) {
      music.src = playlist[index].src;
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
        
        // Estrategia más robusta para móviles: capturar cualquier primera interacción
        const playOnInteraction = () => {
          if (music.paused) {
            playSong();
          }
          // Remover todos los listeners una vez que se intentó reproducir
          ['click', 'touchstart', 'touchend', 'scroll', 'keydown'].forEach(evt => {
            document.removeEventListener(evt, playOnInteraction);
          });
        };

        // Escuchar múltiples tipos de interacción
        ['click', 'touchstart', 'touchend', 'scroll', 'keydown'].forEach(evt => {
          document.addEventListener(evt, playOnInteraction, { once: true, passive: true });
        });
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
