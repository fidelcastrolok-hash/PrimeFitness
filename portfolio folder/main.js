// ── SCROLL REVEAL ────────────────────────────────────────────────────────────
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

reveals.forEach(el => observer.observe(el));

// ── CONTACT FORM ──────────────────────────────────────────────────────────────
function handleSubmit(event) {
  event.preventDefault();

  const toast = document.getElementById('toast');
  toast.style.display = 'block';

  setTimeout(() => {
    toast.style.display = 'none';
  }, 3500);

  event.target.reset();
}