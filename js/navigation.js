function applyNavigationActiveClass() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = Array.from(document.querySelectorAll('#site-navbar .nav-menu a'));

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute('href');
    if ((linkPage || '').split('/').pop() === currentPage) {
      link.classList.add('active');
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyNavigationActiveClass);
} else {
  applyNavigationActiveClass();
}

