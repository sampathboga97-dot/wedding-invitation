/* PRE-WEDDING SHOOT CONFIGURATION */
const PRE_WEDDING_CONFIG = {
  YOUTUBE_EMBED_URL: "",  // e.g. "https://www.youtube-nocookie.com/embed/YOUR_ID"
  LOCAL_VIDEO_FILE: ""    // e.g. "prewedding.mp4"
};

function setupPreWeddingVideo() {
  const iframe = document.getElementById('preWeddingIframe');
  const localVid = document.getElementById('preWeddingLocalVideo');
  const placeholder = document.getElementById('preWeddingPlaceholder');

  if (PRE_WEDDING_CONFIG.YOUTUBE_EMBED_URL && PRE_WEDDING_CONFIG.YOUTUBE_EMBED_URL.trim() !== "") {
    iframe.src = PRE_WEDDING_CONFIG.YOUTUBE_EMBED_URL;
    iframe.style.display = 'block';
    if (localVid) localVid.style.display = 'none';
    if (placeholder) placeholder.style.display = 'none';
  } else if (PRE_WEDDING_CONFIG.LOCAL_VIDEO_FILE && PRE_WEDDING_CONFIG.LOCAL_VIDEO_FILE.trim() !== "") {
    localVid.src = PRE_WEDDING_CONFIG.LOCAL_VIDEO_FILE;
    localVid.style.display = 'block';
    if (iframe) iframe.style.display = 'none';
    if (placeholder) placeholder.style.display = 'none';
  } else {
    if (iframe) iframe.style.display = 'none';
    if (localVid) localVid.style.display = 'none';
    if (placeholder) placeholder.style.display = 'flex';
  }
}

/* NAMES DATA REPOSITORY */
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
  if (hour >= 5 && hour < 12) {
    return { en: "🌅 Good Morning", te: "🌅 శుభోదయం" };
  } else if (hour >= 12 && hour < 17) {
    return { en: "☀️ Good Afternoon", te: "☀️ శుభ మధ్యాహ్నం" };
  } else if (hour >= 17 && hour < 21) {
    return { en: "🌇 Good Evening", te: "🌇 శుభ సాయంత్రం" };
  } else {
    return { en: "🌙 Good Night", te: "🌙 శుభరాత్రి" };
  }
}

let selectedSide = 'bride';
let currentLang = 'en';

function reopenSidePicker() {
  const modal = document.getElementById('sidePickerModal');
  if (modal) modal.classList.remove('closed');
  triggerHeartbeatPulse();
}

