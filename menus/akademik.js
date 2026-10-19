window.SIA_MENU_VIEWS = window.SIA_MENU_VIEWS || {};

window.SIA_MENU_VIEWS.akademik = (routes, services, icons) => {
  const cards = routes.map((route) => {
    const service = services[route];
    const title = route === "keuangan" ? "Kartu Keuangan Mahasiswa (KKM)"
      : service.title === "Jadwal Mahasiswa" ? "Jadwal Kuliah Mahasiswa"
        : service.title === "Nilai per Semester" ? "Nilai per Semester (KHS)"
          : service.title;
    return `<button class="hub-card academic-service-card" type="button" data-route="${route}"><span class="academic-service-icon academic-icon-${route}">${icons[route]}</span><span class="academic-service-copy"><strong>${title}</strong><span class="hub-card-description">${service.description}</span></span><span class="hub-card-arrow" aria-hidden="true">›</span></button>`;
  }).join("");
  return `<div class="academic-list-heading"><button class="academic-home-link" type="button" data-route="beranda">← Beranda</button><h1>Akademik</h1></div><div class="academic-service-list">${cards}</div>`;
};
