/* Смоук-прогон страницы без браузера: самодельный DOM, поддельный new-api.
   Отвечает на два вопроса — страница поднимается на обоих языках и переключение
   между ними переписывает всё, что видно человеку. Полные наборы проверок
   (core, e2e) живут во временной папке песочницы и переживают только одну сессию. */
'use strict';
var fs = require('fs');
var PATH = '/sessions/hopeful-eloquent-edison/mnt/outputs/index.html';
var HTML = fs.readFileSync(PATH, 'utf8');

function block(id) {
  var m = HTML.match(new RegExp('<script id="' + id + '">([\\s\\S]*?)</script>'));
  if (!m) throw new Error('нет блока ' + id);
  return m[1];
}
var BODY = HTML.slice(HTML.indexOf('<body>'), HTML.indexOf('</body>'));

/* --- крошечный DOM ------------------------------------------------------- */
function node(tag, id) {
  var n = {
    tagName: (tag || 'div').toUpperCase(), id: id || '', innerHTML: '', textContent: '',
    value: '', type: 'password', checked: false, disabled: false, hidden: false,
    dataset: {}, style: {}, attrs: {}, children: [], handlers: {},
    classList: {
      _s: {},
      add: function () { for (var i = 0; i < arguments.length; i++) this._s[arguments[i]] = 1; },
      remove: function () { for (var i = 0; i < arguments.length; i++) delete this._s[arguments[i]]; },
      toggle: function (c, on) { if (on === undefined) on = !this._s[c]; on ? this.add(c) : this.remove(c); },
      contains: function (c) { return !!this._s[c]; }
    },
    setAttribute: function (k, v) { this.attrs[k] = v; this[k] = v; },
    getAttribute: function (k) { return k in this.attrs ? this.attrs[k] : null; },
    appendChild: function (c) { this.children.push(c); return c; },
    addEventListener: function (t, fn) { (this.handlers[t] = this.handlers[t] || []).push(fn); },
    dispatch: function (t, ev) {
      ev = ev || {}; ev.type = t; ev.target = ev.target || this;
      ev.preventDefault = ev.preventDefault || function () {};
      var self = this;
      (this.handlers[t] || []).forEach(function (fn) { fn.call(self, ev); });
    },
    querySelectorAll: function () { return []; },
    closest: function () { return null; },
    focus: function () {}, select: function () {}, remove: function () {}
  };
  return n;
}

var byId = {};
/* Заводим узлы по всем id, которые есть в разметке. */
(BODY.match(/id="([a-zA-Z0-9_-]+)"/g) || []).forEach(function (m) {
  var id = m.slice(4, -1);
  byId[id] = node('div', id);
});
/* Кнопки переключателя языка — единственные дети, которые нужны коду (press и подписи). */
byId.langCtl.children = ['ru', 'en'].map(function (l) {
  var b = node('button'); b.dataset.lang = l; return b;
});

var doc = {
  body: node('body'),
  documentElement: node('html'),
  title: '',
  activeElement: null,
  getElementById: function (id) { return byId[id] || null; },
  createElement: function (t) { return node(t); },
  querySelectorAll: function () { return []; },
  addEventListener: function () {},
  execCommand: function () { return true; }
};

var saved = {};
function storage() {
  return {
    getItem: function (k) { return k in saved ? saved[k] : null; },
    setItem: function (k, v) { saved[k] = String(v); },
    removeItem: function (k) { delete saved[k]; }
  };
}

/* --- поддельный new-api -------------------------------------------------- */
var DAY = 86400000, NOW = Date.now();
var LOGS = [
  { id: 1, created_at: Math.floor((NOW - 2 * 3600000) / 1000), model_name: 'claude-opus-5', quota: 120000, prompt_tokens: 900, completion_tokens: 300, use_time: 7, type: 2 },
  { id: 2, created_at: Math.floor((NOW - DAY) / 1000), model_name: 'claude-opus-4-8', quota: 60000, prompt_tokens: 400, completion_tokens: 150, use_time: 4, type: 2 },
  { id: 3, created_at: Math.floor((NOW - 3 * DAY) / 1000), model_name: 'gpt-5.6', quota: 20000, prompt_tokens: 100, completion_tokens: 80, use_time: 2, type: 2 },
  { id: 4, created_at: Math.floor((NOW - 4 * DAY) / 1000), model_name: 'claude-opus-5', quota: 500000, prompt_tokens: 0, completion_tokens: 0, use_time: 0, type: 1 }
];
var SPENT_USD = (120000 + 60000 + 20000) / 500000;   /* пополнение (type 1) в траты не идёт */