function generateAndDownloadInvitationCard() {
  const canvas = document.getElementById('officialInviteCanvas');
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;
  const isTe = (currentLang === 'te');

  const bgGrad = ctx.createRadialGradient(W / 2, H / 2, 100, W / 2, H / 2, 900);
  bgGrad.addColorStop(0, '#FFFDF8');
  bgGrad.addColorStop(0.7, '#FDF6E9');
  bgGrad.addColorStop(1, '#F7E7CD');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  ctx.lineWidth = 18;
  ctx.strokeStyle = '#851329';
  ctx.strokeRect(30, 30, W - 60, H - 60);

  ctx.lineWidth = 3.5;
  ctx.strokeStyle = '#C59A3F';
  ctx.strokeRect(48, 48, W - 96, H - 96);

  ctx.save();
  ctx.strokeStyle = '#DFC394';
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 8]);
  ctx.strokeRect(62, 62, W - 124, H - 124);
  ctx.restore();

  ctx.textAlign = 'center';

  ctx.font = 'bold 26px "Noto Sans Telugu", sans-serif';
  ctx.fillStyle = '#851329';
  ctx.fillText('||  శ్రీరస్తు - శుభమస్తు - అవిఘ్నమస్తు  ||', W / 2, 130);

  ctx.font = 'bold 22px "Cinzel", serif';
  ctx.fillStyle = '#8E6A26';
  ctx.fillText(isTe ? 'వివాహ మహోత్సవ ఆహ్వాన పత్రిక' : 'WEDDING INVITATION', W / 2, 175);

  ctx.font = '36px sans-serif';
  ctx.fillText('🏺', W / 2, 225);

  if (isTe) {
    ctx.font = 'bold 78px "Suranna", "Noto Sans Telugu", serif';
    ctx.fillStyle = '#851329';
    ctx.fillText('సారిక & సంపత్', W / 2, 320);
  } else {
    ctx.font = 'bold 88px "Great Vibes", cursive, serif';
    ctx.fillStyle = '#851329';
    ctx.fillText('Sarika & Sampath', W / 2, 320);
  }

  ctx.font = 'bold 24px "Cinzel", serif';
  ctx.fillStyle = '#8E6A26';
  ctx.fillText('#SamRika', W / 2, 375);

  ctx.font = isTe ? 'italic 24px "Noto Sans Telugu", sans-serif' : 'italic 24px "Playfair Display", serif';
  ctx.fillStyle = '#5A4634';
  const solicitText = isTe 
    ? 'మా వివాహ మహోత్సవానికి విచ్చేసి నూతన వధూవరులను ఆశీర్వదించగలరని ప్రార్థన'
    : 'Soliciting your gracious presence and heartfelt blessings on our auspicious marriage';
  renderWrappedLines(ctx, solicitText, W / 2, 420, W - 220, 34);

  function drawInnerCardBox(y, h) {
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.roundRect(100, y, W - 200, h, 18);
    ctx.fill();
    ctx.strokeStyle = '#E8D5B5';
    ctx.lineWidth = 1.6;
    ctx.stroke();
  }

  let startBoxY = 490;

  // BOX 1: Bride's Parents
  drawInnerCardBox(startBoxY, 130);
  ctx.font = 'bold 18px "Cinzel", "Noto Sans Telugu", sans-serif';
  ctx.fillStyle = '#851329';
  ctx.fillText(isTe ? '🌸 వధువు తల్లిదండ్రులు' : '🌸 BRIDE\'S PARENTS', W / 2, startBoxY + 38);

  ctx.font = 'bold 26px "Playfair Display", "Noto Sans Telugu", serif';
  ctx.fillStyle = '#2F2620';
  const brideParentsStr = isTe 
    ? 'దేశబోయిన వెంకటేశ్వర ప్రభు & శ్రీమతి శారదాంబ' 
    : 'Deshaboina Venkateshwara Prabhu & Mrs. Sharadamba';
  ctx.fillText(brideParentsStr, W / 2, startBoxY + 90);

  // BOX 2: Groom's Parents
  startBoxY += 150;
  drawInnerCardBox(startBoxY, 130);
  ctx.font = 'bold 18px "Cinzel", "Noto Sans Telugu", sans-serif';
  ctx.fillStyle = '#851329';
  ctx.fillText(isTe ? '🪷 వరుని తల్లిదండ్రులు' : '🪷 GROOM\'S PARENTS', W / 2, startBoxY + 38);

  ctx.font = 'bold 26px "Playfair Display", "Noto Sans Telugu", serif';
  ctx.fillStyle = '#2F2620';
  const groomParentsStr = isTe 
    ? 'బోగ అశోక్ & శ్రీమతి గీత' 
    : 'Boga Ashok & Mrs. Geetha';
  ctx.fillText(groomParentsStr, W / 2, startBoxY + 90);

  if (selectedSide === 'groom') {
    startBoxY += 150;
    drawInnerCardBox(startBoxY, 115);
    ctx.font = 'bold 16px "Cinzel", "Noto Sans Telugu", sans-serif';
    ctx.fillStyle = '#8E6A26';
    ctx.fillText(isTe ? '🕊️ దివ్య ఆశీస్సులతో (నానమ్మ & తాతయ్య)' : '🕊️ WITH THE BLESSINGS OF GRANDPARENTS', W / 2, startBoxY + 36);

    ctx.font = 'bold 22px "Playfair Display", "Noto Sans Telugu", serif';
    ctx.fillStyle = '#2F2620';
    const gpStr = isTe 
      ? 'స్వర్గీయ శ్రీమతి బోగ నర్సమ్మ & స్వర్గీయ శ్రీ బోగ శివలింగం' 
      : 'Late Smt. Boga Narsamma & Late Sri Boga Shivalingam';
    ctx.fillText(gpStr, W / 2, startBoxY + 80);
  }

  // BOX 3: Muhurtham Box
  startBoxY += 155;
  drawInnerCardBox(startBoxY, 175);
  ctx.font = 'bold 22px "Cinzel", "Noto Sans Telugu", sans-serif';
  ctx.fillStyle = '#851329';
  ctx.fillText(isTe ? '✨ సుముహూర్తం & కళ్యాణ వేదిక ✨' : '✨ SUMUHURTHAM & VENUE ✨', W / 2, startBoxY + 42);

  ctx.font = 'bold 25px "Playfair Display", "Noto Sans Telugu", serif';
  ctx.fillStyle = '#2F2620';
  ctx.fillText(isTe ? 'గురువారం, 26 నవంబర్ 2026  •  ఉదయం 9:15 గంటలకు' : 'Thursday, 26 November 2026  •  9:15 AM', W / 2, startBoxY + 84);

  ctx.font = '600 20px "Plus Jakarta Sans", "Noto Sans Telugu", sans-serif';
  ctx.fillStyle = '#5A4634';
  ctx.fillText(isTe ? 'విఐపీ గార్డెన్స్, సూరారం విలేజ్, హైదరాబాద్' : 'VIP Gardens, Suraram Village, Hyderabad', W / 2, startBoxY + 124);

  // BOX 4: Reception Box
  startBoxY += 200;
  drawInnerCardBox(startBoxY, 175);
  ctx.font = 'bold 22px "Cinzel", "Noto Sans Telugu", sans-serif';
  ctx.fillStyle = '#8E6A26';
  ctx.fillText(isTe ? '🎉 గ్రాండ్ రిసెప్షన్ వేడుక 🎉' : '🎉 GRAND RECEPTION 🎉', W / 2, startBoxY + 42);

  ctx.font = 'bold 25px "Playfair Display", "Noto Sans Telugu", serif';
  ctx.fillStyle = '#2F2620';
  ctx.fillText(isTe ? 'శుక్రవారం, 27 నవంబర్ 2026  •  సాయంత్రం 7:00 గంటల నుండి' : 'Friday, 27 November 2026  •  7:00 PM Onwards', W / 2, startBoxY + 84);

  ctx.font = '600 20px "Plus Jakarta Sans", "Noto Sans Telugu", sans-serif';
  ctx.fillStyle = '#5A4634';
  ctx.fillText(isTe ? 'తుమ్మ గార్డెన్స్, సింగరాజుపల్లి (జనగాం - సూర్యాపేట రోడ్)' : 'Thumma Gardens, Singarajpalle (Jangaon - Suryapet Rd)', W / 2, startBoxY + 124);

  ctx.font = 'italic 22px "Playfair Display", "Noto Sans Telugu", serif';
  ctx.fillStyle = '#7A6953';
  const footerBless = isTe 
    ? 'శ్రీ వేంకటేశ్వర స్వామి వారి కృపాకటాక్షాలతో సుఖసంతోషాలతో వర్ధిల్లాలని ఆకాంక్షిస్తూ... 🙏'
    : 'May Lord Venkateshwara bless our union with eternal love, harmony & prosperity 🙏';
  ctx.fillText(footerBless, W / 2, H - 95);

  ctx.font = 'bold 26px "Cinzel", "Suranna", serif';
  ctx.fillStyle = '#851329';
  ctx.fillText(isTe ? 'సారిక & సంపత్' : 'SARIKA & SAMPATH', W / 2, H - 55);

  const link = document.createElement('a');
  link.download = isTe 
    ? 'Wedding_Invitation_Telugu_Sarika_Sampath.png' 
    : 'Wedding_Invitation_English_Sarika_Sampath.png';
  link.href = canvas.toDataURL('image/png');
  link.click();

  triggerHeartbeatPulse();
  showerAkshintalu();
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
  if (greetingPill) {
    greetingPill.innerText = currentLang === 'te' ? greeting.te : greeting.en;
  }

  if (topDownloadLbl) {
    topDownloadLbl.innerText = currentLang === 'te' ? 'వివాహ ఆహ్వాన పత్రిక డౌన్‌లోడ్' : 'Wedding Invitation Download Card';
  }

  if (pelliKTitle) {
    if (selectedSide === 'bride') {
      pelliKTitle.innerText = currentLang === 'te' ? 'పెళ్లి కూతురు వేడుక' : 'Pelli Koothuru Ceremony';
    } else {
      pelliKTitle.innerText = currentLang === 'te' ? 'పెళ్లి కొడుకు వేడుక' : 'Pelli Koduku Ceremony';
    }
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

  if (selectedSide === 'bride') {
    if (gpSection) gpSection.style.display = 'none';
  } else {
    if (gpSection) {
      gpSection.style.display = 'block';
      if (gpNamesEn) gpNamesEn.innerHTML = currentLang === 'te' ? namesData.grandparents.tePrimary : namesData.grandparents.enPrimary;
      if (gpNamesTe) gpNamesTe.innerHTML = currentLang === 'te' ? namesData.grandparents.teSecondary : namesData.grandparents.enSecondary;
    }
  }
}

