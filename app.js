const main = document.querySelector("#main-content");
const homeContent = main.innerHTML;
const toast = document.querySelector(".toast");
const notificationButton = document.querySelector(".notification-button");
const notificationDialog = document.querySelector("#notification-dialog");
const notificationCloseButton = document.querySelector(".notification-close");
const markReadButton = document.querySelector(".mark-read-button");
let toastTimeout;
let notificationTrigger;

const pointsEntries = [
  {
    category: "Organisasi Kemahasiswaan",
    title: "Ketua HMIF Periode 2025/2026",
    organization: "Himpunan Mahasiswa Informatika (HMIF)",
    date: "15 Januari 2025",
    points: 50,
    status: "Divalidasi (✓)",
  },
  {
    category: "Sertifikasi Kepanitiaan",
    title: "Anggota Kepanitiaan Festival Sekar Geni",
    organization: "Acara Gemalengyang di selenggarakan UKM Karawitan",
    date: "10 November 2025",
    points: 10,
    status: "Divalidasi (✓)",
  },
];

const pointCategories = {
  fch1: {
    label: "Formasi Cerdas Humanis 1 (FCH 1) — Menjadi peserta kegiatan",
    points: 10,
    field: "Formasi Cerdas Humanis",
    role: "Peserta kegiatan pengembangan diri",
  },
  fch2: {
    label: "Formasi Cerdas Humanis 2 (FCH 2) — Menjadi peserta pelatihan",
    points: 15,
    field: "Formasi Cerdas Humanis",
    role: "Peserta pelatihan dan pengembangan karakter",
  },
  fch3: {
    label: "Formasi Cerdas Humanis 3 (FCH 3) — Menjadi panitia kegiatan",
    points: 20,
    field: "Formasi Cerdas Humanis",
    role: "Panitia pelaksana kegiatan mahasiswa",
  },
  fch4: {
    label: "Formasi Cerdas Humanis 4 (FCH 4) — Menjadi anggota pengurus",
    points: 30,
    field: "Formasi Cerdas Humanis",
    role: "Menjadi anggota pengurus organisasi",
  },
  organization: {
    label: "Organisasi Kemahasiswaan — Menjadi ketua organisasi",
    points: 50,
    field: "Organisasi kemahasiswaan (ormawa)",
    role: "Menjabat sebagai pengurus BEM/DPM Fakultas/Jurusan/Prodi",
  },
  committee: {
    label: "Sertifikasi Kepanitiaan — Menjadi anggota panitia",
    points: 10,
    field: "Sertifikasi Kepanitiaan",
    role: "Anggota kepanitiaan kegiatan resmi kampus",
  },
};

const profileData = {
  name: "Briorisa Aprilia Kalista",
  email: "245314034@student.usd.ac.id",
  phone: "+62 812–3456–7890",
};