function reply(obj) {
  return Promise.resolve({
    ok: true, status: 200,
    text: function () { return Promise.resolve(JSON.stringify(obj)); }
  });
}
function fakeFetch(url) {
  if (url.indexOf('/api/status') >= 0) return reply({ data: { quota_per_unit: 500000 } });
  if (url.indexOf('/v1/dashboard/billing/subscription') >= 0) return reply({ hard_limit_usd: 100000000, access_until: 0 });
  if (url.indexOf('/dashboard/billing/usage') >= 0) return reply({ total_usage: Math.round(SPENT_USD * 100) });
  if (url.indexOf('/api/log/token') >= 0) {
    var p = Number((url.match(/[?&]p=(\d+)/) || [])[1] || 1);
    return reply({ data: p === 1 ? LOGS : [], total: LOGS.length });
  }
  return Promise.reject(new Error('лишний запрос: ' + url));
}

/* --- прогон -------------------------------------------------------------- */
var ok = 0, bad = [];
function is(name, got, want) {
  if (JSON.stringify(got) === JSON.stringify(want)) ok++;
  else bad.push(name + '\n    получено: ' + JSON.stringify(got) + '\n    ожидалось: ' + JSON.stringify(want));
}
function has(name, hay, needle) {
  if (String(hay).indexOf(needle) >= 0) ok++;
  else bad.push(name + '\n    в тексте нет «' + needle + '»');
}
function hasnt(name, hay, needle) {
  if (String(hay).indexOf(needle) < 0) ok++;
  else bad.push(name + '\n    в тексте осталось «' + needle + '»');
}

var win = Object.create(null);
new Function('window', block('i18n'))(win);
new Function('window', block('core'))(win);
new Function('window', block('guides'))(win);
new Function('window', 'document', 'localStorage', 'fetch', 'navigator', block('app'))(
  win, doc, storage(), fakeFetch, {});

/* Все тексты страницы одним куском — так удобно искать чужой язык. */
function screen() {
  return Object.keys(byId).map(function (id) {
    var n = byId[id];
    return String(n.innerHTML) + ' ' + String(n.textContent);
  }).join(' ');
}
function pickLang(l) {
  var b = node('button'); b.dataset.lang = l;
  byId.langGate.dispatch('click', { target: { closest: function () { return b; } } });
}

/* ==== 1. язык спрашивают при каждом открытии ============================= */
is('окно выбора языка открыто на старте', byId.langGate.classList.contains('hidden'), false);
has('в окне обе подписи', HTML, 'Выберите язык · Choose a language');
is('страница стартует по-русски', doc.documentElement.lang, 'ru');
is('выбор языка не пишется в браузер', Object.keys(saved), []);

/* ==== 2. русская версия ================================================== */
var guide = byId.guide.innerHTML, picker = byId.picker.innerHTML;

