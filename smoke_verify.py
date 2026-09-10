
import urllib.request
import urllib.error
import os

pages = [
    'index.html',
    'about.html',
    'products.html',
    'services.html',
    'contact.html',
    'admin/index.html',
]

errors = []
for page in pages:
    url = 'http://127.0.0.1:8000/' + page
    try:
        response = urllib.request.urlopen(url, timeout=5)
        body = response.read(200).decode('utf-8', errors='ignore')
        if response.status != 200:
            errors.append(f'{page}: status={response.status}')
        if 'SAIRAM POWERTECH' not in body and 'Sairam' not in body:
            errors.append(f'{page}: brand text missing')
        print(f'{page}: {response.status}')
    except Exception as exc:
        errors.append(f'{page}: {exc}')

if errors:
    print('SMOKE_FAIL')
    for error in errors:
        print(error)
    raise SystemExit(1)

print('ALL_PAGES_OK')
