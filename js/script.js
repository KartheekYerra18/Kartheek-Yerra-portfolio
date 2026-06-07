/* ==========================================
   THEME TOGGLE
   ========================================== */
const themeToggle = document.getElementById('themeToggle');
const htmlEl = document.documentElement;

// Check stored theme or system preference
const storedTheme = localStorage.getItem('theme');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (storedTheme) {
  htmlEl.setAttribute('data-theme', storedTheme);
} else {
  htmlEl.setAttribute('data-theme', systemDark ? 'dark' : 'light');
}

themeToggle.addEventListener('click', () => {
  const currentTheme = htmlEl.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  htmlEl.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

/* ==========================================
   MOBILE MENU DRAWER
   ========================================== */
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

mobileToggle.addEventListener('click', () => {
  mobileToggle.classList.toggle('active');
  navMenu.classList.toggle('active');

  // Animate hamburger lines
  const spans = mobileToggle.querySelectorAll('span');
  if (mobileToggle.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

// Close mobile menu on clicking any link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
      mobileToggle.click();
    }
  });
});

/* ==========================================
   TYPING EFFECT
   ========================================== */
const typingText = document.getElementById('typingText');
const professions = [
  'Computer Science Graduate',
  'Machine Learning Enthusiast',
  'Python & Web Developer',
  'Problem Solver'
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeDelay = 100;

function type() {
  const currentWord = professions[wordIndex];

  if (isDeleting) {
    typingText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    typeDelay = 50;
  } else {
    typingText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
    typeDelay = 150;
  }

  // Finished typing word
  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    typeDelay = 1500; // Pause at end of word
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % professions.length;
    typeDelay = 500; // Pause before typing next word
  }

  setTimeout(type, typeDelay);
}

// Start typing effect when DOM loaded
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(type, 1000);
});

/* ==========================================
   PROJECT FILTERING
   ========================================== */
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Toggle active button class
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filterVal = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      const cardCat = card.getAttribute('data-category');

      if (filterVal === 'all' || cardCat === filterVal) {
        card.style.display = 'flex';
        // Trigger tiny fade in animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px)';
        setTimeout(() => {
          card.style.transition = 'all 0.4s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 50);
      } else {
        card.style.display = 'none';
      }
    });
  });
});

/* ==========================================
   SCROLLSPY (ACTIVE NAV LINK HIGHLIGHT)
   ========================================== */
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  let current = '';
  const scrollPosition = window.scrollY + 100; // Offset for navbar height

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

/* ==========================================
   CONTACT FORM SUBMISSION (SIMULATION)
   ========================================== */
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('formSubmitBtn');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const originalContent = submitBtn.innerHTML;
    submitBtn.disabled = true;

    // Show loading state with animated SVG
    submitBtn.innerHTML = `
            <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke-dasharray="35"></circle>
            </svg>
            <span>Sending...</span>
        `;

    // Simulate API post request
    setTimeout(() => {
      const formData = new FormData(contactForm);
      const name = formData.get('name');

      // Show Success Status
      submitBtn.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Message Sent Successfully!</span>
            `;
      submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

      // Reset Form and Button state after delay
      setTimeout(() => {
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;
        submitBtn.style.background = '';
      }, 3000);

    }, 2000);
  });
}

/* ==========================================
   COPYRIGHT YEAR AUTOMATION
   ========================================== */
const copyrightYear = document.getElementById('copyrightYear');
if (copyrightYear) {
  copyrightYear.textContent = new Date().getFullYear();
}
