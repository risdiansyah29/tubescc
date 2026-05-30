# 💰 FinanceCloud — Sistem Monitoring Keuangan Berbasis Cloud

> Aplikasi web modern, responsif, dan interaktif untuk memantau keuangan pribadi secara real-time. Dibangun menggunakan arsitektur *Cloud / Multi-Node* untuk skalabilitas dan keandalan tinggi.

---

## 📌 Deskripsi

**FinanceCloud** adalah sistem manajemen keuangan pribadi berbasis web yang memungkinkan pengguna untuk mencatat pemasukan, melacak pengeluaran, serta menganalisis kondisi keuangan mereka melalui visualisasi data interaktif. Proyek ini mengimplementasikan konsep *Infrastructure as Code* (IaC) dan *Multi-Node Virtualization* menggunakan Vagrant dan Ansible.

---

## ✨ Fitur Utama

- 📥 **Manajemen Pemasukan** — Catat semua sumber pendapatan dengan mudah.
- 📤 **Pelacakan Pengeluaran** — Lacak setiap pengeluaran secara detail berdasarkan kategori.
- 💰 **Monitor Tabungan** — Pantau perkembangan dan target tabungan Anda.
- 🥧 **Visualisasi Interaktif** — Analisis data keuangan melalui diagram interaktif (Chart.js).
- 🌗 **Mode Gelap & Terang** — Antarmuka adaptif yang nyaman digunakan kapan saja.
- 🔐 **Sistem Keamanan & Autentikasi** — Login aman berbasis JWT (JSON Web Tokens) dan enkripsi password.
- 🌐 **Arsitektur Multi-Node** — Pemisahan *Frontend*, *Backend*, dan *Database* ke dalam server (Virtual Machine) yang berbeda untuk menjamin kinerja dan keamanan.

---

## 🛠️ Teknologi yang Digunakan

Proyek ini dibangun menggunakan *stack* teknologi modern mulai dari sisi aplikasi hingga infrastruktur:

### 🎨 Frontend
- **Framework:** React.js dengan Vite (`@vitejs/plugin-react`)
- **Visualisasi:** Chart.js & `react-chartjs-2`
- **HTTP Client:** Axios
- **Ikon:** Lucide React

### ⚙️ Backend
- **Framework:** Node.js & Express.js
- **ORM:** Sequelize
- **Database:** MySQL (Production) & SQLite (Development)
- **Keamanan:** Bcrypt.js & JSON Web Token (JWT)

> [!NOTE]
> **Pemberitahuan Database:** Proyek ini sepenuhnya menggunakan database relasional **MySQL** (untuk produksi/VM) dan **SQLite** (untuk pengembangan lokal) yang dikelola menggunakan ORM **Sequelize**. Sistem ini **TIDAK menggunakan MongoDB** atau database NoSQL lainnya. Seluruh konfigurasi dan dependensi MongoDB telah dipastikan bersih dari proyek.

### ☁️ Infrastruktur & Deployment (DevOps)
- **Virtualisasi:** VirtualBox
- **Provisioning:** Vagrant
- **Configuration Management:** Ansible
- **Web Server / Reverse Proxy:** Nginx

---

## 👥 Tim Pengembang

| Nama | Peran |
|------|-------|
| **Risdiansyah** | Frontend Developer |
| **Nafriza** | Backend Developer |
| **Falah** | Database & Fullstack Engineer |

---

## 🚀 Panduan Instalasi & Deployment

Proyek ini menggunakan arsitektur **3-Tier Multi-Node** dengan detail *Virtual Machine* (VM) sebagai berikut:
- 🗄️ `database` — `192.168.56.11` (MySQL)
- ⚙️ `backend` — `192.168.56.10` (Express API + Sequelize, Port 5000)
- 🖥️ `frontend` — `192.168.56.12` (React Build + Nginx, Port 80)

### Opsi 1: Otomatis via Vagrant & Ansible (Rekomendasi)

**Prasyarat:** VirtualBox, Vagrant, dan Git (Bash/PowerShell).

1. **Clone repositori:**
   ```bash
   git clone git@github.com:risdiansyah29/tubescc.git
   cd tubescc
   ```
2. **Jalankan Provisioning VM:**
   ```bash
   vagrant up
   ```
   *Catatan: Proses ini akan mengunduh OS Ubuntu, menginstal dependensi, menyiapkan database, melakukan build React, dan menyalakan server Nginx/Node secara otomatis.*
3. **Akses Aplikasi:**
   - Buka browser dan akses Frontend: `http://192.168.56.12`
   - *Atau via Port Forwarding:* `http://localhost:8080`
   - Cek status API Backend: `http://192.168.56.10:5000` atau `http://localhost:5000`

### Opsi 2: Local Development (Manual)

Jika Anda ingin menjalankan proyek di OS host (tanpa VM) untuk proses *development*:

**Prasyarat:** Node.js (v18+), npm/yarn, dan MySQL.

1. **Setup Database:**
   Buat database MySQL lokal (misal: `finance_db`).
2. **Setup Backend:**
   ```bash
   cd backend
   npm install
   # Konfigurasi .env sesuai dengan database lokal Anda
   npm run dev
   ```
3. **Setup Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
4. **Akses Development Server:**
   Buka `http://localhost:5173` (port default Vite).

---

## 📁 Struktur Repositori

```text
tubescc/
├── frontend/          # Source code React + Vite (Antarmuka Pengguna)
│   ├── src/           # Komponen, Halaman, API service
│   ├── public/        # Aset statis
│   └── package.json   # Dependensi frontend
├── backend/           # Source code Node.js + Express (Logika Bisnis & API)
│   ├── config/        # Konfigurasi database (.env reader)
│   ├── controllers/   # Logika kontrol tiap endpoint
│   ├── models/        # Skema Sequelize ORM
│   ├── routes/        # Definisi API routes
│   └── index.js       # Entry point server backend
├── infra/             # Skrip Infrastruktur dan Konfigurasi
│   ├── playbook.yml   # Ansible playbook untuk setup 3 VM
│   ├── nginx.conf     # Konfigurasi reverse proxy frontend
│   ├── deploy.sh      # Skrip deployment
│   └── TUTORIAL-VM.md # Panduan lengkap arsitektur VM
├── Vagrantfile        # Definisi topologi dan provisioning Virtual Machine
└── README.md          # Dokumentasi utama proyek
```

---

## 📄 Lisensi & Kredit

Proyek FinanceCloud (Tubes CC) dikembangkan sebagai bagian dari Tugas Besar mata kuliah *Cloud Computing* (Komputasi Awan).  
© 2026 — Risdiansyah, Nafriza, Falah. Hak cipta dilindungi.