const services = {
  nilai: {
    title: "Nilai per Semester",
    category: "AKADEMIK",
    description: "Lihat hasil studi dan perkembangan nilaimu di setiap semester.",
    content: `
      <div class="page-toolbar">
        <label class="select-field">Pilih semester
          <select id="grade-semester" aria-label="Pilih semester nilai">
            <option value="5">Semester 5 · Berjalan</option>
            <option value="4">Semester 4 · Genap 2024/2025</option>
            <option value="3">Semester 3 · Ganjil 2024/2025</option>
          </select>
        </label>
        <span class="status-badge"><i></i> Nilai contoh</span>
      </div>
      <div class="summary-grid summary-grid-three">
        <article class="summary-card"><span>IPS semester ini</span><strong id="semester-gpa">3.91</strong><small>Indeks Prestasi Semester</small></article>
        <article class="summary-card"><span>Total SKS</span><strong id="semester-credits">20</strong><small>SKS yang diambil</small></article>
        <article class="summary-card"><span>Mata kuliah</span><strong id="semester-count">6</strong><small>Termasuk mata kuliah pilihan</small></article>
      </div>
      <div class="content-card table-card">
        <div class="content-card-heading"><div><p class="eyebrow section-eyebrow">HASIL STUDI</p><h3>Rincian nilai</h3></div><span class="sample-tag">Data pratinjau</span></div>
        <div class="table-scroll"><table><thead><tr><th>Mata kuliah</th><th>Kode</th><th>SKS</th><th>Nilai</th><th>Mutu</th></tr></thead><tbody id="grade-rows"></tbody></table></div>
      </div>`,
  },
  lpkp: {
    title: "LPKP",
    category: "AKADEMIK",
    description: "Pantau lembar perkembangan dan pencapaian kompetensi perkuliahan.",
    content: `
      <div class="summary-grid summary-grid-three">
        <article class="summary-card"><span>Progres kurikulum</span><strong>64%</strong><small>92 dari 144 SKS terpenuhi</small><div class="mini-progress"><i style="width:64%"></i></div></article>
        <article class="summary-card"><span>Mata kuliah lulus</span><strong>28</strong><small>Terakumulasi sampai semester 4</small></article>
        <article class="summary-card"><span>Sisa mata kuliah</span><strong>18</strong><small>Termasuk mata kuliah pilihan</small></article>
      </div>
      <div class="content-card"><div class="content-card-heading"><div><p class="eyebrow section-eyebrow">PERKEMBANGAN</p><h3>Ringkasan per semester</h3></div><span class="sample-tag">Data contoh</span></div>
        <div class="progress-list">
          <div class="progress-item"><div><strong>Semester 1</strong><span>20 dari 20 SKS</span></div><div class="mini-progress"><i style="width:100%"></i></div><b>100%</b></div>
          <div class="progress-item"><div><strong>Semester 2</strong><span>20 dari 20 SKS</span></div><div class="mini-progress"><i style="width:100%"></i></div><b>100%</b></div>
          <div class="progress-item"><div><strong>Semester 3</strong><span>18 dari 20 SKS</span></div><div class="mini-progress"><i style="width:90%"></i></div><b>90%</b></div>
          <div class="progress-item"><div><strong>Semester 4</strong><span>20 dari 20 SKS</span></div><div class="mini-progress"><i style="width:100%"></i></div><b>100%</b></div>
          <div class="progress-item"><div><strong>Semester 5</strong><span>14 dari 20 SKS · berjalan</span></div><div class="mini-progress"><i style="width:70%"></i></div><b>70%</b></div>
        </div>
      </div>`,
  },
  keuangan: {
    title: "Kartu Keuangan Mahasiswa",
    category: "KEUANGAN",
    description: "Periksa ringkasan tagihan dan riwayat transaksi perkuliahan.",
    content: `
      <div class="finance-card"><div><span>TAGIHAN SEMESTER GENAP 2025/2026</span><strong>Rp 4.500.000</strong><small>Jatuh tempo · 28 Februari 2026</small></div><span class="finance-status">Belum dibayar</span></div>
      <div class="summary-grid summary-grid-three">
        <article class="summary-card"><span>Total tagihan</span><strong class="amount">Rp 4,5 jt</strong><small>Semester berjalan</small></article>
        <article class="summary-card"><span>Sudah dibayar</span><strong class="amount amount-green">Rp 0</strong><small>Belum ada pembayaran</small></article>
        <article class="summary-card"><span>Sisa tagihan</span><strong class="amount">Rp 4,5 jt</strong><small>Data simulasi</small></article>
      </div>
      <div class="content-card table-card"><div class="content-card-heading"><div><p class="eyebrow section-eyebrow">RIWAYAT</p><h3>Transaksi terakhir</h3></div><span class="sample-tag">Data pratinjau</span></div>
        <div class="table-scroll"><table><thead><tr><th>Keterangan</th><th>Tanggal</th><th>Jumlah</th><th>Status</th></tr></thead><tbody><tr><td>Registrasi semester ganjil</td><td>12 Agu 2025</td><td>Rp 4.250.000</td><td><span class="table-status status-paid">Lunas</span></td></tr><tr><td>Biaya kemahasiswaan</td><td>12 Agu 2025</td><td>Rp 250.000</td><td><span class="table-status status-paid">Lunas</span></td></tr></tbody></table></div>
      </div>
      <p class="inline-note">Informasi pembayaran ini hanya simulasi. Pembayaran nyata tidak tersedia di pratinjau ini.</p>`,
  },
  "jadwal-mahasiswa": {
    title: "Jadwal Mahasiswa",
    category: "AKADEMIK",
    description: "Jadwal perkuliahan mingguan untuk semester yang sedang berjalan.",
    content: `
      <div class="page-toolbar"><div class="week-label"><strong>Minggu perkuliahan</strong><span>16–20 Februari 2026</span></div><span class="status-badge"><i></i> Semester genap</span></div>
      <div class="day-tabs" role="group" aria-label="Filter hari jadwal">
        <button class="day-tab is-selected" type="button" data-day="Semua">Semua</button><button class="day-tab" type="button" data-day="Senin">Senin</button><button class="day-tab" type="button" data-day="Selasa">Selasa</button><button class="day-tab" type="button" data-day="Rabu">Rabu</button><button class="day-tab" type="button" data-day="Kamis">Kamis</button><button class="day-tab" type="button" data-day="Jumat">Jumat</button>
      </div>
      <div class="content-card table-card"><div class="content-card-heading"><div><p class="eyebrow section-eyebrow">KELAS MINGGU INI</p><h3>Jadwal perkuliahan</h3></div><span class="sample-tag">Jadwal contoh</span></div>
        <div class="table-scroll"><table><thead><tr><th>Hari</th><th>Waktu</th><th>Mata kuliah</th><th>Dosen</th><th>Ruang</th></tr></thead><tbody>
          <tr data-schedule-day="Senin"><td>Senin</td><td>08.00–09.40</td><td>Basis Data</td><td>Dr. Siti Rahma, M.Kom.</td><td>Lab 2</td></tr>
          <tr data-schedule-day="Senin"><td>Senin</td><td>10.00–11.40</td><td>Interaksi Manusia Komputer</td><td>R. Pratama, M.T.</td><td>R. 301</td></tr>
          <tr data-schedule-day="Selasa"><td>Selasa</td><td>09.00–10.40</td><td>Rekayasa Perangkat Lunak</td><td>Dr. A. Nugraha, M.Kom.</td><td>R. 204</td></tr>
          <tr data-schedule-day="Rabu"><td>Rabu</td><td>13.00–14.40</td><td>Analisis dan Desain Sistem</td><td>F. Lestari, M.Kom.</td><td>R. 105</td></tr>
          <tr data-schedule-day="Kamis"><td>Kamis</td><td>08.00–09.40</td><td>Jaringan Komputer</td><td>H. Saputra, M.T.</td><td>Lab 1</td></tr>
          <tr data-schedule-day="Jumat"><td>Jumat</td><td>10.00–11.40</td><td>Metodologi Penelitian</td><td>Dr. N. Wibowo, M.Si.</td><td>R. 202</td></tr>
        </tbody></table></div>
      </div>`,
  },
  "poin-kemahasiswaan": {
    title: "Poin Kemahasiswaan",
    category: "KEGIATAN",
    description: "Pantau akumulasi poin wajib, status FCH, dan pengajuan poin kegiatan.",
    content: `
      <section class="points-overview" aria-label="Ringkasan poin kemahasiswaan">
        <div class="points-overview-top"><span>TOTAL AKUMULASI POIN</span><span class="graduation-requirement">Syarat Kelulusan Terpenuhi</span></div>
        <p class="points-total"><strong id="points-total">60</strong><span>/ min 50 poin</span></p>
        <div class="points-progress" role="progressbar" aria-label="Progres poin kelulusan" aria-valuemin="0" aria-valuemax="50" aria-valuenow="50"><span></span></div>
        <p class="points-verification">✓ Poin diverifikasi: <strong id="points-verified">60</strong> Poin. Belum diverifikasi: <strong id="points-pending">0</strong> Poin.</p>
      </section>
      <section class="fch-status-card">
        <h2>Status Poin Wajib Mahasiswa</h2>
        <div class="fch-status-list">
          <div class="fch-status"><span>INSA</span><strong>BELUM</strong></div>
          <div class="fch-status"><span>FCH1</span><strong>BELUM</strong></div>
          <div class="fch-status"><span>FCH2</span><strong>BELUM</strong></div>
          <div class="fch-status"><span>FCH3</span><strong>BELUM</strong></div>
          <div class="fch-status is-complete"><span>FCH4</span><strong>✓ SUDAH</strong></div>
        </div>
      </section>
      <div class="points-section-heading"><h2>Daftar Poin Kegiatan Anda</h2><span id="points-entry-count">2 Kegiatan Tercatat</span></div>
      <div class="point-entry-list" id="point-entry-list"></div>
      <button class="primary-button points-submit-open" type="button" data-open-dialog="point-submission-dialog"><span aria-hidden="true">＋</span> Ajukan Poin Kegiatan Baru</button>
      <dialog class="submission-dialog" id="point-submission-dialog" aria-labelledby="point-form-title">
        <form class="submission-form" id="point-submission-form">
          <header class="submission-header"><h2 id="point-form-title"><span aria-hidden="true">♙</span> Input Pengajuan Poin Kegiatan</h2><button class="dialog-close" type="button" data-close-dialog aria-label="Tutup formulir">×</button></header>
          <div class="submission-body">
            <label class="form-field">1. Kategori &amp; Peran Kegiatan (Poin Ditentukan Otomatis):
              <select id="point-category" required>
                <option value="fch4">Formasi Cerdas Humanis 4 (FCH 4) — Menjadi anggota pengurus</option>
                <option value="fch1">Formasi Cerdas Humanis 1 (FCH 1) — Menjadi peserta kegiatan</option>
                <option value="fch2">Formasi Cerdas Humanis 2 (FCH 2) — Menjadi peserta pelatihan</option>
                <option value="fch3">Formasi Cerdas Humanis 3 (FCH 3) — Menjadi panitia kegiatan</option>
                <option value="organization">Organisasi Kemahasiswaan — Menjadi ketua organisasi</option>
                <option value="committee">Sertifikasi Kepanitiaan — Menjadi anggota panitia</option>
              </select>
            </label>
            <section class="points-auto-info" aria-live="polite">
              <div><span>♙</span> Jumlah Poin Ditentukan Sistem: <strong id="calculated-point-value">+30 Poin</strong></div>
              <p>ⓘ Jumlah poin otomatis terkunci dan tidak dapat diubah oleh mahasiswa. Besaran poin dihitung resmi berdasarkan pedoman kategori kegiatan Universitas Sanata Dharma.</p>
            </section>
            <div class="category-detail"><p><span>Bidang:</span> <strong id="point-category-field">Formasi Cerdas Humanis</strong></p><p><span>Peran:</span> <strong id="point-category-role">Menjadi anggota pengurus organisasi</strong></p><p>Softskills yang Dikembangkan: Keterampilan bekerja sama (teamwork), Keterampilan manajerial, Integritas</p></div>
            <label class="form-field">2. Nama Spesifik Kegiatan / Acara:
              <input name="activity" type="text" maxlength="120" placeholder="Contoh: Panitia Malam Keakraban Informatika 2025" required>
            </label>
            <label class="form-field">3. Unit / Badan Penyelenggara:
              <input name="organizer" type="text" maxlength="100" value="Informatika FST USD" required>
            </label>
            <label class="form-field">4. Waktu / Periode Kegiatan:
              <input name="period" type="text" maxlength="60" placeholder="Tahun 2026" required>
            </label>
            <label class="form-field">5. Unggah Bukti Sertifikat / SK Tugas (PDF / JPG)
              <span class="file-picker"><span aria-hidden="true">⇧</span><strong>Pilih Berkas Bukti Kegiatan</strong><small>PDF, JPG, PNG maksimal 5MB</small><input name="evidence" type="file" accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png" required></span>
            </label>
            <p class="form-error" id="point-form-error" role="alert"></p>
            <button class="primary-button form-submit-button" type="submit">▣ &nbsp; Kirim Pengajuan (+30 Poin)</button>
          </div>
        </form>
      </dialog>`,
  },
  drs: {
    title: "DRS · Rencana Studi",
    category: "AKADEMIK",
    description: "Pratinjau daftar rencana studi. Pilih mata kuliah untuk simulasi KRS.",
    content: `
      <div class="notice-card page-notice"><span class="notice-icon" aria-hidden="true">i</span><div><strong>Simulasi rencana studi</strong><p>Pilihan tersimpan sementara di halaman ini saja dan tidak dikirim ke kampus.</p></div></div>
      <div class="page-toolbar"><div class="week-label"><strong>Semester Genap 2025/2026</strong><span>Batas maksimal: 24 SKS</span></div><span class="status-badge"><i></i> Perencanaan</span></div>
      <div class="content-card table-card"><div class="content-card-heading"><div><p class="eyebrow section-eyebrow">KATALOG SEMESTER</p><h3>Pilih mata kuliah</h3></div><span class="sample-tag"><span id="selected-credits">0</span> / 24 SKS</span></div>
        <div class="table-scroll"><table><thead><tr><th>Pilih</th><th>Mata kuliah</th><th>Kode</th><th>SKS</th><th>Prasyarat</th></tr></thead><tbody>
          <tr><td><input class="course-choice" type="checkbox" data-credits="3" aria-label="Pilih Pemrograman Web"></td><td>Pemrograman Web</td><td>IF301</td><td>3</td><td>Basis Data</td></tr>
          <tr><td><input class="course-choice" type="checkbox" data-credits="3" aria-label="Pilih Keamanan Informasi"></td><td>Keamanan Informasi</td><td>IF305</td><td>3</td><td>Jaringan Komputer</td></tr>
          <tr><td><input class="course-choice" type="checkbox" data-credits="3" aria-label="Pilih Kecerdasan Buatan"></td><td>Kecerdasan Buatan</td><td>IF310</td><td>3</td><td>Struktur Data</td></tr>
          <tr><td><input class="course-choice" type="checkbox" data-credits="2" aria-label="Pilih Etika Profesi"></td><td>Etika Profesi</td><td>MK201</td><td>2</td><td>—</td></tr>
          <tr><td><input class="course-choice" type="checkbox" data-credits="3" aria-label="Pilih Pemrograman Aplikasi Bergerak"></td><td>Pemrograman Aplikasi Bergerak</td><td>IF315</td><td>3</td><td>Pemrograman Web</td></tr>
        </tbody></table></div>
        <div class="table-actions"><span id="course-selection-status">Belum ada mata kuliah dipilih</span><button class="primary-button" type="button" id="save-study-plan">Simpan simulasi</button></div>
      </div>`,
  },
  "jadwal-dosen": {
    title: "Jadwal Dosen",
    category: "AKADEMIK",
    description: "Informasi jadwal mengajar dosen untuk membantu konsultasi akademik.",
    content: `
      <div class="page-toolbar"><label class="select-field">Pilih dosen
        <select id="lecturer-filter" aria-label="Pilih dosen"><option value="Semua">Semua dosen</option><option value="Dr. Siti Rahma">Dr. Siti Rahma, M.Kom.</option><option value="R. Pratama">R. Pratama, M.T.</option><option value="Dr. A. Nugraha">Dr. A. Nugraha, M.Kom.</option><option value="F. Lestari">F. Lestari, M.Kom.</option></select>
      </label><span class="sample-tag">Jadwal contoh</span></div>
      <div class="content-card table-card"><div class="content-card-heading"><div><p class="eyebrow section-eyebrow">SEMESTER GENAP 2025/2026</p><h3>Jadwal mengajar</h3></div></div>
        <div class="table-scroll"><table><thead><tr><th>Dosen</th><th>Hari</th><th>Waktu</th><th>Mata kuliah</th><th>Ruang</th></tr></thead><tbody id="lecturer-rows">
          <tr data-lecturer="Dr. Siti Rahma"><td>Dr. Siti Rahma, M.Kom.</td><td>Senin</td><td>08.00–09.40</td><td>Basis Data</td><td>Lab 2</td></tr>
          <tr data-lecturer="R. Pratama"><td>R. Pratama, M.T.</td><td>Senin</td><td>10.00–11.40</td><td>Interaksi Manusia Komputer</td><td>R. 301</td></tr>
          <tr data-lecturer="Dr. A. Nugraha"><td>Dr. A. Nugraha, M.Kom.</td><td>Selasa</td><td>09.00–10.40</td><td>Rekayasa Perangkat Lunak</td><td>R. 204</td></tr>
          <tr data-lecturer="F. Lestari"><td>F. Lestari, M.Kom.</td><td>Rabu</td><td>13.00–14.40</td><td>Analisis dan Desain Sistem</td><td>R. 105</td></tr>
        </tbody></table></div>
      </div>`,
  },
  profil: {
    title: "Profil Mahasiswa",
    category: "AKUN",
    description: "Lihat informasi biodata akademik dan status studi mahasiswa.",
    content: `
      <section class="student-profile-card">
        <div class="student-profile-top">
          <div class="profile-portrait"><svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><circle cx="16" cy="10" r="5" stroke="currentColor" stroke-width="2.2"/><path d="M7.5 27v-2a8.5 8.5 0 0 1 17 0v2" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg><span aria-hidden="true">✿</span></div>
          <strong class="student-profile-name">${escapeHTML(profileData.name)}</strong>
          <span class="student-profile-meta">245314034 • Informatika (S-1)</span>
          <div class="student-profile-badges"><span class="profile-status">◉ Aktif</span><span class="profile-semester">Semester 4</span></div>
          <div class="student-profile-stats"><div><strong>3.26</strong><span>IPK</span></div><div><strong>84</strong><span>SKS Lulus</span></div><div><strong>A / B+</strong><span>Predikat</span></div></div>
        </div>
        <section class="biodata-card">
          <h2><span aria-hidden="true">♧</span> Biodata Akademik Mahasiswa</h2>
          <dl class="biodata-list">
            <div><dt>Perguruan Tinggi</dt><dd>Universitas Sanata Dharma</dd></div>
            <div><dt>Fakultas</dt><dd>Sains dan Teknologi</dd></div>
            <div><dt>Jalur Masuk</dt><dd>Prestasi</dd></div>
            <div><dt>Dosen Pembimbing</dt><dd>Prof. Dr. Ir. Anastasia Rita Widiarti</dd></div>
            <div><dt>Email Student</dt><dd><a href="mailto:${escapeHTML(profileData.email)}">${escapeHTML(profileData.email)}</a></dd></div>
            <div><dt>Nomor Telepon</dt><dd><a href="tel:${escapeHTML(profileData.phone.replace(/[^\d+]/g, ""))}">${escapeHTML(profileData.phone)}</a></dd></div>
          </dl>
        </section>
      </section>
      <div class="profile-actions"><button class="primary-button" type="button" data-open-dialog="profile-edit-dialog"><span aria-hidden="true">✎</span> Perbarui Data Diri</button><button class="logout-button" type="button" data-message="Logout tidak tersedia pada pratinjau tanpa sistem akun.">⇥ &nbsp; Keluar Akun (Logout)</button></div>
      <dialog class="submission-dialog profile-edit-dialog" id="profile-edit-dialog" aria-labelledby="profile-edit-title">
        <form class="submission-form" id="profile-edit-form">
          <header class="submission-header"><h2 id="profile-edit-title">Perbarui Data Diri</h2><button class="dialog-close" type="button" data-close-dialog aria-label="Tutup formulir">×</button></header>
          <div class="submission-body">
            <p class="inline-note">Perubahan hanya berlaku selama halaman pratinjau ini terbuka.</p>
            <label class="form-field">Nama lengkap<input name="fullName" value="${escapeHTML(profileData.name)}" required></label>
            <label class="form-field">Email student<input name="email" type="email" value="${escapeHTML(profileData.email)}" required></label>
            <label class="form-field">Nomor telepon<input name="phone" type="tel" value="${escapeHTML(profileData.phone)}" required></label>
            <button class="primary-button form-submit-button" type="submit">Simpan Data Diri</button>
          </div>
        </form>
      </dialog>`,
  },
  kegiatan: {
    title: "Kegiatan Mahasiswa",
    category: "KEMAHASISWAAN",
    description: "Temukan kegiatan, organisasi, dan kesempatan berpartisipasi di kampus.",
    content: `
      <div class="summary-grid summary-grid-three">
        <article class="summary-card"><span>Poin partisipasi</span><strong>245</strong><small>Poin contoh terkumpul</small></article>
        <article class="summary-card"><span>Kegiatan diikuti</span><strong>8</strong><small>Selama tahun akademik ini</small></article>
        <article class="summary-card"><span>Organisasi</span><strong>2</strong><small>Keanggotaan aktif</small></article>
      </div>
      <div class="content-card"><div class="content-card-heading"><div><p class="eyebrow section-eyebrow">AGENDA KAMPUS</p><h3>Kegiatan mendatang</h3></div><span class="sample-tag">Agenda contoh</span></div>
        <div class="event-list"><article class="event-row"><div class="event-date"><strong>22</strong><span>FEB</span></div><div class="event-description"><strong>Workshop Karier Digital</strong><p>Seminar · Auditorium kampus · 09.00</p></div><button class="secondary-button" type="button" data-message="Pendaftaran kegiatan contoh belum terhubung.">Detail</button></article><article class="event-row"><div class="event-date"><strong>28</strong><span>FEB</span></div><div class="event-description"><strong>Aksi Peduli Lingkungan</strong><p>Pengabdian · Taman kampus · 07.30</p></div><button class="secondary-button" type="button" data-message="Pendaftaran kegiatan contoh belum terhubung.">Detail</button></article><article class="event-row"><div class="event-date"><strong>05</strong><span>MAR</span></div><div class="event-description"><strong>Kompetisi Inovasi Mahasiswa</strong><p>Kompetisi · Gedung F · 13.00</p></div><button class="secondary-button" type="button" data-message="Pendaftaran kegiatan contoh belum terhubung.">Detail</button></article></div>
      </div>
      <button class="text-link points-link" type="button" data-route="poin-kemahasiswaan">Lihat riwayat poin kemahasiswaan <span aria-hidden="true">→</span></button>`,
  },
};

