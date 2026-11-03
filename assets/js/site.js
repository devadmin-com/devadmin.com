// Devadmin — mobile menu + photo lightbox. No dependencies.
(function () {
  // Mobile menu
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Lightbox for any .gallery
  var gallery = document.querySelector('.gallery');
  if (!gallery || typeof HTMLDialogElement !== 'function') return;

  var items = Array.prototype.slice.call(gallery.querySelectorAll('button[data-full]'));
  var dlg = document.createElement('dialog');
  dlg.className = 'lightbox';
  dlg.setAttribute('aria-label', 'Photo viewer');
  dlg.innerHTML =
    '<img alt="">' +
    '<button class="lb-btn lb-close" type="button" aria-label="Close">&times;</button>' +
    '<button class="lb-btn lb-prev" type="button" aria-label="Previous photo">&#8249;</button>' +
    '<button class="lb-btn lb-next" type="button" aria-label="Next photo">&#8250;</button>' +
    '<div class="lb-count" aria-live="polite"></div>';
  document.body.appendChild(dlg);

  var img = dlg.querySelector('img');
  var count = dlg.querySelector('.lb-count');
  var index = 0;

  function show(i) {
    index = (i + items.length) % items.length;
    img.src = items[index].getAttribute('data-full');
    img.alt = items[index].querySelector('img').alt;
    count.textContent = (index + 1) + ' / ' + items.length;
    // warm the next image
    new Image().src = items[(index + 1) % items.length].getAttribute('data-full');
  }

  items.forEach(function (btn, i) {
    btn.addEventListener('click', function () { show(i); dlg.showModal(); });
  });
  dlg.querySelector('.lb-close').addEventListener('click', function () { dlg.close(); });
  dlg.querySelector('.lb-prev').addEventListener('click', function () { show(index - 1); });
  dlg.querySelector('.lb-next').addEventListener('click', function () { show(index + 1); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });

  // Swipe on touch screens
  var x0 = null;
  dlg.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  dlg.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) show(index + (dx < 0 ? 1 : -1));
    x0 = null;
  });
})();