has('по умолчанию открыт Claude App', guide, '<h3 class="guide__name">Claude App');
is('подсвечен ровно один чип', (picker.match(/is-on/g) || []).length, 1);
has('подсвечен именно Claude App', picker, 'data-tool="claude-app" aria-pressed="true"');
is('чипов ровно 15', (picker.match(/data-tool="/g) || []).length, 15);
is('счётчик программ', byId.guidesCount.textContent, '15 программ');
is('заголовок вкладки', doc.title, 'Баланс Agent Router — остаток по API-ключу');
has('хвост бренда', byId.brandTail.textContent, 'остаток');
is('кнопка проверки', byId.submit.textContent, 'Проверить');
has('курс квоты вернулся в подвал', byId.foot.innerHTML, 'id="qpu"');
is('курс квоты подставлен', byId.qpu.textContent, '500 000');
has('пустая таблица подписана', byId.tblEmpty.textContent, 'появятся запросы');

/* Путь по меню в Windows — тот, что назвал заказчик. */
has('раздел Developer', guide, '<b>Developer</b>');
has('кнопка Configure third-party interface', guide, '<b>Configure third-party interface</b>');
has('Credential kind', guide, '<b>Credential kind</b>');
has('static api key', guide, '<b>static api key</b>');
hasnt('значка профиля больше нет', guide, 'значок вашего профиля');

/* ==== 3. английская версия =============================================== */
pickLang('en');
var guideEn = byId.guide.innerHTML;

is('окно выбора закрылось', byId.langGate.classList.contains('hidden'), true);
is('язык документа переключился', doc.documentElement.lang, 'en');
is('заголовок вкладки переведён', doc.title, 'Agent Router balance — what is left on the key');
has('хвост бренда переведён', byId.brandTail.textContent, 'balance');
is('кнопка проверки переведена', byId.submit.textContent, 'Check');
is('счётчик программ переведён', byId.guidesCount.textContent, '15 programs');
has('пустая таблица переведена', byId.tblEmpty.textContent, 'Requests will show up here');
has('курс квоты остался в подвале', byId.foot.innerHTML, 'id="qpu"');
is('курс квоты пересчитан на локаль', byId.qpu.textContent, '500,000');
has('открыта та же карточка', guideEn, '<h3 class="guide__name">Claude App');
has('путь по меню сохранился', guideEn, '<b>Configure third-party interface</b>');
has('Credential kind сохранился', guideEn, '<b>static api key</b>');
is('чипов по-прежнему 15', (byId.picker.innerHTML.match(/data-tool="/g) || []).length, 15);
is('подсвечен один чип', (byId.picker.innerHTML.match(/is-on/g) || []).length, 1);
is('выбор языка так и не сохранён', Object.keys(saved), []);

/* На английской странице кириллицы быть не должно: подписи кнопок языка не в счёт. */
var cyr = Object.keys(byId).filter(function (id) {
  if (id === 'gateTitle' || id === 'gateRu' || id === 'langCtl') return false;
  return /[а-яёА-ЯЁ]/.test(String(byId[id].innerHTML) + String(byId[id].textContent));
});
is('кириллицы в английской версии нет', cyr, []);

/* ==== 4. обратно на русский ============================================== */
pickLang('ru');
is('русский вернулся', byId.submit.textContent, 'Проверить');
is('заголовок вернулся', doc.documentElement.lang, 'ru');
hasnt('английский текст ушёл', screen(), 'Requests will show up here');

/* ==== 5. словарь: обе половины полные ==================================== */
var META = { _locale: 1, _plural: 1, htmlLang: 1, title: 1, metaDesc: 1, langName: 1 };
var kru = Object.keys(win.ARI.ru), ken = Object.keys(win.ARI.en);
is('ключей в обоих языках одинаково', kru.length, ken.length);
is('в английском нет пропусков', kru.filter(function (k) { return !(k in win.ARI.en); }), []);
is('в русском нет пропусков', ken.filter(function (k) { return !(k in win.ARI.ru); }), []);
is('типы значений совпадают', kru.filter(function (k) {
  return Object.prototype.toString.call(win.ARI.ru[k]) !== Object.prototype.toString.call(win.ARI.en[k]);
}), []);
/* Ключ, которого нет в словаре, T() вернёт как есть — такие вызовы ловим по исходнику. */
var app = block('app');
var asked = (app.match(/\bTP?\('[A-Za-z0-9_]+'/g) || []).map(function (m) { return m.replace(/^\w+\('|'$/g, ''); });
is('все запрошенные ключи есть в словаре', asked.filter(function (k) { return !(k in win.ARI.ru) || !(k in win.ARI.en); }), []);
/* Ключи, которые никто не спрашивает, — мёртвый груз в словаре. */
var lit = block('app') + block('core');
is('лишних ключей в словаре нет', kru.filter(function (k) {
  return !META[k] && lit.indexOf("'" + k + "'") < 0;
}), []);
is('формы русского числа', [1, 2, 5, 11, 21].map(function (n) { return win.ARI.ru._plural(n, win.ARI.ru.days); }),
  ['день', 'дня', 'дней', 'дней', 'день']);
is('формы английского числа', [1, 2].map(function (n) { return win.ARI.en._plural(n, win.ARI.en.days); }), ['day', 'days']);

/* ==== 6. инструкции: два языка, одна структура =========================== */
function flat(l) {
  var out = [];
  win.ARG[l].groups.forEach(function (g) { g.tools.forEach(function (t) { out.push(t); }); });
  return out;
}
var tru = flat('ru'), ten = flat('en');
is('групп по три', [win.ARG.ru.groups.length, win.ARG.en.groups.length], [3, 3]);
is('карточек по 15', [tru.length, ten.length], [15, 15]);
is('id совпадают и по порядку', tru.map(function (t) { return t.id; }), ten.map(function (t) { return t.id; }));
is('шагов столько же', tru.map(function (t) { return t.steps.length; }), ten.map(function (t) { return t.steps.length; }));
is('примечаний столько же', tru.map(function (t) { return t.notes.length; }), ten.map(function (t) { return t.notes.length; }));
is('блоков команд столько же', tru.map(function (t) { return t.code.length; }), ten.map(function (t) { return t.code.length; }));
is('способов подключения столько же', tru.map(function (t) { return t.ways.length; }), ten.map(function (t) { return t.ways.length; }));
is('шагов не меньше семи', tru.concat(ten).filter(function (t) { return t.steps.length < 7; }).map(function (t) { return t.id; }), []);
is('в английских карточках нет кириллицы', ten.filter(function (t) {
  return /[а-яёА-ЯЁ]/.test(JSON.stringify([t.name, t.note, t.steps, t.notes, t.ways]));
}).map(function (t) { return t.id; }), []);

/* ==== 7. модели и ссылки ================================================= */
var all = JSON.stringify(win.ARG);
hasnt('нет claude-opus-4-6', all, 'claude-opus-4-6');
hasnt('нет claude-opus-4-7', all, 'claude-opus-4-7');
has('есть claude-opus-5', all, 'claude-opus-5');
has('есть claude-opus-4-8', all, 'claude-opus-4-8');

var head = HTML.slice(0, HTML.indexOf('<script id="i18n">'));
is('внешних ссылок в разметке нет', head.match(/<a [^>]*href="https?:[^"]*"/g) || [], []);
hasnt('в ошибке нет ссылки на консоль', app, '<a href="' + '\' + state.base + \'');
has('надпись обновлена', HTML, 'SAPHIROFF<span>·</span>KIRILLABERNATHEE');
hasnt('старой надписи нет', HTML, 'FUNPAY');
hasnt('памятка без ссылки на консоль', head, 'console/token');
hasnt('поле console в данных убрано', all, '"console"');

has('базовый адрес сервиса', app, "base: 'https://agentrouter.org'");
has('зеркало в настройках', HTML, 'ps.air-outer.com');
has('адреса в инструкциях', all, 'https://agentrouter.org');

/* ==== 8. данные с сервиса, оба языка ===================================== */
byId.key.value = 'sk-test-key';
byId.form.dispatch('submit');

setTimeout(function () {
  is('остаток посчитан', byId.remain.textContent, '$174.60');
  has('подпись под остатком по-русски', byId.remainOf.innerHTML, 'потрачено');
  is('запросов в таблице три', (byId.rows.innerHTML.match(/<tr/g) || []).length, 3);
  has('пополнение в траты не попало', byId.rows.innerHTML, 'gpt-5.6');
  has('часовой пояс подписан', byId.tznote.innerHTML, 'часовому поясу');
  has('время обновления', byId.updated.textContent, 'обновлено');
  has('дата в таблице по-русски', byId.rows.innerHTML, 'авг');

  pickLang('en');
  is('остаток тот же', byId.remain.textContent, '$174.60');
  has('подпись под остатком переведена', byId.remainOf.innerHTML, 'spent');
  is('таблица перерисована', (byId.rows.innerHTML.match(/<tr/g) || []).length, 3);
  has('пояс подписан по-английски', byId.tznote.innerHTML, 'time zone');
  has('время обновления переведено', byId.updated.textContent, 'updated');
  is('прогноз посчитан', /[a-z]/.test(byId.sfc.innerHTML), true);
  /* Шим не связывает innerHTML и textContent, поэтому у каждого узла смотрим то поле,
     в которое пишет страница: иначе в остатке всплывёт надпись из resetView. */
  var cyr2 = [['remain', 'textContent'], ['updated', 'textContent'], ['remainOf', 'innerHTML'],
              ['sreq', 'innerHTML'], ['sfc', 'innerHTML'], ['rows', 'innerHTML'],
              ['tznote', 'innerHTML'], ['modelPick', 'innerHTML']]
    .filter(function (pair) { return /[а-яёА-ЯЁ]/.test(String(byId[pair[0]][pair[1]])); })
    .map(function (pair) { return pair[0]; });
  is('в цифрах и таблице кириллицы нет', cyr2, []);
  has('дата в таблице по-английски', byId.rows.innerHTML, 'Aug');

  console.log(bad.length ? 'ПРОВАЛЫ:\n' + bad.join('\n') : 'смоук: ' + ok + ' проверок пройдено');
  process.exit(bad.length ? 1 : 0);
}, 60);
