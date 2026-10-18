const main = document.querySelector("#main-content");
const homeContent = main.innerHTML;
const toast = document.querySelector(".toast");
const notificationButton = document.querySelector(".notification-button");
const notificationDialog = document.querySelector("#notification-dialog");
const notificationCloseButton = document.querySelector(".notification-close");
const markReadButton = document.querySelector(".mark-read-button");
let toastTimeout;
let notificationTrigger;

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
    description: "Lihat rekam partisipasi organisasi, kepanitiaan, dan kegiatan kampus.",
    content: `
      <div class="points-hero"><div><span>TOTAL POIN TERKUMPUL</span><strong>245 <small>poin</small></strong><p>Akumulasi kegiatan kemahasiswaan · data contoh</p></div><div class="points-medal" aria-hidden="true">★</div></div>
      <div class="summary-grid summary-grid-three">
        <article class="summary-card"><span>Akademik</span><strong>80</strong><small>Seminar dan kompetisi</small></article>
        <article class="summary-card"><span>Organisasi</span><strong>105</strong><small>Kepengurusan dan kepanitiaan</small></article>
        <article class="summary-card"><span>Pengabdian</span><strong>60</strong><small>Kegiatan sosial dan sukarela</small></article>
      </div>
      <div class="content-card table-card"><div class="content-card-heading"><div><p class="eyebrow section-eyebrow">AKTIVITAS</p><h3>Riwayat kegiatan</h3></div><span class="sample-tag">Data contoh</span></div>
        <div class="table-scroll"><table><thead><tr><th>Kegiatan</th><th>Kategori</th><th>Tanggal</th><th>Poin</th><th>Status</th></tr></thead><tbody><tr><td>Panitia seminar teknologi</td><td>Organisasi</td><td>18 Okt 2025</td><td>40</td><td><span class="table-status status-paid">Terverifikasi</span></td></tr><tr><td>Relawan literasi digital</td><td>Pengabdian</td><td>08 Nov 2025</td><td>30</td><td><span class="table-status status-paid">Terverifikasi</span></td></tr><tr><td>Peserta workshop UI/UX</td><td>Akademik</td><td>12 Des 2025</td><td>20</td><td><span class="table-status status-pending">Menunggu</span></td></tr></tbody></table></div>
      </div>`,
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
    description: "Informasi profil mahasiswa. Data identitas di bawah ini hanya contoh.",
    content: `
      <div class="profile-panel"><div class="profile-cover"></div><div class="profile-details"><div class="profile-avatar-large">M</div><div class="profile-name"><h3>Mahasiswa</h3><p>mahasiswa@example.ac.id</p></div><span class="status-badge"><i></i> Mahasiswa aktif</span></div></div>
      <div class="content-card"><div class="content-card-heading"><div><p class="eyebrow section-eyebrow">IDENTITAS AKADEMIK</p><h3>Informasi mahasiswa</h3></div><button class="secondary-button" type="button" data-message="Fitur ubah profil memerlukan akun dan server kampus.">Ubah profil</button></div>
        <dl class="detail-grid"><div><dt>Nama lengkap</dt><dd>Mahasiswa</dd></div><div><dt>Nomor induk mahasiswa</dt><dd>245314034</dd></div><div><dt>Program studi</dt><dd>Sistem Informasi</dd></div><div><dt>Fakultas</dt><dd>Ilmu Komputer</dd></div><div><dt>Angkatan</dt><dd>2024</dd></div><div><dt>Dosen pembimbing akademik</dt><dd>Dr. Siti Rahma, M.Kom.</dd></div></dl>
      </div>
      <p class="inline-note">Jangan masukkan data pribadi ke halaman pratinjau. Profil ini hanya contoh tampilan.</p>`,
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

const academicServiceRoutes = ["nilai", "lpkp", "keuangan", "jadwal-mahasiswa", "poin-kemahasiswaan", "drs", "jadwal-dosen", "profil"];

function showMessage(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("is-visible"), 2800);
}

function renderAcademicHub() {
  const cards = academicServiceRoutes.map((route) => {
    const service = services[route];
    return `<button class="hub-card" type="button" data-route="${route}"><span class="hub-card-category">${service.category}</span><strong>${service.title}</strong><span class="hub-card-description">${service.description}</span><span class="hub-card-arrow" aria-hidden="true">→</span></button>`;
  }).join("");

  return `
    <section class="page-intro"><p class="eyebrow section-eyebrow">MENU UTAMA</p><h1>Layanan akademik</h1><p>Pilih layanan yang ingin kamu buka. Setiap halaman saat ini menampilkan data pratinjau.</p></section>
    <div class="hub-grid">${cards}</div>
    <div class="notice-card page-notice"><span class="notice-icon" aria-hidden="true">i</span><div><strong>Pratinjau antarmuka</strong><p>Login, data pribadi, dan layanan kampus belum terhubung ke sistem akademik.</p></div></div>`;
}

function renderService(route) {
  const service = services[route];
  return `
    <div class="page-heading-row">
      <div class="page-intro"><p class="eyebrow section-eyebrow">${service.category} <span class="eyebrow-line"></span> DATA PRATINJAU</p><h1>${service.title}</h1><p>${service.description}</p></div>
      <button class="back-button" type="button" data-route="${route === "kegiatan" ? "beranda" : "akademik"}"><span aria-hidden="true">←</span> Kembali</button>
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
