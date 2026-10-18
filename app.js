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
  fch4_officer: {
    label: "Formasi Cerdas Humanis 4 (FCH 4) — Menjadi anggota pengurus BEM/DPM Fakultas/Jurusan/Prodi",
    points: 30,
    field: "Organisasi & Kepemimpinan",
    role: "Anggota pengurus BEM/DPM Fakultas/Jurusan/Program Studi",
    softskills: "Keterampilan manajerial, kepemimpinan, integritas",
  },
  fch4_committee: {
    label: "Formasi Cerdas Humanis 4 (FCH 4) — Menjadi anggota panitia tingkat universitas",
    points: 20,
    field: "Organisasi & Kepemimpinan",
    role: "Anggota panitia kegiatan tingkat universitas",
    softskills: "Keterampilan bekerja sama, tanggung jawab, komunikasi",
  },
  fch4_faculty_committee: {
    label: "Formasi Cerdas Humanis 4 (FCH 4) — Menjadi anggota panitia tingkat fakultas/prodi",
    points: 15,
    field: "Organisasi & Kepemimpinan",
    role: "Anggota panitia kegiatan tingkat fakultas/program studi",
    softskills: "Keterampilan bekerja sama, tanggung jawab, komunikasi",
  },
  fch4_coordinator: {
    label: "Formasi Cerdas Humanis 4 (FCH 4) — Menjadi koordinator/ketua panitia kegiatan fakultas",
    points: 30,
    field: "Organisasi & Kepemimpinan",
    role: "Koordinator/ketua panitia kegiatan fakultas",
    softskills: "Kepemimpinan, keterampilan manajerial, komunikasi",
  },
  fch3_organization: {
    label: "Formasi Cerdas Humanis 3 (FCH 3) — Pengurus inti UKM/HMPS/komunitas minat bakat",
    points: 25,
    field: "Organisasi & Kepemimpinan",
    role: "Pengurus inti UKM/HMPS/komunitas minat bakat",
    softskills: "Kepemimpinan, kerja sama tim, tanggung jawab",
  },
  fch3_competition: {
    label: "Formasi Cerdas Humanis 3 (FCH 3) — Juara/finalis kompetisi ilmiah, hackathon/lomba",
    points: 20,
    field: "Kompetisi & Prestasi",
    role: "Juara/finalis kompetisi ilmiah, hackathon, atau lomba",
    softskills: "Berpikir kritis, kreativitas, ketekunan",
  },
  fch1_workshop: {
    label: "Formasi Cerdas Humanis 1 (FCH 1) — Peserta aktif workshop/sertifikasi keahlian komputasi",
    points: 10,
    field: "Pelatihan & Seminar",
    role: "Peserta aktif workshop/sertifikasi keahlian komputasi",
    softskills: "Kompetensi teknis, adaptabilitas, teknologi",
  },
  insa_committee: {
    label: "Inisiasi Sanata Dharma (INSADHA) — Pendamping/panitia inisiasi mahasiswa baru",
    points: 15,
    field: "Pengabdian & Kemahasiswaan",
    role: "Pendamping/panitia Inisiasi Mahasiswa Baru USD",
    softskills: "Kepedulian, komunikasi, kerja sama",
  },
};

const studentSchedule = [
  { day: "Senin", code: "SDEV204", credits: 3, title: "Algoritma Optimisasi (AO) – Kelas A", time: "07:00 – 09:50 WIB", room: "K.204", lecturer: "Ir. Drs. Haris Sriwindono, M.Kom., Ph.D." },
  { day: "Senin", code: "SNET52W", credits: 3, title: "Virtualisasi dan Teknologi Cloud (VIRTEC) – Kelas A", time: "10:00 – 12:50 WIB", room: "Lab Jaringan", lecturer: "Henricus Agung Hermawan, S.Kom., M.Cs." },
  { day: "Senin", code: "INFO118", credits: 2, title: "Proyek Informatika – Kelas A / AP", time: "13:00 – 16:50 WIB", room: "Lab Basis Data", lecturer: "Agnes Maria Polina, S.Kom., M.Sc." },
  { day: "Selasa", code: "NETW203", credits: 3, title: "Jaringan Komputer (JARKOM) – Kelas A", time: "07:00 – 09:50 WIB", room: "Lab Jaringan", lecturer: "Dr. Alb. Agung Hadiatma, M.T." },
  { day: "Selasa", code: "SDEV207", credits: 3, title: "User Interface / User Experience (UI/UX) – Kelas A", time: "13:00 – 15:50 WIB", room: "K.205", lecturer: "Prof. Dr. Ir. Anastasia Rita Widiarti" },
  { day: "Rabu", code: "NETW201", credits: 3, title: "TCP/IP – Kelas A", time: "10:00 – 12:50 WIB", room: "Lab Jaringan", lecturer: "Dr. Alb. Agung Hadiatma, M.T." },
  { day: "Kamis", code: "INFO117", credits: 2, title: "Kriptografi – Kelas E", time: "07:00 – 09:50 WIB", room: "K.205", lecturer: "Henricus Agung Hermawan, S.Kom., M.Cs." },
];

