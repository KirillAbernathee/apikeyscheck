    { id:'hermes', name:'Hermes Agent', note:'CLI от Nous Research',
      ways:[
        {proto:'anthropic-messages', base:'https://agentrouter.org', models:'claude-opus-5'},
        {proto:'OpenAI Compatible', base:'https://agentrouter.org/v1', models:'gpt-5.5 · glm-5.2'}
      ],
      steps:[
        'Откройте терминал: на macOS и Linux — **Terminal**, в Windows — **Пуск** → `PowerShell` → **Windows PowerShell**.',
        'Поставьте Hermes командой для вашей системы — блоки «Установка» ниже. На macOS и Linux подойдёт и `pipx`, если он у вас есть.',
        'Проверьте: `hermes --version`.',
        'Положите ключ в переменную окружения `AGENTROUTER_API_KEY`. В файле расширения ключа нет — там стоит ссылка на эту переменную.',
        'Запустите мастер: `hermes setup model`, и заведите в нём провайдера AgentRouter.',
        'Пункты этого мастера документация сервиса не расписывает, поэтому идите по подсказкам на экране: адрес — `https://agentrouter.org` для Claude или `https://agentrouter.org/v1` для остальных моделей, ключ — `{{KEY}}`.',
        'Создайте файл своего provider extension и вставьте в него **один** из двух блоков ниже.',
        'Запустите `hermes chat` и напишите «ответь только OK».',
        'Проверьте доступ к файлам: «перечисли файлы в этой папке и скажи, есть ли README».'
      ],
      code:[
        {title:'Установка · macOS, Linux, WSL', lang:'bash', text:
'curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash\n' +
'\n' +
'# либо через pipx\n' +
'pipx install hermes-agent\n' +
'\n' +
'hermes --version'},
        {title:'Установка · Windows PowerShell', lang:'powershell', text:
'iex (irm https://hermes-agent.nousresearch.com/install.ps1)\n' +
'\n' +
'$env:AGENTROUTER_API_KEY="{{KEY}}"'},
        {title:'Ключ и мастер настройки', lang:'bash', text:
'export AGENTROUTER_API_KEY="{{KEY}}"\n' +
'hermes setup model'},
        {title:'Provider extension · вариант Anthropic', lang:'typescript', text:
'export default function (pi: ExtensionAPI) {\n' +
'  pi.registerProvider("agentrouter-claude", {\n' +
'    name: "AgentRouter Claude",\n' +
'    baseUrl: "https://agentrouter.org",\n' +
'    apiKey: process.env.AGENTROUTER_API_KEY,\n' +
'    api: "anthropic-messages",\n' +
'    models: [\n' +
'      {\n' +
'        id: "claude-opus-5",\n' +
'        name: "claude-opus-5",\n' +
'        input: ["text"],\n' +
'        contextWindow: 1000000,\n' +
'        maxTokens: 8192\n' +
'      }\n' +
'    ]\n' +
'  });\n' +
'}'},
        {title:'Provider extension · вариант OpenAI', lang:'typescript', text:
'export default function (pi: ExtensionAPI) {\n' +
'  pi.registerProvider("agentrouter-openai", {\n' +
'    name: "AgentRouter openai",\n' +
'    baseUrl: "https://agentrouter.org/v1",\n' +
'    apiKey: process.env.AGENTROUTER_API_KEY,\n' +
'    api: "OpenAI Compatible",\n' +
'    models: [\n' +
'      {\n' +
'        id: "gpt-5.5",\n' +
'        name: "gpt-5.5",\n' +
'        input: ["text"],\n' +
'        contextWindow: 1000000,\n' +
'        maxTokens: 8192\n' +
'      }\n' +
'    ]\n' +
'  });\n' +
'}'}
      ],
      notes:['Ключ читается из переменной `AGENTROUTER_API_KEY`, поэтому файл расширения можно спокойно хранить в репозитории.',
             'Куда положить файл расширения, документация сервиса не указывает — посмотрите `hermes --help` или раздел про extensions в документации самого Hermes.']
    },

    { id:'pi', name:'Pi', note:'CLI',
      ways:[
        {proto:'anthropic-messages', base:'https://agentrouter.org', models:'claude-opus-5'},
        {proto:'openai-completions', base:'https://agentrouter.org/v1', models:'gpt-5.5 · glm-5.2'}
      ],
      steps:[
        'Откройте терминал. В Windows сначала войдите в WSL: **Пуск** → наберите `wsl` → `Enter`; дальше все команды как в Linux.',
        'Поставьте Pi: `curl -fsSL https://pi.dev/install.sh | sh`.',
        'Проверьте: `pi --version`.',
        'Создайте папку для настроек: `mkdir -p ~/.pi/agent`.',
        'Откройте файл настроек: `nano ~/.pi/agent/models.json`.',
        'Вставьте **один** из двух блоков ниже — для моделей Claude или для `gpt-5.5`.',
        'Сохраните и закройте редактор: `Ctrl+O`, `Enter`, затем `Ctrl+X`.',
        'Задайте переменную с ключом: `export AGENTROUTER_API_KEY="{{KEY}}"`. В конфиге стоит ссылка `$AGENTROUTER_API_KEY`, поэтому без переменной ключа не будет.',
        'Запустите `pi` и выберите в списке моделей `agentrouter/claude-opus-5` либо `agentrouter/gpt-5.5`.',
        'Напишите «ответь только OK».'
      ],
      code:[
        {title:'Установка', lang:'bash', text:
'curl -fsSL https://pi.dev/install.sh | sh\n' +
'pi --version\n' +
'\n' +
'mkdir -p ~/.pi/agent\n' +
'nano ~/.pi/agent/models.json'},
        {title:'~/.pi/agent/models.json · вариант Anthropic', lang:'json', text:
'{\n' +
'  "providers": {\n' +
'    "agentrouter": {\n' +
'      "baseUrl": "https://agentrouter.org",\n' +
'      "api": "anthropic-messages",\n' +
'      "apiKey": "$AGENTROUTER_API_KEY",\n' +
'      "models": [\n' +
'        { "id": "claude-opus-5", "name": "claude-opus-5" }\n' +
'      ]\n' +
'    }\n' +
'  }\n' +
'}'},
        {title:'~/.pi/agent/models.json · вариант OpenAI', lang:'json', text:
'{\n' +
'  "providers": {\n' +
'    "agentrouter": {\n' +
'      "baseUrl": "https://agentrouter.org/v1",\n' +
'      "api": "openai-completions",\n' +
'      "apiKey": "$AGENTROUTER_API_KEY",\n' +
'      "models": [\n' +
'        { "id": "gpt-5.5", "name": "gpt-5.5" }\n' +
'      ]\n' +
'    }\n' +
'  }\n' +
'}'},
        {title:'Ключ и запуск', lang:'bash', text:
'export AGENTROUTER_API_KEY="{{KEY}}"\n' +
'pi'}
      ],
      notes:['Установщик рассчитан на POSIX-систему: у Pi нет варианта `install.ps1`. В Windows разворачивайте Pi внутри WSL или Ubuntu, в PowerShell скрипт запускать не надо.']
    }

  ]},
  {
    title: 'Приложения и редакторы',
    tools: [

    { id:'claude-app', name:'Claude App', note:'настольное приложение',
      ways:[{proto:'Gateway', base:'https://agentrouter.org', models:'модель выбирается в самом приложении'}],
      steps:[
        'Включите режим разработчика: в верхнем меню **Help** → **Troubleshooting** → **Enable developer mode**.',
        'Откройте меню приложения: в Windows — кнопка с тремя полосками в левом верхнем углу окна; на Mac — меню **Claude** → **Settings** (`Cmd+,`).',
        'Перейдите в раздел **Developer** и нажмите кнопку **Configure third-party interface**.',
        'Откроется окно настроек шлюза. Узнать его можно по четырём полям: **Credential kind**, **Gateway base URL**, **Gateway API key**, **Gateway auth scheme**.',
        'В **Credential kind** выберите вариант **static api key**. Без этого ключ не примут: приложение будет ждать другой способ авторизации.',
        'В **Gateway base URL** впишите `https://agentrouter.org` — без `/v1`.',
        'В **Gateway API key** вставьте `{{KEY}}`.',
        'В **Gateway auth scheme** выберите `bearer`.',
        'Нажмите **Apply locally**, затем **Relaunch now** — приложение закроется и откроется само.',
        'После перезапуска выберите модель в списке в левом нижнем углу окна.',
        'Проверьте связь: напишите в чате «ответь только OK».'
      ],
      code:[],
      notes:['Пока режим разработчика выключен, раздела **Developer** и кнопки **Configure third-party interface** в меню нет вовсе. Не нашли их — вернитесь к первому шагу и проверьте, что **Enable developer mode** действительно включён.',
             'В документации сервиса этот экран показан только скриншотом, а поле **Credential kind** там вообще не упомянуто, хотя заполнить его обязательно. Путь через **Developer** → **Configure third-party interface** проверен в Windows-версии приложения; в других сборках названия могут немного отличаться — ориентируйтесь на слово **Gateway**.']
    },

    { id:'trae', name:'Trae', note:'редактор кода',
      ways:[
        {proto:'Anthropic Messages', base:'https://agentrouter.org', models:'claude-opus-5 · claude-opus-4-8'},
        {proto:'OpenAI Completions', base:'https://agentrouter.org', models:'gpt-5.5 · glm-5.2'}
      ],
      steps:[
        'Скачайте Trae с официального сайта, выбрав версию для своей системы, и установите.',
        'При первом запуске войдите в аккаунт. Достаточно личного (personal): без входа раздел **Models** и кнопка **Add Model** просто недоступны.',
        'Откройте **Settings**, а в списке слева выберите **Models**.',
        'Нажмите **Add Model** и переключитесь на вкладку **Custom Config**.',
        'В **API Format** выберите **Anthropic Messages** для моделей Claude или **OpenAI Completions** для `gpt-5.5` и `glm-5.2`.',
        'В **Custom Request URL** впишите `https://agentrouter.org`. Ни `/v1`, ни слэша в конце.',
        'В **Model ID** укажите `claude-opus-5` или `claude-opus-4-8`, либо `gpt-5.5` / `glm-5.2`.',
        'В **API Key** вставьте `{{KEY}}`.',
        'Нажмите **Add Model** — та же кнопка внизу формы сохраняет модель.',
        'Выберите новую модель в чате и напишите «ответь только OK».'
      ],
      code:[],
      notes:['Второе исключение из правила про `/v1`: при выключенном переключателе **Full URL** Trae сам достраивает путь, поэтому `/v1` не дописывают даже для OpenAI Completions.']
    },

    { id:'cursor', name:'Cursor', note:'редактор кода',
      ways:[{proto:'OpenAI Compatible', base:'https://agentrouter.org/v1', models:'gpt-5.5 · glm-5.2'}],
      steps:[
        'Скачайте Cursor с официального сайта, установите и войдите в аккаунт — без входа настройки моделей закрыты.',
        'Откройте **Cursor Settings**: `Ctrl+Shift+J` (на Mac `Cmd+Shift+J`) либо шестерёнка в правом верхнем углу окна.',
        'Перейдите в раздел **Models**.',
        'Найдите поле **OpenAI API Key**, вставьте в него `{{KEY}}` и включите переключатель рядом с полем.',
        'Включите переключатель **Override OpenAI Base URL**, а в появившемся поле впишите `https://agentrouter.org/v1` — здесь `/v1` обязателен.',
        'Сохраните ключ кнопкой рядом с полем: в разных версиях она называется **Verify** или **Save**.',
        'Напишите в чате «ответь только OK».'
      ],
      code:[],
      notes:['На бесплатном тарифе Cursor не даёт выбирать модель руками даже со своим ключом — работает только режим auto. Если это мешает, возьмите любой другой редактор из списка.',
             'Списка доступных моделей документация сервиса для Cursor не приводит; рабочие варианты — те же `gpt-5.5` и `glm-5.2`, что и у остальных OpenAI-совместимых клиентов.']
    }

  ]}
  ]
};