const academicServiceRoutes = ["nilai", "lpkp", "drs", "jadwal-mahasiswa", "keuangan", "jadwal-dosen"];

const academicServiceIcons = {
  nilai: '<svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="m16 3.5 3.8 7.7 8.5 1.2-6.2 6 1.5 8.5-7.6-4-7.6 4 1.5-8.5-6.2-6 8.5-1.2L16 3.5Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
  lpkp: '<svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M4 9a3 3 0 0 1 3-3h7l3 3h8a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V9Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="m10 18 4 4 8-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  drs: '<svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M5 10a3 3 0 0 1 3-3h7l3 3h6a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V10Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M5.5 13h21" stroke="currentColor" stroke-width="2"/></svg>',
  "jadwal-mahasiswa": '<svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><rect x="5" y="7" width="22" height="20" rx="3" stroke="currentColor" stroke-width="2"/><path d="M10 4v6m12-6v6M5 13h22m-15 5h.01M16 18h.01M21 18h.01M12 22h.01M17 22h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  keuangan: '<svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><rect x="4" y="7" width="24" height="18" rx="3" stroke="currentColor" stroke-width="2"/><path d="M4 13h24m-17 6h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  "jadwal-dosen": '<svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><rect x="4" y="6" width="24" height="22" rx="3" stroke="currentColor" stroke-width="2"/><path d="M10 3v6m12-6v6M4 12h24" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="20.5" cy="21" r="5.5" fill="white" stroke="currentColor" stroke-width="2"/><path d="M20.5 18.5V21l2 1.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
};

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

