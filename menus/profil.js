window.SIA_MENU_VIEWS = window.SIA_MENU_VIEWS || {};

window.SIA_MENU_VIEWS.profil = (profileData, escapeHTML) => `
  <section class="student-profile-card">
    <div class="student-profile-top">
      <div class="profile-portrait"><svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><circle cx="16" cy="10" r="5" stroke="currentColor" stroke-width="2.2"/><path d="M7.5 27v-2a8.5 8.5 0 0 1 17 0v2" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg><span aria-hidden="true">✿</span></div>
      <strong class="student-profile-name">${escapeHTML(profileData.name)}</strong><span class="student-profile-meta">NIM: 245314034</span>
      <div class="student-profile-badges"><span class="profile-status">◉ Aktif</span><span class="profile-semester">Semester 4</span></div>
      <div class="student-profile-stats"><div><strong>3.26</strong><span>IPK</span></div><div><strong>84</strong><span>SKS Lulus</span></div><div><strong>A / B+</strong><span>Predikat</span></div></div>
    </div>
    <section class="biodata-card"><h2><span aria-hidden="true">♧</span> Biodata Akademik Mahasiswa</h2><dl class="biodata-list">
      <div><dt>Perguruan Tinggi</dt><dd>Universitas Sanata Dharma</dd></div><div><dt>Fakultas</dt><dd>Sains dan Teknologi</dd></div><div><dt>Jalur Masuk</dt><dd>Prestasi</dd></div><div><dt>Dosen Pembimbing</dt><dd>Prof. Dr. Ir. Anastasia Rita Widiarti</dd></div>
      <div><dt>Email Student</dt><dd><a href="mailto:${escapeHTML(profileData.email)}">${escapeHTML(profileData.email)}</a></dd></div>
      <div><dt>Nomor Telepon</dt><dd><a href="tel:${escapeHTML(profileData.phone.replace(/[^\d+]/g, ""))}">${escapeHTML(profileData.phone)}</a></dd></div>
    </dl></section>
  </section>
  <div class="profile-actions"><button class="primary-button" type="button" data-open-dialog="profile-edit-dialog"><span aria-hidden="true">✎</span> Perbarui Data Diri</button><button class="logout-button" type="button" data-logout>⇥ &nbsp; Keluar Akun (Logout)</button></div>
  <dialog class="submission-dialog profile-edit-dialog" id="profile-edit-dialog" aria-labelledby="profile-edit-title">
    <form class="submission-form" id="profile-edit-form"><header class="submission-header"><h2 id="profile-edit-title">Perbarui Data Diri</h2><button class="dialog-close" type="button" data-close-dialog aria-label="Tutup formulir">×</button></header>
      <div class="submission-body"><label class="form-field">Nama lengkap<input name="fullName" value="${escapeHTML(profileData.name)}" required></label><label class="form-field">Email student<input name="email" type="email" value="${escapeHTML(profileData.email)}" required></label><label class="form-field">Nomor telepon<input name="phone" type="tel" value="${escapeHTML(profileData.phone)}" required></label><button class="primary-button form-submit-button" type="submit">Simpan Data Diri</button></div>
    </form>
  </dialog>`;
