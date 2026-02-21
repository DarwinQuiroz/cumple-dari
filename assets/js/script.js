// Confetti Animation
function createConfetti() {
  const colors = [
    "#FFE5EC",
    "#FFF0E4",
    "#E8D5F2",
    "#D5F5E3",
    "#D5E8F5",
    "#FFF9D0",
  ];
  const confettiCount = 50;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.background =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = Math.random() * 3 + 2 + "s";
    confetti.style.animationDelay = Math.random() * 5 + "s";
    confetti.style.opacity = Math.random() * 0.5 + 0.3;
    document.body.appendChild(confetti);
  }
}

// Create sparkles on mouse move
let sparkleTimeout;
document.addEventListener("mousemove", function (e) {
  clearTimeout(sparkleTimeout);
  sparkleTimeout = setTimeout(() => {
    if (Math.random() > 0.8) {
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";
      sparkle.style.left = e.pageX + "px";
      sparkle.style.top = e.pageY + "px";
      document.body.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 1000);
    }
  }, 50);
});

// Interactive photo cards - add tilt effect
// Una imagen de capibara diferente por cada foto
const arrUrl = window.location.href.split("/");

let rutaImg = arrUrl[2].includes("localhost")
  ? "../assets/img/capybara/"
  : "../cumple-dari/assets/img/capybara/";

const capybaraImages = [
  `${rutaImg}1.png`,
  `${rutaImg}2.png`,
  `${rutaImg}3.png`,
  `${rutaImg}4.png`,
  `${rutaImg}5.png`,
  `${rutaImg}6.png`,
  `${rutaImg}7.png`,
  `${rutaImg}8.png`,
];

document.querySelectorAll(".photo-card").forEach((card, index) => {
  // Cada card tiene su imagen asignada por índice
  const cardCapybaraImage = capybaraImages[index % capybaraImages.length];

  card.addEventListener("mouseenter", function () {
    this.style.transform =
      "translateY(-10px) rotate(" + (Math.random() * 6 - 3) + "deg)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "";
  });

  card.addEventListener("click", function (e) {
    const rect = this.getBoundingClientRect();
    const capyCount = Math.floor(Math.random() * 5) + 8;

    for (let i = 0; i < capyCount; i++) {
      setTimeout(() => {
        const capy = document.createElement("img");
        capy.src = cardCapybaraImage; // 👈 imagen única de esta card

        const size = Math.random() * 40 + 30;
        const x = rect.left + Math.random() * rect.width;
        const y = rect.top + Math.random() * rect.height;

        capy.style.position = "fixed";
        capy.style.left = x + "px";
        capy.style.top = y + "px";
        capy.style.width = size + "px";
        capy.style.height = size + "px";
        capy.style.objectFit = "cover";
        capy.style.borderRadius = "50%";
        capy.style.pointerEvents = "none";
        capy.style.zIndex = "1000";
        capy.style.opacity = "1";

        const drift = (Math.random() - 0.5) * 100;
        capy.style.animation = `float-heart ${Math.random() * 2 + 2}s ease-out forwards`;
        capy.style.setProperty("--drift", drift + "px");

        document.body.appendChild(capy);

        setTimeout(() => capy.remove(), 4000);
      }, i * 80);
    }

    this.style.transform = "scale(1.05)";
    setTimeout(() => {
      this.style.transform = "";
    }, 200);
  });
});

// Add floating heart animation style
const floatHeartStyle = document.createElement("style");
floatHeartStyle.textContent = `
            @keyframes float-heart {
                0% {
                    transform: translateY(0) translateX(0) rotate(0deg) scale(1);
                    opacity: 1;
                }
                50% {
                    transform: translateY(-100px) translateX(var(--drift)) rotate(180deg) scale(1.2);
                    opacity: 0.8;
                }
                100% {
                    transform: translateY(-200px) translateX(calc(var(--drift) * 1.5)) rotate(360deg) scale(0.5);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(floatHeartStyle);

// Animate wishes on scroll
const observerOptions = {
  threshold: 0.5,
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "pulse 2s ease-in-out infinite";
    }
  });
}, observerOptions);

document.querySelectorAll(".wish-item").forEach((item) => {
  observer.observe(item);
});

// Initialize confetti
createConfetti();

// Recreate confetti every 10 seconds
setInterval(createConfetti, 10000);

// Add floating hearts animation
function createFloatingHeart() {
  const heart = document.createElement("div");
  heart.textContent = "💖";
  heart.style.position = "fixed";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.bottom = "-50px";
  heart.style.fontSize = "2rem";
  heart.style.opacity = "0.6";
  heart.style.pointerEvents = "none";
  heart.style.zIndex = "1";
  heart.style.animation = "float-up 6s ease-in forwards";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 6000);
}

// Create floating hearts periodically
setInterval(createFloatingHeart, 3000);

// Add float-up animation
const style = document.createElement("style");
style.textContent = `
            @keyframes float-up {
                to {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(style);

// Hero section animations
const heroImage = document.querySelector(".hero-image");

if (heroImage) {
  // Create magic particles on hover
  heroImage.addEventListener("mouseenter", function () {
    const particles = ["✨", "💫", "⭐", "🌟", "💝"];
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        const particle = document.createElement("div");
        particle.textContent =
          particles[Math.floor(Math.random() * particles.length)];
        const rect = heroImage.getBoundingClientRect();

        // Create particles around the circle
        const angle = Math.random() * 360 * (Math.PI / 180);
        const distance = 250; // Distance from center
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        particle.style.position = "fixed";
        particle.style.left = centerX + Math.cos(angle) * distance + "px";
        particle.style.top = centerY + Math.sin(angle) * distance + "px";
        particle.style.fontSize = "2rem";
        particle.style.pointerEvents = "none";
        particle.style.zIndex = "1000";
        particle.style.animation = "hero-particle 2s ease-out forwards";

        document.body.appendChild(particle);

        setTimeout(() => {
          particle.remove();
        }, 2000);
      }, i * 80);
    }
  });

  // Add particle animation
  const particleStyle = document.createElement("style");
  particleStyle.textContent = `
                @keyframes hero-particle {
                    0% {
                        transform: scale(0);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(2) translateY(-50px);
                        opacity: 0;
                    }
                }
            `;
  document.head.appendChild(particleStyle);
}

