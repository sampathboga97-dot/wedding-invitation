/* ========================================================
   WEDDING INVITATION INTERACTIVE ENGINE
   ======================================================== */

// Global State
let selectedSide = 'bride';
let currentLang = 'en';

/* --- Names & Greetings Data --- */
const namesData = {
  brideParents: {
    en: `Deshaboina Venkateshwara Prabhu<span class="parent-connector">&amp;</span>Mrs. Sharadamba`,
    te: `దేశబోయిన వెంకటేశ్వర ప్రభు<span class="parent-connector">&amp;</span>శ్రీమతి శారదాంబ`
  },
  groomParents: {
    en: `Boga Ashok<span class="parent-connector">&amp;</span>Mrs. Geetha`,
    te: `బోగ అశోక్<span class="parent-connector">&amp;</span>శ్రీమతి గీత`
  },
  grandparents: {
    enPrimary: `Late Smt. Boga Narsamma &amp; Late Sri Boga Shivalingam`,
    enSecondary: `(With the eternal blessings of Nanamma &amp; Thathya)`,
    tePrimary: `స్వర్గీయ శ్రీమతి బోగ నర్సమ్మ &amp; స్వర్గీయ శ్రీ బోగ శివలింగం`,
    teSecondary: `(నానమ్మ &amp; తాతయ్య గార్ల దివ్యాశీస్సులతో)`
  },
  welcomeBanner: {
    bride: {
      enTitle: "Deshaboina Family Welcomes You",
      enSub: "With warm hearts and warm blessings 🙏",
      teTitle: "దేశబోయిన వారి కుటుంబం తరపున సాదర సుస్వాగతం",
      teSub: "వధూవరులను ఆశీర్వదించడానికి విచ్చేయండి 🙏"
    },
    groom: {
      enTitle: "Boga Family Welcomes You",
      enSub: "With warm hearts and warm blessings 🙏",
      teTitle: "బోగ వారి కుటుంబం తరపున సాదర సుస్వాగతం",
      teSub: "వధూవరులను ఆశీర్వదించడానికి విచ్చేయండి 🙏"
    }
  }
};

function getTimeGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return { en: "🌅 Good Morning", te: "🌅 శుభోదయం" };
  if (hour >= 12 && hour < 17) return { en: "☀️ Good Afternoon", te: "☀️ శుభ మధ్యాహ్నం" };
  if (hour >= 17 && hour < 21) return { en: "🌇 Good Evening", te: "🌇 శుభ సాయంత్రం" };
  return { en: "🌙 Good Night", te: "🌙 శుభరాత్రి" };
}

/* --- Side Picker & Language Handlers --- */
function selectGuestSide(side) {
  selectedSide = side;
  renderSideAndNames();
  const modal = document.getElementById('sidePickerModal');
  if (modal) modal.classList.add('closed');
  triggerHeartbeatPulse();
}

function reopenSidePicker() {
  const modal = document.getElementById('sidePickerModal');
  if (modal) modal.classList.remove('closed');
  triggerHeartbeatPulse();
}

function renderSideAndNames() {
  const bannerData = namesData.welcomeBanner[selectedSide];
  const welcomeEn = document.getElementById('familyWelcomeEn');
  const welcomeTe = document.getElementById('familyWelcomeTe');
  const gpSection = document.getElementById('groomGrandparentsSection');
  const gpNamesEn = document.getElementById('grandparentsNamesEn');
  const gpNamesTe = document.getElementById('grandparentsNamesTe');
  const brideParentsEl = document.getElementById('brideParentsText');
  const groomParentsEl = document.getElementById('groomParentsText');
  const coupleTitle = document.getElementById('coupleTitle');
  const greetingPill = document.getElementById('timeGreetingPill');
  const topDownloadLbl = document.getElementById('topDownloadLbl');
  const pelliKTitle = document.getElementById('pelliKTitle');

  const greeting = getTimeGreeting();
  if (greetingPill) greetingPill.innerText = currentLang === 'te' ? greeting.te : greeting.en;
  if (topDownloadLbl) topDownloadLbl.innerText = currentLang === 'te' ? 'వివాహ ఆహ్వాన పత్రిక డౌన్‌లోడ్' : 'Download Card';

  if (pelliKTitle) {
    pelliKTitle.innerText = selectedSide === 'bride' 
      ? (currentLang === 'te' ? 'పెళ్లి కూతురు వేడుక' : 'Pelli Koothuru Ceremony')
      : (currentLang === 'te' ? 'పెళ్లి కొడుకు వేడుక' : 'Pelli Koduku Ceremony');
  }

  if (coupleTitle) {
    if (currentLang === 'te') {
      coupleTitle.innerHTML = coupleTitle.getAttribute('data-te');
      coupleTitle.classList.add('telugu-font');
    } else {
      coupleTitle.innerHTML = coupleTitle.getAttribute('data-en');
      coupleTitle.classList.remove('telugu-font');
    }
  }

  if (brideParentsEl) brideParentsEl.innerHTML = namesData.brideParents[currentLang];
  if (groomParentsEl) groomParentsEl.innerHTML = namesData.groomParents[currentLang];

  if (welcomeEn) welcomeEn.innerText = currentLang === 'te' ? bannerData.teTitle : bannerData.enTitle;
  if (welcomeTe) welcomeTe.innerText = currentLang === 'te' ? bannerData.teSub : bannerData.enSub;

  if (gpSection) {
    if (selectedSide === 'bride') {
      gpSection.style.display = 'none';
    } else {
      gpSection.style.display = 'block';
      if (gpNamesEn) gpNamesEn.innerHTML = currentLang === 'te' ? namesData.grandparents.tePrimary : namesData.grandparents.enPrimary;
      if (gpNamesTe) gpNamesTe.innerHTML = currentLang === 'te' ? namesData.grandparents.teSecondary : namesData.grandparents.enSecondary;
    }
  }
}