function selectGuestSide(side) {
  selectedSide = side;
  renderSideAndNames();
  const modal = document.getElementById('sidePickerModal');
  if (modal) modal.classList.add('closed');
  triggerHeartbeatPulse();
}

function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'te' : 'en';
  document.querySelectorAll('[data-en]').forEach(el => {
    if (el.id !== 'coupleTitle') {
      el.innerHTML = el.getAttribute(`data-${currentLang}`);
    }
  });
  document.getElementById('guestName').placeholder = currentLang === 'en' ? 'Your Name (e.g., Ramesh Uncle)' : 'మీ పేరు (ఉదా: రమేష్ బాబాయ్)';
  document.getElementById('guestMessage').placeholder = currentLang === 'en' ? 'Your blessing / wish...' : 'మీ ఆశీస్సులు / శుభాకాంక్షలు...';
  renderSideAndNames();
  updateWeddingCountdown();
}

const extList = ['.jpeg', '.jpg', '.png', '.jfif'];
function handleImgError(img, baseName) {
  let attempt = parseInt(img.getAttribute('data-att') || '0');
  if (attempt < extList.length) {
    img.setAttribute('data-att', attempt + 1);
    img.src = baseName + extList[attempt];
  }
}

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
    if (!musicSource) {
      musicSource = audioCtx.createMediaElementSource(audio);
      musicGain = audioCtx.createGain();
      musicGain.gain.setValueAtTime(0.85, audioCtx.currentTime);
      musicSource.connect(musicGain);
      musicGain.connect(audioCtx.destination);
    }
  } catch (e) {
    console.log("WebAudio routing fallback:", e);
  }
}

