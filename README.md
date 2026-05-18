# 💰 FinanceCloud — Sistem Monitoring Keuangan Berbasis Cloud

> Aplikasi web modern untuk memantau keuangan pribadi secara real-time dengan tampilan yang bersih dan intuitif.

---

## 📌 Deskripsi

**FinCloud** adalah sistem monitoring keuangan berbasis cloud yang memungkinkan pengguna untuk mencatat, memantau, dan menganalisis kondisi keuangan mereka secara real-time. Dibangun dengan teknologi modern dan antarmuka yang responsif.

---

## ✨ Fitur Utama

- 📥 **Pemasukan** — Catat semua sumber pendapatan
- 📤 **Pengeluaran** — Lacak setiap pengeluaran secara detail
- 💰 **Tabungan** — Pantau perkembangan tabungan
- 🥧 **Diagram Lingkaran** — Visualisasi keuangan dalam bentuk chart interaktif
- 🕐 **Waktu Real-time** — Menampilkan waktu secara langsung
- 🌗 **Mode Gelap & Terang** — Pilih tampilan sesuai preferensi
- 🔐 **Login & Autentikasi** — Keamanan data pengguna

---

## 🛠️ Teknologi yang Digunakan

| Layer | Teknologi |
|-------|-----------|
| Frontend | React.js |
| Backend | Node.js + Express |
| Database | MySQL |
| Hosting | Cloud-based |

---

## 👥 Anggota Tim

| Nama | Peran |
|------|-------|
| Risdiansyah | Backend Developer |
| Nafriza | Frontend Developer |
| Falah | Database & Fullstack |

---

## 🚀 Cara Menjalankan Project

### Prerequisites
Pastikan sudah menginstall:
- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)
- [Git](https://git-scm.com/)

### Instalasi

```bash
# 1. Clone repository
git clone git@github.com:risdiansyah29/tubescc.git

# 2. Masuk ke folder project
cd tubescc

# 3. Install dependencies backend
cd backend
npm install

# 4. Install dependencies frontend
cd ../frontend
npm install
```

### Konfigurasi Database

```bash
# Buat file .env di folder backend
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password_kamu
DB_NAME=fincloud
```

### Menjalankan Aplikasi

```bash
# Jalankan backend (dari folder backend)
npm run dev

# Jalankan frontend (dari folder frontend)
npm start
```

Buka browser dan akses: `http://localhost:3000`

---

## 📁 Struktur Folder

```
tubescc/
├── frontend/          # React.js
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
├── backend/           # Node.js + Express
│   ├── routes/
│   ├── controllers/
│   └── server.js
└── README.md
```

---

## 📄 Lisensi

Project ini dibuat untuk keperluan Tugas Besar mata kuliah.  
© 2025 — Risdiansyah, Nafriza, Falah