function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'te' : 'en';
  document.querySelectorAll('[data-en]').forEach(el => {
    if (el.id !== 'coupleTitle') el.innerHTML = el.getAttribute(`data-${currentLang}`);
  });
  const nameInp = document.getElementById('guestName');
  const msgInp = document.getElementById('guestMessage');
  if (nameInp) nameInp.placeholder = currentLang === 'en' ? 'Your Name (e.g., Ramesh Uncle)' : 'మీ పేరు (ఉదా: రమేష్ బాబాయ్)';
  if (msgInp) msgInp.placeholder = currentLang === 'en' ? 'Your blessing / wish...' : 'మీ ఆశీస్సులు / శుభాకాంక్షలు...';
  renderSideAndNames();
  updateWeddingCountdown();
}

/* --- Image Fallback Handler --- */
const extList = ['.jpeg', '.jpg', '.png', '.jfif'];
function handleImgError(img, baseName) {
  let attempt = parseInt(img.getAttribute('data-att') || '0');
  if (attempt < extList.length) {
    img.setAttribute('data-att', attempt + 1);
    img.src = baseName + extList[attempt];
  }
}

/* --- Audio Controls --- */
const audio = document.getElementById('weddingAudio');
const audioIcon = document.getElementById('audioPillIcon');
let isPlaying = false;
let isTransitioning = false;
let audioCtx = null;
let musicSource = null;
let musicGain = null;

function setupWebAudioMusic() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!audioCtx) audioCtx = new AudioContext();
    if (!musicSource && audio) {
      musicSource = audioCtx.createMediaElementSource(audio);
      musicGain = audioCtx.createGain();
      musicGain.gain.setValueAtTime(0.85, audioCtx.currentTime);
      musicSource.connect(musicGain);
      musicGain.connect(audioCtx.destination);
    }
  } catch (e) {
    console.log("Audio setup:", e);
  }
}

function triggerHeartbeatPulse() {
  if (navigator.vibrate) navigator.vibrate([60, 40, 80]);
}

function handleHandConnect() {
  if (isTransitioning) return;
  isTransitioning = true;

  const screen = document.getElementById('handsScreen');
  const pulse = document.getElementById('touchPulse');
  const prompt = document.getElementById('tapPrompt');

  if (pulse) pulse.style.display = 'none';
  if (prompt) prompt.style.display = 'none';

  triggerHeartbeatPulse();
  if (screen) screen.classList.add('connecting');

  if (audio) {
    setupWebAudioMusic();
    audio.play().then(() => {
      isPlaying = true;
      if (audioIcon) audioIcon.innerText = '🔊';
    }).catch(() => {});
  }

  setTimeout(() => {
    if (screen) {
      screen.classList.add('dismissed');
      screen.style.display = 'none';
    }
    showerAkshintalu();
  }, 1500);
}

function toggleAudio() {
  if (!audio) return;
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    if (audioIcon) audioIcon.innerText = '🔇';
  } else {
    setupWebAudioMusic();
    audio.play().then(() => {
      isPlaying = true;
      if (audioIcon) audioIcon.innerText = '🔊';
    }).catch(() => {});
  }
}

/* --- Scratch Card --- */
function initScratchCard() {
  const canvas = document.getElementById('scratchCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;

  const goldGrad = ctx.createLinearGradient(0, 0, W, H);
  goldGrad.addColorStop(0, '#E6CA65');
  goldGrad.addColorStop(0.3, '#FFF3A8');
  goldGrad.addColorStop(0.6, '#C4982E');
  goldGrad.addColorStop(1, '#9C7227');
  ctx.fillStyle = goldGrad;
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  for (let i = 0; i < 150; i++) {
    ctx.fillRect(Math.random() * W, Math.random() * H, 2, 2);
  }

  ctx.font = 'bold 15px "Cinzel", serif';
  ctx.fillStyle = '#4D3205';
  ctx.textAlign = 'center';
  ctx.fillText('✨ SCRATCH HERE WITH FINGER ✨', W / 2, H / 2 + 5);

  let isDrawing = false;
  function scratch(e) {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fill();

    if (navigator.vibrate) navigator.vibrate(15);
  }

  canvas.addEventListener('mousedown', () => isDrawing = true);
  canvas.addEventListener('mouseup', () => isDrawing = false);
  canvas.addEventListener('mousemove', scratch);
  canvas.addEventListener('touchstart', (e) => { isDrawing = true; scratch(e); });
  canvas.addEventListener('touchend', () => isDrawing = false);
  canvas.addEventListener('touchmove', scratch);
}

/* --- Sacred Diya Lighting --- */
let isDiyaLit = false;
function lightTheDiya() {
  if (isDiyaLit) return;
  isDiyaLit = true;

  const diya = document.getElementById('diyaBox');
  const status = document.getElementById('diyaStatus');

  if (diya) diya.classList.add('lit');
  if (status) {
    status.innerText = currentLang === 'en' 
      ? "✨ The Sacred Diya is Lit! Divine Blessings Showered 🙏" 
      : "✨ మంగళ దీపం వెలిగించబడింది! దైవ ఆశీస్సులు 🙏";
    status.style.color = "#A37C32";
  }

  triggerHeartbeatPulse();
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#FFD700', '#FF9F1C', '#FFF275', '#E71D36']
    });
  }
}

