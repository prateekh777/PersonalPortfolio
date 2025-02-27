URL: https://github.com/Significant-Gravitas/AutoGPT
---
[Skip to content](https://github.com/Significant-Gravitas/AutoGPT#start-of-content)

You signed in with another tab or window. [Reload](https://github.com/Significant-Gravitas/AutoGPT) to refresh your session.You signed out in another tab or window. [Reload](https://github.com/Significant-Gravitas/AutoGPT) to refresh your session.You switched accounts on another tab or window. [Reload](https://github.com/Significant-Gravitas/AutoGPT) to refresh your session.Dismiss alert

[Significant-Gravitas](https://github.com/Significant-Gravitas)/ **[AutoGPT](https://github.com/Significant-Gravitas/AutoGPT)** Public

- [Notifications](https://github.com/login?return_to=%2FSignificant-Gravitas%2FAutoGPT) You must be signed in to change notification settings
- [Fork\\
45.2k](https://github.com/login?return_to=%2FSignificant-Gravitas%2FAutoGPT)
- [Star\\
172k](https://github.com/login?return_to=%2FSignificant-Gravitas%2FAutoGPT)


AutoGPT is the vision of accessible AI for everyone, to use and to build on. Our mission is to provide the tools, so that you can focus on what matters.


[agpt.co](https://agpt.co/ "https://agpt.co")

### License

[View license](https://github.com/Significant-Gravitas/AutoGPT/blob/master/LICENSE)

[172k\\
stars](https://github.com/Significant-Gravitas/AutoGPT/stargazers) [45.2k\\
forks](https://github.com/Significant-Gravitas/AutoGPT/forks) [Branches](https://github.com/Significant-Gravitas/AutoGPT/branches) [Tags](https://github.com/Significant-Gravitas/AutoGPT/tags) [Activity](https://github.com/Significant-Gravitas/AutoGPT/activity)

[Star](https://github.com/login?return_to=%2FSignificant-Gravitas%2FAutoGPT)

[Notifications](https://github.com/login?return_to=%2FSignificant-Gravitas%2FAutoGPT) You must be signed in to change notification settings

# Significant-Gravitas/AutoGPT

master

[**157** Branches](https://github.com/Significant-Gravitas/AutoGPT/branches) [**43** Tags](https://github.com/Significant-Gravitas/AutoGPT/tags)

[Go to Branches page](https://github.com/Significant-Gravitas/AutoGPT/branches)[Go to Tags page](https://github.com/Significant-Gravitas/AutoGPT/tags)

Go to file

Code

## Folders and files

| Name | Name | Last commit message | Last commit date |
| --- | --- | --- | --- |
| ## Latest commit<br>[![majdyz](https://avatars.githubusercontent.com/u/76959103?v=4&size=40)](https://github.com/majdyz)[majdyz](https://github.com/Significant-Gravitas/AutoGPT/commits?author=majdyz)<br>[feat(backend): Notification Integration for credits system (](https://github.com/Significant-Gravitas/AutoGPT/commit/a692eedb1ca464fca099657e266cbced450489fb) [#9488](https://github.com/Significant-Gravitas/AutoGPT/pull/9488) [)](https://github.com/Significant-Gravitas/AutoGPT/commit/a692eedb1ca464fca099657e266cbced450489fb)<br>Feb 20, 2025<br>[a692eed](https://github.com/Significant-Gravitas/AutoGPT/commit/a692eedb1ca464fca099657e266cbced450489fb) · Feb 20, 2025<br>## History<br>[6,404 Commits](https://github.com/Significant-Gravitas/AutoGPT/commits/master/) |
| [.github](https://github.com/Significant-Gravitas/AutoGPT/tree/master/.github ".github") | [.github](https://github.com/Significant-Gravitas/AutoGPT/tree/master/.github ".github") | [feat(backend): spawn the notifications service + basic test (](https://github.com/Significant-Gravitas/AutoGPT/commit/15275e2ce105e0403c341d717daf3ab6a90c4d54 "feat(backend): spawn the notifications service + basic test (#9464)  We want to send emails on a schedule, in response to events, and be expandable without being overbearing on the amount of effort to implement. We also want this to use rabbitmq and be easy for other services to send messages into.  This PR adds the first use of the service to simply show a log message   ### Changes 🏗️  <!-- Concisely describe all of the changes made in this pull request: --> - Adds a new backend service for notifications - Adds first notification into the service -> Agent Execution - Adds spawning the notification service  Also  - Adds RabbitMQ to CI so we can test stuff - Adds a minor fix for one of the migrations that I thought was causing failures, but isn't but the change is still useful   ### Checklist 📋  #### For code changes: - [x] I have clearly listed my changes in the PR description - [x] I have made a test plan - [x] I have tested my changes according to the test plan:   <!-- Put your test plan here: --> - [x] Built and ran an agent and ensured the following log line appeared which shows the event would have sent an email   ``` 2025-02-10 15:52:02,232 INFO Processing notification: user_id='96b8d2f5-a036-437f-bd8e-ba8856028553' type=<NotificationType.AGENT_RUN: 'AGENT_RUN'> data=AgentRunData(agent_name='CalculatorBlock', credits_used=0.0, execution_time=0.0, graph_id='30e5f332-a092-4795-892a-b063a8c7bdd9', node_count=1) created_at=datetime.datetime(2025, 2, 10, 15, 52, 2, 162865)   ```  #### For configuration changes: - [ ] `.env.example` is updated or already compatible with my changes - [ ] `docker-compose.yml` is updated or already compatible with my changes - [ ] I have included a list of my configuration changes in the PR description (under **Changes**)  None of the other ports are configurable via .env.example listing so left as is  <details>   <summary>Examples of configuration changes</summary>    - Changing ports   - Adding new services that need to communicate with each other   - Secrets or environment variable changes   - New or infrastructure changes such as databases </details>  ---------  Co-authored-by: Reinier van der Leer <pwuts@agpt.co>") [#9464](https://github.com/Significant-Gravitas/AutoGPT/pull/9464) [)](https://github.com/Significant-Gravitas/AutoGPT/commit/15275e2ce105e0403c341d717daf3ab6a90c4d54 "feat(backend): spawn the notifications service + basic test (#9464)  We want to send emails on a schedule, in response to events, and be expandable without being overbearing on the amount of effort to implement. We also want this to use rabbitmq and be easy for other services to send messages into.  This PR adds the first use of the service to simply show a log message   ### Changes 🏗️  <!-- Concisely describe all of the changes made in this pull request: --> - Adds a new backend service for notifications - Adds first notification into the service -> Agent Execution - Adds spawning the notification service  Also  - Adds RabbitMQ to CI so we can test stuff - Adds a minor fix for one of the migrations that I thought was causing failures, but isn't but the change is still useful   ### Checklist 📋  #### For code changes: - [x] I have clearly listed my changes in the PR description - [x] I have made a test plan - [x] I have tested my changes according to the test plan:   <!-- Put your test plan here: --> - [x] Built and ran an agent and ensured the following log line appeared which shows the event would have sent an email   ``` 2025-02-10 15:52:02,232 INFO Processing notification: user_id='96b8d2f5-a036-437f-bd8e-ba8856028553' type=<NotificationType.AGENT_RUN: 'AGENT_RUN'> data=AgentRunData(agent_name='CalculatorBlock', credits_used=0.0, execution_time=0.0, graph_id='30e5f332-a092-4795-892a-b063a8c7bdd9', node_count=1) created_at=datetime.datetime(2025, 2, 10, 15, 52, 2, 162865)   ```  #### For configuration changes: - [ ] `.env.example` is updated or already compatible with my changes - [ ] `docker-compose.yml` is updated or already compatible with my changes - [ ] I have included a list of my configuration changes in the PR description (under **Changes**)  None of the other ports are configurable via .env.example listing so left as is  <details>   <summary>Examples of configuration changes</summary>    - Changing ports   - Adding new services that need to communicate with each other   - Secrets or environment variable changes   - New or infrastructure changes such as databases </details>  ---------  Co-authored-by: Reinier van der Leer <pwuts@agpt.co>") | Feb 13, 2025 |
| [.vscode](https://github.com/Significant-Gravitas/AutoGPT/tree/master/.vscode ".vscode") | [.vscode](https://github.com/Significant-Gravitas/AutoGPT/tree/master/.vscode ".vscode") | [build: add launch.json debugging for vscode (](https://github.com/Significant-Gravitas/AutoGPT/commit/0b5b95eff5e18c1e162d2b30b66a7be2bed1cbc2 "build: add launch.json debugging for vscode (#8496)  Co-authored-by: Aarushi <50577581+aarushik93@users.noreply.github.com>") [#8496](https://github.com/Significant-Gravitas/AutoGPT/pull/8496) [)](https://github.com/Significant-Gravitas/AutoGPT/commit/0b5b95eff5e18c1e162d2b30b66a7be2bed1cbc2 "build: add launch.json debugging for vscode (#8496)  Co-authored-by: Aarushi <50577581+aarushik93@users.noreply.github.com>") | Nov 8, 2024 |
| [assets](https://github.com/Significant-Gravitas/AutoGPT/tree/master/assets "assets") | [assets](https://github.com/Significant-Gravitas/AutoGPT/tree/master/assets "assets") | [feat(server, autogpt): Add Example files and update build option (](https://github.com/Significant-Gravitas/AutoGPT/commit/785a40ff9defd01be0b57fc797ec940627f00c46 "feat(server, autogpt): Add Example files and update build option (#7271)") [#7271](https://github.com/Significant-Gravitas/AutoGPT/pull/7271) [)](https://github.com/Significant-Gravitas/AutoGPT/commit/785a40ff9defd01be0b57fc797ec940627f00c46 "feat(server, autogpt): Add Example files and update build option (#7271)") | Jun 27, 2024 |
| [autogpt\_platform](https://github.com/Significant-Gravitas/AutoGPT/tree/master/autogpt_platform "autogpt_platform") | [autogpt\_platform](https://github.com/Significant-Gravitas/AutoGPT/tree/master/autogpt_platform "autogpt_platform") | [feat(backend): Notification Integration for credits system (](https://github.com/Significant-Gravitas/AutoGPT/commit/a692eedb1ca464fca099657e266cbced450489fb "feat(backend): Notification Integration for credits system (#9488)  <!-- Clearly explain the need for these changes: -->  ### Changes 🏗️  Add email notifications on refund events.  ### Checklist 📋  #### For code changes: - [ ] I have clearly listed my changes in the PR description - [ ] I have made a test plan - [ ] I have tested my changes according to the test plan:   <!-- Put your test plan here: -->   - [ ] ...  <details>   <summary>Example test plan</summary>      - [ ] Create from scratch and execute an agent with at least 3 blocks - [ ] Import an agent from file upload, and confirm it executes correctly   - [ ] Upload agent to marketplace - [ ] Import an agent from marketplace and confirm it executes correctly   - [ ] Edit an agent from monitor, and confirm it executes correctly </details>  #### For configuration changes: - [ ] `.env.example` is updated or already compatible with my changes - [ ] `docker-compose.yml` is updated or already compatible with my changes - [ ] I have included a list of my configuration changes in the PR description (under **Changes**)  <details>   <summary>Examples of configuration changes</summary>    - Changing ports   - Adding new services that need to communicate with each other   - Secrets or environment variable changes   - New or infrastructure changes such as databases </details>") [#9488](https://github.com/Significant-Gravitas/AutoGPT/pull/9488) [)](https://github.com/Significant-Gravitas/AutoGPT/commit/a692eedb1ca464fca099657e266cbced450489fb "feat(backend): Notification Integration for credits system (#9488)  <!-- Clearly explain the need for these changes: -->  ### Changes 🏗️  Add email notifications on refund events.  ### Checklist 📋  #### For code changes: - [ ] I have clearly listed my changes in the PR description - [ ] I have made a test plan - [ ] I have tested my changes according to the test plan:   <!-- Put your test plan here: -->   - [ ] ...  <details>   <summary>Example test plan</summary>      - [ ] Create from scratch and execute an agent with at least 3 blocks - [ ] Import an agent from file upload, and confirm it executes correctly   - [ ] Upload agent to marketplace - [ ] Import an agent from marketplace and confirm it executes correctly   - [ ] Edit an agent from monitor, and confirm it executes correctly </details>  #### For configuration changes: - [ ] `.env.example` is updated or already compatible with my changes - [ ] `docker-compose.yml` is updated or already compatible with my changes - [ ] I have included a list of my configuration changes in the PR description (under **Changes**)  <details>   <summary>Examples of configuration changes</summary>    - Changing ports   - Adding new services that need to communicate with each other   - Secrets or environment variable changes   - New or infrastructure changes such as databases </details>") | Feb 20, 2025 |
| [classic](https://github.com/Significant-Gravitas/AutoGPT/tree/master/classic "classic") | [classic](https://github.com/Significant-Gravitas/AutoGPT/tree/master/classic "classic") | [Fix Poetry v2.0.0 compatibility (](https://github.com/Significant-Gravitas/AutoGPT/commit/d638c1f484bad1d42e9aa4f73c30893f65c268dd "Fix Poetry v2.0.0 compatibility (#9197)  Make all changes necessary to make everything work with Poetry v2.0.0.  - Resolves #9196  ## Changes - Removed `--no-update` flag from `poetry lock` command in codebase - Removed extra path arguments from `poetry -C [path] run [command]` occurrences - Regenerated all lock files in hierarchical order - Added workaround for Poetry bug where `packages.[i].format` is now suddenly required  Additionally: - Fixed up .dockerignore   - Fixes .venv being erroneously copied over from local   - Fixes build context bloat (300MB -> 2.5MB) - Fixed warnings about entrypoint script not being installed in docker builds  ### Relevant (breaking) changes in v2.0.0 - `--no-update` flag no longer exists for `poetry lock` as it has become default behavior - The `-C` option now actually changes the directory, so any path arguments in `poetry run` commands can/must be removed - Poetry v2.0.0 uses the new v2.1 lock file spec, so all lock files have to be regenerated to avoid false-positive lock file updates and checks on future PRs - **BUG:** when specifying `poetry.tool.packages`, `format` is required now   - python-poetry/poetry#9961  Full Poetry v2.0.0 release notes and change log: https://python-poetry.org/blog/announcing-poetry-2.0.0") [#9197](https://github.com/Significant-Gravitas/AutoGPT/pull/9197) [)](https://github.com/Significant-Gravitas/AutoGPT/commit/d638c1f484bad1d42e9aa4f73c30893f65c268dd "Fix Poetry v2.0.0 compatibility (#9197)  Make all changes necessary to make everything work with Poetry v2.0.0.  - Resolves #9196  ## Changes - Removed `--no-update` flag from `poetry lock` command in codebase - Removed extra path arguments from `poetry -C [path] run [command]` occurrences - Regenerated all lock files in hierarchical order - Added workaround for Poetry bug where `packages.[i].format` is now suddenly required  Additionally: - Fixed up .dockerignore   - Fixes .venv being erroneously copied over from local   - Fixes build context bloat (300MB -> 2.5MB) - Fixed warnings about entrypoint script not being installed in docker builds  ### Relevant (breaking) changes in v2.0.0 - `--no-update` flag no longer exists for `poetry lock` as it has become default behavior - The `-C` option now actually changes the directory, so any path arguments in `poetry run` commands can/must be removed - Poetry v2.0.0 uses the new v2.1 lock file spec, so all lock files have to be regenerated to avoid false-positive lock file updates and checks on future PRs - **BUG:** when specifying `poetry.tool.packages`, `format` is required now   - python-poetry/poetry#9961  Full Poetry v2.0.0 release notes and change log: https://python-poetry.org/blog/announcing-poetry-2.0.0") | Jan 6, 2025 |
| [docs](https://github.com/Significant-Gravitas/AutoGPT/tree/master/docs "docs") | [docs](https://github.com/Significant-Gravitas/AutoGPT/tree/master/docs "docs") | [docs: Provide feedback when cloning submodules (](https://github.com/Significant-Gravitas/AutoGPT/commit/d050a3f77c5b786bb5bccf12b6ce20db585547a2 "docs: Provide feedback when cloning submodules (#9448)  <!-- Clearly explain the need for these changes: -->  ### Changes 🏗️ Added `--progress` to the submodule update, so that cloning progress can be tracked and does not appear to hang. <!-- Concisely describe all of the changes made in this pull request: -->  ### Checklist 📋  #### For code changes: - [x] No code change, just docs.    <details>   <summary>Example test plan</summary>      - [ ] Create from scratch and execute an agent with at least 3 blocks - [ ] Import an agent from file upload, and confirm it executes correctly   - [ ] Upload agent to marketplace - [ ] Import an agent from marketplace and confirm it executes correctly   - [ ] Edit an agent from monitor, and confirm it executes correctly </details>  #### For configuration changes: - [x] No configuration change, just docs.    <details>   <summary> Provide feedback when cloning submodules </summary>    -  now updating submodules shows the cloning repo's progress   </details>  Co-authored-by: Your Name <you@example.com>") [#9448](https://github.com/Significant-Gravitas/AutoGPT/pull/9448) [)](https://github.com/Significant-Gravitas/AutoGPT/commit/d050a3f77c5b786bb5bccf12b6ce20db585547a2 "docs: Provide feedback when cloning submodules (#9448)  <!-- Clearly explain the need for these changes: -->  ### Changes 🏗️ Added `--progress` to the submodule update, so that cloning progress can be tracked and does not appear to hang. <!-- Concisely describe all of the changes made in this pull request: -->  ### Checklist 📋  #### For code changes: - [x] No code change, just docs.    <details>   <summary>Example test plan</summary>      - [ ] Create from scratch and execute an agent with at least 3 blocks - [ ] Import an agent from file upload, and confirm it executes correctly   - [ ] Upload agent to marketplace - [ ] Import an agent from marketplace and confirm it executes correctly   - [ ] Edit an agent from monitor, and confirm it executes correctly </details>  #### For configuration changes: - [x] No configuration change, just docs.    <details>   <summary> Provide feedback when cloning submodules </summary>    -  now updating submodules shows the cloning repo's progress   </details>  Co-authored-by: Your Name <you@example.com>") | Feb 11, 2025 |
| [.deepsource.toml](https://github.com/Significant-Gravitas/AutoGPT/blob/master/.deepsource.toml ".deepsource.toml") | [.deepsource.toml](https://github.com/Significant-Gravitas/AutoGPT/blob/master/.deepsource.toml ".deepsource.toml") | [Update .deepsource.toml](https://github.com/Significant-Gravitas/AutoGPT/commit/f1bc9d158175c8f199b4be44b4597dd70781b30a "Update .deepsource.toml") | Jan 29, 2025 |
| [.dockerignore](https://github.com/Significant-Gravitas/AutoGPT/blob/master/.dockerignore ".dockerignore") | [.dockerignore](https://github.com/Significant-Gravitas/AutoGPT/blob/master/.dockerignore ".dockerignore") | [Fix Poetry v2.0.0 compatibility (](https://github.com/Significant-Gravitas/AutoGPT/commit/d638c1f484bad1d42e9aa4f73c30893f65c268dd "Fix Poetry v2.0.0 compatibility (#9197)  Make all changes necessary to make everything work with Poetry v2.0.0.  - Resolves #9196  ## Changes - Removed `--no-update` flag from `poetry lock` command in codebase - Removed extra path arguments from `poetry -C [path] run [command]` occurrences - Regenerated all lock files in hierarchical order - Added workaround for Poetry bug where `packages.[i].format` is now suddenly required  Additionally: - Fixed up .dockerignore   - Fixes .venv being erroneously copied over from local   - Fixes build context bloat (300MB -> 2.5MB) - Fixed warnings about entrypoint script not being installed in docker builds  ### Relevant (breaking) changes in v2.0.0 - `--no-update` flag no longer exists for `poetry lock` as it has become default behavior - The `-C` option now actually changes the directory, so any path arguments in `poetry run` commands can/must be removed - Poetry v2.0.0 uses the new v2.1 lock file spec, so all lock files have to be regenerated to avoid false-positive lock file updates and checks on future PRs - **BUG:** when specifying `poetry.tool.packages`, `format` is required now   - python-poetry/poetry#9961  Full Poetry v2.0.0 release notes and change log: https://python-poetry.org/blog/announcing-poetry-2.0.0") [#9197](https://github.com/Significant-Gravitas/AutoGPT/pull/9197) [)](https://github.com/Significant-Gravitas/AutoGPT/commit/d638c1f484bad1d42e9aa4f73c30893f65c268dd "Fix Poetry v2.0.0 compatibility (#9197)  Make all changes necessary to make everything work with Poetry v2.0.0.  - Resolves #9196  ## Changes - Removed `--no-update` flag from `poetry lock` command in codebase - Removed extra path arguments from `poetry -C [path] run [command]` occurrences - Regenerated all lock files in hierarchical order - Added workaround for Poetry bug where `packages.[i].format` is now suddenly required  Additionally: - Fixed up .dockerignore   - Fixes .venv being erroneously copied over from local   - Fixes build context bloat (300MB -> 2.5MB) - Fixed warnings about entrypoint script not being installed in docker builds  ### Relevant (breaking) changes in v2.0.0 - `--no-update` flag no longer exists for `poetry lock` as it has become default behavior - The `-C` option now actually changes the directory, so any path arguments in `poetry run` commands can/must be removed - Poetry v2.0.0 uses the new v2.1 lock file spec, so all lock files have to be regenerated to avoid false-positive lock file updates and checks on future PRs - **BUG:** when specifying `poetry.tool.packages`, `format` is required now   - python-poetry/poetry#9961  Full Poetry v2.0.0 release notes and change log: https://python-poetry.org/blog/announcing-poetry-2.0.0") | Jan 6, 2025 |
| [.gitattributes](https://github.com/Significant-Gravitas/AutoGPT/blob/master/.gitattributes ".gitattributes") | [.gitattributes](https://github.com/Significant-Gravitas/AutoGPT/blob/master/.gitattributes ".gitattributes") | [refactor: AutoGPT Platform Stealth Launch Repo Re-Org (](https://github.com/Significant-Gravitas/AutoGPT/commit/ef7cfbb8602385685e375f6a7740af223184683a "refactor: AutoGPT Platform Stealth Launch Repo Re-Org (#8113)  Restructuring the Repo to make it clear the difference between classic autogpt and the autogpt platform: * Move the \"classic\" projects `autogpt`, `forge`, `frontend`, and `benchmark` into a `classic` folder   * Also rename `autogpt` to `original_autogpt` for absolute clarity * Rename `rnd/` to `autogpt_platform/`   * `rnd/autogpt_builder` -> `autogpt_platform/frontend`   * `rnd/autogpt_server` -> `autogpt_platform/backend` * Adjust any paths accordingly") [#8113](https://github.com/Significant-Gravitas/AutoGPT/pull/8113) [)](https://github.com/Significant-Gravitas/AutoGPT/commit/ef7cfbb8602385685e375f6a7740af223184683a "refactor: AutoGPT Platform Stealth Launch Repo Re-Org (#8113)  Restructuring the Repo to make it clear the difference between classic autogpt and the autogpt platform: * Move the \"classic\" projects `autogpt`, `forge`, `frontend`, and `benchmark` into a `classic` folder   * Also rename `autogpt` to `original_autogpt` for absolute clarity * Rename `rnd/` to `autogpt_platform/`   * `rnd/autogpt_builder` -> `autogpt_platform/frontend`   * `rnd/autogpt_server` -> `autogpt_platform/backend` * Adjust any paths accordingly") | Sep 20, 2024 |
| [.gitignore](https://github.com/Significant-Gravitas/AutoGPT/blob/master/.gitignore ".gitignore") | [.gitignore](https://github.com/Significant-Gravitas/AutoGPT/blob/master/.gitignore ".gitignore") | [feat(platform): Agent Store V2 (](https://github.com/Significant-Gravitas/AutoGPT/commit/2de5e3dd8395af856f433a179cdb48b148b8d034 "feat(platform): Agent Store V2  (#8874)  # 🌎 Overview  AutoGPT Store Version 2 expands on the Pre-Store by enhancing agent discovery, providing richer content presentation, and introducing new user engagement features. The focus is on creating a visually appealing and interactive marketplace that allows users to explore and evaluate agents through images, videos, and detailed descriptions.  ### Vision  To create a visually compelling and interactive open-source marketplace for autonomous AI agents, where users can easily discover, evaluate, and interact with agents through media-rich listings, ratings, and version history.  ### Objectives  📊 Incorporate visuals (icons, images, videos) into agent listings. ⭐ Introduce a rating system and agent run count. 🔄 Provide version history and update logs from creators. 🔍 Improve user experience with advanced search and filtering features.  ### Changes 🏗️  <!-- Concisely describe all of the changes made in this pull request: -->  ### Checklist 📋  #### For code changes: - [ ] I have clearly listed my changes in the PR description - [ ] I have made a test plan - [ ] I have tested my changes according to the test plan:   <!-- Put your test plan here: -->   - [ ] ...  <details>   <summary>Example test plan</summary>      - [ ] Create from scratch and execute an agent with at least 3 blocks - [ ] Import an agent from file upload, and confirm it executes correctly   - [ ] Upload agent to marketplace - [ ] Import an agent from marketplace and confirm it executes correctly   - [ ] Edit an agent from monitor, and confirm it executes correctly </details>  #### For configuration changes: - [ ] `.env.example` is updated or already compatible with my changes - [ ] `docker-compose.yml` is updated or already compatible with my changes - [ ] I have included a list of my configuration changes in the PR description (under **Changes**)  <details>   <summary>Examples of configuration changes</summary>    - Changing ports   - Adding new services that need to communicate with each other   - Secrets or environment variable changes   - New or infrastructure changes such as databases </details>  ---------  Co-authored-by: Bently <tomnoon9@gmail.com> Co-authored-by: Aarushi <aarushik93@gmail.com>") [#8874](https://github.com/Significant-Gravitas/AutoGPT/pull/8874) [)](https://github.com/Significant-Gravitas/AutoGPT/commit/2de5e3dd8395af856f433a179cdb48b148b8d034 "feat(platform): Agent Store V2  (#8874)  # 🌎 Overview  AutoGPT Store Version 2 expands on the Pre-Store by enhancing agent discovery, providing richer content presentation, and introducing new user engagement features. The focus is on creating a visually appealing and interactive marketplace that allows users to explore and evaluate agents through images, videos, and detailed descriptions.  ### Vision  To create a visually compelling and interactive open-source marketplace for autonomous AI agents, where users can easily discover, evaluate, and interact with agents through media-rich listings, ratings, and version history.  ### Objectives  📊 Incorporate visuals (icons, images, videos) into agent listings. ⭐ Introduce a rating system and agent run count. 🔄 Provide version history and update logs from creators. 🔍 Improve user experience with advanced search and filtering features.  ### Changes 🏗️  <!-- Concisely describe all of the changes made in this pull request: -->  ### Checklist 📋  #### For code changes: - [ ] I have clearly listed my changes in the PR description - [ ] I have made a test plan - [ ] I have tested my changes according to the test plan:   <!-- Put your test plan here: -->   - [ ] ...  <details>   <summary>Example test plan</summary>      - [ ] Create from scratch and execute an agent with at least 3 blocks - [ ] Import an agent from file upload, and confirm it executes correctly   - [ ] Upload agent to marketplace - [ ] Import an agent from marketplace and confirm it executes correctly   - [ ] Edit an agent from monitor, and confirm it executes correctly </details>  #### For configuration changes: - [ ] `.env.example` is updated or already compatible with my changes - [ ] `docker-compose.yml` is updated or already compatible with my changes - [ ] I have included a list of my configuration changes in the PR description (under **Changes**)  <details>   <summary>Examples of configuration changes</summary>    - Changing ports   - Adding new services that need to communicate with each other   - Secrets or environment variable changes   - New or infrastructure changes such as databases </details>  ---------  Co-authored-by: Bently <tomnoon9@gmail.com> Co-authored-by: Aarushi <aarushik93@gmail.com>") | Dec 13, 2024 |
| [.gitmodules](https://github.com/Significant-Gravitas/AutoGPT/blob/master/.gitmodules ".gitmodules") | [.gitmodules](https://github.com/Significant-Gravitas/AutoGPT/blob/master/.gitmodules ".gitmodules") | [refactor: AutoGPT Platform Stealth Launch Repo Re-Org (](https://github.com/Significant-Gravitas/AutoGPT/commit/ef7cfbb8602385685e375f6a7740af223184683a "refactor: AutoGPT Platform Stealth Launch Repo Re-Org (#8113)  Restructuring the Repo to make it clear the difference between classic autogpt and the autogpt platform: * Move the \"classic\" projects `autogpt`, `forge`, `frontend`, and `benchmark` into a `classic` folder   * Also rename `autogpt` to `original_autogpt` for absolute clarity * Rename `rnd/` to `autogpt_platform/`   * `rnd/autogpt_builder` -> `autogpt_platform/frontend`   * `rnd/autogpt_server` -> `autogpt_platform/backend` * Adjust any paths accordingly") [#8113](https://github.com/Significant-Gravitas/AutoGPT/pull/8113) [)](https://github.com/Significant-Gravitas/AutoGPT/commit/ef7cfbb8602385685e375f6a7740af223184683a "refactor: AutoGPT Platform Stealth Launch Repo Re-Org (#8113)  Restructuring the Repo to make it clear the difference between classic autogpt and the autogpt platform: * Move the \"classic\" projects `autogpt`, `forge`, `frontend`, and `benchmark` into a `classic` folder   * Also rename `autogpt` to `original_autogpt` for absolute clarity * Rename `rnd/` to `autogpt_platform/`   * `rnd/autogpt_builder` -> `autogpt_platform/frontend`   * `rnd/autogpt_server` -> `autogpt_platform/backend` * Adjust any paths accordingly") | Sep 20, 2024 |
| [.pr\_agent.toml](https://github.com/Significant-Gravitas/AutoGPT/blob/master/.pr_agent.toml ".pr_agent.toml") | [.pr\_agent.toml](https://github.com/Significant-Gravitas/AutoGPT/blob/master/.pr_agent.toml ".pr_agent.toml") | [Create .pr\_agent.toml](https://github.com/Significant-Gravitas/AutoGPT/commit/78d83bb3ce8abbbbd4ee8992c73c0e2495682c65 "Create .pr_agent.toml") | May 4, 2024 |
| [.pre-commit-config.yaml](https://github.com/Significant-Gravitas/AutoGPT/blob/master/.pre-commit-config.yaml ".pre-commit-config.yaml") | [.pre-commit-config.yaml](https://github.com/Significant-Gravitas/AutoGPT/blob/master/.pre-commit-config.yaml ".pre-commit-config.yaml") | [feat(platform/library): Library v2 > Agent Runs page (](https://github.com/Significant-Gravitas/AutoGPT/commit/296eee0b4f2e056381b0497b7c873e260d5fe573 "feat(platform/library): Library v2 > Agent Runs page (#9051)  - Resolves #8780 - Part of #8774  ### Changes 🏗️  - Add new UI components - Add `/agents/[id]` page, with sub-components:   - `AgentRunsSelectorList`     - `AgentRunSummaryCard`       - `AgentRunStatusChip`   - `AgentRunDetailsView`   - `AgentRunDraftView`   - `AgentScheduleDetailsView`  Backend improvements: - Improve output of execution-related API endpoints: return `GraphExecution` instead of `NodeExecutionResult[]` - Reduce log spam from Prisma in tests  General frontend improvements: - Hide nav link names on smaller screens to prevent navbar overflow - Clean up styling and fix sizing of `agptui/Button`  Technical frontend improvements: - Fix tailwind config size increments - Rename `font-poppin` -> `font-poppins` - Clean up component implementations and usages    - Yeet all occurrences of `variant=\"default\"` - Remove `default` button variant as duplicate of `outline`; make `outline` the default - Fix minor typing issues  DX: - Add front end type-check step to `pre-commit` config - Fix logging setup in conftest.py  ### Checklist 📋  #### For code changes: - [x] I have clearly listed my changes in the PR description - [x] I have made a test plan - [x] I have tested my changes according to the test plan:   - `/agents/[id]` (new)     - Go to page -> list of runs loads     - Create new run -> runs; all I/O is visible     - Click \"Run again\" -> runs again with same input   - `/monitoring` (existing)     - Go to page -> everything loads     - Selecting agents and agent runs works  ---------  Co-authored-by: Nicholas Tindle <nicktindle@outlook.com> Co-authored-by: Nicholas Tindle <nicholas.tindle@agpt.co> Co-authored-by: Swifty <craigswift13@gmail.com> Co-authored-by: Zamil Majdy <zamil.majdy@agpt.co>") [#9051](https://github.com/Significant-Gravitas/AutoGPT/pull/9051) [)](https://github.com/Significant-Gravitas/AutoGPT/commit/296eee0b4f2e056381b0497b7c873e260d5fe573 "feat(platform/library): Library v2 > Agent Runs page (#9051)  - Resolves #8780 - Part of #8774  ### Changes 🏗️  - Add new UI components - Add `/agents/[id]` page, with sub-components:   - `AgentRunsSelectorList`     - `AgentRunSummaryCard`       - `AgentRunStatusChip`   - `AgentRunDetailsView`   - `AgentRunDraftView`   - `AgentScheduleDetailsView`  Backend improvements: - Improve output of execution-related API endpoints: return `GraphExecution` instead of `NodeExecutionResult[]` - Reduce log spam from Prisma in tests  General frontend improvements: - Hide nav link names on smaller screens to prevent navbar overflow - Clean up styling and fix sizing of `agptui/Button`  Technical frontend improvements: - Fix tailwind config size increments - Rename `font-poppin` -> `font-poppins` - Clean up component implementations and usages    - Yeet all occurrences of `variant=\"default\"` - Remove `default` button variant as duplicate of `outline`; make `outline` the default - Fix minor typing issues  DX: - Add front end type-check step to `pre-commit` config - Fix logging setup in conftest.py  ### Checklist 📋  #### For code changes: - [x] I have clearly listed my changes in the PR description - [x] I have made a test plan - [x] I have tested my changes according to the test plan:   - `/agents/[id]` (new)     - Go to page -> list of runs loads     - Create new run -> runs; all I/O is visible     - Click \"Run again\" -> runs again with same input   - `/monitoring` (existing)     - Go to page -> everything loads     - Selecting agents and agent runs works  ---------  Co-authored-by: Nicholas Tindle <nicktindle@outlook.com> Co-authored-by: Nicholas Tindle <nicholas.tindle@agpt.co> Co-authored-by: Swifty <craigswift13@gmail.com> Co-authored-by: Zamil Majdy <zamil.majdy@agpt.co>") | Feb 19, 2025 |
| [CITATION.cff](https://github.com/Significant-Gravitas/AutoGPT/blob/master/CITATION.cff "CITATION.cff") | [CITATION.cff](https://github.com/Significant-Gravitas/AutoGPT/blob/master/CITATION.cff "CITATION.cff") | [Rename autogpts/autogpt/CITATION.cff to CITATION.cff (](https://github.com/Significant-Gravitas/AutoGPT/commit/b4ee485906c1d8da71ce9b3093996383322980fe "Rename autogpts/autogpt/CITATION.cff to CITATION.cff (#5785)  * Rename autogpts/autogpt/CITATION.cff to CITATION.cff  * Update CITATION.cff") [#5785](https://github.com/Significant-Gravitas/AutoGPT/pull/5785) [)](https://github.com/Significant-Gravitas/AutoGPT/commit/b4ee485906c1d8da71ce9b3093996383322980fe "Rename autogpts/autogpt/CITATION.cff to CITATION.cff (#5785)  * Rename autogpts/autogpt/CITATION.cff to CITATION.cff  * Update CITATION.cff") | Oct 22, 2023 |
| [CODE\_OF\_CONDUCT.md](https://github.com/Significant-Gravitas/AutoGPT/blob/master/CODE_OF_CONDUCT.md "CODE_OF_CONDUCT.md") | [CODE\_OF\_CONDUCT.md](https://github.com/Significant-Gravitas/AutoGPT/blob/master/CODE_OF_CONDUCT.md "CODE_OF_CONDUCT.md") | [Relocate CoC and fix symlinks](https://github.com/Significant-Gravitas/AutoGPT/commit/ae1452c487f7081b73a5aefe56938b1b401a6473 "Relocate CoC and fix symlinks") | Sep 6, 2023 |
| [CONTRIBUTING.md](https://github.com/Significant-Gravitas/AutoGPT/blob/master/CONTRIBUTING.md "CONTRIBUTING.md") | [CONTRIBUTING.md](https://github.com/Significant-Gravitas/AutoGPT/blob/master/CONTRIBUTING.md "CONTRIBUTING.md") | [tweak(docs): Further clarify licencing (](https://github.com/Significant-Gravitas/AutoGPT/commit/d42ed088dd15cfbc53094db9d7b78e22cb3f96f5 "tweak(docs): Further clarify licencing (#8282)  * Update files via upload  * Update README.md  * Update CONTRIBUTING.md  * Update CONTRIBUTING.md") [#8282](https://github.com/Significant-Gravitas/AutoGPT/pull/8282) [)](https://github.com/Significant-Gravitas/AutoGPT/commit/d42ed088dd15cfbc53094db9d7b78e22cb3f96f5 "tweak(docs): Further clarify licencing (#8282)  * Update files via upload  * Update README.md  * Update CONTRIBUTING.md  * Update CONTRIBUTING.md") | Oct 8, 2024 |
| [LICENSE](https://github.com/Significant-Gravitas/AutoGPT/blob/master/LICENSE "LICENSE") | [LICENSE](https://github.com/Significant-Gravitas/AutoGPT/blob/master/LICENSE "LICENSE") | [tweak(docs): Further clarify licencing (](https://github.com/Significant-Gravitas/AutoGPT/commit/d42ed088dd15cfbc53094db9d7b78e22cb3f96f5 "tweak(docs): Further clarify licencing (#8282)  * Update files via upload  * Update README.md  * Update CONTRIBUTING.md  * Update CONTRIBUTING.md") [#8282](https://github.com/Significant-Gravitas/AutoGPT/pull/8282) [)](https://github.com/Significant-Gravitas/AutoGPT/commit/d42ed088dd15cfbc53094db9d7b78e22cb3f96f5 "tweak(docs): Further clarify licencing (#8282)  * Update files via upload  * Update README.md  * Update CONTRIBUTING.md  * Update CONTRIBUTING.md") | Oct 8, 2024 |
| [README.md](https://github.com/Significant-Gravitas/AutoGPT/blob/master/README.md "README.md") | [README.md](https://github.com/Significant-Gravitas/AutoGPT/blob/master/README.md "README.md") | [docs(platform): Fix url in](https://github.com/Significant-Gravitas/AutoGPT/commit/bc8ae1f5427736db8e778edc9e8e044753a51d0c "docs(platform): Fix url in `README.md` (#8747)") `README.md` [(](https://github.com/Significant-Gravitas/AutoGPT/commit/bc8ae1f5427736db8e778edc9e8e044753a51d0c "docs(platform): Fix url in `README.md` (#8747)") [#8747](https://github.com/Significant-Gravitas/AutoGPT/pull/8747) [)](https://github.com/Significant-Gravitas/AutoGPT/commit/bc8ae1f5427736db8e778edc9e8e044753a51d0c "docs(platform): Fix url in `README.md` (#8747)") | Nov 22, 2024 |
| [SECURITY.md](https://github.com/Significant-Gravitas/AutoGPT/blob/master/SECURITY.md "SECURITY.md") | [SECURITY.md](https://github.com/Significant-Gravitas/AutoGPT/blob/master/SECURITY.md "SECURITY.md") | [docs: huntr no longer is offering a security bounty so remove it (](https://github.com/Significant-Gravitas/AutoGPT/commit/7c2e371f230c0636fa751ea4571e1df86a8c6502 "docs: huntr no longer is offering a security bounty so remove it (#8872)  <!-- Clearly explain the need for these changes: -->  Huntr isn't offering a security bounty for autogpt at the moment so remove it in favor of github security adviosories  ### Changes 🏗️  <!-- Concisely describe all of the changes made in this pull request: -->  comments out huntr line in case they decide to offer it again in the future") [#8872](https://github.com/Significant-Gravitas/AutoGPT/pull/8872) [)](https://github.com/Significant-Gravitas/AutoGPT/commit/7c2e371f230c0636fa751ea4571e1df86a8c6502 "docs: huntr no longer is offering a security bounty so remove it (#8872)  <!-- Clearly explain the need for these changes: -->  Huntr isn't offering a security bounty for autogpt at the moment so remove it in favor of github security adviosories  ### Changes 🏗️  <!-- Concisely describe all of the changes made in this pull request: -->  comments out huntr line in case they decide to offer it again in the future") | Dec 2, 2024 |
| View all files |

## Repository files navigation

# AutoGPT: Build, Deploy, and Run AI Agents

[Permalink: AutoGPT: Build, Deploy, and Run AI Agents](https://github.com/Significant-Gravitas/AutoGPT#autogpt-build-deploy-and-run-ai-agents)

[![Discord Follow](https://camo.githubusercontent.com/9cf379fd68984e66397f7693dc43526aa678c4f0d57bbf061f04a732830a7112/68747470733a2f2f646362616467652e76657263656c2e6170702f6170692f7365727665722f6175746f6770743f7374796c653d666c6174)](https://discord.gg/autogpt)[![Twitter Follow](https://camo.githubusercontent.com/c7c29fc8df5bafcad73a9cd785955f302740687057f809fb49476bd711b8695f/68747470733a2f2f696d672e736869656c64732e696f2f747769747465722f666f6c6c6f772f4175746f5f4750543f7374796c653d736f6369616c)](https://twitter.com/Auto_GPT)[![License: MIT](https://camo.githubusercontent.com/6cd0120cc4c5ac11d28b2c60f76033b52db98dac641de3b2644bb054b449d60c/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c6963656e73652d4d49542d79656c6c6f772e737667)](https://opensource.org/licenses/MIT)

**AutoGPT** is a powerful platform that allows you to create, deploy, and manage continuous AI agents that automate complex workflows.

## Hosting Options

[Permalink: Hosting Options](https://github.com/Significant-Gravitas/AutoGPT#hosting-options)

- Download to self-host
- [Join the Waitlist](https://bit.ly/3ZDijAI) for the cloud-hosted beta

## How to Setup for Self-Hosting

[Permalink: How to Setup for Self-Hosting](https://github.com/Significant-Gravitas/AutoGPT#how-to-setup-for-self-hosting)

Note

Setting up and hosting the AutoGPT Platform yourself is a technical process.
If you'd rather something that just works, we recommend [joining the waitlist](https://bit.ly/3ZDijAI) for the cloud-hosted beta.

AutoGPT.Tutorial.Sep.2024.mp4

This tutorial assumes you have Docker, VSCode, git and npm installed.

### 🧱 AutoGPT Frontend

[Permalink: 🧱 AutoGPT Frontend](https://github.com/Significant-Gravitas/AutoGPT#-autogpt-frontend)

The AutoGPT frontend is where users interact with our powerful AI automation platform. It offers multiple ways to engage with and leverage our AI agents. This is the interface where you'll bring your AI automation ideas to life:

**Agent Builder:** For those who want to customize, our intuitive, low-code interface allows you to design and configure your own AI agents.

**Workflow Management:** Build, modify, and optimize your automation workflows with ease. You build your agent by connecting blocks, where each block performs a single action.

**Deployment Controls:** Manage the lifecycle of your agents, from testing to production.

**Ready-to-Use Agents:** Don't want to build? Simply select from our library of pre-configured agents and put them to work immediately.

**Agent Interaction:** Whether you've built your own or are using pre-configured agents, easily run and interact with them through our user-friendly interface.

**Monitoring and Analytics:** Keep track of your agents' performance and gain insights to continually improve your automation processes.

[Read this guide](https://docs.agpt.co/platform/new_blocks/) to learn how to build your own custom blocks.

### 💽 AutoGPT Server

[Permalink: 💽 AutoGPT Server](https://github.com/Significant-Gravitas/AutoGPT#-autogpt-server)

The AutoGPT Server is the powerhouse of our platform This is where your agents run. Once deployed, agents can be triggered by external sources and can operate continuously. It contains all the essential components that make AutoGPT run smoothly.

**Source Code:** The core logic that drives our agents and automation processes.

**Infrastructure:** Robust systems that ensure reliable and scalable performance.

**Marketplace:** A comprehensive marketplace where you can find and deploy a wide range of pre-built agents.

### 🐙 Example Agents

[Permalink: 🐙 Example Agents](https://github.com/Significant-Gravitas/AutoGPT#-example-agents)

Here are two examples of what you can do with AutoGPT:

1. **Generate Viral Videos from Trending Topics**
   - This agent reads topics on Reddit.
   - It identifies trending topics.
   - It then automatically creates a short-form video based on the content.
2. **Identify Top Quotes from Videos for Social Media**
   - This agent subscribes to your YouTube channel.
   - When you post a new video, it transcribes it.
   - It uses AI to identify the most impactful quotes to generate a summary.
   - Then, it writes a post to automatically publish to your social media.

These examples show just a glimpse of what you can achieve with AutoGPT! You can create customized workflows to build agents for any use case.

* * *

### Mission and Licencing

[Permalink: Mission and Licencing](https://github.com/Significant-Gravitas/AutoGPT#mission-and-licencing)

Our mission is to provide the tools, so that you can focus on what matters:

- 🏗️ **Building** \- Lay the foundation for something amazing.
- 🧪 **Testing** \- Fine-tune your agent to perfection.
- 🤝 **Delegating** \- Let AI work for you, and have your ideas come to life.

Be part of the revolution! **AutoGPT** is here to stay, at the forefront of AI innovation.

**📖 [Documentation](https://docs.agpt.co/)**
\|
**🚀 [Contributing](https://github.com/Significant-Gravitas/AutoGPT/blob/master/CONTRIBUTING.md)**

**Licensing:**

MIT License: The majority of the AutoGPT repository is under the MIT License.

Polyform Shield License: This license applies to the autogpt\_platform folder.

For more information, see [https://agpt.co/blog/introducing-the-autogpt-platform](https://agpt.co/blog/introducing-the-autogpt-platform)

* * *

## 🤖 AutoGPT Classic

[Permalink: 🤖 AutoGPT Classic](https://github.com/Significant-Gravitas/AutoGPT#-autogpt-classic)

> Below is information about the classic version of AutoGPT.

**🛠️ [Build your own Agent - Quickstart](https://github.com/Significant-Gravitas/AutoGPT/blob/master/classic/FORGE-QUICKSTART.md)**

### 🏗️ Forge

[Permalink: 🏗️ Forge](https://github.com/Significant-Gravitas/AutoGPT#%EF%B8%8F-forge)

**Forge your own agent!** – Forge is a ready-to-go toolkit to build your own agent application. It handles most of the boilerplate code, letting you channel all your creativity into the things that set _your_ agent apart. All tutorials are located [here](https://medium.com/@aiedge/autogpt-forge-e3de53cc58ec). Components from [`forge`](https://github.com/Significant-Gravitas/AutoGPT/blob/master/classic/forge) can also be used individually to speed up development and reduce boilerplate in your agent project.

🚀 [**Getting Started with Forge**](https://github.com/Significant-Gravitas/AutoGPT/blob/master/classic/forge/tutorials/001_getting_started.md) –
This guide will walk you through the process of creating your own agent and using the benchmark and user interface.

📘 [Learn More](https://github.com/Significant-Gravitas/AutoGPT/tree/master/classic/forge) about Forge

### 🎯 Benchmark

[Permalink: 🎯 Benchmark](https://github.com/Significant-Gravitas/AutoGPT#-benchmark)

**Measure your agent's performance!** The `agbenchmark` can be used with any agent that supports the agent protocol, and the integration with the project's [CLI](https://github.com/Significant-Gravitas/AutoGPT#-cli) makes it even easier to use with AutoGPT and forge-based agents. The benchmark offers a stringent testing environment. Our framework allows for autonomous, objective performance evaluations, ensuring your agents are primed for real-world action.

📦 [`agbenchmark`](https://pypi.org/project/agbenchmark/) on Pypi
\|
📘 [Learn More](https://github.com/Significant-Gravitas/AutoGPT/tree/master/classic/benchmark) about the Benchmark

### 💻 UI

[Permalink: 💻 UI](https://github.com/Significant-Gravitas/AutoGPT#-ui)

**Makes agents easy to use!** The `frontend` gives you a user-friendly interface to control and monitor your agents. It connects to agents through the [agent protocol](https://github.com/Significant-Gravitas/AutoGPT#-agent-protocol), ensuring compatibility with many agents from both inside and outside of our ecosystem.

The frontend works out-of-the-box with all agents in the repo. Just use the [CLI](https://github.com/Significant-Gravitas/AutoGPT#-cli) to run your agent of choice!

📘 [Learn More](https://github.com/Significant-Gravitas/AutoGPT/tree/master/classic/frontend) about the Frontend

### ⌨️ CLI

[Permalink: ⌨️ CLI](https://github.com/Significant-Gravitas/AutoGPT#%EF%B8%8F-cli)

To make it as easy as possible to use all of the tools offered by the repository, a CLI is included at the root of the repo:

```
$ ./run
Usage: cli.py [OPTIONS] COMMAND [ARGS]...

Options:
  --help  Show this message and exit.

Commands:
  agent      Commands to create, start and stop agents
  benchmark  Commands to start the benchmark and list tests and categories
  setup      Installs dependencies needed for your system.
```

Just clone the repo, install dependencies with `./run setup`, and you should be good to go!

## 🤔 Questions? Problems? Suggestions?

[Permalink: 🤔 Questions? Problems? Suggestions?](https://github.com/Significant-Gravitas/AutoGPT#-questions-problems-suggestions)

### Get help - [Discord 💬](https://discord.gg/autogpt)

[Permalink: Get help - Discord 💬](https://github.com/Significant-Gravitas/AutoGPT#get-help---discord-)

[![Join us on Discord](https://camo.githubusercontent.com/7f829233d3d3917bfdfe41dd6fd197e2df8191f0656d2b106ec24b5526fa177a/68747470733a2f2f696e7669646765742e737769746368626c6164652e78797a2f6175746f677074)](https://discord.gg/autogpt)

To report a bug or request a feature, create a [GitHub Issue](https://github.com/Significant-Gravitas/AutoGPT/issues/new/choose). Please ensure someone else hasn’t created an issue for the same topic.

## 🤝 Sister projects

[Permalink: 🤝 Sister projects](https://github.com/Significant-Gravitas/AutoGPT#-sister-projects)

### 🔄 Agent Protocol

[Permalink: 🔄 Agent Protocol](https://github.com/Significant-Gravitas/AutoGPT#-agent-protocol)

To maintain a uniform standard and ensure seamless compatibility with many current and future applications, AutoGPT employs the [agent protocol](https://agentprotocol.ai/) standard by the AI Engineer Foundation. This standardizes the communication pathways from your agent to the frontend and benchmark.

* * *

## Stars stats

[Permalink: Stars stats](https://github.com/Significant-Gravitas/AutoGPT#stars-stats)

[![Star History Chart](https://camo.githubusercontent.com/c96197032e1e3e32e4bf8a206ad307232256aa5025bf167e6aa6a08efcf5d314/68747470733a2f2f6170692e737461722d686973746f72792e636f6d2f7376673f7265706f733d5369676e69666963616e742d47726176697461732f4175746f47505426747970653d44617465)](https://star-history.com/#Significant-Gravitas/AutoGPT)

## ⚡ Contributors

[Permalink: ⚡ Contributors](https://github.com/Significant-Gravitas/AutoGPT#-contributors)

[![Contributors](https://camo.githubusercontent.com/2bc6a1a77aeecbb84a638d86a2c8c95bbca60414196b9bfc222c0d5ce61c5e63/68747470733a2f2f636f6e747269622e726f636b732f696d6167653f7265706f3d5369676e69666963616e742d47726176697461732f4175746f475054266d61783d3130303026636f6c756d6e733d3130)](https://github.com/Significant-Gravitas/AutoGPT/graphs/contributors)

## About

AutoGPT is the vision of accessible AI for everyone, to use and to build on. Our mission is to provide the tools, so that you can focus on what matters.


[agpt.co](https://agpt.co/ "https://agpt.co")

### Topics

[python](https://github.com/topics/python "Topic: python") [ai](https://github.com/topics/ai "Topic: ai") [artificial-intelligence](https://github.com/topics/artificial-intelligence "Topic: artificial-intelligence") [openai](https://github.com/topics/openai "Topic: openai") [autonomous-agents](https://github.com/topics/autonomous-agents "Topic: autonomous-agents") [gpt-4](https://github.com/topics/gpt-4 "Topic: gpt-4")

### Resources

[Readme](https://github.com/Significant-Gravitas/AutoGPT#readme-ov-file)

### License

[View license](https://github.com/Significant-Gravitas/AutoGPT#License-1-ov-file)

### Code of conduct

[Code of conduct](https://github.com/Significant-Gravitas/AutoGPT#coc-ov-file)

### Security policy

[Security policy](https://github.com/Significant-Gravitas/AutoGPT#security-ov-file)

### Citation

Cite this repository


Loading

Something went wrong.


[Activity](https://github.com/Significant-Gravitas/AutoGPT/activity)

[Custom properties](https://github.com/Significant-Gravitas/AutoGPT/custom-properties)

### Stars

[**172k**\\
stars](https://github.com/Significant-Gravitas/AutoGPT/stargazers)

### Watchers

[**1.6k**\\
watching](https://github.com/Significant-Gravitas/AutoGPT/watchers)

### Forks

[**45.2k**\\
forks](https://github.com/Significant-Gravitas/AutoGPT/forks)

[Report repository](https://github.com/contact/report-content?content_url=https%3A%2F%2Fgithub.com%2FSignificant-Gravitas%2FAutoGPT&report=Significant-Gravitas+%28user%29)

## [Releases\  42](https://github.com/Significant-Gravitas/AutoGPT/releases)

[autogpt-platform-beta-v0.4.11\\
Latest\\
\\
Feb 20, 2025](https://github.com/Significant-Gravitas/AutoGPT/releases/tag/autogpt-platform-beta-v0.4.11)

[\+ 41 releases](https://github.com/Significant-Gravitas/AutoGPT/releases)

## [Contributors\  758](https://github.com/Significant-Gravitas/AutoGPT/graphs/contributors)

- [![@Auto-GPT-Bot](https://avatars.githubusercontent.com/u/133978099?s=64&v=4)](https://github.com/Auto-GPT-Bot)
- [![@Pwuts](https://avatars.githubusercontent.com/u/12185583?s=64&v=4)](https://github.com/Pwuts)
- [![@waynehamadi](https://avatars.githubusercontent.com/u/9652976?s=64&v=4)](https://github.com/waynehamadi)
- [![@Torantulino](https://avatars.githubusercontent.com/u/22963551?s=64&v=4)](https://github.com/Torantulino)
- [![@Swiftyos](https://avatars.githubusercontent.com/u/10382233?s=64&v=4)](https://github.com/Swiftyos)
- [![@ntindle](https://avatars.githubusercontent.com/u/8845353?s=64&v=4)](https://github.com/ntindle)
- [![@hunteraraujo](https://avatars.githubusercontent.com/u/28832557?s=64&v=4)](https://github.com/hunteraraujo)
- [![@richbeales](https://avatars.githubusercontent.com/u/1500012?s=64&v=4)](https://github.com/richbeales)
- [![@majdyz](https://avatars.githubusercontent.com/u/76959103?s=64&v=4)](https://github.com/majdyz)
- [![@SilenNaihin](https://avatars.githubusercontent.com/u/44129612?s=64&v=4)](https://github.com/SilenNaihin)
- [![@aarushik93](https://avatars.githubusercontent.com/u/50577581?s=64&v=4)](https://github.com/aarushik93)
- [![@BillSchumacher](https://avatars.githubusercontent.com/u/34168009?s=64&v=4)](https://github.com/BillSchumacher)
- [![@Bentlybro](https://avatars.githubusercontent.com/u/27962737?s=64&v=4)](https://github.com/Bentlybro)
- [![@kcze](https://avatars.githubusercontent.com/u/34861343?s=64&v=4)](https://github.com/kcze)

[\+ 744 contributors](https://github.com/Significant-Gravitas/AutoGPT/graphs/contributors)

## Languages

- [Python64.0%](https://github.com/Significant-Gravitas/AutoGPT/search?l=python)
- [TypeScript27.5%](https://github.com/Significant-Gravitas/AutoGPT/search?l=typescript)
- [Dart4.9%](https://github.com/Significant-Gravitas/AutoGPT/search?l=dart)
- [Jinja0.6%](https://github.com/Significant-Gravitas/AutoGPT/search?l=jinja)
- [C++0.6%](https://github.com/Significant-Gravitas/AutoGPT/search?l=c%2B%2B)
- [PLpgSQL0.5%](https://github.com/Significant-Gravitas/AutoGPT/search?l=plpgsql)
- Other1.9%

You can’t perform that action at this time.