function renderPointEntries() {
  const list = document.querySelector("#point-entry-list");
  if (!list) return;
  const verifiedPoints = pointsEntries
    .filter((entry) => entry.status.startsWith("Divalidasi"))
    .reduce((total, entry) => total + entry.points, 0);
  const pendingPoints = pointsEntries
    .filter((entry) => !entry.status.startsWith("Divalidasi"))
    .reduce((total, entry) => total + entry.points, 0);
  document.querySelector("#points-total").textContent = String(verifiedPoints);
  document.querySelector("#points-verified").textContent = String(verifiedPoints);
  document.querySelector("#points-pending").textContent = String(pendingPoints);
  document.querySelector("#points-entry-count").textContent = `${pointsEntries.length} Kegiatan Tercatat`;
  list.innerHTML = pointsEntries.map((entry) => `
    <article class="point-entry-card">
      <span class="point-entry-icon" aria-hidden="true">♧</span>
      <div class="point-entry-content">
        <span class="point-entry-category">${escapeHTML(entry.category)}</span>
        <h3>${escapeHTML(entry.title)}</h3>
        <p>${escapeHTML(entry.organization)}</p>
        <div class="point-entry-meta"><span>▦ ${escapeHTML(entry.date)}</span><span>◷ ${escapeHTML(entry.status)}</span></div>
      </div>
      <strong class="point-entry-value">+${entry.points} <small>Poin</small></strong>
    </article>`).join("");
}

