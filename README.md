# lab8_vuejs
MUHAMAD SAEFUL RAFII 312410374
# Lab11Web_VueJS - Modul 11: Frontend Management Artikel (lanjutan)
## Muhamad Saeful Rafii (312410374)
[cite_start]Repositori ini berisi proyek implementasi **Frontend Client** menggunakan **Framework VueJS 3** dan **Axios**[cite: 5, 6, 21]. [cite_start]Proyek ini berfungsi untuk mengonsumsi, menyajikan, dan memanipulasi data yang disediakan oleh RESTful API Server (CodeIgniter 4) yang telah dibuat pada praktikum sebelumnya secara *asynchronous* tanpa memuat ulang (*reload*) halaman browser[cite: 4, 11].

## 1. Struktur Direktori Proyek
[cite_start]Proyek ini dibangun secara manual menggunakan metode CDN dengan struktur file dan folder sebagai berikut[cite: 21, 31]:

lab8_vuejs/
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── app.js
└── index.html
hasil dari percobaannya
<img width="959" height="475" alt="image" src="https://github.com/user-attachments/assets/ba5d34cc-980a-49fa-a65c-8ed1654bb94a" />

# Lab11Web_VueJS — Modul 12: VueJS Komponen & Routing (SPA)
Menambahkan Vue Router dan memecah kode menjadi komponen terpisah sehingga aplikasi menjadi Single Page Application (SPA) — perpindahan halaman tanpa reload browser.
## struktur 
lab8_vuejs/
├── index.html
└── assets/
    ├── css/style.css
    └── js/
        ├── app.js
        └── components/
            ├── Home.js
            ├── Artikel.js
            └── About.js

## 1. Komponen Home.js

Halaman beranda selamat datang.
<img width="959" height="473" alt="image" src="https://github.com/user-attachments/assets/1ec9d709-d521-4ade-80c4-8b131c60b504" />

## 2. Komponen Artikel.js

CRUD artikel dengan tabel data dan form modal.
<img width="959" height="473" alt="image" src="https://github.com/user-attachments/assets/47d78fde-e090-4979-8a4e-7d6aef7cde4f" />

## 3. Komponen About.js

Halaman profil mahasiswa (Tugas Tambahan).
<img width="959" height="473" alt="image" src="https://github.com/user-attachments/assets/ced8bb6e-d073-4a69-add9-824e669e7265" />

## 4. Konfigurasi Vue Router

Navigasi SPA menggunakan <router-link> dan <router-view>.
<img width="959" height="166" alt="image" src="https://github.com/user-attachments/assets/7736d193-c6e3-4f8d-a1ea-203e623a4cea" />

# Modul 13: VueJS Autentikasi dan Navigation Guards (SPA Security)
Menambahkan sistem Login, Logout, dan Navigation Guards pada aplikasi SPA. Halaman tertentu diproteksi sehingga hanya bisa diakses setelah login.
Backend CI4 — app/Controllers/Api/Auth.php
Endpoint API untuk memvalidasi kredensial user dari database dan mengembalikan token.
php
$routes->post('api/login', 'Api\Auth::login');
Frontend VueJS
## File	Fungsi
Login.js	Komponen form login, kirim kredensial via Axios
app.js	Navigation Guards dengan router.beforeEach()
index.html	Navbar dinamis Login/Logout dengan v-if
<img width="959" height="479" alt="image" src="https://github.com/user-attachments/assets/129a7035-5541-417c-952c-0decec7095db" />

# Modul 14: Keamanan API, Autentikasi Token, dan Axios Interceptors
Menambahkan Server-Side Security menggunakan Token-Based Authentication pada endpoint API CI4, dan Axios Interceptors pada frontend VueJS untuk menyuntikkan token secara otomatis di setiap request.

## Yang Ditambahkan
Backend CI4

app/Filters/ApiAuthFilter.php — Filter yang memeriksa token pada HTTP Header setiap request masuk. Jika tidak ada token → tolak dengan error 401.

app/Config/Filters.php — Daftarkan filter baru:

php
'apiauth' => \App\Filters\ApiAuthFilter::class,

app/Config/Routes.php — Terapkan filter ke endpoint manipulasi data:

php
$routes->post('post', 'Api\Post::create', ['filter' => 'apiauth']);
$routes->put('post/(:segment)', 'Api\Post::update/$1', ['filter' => 'apiauth']);
$routes->delete('post/(:segment)', 'Api\Post::delete/$1', ['filter' => 'apiauth']);
Frontend VueJS — Axios Interceptors di app.js

## Request Interceptor — Otomatis menyuntikkan token ke setiap request:

javascript
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('userToken');
    if (token) config.headers['Authorization'] = 'Bearer ' + token;
    return config;
});

Response Interceptor — Tangkap error 401 secara global:

javascript
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            alert('Sesi Anda telah berakhir. Silakan login kembali.');
            localStorage.clear();
            window.location.href = '#/login';
        }
        return Promise.reject(error);
    }
);





