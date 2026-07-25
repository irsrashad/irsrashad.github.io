/* Shared behavior: mobile nav, scroll reveal, coordinate readout */
(function () {
  // Mobile menu
  var burger = document.querySelector('.nav-burger');
  var menu = document.querySelector('.mobile-menu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      burger.classList.toggle('open');
      menu.classList.toggle('open');
    });
  }

  // Scroll reveal
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('on'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(function (el) { obs.observe(el); });

  // Live coordinate readout in footer (mouse position mapped to fake lat/lon drift around Jakarta)
  var coordEl = document.querySelector('[data-coords]');
  if (coordEl) {
    var stations = [
      '-6.2088° S · 106.8456° E · JAKARTA',
      '40.6943° N · 73.9249° W · BROOKLYN NY',
      '-6.9175° S · 107.6191° E · BANDUNG',
      '35.6762° N · 139.6503° E · TOKYO'
    ];
    var i = 0;
    setInterval(function () {
      i = (i + 1) % stations.length;
      coordEl.style.opacity = '0';
      setTimeout(function () { coordEl.textContent = stations[i]; coordEl.style.opacity = '1'; }, 320);
    }, 4000);
    coordEl.style.transition = 'opacity 0.3s';
  }
})();
