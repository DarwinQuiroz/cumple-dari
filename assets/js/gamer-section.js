/* ══════════════════════════════════════════════
   GAMER SECTION — Interactive JS
   Flip cards, slot machine, XP bar, particles
   ══════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── SCROLL REVEAL ──
      const revealEls = document.querySelectorAll(".reveal");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("visible");
            }
          });
        },
        { threshold: 0.1 },
      );
      revealEls.forEach((el) => observer.observe(el));

  // ── Gamer Phrases for Slot Machine ──
  const gamerPhrases = [
    { emoji: '🎯', text: 'Mi puntería en Fortnite es malísima, pero acerté de lleno al elegirte como amiga.' },
    { emoji: '🏎️', text: 'Eres mi estrella de invincibilidad en Mario Kart... ¡nadie me detiene cuando estoy contigo!' },
    // { emoji: '💜', text: 'Antes de conocerte, jugaba en modo solo. Ahora mi modo favorito es el co-op contigo.' },
    { emoji: '🎯', text: 'En Fortnite construyo muros, pero contigo construyo sueños. ¡Y sin materiales!' },
    { emoji: '🍌', text: 'Te lanzaría una cáscara de banana en Mario Kart, pero solo para que te quedes conmigo un ratito más.' },
    { emoji: '🛡️', text: 'Eres como el escudo legendario de Fortnite: me proteges de todo y me haces sentir invencible.' },
    { emoji: '⭐', text: 'Contigo todo es como la Rainbow Road: ¡colorido, loco, pero siempre vale la pena!' },
    { emoji: '🍌', text: 'Si resbalo con una banana en Mario Kart, sé que serías la primera en reírte... y luego ayudarme.' },
    { emoji: '🍄', text: 'Eres mi Super Estrella de Mario: me haces brillar e ir a toda velocidad por la vida.' },
    { emoji: '🛡️', text: 'Eres mi poción de escudos en los días malos. ¡Gracias por recargar mi energía siempre!' },
    { emoji: '🏁', text: 'Puedo perder en Mario Kart, pero nunca quiero perder la carrera de estar a tu lado.' },
    { emoji: '🎪', text: 'Si me preguntaran dónde dropear en Fortnite, elegiría siempre donde estés tú.' },
    { emoji: '💚', text: 'En el juego de la vida, tú eres el mejor power-up que he encontrado. ¡Nivel completado!' },
    { emoji: '👾', text: 'Como la arena en Fortnire, tú haces que cada desafío valga la pena.. ¡eres mi misión principal!' },
    { emoji: '🍄', text: 'Que este nuevo año consigas todos los power-ups que te propongas en la vida.' },
  ];

  let lastPhraseIndex = -1;

  // ── Background Particles ──
  function initGamerParticles() {
    const container = document.getElementById('gamerParticles');
    if (!container) return;

    const colors = ['#7c3aed', '#a855f7', '#c084fc', '#e11d48', '#22d3ee', '#34d399'];

    function createParticle() {
      const particle = document.createElement('div');
      particle.className = 'gamer-particle';
      const size = Math.random() * 4 + 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const duration = Math.random() * 8 + 6;
      const delay = Math.random() * 4;

      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        left: ${left}%;
        bottom: 0;
        box-shadow: 0 0 ${size * 3}px ${color};
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
      `;

      container.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, (duration + delay) * 1000);
    }

    // Create initial particles
    for (let i = 0; i < 15; i++) {
      createParticle();
    }

    // Keep creating particles
    setInterval(createParticle, 800);
  }

  // ── Slot Machine ──
  function initSlotMachine() {
    const btn = document.getElementById('slotBtn');
    const display = document.getElementById('slotDisplay');
    const phraseEl = document.getElementById('slotPhrase');
    const emojiEl = document.getElementById('slotEmoji');

    if (!btn || !display || !phraseEl || !emojiEl) return;

    btn.addEventListener('click', function () {
      btn.disabled = true;
      display.classList.add('spinning');
      display.classList.remove('won');

      // Quick emoji cycling animation
      const spinEmojis = ['🎮', '🕹️', '🎯', '🏆', '🎰', '🍄', '⭐', '🏎️', '💜', '🔫'];
      let spinCount = 0;
      const spinInterval = setInterval(() => {
        emojiEl.textContent = spinEmojis[spinCount % spinEmojis.length];
        phraseEl.textContent = '...';
        spinCount++;
      }, 80);

      // Pick random phrase (avoid repeating)
      setTimeout(() => {
        clearInterval(spinInterval);
        display.classList.remove('spinning');
        display.classList.add('won');

        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * gamerPhrases.length);
        } while (newIndex === lastPhraseIndex && gamerPhrases.length > 1);
        lastPhraseIndex = newIndex;

        const phrase = gamerPhrases[newIndex];
        emojiEl.textContent = phrase.emoji;
        phraseEl.textContent = phrase.text;

        // Typewriter effect
        phraseEl.textContent = '';
        let charIndex = 0;
        const typeInterval = setInterval(() => {
          phraseEl.textContent += phrase.text[charIndex];
          charIndex++;
          if (charIndex >= phrase.text.length) {
            clearInterval(typeInterval);
            btn.disabled = false;
          }
        }, 25);
      }, 1200);
    });
  }

  // ── Flip Cards + XP ──
  function initFlipCards() {
    const cards = document.querySelectorAll('.gamer-flip-card');
    const xpBar = document.getElementById('xpBar');
    const xpText = document.getElementById('xpText');
    const xpLevel = document.getElementById('xpLevel');
    let flippedCount = 0;
    const totalCards = cards.length;

    const levels = [
      { min: 0,   label: 'Compañeros de Squad 🤝' },
      { min: 17,  label: 'Fase Tutorial Completada 💡' },
      { min: 34,  label: 'Dinamita Pura (Tú y Yo) 💥' },
      { min: 50,  label: 'Equipo Imparable ⭐' },
      { min: 67,  label: 'Risas a Nivel Pro 🤣' },
      { min: 84,  label: '¡¡AMISTAD LEGENDARIA!! 🏆✨' },
    ];

    function updateXP() {
      const xp = Math.round((flippedCount / totalCards) * 100);
      const widthPercent = Math.max(xp, 15);
      xpBar.style.width = widthPercent + '%';
      xpText.textContent = xp + ' / 100 XP';

      // Update level
      let currentLevel = levels[0];
      for (const lvl of levels) {
        if (xp >= lvl.min) currentLevel = lvl;
      }
      xpLevel.textContent = 'Nivel: ' + currentLevel.label;
      xpLevel.classList.add('level-up');
      setTimeout(() => xpLevel.classList.remove('level-up'), 800);
    }

    cards.forEach((card) => {
      card.addEventListener('click', function () {
        const wasFlipped = this.classList.contains('flipped');
        this.classList.toggle('flipped');

        if (!wasFlipped) {
          flippedCount = Math.min(flippedCount + 1, totalCards);
          createCardCelebration(this);
        } else {
          flippedCount = Math.max(flippedCount - 1, 0);
        }

        updateXP();
      });
    });
  }

  // ── Card Celebration Particles ──
  function createCardCelebration(card) {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const game = card.getAttribute('data-game');

    let emojis;
    if (game === 'fortnite') {
      emojis = ['🏆', '🎯', '🔫', '🛡️', '⚡', '✨'];
    } else if (game === 'mariokart') {
      emojis = ['🏎️', '🍄', '⭐', '🍌', '🏁', '✨'];
    } else {
      emojis = ['🎮', '💜', '👾', '🕹️', '💖', '✨'];
    }

    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        const particle = document.createElement('div');
        particle.className = 'gamer-celebration-particle';
        particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];

        const angle = (Math.random() * Math.PI * 2);
        const distance = 60 + Math.random() * 80;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        particle.style.left = cx + 'px';
        particle.style.top = cy + 'px';
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');

        document.body.appendChild(particle);

        setTimeout(() => particle.remove(), 1200);
      }, i * 50);
    }
  }

  // ── Section reveal animation ──
  function initSectionObserver() {
    const section = document.getElementById('gamer-section');
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add('gamer-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(section);
  }

  // ── Init everything when DOM is ready ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    initGamerParticles();
    initSlotMachine();
    initFlipCards();
    initSectionObserver();
  }
})();
