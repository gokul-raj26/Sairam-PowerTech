const STORAGE_KEY = 'sairam_powertech_data_v1';

const defaultData = {
  products: [
    { id: 1, name: 'Power Battery', category: 'battery', details: 'Reliable battery backup for homes and shops.' },
    { id: 2, name: 'Hybrid Inverter', category: 'inverter', details: 'Smart inverter for stable power conversion.' },
    { id: 3, name: 'Solar Power Kit', category: 'solar', details: 'Solar solution for daily energy savings.' },
    { id: 4, name: 'CCTV System', category: 'cctv', details: 'Surveillance package for homes and offices.' }
  ],
  services: [
    { id: 1, title: 'Battery Service', category: 'battery', details: 'Battery testing, replacement and seasonal maintenance.' },
    { id: 2, title: 'Inverter Service', category: 'inverter', details: 'Inverter inspection, installation and repair.' },
    { id: 3, title: 'Solar Installation', category: 'solar', details: 'Solar consultation, panel guidance and installation planning.' },
    { id: 4, title: 'CCTV Installation', category: 'cctv', details: 'CCTV camera setup and security monitoring support.' }
  ],
  enquiries: [
    { id: 1, name: 'Demo Customer', product: 'Battery', location: 'Tirupur', mobile: '+91 98765 43210', createdAt: new Date().toISOString() }
  ]
};

function getData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    return structuredClone(defaultData);
  }

  try {
    return JSON.parse(saved);
  } catch (error) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    return structuredClone(defaultData);
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function initAdminDashboard() {
  const productForm = document.getElementById('productForm');
  const serviceForm = document.getElementById('serviceForm');
  const productRows = document.getElementById('productRows');
  const serviceRows = document.getElementById('serviceRows');
  const enquiryRows = document.getElementById('enquiryRows');
  const productCount = document.getElementById('productCount');
  const serviceCount = document.getElementById('serviceCount');
  const enquiryCount = document.getElementById('enquiryCount');
  const seedProductsButton = document.getElementById('seedProductsButton');
  const seedServicesButton = document.getElementById('seedServicesButton');

  if (!productForm || !serviceForm || !productRows || !serviceRows || !enquiryRows) {
    return;
  }

  function renderDashboard() {
    const data = getData();
    productCount.textContent = data.products.length;
    serviceCount.textContent = data.services.length;
    enquiryCount.textContent = data.enquiries.length;

    productRows.innerHTML = '';
    data.products.forEach((product) => {
      const row = document.createElement('div');
      row.className = 'admin-list-item';
      row.innerHTML = `<span><strong>${product.name}</strong><small>${product.category}</small></span><span>${product.details}</span><button class="icon-button" data-delete-product="${product.id}" title="Delete"><i class="fa-solid fa-trash"></i></button>`;
      productRows.appendChild(row);
    });

    serviceRows.innerHTML = '';
    data.services.forEach((service) => {
      const row = document.createElement('div');
      row.className = 'admin-list-item';
      row.innerHTML = `<span><strong>${service.title}</strong><small>${service.category}</small></span><span>${service.details}</span><button class="icon-button" data-delete-service="${service.id}" title="Delete"><i class="fa-solid fa-trash"></i></button>`;
      serviceRows.appendChild(row);
    });

    enquiryRows.innerHTML = '';
    data.enquiries.forEach((enquiry) => {
      const row = document.createElement('div');
      row.className = 'admin-enquiry-item';
      row.innerHTML = `<span><strong>${enquiry.name}</strong><small>${enquiry.location}</small></span><span>${enquiry.product}</span><span>${enquiry.mobile}</span><span>${new Date(enquiry.createdAt).toLocaleDateString()}</span>`;
      enquiryRows.appendChild(row);
    });
  }

  productForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(productForm);
    const data = getData();
    const newProduct = {
      id: Date.now(),
      name: String(formData.get('name')).trim(),
      category: String(formData.get('category')).trim(),
      details: String(formData.get('details')).trim()
    };

    if (!newProduct.name || !newProduct.category || !newProduct.details) {
      return;
    }

    data.products.push(newProduct);
    saveData(data);
    productForm.reset();
    renderDashboard();
  });

  serviceForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(serviceForm);
    const data = getData();
    const newService = {
      id: Date.now(),
      title: String(formData.get('title')).trim(),
      category: String(formData.get('category')).trim(),
      details: String(formData.get('details')).trim()
    };

    if (!newService.title || !newService.category || !newService.details) {
      return;
    }

    data.services.push(newService);
    saveData(data);
    serviceForm.reset();
    renderDashboard();
  });

  productRows.addEventListener('click', (event) => {
    const node = event.target.closest('[data-delete-product]');
    if (!node) return;
    const data = getData();
    data.products = data.products.filter((item) => String(item.id) !== node.dataset.deleteProduct);
    saveData(data);
    renderDashboard();
  });

  serviceRows.addEventListener('click', (event) => {
    const node = event.target.closest('[data-delete-service]');
    if (!node) return;
    const data = getData();
    data.services = data.services.filter((item) => String(item.id) !== node.dataset.deleteService);
    saveData(data);
    renderDashboard();
  });

  seedProductsButton.addEventListener('click', () => {
    const data = getData();
    const nextProduct = {
      id: Date.now(),
      name: 'Demo Solar Battery',
      category: 'solar',
      details: 'High backup capacity for commercial and residential use.'
    };
    data.products.push(nextProduct);
    saveData(data);
    renderDashboard();
  });

  seedServicesButton.addEventListener('click', () => {
    const data = getData();
    const nextService = {
      id: Date.now(),
      title: 'Annual Energy Checkup',
      category: 'solar',
      details: 'Inspection and performance review for solar and battery systems.'
    };
    data.services.push(nextService);
    saveData(data);
    renderDashboard();
  });

  renderDashboard();
}

document.addEventListener('DOMContentLoaded', initAdminDashboard);