window.addEventListener('scroll', () => {
  if (!musicGain || !audioCtx) return;
  const storyEl = document.getElementById('storySection');
  if (!storyEl) return;
  const rect = storyEl.getBoundingClientRect();
  const inView = rect.top < window.innerHeight && rect.bottom > 0;
  if (inView) {
    musicGain.gain.setTargetAtTime(1.15, audioCtx.currentTime, 0.4);
  } else {
    musicGain.gain.setTargetAtTime(0.85, audioCtx.currentTime, 0.4);
  }
});

function triggerHeartbeatPulse() {
  if (navigator.vibrate) {
    navigator.vibrate([60, 40, 80]);
  }
}

function playHeartbeatSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const now = audioCtx.currentTime;

    function makeThump(startTime, freq, duration, gainVal) {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      osc.frequency.exponentialRampToValueAtTime(30, startTime + duration);

      gain.gain.setValueAtTime(gainVal, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    }

    makeThump(now, 65, 0.14, 0.9);
    makeThump(now + 0.18, 85, 0.11, 0.7);
  } catch (e) {
    console.log("Heartbeat sound synthesis:", e);
  }
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
  playHeartbeatSound();

  screen.classList.add('connecting');

  if (audio) {
    setupWebAudioMusic();
    audio.play().then(() => {
      isPlaying = true;
      audioIcon.innerText = '🔊';
    }).catch(err => console.log('Autoplay handled:', err));
  }

  setTimeout(() => {
    screen.classList.add('dismissed');
    screen.style.display = 'none';
    showerAkshintalu();
  }, 1500);
}