function updatePointCategory() {
  const category = document.querySelector("#point-category");
  if (!category) return;
  const selection = pointCategories[category.value];
  const value = `+${selection.points} Poin`;
  document.querySelector("#calculated-point-value").textContent = value;
  document.querySelector("#point-category-field").textContent = selection.field;
  document.querySelector("#point-category-role").textContent = selection.role;
  document.querySelector(".form-submit-button").textContent = `▣  Kirim Pengajuan (${value})`;
}

function updateProfileDetails() {
  if (!document.querySelector(".student-profile-name")) return;
  document.querySelector(".student-profile-name").textContent = profileData.name;
  const emailLink = document.querySelector('.biodata-list a[href^="mailto:"]');
  emailLink.href = `mailto:${profileData.email}`;
  emailLink.textContent = profileData.email;
  const phoneLink = document.querySelector('.biodata-list a[href^="tel:"]');
  phoneLink.href = `tel:${profileData.phone.replace(/[^\d+]/g, "")}`;
  phoneLink.textContent = profileData.phone;
  document.querySelector('#profile-edit-form [name="fullName"]').value = profileData.name;
  document.querySelector('#profile-edit-form [name="email"]').value = profileData.email;
  document.querySelector('#profile-edit-form [name="phone"]').value = profileData.phone;
}

