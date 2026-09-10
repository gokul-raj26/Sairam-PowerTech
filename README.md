# Sairam Powertech Static Website

This project is a static multipage website for **Sairam Powertech**, a battery, inverter, solar and CCTV power/security solutions business.

## Company Details

The site uses one shared business configuration file in `js/site-config.js`:

```js
window.SAIRAM_POWERTECH_CONFIG = {
  brand: 'SAIRAM POWERTECH',
  phone: '+91 98765 43210',
  phoneHref: 'tel:+919876543210',
  whatsapp: '919876543210',
  email: 'info@sairampowertech.com',
  serviceArea: 'Tirupur, Tamil Nadu',
  address: 'Sairam Powertech, Tirupur, Tamil Nadu 641601'
};
```

These values drive the storefront topbar, contact page, footer, CTA links, product inquiry WhatsApp messages and the floating WhatsApp button.

## Folder Structure

```text
ThaaiPowerTools-main/
├── index.html                # Home page
├── about.html                # About page
├── products.html             # Product catalogue, categories and product enquiry modal
├── services.html             # Service catalogue for battery, inverter, solar and CCTV
├── contact.html              # Contact and enquiry page
├── admin/
│   └── index.html            # Admin dashboard page using localStorage
├── css/
│   ├── style.css             # Main site styling
│   └── responsive.css        # Responsive styling
├── js/
│   ├── main.js               # Public site UI, menu, category filtering, product modal and WhatsApp link handling
│   ├── navigation.js         # Active navigation highlighting
│   ├── admin.js              # Browser localStorage product, service and enquiry dashboard logic
│   └── site-config.js        # Shared company configuration
├── Img/                      # Local image assets
└── README.md                 # Project documentation
```

## Public Page Responsibilities

### index.html
Landing page with hero, trust strip, product preview, service preview, CTA sections and footer.

### about.html
Company story, mission, service positioning and business values.

### products.html
Product catalogue grouped by battery, inverter, solar and CCTV categories. Product cards open an enquiry modal that asks for the customer name, location and mobile number, then generates a WhatsApp message.

### services.html
Service offerings and process information for battery, inverter, solar and CCTV support.

### contact.html
Contact page with phone, email, WhatsApp, address and service area details alongside the lead contact form.

## Admin Dashboard Responsibilities

### admin/index.html
The admin dashboard is a static browser-only dashboard UI. It contains:

- Product management form and `productRows` list
- Service management form and `serviceRows` list
- Enquiries table/list panel
- Metric cards for product, service and enquiry counts
- Seed buttons for product and service mock data

### js/admin.js
The dashboard uses `localStorage` in the browser with the following data model:

```js
const STORAGE_KEY = 'sairam_powertech_data_v1';
```

The page reads/writes product records, service records and enquiry records from `localStorage`. It is a static frontend-only admin dashboard, not a database-backed backend system.

## JavaScript Responsibilities

### js/main.js
Handles topbar/mobile menu behavior, category chips, product modal opening/closing and the product enquiry form to WhatsApp flow.

### js/navigation.js
Adds the current-page active navigation class.

### js/site-config.js
Stores the centralized company details used by the shared HTML files and the public site.

## How to View

Run a static HTTP server from the project root:

```bash
py -m http.server 8000
```

Then browse the pages:

```text
http://127.0.0.1:8000/index.html
http://127.0.0.1:8000/about.html
http://127.0.0.1:8000/products.html
http://127.0.0.1:8000/services.html
http://127.0.0.1:8000/contact.html
http://127.0.0.1:8000/admin/index.html
```

## Important Note

The canonical project folder is the nested `ThaaiPowerTools-main` directory. This project was originally a template and has been repurposed as a static HTML multi-page Sairam Powertech business site.
