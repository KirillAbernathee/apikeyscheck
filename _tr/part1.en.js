    { id:'cline', name:'Cline', note:'VS Code extension',
      ways:[
        {proto:'Anthropic', base:'https://agentrouter.org', models:'claude-opus-5 · claude-opus-4-8'},
        {proto:'OpenAI Compatible', base:'https://agentrouter.org/v1', models:'gpt-5.5 · glm-5.2'}
      ],
      steps:[
        'Open VS Code and press `Ctrl+Shift+X` (on Mac `Cmd+Shift+X`): the **Extensions** panel opens on the left.',
        'Type `Cline` into the search box and press **Install** on the extension with that name. Once it is installed, a Cline icon appears in the icon bar on the left, click it.',
        'In the Cline panel click the gear icon in the top right corner. The settings open, and the section you need is called **API Configuration**.',
        'From here there are two routes, pick one. For Claude models, in the **API Provider** field select **Anthropic**.',
        'Tick the **Use custom base URL** checkbox: a field for the address appears underneath it.',
        'In **Custom Base URL** type `https://agentrouter.org`. There must be no `/v1` here.',
        'In **API Key** paste `{{KEY}}`.',
        'In the **Model** list pick `claude-opus-5`; `claude-opus-4-8` is available as well.',
        'The second route is for `gpt-5.5` and `glm-5.2`. In **API Provider** select **OpenAI Compatible**, in **Base URL** type `https://agentrouter.org/v1`, in **API Key** paste `{{KEY}}`, and type the **Model ID** by hand: there is no ready-made list there.',
        'Check the connection: write "reply with OK only" in the Cline chat. If OK comes back, everything works.',
        'Check file access: "look at the files in this folder and tell me whether there is a README, do not change anything".'
      ],
      code:[],
      notes:['The two ways are independent: either Anthropic without `/v1`, or OpenAI Compatible with `/v1`. Do not mix the address of one with the protocol of the other.',
             'Cline has renamed its settings sections between versions. If there is no **API Configuration** section, look for the very first block in the settings, the one with the **API Provider** and **API Key** fields.']
    },

    { id:'roocode', name:'Roo Code', note:'VS Code extension',
      ways:[
        {proto:'Anthropic', base:'https://agentrouter.org', models:'claude-opus-5 · claude-opus-4-8'},
        {proto:'OpenAI Compatible', base:'https://agentrouter.org/v1', models:'gpt-5.5 · glm-5.2'}
      ],
      steps:[
        'Open VS Code and press `Ctrl+Shift+X` (on Mac `Cmd+Shift+X`): the **Extensions** panel opens.',
        'Type `Roo Code` into the search box and press **Install**.',
        'Click the Roo Code icon in the icon bar on the left, then the gear icon in the top right corner of the panel: the settings open.',
        'Go to the settings section with the provider fields: in recent versions it is called **Providers**, in older ones **API Configuration**.',
        'At the top there is a **Configuration Profile** list. You can keep the current profile, or click the plus next to it and start a separate one, so your old settings are not lost.',
        'For Claude models, in the **API Provider** field select **Anthropic**.',
        'Tick the **Use custom base URL** checkbox and type `https://agentrouter.org` into the field that appears, without `/v1`.',
        'In **API Key** paste `{{KEY}}`.',
        'Choose `claude-opus-5` as the model, or `claude-opus-4-8` if it is not in the list.',
        'For `gpt-5.5` and `glm-5.2` take **API Provider** → **OpenAI Compatible**, **Base URL** → `https://agentrouter.org/v1`, and type the **Model ID** by hand.',
        'Press **Save** (in some versions the button is called **Done**) and write in the chat: "reply with OK only".'
      ],
      code:[],
      notes:['Roo Code pulls the model list in on its own and refreshes it with a delay, so the newest models do not show up there right away.']
    },

    { id:'kilocode', name:'Kilo Code', note:'VS Code extension',
      ways:[
        {proto:'Anthropic Messages', base:'https://agentrouter.org/v1', models:'claude-opus-5 · claude-opus-4-8'},
        {proto:'OpenAI Compatible', base:'https://agentrouter.org/v1', models:'gpt-5.5 · glm-5.2'}
      ],
      steps:[
        'Open VS Code and press `Ctrl+Shift+X` (on Mac `Cmd+Shift+X`).',
        'Type `Kilo Code` into the search box and press **Install**.',
        'Click the Kilo Code icon in the icon bar on the left, then the gear icon in the top right corner of the panel: the settings open.',
        'Go to the **Providers** screen and click **Custom Provider**: that is how you add a connection of your own instead of a ready-made one.',
        'In **Provider ID** type `agentrouter`.',
        'In **Display Name** type any name that makes sense to you, for example `Agent Router`. It is only used for the list.',
        'In **Provider API** select **Anthropic Messages** for Claude models, or **OpenAI Compatible** for `gpt-5.5` and `glm-5.2`.',
        'In **Base URL** type `https://agentrouter.org/v1`. This is the only program in the list where `/v1` is needed for Anthropic too, so do not skip it.',
        'In **API Key** paste `{{KEY}}`.',
        'In **Model** enter `claude-opus-5` or `claude-opus-4-8`, or else `gpt-5.5` / `glm-5.2`.',
        'Press **Submit**: the connection is saved and shows up in the provider list.',
        'Write in the chat: "reply with OK only".'
      ],
      code:[],
      notes:['The one exception to the general rule: Kilo Code expects `/v1` even for Anthropic Messages.']
    },

    { id:'claude-code-vscode', name:'Claude Code', note:'VS Code extension',
      ways:[{proto:'Anthropic', base:'https://agentrouter.org', models:'claude-opus-5 · claude-opus-4-8'}],
      steps:[
        'Open VS Code and press `Ctrl+Shift+X` (on Mac `Cmd+Shift+X`), type `Claude Code` into the search box and press **Install**.',
        'Check whether the program itself is installed. Open the built-in terminal from the **Terminal** → **New Terminal** menu and run `claude --version`.',
        'If no version is printed, install the program with the command from the "Installing the program" block below and run `claude --version` again.',
        'Press `Ctrl+Shift+P` (on Mac `Cmd+Shift+P`): the command palette opens at the top.',
        'Type `Open User Settings (JSON)` into it and pick the **Preferences: Open User Settings (JSON)** item.',
        'The `settings.json` file opens. Paste the contents of the `settings.json` block below into it. If the file already has something in it, add only the lines from inside the outer curly braces, and do not forget the comma between blocks.',
        'Save the file: `Ctrl+S` (on Mac `Cmd+S`).',
        'Get rid of the Anthropic login window. Go back to **Extensions** (`Ctrl+Shift+X`) and click the **Claude Code** extension: its page opens, and there you click the gear icon → **Settings** and tick the **Disable Login Prompt** checkbox.',
        'Reload the editor window: `Ctrl+Shift+P` (on Mac `Cmd+Shift+P`) → **Developer: Reload Window**. Without a reload the variables are not picked up.',
        'Open the Claude Code panel and write: "reply with OK only".'
      ],
      code:[
        {title:'Installing the program', lang:'bash', text:
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
      notes:['`ANTHROPIC_BASE_URL` is written without `/v1`: the extension talks over the Anthropic protocol.',
             'The **Disable Login Prompt** checkbox and the `"claudeCode.disableLoginPrompt": true` line in the file are one and the same. Either one is enough, and having both does no harm.',
             'The model is switched on the `ANTHROPIC_MODEL` line: `claude-opus-5` or `claude-opus-4-8`.',
             'If you have been working in this same VS Code on a Claude Pro or Max subscription, these variables override it and requests will go through Agent Router.']
    },

    { id:'github-copilot', name:'GitHub Copilot', note:'VS Code extension',
      ways:[
        {proto:'Messages', base:'https://agentrouter.org', models:'claude-opus-5 · claude-opus-4-8'},
        {proto:'Chat Completions', base:'https://agentrouter.org/v1', models:'gpt-5.5 · glm-5.2'}
      ],
      steps:[
        'Copilot is usually built into VS Code already. If it is missing, press `Ctrl+Shift+X` (on Mac `Cmd+Shift+X`), search for `GitHub Copilot` and press **Install**.',
        'Sign in to your GitHub account: the profile icon in the bottom left corner of VS Code → the item about signing in to **GitHub**. Until you are signed in, the item for adding a model does not appear in the interface at all.',
        'Open the Copilot chat: `Ctrl+Alt+I` (on Mac `Cmd+Ctrl+I`) or the chat icon at the top of the window.',
        'At the bottom of the chat window, next to the input box, there is a model picker list. Click it and choose **Manage Models**.',
        'In the list of providers that opens, choose **Add Model**, then **Custom endpoint**: that is the option for connecting an address of your own.',
        'In the group name field type `AgentRouter`, and in the key field paste `{{KEY}}`.',
        'Pick the request format: **Messages** for Claude models, **Chat Completions** for `gpt-5.5` and `glm-5.2`.',
        'The model editor opens. Fill in the **Model ID**: `claude-opus-5`, `claude-opus-4-8`, `gpt-5.5` or `glm-5.2`.',
        'For the display name type anything you like: it is only for you, so you can tell the model apart in the list.',
        'The address depends on the format: for **Messages** it is `https://agentrouter.org`, for **Chat Completions** it is `https://agentrouter.org/v1`. Save it.',
        'Pick the new model in that same list at the bottom of the chat and write: "reply with OK only".'
      ],
      code:[],
      notes:['The format and the address come as a pair: Messages without `/v1`, Chat Completions with `/v1`.',
             'In the service documentation these menu items are given in Chinese and the place is shown with screenshots. In the English interface they are called **Manage Models**, **Add Model** and **Custom endpoint**; in recent builds the wording drifts a little, so look for the item about your own (custom) address.']
    }

  ]},
  {
    title: 'Command line',
    tools: [