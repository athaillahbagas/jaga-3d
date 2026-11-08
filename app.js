const viewer = document.querySelector('#jaga-model');
const card = document.querySelector('.viewer-card');
const controls = document.querySelectorAll('.viewer-toolbar button, .zoom-controls button');
const viewButtons = [...document.querySelectorAll('[data-view]')];
const rotate = document.querySelector('#rotate');
const errorPanel = document.querySelector('#model-error');
const progressPanel = document.querySelector('#load-panel');
const progress = document.querySelector('#load-progress');
const announcement = document.querySelector('#view-announcement');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const wideLayout = matchMedia('(min-width: 701px)');
const views = {
  perspective: '32deg 58deg',
  front: '0deg 85deg',
  top: '0deg 5deg',
  side: '90deg 82deg',
};
let ready = false;
let wantsRotation = false;
let inView = true;

function syncRotation() {
  viewer.autoRotate = ready && wantsRotation && inView && !document.hidden;
  rotate.setAttribute('aria-pressed', String(wantsRotation));
  rotate.querySelector('span').textContent = wantsRotation ? 'Hentikan putaran' : 'Putar otomatis';
}

function setRotation(value) {
  wantsRotation = value;
  syncRotation();
}

function setView(name, announce = true) {
  if (!ready || !(name in views)) return;
  setRotation(false);
  viewer.resetTurntableRotation();
  viewer.cameraTarget = 'auto auto auto';
  viewer.cameraOrbit = `${views[name]} ${wideLayout.matches ? '88%' : '100%'}`;
  viewer.fieldOfView = '32deg';
  if (reducedMotion.matches) viewer.jumpCameraToGoal();
  viewButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.view === name)));
  if (announce) announcement.textContent = `Tampilan ${viewButtons.find(button => button.dataset.view === name).textContent.toLowerCase()}.`;
}

function showError(message = 'Periksa koneksi, lalu coba lagi.') {
  ready = false;
  setRotation(false);
  controls.forEach(button => { button.disabled = true; });
  progressPanel.hidden = true;
  errorPanel.hidden = false;
  document.querySelector('#error-message').textContent = message;
  card.setAttribute('aria-busy', 'false');
}

viewer.addEventListener('progress', event => {
  progress.value = event.detail.totalProgress;
});

viewer.addEventListener('load', () => {
  ready = true;
  controls.forEach(button => { button.disabled = false; });
  progressPanel.hidden = true;
  errorPanel.hidden = true;
  card.setAttribute('aria-busy', 'false');
  setView('perspective', false);
  announcement.textContent = 'Model JAGA siap. Geser untuk memutar atau pilih sudut pandang.';
});

viewer.addEventListener('error', () => showError());
viewer.addEventListener('camera-change', event => {
  if (event.detail.source === 'user-interaction') {
    setRotation(false);
    viewButtons.forEach(button => button.setAttribute('aria-pressed', 'false'));
  }
});

viewButtons.forEach(button => button.addEventListener('click', () => setView(button.dataset.view)));
document.querySelector('#reset').addEventListener('click', () => setView('perspective'));
document.querySelector('#zoom-in').addEventListener('click', () => { viewer.zoom(1); });
document.querySelector('#zoom-out').addEventListener('click', () => { viewer.zoom(-1); });
rotate.addEventListener('click', () => setRotation(!wantsRotation));
document.addEventListener('visibilitychange', syncRotation);
reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) setRotation(false); });
wideLayout.addEventListener('change', () => setView('perspective', false));
new IntersectionObserver(([entry]) => {
  inView = entry.isIntersecting;
  syncRotation();
}).observe(viewer);

document.querySelector('#retry').addEventListener('click', () => location.reload());

try {
  // The library and model are local files, so the published page needs no CDN.
  await import('./vendor/model-viewer.min.js');
} catch {
  showError('Penampil 3D tidak tersedia. Muat ulang halaman untuk mencoba lagi.');
}
