    { id:'cline', name:'Cline', note:'расширение VS Code',
      ways:[
        {proto:'Anthropic', base:'https://agentrouter.org', models:'claude-opus-5 · claude-opus-4-8'},
        {proto:'OpenAI Compatible', base:'https://agentrouter.org/v1', models:'gpt-5.5 · glm-5.2'}
      ],
      steps:[
        'Откройте VS Code и нажмите `Ctrl+Shift+X` (на Mac `Cmd+Shift+X`) — слева откроется панель **Extensions**.',
        'Впишите в поиск `Cline` и нажмите **Install** у расширения с этим названием. После установки в левой полосе значков появится иконка Cline — нажмите её.',
        'В панели Cline нажмите шестерёнку в правом верхнем углу. Откроются настройки, нужный раздел называется **API Configuration**.',
        'Дальше два пути, выберите один. Для моделей Claude в поле **API Provider** выберите **Anthropic**.',
        'Поставьте галочку **Use custom base URL** — под ней появится поле для адреса.',
        'В **Custom Base URL** впишите `https://agentrouter.org`. Никакого `/v1` здесь быть не должно.',
        'В **API Key** вставьте `{{KEY}}`.',
        'В списке **Model** выберите `claude-opus-5`; доступна также `claude-opus-4-8`.',
        'Второй путь — для `gpt-5.5` и `glm-5.2`. В **API Provider** выберите **OpenAI Compatible**, в **Base URL** впишите `https://agentrouter.org/v1`, в **API Key** — `{{KEY}}`, а **Model ID** наберите руками: готового списка там нет.',
        'Проверьте связь: напишите в чате Cline «ответь только OK». Пришло OK — всё работает.',
        'Проверьте доступ к файлам: «посмотри файлы в этой папке и скажи, есть ли README, ничего не меняй».'
      ],
      code:[],
      notes:['Способы независимы: либо Anthropic без `/v1`, либо OpenAI Compatible с `/v1`. Смешивать адрес одного с протоколом другого нельзя.',
             'Названия разделов настроек у Cline менялись между версиями. Если раздела **API Configuration** нет, ищите в настройках самый первый блок — с полями **API Provider** и **API Key**.']
    },

    { id:'roocode', name:'Roo Code', note:'расширение VS Code',
      ways:[
        {proto:'Anthropic', base:'https://agentrouter.org', models:'claude-opus-5 · claude-opus-4-8'},
        {proto:'OpenAI Compatible', base:'https://agentrouter.org/v1', models:'gpt-5.5 · glm-5.2'}
      ],
      steps:[
        'Откройте VS Code и нажмите `Ctrl+Shift+X` (на Mac `Cmd+Shift+X`) — откроется панель **Extensions**.',
        'Впишите в поиск `Roo Code` и нажмите **Install**.',
        'Нажмите иконку Roo Code в левой полосе значков, затем шестерёнку в правом верхнем углу панели — откроются настройки.',
        'Перейдите в раздел настроек с полями провайдера: в свежих версиях он называется **Providers**, в старых — **API Configuration**.',
        'Сверху есть список **Configuration Profile**. Можно оставить текущий профиль, а можно нажать плюс рядом и завести отдельный — тогда старые настройки не потеряются.',
        'Для моделей Claude в поле **API Provider** выберите **Anthropic**.',
        'Поставьте галочку **Use custom base URL** и в появившемся поле впишите `https://agentrouter.org` — без `/v1`.',
        'В **API Key** вставьте `{{KEY}}`.',
        'Моделью выберите `claude-opus-5`, а если её нет в списке — `claude-opus-4-8`.',
        'Для `gpt-5.5` и `glm-5.2` возьмите **API Provider** → **OpenAI Compatible**, **Base URL** → `https://agentrouter.org/v1`, а **Model ID** впишите руками.',
        'Нажмите **Save** (в некоторых версиях кнопка называется **Done**) и напишите в чате: «ответь только OK».'
      ],
      code:[],
      notes:['Список моделей Roo Code подтягивает сам и обновляет с задержкой, поэтому самые свежие модели появляются в нём не сразу.']
    },

    { id:'kilocode', name:'Kilo Code', note:'расширение VS Code',
      ways:[
        {proto:'Anthropic Messages', base:'https://agentrouter.org/v1', models:'claude-opus-5 · claude-opus-4-8'},
        {proto:'OpenAI Compatible', base:'https://agentrouter.org/v1', models:'gpt-5.5 · glm-5.2'}
      ],
      steps:[
        'Откройте VS Code и нажмите `Ctrl+Shift+X` (на Mac `Cmd+Shift+X`).',
        'Впишите в поиск `Kilo Code` и нажмите **Install**.',
        'Нажмите иконку Kilo Code в левой полосе значков, затем шестерёнку в правом верхнем углу панели — откроются настройки.',
        'Перейдите на экран **Providers** и нажмите **Custom Provider** — так добавляют своё подключение вместо готового.',
        'В **Provider ID** впишите `agentrouter`.',
        'В **Display Name** впишите любое понятное вам название, например `Agent Router`. Оно нужно только для списка.',
        'В **Provider API** выберите **Anthropic Messages** для моделей Claude или **OpenAI Compatible** для `gpt-5.5` и `glm-5.2`.',
        'В **Base URL** впишите `https://agentrouter.org/v1`. Это единственная программа в списке, где `/v1` нужен и для Anthropic — не пропустите.',
        'В **API Key** вставьте `{{KEY}}`.',
        'В **Model** укажите `claude-opus-5` или `claude-opus-4-8`, либо `gpt-5.5` / `glm-5.2`.',
        'Нажмите **Submit** — подключение сохранится и появится в списке провайдеров.',
        'Напишите в чате: «ответь только OK».'
      ],
      code:[],
      notes:['Единственное исключение из общего правила: Kilo Code ждёт `/v1` даже для Anthropic Messages.']
    },

    { id:'claude-code-vscode', name:'Claude Code', note:'расширение VS Code',
      ways:[{proto:'Anthropic', base:'https://agentrouter.org', models:'claude-opus-5 · claude-opus-4-8'}],
      steps:[
        'Откройте VS Code и нажмите `Ctrl+Shift+X` (на Mac `Cmd+Shift+X`), впишите в поиск `Claude Code` и нажмите **Install**.',
        'Проверьте, стоит ли сама программа. Откройте встроенный терминал: меню **Terminal** → **New Terminal**, и введите `claude --version`.',
        'Если версия не напечаталась, поставьте программу командой из блока «Установка программы» ниже и повторите `claude --version`.',
        'Нажмите `Ctrl+Shift+P` (на Mac `Cmd+Shift+P`) — сверху откроется строка команд.',
        'Наберите в ней `Open User Settings (JSON)` и выберите пункт **Preferences: Open User Settings (JSON)**.',
        'Откроется файл `settings.json`. Вставьте в него содержимое блока `settings.json` ниже. Если в файле уже что-то есть, добавляйте только строки изнутри внешних фигурных скобок и не забудьте запятую между блоками.',
        'Сохраните файл: `Ctrl+S` (на Mac `Cmd+S`).',
        'Уберите окно входа в Anthropic. Вернитесь в **Extensions** (`Ctrl+Shift+X`), нажмите на расширение **Claude Code** — откроется его страница, там нажмите шестерёнку → **Settings** и поставьте галочку **Disable Login Prompt**.',
        'Перезагрузите окно редактора: `Ctrl+Shift+P` (на Mac `Cmd+Shift+P`) → **Developer: Reload Window**. Без перезагрузки переменные не подхватятся.',
        'Откройте панель Claude Code и напишите: «ответь только OK».'
      ],
      code:[
        {title:'Установка программы', lang:'bash', text:
'# macOS, Linux, WSL\n' +
'curl -fsSL https://claude.ai/install.sh | bash\n' +
'\n' +
'# Windows PowerShell\n' +
'irm https://claude.ai/install.ps1 | iex'},
        {title:'settings.json', lang:'json', text:
'{\n' +
'  "claudeCode.environmentVariables": [\n' +
'    { "name": "ANTHROPIC_AUTH_TOKEN", "value": "{{KEY}}" },\n' +
'    { "name": "ANTHROPIC_BASE_URL", "value": "https://agentrouter.org" },\n' +
'    { "name": "CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY", "value": "1" },\n' +
'    { "name": "ANTHROPIC_MODEL", "value": "claude-opus-5" }\n' +
'  ],\n' +
'  "claudeCode.disableLoginPrompt": true,\n' +
'  "claudeCode.initialPermissionMode": "acceptEdits"\n' +
'}'}
      ],
      notes:['`ANTHROPIC_BASE_URL` пишется без `/v1`: расширение общается по протоколу Anthropic.',
             'Галочка **Disable Login Prompt** и строка `"claudeCode.disableLoginPrompt": true` в файле — это одно и то же. Достаточно любого из двух, вместе они не мешают.',
             'Модель меняется в строке `ANTHROPIC_MODEL`: `claude-opus-5` или `claude-opus-4-8`.',
             'Если в этом же VS Code вы работали по подписке Claude Pro или Max, переменные её перебьют — запросы пойдут через Agent Router.']
    },

    { id:'github-copilot', name:'GitHub Copilot', note:'расширение VS Code',
      ways:[
        {proto:'Messages', base:'https://agentrouter.org', models:'claude-opus-5 · claude-opus-4-8'},
        {proto:'Chat Completions', base:'https://agentrouter.org/v1', models:'gpt-5.5 · glm-5.2'}
      ],
      steps:[
        'Copilot обычно уже встроен в VS Code. Если его нет — `Ctrl+Shift+X` (на Mac `Cmd+Shift+X`), поиск `GitHub Copilot`, кнопка **Install**.',
        'Войдите в аккаунт GitHub: значок профиля в левом нижнем углу VS Code → пункт про вход в **GitHub**. Пока вход не сделан, пункта добавления модели в интерфейсе не будет вовсе.',
        'Откройте чат Copilot: `Ctrl+Alt+I` (на Mac `Cmd+Ctrl+I`) либо иконка чата в верхней части окна.',
        'Внизу окна чата, рядом с полем ввода, есть список выбора модели. Нажмите его и выберите **Manage Models**.',
        'В открывшемся списке провайдеров выберите **Add Model**, затем **Custom endpoint** — это и есть подключение своего адреса.',
        'В поле имени группы впишите `AgentRouter`, а в поле ключа вставьте `{{KEY}}`.',
        'Выберите формат запроса: **Messages** для моделей Claude, **Chat Completions** для `gpt-5.5` и `glm-5.2`.',
        'Откроется редактор модели. Заполните **Model ID** — `claude-opus-5`, `claude-opus-4-8`, `gpt-5.5` или `glm-5.2`.',
        'Отображаемое имя впишите любое: оно нужно только вам, чтобы отличать модель в списке.',
        'Адрес зависит от формата: для **Messages** — `https://agentrouter.org`, для **Chat Completions** — `https://agentrouter.org/v1`. Сохраните.',
        'Выберите новую модель в том же списке внизу чата и напишите: «ответь только OK».'
      ],
      code:[],
      notes:['Формат и адрес идут парой: Messages — без `/v1`, Chat Completions — с `/v1`.',
             'В документации сервиса эти пункты меню приведены по-китайски, а место показано скриншотами. В английском интерфейсе они называются **Manage Models**, **Add Model** и **Custom endpoint**; в свежих сборках формулировки немного плавают — ищите пункт про свой (custom) адрес.']
    }

  ]},
  {
    title: 'Командная строка',
    tools: [