// Track whether the romantic violin song has already been triggered
let isViolinPlaying = false;

function flipStoryCard(card) {
  if (!card) return;
  
  // Flip or unflip the clicked card
  card.classList.toggle('flipped');

  // Exact file name as uploaded in your repo (handles URL spaces/encoding cleanly)
  const violinTrackName = "Violin sog From Iddarammayilatho telugu-song.mp3";

  // Check if audio element exists and we haven't already switched to this track
  if (audio && !isViolinPlaying) {
    isViolinPlaying = true;
    
    // Smooth transition: stop current Divine Nadaswaram
    audio.pause();
    
    // Switch source to the romantic violin song
    audio.src = encodeURI(violinTrackName);
    audio.currentTime = 0;
    
    // Play the new violin track
    audio.play().then(() => {
      isPlaying = true;
      if (audioIcon) audioIcon.innerText = '🔊';
    }).catch(err => {
      console.log("Audio switch error:", err);
    });

    // Update active state in the music selector modal if open
    document.querySelectorAll('.track-option').forEach(t => t.classList.remove('active-track'));
  }
}

function showerTalambralu() {
  triggerHeartbeatPulse();
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 75,
      spread: 85,
      angle: 90,
      origin: { y: 0.65 },
      colors: ['#FFD700', '#FFEA00', '#FFFDD0', '#E5B80B']
    });
  }
}

/* --- Countdown Timer --- */
const weddingDate = new Date('2026-11-26T09:15:00+05:30').getTime();

function updateWeddingCountdown() {
  const now = new Date();
  const diff = weddingDate - now.getTime();
  const countdownRow = document.getElementById('countdownMedalsRow');

  if (diff <= 0) {
    if (countdownRow) countdownRow.style.display = 'none';
    return;
  }

  const dEl = document.getElementById('days');
  const hEl = document.getElementById('hours');
  const mEl = document.getElementById('mins');
  const sEl = document.getElementById('secs');

  if (dEl) dEl.innerText = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
  if (hEl) hEl.innerText = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
  if (mEl) mEl.innerText = String(Math.floor((diff % (1000 * 60)) / (1000 * 60))).padStart(2, '0');
  if (sEl) sEl.innerText = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');
}

/* --- Firebase Blessings Counter & Wall --- */
const FIREBASE_ENDPOINT = "https://wedding-wishes-3fdbe-default-rtdb.firebaseio.com/wishes.json";
const FIREBASE_COUNTER_URL = "https://wedding-wishes-3fdbe-default-rtdb.firebaseio.com/counter.json";
let totalBlessings = 356;

async function loadCloudCounter() {
  try {
    const res = await fetch(FIREBASE_COUNTER_URL);
    const data = await res.json();
    if (data && typeof data.count === 'number') totalBlessings = data.count;
  } catch (err) {}
  const counterEl = document.getElementById('blessingCount');
  if (counterEl) counterEl.innerText = totalBlessings;
}

async function showerAkshintalu() {
  totalBlessings++;
  const counterEl = document.getElementById('blessingCount');
  if (counterEl) counterEl.innerText = totalBlessings;

  if (typeof confetti === 'function') {
    confetti({ particleCount: 70, spread: 70, origin: { x: 0.5, y: 0.2 }, colors: ['#FFD700', '#FFA000', '#D2143A', '#FFB7B2', '#FFFFFF'] });
  }
  try {
    await fetch(FIREBASE_COUNTER_URL, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ count: totalBlessings }) });
  } catch (err) {}
}

async function loadCloudWishes() {
  const box = document.getElementById('wishesBox');
  if (!box) return;
  try {
    const response = await fetch(FIREBASE_ENDPOINT);
    const data = await response.json();
    box.innerHTML = '';
    if (data) {
      const wishes = Object.values(data).reverse();
      wishes.forEach(item => {
        const card = document.createElement('div');
        card.className = 'wish-item';
        const photoHtml = item.photo ? `<img src="${item.photo}" class="wish-user-avatar" alt="Selfie">` : '';
        const audioHtml = item.audio ? `<audio controls src="${item.audio}" class="wish-audio-bar"></audio>` : '';
        card.innerHTML = `
          <div class="wish-flex-body">
            ${photoHtml}
            <div style="flex:1;">
              <div class="wish-text">"${escapeHtml(item.wish || 'Heartfelt Wedding Blessings! 💐')}"</div>
              <div class="wish-author">— ${escapeHtml(item.name || 'Well Wisher')}</div>
              ${audioHtml}
            </div>
          </div>
        `;
        box.appendChild(card);
      });
    }
  } catch (err) {
    box.innerHTML = '<div style="text-align:center; padding:12px; color:#8C7355;">Warm Blessings to the lovely couple! 💐</div>';
  }
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, function(m) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
  });
}

/* --- Photo Booth & Voice Record Stubs --- */
let streamObj = null;
let capturedSelfieBase64 = null;