function toggleAudio() {
  if (!audio) return;
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    audioIcon.innerText = '🔇';
  } else {
    setupWebAudioMusic();
    audio.play().then(() => {
      isPlaying = true;
      audioIcon.innerText = '🔊';
    }).catch(err => console.log('Playback error:', err));
  }
}

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

function playTempleBellChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const now = audioCtx.currentTime;
    const freqs = [587.33, 880, 1174.66, 1760];
    freqs.forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.25 / (i + 1), now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 2.2);
    });
  } catch (e) {
    console.log("Bell chime error:", e);
  }
}

let isDiyaLit = false;
function lightTheDiya() {
  if (isDiyaLit) return;
  isDiyaLit = true;

  const diya = document.getElementById('diyaBox');
  const status = document.getElementById('diyaStatus');

  diya.classList.add('lit');
  status.innerText = currentLang === 'en' ? "✨ The Sacred Diya is Lit! Divine Blessings Showered 🙏" : "✨ మంగళ దీపం వెలిగించబడింది! దైవ ఆశీస్సులు 🙏";
  status.style.color = "#A37C32";

  triggerHeartbeatPulse();
  playTempleBellChime();

  if (typeof confetti === 'function') {
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#FFD700', '#FF9F1C', '#FFF275', '#E71D36']
    });
  }
}

function flipStoryCard(card) {
  card.classList.toggle('flipped');
}

function showerTalambralu() {
  triggerHeartbeatPulse();
  confetti({
    particleCount: 75,
    spread: 85,
    angle: 90,
    origin: { y: 0.65 },
    colors: ['#FFD700', '#FFEA00', '#FFFDD0', '#E5B80B']
  });
}

let streamObj = null;
let capturedSelfieBase64 = null;

async function togglePhotoBooth() {
  const boothArea = document.getElementById('boothArea');
  if (boothArea.style.display === 'block') {
    closePhotoBooth();
    return;
  }
  try {
    streamObj = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user", width: { ideal: 400 }, height: { ideal: 400 } },
      audio: false
    });
    const video = document.getElementById('boothVideo');
    video.srcObject = streamObj;
    boothArea.style.display = 'block';
  } catch (err) {
    alert("Camera permission is required to snap a selfie frame! 📸");
  }
}

function closePhotoBooth() {
  if (streamObj) {
    streamObj.getTracks().forEach(t => t.stop());
    streamObj = null;
  }
  document.getElementById('boothArea').style.display = 'none';
}

