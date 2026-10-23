// Share via WhatsApp with your preferred message text
function shareViaWhatsApp() {
  const url = window.location.href;
  const msg = encodeURIComponent(
    `Namaste! You are cordially invited to celebrate our auspicious wedding ceremony.\nSarika & Sampath ❤️\n\n` +
    `🗓️ Muhurtham: Thursday, 26 Nov 2026, 9:15 AM at VIP Gardens, Hyderabad\n` +
    `🎉 Reception: Friday, 27 Nov 2026, 7:00 PM at Thumma Gardens, Singarajpalle (Jangaon)\n\n` +
    `View our interactive wedding invitation here: ${url}`
  );
  window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
}

// Admin Modal Handlers
function openAdminModal() {
  const m = document.getElementById('adminModal');
  if (m) m.classList.remove('closed');
}
function closeAdminModal() {
  const m = document.getElementById('adminModal');
  if (m) m.classList.add('closed');
}

// Generate Personalized Link Function (Also accessible in browser console)
function generatePersonalizedAdminLink() {
  const name = document.getElementById('adminGuestName').value.trim();
  const side = document.getElementById('adminSideSelect').value;
  if (!name) {
    alert("Please enter the guest's name (e.g. Kishore Mama)");
    return;
  }
  const cleanBase = window.location.origin + window.location.pathname;
  const finalUrl = `${cleanBase}?guest=${encodeURIComponent(name)}&side=${side}`;

  const outContainer = document.getElementById('adminOutputContainer');
  const resInput = document.getElementById('adminResultInput');
  resInput.value = finalUrl;
  outContainer.style.display = 'block';
}

function copyAdminLink() {
  const resInput = document.getElementById('adminResultInput');
  resInput.select();
  navigator.clipboard.writeText(resInput.value);
  alert("Personalized invite link copied to clipboard! 📋");
}

function shareAdminLinkOnWhatsApp() {
  const resInput = document.getElementById('adminResultInput');
  const name = document.getElementById('adminGuestName').value.trim() || 'Guest';
  const url = resInput.value;
  const msg = encodeURIComponent(
    `Namaste ${name}! You are cordially invited to celebrate our auspicious wedding ceremony.\nSarika & Sampath ❤️\n\n` +
    `🗓️ Muhurtham: Thursday, 26 Nov 2026, 9:15 AM\n` +
    `📍 VIP Gardens, Suraram, Hyderabad\n\n` +
    `View your personalized interactive invitation: ${url}`
  );
  window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
}

// Console helper: generateLink("Kishore Mama", "groom")
window.generateLink = function(guestName, side = "groom") {
  const cleanBase = window.location.origin + window.location.pathname;
  const url = `${cleanBase}?guest=${encodeURIComponent(guestName)}&side=${side}`;
  console.log("%c Ready-to-share link:", "color: #C59A3F; font-weight: bold; font-size: 14px;");
  console.log(url);
  return url;
};
