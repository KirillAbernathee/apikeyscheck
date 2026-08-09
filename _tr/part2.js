    { id:'claude-code', name:'Claude Code', note:'CLI',
      ways:[{proto:'Anthropic', base:'https://agentrouter.org', models:'claude-opus-5 · claude-opus-4-8'}],
      steps:[
        'Откройте терминал. В Windows: **Пуск** → наберите `PowerShell` → **Windows PowerShell**. На Mac: **Launchpad** → **Terminal**.',
        'Проверьте Node.js командой `node --version`. Нужна версия 18 или новее. Если команда не найдена, сначала поставьте Node.js с сайта nodejs.org.',
        'Поставьте программу: `npm install -g @anthropic-ai/claude-code@latest`. Установка занимает минуту-две.',
        'Убедитесь, что команда появилась: `claude --version` должна напечатать номер версии.',
        'Задайте три переменные окружения — ключ, адрес сервиса и модель. Возьмите блок для вашей системы ниже и вставьте его в то же окно терминала.',
        'Перейдите в папку проекта: `cd` и путь к папке. Например `cd ~/Desktop/my-project`, в Windows — `cd $HOME\\Desktop\\my-project`.',
        'Запустите `claude`.',
        'Если при первом запуске спросят, использовать ли ключ из переменных окружения, — согласитесь.',
        'Напишите «ответь только OK».',
        'Проверьте доступ к файлам: «перечисли файлы в этой папке и скажи, есть ли README, ничего не меняй».'
      ],
      code:[
        {title:'Установка', lang:'bash', text:
'node --version\n' +
'npm install -g @anthropic-ai/claude-code@latest\n' +
'claude --version'},
        {title:'Переменные · macOS, Linux, WSL', lang:'bash', text:
'export ANTHROPIC_AUTH_TOKEN="{{KEY}}"\n' +
'export ANTHROPIC_BASE_URL="https://agentrouter.org"\n' +
'export ANTHROPIC_MODEL="claude-opus-5"\n' +
'\n' +
'claude'},
        {title:'Переменные · Windows PowerShell', lang:'powershell', text:
'$env:ANTHROPIC_AUTH_TOKEN="{{KEY}}"\n' +
'$env:ANTHROPIC_BASE_URL="https://agentrouter.org"\n' +
'$env:ANTHROPIC_MODEL="claude-opus-5"\n' +
'\n' +
'claude'},
        {title:'Вернуть подписку Claude Pro или Max', lang:'bash', text:
'unset ANTHROPIC_AUTH_TOKEN\n' +
'unset ANTHROPIC_BASE_URL\n' +
'unset ANTHROPIC_MODEL'}
      ],
      notes:['`ANTHROPIC_BASE_URL` — без `/v1`: адрес с `/v1` нужен только OpenAI-совместимым клиентам.',
             'Переменные живут только в этом окне терминала. Закрыли окно — задавайте заново. Чтобы прописать навсегда, добавьте строки `export …` в конец `~/.zshrc` или `~/.bashrc`, а в Windows: **Пуск** → «Изменение системных переменных среды» → кнопка **Переменные среды** → **Создать**.',
             'Пока эти переменные заданы, они перебивают вход в подписку Claude Pro, Max или Team — запросы идут через Agent Router. Чтобы вернуть подписку, снимите переменные командами выше и запустите `claude` заново.']
    },

    { id:'codex', name:'Codex', note:'CLI от OpenAI',
      ways:[{proto:'OpenAI Compatible', base:'https://agentrouter.org/v1', models:'gpt-5.6 · gpt-5.5 · glm-5.2'}],
      steps:[
        'Откройте терминал. В Windows: **Пуск** → наберите `PowerShell` → **Windows PowerShell**. На Mac: **Launchpad** → **Terminal**.',
        'Проверьте Node.js: `node --version`. Нужна версия 18 или новее.',
        'Поставьте Codex: `pnpm install -g @openai/codex`. Если pnpm не установлен, подойдёт `npm install -g @openai/codex`.',
        'Проверьте: `codex --version`.',
        'Создайте файл настроек. На Mac и Linux это `~/.codex/config.toml`, в Windows — `C:\\Users\\<ваше имя>\\.codex\\config.toml`. Папку `.codex` обычно приходится создавать самому — команды в блоке «Создать файл настроек» ниже делают и папку, и файл.',
        'Вставьте в открывшийся файл содержимое блока `config.toml` ниже и сохраните. В редакторе `nano` это `Ctrl+O`, `Enter`, `Ctrl+X`.',
        'Если правите файл через Блокнот, следите, чтобы он не сохранился как `config.toml.txt`: в окне сохранения выберите тип «Все файлы».',
        'Перейдите в папку проекта: `cd my-project`.',
        'Запустите `codex` и напишите «ответь только OK».'
      ],
      code:[
        {title:'Установка', lang:'bash', text:
'node --version\n' +
'pnpm install -g @openai/codex\n' +
'codex --version'},
        {title:'Создать файл настроек', lang:'bash', text:
'# macOS, Linux, WSL\n' +
'mkdir -p ~/.codex\n' +
'nano ~/.codex/config.toml\n' +
'\n' +
'# Windows PowerShell\n' +
'mkdir "$HOME\\.codex" -Force\n' +
'notepad "$HOME\\.codex\\config.toml"'},
        {title:'Файл ~/.codex/config.toml', lang:'toml', text:
'model = "gpt-5.5"\n' +
'model_provider = "agentrouter"\n' +
'\n' +
'[model_providers.agentrouter]\n' +
'name = "AgentRouter"\n' +
'base_url = "https://agentrouter.org/v1"\n' +
'wire_api = "responses"\n' +
'experimental_bearer_token = "{{KEY}}"'},
        {title:'Запуск', lang:'bash', text:
'cd my-project\n' +
'codex'}
      ],
      notes:['Ключ здесь живёт не в переменной окружения, а прямо в конфиге — в поле `experimental_bearer_token`.',
             'Другую модель включают строкой `model` в начале файла: `gpt-5.6`, `gpt-5.5` или `glm-5.2`.']
    },

    { id:'qwencode', name:'Qwen Code', note:'CLI',
      ways:[
        {proto:'Anthropic', base:'https://agentrouter.org', models:'claude-opus-5 · claude-opus-4-8'},
        {proto:'OpenAI Compatible', base:'https://agentrouter.org/v1', models:'gpt-5.5 · glm-5.2'}
      ],
      steps:[
        'Откройте терминал. В Windows: **Пуск** → наберите `PowerShell` → **Windows PowerShell**. На Mac: **Launchpad** → **Terminal**.',
        'Проверьте Node.js: `node --version`. Нужна версия 18 или новее.',
        'Поставьте программу: `npm install -g @qwen-code/qwen-code@latest`.',
        'Проверьте: `qwen --version`.',
        'Выберите **один** набор переменных: `ANTHROPIC_*` для моделей Claude либо `OPENAI_*` для `gpt-5.5` и `glm-5.2`. Оба сразу задавать нельзя.',
        'Скопируйте нужный блок ниже в то же окно терминала.',
        'Перейдите в папку проекта командой `cd` и путь к папке.',
        'Запустите `qwen` и напишите «ответь только OK».',
        'Проверьте доступ к файлам: «перечисли файлы в этой папке и скажи, есть ли README».'
      ],
      code:[
        {title:'Установка', lang:'bash', text:
'node --version\n' +
'npm install -g @qwen-code/qwen-code@latest\n' +
'qwen --version'},
        {title:'Вариант Anthropic · macOS, Linux, WSL', lang:'bash', text:
'export ANTHROPIC_AUTH_TOKEN="{{KEY}}"\n' +
'export ANTHROPIC_BASE_URL="https://agentrouter.org"\n' +
'export ANTHROPIC_MODEL="claude-opus-5"\n' +
'\n' +
'qwen'},
        {title:'Вариант OpenAI · macOS, Linux, WSL', lang:'bash', text:
'export OPENAI_API_KEY="{{KEY}}"\n' +
'export OPENAI_BASE_URL="https://agentrouter.org/v1"\n' +
'export OPENAI_MODEL="gpt-5.5"\n' +
'\n' +
'qwen'},
        {title:'То же самое · Windows PowerShell', lang:'powershell', text:
'# вариант Anthropic\n' +
'$env:ANTHROPIC_AUTH_TOKEN="{{KEY}}"\n' +
'$env:ANTHROPIC_BASE_URL="https://agentrouter.org"\n' +
'$env:ANTHROPIC_MODEL="claude-opus-5"\n' +
'\n' +
'# вариант OpenAI\n' +
'$env:OPENAI_API_KEY="{{KEY}}"\n' +
'$env:OPENAI_BASE_URL="https://agentrouter.org/v1"\n' +
'$env:OPENAI_MODEL="gpt-5.5"'}
      ],
      notes:['Наборы не смешиваются: либо `ANTHROPIC_*` без `/v1`, либо `OPENAI_*` с `/v1`. Если заданы оба, клиент выберет один и другой будет мешать.',
             'Переменные действуют только в текущем окне терминала — после его закрытия задайте их снова.']
    },

    { id:'opencode', name:'OpenCode', note:'CLI',
      ways:[
        {proto:'Anthropic', base:'https://agentrouter.org', models:'claude-opus-5'},
        {proto:'OpenAI Compatible', base:'https://agentrouter.org/v1', models:'gpt-5.5 · glm-5.2'}
      ],
      steps:[
        'Откройте терминал. В Windows: **Пуск** → наберите `PowerShell` → **Windows PowerShell**. На Mac: **Launchpad** → **Terminal**.',
        'Сразу перейдите в папку проекта: `cd ~/Desktop/my-project`, в Windows — `cd $HOME\\Desktop\\my-project`. Настройки OpenCode привязаны к папке, поэтому шаг не пропускайте.',
        'Поставьте OpenCode: на macOS и Linux скриптом, на любой системе — через npm. Команды в блоке «Установка» ниже.',
        'Проверьте: `opencode --version`.',
        'Создайте в этой же папке файл `opencode.json` и вставьте в него **один** из двух блоков ниже: для моделей Claude или для `gpt-5.5`.',
        'Сохраните ключ отдельной командой: `opencode providers login --provider agentrouter`.',
        'Программа спросит ключ — вставьте `{{KEY}}` и нажмите `Enter`. В файле `opencode.json` ключа нет и быть не должно.',
        'Запустите `opencode` и напишите «ответь только OK».',
        'Проверьте доступ к файлам: «перечисли файлы в этой папке и скажи, есть ли README».'
      ],
      code:[
        {title:'Установка', lang:'bash', text:
'# macOS, Linux, WSL\n' +
'curl -fsSL https://opencode.ai/install | bash\n' +
'\n' +
'# любая система, через npm\n' +
'npm install -g opencode-ai\n' +
'\n' +
'opencode --version'},
        {title:'opencode.json · вариант Anthropic', lang:'json', text:
'{\n' +
'  "$schema": "https://opencode.ai/config.json",\n' +
'  "provider": {\n' +
'    "agentrouter": {\n' +
'      "npm": "@ai-sdk/anthropic",\n' +
'      "name": "AgentRouter (Anthropic)",\n' +
'      "options": {\n' +
'        "baseURL": "https://agentrouter.org"\n' +
'      },\n' +
'      "models": {\n' +
'        "claude-opus-5": { "name": "claude-opus-5" }\n' +
'      }\n' +
'    }\n' +
'  },\n' +
'  "model": "agentrouter/claude-opus-5"\n' +
'}'},
        {title:'opencode.json · вариант OpenAI', lang:'json', text:
'{\n' +
'  "$schema": "https://opencode.ai/config.json",\n' +
'  "provider": {\n' +
'    "agentrouter": {\n' +
'      "npm": "@ai-sdk/openai-compatible",\n' +
'      "name": "AgentRouter (OpenAI Compatible)",\n' +
'      "options": {\n' +
'        "baseURL": "https://agentrouter.org/v1"\n' +
'      },\n' +
'      "models": {\n' +
'        "gpt-5.5": { "name": "gpt-5.5" }\n' +
'      }\n' +
'    }\n' +
'  },\n' +
'  "model": "agentrouter/gpt-5.5"\n' +
'}'},
        {title:'Ключ и запуск', lang:'bash', text:
'opencode providers login --provider agentrouter\n' +
'# на запрос вставьте ключ: {{KEY}}\n' +
'\n' +
'opencode'}
      ],
      notes:['Ключ в конфиг не пишется — его спрашивает команда `opencode providers login` и хранит отдельно.',
             'Файл `opencode.json` действует в том каталоге, где лежит: для каждого проекта настройка своя. Модель по умолчанию задаёт строка `model` в формате `провайдер/модель`.']
    },

    { id:'openclaw', name:'OpenClaw', note:'CLI',
      ways:[
        {proto:'anthropic-messages', base:'https://agentrouter.org', models:'claude-opus-5'},
        {proto:'openai-completions', base:'https://agentrouter.org/v1', models:'gpt-5.5 · glm-5.2'}
      ],
      steps:[
        'Откройте терминал и поставьте OpenClaw: скриптом на macOS и Linux либо через npm. Команды в блоке «Установка» ниже.',
        'Запустите мастер настройки: `openclaw onboard`. При самом первом запуске команды `openclaw` он открывается сам.',
        'Дальше девять вопросов. Ответ выбирают стрелками вверх-вниз и подтверждают `Enter`. Отвечайте ровно так:',
        'На **I understand this is powerful and inherently risky. Continue?** выберите **Yes**.',
        'На **Onboarding mode** выберите **QuickStart**.',
        'На **Model/auth provider** выберите **Skip for now** — провайдера мы добавим сами, файлом.',
        'На **Filter models by provider** выберите **All providers**.',
        'На **Default model** выберите **Keep current**.',
        'На **Select channel** выберите **Skip for now**.',
        'На **Configure skills now?** выберите **No**.',
        'На **Enable hooks?** выберите **Skip for now**.',
        'На **How do you want to hatch your bot?** подойдёт любой вариант — на подключение ключа он не влияет.',
        'Откройте файл настроек моделей и вставьте блок ниже целиком: в нём сразу два провайдера — для Claude и для `gpt-5.5`.',
        'Замените в обоих местах значение `apiKey` на свой ключ, если он не подставился сам. По умолчанию сервис оставляет там заглушку `sk-`.',
        'Запустите `openclaw`, откройте раздел chat и напишите «ответь только OK».'
      ],
      code:[
        {title:'Установка', lang:'bash', text:
'# macOS, Linux, WSL\n' +
'curl -fsSL https://openclaw.ai/install.sh | bash\n' +
'\n' +
'# либо через npm\n' +
'npm install -g openclaw\n' +
'\n' +
'openclaw onboard'},
        {title:'Конфиг моделей', lang:'json', text:
'{\n' +
'  "models": {\n' +
'    "mode": "merge",\n' +
'    "providers": {\n' +
'      "agentrouter-messages": {\n' +
'        "baseUrl": "https://agentrouter.org",\n' +
'        "apiKey": "{{KEY}}",\n' +
'        "auth": "token",\n' +
'        "api": "anthropic-messages",\n' +
'        "models": [\n' +
'          {\n' +
'            "id": "claude-opus-5",\n' +
'            "name": "claude-opus-5",\n' +
'            "input": ["text", "image"],\n' +
'            "contextWindow": 200000,\n' +
'            "maxTokens": 16384\n' +
'          }\n' +
'        ]\n' +
'      },\n' +
'      "agentrouter-completions": {\n' +
'        "baseUrl": "https://agentrouter.org/v1",\n' +
'        "apiKey": "{{KEY}}",\n' +
'        "auth": "token",\n' +
'        "api": "openai-completions",\n' +
'        "models": [\n' +
'          {\n' +
'            "id": "gpt-5.5",\n' +
'            "name": "gpt-5.5",\n' +
'            "input": ["text"],\n' +
'            "contextWindow": 100000,\n' +
'            "maxTokens": 8192\n' +
'          }\n' +
'        ]\n' +
'      }\n' +
'    }\n' +
'  },\n' +
'  "agents": {\n' +
'    "defaults": {\n' +
'      "model": {\n' +
'        "primary": "agentrouter-completions/gpt-5.5"\n' +
'      }\n' +
'    }\n' +
'  }\n' +
'}'}
      ],
      notes:['Ключ нужен в обоих блоках `apiKey` — по умолчанию там стоит заглушка `sk-`.',
             'Модель по умолчанию задаёт строка `primary` в формате `провайдер/модель`; для Claude это `agentrouter-messages/claude-opus-5`.',
             'Где именно лежит файл настроек моделей, документация сервиса не сообщает — путь подскажет сама программа: посмотрите `openclaw --help` или раздел настроек в её интерфейсе.']
    },