function snapSelfie() {
  const video = document.getElementById('boothVideo');
  const canvas = document.getElementById('boothCanvas');
  const ctx = canvas.getContext('2d');

  ctx.save();
  ctx.translate(400, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(video, 0, 0, 400, 400);
  ctx.restore();

  ctx.lineWidth = 14;
  ctx.strokeStyle = '#851329';
  ctx.strokeRect(7, 7, 386, 386);

  ctx.lineWidth = 3;
  ctx.strokeStyle = '#D4AF37';
  ctx.strokeRect(16, 16, 368, 368);

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(80, 355, 240, 30);
  ctx.strokeStyle = '#D4AF37';
  ctx.strokeRect(80, 355, 240, 30);

  ctx.fillStyle = '#851329';
  ctx.font = 'bold 16px "Cinzel", serif';
  ctx.textAlign = 'center';
  ctx.fillText('Sarika & Sampath #SamRika', 200, 376);

  capturedSelfieBase64 = canvas.toDataURL('image/jpeg', 0.6);
  document.getElementById('selfieThumb').src = capturedSelfieBase64;
  document.getElementById('capturedPhotoPreview').style.display = 'flex';
  closePhotoBooth();
}

function clearSelfie() {
  capturedSelfieBase64 = null;
  document.getElementById('capturedPhotoPreview').style.display = 'none';
}

let mediaRecorder = null;
let audioChunks = [];
let capturedAudioBase64 = null;
let countdownInterval = null;
let voiceResolvePromise = null;

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

    mediaRecorder.ondataavailable = e => {
      if (e.data.size > 0) audioChunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      clearInterval(countdownInterval);
      stream.getTracks().forEach(t => t.stop());

      const blob = new Blob(audioChunks, { type: 'audio/webm' });
      const reader = new FileReader();
      reader.onloadend = () => {
        capturedAudioBase64 = reader.result;
        audioPreview.src = capturedAudioBase64;
        audioPreview.style.display = 'block';
        clearLink.style.display = 'block';
        timerLbl.innerText = "✅ Voice Blessing Ready!";
        timerLbl.style.color = "#2E7D32";
        recBtn.innerText = "🎙️ Re-record (10s)";

        if (voiceResolvePromise) {
          voiceResolvePromise(capturedAudioBase64);
          voiceResolvePromise = null;
        }
      };
      reader.readAsDataURL(blob);
    };

    mediaRecorder.start();
    statusArea.style.display = 'block';
    audioPreview.style.display = 'none';
    clearLink.style.display = 'none';
    recBtn.innerText = "⏹️ Stop Recording";

    let secLeft = 10;
    timerLbl.innerText = `🔴 Recording... ${secLeft}s (Tap Stop or Send)`;
    timerLbl.style.color = "#851329";

    countdownInterval = setInterval(() => {
      secLeft--;
      if (secLeft <= 0) {
        clearInterval(countdownInterval);
        if (mediaRecorder && mediaRecorder.state === "recording") {
          mediaRecorder.stop();
        }
      } else {
        timerLbl.innerText = `🔴 Recording... ${secLeft}s (Tap Stop or Send)`;
      }
    }, 1000);

  } catch (err) {
    alert("Microphone permission is required to leave a voice blessing! 🎙️");
  }
}

function clearVoiceNote() {
  capturedAudioBase64 = null;
  document.getElementById('voiceStatusArea').style.display = 'none';
  document.getElementById('recordedAudioPreview').src = '';
  document.getElementById('recordVoiceBtn').innerText = "🎙️ Voice Note (10s)";
}

function renderWrappedLines(ctx, text, x, startY, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  let currentY = startY;
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, currentY);
  return currentY;
}

let lastPostedName = "";
let lastPostedWish = "";

