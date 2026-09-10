
function setupMobileNavigation() {
  const mobileMenu = document.querySelector('#site-navbar .nav-menu');
  const menuToggle = document.querySelector('#site-navbar .menu-toggle');

  if (!mobileMenu || !menuToggle || menuToggle.dataset.bound === 'true') {
    return;
  }

  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  menuToggle.dataset.bound = 'true';
}

window.setupMobileNavigation = setupMobileNavigation;

document.querySelectorAll('[data-whatsapp]').forEach((button) => {
  button.addEventListener('click', () => {
    const number = window.SAIRAM_POWERTECH_CONFIG && window.SAIRAM_POWERTECH_CONFIG.whatsapp ? window.SAIRAM_POWERTECH_CONFIG.whatsapp : '919876543210';
    const msg = encodeURIComponent(button.dataset.message || 'Hi, I would like to enquire about Sairam Powertech services.');
    window.open(`https://wa.me/${number}?text=${msg}`, '_blank');
  });
});

const productModal = document.getElementById('productModal');
const modalProductName = document.getElementById('modalProductName');
const productName = document.getElementById('productName');
const modalClose = document.getElementById('modalClose');
const form = document.getElementById('productEnquiryForm');

if (productModal && modalProductName && productName && form) {
  document.querySelectorAll('.product-enquiry').forEach((button) => {
    button.addEventListener('click', () => {
      const product = button.dataset.product || 'Product';
      modalProductName.textContent = product;
      productName.value = product;
      productModal.classList.add('open');
    });
  });

  modalClose.addEventListener('click', () => {
    productModal.classList.remove('open');
  });

  productModal.addEventListener('click', (event) => {
    if (event.target === productModal) {
      productModal.classList.remove('open');
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('customerName').value.trim();
    const location = document.getElementById('customerLocation').value.trim();
    const mobile = document.getElementById('customerMobile').value.trim();
    const product = productName.value.trim();

    if (!name || !location || !mobile) {
      return;
    }

    const message = `Hello Sairam Powertech, I am ${name}. I need information about the ${product} product. My location is ${location}. My mobile number is ${mobile}. Please contact me.`;
    const whatsappNumber = window.SAIRAM_POWERTECH_CONFIG && window.SAIRAM_POWERTECH_CONFIG.whatsapp ? window.SAIRAM_POWERTECH_CONFIG.whatsapp : '919876543210';
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');
    productModal.classList.remove('open');
    form.reset();
  });
}

function applySiteConfigToPage() {
  const config = window.SAIRAM_POWERTECH_CONFIG || {
    phone: '+91 8122016648',
    phoneHref: 'tel:+918122016648',
    whatsapp: '918122016648',
    email: 'infosairampowertech@gmail.com',
    serviceArea: 'Anakaputhur, Tamil Nadu',
    address: 'Sairam Powertech, Anakaputhur, Tamil Nadu 641601'
  };

  const topbarServiceAreaNodes = document.querySelectorAll('.topbar .placeholder');
  topbarServiceAreaNodes.forEach((node) => {
    node.textContent = config.serviceArea;
  });

  const footerAddressNodes = document.querySelectorAll('.footer .placeholder, footer .placeholder');
  footerAddressNodes.forEach((node) => {
    node.textContent = config.address;
  });

  document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
    link.href = config.phoneHref || 'tel:+918122016648';
    if (link.textContent.trim().startsWith('Call:')) {
      link.textContent = `Call: ${config.phone}`;
    } else {
      link.textContent = config.phone;
    }
  });

  document.querySelectorAll('a[href^="https://wa.me/"]').forEach((link) => {
    link.href = `https://wa.me/${config.whatsapp}`;
  });

  document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
    link.href = `mailto:${config.email}`;
    link.textContent = config.email;
  });

  document.querySelectorAll('.contact-detail').forEach((detail) => {
    const label = detail.querySelector('span');
    const value = detail.querySelector('p');
    if (label && label.textContent.trim().toLowerCase() === 'service area' && value) {
      value.textContent = config.address;
    }
  });
}

document.addEventListener('DOMContentLoaded', applySiteConfigToPage);

const categoryButtons = document.querySelectorAll('.category-chip');
const productCards = document.querySelectorAll('[data-category]');

categoryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    categoryButtons.forEach((chip) => chip.classList.toggle('active', chip === button));

    productCards.forEach((card) => {
      const cardCategory = card.dataset.category || '';
      const visible = selected === 'all' || cardCategory === selected;
      card.style.display = visible ? 'block' : 'none';
    });
  });
});
