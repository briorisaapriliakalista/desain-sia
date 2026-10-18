# Sistem Akademik Mahasiswa

Situs statis responsif yang memuat halaman Beranda, Akademik, Kegiatan Mahasiswa, Profil, dan layanan akademik. Situs dapat dibuka tanpa proses build.

## Menjalankan secara lokal

Buka `index.html` di browser. Navigasi menggunakan hash URL, misalnya `index.html#/nilai` atau `index.html#/jadwal-mahasiswa`.

Login adalah simulasi sisi browser untuk tampilan demo. Isian NIM dan password tidak diverifikasi oleh server; jangan gunakan kata sandi akun kampus.

## File menu

- `menus/beranda.js` mengatur isi menu Beranda.
- `menus/akademik.js` mengatur daftar layanan Akademik.
- `menus/kegiatan-mahasiswa.js` mengatur menu Kegiatan Mahasiswa dan formulir pengajuan poin.
- `menus/profil.js` mengatur informasi dan formulir Profil.
- `app.js` menangani navigasi, data, dan interaksi layanan lainnya.

## Publikasi

Repository ini menggunakan GitHub Pages melalui GitHub Actions. Rincian publikasi terdapat di [DEPLOYMENT.md](./DEPLOYMENT.md).

URL Pages: <https://briorisaapriliakalista.github.io/desain-sia/>
