// KoffyKraft (C) 2026 T M Thomas. AGPL-3.0 with additional terms (attribution, names): see NOTICE.
// Koko by KoffyKraft: header, footer and small helpers every page uses.
const NAV = [
  ['home', 'Home'],
  ['farm', 'Farm'],
  ['bar', 'Bean to bar'],
  ['taste', 'Taste'],
  ['trail', 'Trails'],
  ['trace', 'Passports'],
  ['learn', 'Learn'],
];
function kokoHeader(on) {
  const h = document.getElementById('kh');
  if (!h) return;
  h.className = 'kkh';
  h.innerHTML =
    '<div class="kkh-top"><a class="kkh-brand" href="home.html">Koko<small>by KoffyKraft</small></a><a class="kkh-acct" href="account.html" aria-label="Account">👤</a></div><nav class="kkh-nav" aria-label="Main">' +
    NAV.map(
      ([k, l]) => '<a href="' + k + '.html"' + (k === on ? ' aria-current="page"' : '') + '>' + l + '</a>'
    ).join('') +
    '</nav>';
}
function kokoFoot() {
  const f = document.getElementById('kf');
  if (!f) return;
  f.className = 'foot';
  f.innerHTML =
    'Made with <a href="https://roast.koffykraft.coffee">KoffyKraft</a> · free and open source · © T M Thomas · <a href="license.html">Licence</a> · <a href="privacy.html">Privacy</a> · <a href="terms.html">Terms</a>';
}
function toast(t) {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = t;
  el.classList.add('show');
  clearTimeout(el._h);
  el._h = setTimeout(() => el.classList.remove('show'), 2200);
}
const fmtDate = d => {
  if (!d) return '';
  const x = new Date(d);
  return isNaN(x)
    ? String(d)
    : x.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};
const today = () => new Date().toISOString().slice(0, 10);
document.addEventListener('DOMContentLoaded', () => {
  kokoHeader(document.body.dataset.page || '');
  kokoFoot();
});
// Offline: every page registers the cache worker; it keeps a copy of the app on the phone.
if ('serviceWorker' in navigator && !/^(localhost|127\.)/.test(location.hostname))
  navigator.serviceWorker.register('sw.js').catch(() => {});