function generateAndDownloadBlessingCard() {
  const canvas = document.getElementById('blessingCanvas');
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;

  const bgGrad = ctx.createRadialGradient(W / 2, H / 2, 80, W / 2, H / 2, 700);
  bgGrad.addColorStop(0, '#FFFDF7');
  bgGrad.addColorStop(0.7, '#FBF3E3');
  bgGrad.addColorStop(1, '#F2E0C2');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  ctx.lineWidth = 14;
  ctx.strokeStyle = '#851329';
  ctx.strokeRect(26, 26, W - 52, H - 52);

  ctx.lineWidth = 3;
  ctx.strokeStyle = '#C59A3F';
  ctx.strokeRect(44, 44, W - 88, H - 88);

  ctx.textAlign = 'center';
  ctx.font = 'bold 26px "Noto Sans Telugu", sans-serif';
  ctx.fillStyle = '#851329';
  ctx.fillText('🪷  శ్రీరస్తు - శుభమస్తు  🪷', W / 2, 140);

  ctx.font = 'bold 26px "Cinzel", serif';
  ctx.fillStyle = '#8E6A26';
  ctx.fillText('WEDDING BLESSINGS', W / 2, 195);

  ctx.font = 'bold 76px "Great Vibes", cursive, serif';
  ctx.fillStyle = '#851329';
  ctx.fillText('Sarika & Sampath', W / 2, 290);

  ctx.font = 'bold 24px "Cinzel", serif';
  ctx.fillStyle = '#8E6A26';
  ctx.fillText('#SamRika  •  26 November 2026', W / 2, 345);

  const boxX = 80;
  const boxY = 430;
  const boxW = W - 160;
  const boxH = 480;

  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.roundRect(boxX, boxY, boxW, boxH, 20);
  ctx.fill();
  ctx.strokeStyle = '#E8D5B5';
  ctx.stroke();

  const messageText = lastPostedWish || "Wishing you both a lifetime of happiness, divine harmony, and endless love!";
  ctx.font = 'italic 34px "Playfair Display", serif';
  ctx.fillStyle = '#2F2620';
  const lastMsgY = renderWrappedLines(ctx, `"${messageText}"`, W / 2, boxY + 120, boxW - 80, 48);

  const divY = Math.max(lastMsgY + 40, boxY + 280);
  const guestAuthor = lastPostedName || "Well Wisher";
  ctx.font = 'bold 28px "Playfair Display", serif';
  ctx.fillStyle = '#851329';
  renderWrappedLines(ctx, `— With Love & Blessings, ${guestAuthor}`, W / 2, divY + 45, boxW - 60, 38);

  ctx.font = '600 24px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#7A6953';
  ctx.fillText('VIP Gardens, Suraram, Hyderabad', W / 2, 1000);

  const cleanName = (lastPostedName || 'Guest').replace(/[^a-zA-Z0-9]/g, '_');
  const link = document.createElement('a');
  link.download = `Wedding_Blessing_Sarika_Sampath_${cleanName}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

function openThankYouModal() {
  document.getElementById('thankyouModal').classList.add('active');
  showerAkshintalu();
}
function closeThankYouModal() {
  document.getElementById('thankyouModal').classList.remove('active');
}

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

async function submitWish() {
  const postBtn = document.getElementById('postWishBtn');

  if (mediaRecorder && mediaRecorder.state === "recording") {
    postBtn.innerText = currentLang === 'en' ? "Finishing Voice Note..." : "వాయిస్ నోట్ సిద్ధమవుతోంది...";
    await new Promise((resolve) => {
      voiceResolvePromise = resolve;
      mediaRecorder.stop();
    });
  }

  const nameInput = document.getElementById('guestName');
  const msgInput = document.getElementById('guestMessage');
  const downloadBtn = document.getElementById('downloadCardBtn');

  const name = nameInput.value.trim() || "Well Wisher";
  const wish = msgInput.value.trim();

  if (!wish && !capturedSelfieBase64 && !capturedAudioBase64) {
    alert(currentLang === 'en' ? "Please leave a blessing message, photo, or voice note! 💛" : "దయచేసి ఒక సందేశం, ఫోటో లేదా వాయిస్ నోట్ జతచేయండి! 💛");
    return;
  }

  postBtn.innerText = currentLang === 'en' ? "Saving Blessing..." : "సేవ్ అవుతోంది...";
  postBtn.disabled = true;

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

    lastPostedName = name;
    lastPostedWish = wish || "Hearty Congratulations Sarika & Sampath!";

    nameInput.value = '';
    msgInput.value = '';
    clearSelfie();
    clearVoiceNote();

    await loadCloudWishes();
    showerAkshintalu();

    if (downloadBtn) downloadBtn.style.display = 'block';
  } catch (err) {
    alert("Could not connect. Please check your internet connection.");
  } finally {
    postBtn.innerText = currentLang === 'en' ? "✨ Send Blessing" : "✨ ఆశీర్వదించండి";
    postBtn.disabled = false;
  }
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, function(m) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
  });
}

const weddingDate = new Date('2026-11-26T09:15:00+05:30').getTime();

function updateWeddingCountdown() {
  const now = new Date();
  const diff = weddingDate - now.getTime();

  const statusBanner = document.getElementById('eventStatusBanner');
  const statusTitle = document.getElementById('statusTitle');
  const statusDesc = document.getElementById('statusDesc');
  const celebrationBox = document.getElementById('marriedCelebrationBox');
  const countdownRow = document.getElementById('countdownMedalsRow');
  const marriedSubTxt = document.getElementById('marriedSubTxt');

  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 10 = Nov
  const currentDate = now.getDate();

  const isNov25 = (currentYear === 2026 && currentMonth === 10 && currentDate === 25);
  const isNov26 = (currentYear === 2026 && currentMonth === 10 && currentDate === 26);

  if (isNov25) {
    if (statusBanner) {
      statusBanner.style.display = 'block';
      if (currentLang === 'te') {
        statusTitle.innerText = "💛 ఈరోజు: పవిత్ర పసుపు వేడుక (హల్దీ)!";
        statusDesc.innerText = "వధూవరులను ఆశీర్వదించడానికి తప్పక విచ్చేయగలరు 🙏";
      } else {
        statusTitle.innerText = "💛 Today: Sacred Haldi Ceremony!";
        statusDesc.innerText = "Please join and shower your blessings upon Sarika & Sampath 🙏";
      }
    }
  } else if (isNov26 && diff > 0) {
    if (statusBanner) {
      statusBanner.style.display = 'block';
      if (currentLang === 'te') {
        statusTitle.innerText = "✨ సుముహూర్త సమయం సమీపిస్తోంది!";
        statusDesc.innerText = "ఈరోజే పవిత్ర కల్యాణ మహోత్సవం... కొద్దిసేపట్లో ప్రారంభం కానుంది!";
      } else {
        statusTitle.innerText = "✨ The Grand Kalyanam is taking place today!";
        statusDesc.innerText = "The sacred ceremony is starting very soon!";
      }
    }
  } else {
    if (statusBanner) statusBanner.style.display = 'none';
  }

  if (diff <= 0) {
    if (countdownRow) countdownRow.style.display = 'none';
    if (celebrationBox) {
      celebrationBox.style.display = 'block';
      if (marriedSubTxt) {
        marriedSubTxt.innerText = currentLang === 'te' 
          ? "❤️ నూతన వధూవరులు సారిక & సంపత్ లకు వివాహ శుభాకాంక్షలు! ❤️" 
          : "❤️ Happy Married Life to the Amazing Couple Sarika & Sampath! ❤️";
      }
    }
    return;
  }

  if (countdownRow) countdownRow.style.display = 'flex';
  if (celebrationBox) celebrationBox.style.display = 'none';

  document.getElementById('days').innerText = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
  document.getElementById('hours').innerText = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
  document.getElementById('mins').innerText = String(Math.floor((diff % (1000 * 60)) / (1000 * 60))).padStart(2, '0');
  document.getElementById('secs').innerText = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');
}

window.addEventListener('DOMContentLoaded', () => {
  initScratchCard();
  loadCloudWishes();
  loadCloudCounter();
  setupPreWeddingVideo();
  setInterval(updateWeddingCountdown, 1000);
  updateWeddingCountdown();
  renderSideAndNames();
});
