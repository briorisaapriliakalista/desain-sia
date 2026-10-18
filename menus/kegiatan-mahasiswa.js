window.SIA_MENU_VIEWS = window.SIA_MENU_VIEWS || {};

window.SIA_MENU_VIEWS.kegiatanMahasiswa = () => `
  <section class="points-overview" aria-label="Ringkasan poin kemahasiswaan">
    <div class="points-overview-top"><span>TOTAL AKUMULASI POIN</span><span class="graduation-requirement">Syarat Kelulusan Terpenuhi</span></div>
    <p class="points-total"><strong id="points-total">60</strong><span>/ min 50 poin</span></p>
    <div class="points-progress" role="progressbar" aria-label="Progres poin kelulusan" aria-valuemin="0" aria-valuemax="50" aria-valuenow="50"><span></span></div>
    <p class="points-verification">✓ Poin diverifikasi: <strong id="points-verified">60</strong> Poin. Belum diverifikasi: <strong id="points-pending">0</strong> Poin.</p>
  </section>
  <section class="fch-status-card"><h2>Status Poin Wajib Mahasiswa</h2><div class="fch-status-list">
    <div class="fch-status"><span>INSA</span><strong>BELUM</strong></div><div class="fch-status"><span>FCH1</span><strong>BELUM</strong></div><div class="fch-status"><span>FCH2</span><strong>BELUM</strong></div><div class="fch-status"><span>FCH3</span><strong>BELUM</strong></div><div class="fch-status is-complete"><span>FCH4</span><strong>✓ SUDAH</strong></div>
  </div></section>
  <div class="points-section-heading"><h2>Daftar Poin Kegiatan Anda</h2><span id="points-entry-count">2 Kegiatan Tercatat</span></div>
  <div class="point-entry-list" id="point-entry-list"></div>
  <button class="primary-button points-submit-open" type="button" data-open-dialog="point-submission-dialog"><span aria-hidden="true">＋</span> Ajukan Poin Kegiatan Baru</button>
  <dialog class="submission-dialog" id="point-submission-dialog" aria-labelledby="point-form-title">
    <form class="submission-form" id="point-submission-form">
      <header class="submission-header"><h2 id="point-form-title"><span aria-hidden="true">♙</span> Input Pengajuan Poin Kegiatan</h2><button class="dialog-close" type="button" data-close-dialog aria-label="Tutup formulir">×</button></header>
      <div class="submission-body">
        <section class="points-student-info" aria-label="Data mahasiswa"><div><strong>NIM</strong><b>245314034</b></div><div><strong>Nama</strong><b>{{STUDENT_NAME}}</b></div></section>
        <button class="points-template-link" type="button" data-message="Template surat tugas mahasiswa">Template Surat Tugas Mahasiswa</button>
        <label class="form-field">Kategori<select id="point-category" name="pointCategory" required>{{CATEGORY_OPTIONS}}</select></label>
        <label class="form-field">Jenis<select id="point-type" name="pointType" required></select></label>
        <label class="form-field">Peran<select id="point-role" name="pointRole" required></select></label>
        <section class="points-auto-info" aria-live="polite"><div><span>Poin</span><strong id="calculated-point-value">+10 Poin</strong></div><p><strong>Satuan: </strong><span id="point-unit">Kegiatan</span></p></section>
        <label class="form-field">Softskills<textarea id="point-softskills" rows="3" readonly></textarea></label>
        <label class="form-field">Nama Kegiatan / Nama UKM<input name="activity" type="text" maxlength="120" placeholder="Nama kegiatan" required></label>
        <label class="form-field">Unit / Badan Penyelenggara<input name="organizer" type="text" maxlength="100" placeholder="Nama penyelenggara" required></label>
        <div class="point-date-fields"><label class="form-field">Tanggal mulai<input name="startDate" type="date" required></label><label class="form-field">Tanggal selesai<input name="endDate" type="date" required></label></div>
        <label class="form-field">Surat Keterangan Aktif / Bukti Kegiatan<span class="file-picker"><span aria-hidden="true">⇧</span><strong>Pilih Berkas Bukti Kegiatan</strong><small>PDF, JPG, PNG maksimal 5MB</small><input name="evidence" type="file" accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png" required></span></label>
        <p class="point-input-date">Tanggal Input: <span id="point-input-date"></span></p><p class="form-error" id="point-form-error" role="alert"></p>
        <div class="evaluation-actions"><button class="secondary-button" type="reset">Batal</button><button class="primary-button form-submit-button" type="submit">Simpan Pengajuan</button></div>
      </div>
    </form>
  </dialog>`;