async function togglePhotoBooth() {
  const boothArea = document.getElementById('boothArea');
  if (!boothArea) return;
  if (boothArea.style.display === 'block') { closePhotoBooth(); return; }
  try {
    streamObj = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user", width: { ideal: 400 }, height: { ideal: 400 } },
      audio: false
    });
    const video = document.getElementById('boothVideo');
    if (video) { video.srcObject = streamObj; boothArea.style.display = 'block'; }
  } catch (err) {
    alert("Camera permission is required to snap a selfie frame! 📸");
  }
}

function closePhotoBooth() {
  if (streamObj) {
    streamObj.getTracks().forEach(t => t.stop());
    streamObj = null;
  }
  const boothArea = document.getElementById('boothArea');
  if (boothArea) boothArea.style.display = 'none';
}

function snapSelfie() {
  const video = document.getElementById('boothVideo');
  const canvas = document.getElementById('boothCanvas');
  if (!video || !canvas) return;
  const ctx = canvas.getContext('2d');

  ctx.save();
  ctx.translate(400, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(video, 0, 0, 400, 400);
  ctx.restore();

  capturedSelfieBase64 = canvas.toDataURL('image/jpeg', 0.6);
  const thumb = document.getElementById('selfieThumb');
  if (thumb) thumb.src = capturedSelfieBase64;
  const preview = document.getElementById('capturedPhotoPreview');
  if (preview) preview.style.display = 'flex';
  closePhotoBooth();
}

function clearSelfie() {
  capturedSelfieBase64 = null;
  const preview = document.getElementById('capturedPhotoPreview');
  if (preview) preview.style.display = 'none';
}

let mediaRecorder = null;
let audioChunks = [];
let capturedAudioBase64 = null;

async function handleVoiceRecord() {
  const statusArea = document.getElementById('voiceStatusArea');
  const timerLbl = document.getElementById('recordingTimer');
  const audioPreview = document.getElementById('recordedAudioPreview');
  const clearLink = document.getElementById('clearVoiceLink');
  const recBtn = document.getElementById('recordVoiceBtn');

  if (mediaRecorder && mediaRecorder.state === "recording") {
    mediaRecorder.stop();
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioChunks = [];
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = e => { if (e.data.size > 0) audioChunks.push(e.data); };
    mediaRecorder.onstop = () => {
      stream.getTracks().forEach(t => t.stop());
      const blob = new Blob(audioChunks, { type: 'audio/webm' });
      const reader = new FileReader();
      reader.onloadend = () => {
        capturedAudioBase64 = reader.result;
        if (audioPreview) { audioPreview.src = capturedAudioBase64; audioPreview.style.display = 'block'; }
        if (clearLink) clearLink.style.display = 'block';
        if (timerLbl) { timerLbl.innerText = "✅ Voice Blessing Ready!"; timerLbl.style.color = "#2E7D32"; }
        if (recBtn) recBtn.innerText = "🎙️ Re-record (10s)";
      };
      reader.readAsDataURL(blob);
    };

    mediaRecorder.start();
    if (statusArea) statusArea.style.display = 'block';
    if (audioPreview) audioPreview.style.display = 'none';
    if (clearLink) clearLink.style.display = 'none';
    if (recBtn) recBtn.innerText = "⏹️ Stop Recording";
    if (timerLbl) { timerLbl.innerText = "🔴 Recording... (Tap Stop or Send)"; timerLbl.style.color = "#851329"; }
  } catch (err) {
    alert("Microphone permission is required to leave a voice blessing! 🎙️");
  }
}

function clearVoiceNote() {
  capturedAudioBase64 = null;
  const statusArea = document.getElementById('voiceStatusArea');
  if (statusArea) statusArea.style.display = 'none';
  const recBtn = document.getElementById('recordVoiceBtn');
  if (recBtn) recBtn.innerText = "🎙️ Voice Note (10s)";
}

async function submitWish() {
  const postBtn = document.getElementById('postWishBtn');
  const nameInput = document.getElementById('guestName');
  const msgInput = document.getElementById('guestMessage');

  const name = (nameInput && nameInput.value.trim()) || "Well Wisher";
  const wish = msgInput ? msgInput.value.trim() : "";

  if (!wish && !capturedSelfieBase64 && !capturedAudioBase64) {
    alert(currentLang === 'en' ? "Please leave a blessing message, photo, or voice note! 💛" : "దయచేసి ఒక సందేశం, ఫోటో లేదా వాయిస్ నోట్ జతచేయండి! 💛");
    return;
  }

  if (postBtn) { postBtn.innerText = "Saving..."; postBtn.disabled = true; }

  try {
    await fetch(FIREBASE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        wish: wish || (capturedAudioBase64 ? "🎵 Voice Blessing" : "📸 Wedding Photo Blessing"),
        photo: capturedSelfieBase64 || null,
        audio: capturedAudioBase64 || null,
        timestamp: Date.now()
      })
    });

    if (nameInput) nameInput.value = '';
    if (msgInput) msgInput.value = '';
    clearSelfie();
    clearVoiceNote();
    await loadCloudWishes();
    showerAkshintalu();
  } catch (err) {
    alert("Could not connect. Please check your internet connection.");
  } finally {
    if (postBtn) { postBtn.innerText = "✨ Send Blessing"; postBtn.disabled = false; }
  }
}