// Friendship section animations
const romanticSection = document.querySelector(".romantic-section");

if (romanticSection) {
  // Create butterflies and stars falling effect when section is in view
  const romanticObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          createMagicElements();
        }
      });
    },
    { threshold: 0.3 },
  );

  romanticObserver.observe(romanticSection);

  function createMagicElements() {
    const elements = ["🦋", "✨", "⭐", "🌸", "💫", "🌟", "🌺"];
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const element = document.createElement("div");
        element.textContent =
          elements[Math.floor(Math.random() * elements.length)];
        element.style.position = "fixed";
        element.style.left = Math.random() * 100 + "vw";
        element.style.top = "-50px";
        element.style.fontSize = Math.random() * 1.5 + 1 + "rem";
        element.style.opacity = "0.7";
        element.style.pointerEvents = "none";
        element.style.zIndex = "10";
        element.style.animation = `petal-fall ${Math.random() * 3 + 4}s linear forwards`;

        document.body.appendChild(element);

        setTimeout(() => {
          element.remove();
        }, 7000);
      }, i * 200);
    }
  }

  // Add petal-fall animation
  const petalStyle = document.createElement("style");
  petalStyle.textContent = `
                @keyframes petal-fall {
                    to {
                        transform: translateY(110vh) rotate(${Math.random() * 360}deg) translateX(${Math.random() * 100 - 50}px);
                        opacity: 0;
                    }
                }
            `;
  document.head.appendChild(petalStyle);

  // Friendship letter hover effect - create stars and sparkles
  const loveLetter = document.querySelector(".love-letter");
  if (loveLetter) {
    loveLetter.addEventListener("mouseenter", function () {
      const sparkleEmojis = ["✨", "⭐", "💫", "🌟"];
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          const sparkle = document.createElement("div");
          sparkle.textContent =
            sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
          const rect = loveLetter.getBoundingClientRect();
          sparkle.style.position = "fixed";
          sparkle.style.left = rect.left + Math.random() * rect.width + "px";
          sparkle.style.top = rect.bottom + "px";
          sparkle.style.fontSize = "1.5rem";
          sparkle.style.pointerEvents = "none";
          sparkle.style.zIndex = "1000";
          sparkle.style.animation = "rise-up 2s ease-out forwards";

          document.body.appendChild(sparkle);

          setTimeout(() => {
            sparkle.remove();
          }, 2000);
        }, i * 100);
      }
    });
  }

  // Add rise-up animation
  const riseStyle = document.createElement("style");
  riseStyle.textContent = `
                @keyframes rise-up {
                    to {
                        transform: translateY(-100px);
                        opacity: 0;
                    }
                }
            `;
  document.head.appendChild(riseStyle);

  // Timeline items interactive effect
  document.querySelectorAll(".timeline-item").forEach((item, index) => {
    item.addEventListener("click", function () {
      // Create sparkle effect on click with friendship emojis
      const friendshipEmojis = ["✨", "🌟", "💫", "⭐"];
      for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement("div");
        sparkle.textContent =
          friendshipEmojis[Math.floor(Math.random() * friendshipEmojis.length)];
        const rect = this.getBoundingClientRect();
        sparkle.style.position = "fixed";
        sparkle.style.left = rect.left + rect.width / 2 + "px";
        sparkle.style.top = rect.top + rect.height / 2 + "px";
        sparkle.style.fontSize = "1.5rem";
        sparkle.style.pointerEvents = "none";
        sparkle.style.zIndex = "1000";

        const angle = (i / 8) * Math.PI * 2;
        const distance = 50;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        sparkle.style.animation = `sparkle-burst 1s ease-out forwards`;
        sparkle.style.setProperty("--tx", tx + "px");
        sparkle.style.setProperty("--ty", ty + "px");

        document.body.appendChild(sparkle);

        setTimeout(() => {
          sparkle.remove();
        }, 1000);
      }
    });
  });

  // Add sparkle burst animation
  const burstStyle = document.createElement("style");
  burstStyle.textContent = `
                @keyframes sparkle-burst {
                    to {
                        transform: translate(var(--tx), var(--ty));
                        opacity: 0;
                    }
                }
            `;
  document.head.appendChild(burstStyle);
}