function showMessage(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("is-visible"), 2800);
}

function renderAcademicHub() {
  const cards = academicServiceRoutes.map((route) => {
    const service = services[route];
    return `<button class="hub-card academic-service-card" type="button" data-route="${route}"><span class="academic-service-icon academic-icon-${route}">${academicServiceIcons[route]}</span><span class="academic-service-copy"><strong>${service.title === "Kartu Keuangan Mahasiswa" ? "Kartu Keuangan (UKT)" : service.title === "Jadwal Mahasiswa" ? "Jadwal Kuliah Mahasiswa" : service.title === "Nilai per Semester" ? "Nilai per Semester (KHS)" : service.title}</strong><span class="hub-card-description">${service.description}</span></span><span class="hub-card-arrow" aria-hidden="true">›</span></button>`;
  }).join("");

  return `
    <div class="academic-list-heading"><button class="academic-home-link" type="button" data-route="beranda">← Beranda</button><h1>Akademik</h1></div>
    <div class="academic-service-list">${cards}</div>
    <div class="notice-card page-notice"><span class="notice-icon" aria-hidden="true">i</span><div><strong>Pratinjau antarmuka</strong><p>Login, data pribadi, dan layanan kampus belum terhubung ke sistem akademik.</p></div></div>`;
}

function renderService(route) {
  const service = services[route];
  const backRoute = route === "poin-kemahasiswaan" || route === "kegiatan" ? "beranda" : "akademik";
  const backLabel = route === "poin-kemahasiswaan" ? "Beranda" : "Kembali";
  return `
    <div class="page-heading-row">
      <div class="page-intro"><p class="eyebrow section-eyebrow">${service.category} <span class="eyebrow-line"></span> DATA PRATINJAU</p><h1>${service.title}</h1><p>${service.description}</p></div>
      <button class="back-button" type="button" data-route="${backRoute}"><span aria-hidden="true">←</span> ${backLabel}</button>
    </div>
    ${service.content}`;
}