/* --- ICS Calendar Reminders --- */
function downloadIcsFile(type) {
  let title = "Wedding Ceremony of Sarika & Sampath";
  let location = "VIP Gardens, Suraram Village Rd, Hyderabad, Telangana 500055";
  let start = "20261126T034500Z";
  let end = "20261126T083000Z";
  let desc = "Auspicious wedding ceremony of Sarika & Sampath #SamRika";

  if (type === 'reception') {
    title = "Wedding Reception of Sarika & Sampath";
    location = "Thumma Gardens, Singarajpalle, Jangaon - Suryapet Rd, Telangana 506303";
    start = "20261127T133000Z";
    end = "20261127T173000Z";
    desc = "Grand Wedding Reception of Sarika & Sampath #SamRika";
  }

  const icsData = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//SamRika Wedding//EN",
    "BEGIN:VEVENT",
    `SUMMARY:${title}`,
    `DESCRIPTION:${desc}`,
    `LOCATION:${location}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT2H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Reminder",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = `${type}_Sarika_Sampath.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function toggleAccordion(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = (el.style.display === 'block') ? 'none' : 'block';
}

/* --- WhatsApp Share --- */
function shareViaWhatsApp() {
  const url = window.location.href;
  const msg = encodeURIComponent(
    `Namaste! You are cordially invited to celebrate our auspicious wedding ceremony.\nSarika & Sampath ❤️\n\n` +
    `🗓️ Muhurtham: Thursday, 26 Nov 2026, 9:15 AM at VIP Gardens, Hyderabad\n` +
    `🎉 Reception: Friday, 27 Nov 2026, 7:00 PM at Thumma Gardens, Singarajpalle (Jangaon)\n\n` +
    `View our wedding invitation: ${url}`
  );
  window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
}

/* --- Couple Quiz --- */
function checkQuizAnswer(btn, isCorrect) {
  const parent = btn.parentElement;
  const btns = parent.querySelectorAll('.quiz-opt-btn');
  btns.forEach(b => b.disabled = true);

  if (isCorrect) {
    btn.classList.add('correct');
    triggerHeartbeatPulse();
    if (typeof confetti === 'function') {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    }
  } else {
    btn.classList.add('wrong');
  }
}

/* --- RSVP --- */
const RSVP_ENDPOINT = "https://wedding-wishes-3fdbe-default-rtdb.firebaseio.com/rsvps.json";

async function submitRsvp() {
  const nameInput = document.getElementById('rsvpName');
  const attSelect = document.getElementById('rsvpAttendance');
  const countSelect = document.getElementById('rsvpGuestsCount');
  const btn = document.getElementById('rsvpSubmitBtn');
  const successMsg = document.getElementById('rsvpSuccessMsg');

  const name = nameInput ? nameInput.value.trim() : "";
  if (!name) {
    alert("Please enter your name for the RSVP.");
    return;
  }

  if (btn) { btn.disabled = true; btn.innerText = "Submitting..."; }

  try {
    await fetch(RSVP_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        attendance: attSelect ? attSelect.value : "",
        guestsCount: countSelect ? countSelect.value : "",
        timestamp: Date.now()
      })
    });

    if (nameInput) nameInput.value = '';
    if (successMsg) successMsg.style.display = 'block';
    triggerHeartbeatPulse();
  } catch (e) {
    alert("RSVP submitted. Thank you!");
  } finally {
    if (btn) { btn.disabled = false; btn.innerText = "Confirm RSVP"; }
  }
}

/* --- Music Playlist Modal --- */
function openPlaylistModal() {
  const modal = document.getElementById('playlistModal');
  if (modal) modal.classList.remove('closed');
}
function closePlaylistModal() {
  const modal = document.getElementById('playlistModal');
  if (modal) modal.classList.add('closed');
}
function switchAudioTrack(trackFile, el) {
  if (!audio) return;
  audio.src = trackFile;
  audio.play().then(() => {
    isPlaying = true;
    if (audioIcon) audioIcon.innerText = '🔊';
  }).catch(() => {});
  
  document.querySelectorAll('.track-option').forEach(t => t.classList.remove('active-track'));
  if (el) el.classList.add('active-track');
}

// Secret Admin PIN Protection
function openAdminModal() {
  const enteredPin = prompt("🔒 Enter Admin Security PIN:");
  
  if (enteredPin === "3010") {
    const m = document.getElementById('adminModal');
    if (m) m.classList.remove('closed');
  } else if (enteredPin !== null) {
    alert("❌ Incorrect PIN. Access denied.");
  }
}
function closeAdminModal() {
  const m = document.getElementById('adminModal');
  if (m) m.classList.add('closed');
}

function generatePersonalizedAdminLink() {
  const nameEl = document.getElementById('adminGuestName');
  const sideEl = document.getElementById('adminSideSelect');
  const name = nameEl ? nameEl.value.trim() : "";
  const side = sideEl ? sideEl.value : "groom";

  if (!name) {
    alert("Please enter the guest's name (e.g. Kishore Mama)");
    return;
  }
  const cleanBase = window.location.origin + window.location.pathname;
  const finalUrl = `${cleanBase}?guest=${encodeURIComponent(name)}&side=${side}`;

  const outContainer = document.getElementById('adminOutputContainer');
  const resInput = document.getElementById('adminResultInput');
  if (resInput) resInput.value = finalUrl;
  if (outContainer) outContainer.style.display = 'block';
}

