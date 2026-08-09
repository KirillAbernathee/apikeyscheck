    { id:'claude-code', name:'Claude Code', note:'CLI',
      ways:[{proto:'Anthropic', base:'https://agentrouter.org', models:'claude-opus-5 · claude-opus-4-8'}],
      steps:[
        'Open a terminal. On Windows: **Start** → type `PowerShell` → **Windows PowerShell**. On Mac: **Launchpad** → **Terminal**.',
        'Check Node.js with the `node --version` command. You need version 18 or newer. If the command is not found, install Node.js first from nodejs.org.',
        'Install the program: `npm install -g @anthropic-ai/claude-code@latest`. The install takes a minute or two.',
        'Make sure the command is there: `claude --version` should print a version number.',
        'Set three environment variables: the key, the service address, and the model. Take the block for your system below and paste it into the same terminal window.',
        'Go to your project folder: `cd` and the path to the folder. For example `cd ~/Desktop/my-project`, or on Windows `cd $HOME\\Desktop\\my-project`.',
        'Run `claude`.',
        'If the first launch asks whether to use the key from the environment variables, say yes.',
        'Type "reply with OK only".',
        'Check file access: "list the files in this folder and tell me whether there is a README, do not change anything".'
      ],
      code:[
        {title:'Install', lang:'bash', text:
'node --version\n' +
'npm install -g @anthropic-ai/claude-code@latest\n' +
'claude --version'},
        {title:'Variables · macOS, Linux, WSL', lang:'bash', text:
'export ANTHROPIC_AUTH_TOKEN="{{KEY}}"\n' +
'export ANTHROPIC_BASE_URL="https://agentrouter.org"\n' +
'export ANTHROPIC_MODEL="claude-opus-5"\n' +
'\n' +
'claude'},
        {title:'Variables · Windows PowerShell', lang:'powershell', text:
'$env:ANTHROPIC_AUTH_TOKEN="{{KEY}}"\n' +
'$env:ANTHROPIC_BASE_URL="https://agentrouter.org"\n' +
'$env:ANTHROPIC_MODEL="claude-opus-5"\n' +
'\n' +
'claude'},
        {title:'Restore a Claude Pro or Max subscription', lang:'bash', text:
'unset ANTHROPIC_AUTH_TOKEN\n' +
'unset ANTHROPIC_BASE_URL\n' +
'unset ANTHROPIC_MODEL'}
      ],
      notes:['`ANTHROPIC_BASE_URL` goes without `/v1`: the address with `/v1` is only needed by OpenAI-compatible clients.',
             'The variables live only in this terminal window. Close the window and you have to set them again. To make them permanent, add the `export …` lines to the end of `~/.zshrc` or `~/.bashrc`, and on Windows: **Start** → "Edit the system environment variables" → the **Environment Variables** button → **New**.',
             'While these variables are set, they override the login to a Claude Pro, Max, or Team subscription: requests go through Agent Router. To get the subscription back, clear the variables with the commands above and start `claude` again.']
    },

    { id:'codex', name:'Codex', note:'CLI from OpenAI',
      ways:[{proto:'OpenAI Compatible', base:'https://agentrouter.org/v1', models:'gpt-5.6 · gpt-5.5 · glm-5.2'}],
      steps:[
        'Open a terminal. On Windows: **Start** → type `PowerShell` → **Windows PowerShell**. On Mac: **Launchpad** → **Terminal**.',
        'Check Node.js: `node --version`. You need version 18 or newer.',
        'Install Codex: `pnpm install -g @openai/codex`. If pnpm is not installed, `npm install -g @openai/codex` works too.',
        'Check it: `codex --version`.',
        'Create the settings file. On Mac and Linux it is `~/.codex/config.toml`, on Windows `C:\\Users\\<your name>\\.codex\\config.toml`. You usually have to create the `.codex` folder yourself: the commands in the "Create the settings file" block below make both the folder and the file.',
        'Paste the contents of the `config.toml` block below into the file that opens and save it. In the `nano` editor that is `Ctrl+O`, `Enter`, `Ctrl+X`.',
        'If you edit the file in Notepad, watch out that it does not get saved as `config.toml.txt`: in the save dialog pick the "All Files" type.',
        'Go to your project folder: `cd my-project`.',
        'Run `codex` and type "reply with OK only".'
      ],
      code:[
        {title:'Install', lang:'bash', text:
'node --version\n' +
'pnpm install -g @openai/codex\n' +
'codex --version'},
        {title:'Create the settings file', lang:'bash', text:
'# macOS, Linux, WSL\n' +
'mkdir -p ~/.codex\n' +
'nano ~/.codex/config.toml\n' +
'\n' +
'# Windows PowerShell\n' +
'mkdir "$HOME\\.codex" -Force\n' +
'notepad "$HOME\\.codex\\config.toml"'},
        {title:'The ~/.codex/config.toml file', lang:'toml', text:
'model = "gpt-5.5"\n' +
'model_provider = "agentrouter"\n' +
'\n' +
'[model_providers.agentrouter]\n' +
'name = "AgentRouter"\n' +
'base_url = "https://agentrouter.org/v1"\n' +
'wire_api = "responses"\n' +
'experimental_bearer_token = "{{KEY}}"'},
        {title:'Run it', lang:'bash', text:
'cd my-project\n' +
'codex'}
      ],
      notes:['Here the key does not live in an environment variable, it sits right in the config, in the `experimental_bearer_token` field.',
             'You switch to another model with the `model` line at the top of the file: `gpt-5.6`, `gpt-5.5`, or `glm-5.2`.']
    },

    { id:'qwencode', name:'Qwen Code', note:'CLI',
      ways:[
        {proto:'Anthropic', base:'https://agentrouter.org', models:'claude-opus-5 · claude-opus-4-8'},
        {proto:'OpenAI Compatible', base:'https://agentrouter.org/v1', models:'gpt-5.5 · glm-5.2'}
      ],
      steps:[
        'Open a terminal. On Windows: **Start** → type `PowerShell` → **Windows PowerShell**. On Mac: **Launchpad** → **Terminal**.',
        'Check Node.js: `node --version`. You need version 18 or newer.',
        'Install the program: `npm install -g @qwen-code/qwen-code@latest`.',
        'Check it: `qwen --version`.',
        'Pick **one** set of variables: `ANTHROPIC_*` for Claude models, or `OPENAI_*` for `gpt-5.5` and `glm-5.2`. You cannot set both at once.',
        'Copy the block you need from below into the same terminal window.',
        'Go to your project folder with the `cd` command and the path to the folder.',
        'Run `qwen` and type "reply with OK only".',
        'Check file access: "list the files in this folder and tell me whether there is a README".'
      ],
      code:[
        {title:'Install', lang:'bash', text:
'node --version\n' +
'npm install -g @qwen-code/qwen-code@latest\n' +
'qwen --version'},
        {title:'Anthropic option · macOS, Linux, WSL', lang:'bash', text:
'export ANTHROPIC_AUTH_TOKEN="{{KEY}}"\n' +
'export ANTHROPIC_BASE_URL="https://agentrouter.org"\n' +
'export ANTHROPIC_MODEL="claude-opus-5"\n' +
'\n' +
'qwen'},
        {title:'OpenAI option · macOS, Linux, WSL', lang:'bash', text:
'export OPENAI_API_KEY="{{KEY}}"\n' +
'export OPENAI_BASE_URL="https://agentrouter.org/v1"\n' +
'export OPENAI_MODEL="gpt-5.5"\n' +
'\n' +
'qwen'},
        {title:'The same thing · Windows PowerShell', lang:'powershell', text:
'# Anthropic option\n' +
'$env:ANTHROPIC_AUTH_TOKEN="{{KEY}}"\n' +
'$env:ANTHROPIC_BASE_URL="https://agentrouter.org"\n' +
'$env:ANTHROPIC_MODEL="claude-opus-5"\n' +
'\n' +
'# OpenAI option\n' +
'$env:OPENAI_API_KEY="{{KEY}}"\n' +
'$env:OPENAI_BASE_URL="https://agentrouter.org/v1"\n' +
'$env:OPENAI_MODEL="gpt-5.5"'}
      ],
      notes:['The sets do not mix: either `ANTHROPIC_*` without `/v1`, or `OPENAI_*` with `/v1`. If both are set, the client picks one and the other gets in the way.',
             'The variables work only in the current terminal window: once you close it, set them again.']
    },

    { id:'opencode', name:'OpenCode', note:'CLI',
      ways:[
        {proto:'Anthropic', base:'https://agentrouter.org', models:'claude-opus-5'},
        {proto:'OpenAI Compatible', base:'https://agentrouter.org/v1', models:'gpt-5.5 · glm-5.2'}
      ],
      steps:[
        'Open a terminal. On Windows: **Start** → type `PowerShell` → **Windows PowerShell**. On Mac: **Launchpad** → **Terminal**.',
        'Go to your project folder right away: `cd ~/Desktop/my-project`, or on Windows `cd $HOME\\Desktop\\my-project`. OpenCode settings are tied to the folder, so do not skip this step.',
        'Install OpenCode: with a script on macOS and Linux, or through npm on any system. The commands are in the "Install" block below.',
        'Check it: `opencode --version`.',
        'In that same folder create an `opencode.json` file and paste **one** of the two blocks below into it: the one for Claude models or the one for `gpt-5.5`.',
        'Save the key with a separate command: `opencode providers login --provider agentrouter`.',
        'The program will ask for the key: paste `{{KEY}}` and press `Enter`. The key is not in the `opencode.json` file and must not be there.',
        'Run `opencode` and type "reply with OK only".',
        'Check file access: "list the files in this folder and tell me whether there is a README".'
      ],
      code:[
        {title:'Install', lang:'bash', text:
'# macOS, Linux, WSL\n' +
'curl -fsSL https://opencode.ai/install | bash\n' +
'\n' +
'# any system, through npm\n' +
'npm install -g opencode-ai\n' +
'\n' +
'opencode --version'},
        {title:'opencode.json · Anthropic option', lang:'json', text:
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
        {title:'opencode.json · OpenAI option', lang:'json', text:
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
        {title:'Key and launch', lang:'bash', text:
'opencode providers login --provider agentrouter\n' +
'# paste the key at the prompt: {{KEY}}\n' +
'\n' +
'opencode'}
      ],
      notes:['The key is never written into the config: the `opencode providers login` command asks for it and stores it separately.',
             'The `opencode.json` file applies in the directory it sits in, so every project has its own setup. The default model is set by the `model` line in `provider/model` format.']
    },

    { id:'openclaw', name:'OpenClaw', note:'CLI',
      ways:[
        {proto:'anthropic-messages', base:'https://agentrouter.org', models:'claude-opus-5'},
        {proto:'openai-completions', base:'https://agentrouter.org/v1', models:'gpt-5.5 · glm-5.2'}
      ],
      steps:[
        'Open a terminal and install OpenClaw: with a script on macOS and Linux, or through npm. The commands are in the "Install" block below.',
        'Start the setup wizard: `openclaw onboard`. The very first time you run `openclaw`, it opens on its own.',
        'Nine questions follow. Pick an answer with the up and down arrow keys and confirm with `Enter`. Answer exactly like this:',
        'For **I understand this is powerful and inherently risky. Continue?** choose **Yes**.',
        'For **Onboarding mode** choose **QuickStart**.',
        'For **Model/auth provider** choose **Skip for now**: we will add the provider ourselves, with a file.',
        'For **Filter models by provider** choose **All providers**.',
        'For **Default model** choose **Keep current**.',
        'For **Select channel** choose **Skip for now**.',
        'For **Configure skills now?** choose **No**.',
        'For **Enable hooks?** choose **Skip for now**.',
        'For **How do you want to hatch your bot?** any option will do, it does not affect connecting the key.',
        'Open the models settings file and paste the whole block below into it: it holds two providers at once, one for Claude and one for `gpt-5.5`.',
        'Replace the `apiKey` value in both places with your own key if it was not filled in automatically. By default the service leaves an `sk-` stub there.',
        'Run `openclaw`, open the chat section, and type "reply with OK only".'
      ],
      code:[
        {title:'Install', lang:'bash', text:
'# macOS, Linux, WSL\n' +
'curl -fsSL https://openclaw.ai/install.sh | bash\n' +
'\n' +
'# or through npm\n' +
'npm install -g openclaw\n' +
'\n' +
'openclaw onboard'},
        {title:'Models config', lang:'json', text:
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
      notes:['The key is needed in both `apiKey` fields: by default an `sk-` stub sits there.',
             'The default model is set by the `primary` line in `provider/model` format; for Claude that is `agentrouter-messages/claude-opus-5`.',
             'The service documentation does not say where exactly the models settings file lives, so let the program tell you the path: check `openclaw --help` or the settings section in its interface.']
    },