function renderRoute() {
  const route = window.location.hash.replace(/^#\/?/, "") || "beranda";
  const validRoute = route === "beranda" || route === "akademik" || Object.hasOwn(services, route);
  const selectedRoute = validRoute ? route : "beranda";

  if (selectedRoute === "beranda") {
    main.innerHTML = homeContent;
  } else if (selectedRoute === "akademik") {
    main.innerHTML = renderAcademicHub();
  } else {
    main.innerHTML = renderService(selectedRoute);
  }

  main.dataset.route = selectedRoute;
  if (selectedRoute === "nilai") {
    updateGrades(document.querySelector("#grade-semester").value);
  }
  if (selectedRoute === "poin-kemahasiswaan") {
    renderPointEntries();
  }
  if (selectedRoute === "profil") {
    updateProfileDetails();
  }

  const activeTab = selectedRoute === "beranda"
    ? "beranda"
    : selectedRoute === "kegiatan" || selectedRoute === "poin-kemahasiswaan"
      ? "kegiatan"
      : selectedRoute === "profil"
        ? "profil"
        : "akademik";

  document.querySelectorAll(".nav-item").forEach((item) => {
    const isActive = item.dataset.route === activeTab;
    item.classList.toggle("is-active", isActive);
    if (isActive) {
      item.setAttribute("aria-current", "page");
    } else {
      item.removeAttribute("aria-current");
    }
  });
  document.querySelectorAll(".desktop-nav [data-route]").forEach((item) => {
    const isActive = item.dataset.route === activeTab;
    item.classList.toggle("is-active", isActive);
    if (isActive) {
      item.setAttribute("aria-current", "page");
    } else {
      item.removeAttribute("aria-current");
    }
  });

  document.title = selectedRoute === "beranda"
    ? "Beranda Akademik — SIA"
    : `${selectedRoute === "akademik" ? "Layanan akademik" : services[selectedRoute].title} — SIA`;
  main.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "instant" });
}

function updateGrades(semester) {
  const gradeData = {
    "5": {
      gpa: "3.91",
      credits: "20",
      courses: [
        ["Basis Data", "IF202", "4", "A", "16.00"],
        ["Interaksi Manusia Komputer", "IF204", "3", "A", "12.00"],
        ["Rekayasa Perangkat Lunak", "IF206", "3", "A-", "11.25"],
        ["Analisis dan Desain Sistem", "IF208", "3", "A", "12.00"],
        ["Jaringan Komputer", "IF210", "4", "A-", "15.00"],
        ["Metodologi Penelitian", "IF212", "3", "A", "12.00"],
      ],
    },
    "4": {
      gpa: "3.91",
      credits: "20",
      courses: [
        ["Struktur Data", "IF201", "4", "A", "16.00"],
        ["Pemrograman Berorientasi Objek", "IF203", "3", "A", "12.00"],
        ["Statistika", "IF205", "3", "A-", "11.25"],
        ["Sistem Operasi", "IF207", "3", "A", "12.00"],
        ["Manajemen Proyek TI", "IF209", "4", "A-", "15.00"],
        ["Bahasa Inggris", "MK104", "3", "A", "12.00"],
      ],
    },
    "3": {
      gpa: "3.74",
      credits: "19",
      courses: [
        ["Algoritma dan Pemrograman", "IF101", "4", "A-", "15.00"],
        ["Matematika Diskrit", "IF103", "3", "B+", "9.75"],
        ["Pengantar Sistem Informasi", "IF105", "3", "A", "12.00"],
        ["Arsitektur Komputer", "IF107", "3", "A-", "11.25"],
        ["Komunikasi Bisnis", "MK102", "3", "A", "12.00"],
        ["Kewarganegaraan", "MK106", "3", "A", "12.00"],
      ],
    },
  };
  const result = gradeData[semester];
  document.querySelector("#semester-gpa").textContent = result.gpa;
  document.querySelector("#semester-credits").textContent = result.credits;
  document.querySelector("#semester-count").textContent = String(result.courses.length);
  document.querySelector("#grade-rows").innerHTML = result.courses.map((course) =>
    `<tr><td>${course[0]}</td><td>${course[1]}</td><td>${course[2]}</td><td><span class="grade-badge">${course[3]}</span></td><td>${course[4]}</td></tr>`
  ).join("");
}

function updateUnreadCount() {
  const unreadCount = notificationDialog.querySelectorAll(".notification-card.is-unread").length;
  const notificationDot = notificationButton.querySelector(".notification-dot");
  notificationDot.hidden = unreadCount === 0;
  notificationButton.setAttribute(
    "aria-label",
    unreadCount ? `Lihat notifikasi, ${unreadCount} belum dibaca` : "Lihat notifikasi",
  );
  markReadButton.disabled = unreadCount === 0;
  markReadButton.innerHTML = unreadCount
    ? '<span aria-hidden="true">✓</span> Tandai Semua Sudah Dibaca'
    : '<span aria-hidden="true">✓</span> Semua Notifikasi Sudah Dibaca';
}

function closeNotifications() {
  if (notificationDialog.hidden) return;
  notificationDialog.hidden = true;
  notificationTrigger?.focus();
}

