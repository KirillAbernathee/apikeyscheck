    { id:'hermes', name:'Hermes Agent', note:'CLI from Nous Research',
      ways:[
        {proto:'anthropic-messages', base:'https://agentrouter.org', models:'claude-opus-5'},
        {proto:'OpenAI Compatible', base:'https://agentrouter.org/v1', models:'gpt-5.5 · glm-5.2'}
      ],
      steps:[
        'Open a terminal: on macOS and Linux that is **Terminal**, on Windows **Start** → `PowerShell` → **Windows PowerShell**.',
        'Install Hermes with the command for your system, see the "Install" blocks below. On macOS and Linux `pipx` works too if you already have it.',
        'Check it: `hermes --version`.',
        'Put the key into the `AGENTROUTER_API_KEY` environment variable. The extension file holds no key of its own, it only points at this variable.',
        'Start the wizard: `hermes setup model`, and add the AgentRouter provider in it.',
        'The service documentation does not spell out the steps of this wizard, so follow the prompts on screen: the address is `https://agentrouter.org` for Claude or `https://agentrouter.org/v1` for the other models, and the key is `{{KEY}}`.',
        'Create your own provider extension file and paste **one** of the two blocks below into it.',
        'Run `hermes chat` and type "reply with OK only".',
        'Check file access: "list the files in this folder and tell me whether there is a README".'
      ],
      code:[
        {title:'Install · macOS, Linux, WSL', lang:'bash', text:
'curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash\n' +
'\n' +
'# or through pipx\n' +
'pipx install hermes-agent\n' +
'\n' +
'hermes --version'},
        {title:'Install · Windows PowerShell', lang:'powershell', text:
'iex (irm https://hermes-agent.nousresearch.com/install.ps1)\n' +
'\n' +
'$env:AGENTROUTER_API_KEY="{{KEY}}"'},
        {title:'Key and setup wizard', lang:'bash', text:
'export AGENTROUTER_API_KEY="{{KEY}}"\n' +
'hermes setup model'},
        {title:'Provider extension · Anthropic option', lang:'typescript', text:
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
        {title:'Provider extension · OpenAI option', lang:'typescript', text:
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
      notes:['The key is read from the `AGENTROUTER_API_KEY` variable, so the extension file is safe to keep in a repository.',
             'The service documentation does not say where to put the extension file: check `hermes --help` or the extensions section in the Hermes documentation itself.']
    },

    { id:'pi', name:'Pi', note:'CLI',
      ways:[
        {proto:'anthropic-messages', base:'https://agentrouter.org', models:'claude-opus-5'},
        {proto:'openai-completions', base:'https://agentrouter.org/v1', models:'gpt-5.5 · glm-5.2'}
      ],
      steps:[
        'Open a terminal. On Windows, first enter WSL: **Start** → type `wsl` → `Enter`; after that every command is the same as on Linux.',
        'Install Pi: `curl -fsSL https://pi.dev/install.sh | sh`.',
        'Check it: `pi --version`.',
        'Create the settings folder: `mkdir -p ~/.pi/agent`.',
        'Open the settings file: `nano ~/.pi/agent/models.json`.',
        'Paste **one** of the two blocks below, either for the Claude models or for `gpt-5.5`.',
        'Save the file and close the editor: `Ctrl+O`, `Enter`, then `Ctrl+X`.',
        'Set the variable with the key: `export AGENTROUTER_API_KEY="{{KEY}}"`. The config points at `$AGENTROUTER_API_KEY`, so without the variable there is no key.',
        'Run `pi` and pick `agentrouter/claude-opus-5` or `agentrouter/gpt-5.5` from the model list.',
        'Type "reply with OK only".'
      ],
      code:[
        {title:'Install', lang:'bash', text:
'curl -fsSL https://pi.dev/install.sh | sh\n' +
'pi --version\n' +
'\n' +
'mkdir -p ~/.pi/agent\n' +
'nano ~/.pi/agent/models.json'},
        {title:'~/.pi/agent/models.json · Anthropic option', lang:'json', text:
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
        {title:'~/.pi/agent/models.json · OpenAI option', lang:'json', text:
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
        {title:'Key and launch', lang:'bash', text:
'export AGENTROUTER_API_KEY="{{KEY}}"\n' +
'pi'}
      ],
      notes:['The installer expects a POSIX system: Pi has no `install.ps1` variant. On Windows, set Pi up inside WSL or Ubuntu; there is no need to run the script in PowerShell.']
    }

  ]},
  {
    title: 'Apps and editors',
    tools: [

    { id:'claude-app', name:'Claude App', note:'desktop app',
      ways:[{proto:'Gateway', base:'https://agentrouter.org', models:'the model is picked inside the app itself'}],
      steps:[
        'Turn on developer mode: in the top menu go **Help** → **Troubleshooting** → **Enable developer mode**.',
        'Open the app menu: on Windows that is the button with three lines in the top left corner of the window; on Mac it is the **Claude** menu → **Settings** (`Cmd+,`).',
        'Go to the **Developer** section and press the **Configure third-party interface** button.',
        'The gateway settings window opens. You can recognize it by its four fields: **Credential kind**, **Gateway base URL**, **Gateway API key**, **Gateway auth scheme**.',
        'In **Credential kind** choose the **static api key** option. Without it the key will not be accepted: the app keeps waiting for a different way to authorize.',
        'In **Gateway base URL** type `https://agentrouter.org`, without `/v1`.',
        'In **Gateway API key** paste `{{KEY}}`.',
        'In **Gateway auth scheme** choose `bearer`.',
        'Press **Apply locally**, then **Relaunch now**: the app closes and opens again by itself.',
        'After the restart, pick the model from the list in the bottom left corner of the window.',
        'Check the connection: write "reply with OK only" in the chat.'
      ],
      code:[],
      notes:['While developer mode is off, the **Developer** section and the **Configure third-party interface** button are not in the menu at all. If you cannot find them, go back to the first step and check that **Enable developer mode** really is on.',
             'In the service documentation this screen is shown with a screenshot only, and the **Credential kind** field is not mentioned there at all, even though filling it in is mandatory. The path through **Developer** → **Configure third-party interface** was verified in the Windows version of the app; in other builds the names may differ a little, so look for the word **Gateway**.']
    },

    { id:'trae', name:'Trae', note:'code editor',
      ways:[
        {proto:'Anthropic Messages', base:'https://agentrouter.org', models:'claude-opus-5 · claude-opus-4-8'},
        {proto:'OpenAI Completions', base:'https://agentrouter.org', models:'gpt-5.5 · glm-5.2'}
      ],
      steps:[
        'Download Trae from the official site, picking the version for your system, and install it.',
        'On the first launch, sign in to an account. A personal one is enough: without signing in, the **Models** section and the **Add Model** button are simply unavailable.',
        'Open **Settings**, then choose **Models** in the list on the left.',
        'Press **Add Model** and switch to the **Custom Config** tab.',
        'In **API Format** choose **Anthropic Messages** for the Claude models, or **OpenAI Completions** for `gpt-5.5` and `glm-5.2`.',
        'In **Custom Request URL** type `https://agentrouter.org`. No `/v1`, and no trailing slash.',
        'In **Model ID** enter `claude-opus-5` or `claude-opus-4-8`, or else `gpt-5.5` / `glm-5.2`.',
        'In **API Key** paste `{{KEY}}`.',
        'Press **Add Model**: the same button at the bottom of the form saves the model.',
        'Pick the new model in the chat and type "reply with OK only".'
      ],
      code:[],
      notes:['The second exception to the `/v1` rule: with the **Full URL** switch off, Trae builds the path itself, so `/v1` is not appended even for OpenAI Completions.']
    },

    { id:'cursor', name:'Cursor', note:'code editor',
      ways:[{proto:'OpenAI Compatible', base:'https://agentrouter.org/v1', models:'gpt-5.5 · glm-5.2'}],
      steps:[
        'Download Cursor from the official site, install it and sign in to an account: without signing in, the model settings are closed.',
        'Open **Cursor Settings**: `Ctrl+Shift+J` (on Mac `Cmd+Shift+J`), or the gear icon in the top right corner of the window.',
        'Go to the **Models** section.',
        'Find the **OpenAI API Key** field, paste `{{KEY}}` into it, and turn on the switch next to the field.',
        'Turn on the **Override OpenAI Base URL** switch, and in the field that appears type `https://agentrouter.org/v1`: here `/v1` is required.',
        'Save the key with the button next to the field: in different versions it is called **Verify** or **Save**.',
        'Write "reply with OK only" in the chat.'
      ],
      code:[],
      notes:['On the free plan, Cursor does not let you pick a model by hand even with your own key, only auto mode works. If that gets in the way, take any other editor from the list.',
             'The service documentation gives no list of available models for Cursor; the working options are the same `gpt-5.5` and `glm-5.2` as for the other OpenAI-compatible clients.']
    }

  ]}
  ]
};