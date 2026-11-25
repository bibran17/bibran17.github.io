// ВАШ НОМЕР ТЕЛЕФОНА: впишите его сюда, в формате +79991234567
const PHONE = '+79937211706';

const digits = PHONE.replace(/\D/g, '');
document.getElementById('waLink').href = `https://wa.me/${digits}`;
document.getElementById('maxLink').href = `https://max.ru/${PHONE}`;

// Телефон: по клику копируется в буфер обмена
const phoneBtn = document.getElementById('phoneBtn');
phoneBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(PHONE);
  } catch {
    const t = document.createElement('textarea');
    t.value = PHONE; document.body.appendChild(t); t.select();
    document.execCommand('copy'); t.remove();
  }
  const old = phoneBtn.textContent;
  phoneBtn.textContent = phoneBtn.dataset.copied;
  setTimeout(() => (phoneBtn.textContent = old), 1800);
});

// Год в подвале
document.getElementById('year').textContent = new Date().getFullYear();

// Плавное появление блоков при прокрутке
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
  io.observe(el);
});

// Свечение за курсором
const glow = document.querySelector('.glow');
window.addEventListener('mousemove', (e) => {
  glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

// Лёгкий наклон карточек портфолио
document.querySelectorAll('.tilt').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});