document.addEventListener("click", (event) => {
  const openDialogButton = event.target.closest("[data-open-dialog]");
  if (openDialogButton) {
    document.querySelector(`#${openDialogButton.dataset.openDialog}`).showModal();
    return;
  }

  if (event.target.closest("[data-close-dialog]")) {
    event.target.closest("dialog").close();
    return;
  }

  const routeLink = event.target.closest("[data-route]");
  if (routeLink) {
    if (routeLink.closest(".notification-card")) {
      routeLink.closest(".notification-card").classList.remove("is-unread");
      updateUnreadCount();
    }
    closeNotifications();
    if (routeLink instanceof HTMLAnchorElement) {
      event.preventDefault();
    }
    const route = routeLink.dataset.route;
    if (window.location.hash === `#/${route}`) {
      renderRoute();
    } else {
      window.location.hash = `/${route}`;
    }
    return;
  }

  const messageButton = event.target.closest("[data-message]");
  if (messageButton) {
    showMessage(messageButton.dataset.message);
    return;
  }

  if (event.target.closest("#save-study-plan")) {
    const count = [...document.querySelectorAll(".course-choice:checked")].length;
    showMessage(count ? "Simulasi rencana studi berhasil disimpan di halaman ini." : "Pilih minimal satu mata kuliah terlebih dahulu.");
  }
});

document.addEventListener("change", (event) => {
  if (event.target.id === "point-category") {
    updatePointCategory();
  }

  if (event.target.matches('input[name="evidence"]')) {
    const file = event.target.files[0];
    const error = document.querySelector("#point-form-error");
    if (file && file.size > 5 * 1024 * 1024) {
      event.target.value = "";
      event.target.closest(".file-picker").querySelector("strong").textContent = "Pilih Berkas Bukti Kegiatan";
      error.textContent = "Ukuran berkas melebihi 5MB. Pilih berkas yang lebih kecil.";
      return;
    }
    if (error) {
      error.textContent = "";
      event.target.closest(".file-picker").querySelector("strong").textContent = file?.name || "Pilih Berkas Bukti Kegiatan";
    }
  }

  if (event.target.id === "grade-semester") {
    updateGrades(event.target.value);
  }

  if (event.target.id === "lecturer-filter") {
    document.querySelectorAll("[data-lecturer]").forEach((row) => {
      row.hidden = event.target.value !== "Semua" && row.dataset.lecturer !== event.target.value;
    });
  }

  if (event.target.matches(".course-choice")) {
    const choices = [...document.querySelectorAll(".course-choice:checked")];
    const credits = choices.reduce((total, choice) => total + Number(choice.dataset.credits), 0);
    const selectionStatus = document.querySelector("#course-selection-status");
    document.querySelector("#selected-credits").textContent = String(credits);
    selectionStatus.textContent = choices.length
      ? `${choices.length} mata kuliah dipilih`
      : "Belum ada mata kuliah dipilih";
    if (credits > 24) {
      event.target.checked = false;
      showMessage("Batas simulasi rencana studi adalah 24 SKS.");
      event.target.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }
});

document.addEventListener("submit", (event) => {
  if (event.target.id === "point-submission-form") {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const file = data.get("evidence");
    const error = document.querySelector("#point-form-error");
    const category = pointCategories[document.querySelector("#point-category").value];
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    const allowedExtension = file instanceof File && /\.(pdf|jpe?g|png)$/i.test(file.name);
    if (!(file instanceof File) || (!allowedTypes.includes(file.type) && !allowedExtension)) {
      error.textContent = "Pilih berkas bukti berformat PDF, JPG, atau PNG.";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      error.textContent = "Ukuran berkas melebihi 5MB. Pilih berkas yang lebih kecil.";
      return;
    }
    pointsEntries.push({
      category: category.field,
      title: data.get("activity").trim(),
      organization: data.get("organizer").trim(),
      date: data.get("period").trim(),
      points: category.points,
      status: "Menunggu verifikasi",
    });
    renderRoute();
    showMessage("Pengajuan ditambahkan ke pratinjau lokal dan menunggu verifikasi. Data tidak dikirim ke sistem kampus.");
    return;
  }

  if (event.target.id === "profile-edit-form") {
    event.preventDefault();
    const data = new FormData(event.target);
    profileData.name = data.get("fullName").trim();
    profileData.email = data.get("email").trim();
    profileData.phone = data.get("phone").trim();
    renderRoute();
    showMessage("Biodata diperbarui untuk pratinjau ini saja.");
  }
});

document.addEventListener("click", (event) => {
  const dayTab = event.target.closest("[data-day]");
  if (!dayTab) return;
  document.querySelectorAll(".day-tab").forEach((tab) => {
    tab.classList.toggle("is-selected", tab === dayTab);
  });
  document.querySelectorAll("[data-schedule-day]").forEach((row) => {
    row.hidden = dayTab.dataset.day !== "Semua" && row.dataset.scheduleDay !== dayTab.dataset.day;
  });
});

notificationButton.addEventListener("click", () => {
  notificationTrigger = document.activeElement;
  notificationDialog.hidden = false;
  notificationCloseButton.focus();
  updateUnreadCount();
});

notificationCloseButton.addEventListener("click", closeNotifications);

notificationDialog.addEventListener("click", (event) => {
  if (event.target === notificationDialog) closeNotifications();
});

markReadButton.addEventListener("click", () => {
  notificationDialog.querySelectorAll(".notification-card").forEach((card) => {
    card.classList.remove("is-unread");
  });
  updateUnreadCount();
});

document.addEventListener("keydown", (event) => {
  if (notificationDialog.hidden) return;
  if (event.key === "Escape") {
    closeNotifications();
    return;
  }
  if (event.key !== "Tab") return;

  const focusableElements = notificationDialog.querySelectorAll(
    'button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), [tabindex]:not([tabindex="-1"])',
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
});

window.addEventListener("hashchange", renderRoute);
window.addEventListener("DOMContentLoaded", () => {
  if (!window.location.hash) {
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#/beranda`);
  }
  renderRoute();
  updateUnreadCount();
});
