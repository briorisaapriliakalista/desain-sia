window.SIA_MENU_VIEWS = window.SIA_MENU_VIEWS || {};

window.SIA_MENU_VIEWS.beranda = () => `
  <section class="welcome-row" aria-labelledby="welcome-title">
    <div><h1 id="welcome-title">Halo, Briorisa Aprilia Kalista</h1><p class="student-meta">NIM: 245314034</p></div>
    <div class="welcome-avatar" aria-hidden="true">B</div>
  </section>
  <section class="academic-card" aria-labelledby="academic-title">
    <div class="card-glow card-glow-one" aria-hidden="true"></div><div class="card-glow card-glow-two" aria-hidden="true"></div>
    <div class="academic-card-content">
      <div class="academic-card-top"><div class="academic-title-group">
        <span class="analytics-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 19V9m5 10V5m5 14v-7m5 7V3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></span>
        <div><p class="card-kicker">SIA Santa Dharma</p><h2 id="academic-title">Indeks Prestasi Kumulatif (IPK)</h2></div>
      </div><span class="semester-pill"><span></span> Semester 5 · Aktif</span></div>
      <div class="metrics" aria-label="Ringkasan nilai akademik">
        <div class="metric"><span class="metric-label">IPK</span><strong>3.26</strong></div>
        <div class="metric"><span class="metric-label">IPS Terakhir</span><strong class="metric-cyan">3.55</strong></div>
        <div class="metric"><span class="metric-label">Total SKS</span><strong>84 <span class="metric-unit">SKS</span></strong></div>
      </div>
      <div class="academic-card-bottom"><span>Predikat: <strong>Sangat Memuaskan</strong></span><a href="#/nilai" data-route="nilai">Lihat Nilai <span aria-hidden="true">›</span></a></div>
    </div>
  </section>
  <section class="shortcuts-section" aria-labelledby="shortcuts-title">
    <div class="section-heading"><div><h2 id="shortcuts-title">Pintasan Cepat</h2></div><a class="text-link" href="#/akademik" data-route="akademik">Semua Menu</a></div>
    <div class="shortcut-grid">
      <button class="shortcut-card" type="button" data-route="nilai"><span class="shortcut-icon icon-blue"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg></span><span class="shortcut-name">Nilai per<br>Semester</span><span class="shortcut-arrow" aria-hidden="true">↗</span></button>
      <button class="shortcut-card" type="button" data-route="lpkp"><span class="shortcut-icon icon-green"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3.75h8l4 4v12.5H6a2 2 0 0 1-2-2v-12a2.5 2.5 0 0 1 2-2.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 4v4h4M8 13h8M8 16.5h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="shortcut-name">LPKP</span><span class="shortcut-arrow" aria-hidden="true">↗</span></button>
      <button class="shortcut-card" type="button" data-route="keuangan"><span class="shortcut-icon icon-teal"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="2.5" stroke="currentColor" stroke-width="1.8"/><path d="M3.5 10h17M7.5 14.5h3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></span><span class="shortcut-name">Kartu Keuangan<br>Mahasiswa</span><span class="shortcut-arrow" aria-hidden="true">↗</span></button>
      <button class="shortcut-card" type="button" data-route="jadwal-mahasiswa"><span class="shortcut-icon icon-indigo"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="5.5" width="16" height="15" rx="2.5" stroke="currentColor" stroke-width="1.8"/><path d="M8 3.5v4M16 3.5v4M4 10h16m-11 4h.01M12 14h.01M15 14h.01M9 17h.01" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></span><span class="shortcut-name">Jadwal<br>Mahasiswa</span><span class="shortcut-arrow" aria-hidden="true">↗</span></button>
      <button class="shortcut-card" type="button" data-route="poin-kemahasiswaan"><span class="shortcut-icon icon-cyan"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="4.5" stroke="currentColor" stroke-width="1.8"/><path d="m8.5 12-1 8 4.5-2.5 4.5 2.5-1-8M9.5 8l1.6 1.6L14.8 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="shortcut-name">Poin<br>Kemahasiswaan</span><span class="shortcut-arrow" aria-hidden="true">↗</span></button>
      <button class="shortcut-card" type="button" data-route="drs"><span class="shortcut-icon icon-amber"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3.5 6.5A2.5 2.5 0 0 1 6 4h4.5l2 2.5H18a2.5 2.5 0 0 1 2.5 2.5v8A2.5 2.5 0 0 1 18 19.5H6A2.5 2.5 0 0 1 3.5 17V6.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M3.8 9h16.4" stroke="currentColor" stroke-width="1.8"/></svg></span><span class="shortcut-name">DRS</span><span class="shortcut-arrow" aria-hidden="true">↗</span></button>
      <button class="shortcut-card" type="button" data-route="jadwal-dosen"><span class="shortcut-icon icon-magenta"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="5.5" width="16" height="15" rx="2.5" stroke="currentColor" stroke-width="1.8"/><path d="M8 3.5v4M16 3.5v4M4 10h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="15.5" cy="15.5" r="3" fill="var(--icon-fill, #fff)" stroke="currentColor" stroke-width="1.5"/><path d="M15.5 14v1.7l1.1.7" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span><span class="shortcut-name">Jadwal<br>Dosen</span><span class="shortcut-arrow" aria-hidden="true">↗</span></button>
      <button class="shortcut-card" type="button" data-route="profil"><span class="shortcut-icon icon-green"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10" cy="8" r="3.2" stroke="currentColor" stroke-width="1.8"/><path d="M3.5 19a6.5 6.5 0 0 1 13 0H3.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="m16 11 1.5 1.5 3-3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="shortcut-name">Profil</span><span class="shortcut-arrow" aria-hidden="true">↗</span></button>
    </div>
  </section>`;
