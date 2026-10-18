# Publikasi situs

Situs ini berupa HTML, CSS, dan JavaScript statis, sehingga tidak memerlukan server aplikasi atau langkah build.

1. Pastikan file situs dan workflow `.github/workflows/deploy.yml` sudah ada di branch `main`.
2. Di GitHub, buka **Settings → Pages** dan pilih **GitHub Actions** sebagai sumber deployment.
3. Push perubahan ke `main`, atau jalankan workflow **Deploy static site to GitHub Pages** dari tab **Actions**.
4. Setelah workflow berhasil, URL publik tercantum pada **Settings → Pages** dan ringkasan workflow.

Untuk repository ini, URL default GitHub Pages berbentuk `https://briorisaapriliakalista.github.io/desain-sia/`.

Menu Beranda, Akademik, Kegiatan Mahasiswa, dan Profil serta halaman layanan dapat dibuka dari navigasi. Konten menu utama berada di folder `menus/` agar bisa diedit terpisah.

Login yang tersedia adalah simulasi sisi browser dan bukan autentikasi akun kampus. Situs statis ini tidak memverifikasi NIM atau password ke server.
