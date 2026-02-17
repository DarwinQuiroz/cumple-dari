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
document.querySelectorAll(".photo-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform =
      "translateY(-10px) rotate(" + (Math.random() * 6 - 3) + "deg)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "";
  });
});

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