function copyAdminLink() {
  const resInput = document.getElementById('adminResultInput');
  const nameEl = document.getElementById('adminGuestName');
  const name = (nameEl && nameEl.value.trim()) || 'Guest';
  const url = resInput ? resInput.value : window.location.href;

  const fullInviteMessage = 
`Namaste ${name}! You are cordially invited to celebrate our auspicious wedding ceremony.
Sarika & Sampath ❤️

🗓️ Muhurtham: Thursday, 26 Nov 2026, 9:15 AM at VIP Gardens, Hyderabad
🎉 Reception: Friday, 27 Nov 2026, 7:00 PM at Thumma Gardens, Singarajpalle (Jangaon)

View your personalized invitation: ${url}`;

  // Robust clipboard copy with fallback support
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(fullInviteMessage).then(() => {
      alert(`Personalized invitation for ${name} copied to clipboard! 📋`);
    }).catch(() => {
      fallbackCopyText(fullInviteMessage);
    });
  } else {
    fallbackCopyText(fullInviteMessage);
  }
}

function fallbackCopyText(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    alert("Personalized invitation message copied! 📋");
  } catch (err) {
    prompt("Copy the invitation text manually:", text);
  }
  document.body.removeChild(textArea);
}

function shareAdminLinkOnWhatsApp() {
  const resInput = document.getElementById('adminResultInput');
  const nameEl = document.getElementById('adminGuestName');
  const name = (nameEl && nameEl.value.trim()) || 'Guest';
  const url = resInput ? resInput.value : window.location.href;
  const msg = encodeURIComponent(
    `Namaste ${name}! You are cordially invited to celebrate our auspicious wedding ceremony.\nSarika & Sampath ❤️\n\n` +
    `🗓️ Muhurtham: Thursday, 26 Nov 2026, 9:15 AM at VIP Gardens, Hyderabad\n` +
    `🎉 Reception: Friday, 27 Nov 2026, 7:00 PM at Thumma Gardens, Singarajpalle (Jangaon)\n\n` +
    `View your personalized invitation: ${url}`
  );
  window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
}

/* --- URL Query Parameters Reader (?guest=Kishore+Mama&side=groom) --- */
function applyPersonalizedUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const guestName = params.get('guest');
  const sideParam = params.get('side');

  if (sideParam && (sideParam === 'bride' || sideParam === 'groom')) {
    selectedSide = sideParam;
    const modal = document.getElementById('sidePickerModal');
    if (modal) modal.classList.add('closed');
    const sideSelect = document.getElementById('adminSideSelect');
    if (sideSelect) sideSelect.value = sideParam;
  }

  if (guestName) {
    const badge = document.getElementById('personalizedGuestBadge');
    if (badge) {
      badge.innerText = `Namaste ${guestName}! Warmly Welcome 🙏`;
      badge.style.display = 'inline-block';
    }

    // Pre-fill the admin generator input
    const adminInput = document.getElementById('adminGuestName');
    if (adminInput) adminInput.value = guestName;
  }
}

