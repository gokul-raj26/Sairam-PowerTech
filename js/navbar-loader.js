(function () {
  const pagePath = window.location.pathname || '/index.html';
  const isAdminPage = pagePath.indexOf('/admin/') !== -1;
  const navUrl = isAdminPage ? '../components/navbar.html' : 'components/navbar.html';

  function normalizeNavMarkup(markup) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(markup, 'text/html');
    const links = Array.from(doc.querySelectorAll('a[href]'));

    links.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return;
      }

      if (isAdminPage) {
        if (href === 'index.html') link.setAttribute('href', '../index.html');
        else if (href === 'About.html') link.setAttribute('href', '../About.html');
        else if (href === 'products.html') link.setAttribute('href', '../products.html');
        else if (href === 'services.html') link.setAttribute('href', '../services.html');
        else if (href === 'contact.html') link.setAttribute('href', '../contact.html');
      } else {
        if (href === 'index.html') link.setAttribute('href', 'index.html');
        else if (href === 'About.html') link.setAttribute('href', 'About.html');
        else if (href === 'products.html') link.setAttribute('href', 'products.html');
        else if (href === 'services.html') link.setAttribute('href', 'services.html');
        else if (href === 'contact.html') link.setAttribute('href', 'contact.html');
      }
    });

    return doc.body.innerHTML;
  }

  function applyActiveLink(pageUrl) {
    const currentPage = pageUrl.split('/').pop() || 'index.html';
    const navLinks = Array.from(document.querySelectorAll('#site-navbar .nav-menu a'));
    navLinks.forEach((link) => {
      const linkPage = (link.getAttribute('href') || '').split('/').pop();
      if (linkPage.toLowerCase() === currentPage.toLowerCase()) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  function applyNav() {
    let placeholder = document.getElementById('site-navbar');
    if (!placeholder) {
      placeholder = document.createElement('div');
      placeholder.id = 'site-navbar';
      const main = document.querySelector('main');
      if (main) {
        document.body.insertBefore(placeholder, main);
      } else {
        document.body.appendChild(placeholder);
      }
    }

    fetch(navUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Navbar fetch failed');
        }
        return response.text();
      })
      .then((html) => {
        placeholder.innerHTML = normalizeNavMarkup(html);
        if (window.setupMobileNavigation) {
          window.setupMobileNavigation();
        }
        applyActiveLink(window.location.pathname);
      })
      .catch((error) => {
        console.warn('Global nav load failed:', error);
      });
  }

  applyNav();
})();
