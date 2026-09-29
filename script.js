// Initialize EmailJS
(function() {
    emailjs.init({
      publicKey: "cmE6dk-VJ3w6z3GQ5"
  });
})();

document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (name.length < 3) {
    alert("Name must be at least 3 characters long.");
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  }
  if (message.length < 10) {
    alert("Message must be at least 10 characters long.");
    return false;
  }

  // Log sebelum kirim
  console.log("Sending payload", { name, email, message });

  emailjs.send("service_i4gpg7q", "template_nuape7q", {
    from_name: name,
    name: name,
    email: email,
    reply_to: email,
    title: "New message from " + name,
    time: new Date().toLocaleString(),
    message: message,
  }).then(
    function(response) {
      alert("✅ Message sent successfully!");
      console.log("Success!", response);
      document.getElementById('contactForm').reset();
    },
    function(error) {
      console.error("❌ Failed", error);
      alert("❌ Failed to send message: " + JSON.stringify(error));
    }
  );
});

// Dark mode toggle
const themeToggle = document.getElementById('themeToggle');
const rootEl = document.documentElement;

themeToggle.setAttribute('aria-pressed', rootEl.getAttribute('data-theme') === 'dark');

themeToggle.addEventListener('click', function() {
  const nextTheme = rootEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  rootEl.setAttribute('data-theme', nextTheme);
  themeToggle.setAttribute('aria-pressed', nextTheme === 'dark');
  localStorage.setItem('theme', nextTheme);
});

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navList = document.querySelector('#navbar ul');

hamburger.addEventListener('click', function() {
  navList.classList.toggle('active');
  hamburger.classList.toggle('open');
});

navList.querySelectorAll('a').forEach(function(link) {
  link.addEventListener('click', function() {
    navList.classList.remove('active');
    hamburger.classList.remove('open');
  });
});

// Navbar background on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', function() {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
});

// Project details modal (used on small screens where the full description is hidden)
const projectModal = document.getElementById('projectModal');
const projectModalTitle = projectModal.querySelector('#projectModalTitle');
const projectModalSubtitle = projectModal.querySelector('.project-modal-subtitle');
const projectModalDesc = projectModal.querySelector('.project-modal-desc');
const projectModalTags = projectModal.querySelector('.project-modal-tags');
let lastFocusedDetailsBtn = null;

function openDetailsModal(titleText, subtitleText, descText, tagsHtml, triggerBtn) {
  projectModalTitle.textContent = titleText || '';
  projectModalSubtitle.textContent = subtitleText || '';
  projectModalDesc.textContent = descText || '';
  projectModalTags.innerHTML = tagsHtml || '';

  lastFocusedDetailsBtn = triggerBtn;
  projectModal.classList.add('is-open');
  projectModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  projectModal.querySelector('.project-modal-close').focus();
}

function closeProjectModal() {
  projectModal.classList.remove('is-open');
  projectModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lastFocusedDetailsBtn) {
    lastFocusedDetailsBtn.focus();
  }
}

document.querySelectorAll('.project-details-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    const card = btn.closest('.project-card');
    if (!card) return;
    const title = card.querySelector('.project-heading h3');
    const desc = card.querySelector('.project-desc');
    const tags = card.querySelector('.project-tags');
    openDetailsModal(
      title ? title.textContent : '',
      '',
      desc ? desc.textContent : '',
      tags ? tags.innerHTML : '',
      btn
    );
  });
});

document.querySelectorAll('.experience-details-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    const item = btn.closest('.experience-item');
    if (!item) return;
    const title = item.querySelector('.experience-content h3');
    const company = item.querySelector('.experience-company');
    const desc = item.querySelector('.experience-description');
    openDetailsModal(
      title ? title.textContent : '',
      company ? company.textContent : '',
      desc ? desc.textContent : '',
      '',
      btn
    );
  });
});

projectModal.querySelectorAll('[data-modal-close]').forEach(function(el) {
  el.addEventListener('click', closeProjectModal);
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && projectModal.classList.contains('is-open')) {
    closeProjectModal();
  }
});

// Reveal-on-scroll for cards and timeline items
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealEls = document.querySelectorAll('.reveal');

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealEls.forEach(function(el) { el.classList.add('is-visible'); });
} else {
  const revealObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(function(el) { revealObserver.observe(el); });
}