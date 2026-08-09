/* Смоук-прогон страницы без браузера: самодельный DOM, поддельная сеть.
   Отвечает на один вопрос — страница поднимается и раздел инструкций
   открывается на нужной карточке. Полные наборы проверок (core, e2e)
   живут во временной папке песочницы и переживают только одну сессию. */
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
    value: '', checked: false, disabled: false, hidden: false, dataset: {}, style: {},
    children: [], handlers: {},
    classList: {
      _s: {},
      add: function () { for (var i = 0; i < arguments.length; i++) this._s[arguments[i]] = 1; },
      remove: function () { for (var i = 0; i < arguments.length; i++) delete this._s[arguments[i]]; },
      toggle: function (c, on) { if (on === undefined) on = !this._s[c]; on ? this.add(c) : this.remove(c); },
      contains: function (c) { return !!this._s[c]; }
    },
    setAttribute: function (k, v) { this[k] = v; },
    appendChild: function (c) { this.children.push(c); return c; },
    addEventListener: function (t, fn) { (this.handlers[t] = this.handlers[t] || []).push(fn); },
    dispatch: function (t, ev) {
      ev = ev || {}; ev.type = t; ev.target = ev.target || this;
      ev.preventDefault = ev.preventDefault || function () {};
      (this.handlers[t] || []).forEach(function (fn) { fn(ev); });
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
var doc = {
  body: node('body'),
  activeElement: null,
  getElementById: function (id) { return byId[id] || null; },
  createElement: function (t) { return node(t); },
  querySelectorAll: function () { return []; },
  addEventListener: function () {},
  execCommand: function () { return true; }
};

function storage() {
  var m = {};
  return {
    getItem: function (k) { return k in m ? m[k] : null; },
    setItem: function (k, v) { m[k] = String(v); },
    removeItem: function (k) { delete m[k]; }
  };
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

var win = {};
new Function('window', block('core'))(win);
new Function('window', block('guides'))(win);
new Function('window', 'document', 'localStorage', 'fetch', 'navigator', block('app'))(
  win, doc, storage(), function () { return Promise.reject(new Error('нет сети')); }, {});

var guide = byId.guide.innerHTML, picker = byId.picker.innerHTML;

/* 1. Раздел инструкций открылся на Claude App. */
has('по умолчанию открыт Claude App', guide, '<h3 class="guide__name">Claude App');
is('подсвечен ровно один чип', (picker.match(/is-on/g) || []).length, 1);
has('подсвечен именно Claude App', picker, 'data-tool="claude-app" aria-pressed="true"');
is('чипов ровно 15', (picker.match(/data-tool="/g) || []).length, 15);
is('счётчик программ', byId.guidesCount.textContent, '15 программ');

/* 2. Путь по меню в Windows — тот, что назвал заказчик. */
has('раздел Developer', guide, '<b>Developer</b>');
has('кнопка Configure third-party interface', guide, '<b>Configure third-party interface</b>');
has('Credential kind', guide, '<b>Credential kind</b>');
has('static api key', guide, '<b>static api key</b>');
hasnt('значка профиля больше нет', guide, 'значок вашего профиля');

/* 3. Модели: только актуальные. */
var all = JSON.stringify(win.ARG);
hasnt('нет claude-opus-4-6', all, 'claude-opus-4-6');
hasnt('нет claude-opus-4-7', all, 'claude-opus-4-7');
has('есть claude-opus-5', all, 'claude-opus-5');
has('есть claude-opus-4-8', all, 'claude-opus-4-8');

/* 4. Ссылок на сайт вне инструкций не осталось. */
var head = HTML.slice(0, HTML.indexOf('<script id="guides">'));
var links = (head.match(/<a [^>]*href="https?:[^"]*"/g) || []);
is('внешних ссылок в разметке нет', links, []);
hasnt('в ошибке нет ссылки на консоль', block('app'), '<a href="' + '\' + state.base + \'');
has('надпись обновлена', HTML, 'SAPHIROFF<span>·</span>KIRILLABERNATHEE');
hasnt('старой надписи нет', HTML, 'FUNPAY');
hasnt('памятка без ссылки на консоль', head, 'console/token');
is('поле console в данных убрано', win.ARG.console, undefined);

/* 5. Адреса, которые нужны для работы, на месте. */
has('базовый адрес сервиса', block('app'), "base: 'https://agentrouter.org'");
has('зеркало в настройках', HTML, 'ps.air-outer.com');
has('адреса в инструкциях', all, 'https://agentrouter.org');

console.log(bad.length ? 'ПРОВАЛЫ:\n' + bad.join('\n') : 'смоук: ' + ok + ' проверок пройдено');
process.exit(bad.length ? 1 : 0);
