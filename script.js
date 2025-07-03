const messages = [
   "Mỗi lần cậu mệt mỏi, hãy nhớ rằng ở đâu đó có một người luôn âm thầm cổ vũ cậu nè 💌💕",
  "Thi cử chỉ là chuyện nhỏ xíu thôi, vì tớ tin trái tim ấm áp của một bác sĩ tương lai sẽ vượt qua tất cả 🩺🌟",
  "Tớ luôn ngưỡng mộ sự cố gắng của cậu… nên cậu nhất định sẽ làm được, vì cậu là ánh sáng trong lòng tớ và  là người tớ luôn ngưỡng mộ 🥺✨💖",
  "‘Dr. tương lai’, Cậu đã nỗ lực rất nhiều rồi, giờ chỉ cần tự tin bước tiếp thôi nha ✨👩‍⚕️💖",
  "Trong mắt tớ, cậu luôn giỏi giang và đặc biệt nhất… nên đừng lo gì cả, thi tốt nha 🌸💫",
];
const finalMessage = "Hết lời chúc rồi nè 😳 Nhưng tớ vẫn luôn mong cậu mỗi ngày đều vui vẻ, thi tốt và thật hạnh phúc bên những điều cậu yêu nha 💖";

let opened = false;

// Manual play button handler
function startBackgroundMusic() {
  const bg = document.getElementById('backgroundMusic');
  if (!bg) return;
  bg.muted = false; // in case we switch to muted autoplay later
  bg.play().catch(() => {});
  const btn = document.getElementById('playMusicBtn');
  if (btn) btn.style.display = 'none';
}

// Hide button if music already allowed (e.g., user previously clicked)
window.addEventListener('DOMContentLoaded', () => {
  const bg = document.getElementById('backgroundMusic');
  const btn = document.getElementById('playMusicBtn');
  if (bg && btn && !bg.paused) {
    btn.style.display = 'none';
  }
});

// Try to auto-play background music. Some browsers block autoplay with sound,
// so we attempt to play on load and, if that fails, wait for the first user
// interaction (a click or touch) to start the music so the first track can be
// heard before switching to the second track.
(function initBackgroundMusic() {
  const bg = document.getElementById("backgroundMusic");
  if (!bg) return;

  // Helper to start the music; remove listeners once done
  function startMusic(event) {
    if (opened) return; // gift already opened
    // If the gesture is directly on the open button, skip starting bg track
    if (event && event.target.closest && event.target.closest('.open-btn')) {
      return;
    }
    bg.play().catch(() => {/* still blocked */});
    document.removeEventListener("click", startMusic);
    document.removeEventListener("touchstart", startMusic);
  }

  // Try to play immediately. If it fails (returns a rejected promise),
  // attach a one-time listener so that the next user gesture will start it.
  const playPromise = bg.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // Autoplay was prevented – wait for first gesture
      document.addEventListener("click", startMusic, { once: true });
      document.addEventListener("touchstart", startMusic, { once: true });
    });
  }
})();

function showMore() {
  if (opened) return;
  opened = true;

  // Chuyển nhạc
  const bg = document.getElementById("backgroundMusic");
  const love = document.getElementById("loveMusic");
  bg.pause();
  bg.currentTime = 0;
  love.play();

  const gift = document.getElementById("giftIcon");
  gift.classList.add("opened");

  const messageBox = document.getElementById("extraMessage");
  messageBox.innerHTML = "";
  messageBox.classList.remove("hidden");
  // Smooth scroll to lời chúc
  setTimeout(() => {
    messageBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 150);

  messages.forEach((msg, index) => {
    setTimeout(() => {
      const p = document.createElement("p");
      p.textContent = msg;
      // Auto scroll tới lời chúc vừa xuất hiện
      setTimeout(() => p.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
      messageBox.appendChild(p);
    }, index * 1500);
  });

  setTimeout(() => {
    const p = document.createElement("p");
    p.textContent = finalMessage;
    p.classList.add('final-msg');
    messageBox.appendChild(p);
    // Cuộn xuống tới cuối lời chúc
    messageBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, messages.length * 1500);

  startHeartLoop();
  startScoreLoop();
}

function launchHearts() {
  const container = document.getElementById("heart-container");
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = Math.random() * 80 + 20 + "vh";
    heart.textContent = "💖";
    container.appendChild(heart);

    setTimeout(() => heart.remove(), 2500);
  }
}

function launchScores() {
  const container = document.getElementById("score-container");
  for (let i = 0; i < 10; i++) {
    const score = document.createElement("div");
    score.className = "score";
    score.style.left = Math.random() * 100 + "vw";
    score.style.top = Math.random() * 80 + 20 + "vh";
    score.textContent = "💯";
    container.appendChild(score);

    setTimeout(() => score.remove(), 2500);
  }
}

function startHeartLoop() {
  launchHearts();
  setInterval(launchHearts, 2500); // Giảm mật độ trái tim
}

function startScoreLoop() {
  setTimeout(() => {
    launchScores();
    setInterval(launchScores, 4000); // Giảm mật độ điểm 10
  }, 1200);
}
