# Tutorial Deploy TUBES CC Multi-Node

Tutorial ini menggabungkan konsep PDF praktikum dengan kode TUBES CC yang ada di folder ini. Aplikasi dibagi menjadi 3 VM:

- `database` - `192.168.56.11` - MySQL
- `backend` - `192.168.56.10` - Express API + Sequelize
- `frontend` - `192.168.56.12` - React build + Nginx

## 1. Prasyarat di Laptop

Install dulu:

- VirtualBox
- Vagrant
- Git Bash atau PowerShell

Pastikan folder kerja berada di:

```powershell
C:\Users\ASUS\OneDrive\Documents\STUDENT KAMPUS\SEMESTER 4\TUBES CC
```

## 2. File yang Dipakai

File yang sudah disiapkan:

- `Vagrantfile`
- `infra/playbook.yml`
- `backend/config/db.js`
- `frontend/src/api.js`

Bagian pentingnya:

- Backend akan membaca database dari `.env`.
- Playbook membuat `.env` otomatis di VM backend.
- Frontend dibuild dengan `VITE_API_URL=/api`.
- Nginx di VM frontend meneruskan `/api` ke backend `192.168.56.10:5000`.

## 3. Jalankan Semua VM

Buka PowerShell di folder proyek, lalu jalankan:

```powershell
vagrant up
```

Proses ini akan:

1. Membuat VM database, backend, frontend.
2. Menginstall Ansible di setiap VM.
3. Menginstall MySQL di database.
4. Menginstall Node.js 20 dan menjalankan backend sebagai service.
5. Build React dan menaruh hasilnya di Nginx frontend.

Jika memakai Mac Apple Silicon, jalankan:

```bash
VAGRANT_BOX=bento/ubuntu-22.04 vagrant up
```

## 4. Cek Status VM

```powershell
vagrant status
```

Ketiganya harus berstatus `running`.

## 5. Cek Database

Masuk ke VM database:

```powershell
vagrant ssh database
```

Cek database:

```bash
sudo mysql -e "SHOW DATABASES;"
sudo mysql -e "SHOW TABLES FROM finance_db;"
```

Tabel Sequelize biasanya dibuat setelah backend berhasil menyala dan tersambung ke MySQL.

## 6. Cek Backend

Dari laptop, buka:

```text
http://192.168.56.10:5000
```

Atau dari terminal:

```powershell
curl http://192.168.56.10:5000
```

Hasil yang benar:

```text
Financial System API is running...
```

Untuk melihat service backend:

```powershell
vagrant ssh backend
```

Lalu di dalam VM:

```bash
sudo systemctl status tubes-cc-backend
sudo journalctl -u tubes-cc-backend -n 80 --no-pager
```

## 7. Cek Frontend

Buka browser:

```text
http://192.168.56.12
```

Jika Windows bisa `ping 192.168.56.12` tetapi browser tidak bisa membuka port 80, gunakan port forwarding yang sudah disiapkan:

```text
http://localhost:8080
```

Backend juga bisa dicek dari Windows lewat:

```text
http://localhost:5000
```

Daftar akun lewat halaman aplikasi, lalu coba tambah transaksi atau tabungan. Request dari browser akan masuk ke Nginx frontend, lalu diteruskan ke backend lewat endpoint `/api`.

## 8. Deploy Ulang Setelah Kode Diubah

Kalau kamu mengubah kode backend atau frontend, jalankan ulang provisioning:

```powershell
vagrant provision backend
vagrant provision frontend
```

Kalau perubahan terkait database:

```powershell
vagrant provision database
vagrant provision backend
```

## 9. Troubleshooting

Backend tidak menyala:

```powershell
vagrant ssh backend
sudo journalctl -u tubes-cc-backend -n 120 --no-pager
```

Frontend muncul tapi data gagal load:

```powershell
vagrant ssh frontend
sudo nginx -t
curl http://192.168.56.10:5000
```

Database tidak bisa diakses backend:

```powershell
vagrant ssh database
sudo systemctl status mysql
sudo mysql -e "SELECT user, host FROM mysql.user;"
```

Mulai ulang bersih dari awal:

```powershell
vagrant destroy -f
vagrant up
```

Perintah `destroy` menghapus VM, jadi data database di VM juga ikut hilang.