const lecturerSchedules = [
  {
    name: "Agnes Maria Polina, S.Kom., M.Sc.",
    schedule: [
      { day: "Senin", time: "13:00 – 16:50", code: "INFO118", course: "Proyek Informatika", className: "AP", room: "Lab Basis Data" },
      { day: "Selasa", time: "10:00 – 12:00", code: "INFO103", course: "Analisis Proses Bisnis", className: "B", room: "K.204" },
      { day: "Rabu", time: "08:00 – 09:50", code: "INFO105", course: "Pemrograman Berorientasi Objek", className: "C", room: "Lab Pemrograman" },
      { day: "Jumat", time: "13:00 – 14:50", code: "INFO118", course: "Bimbingan Proyek Informatika", className: "AP", room: "Lab Basis Data" },
    ],
  },
  {
    name: "Dr. Alb. Agung Hadiatma, M.T.",
    schedule: [
      { day: "Senin", time: "08:00 – 09:50", code: "NETW203", course: "Jaringan Komputer", className: "A", room: "Lab Jaringan" },
      { day: "Selasa", time: "13:00 – 14:50", code: "NETW201", course: "TCP/IP", className: "A", room: "Lab Jaringan" },
      { day: "Rabu", time: "10:00 – 12:50", code: "NETW203", course: "Praktikum Jaringan", className: "B", room: "Lab Jaringan" },
    ],
  },
  {
    name: "Prof. Dr. Ir. Anastasia Rita Widiarti",
    schedule: [
      { day: "Selasa", time: "13:00 – 15:50", code: "SDEV207", course: "User Interface / User Experience", className: "A", room: "K.205" },
      { day: "Kamis", time: "10:00 – 12:00", code: "INFO205", course: "Interaksi Manusia dan Komputer", className: "B", room: "K.301" },
    ],
  },
  {
    name: "Ir. Drs. Haris Sriwindono, M.Kom., Ph.D.",
    schedule: [
      { day: "Senin", time: "07:00 – 09:50", code: "SDEV204", course: "Algoritma Optimisasi", className: "A", room: "K.204" },
      { day: "Kamis", time: "13:00 – 15:50", code: "SDEV204", course: "Algoritma Optimisasi", className: "B", room: "K.204" },
    ],
  },
];

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
    title: "Kartu Keuangan Mahasiswa (KKM)",
    category: "KEUANGAN",
    description: "Ringkasan tagihan, riwayat pembayaran, dan informasi pembayaran mahasiswa.",
    content: `
      <section class="finance-overview" aria-label="Ringkasan tagihan keuangan">
        <div class="finance-overview-heading"><strong>Status Tagihan Keuangan Mahasiswa</strong><span class="finance-paid-badge">◉ LUNAS</span></div>
        <p>Total Pembayaran Akumulasi (Lunas)</p>
        <strong class="finance-total-paid">Rp 65.255.000</strong>
        <div class="finance-balance"><span>Total Belum Bayar: Rp 0</span><span>•</span><span>Denda: Rp 0</span></div>
        <div class="finance-payment-note">◷ &nbsp; Dibayar via Bank Virtual Account BR Mahasiswa Sendiri</div>
      </section>
      <div class="finance-tabs" role="tablist" aria-label="Informasi kartu keuangan">
        <button class="finance-tab is-active" type="button" role="tab" id="finance-tab-details" aria-selected="true" aria-controls="finance-panel-details" data-finance-tab="details">Rincian Biaya</button>
        <button class="finance-tab" type="button" role="tab" id="finance-tab-history" aria-selected="false" aria-controls="finance-panel-history" data-finance-tab="history">Riwayat Bayar</button>
        <button class="finance-tab" type="button" role="tab" id="finance-tab-guide" aria-selected="false" aria-controls="finance-panel-guide" data-finance-tab="guide">Tata Cara</button>
      </div>
      <section class="finance-panel finance-detail-card" id="finance-panel-details" role="tabpanel" aria-labelledby="finance-tab-details">
        <div class="finance-panel-heading"><div><strong>Tahun Akademik</strong><span>2026 / 2027 • Gasal</span></div><span class="finance-paid-badge">LUNAS</span></div>
        <dl class="finance-cost-list">
          <div><dt>Uang Kuliah Tunggal (UKT) Tahap I</dt><dd>Rp 2.750.000</dd></div>
          <div><dt>Uang Kuliah Tunggal (UKT) Tahap II</dt><dd>Rp 2.750.000</dd></div>
          <div><dt>Iuran Kemahasiswaan (Kmhs)</dt><dd>Rp 225.000</dd></div>
          <div><dt>Sosial Mahasiswa (Sos Mhs)</dt><dd>Rp 40.000</dd></div>
        </dl>
        <div class="finance-semester-total"><div><strong>Total Tagihan Semester Ini</strong><span>Semua komponen terbayar penuh</span></div><strong>Rp 5.765.000</strong></div>
      </section>
      <section class="finance-panel finance-history-list" id="finance-panel-history" role="tabpanel" aria-labelledby="finance-tab-history" hidden>
        <article class="finance-history-card"><div class="finance-history-heading"><strong>Gasal 2026 / 2027 (Tahap II)</strong><span class="finance-paid-badge">LUNAS</span></div><div class="finance-history-amount">Rp 2.750.000 <span>USD-TRX-2026-01-2901</span></div><div class="finance-history-meta"><span>Bank Virtual Account BR Mahasiswa Sendiri</span><time datetime="2026-01-29">29-01-2026</time></div></article>
        <article class="finance-history-card"><div class="finance-history-heading"><strong>Gasal 2025 / 2026 (Tahap I)</strong><span class="finance-paid-badge">LUNAS</span></div><div class="finance-history-amount">Rp 2.750.000 <span>USD-TRX-2025-08-0408</span></div><div class="finance-history-meta"><span>Bank Virtual Account BR Mahasiswa Sendiri</span><time datetime="2025-08-04">04-08-2025</time></div></article>
        <article class="finance-history-card"><div class="finance-history-heading"><strong>Iuran Kemahasiswaan 2025/2026</strong><span class="finance-paid-badge">LUNAS</span></div><div class="finance-history-amount">Rp 225.000 <span>USD-TRX-2025-08-KMHS</span></div><div class="finance-history-meta"><span>Bank Virtual Account BR Mahasiswa Sendiri</span><time datetime="2025-08-04">04-08-2025</time></div></article>
        <article class="finance-history-card finance-history-total"><div class="finance-history-heading"><strong>Akumulasi Total Pembayaran Mahasiswa</strong><span class="finance-paid-badge">LUNAS</span></div><div class="finance-history-amount">Rp 65.255.000 <span>SISA BELUM BAYAR: Rp 0</span></div><div class="finance-history-meta"><span>Total Bayar Resmi: Rp 65.255.000</span><span>Lunas s/d Semester Berjalan</span></div></article>
      </section>
      <section class="finance-panel finance-guide-card" id="finance-panel-guide" role="tabpanel" aria-labelledby="finance-tab-guide" hidden>
        <h2>Bank Virtual Account Mahasiswa USD</h2>
        <div class="virtual-account"><div><span>Bank BRI Virtual Account (BR Mahasiswa)</span><strong id="bri-account">10238245134034</strong></div><button type="button" data-copy-account="bri-account">▢ &nbsp; Salin</button></div>
        <div class="virtual-account"><div><span>Bank Mandiri Virtual Account</span><strong id="mandiri-account">88765245314034</strong></div><button type="button" data-copy-account="mandiri-account">▢ &nbsp; Salin</button></div>
        <h3>Ketentuan Pembayaran Biaya Kuliah</h3>
        <p>Pembayaran dialokasikan pertama untuk kewajiban pokok dan baru kemudian untuk denda bila ada. Pembayaran dialokasikan sesuai urutan jatuh tempo otomatis oleh sistem SIA.</p>
      </section>
      <button class="finance-download-button" type="button" data-open-dialog="payment-receipt-dialog">⇩ &nbsp; Unduh Bukti Bayar / Kuitansi Sah (PDF)</button>
      <dialog class="receipt-dialog" id="payment-receipt-dialog" aria-labelledby="receipt-dialog-title">
        <header class="receipt-dialog-header"><div><strong id="receipt-dialog-title">Bukti Pembayaran / Kuitansi Sah</strong><span class="finance-paid-badge">LUNAS</span></div><button class="receipt-print-button" type="button" data-print-receipt>▣ &nbsp; Cetak / PDF</button><button class="dialog-close" type="button" data-close-dialog aria-label="Tutup kuitansi">×</button></header>
        <div class="receipt-dialog-body">
          <article class="official-receipt" id="official-receipt">
            <div class="receipt-university"><span class="receipt-seal">USD</span><div><strong>Universitas Sanata Dharma</strong><small>Biro Keuangan &amp; Administrasi Akademik</small></div><span class="finance-paid-badge">LUNAS</span></div>
            <p class="receipt-reference">No: BKT-2026-USD-04-89312</p>
            <div class="receipt-title"><h2>Kuitansi Pembayaran Biaya Pendidikan (UKT)</h2><span>Semester Genap Tahun Akademik 2025/2026</span></div>
            <dl class="receipt-student"><div><dt>Nama Mahasiswa</dt><dd>Briorisa Aprilia Kalista</dd></div><div><dt>Nomor Induk Mahasiswa (NIM)</dt><dd>245314034</dd></div><div><dt>Program Studi / Jenjang</dt><dd>Informatika (S-1)</dd></div><div><dt>Fakultas</dt><dd>Sains dan Teknologi</dd></div><div><dt>Waktu Pembayaran</dt><dd>29 Januari 2026, 11:20 WIB</dd></div></dl>
            <table class="receipt-cost-table"><thead><tr><th>Komponen Biaya</th><th>Jumlah</th></tr></thead><tbody><tr><td>Uang Kuliah Tunggal (UKT) Tahap I</td><td>Rp 2.750.000</td></tr><tr><td>Uang Kuliah Tunggal (UKT) Tahap II</td><td>Rp 2.750.000</td></tr><tr><td>Iuran Kemahasiswaan (Kmhs)</td><td>Rp 225.000</td></tr><tr><td>Sosial Mahasiswa (Sos Mhs)</td><td>Rp 40.000</td></tr><tr><td>Total Terbayar Semester Ini</td><td>Rp 5.765.000</td></tr><tr class="receipt-total-row"><th>TOTAL PEMBAYARAN</th><th>Rp 5.765.000</th></tr></tbody></table>
            <p class="receipt-amount-words"><strong>Terbilang:</strong> “Lima Juta Tujuh Ratus Enam Puluh Lima Ribu Rupiah”</p>
            <div class="receipt-signature"><div class="receipt-qr" aria-label="Kode verifikasi kuitansi">▦</div><p><strong>Digital Signature Valid</strong><span>Bank Partner: PT Bank Central Asia Tbk</span><span>ID Transaksi: USD-TRX-2026-04-89312</span></p><div><span>Disahkan oleh,</span><strong>Biro Administrasi Keuangan</strong><small>Universitas Sanata Dharma</small></div></div>
          </article>
        </div>
        <footer class="receipt-dialog-footer"><span>✓ Kuitansi ini merupakan contoh pratinjau dan bukan bukti pembayaran resmi.</span><button type="button" data-close-dialog>Tutup</button></footer>
      </dialog>
      <p class="finance-preview-note">Informasi pembayaran di atas adalah contoh pratinjau. Pembayaran dan kuitansi resmi tidak terhubung ke sistem kampus.</p>`,
  },
  "jadwal-mahasiswa": {
    title: "Jadwal Kuliah Mahasiswa",
    category: "AKADEMIK",
    description: "Jadwal perkuliahan mingguan untuk semester yang sedang berjalan.",
    content: `
      <div class="schedule-toolbar"><div class="academic-term"><strong>Tahun Akademik: 2026 / Gasal</strong></div><button class="schedule-view-toggle" type="button" data-schedule-view="table" aria-pressed="false"><span aria-hidden="true">▦</span><span class="schedule-view-label">Lihat matriks mingguan</span></button></div>
      <div class="student-day-tabs" role="group" aria-label="Pilih hari perkuliahan">
        <button class="student-day-tab is-selected" type="button" data-schedule-day-select="Senin"><strong>Senin</strong><span>3 Mata Kuliah</span></button>
        <button class="student-day-tab" type="button" data-schedule-day-select="Selasa"><strong>Selasa</strong><span>2 Mata Kuliah</span></button>
        <button class="student-day-tab" type="button" data-schedule-day-select="Rabu"><strong>Rabu</strong><span>1 Mata Kuliah</span></button>
        <button class="student-day-tab" type="button" data-schedule-day-select="Kamis"><strong>Kamis</strong><span>1 Mata Kuliah</span></button>
        <button class="student-day-tab" type="button" data-schedule-day-select="Jumat"><strong>Jumat</strong><span>Libur</span></button>
      </div>
      <section class="student-schedule-view" id="student-day-view">
        <div class="schedule-day-heading"><h2 id="selected-schedule-day-title">Perkuliahan Hari Senin</h2><span id="selected-schedule-day-count">3 Sesi Perkuliahan</span></div>
        <div class="student-schedule-cards" id="student-schedule-cards"></div>
      </section>
      <section class="content-card table-card schedule-matrix-view" id="student-matrix-view" hidden>
        <div class="content-card-heading"><div><p class="eyebrow section-eyebrow">RINGKASAN MINGGUAN</p><h3>Matriks Jadwal Kuliah Mingguan</h3></div><span class="sample-tag">Jadwal contoh</span></div>
        <div class="table-scroll schedule-matrix-scroll"><table><thead><tr><th>Hari</th><th>Mata Kuliah &amp; Ruang</th><th>Jam</th></tr></thead><tbody id="student-schedule-matrix"></tbody></table></div>
      </section>`,
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
                <option value="fch4_officer">Formasi Cerdas Humanis 4 (FCH 4) — Menjadi anggota pengurus BEM/DPM Fakultas/Jurusan/Prodi</option>
                <option value="fch4_committee">Formasi Cerdas Humanis 4 (FCH 4) — Menjadi anggota panitia tingkat universitas</option>
                <option value="fch4_faculty_committee">Formasi Cerdas Humanis 4 (FCH 4) — Menjadi anggota panitia tingkat fakultas/prodi</option>
                <option value="fch4_coordinator">Formasi Cerdas Humanis 4 (FCH 4) — Menjadi koordinator/ketua panitia kegiatan fakultas</option>
                <option value="fch3_organization">Formasi Cerdas Humanis 3 (FCH 3) — Pengurus inti UKM/HMPS/komunitas minat bakat</option>
                <option value="fch3_competition">Formasi Cerdas Humanis 3 (FCH 3) — Juara/finalis kompetisi ilmiah/hackathon/lomba</option>
                <option value="fch1_workshop">Formasi Cerdas Humanis 1 (FCH 1) — Peserta aktif workshop/sertifikasi keahlian komputasi</option>
                <option value="insa_committee">Inisiasi Sanata Dharma (INSADHA) — Pendamping/panitia inisiasi mahasiswa baru USD</option>
              </select>
            </label>
            <section class="points-auto-info" aria-live="polite">
              <div><span>♙</span> Jumlah Poin Ditentukan Sistem: <strong id="calculated-point-value">+30 Poin</strong></div>
              <p>ⓘ Jumlah poin otomatis terkunci dan tidak dapat diubah oleh mahasiswa. Besaran poin dihitung resmi berdasarkan pedoman kategori kegiatan Universitas Sanata Dharma.</p>
            </section>
            <div class="category-detail"><p><span>Bidang:</span> <strong id="point-category-field">Organisasi &amp; Kepemimpinan</strong></p><p><span>Peran:</span> <strong id="point-category-role">Anggota pengurus BEM/DPM Fakultas/Jurusan/Program Studi</strong></p><p><span>Softskills yang Dikembangkan:</span> <strong id="point-category-softskills">Keterampilan manajerial, kepemimpinan, integritas</strong></p></div>
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
    description: "Cari nama dosen untuk melihat jadwal mengajar dan ruang kelasnya.",
    content: `
      <label class="lecturer-search"><span aria-hidden="true">⌕</span><input id="lecturer-search" type="search" placeholder="Cari nama dosen..." aria-label="Cari nama dosen"><kbd>⌕</kbd></label>
      <p class="lecturer-search-hint">Cari nama dosen, lalu buka daftar jadwal mengajarnya.</p>
      <div class="lecturer-schedule-list" id="lecturer-schedule-list"></div>
      <p class="lecturer-no-results" id="lecturer-no-results" hidden>Dosen tidak ditemukan. Coba kata kunci lain.</p>`,
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
  document.querySelector("#point-category-softskills").textContent = selection.softskills;
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

function renderStudentSchedule(day = "Senin") {
  const cards = document.querySelector("#student-schedule-cards");
  if (!cards) return;
  const dayCourses = studentSchedule.filter((course) => course.day === day);
  document.querySelectorAll("[data-schedule-day-select]").forEach((tab) => {
    const selected = tab.dataset.scheduleDaySelect === day;
    tab.classList.toggle("is-selected", selected);
    tab.setAttribute("aria-pressed", String(selected));
  });
  document.querySelector("#selected-schedule-day-title").textContent = `Perkuliahan Hari ${day}`;
  document.querySelector("#selected-schedule-day-count").textContent = `${dayCourses.length} Sesi Perkuliahan`;
  cards.innerHTML = dayCourses.length
    ? dayCourses.map((course) => `
      <article class="student-class-card">
        <span class="student-class-code">${escapeHTML(course.code)} • ${course.credits} SKS</span>
        <h3>${escapeHTML(course.title)}</h3>
        <div class="student-class-details"><span><b aria-hidden="true">◷</b> ${escapeHTML(course.time)}</span><span><b aria-hidden="true">⌖</b> ${escapeHTML(course.room)}</span></div>
        <p class="student-class-lecturer"><span aria-hidden="true">♙</span> ${escapeHTML(course.lecturer)}</p>
      </article>`).join("")
    : '<p class="schedule-empty-day">Tidak ada jadwal kuliah pada hari ini.</p>';

  const weekDays = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
  document.querySelector("#student-schedule-matrix").innerHTML = weekDays.map((weekDay) => {
    const courses = studentSchedule.filter((course) => course.day === weekDay);
    if (!courses.length) {
      return `<tr><th scope="row">${weekDay}</th><td colspan="2" class="schedule-empty-cell">Tidak ada jadwal kuliah</td></tr>`;
    }
    return courses.map((course, index) => `
      <tr>${index === 0 ? `<th scope="row" rowspan="${courses.length}">${weekDay}</th>` : ""}
        <td><strong>${escapeHTML(course.code)} ${escapeHTML(course.title)}</strong><span>– ${escapeHTML(course.room)}</span></td>
        <td>${escapeHTML(course.time.replace(" WIB", ""))}</td>
      </tr>`).join("");
  }).join("");
}

function renderLecturerSchedules(query = "") {
  const list = document.querySelector("#lecturer-schedule-list");
  if (!list) return;
  const normalizedQuery = query.trim().toLocaleLowerCase("id");
  const matchingLecturers = lecturerSchedules.filter((lecturer) =>
    lecturer.name.toLocaleLowerCase("id").includes(normalizedQuery)
  );
  list.innerHTML = matchingLecturers.map((lecturer, lecturerIndex) => {
    const rows = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"].map((day) => {
      const dayClasses = lecturer.schedule.filter((item) => item.day === day);
      if (!dayClasses.length) {
        return `<tr><th scope="row">${day}</th><td>–</td><td>–</td><td>–</td><td>–</td></tr>`;
      }
      return dayClasses.map((course, index) => `
        <tr>${index === 0 ? `<th scope="row" rowspan="${dayClasses.length}">${day}</th>` : ""}
          <td>${escapeHTML(course.time)}</td>
          <td><span class="lecturer-course-code">${escapeHTML(course.code)}</span><strong>${escapeHTML(course.course)}</strong></td>
          <td>${escapeHTML(course.className)}</td>
          <td>${escapeHTML(course.room)}</td>
        </tr>`).join("");
    }).join("");
    return `
      <details class="lecturer-schedule-card"${lecturerIndex === 0 ? " open" : ""}>
        <summary>${escapeHTML(lecturer.name)}<span aria-hidden="true"></span></summary>
        <div class="lecturer-table-scroll"><table class="lecturer-table">
          <thead><tr><th>Hari</th><th>Jam</th><th>Mata Kuliah</th><th>Kelas</th><th>Ruang</th></tr></thead>
          <tbody>${rows}</tbody>
        </table></div>
      </details>`;
  }).join("");
  document.querySelector("#lecturer-no-results").hidden = matchingLecturers.length > 0;
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
  return `
    <div class="service-title-bar">
      <button class="back-button" type="button" data-route="beranda"><span aria-hidden="true">‹</span><span>Beranda</span></button>
      <h1>${service.title}</h1>
      <span class="service-title-spacer" aria-hidden="true"></span>
    </div>
    <p class="service-description">${service.description}</p>
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
  if (selectedRoute === "jadwal-mahasiswa") {
    renderStudentSchedule();
  }
  if (selectedRoute === "jadwal-dosen") {
    renderLecturerSchedules();
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
  const financeTab = event.target.closest("[data-finance-tab]");
  if (financeTab) {
    const selectedTab = financeTab.dataset.financeTab;
    document.querySelectorAll(".finance-tab").forEach((tab) => {
      const selected = tab === financeTab;
      tab.classList.toggle("is-active", selected);
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    document.querySelectorAll(".finance-panel").forEach((panel) => {
      panel.hidden = panel.id !== `finance-panel-${selectedTab}`;
    });
    return;
  }

  const copyButton = event.target.closest("[data-copy-account]");
  if (copyButton) {
    const account = document.querySelector(`#${copyButton.dataset.copyAccount}`).textContent;
    Promise.resolve()
      .then(() => navigator.clipboard.writeText(account))
      .then(() => showMessage("Nomor virtual account berhasil disalin."))
      .catch(() => showMessage("Nomor tidak dapat disalin otomatis. Silakan salin nomor yang tertera."));
    return;
  }

  if (event.target.closest("[data-print-receipt]")) {
    window.print();
    return;
  }

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
  if (routeLink && routeLink !== main) {
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

document.addEventListener("keydown", (event) => {
  const tab = event.target.closest(".finance-tab");
  if (!tab || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
  const tabs = [...document.querySelectorAll(".finance-tab")];
  const currentIndex = tabs.indexOf(tab);
  const nextIndex = event.key === "Home"
    ? 0
    : event.key === "End"
      ? tabs.length - 1
      : (currentIndex + (event.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;
  event.preventDefault();
  tabs[nextIndex].focus();
  tabs[nextIndex].click();
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

document.addEventListener("input", (event) => {
  if (event.target.id === "lecturer-search") {
    renderLecturerSchedules(event.target.value);
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
  const dayTab = event.target.closest("[data-schedule-day-select]");
  if (dayTab) {
    renderStudentSchedule(dayTab.dataset.scheduleDaySelect);
    return;
  }
  const viewToggle = event.target.closest("[data-schedule-view]");
  if (viewToggle) {
    const showMatrix = viewToggle.dataset.scheduleView === "table";
    document.querySelector("#student-day-view").hidden = showMatrix;
    document.querySelector("#student-matrix-view").hidden = !showMatrix;
    viewToggle.dataset.scheduleView = showMatrix ? "days" : "table";
    viewToggle.setAttribute("aria-pressed", String(showMatrix));
    viewToggle.querySelector(".schedule-view-label").textContent = showMatrix
      ? "Lihat jadwal per hari"
      : "Lihat matriks mingguan";
  }
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