/* --- Complete Official Invitation Card Generator --- */
function generateAndDownloadInvitationCard() {
  const canvas = document.getElementById('officialInviteCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = 900;
  const H = 1680;
  canvas.width = W;
  canvas.height = H;
  const isTe = (currentLang === 'te');

  // Background
  const bgGrad = ctx.createRadialGradient(W / 2, H / 2, 80, W / 2, H / 2, 950);
  bgGrad.addColorStop(0, '#FFFDF9');
  bgGrad.addColorStop(0.65, '#FDF6E9');
  bgGrad.addColorStop(1, '#F7E7CD');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // Outer Border & Dual Gold Framing
  ctx.lineWidth = 14;
  ctx.strokeStyle = '#851329';
  ctx.strokeRect(26, 26, W - 52, H - 52);

  ctx.lineWidth = 2.5;
  ctx.strokeStyle = '#C59A3F';
  ctx.strokeRect(44, 44, W - 88, H - 88);

  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgba(197, 154, 63, 0.45)';
  ctx.strokeRect(52, 52, W - 104, H - 104);

  // Header Shloka
  ctx.textAlign = 'center';
  ctx.font = 'bold 24px "Noto Sans Telugu", sans-serif';
  ctx.fillStyle = '#851329';
  ctx.fillText('||  శ్రీరస్తు - శుభమస్తు - అవిఘ్నమస్తు  ||', W / 2, 115);

  ctx.font = 'bold 20px "Cinzel", serif';
  ctx.fillStyle = '#8E6A26';
  ctx.fillText(isTe ? 'వివాహ మహోత్సవ ఆహ్వాన పత్రిక' : 'WEDDING INVITATION', W / 2, 155);

  ctx.font = '32px sans-serif';
  ctx.fillText('🏺', W / 2, 205);

  // Couple Names
  if (isTe) {
    ctx.font = 'bold 74px "Suranna", "Noto Sans Telugu", serif';
    ctx.fillStyle = '#851329';
    ctx.fillText('సారిక & సంపత్', W / 2, 305);
  } else {
    ctx.font = 'bold 84px "Great Vibes", cursive, serif';
    ctx.fillStyle = '#851329';
    ctx.fillText('Sarika & Sampath', W / 2, 305);
  }

  ctx.font = 'bold 22px "Cinzel", serif';
  ctx.fillStyle = '#8E6A26';
  ctx.fillText('#SamRika', W / 2, 360);

  // Invite Lead Text
  ctx.font = 'italic 22px "Playfair Display", serif';
  ctx.fillStyle = '#5A4632';
  ctx.fillText(
    isTe ? 'మా వివాహ మహోత్సవానికి మిమ్మల్ని సాదరంగా ఆహ్వానిస్తున్నాము' : 'Cordially invite you to celebrate our auspicious wedding',
    W / 2, 
    410
  );

  // Divider Line
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(180, 440);
  ctx.lineTo(720, 440);
  ctx.stroke();

  // Grandparents (If Groom Side Selected)
  let curY = 490;
  if (selectedSide === 'groom') {
    ctx.font = 'bold 16px "Cinzel", serif';
    ctx.fillStyle = '#851329';
    ctx.fillText(isTe ? 'దివ్య ఆశీస్సులతో' : 'WITH THE ETERNAL BLESSINGS OF GRANDPARENTS', W / 2, curY);
    curY += 30;
    ctx.font = 'bold 21px "Playfair Display", serif';
    ctx.fillStyle = '#2F2620';
    ctx.fillText('Late Smt. Boga Narsamma & Late Sri Boga Shivalingam', W / 2, curY);
    curY += 45;
  }

  // Parents Section
  ctx.font = 'bold 18px "Cinzel", serif';
  ctx.fillStyle = '#8E6A26';
  ctx.fillText(isTe ? 'పెద్దల ఆశీస్సులతో' : 'WITH THE BLESSINGS OF OUR PARENTS', W / 2, curY);
  curY += 40;

  // Bride's Parents Box
  ctx.fillStyle = 'rgba(254, 236, 231, 0.7)';
  ctx.strokeStyle = '#E5907E';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(140, curY, W - 280, 85, 14);
  ctx.fill();
  ctx.stroke();

  ctx.font = 'bold 15px "Cinzel", serif';
  ctx.fillStyle = '#851329';
  ctx.fillText(isTe ? "వధువు తల్లిదండ్రులు" : "BRIDE'S PARENTS", W / 2, curY + 28);
  ctx.font = 'bold 20px "Playfair Display", serif';
  ctx.fillStyle = '#2F2620';
  ctx.fillText('Deshaboina Venkateshwara Prabhu & Mrs. Sharadamba', W / 2, curY + 62);
  curY += 105;

  // Groom's Parents Box
  ctx.fillStyle = 'rgba(254, 244, 205, 0.7)';
  ctx.strokeStyle = '#C89B2B';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(140, curY, W - 280, 85, 14);
  ctx.fill();
  ctx.stroke();

  ctx.font = 'bold 15px "Cinzel", serif';
  ctx.fillStyle = '#7A570D';
  ctx.fillText(isTe ? "వరుని తల్లిదండ్రులు" : "GROOM'S PARENTS", W / 2, curY + 28);
  ctx.font = 'bold 20px "Playfair Display", serif';
  ctx.fillStyle = '#2F2620';
  ctx.fillText('Boga Ashok & Mrs. Geetha', W / 2, curY + 62);
  curY += 125;

  // MUHURTHAM SECTION
  ctx.font = 'bold 28px "Cinzel", serif';
  ctx.fillStyle = '#851329';
  ctx.fillText(isTe ? 'సుముహూర్తం' : 'MUHURTHAM', W / 2, curY);
  curY += 36;

  ctx.font = 'bold 26px "Playfair Display", serif';
  ctx.fillStyle = '#241C16';
  ctx.fillText(isTe ? 'గురువారం, 26 నవంబర్ 2026' : 'Thursday, 26 November 2026', W / 2, curY);
  curY += 40;

  ctx.font = 'bold 36px "Cinzel", serif';
  ctx.fillStyle = '#851329';
  ctx.fillText(isTe ? 'ఉదయం 9:15 గంటలకు' : '9:15 AM', W / 2, curY);
  curY += 45;

  // Kalyanam Venue Box
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.strokeStyle = '#C89B2B';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(110, curY, W - 220, 105, 16);
  ctx.fill();
  ctx.stroke();

  ctx.font = 'bold 24px "Cinzel", serif';
  ctx.fillStyle = '#851329';
  ctx.fillText('VIP Gardens, Suraram', W / 2, curY + 40);
  ctx.font = '17px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#5A4632';
  ctx.fillText('Suraram Village Rd, Lakshmi Nagar Colony, Suraram, Hyderabad', W / 2, curY + 74);
  curY += 145;

  // GRAND RECEPTION SECTION
  ctx.font = 'bold 26px "Cinzel", serif';
  ctx.fillStyle = '#7A570D';
  ctx.fillText(isTe ? 'రిసెప్షన్ వేడుక' : 'GRAND RECEPTION', W / 2, curY);
  curY += 34;

  ctx.font = 'bold 24px "Playfair Display", serif';
  ctx.fillStyle = '#241C16';
  ctx.fillText(isTe ? 'శుక్రవారం, 27 నవంబర్ 2026 - సాయంత్రం 7:00 నుండి' : 'Friday, 27 November 2026 • From 7:00 PM Onwards', W / 2, curY);
  curY += 42;

  // Reception Venue Box
  ctx.fillStyle = 'rgba(255, 253, 245, 0.9)';
  ctx.strokeStyle = '#8E6A26';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(110, curY, W - 220, 95, 16);
  ctx.fill();
  ctx.stroke();

  ctx.font = 'bold 23px "Cinzel", serif';
  ctx.fillStyle = '#7A570D';
  ctx.fillText('Thumma Gardens, Singarajpalle', W / 2, curY + 38);
  ctx.font = '17px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#5A4632';
  ctx.fillText('Jangaon - Suryapet Road, Singarajpalle, Telangana', W / 2, curY + 70);

  // Footer Blessing
  ctx.font = 'italic 20px "Playfair Display", serif';
  ctx.fillStyle = '#851329';
  ctx.fillText('Your gracious presence and blessings are our greatest gift ❤️', W / 2, H - 75);

  // Trigger Download
  const link = document.createElement('a');
  link.download = `Wedding_Invitation_Sarika_Sampath.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

/* --- Initialization on Load --- */
window.addEventListener('DOMContentLoaded', () => {
  initScratchCard();
  loadCloudWishes();
  loadCloudCounter();
  setInterval(updateWeddingCountdown, 1000);
  updateWeddingCountdown();
  renderSideAndNames();
  applyPersonalizedUrlParams();
});
/* ========================================================
   DYNAMIC BACKEND HOTEL FETCHER (OVERPASS / OSM API)
   ======================================================== */

// Memory cache so we don't repeat API calls
const fetchedHotelsCache = {};

async function toggleAccordionWithAutoFetch(contentId, lat, lon, locationLabel) {
  const contentEl = document.getElementById(contentId);
  if (!contentEl) return;

  const isOpen = contentEl.style.display === 'block';
  contentEl.style.display = isOpen ? 'none' : 'block';

  // If opening and not yet loaded, query backend
  if (!isOpen && !fetchedHotelsCache[contentId]) {
    await fetchNearbyHotelsBackend(contentId + 'List', lat, lon, locationLabel, contentId);
  }
}

async function fetchNearbyHotelsBackend(targetListId, lat, lon, locationLabel, cacheKey) {
  const container = document.getElementById(targetListId);
  if (!container) return;

  // Overpass QL query: Search for tourism=hotel, guest_house, lodge within 6000m radius
  const query = `[out:json][timeout:15];(nwr["tourism"~"hotel|guest_house|motel|chalet|apartment"](around:6000,${lat},${lon});nwr["amenity"="hotel"](around:6000,${lat},${lon}););out center 8;`;
  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data && data.elements && data.elements.length > 0) {
      // Filter unique valid names
      const seen = new Set();
      const hotels = [];

      for (const el of data.elements) {
        const name = (el.tags && (el.tags.name || el.tags['name:en'])) || null;
        if (name && !seen.has(name.toLowerCase())) {
          seen.add(name.toLowerCase());
          const hLat = el.lat || (el.center && el.center.lat) || lat;
          const hLon = el.lon || (el.center && el.center.lon) || lon;
          hotels.push({ name, lat: hLat, lon: hLon });
        }
      }

      if (hotels.length > 0) {
        container.innerHTML = hotels.slice(0, 5).map(h => `
          <div class="stay-item">
            <div class="stay-name">${escapeHtml(h.name)}</div>
            <div class="stay-meta">Near ${locationLabel} • Live Location</div>
            <a class="stay-map-link" target="_blank" href="https://maps.google.com/?q=${encodeURIComponent(h.name + ' ' + locationLabel)}&ll=${h.lat},${h.lon}">
              📍 View on Google Maps
            </a>
          </div>
        `).join('');
        fetchedHotelsCache[cacheKey] = true;
        return;
      }
    }

    // Graceful fallback if no mapped hotel node in remote radius
    fallbackDefaultHotels(container, locationLabel);
    fetchedHotelsCache[cacheKey] = true;

  } catch (err) {
    fallbackDefaultHotels(container, locationLabel);
    fetchedHotelsCache[cacheKey] = true;
  }
}

function fallbackDefaultHotels(container, locationLabel) {
  if (locationLabel === 'Suraram') {
    container.innerHTML = `
      <div class="stay-item">
        <div class="stay-name">Hotel Tulips Grand</div>
        <div class="stay-meta">Suraram Village Road • 0.8 km away</div>
        <a class="stay-map-link" target="_blank" href="https://maps.google.com/?q=Hotel+Tulips+Grand+Suraram+Hyderabad">📍 View on Google Maps</a>
      </div>
      <div class="stay-item">
        <div class="stay-name">Super Hotel O Suraram</div>
        <div class="stay-meta">Near Suraram Main Rd • 1.5 km away</div>
        <a class="stay-map-link" target="_blank" href="https://maps.google.com/?q=Hotels+near+Suraram+Hyderabad">📍 View on Google Maps</a>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="stay-item">
        <div class="stay-name">SV AC Deluxe Lodge</div>
        <div class="stay-meta">Hyderabad Road, Jangaon</div>
        <a class="stay-map-link" target="_blank" href="https://maps.google.com/?q=SV+AC+Deluxe+Lodge+Jangaon">📍 View on Google Maps</a>
      </div>
      <div class="stay-item">
        <div class="stay-name">Prasad Lodge</div>
        <div class="stay-meta">Near Station Road, Jangaon</div>
        <a class="stay-map-link" target="_blank" href="https://maps.google.com/?q=Prasad+Lodge+Jangaon">📍 View on Google Maps</a>
      </div>
    `;
  }
}
