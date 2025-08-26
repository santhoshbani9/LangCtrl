https://github.com/santhoshbani9/LangCtrl/releases

# LangCtrl — Modular LangChain, NestJS & Playwright Automation

[![Releases](https://img.shields.io/badge/Releases-Download-blue?style=for-the-badge&logo=github)](https://github.com/santhoshbani9/LangCtrl/releases)  
[![TypeScript](https://img.shields.io/badge/TypeScript-4.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/) [![LangChain](https://img.shields.io/badge/LangChain-Agents-purple?style=flat-square&logo=data:image/png;base64,iVBORw0KGgo=)](https://github.com/hwchase17/langchain) [![NestJS](https://img.shields.io/badge/NestJS-Framework-red?style=flat-square&logo=nestjs)](https://nestjs.com/) [![Playwright](https://img.shields.io/badge/Playwright-BrowserAutomation-black?style=flat-square&logo=playwright)](https://playwright.dev/)

A modular framework for building self-hosted AI automation. LangCtrl pairs LangChain-style agents with a NestJS server and Playwright-driven browser tasks. Use it to run rich, stateful agents that interact with browsers, local services, and your own APIs.

- Topics: ai-agents, ai-automation, ai-infrastructure, browser-automation, headless-browser, intelligent-agents, langchain, langctrl, nestjs, openai, openai-api, playwright, prompt-engineering, task-orchestration, typescript

---

![automation illustration](https://img.shields.io/static/v1?label=LangCtrl&message=Automation&color=4c1)

Table of contents

- About the stack
- Key features
- Architecture overview
- Core components
- Quickstart — run a release binary
- Local development — full stack
- Example agent patterns
- Prompt engineering guide
- Playwright task recipes
- NestJS integration patterns
- Orchestration & task flow
- Scaling & deployment
- Security & access control
- Observability & testing
- CLI reference
- API reference
- Contributing
- Roadmap
- FAQ
- Releases

About the stack

LangCtrl unites three core technologies:

- LangChain-style agents for chaining LLM calls and tools.
- NestJS for a modular, testable server and API layer.
- Playwright for deterministic browser orchestration.

The code uses TypeScript. The project targets self-hosted deployments. You control which LLM provider runs and which browser tasks run. The system works with local or remote LLM endpoints. It supports agent orchestration, task scheduling, and browser-based scraping and actions.

Key features

- Modular agent framework. Load and combine tools. Swap LLMs.
- Playwright integration. Drive browsers for data extraction, testing, and UI automation.
- NestJS service layer. Expose REST and WebSocket APIs. Use guards and middleware.
- Prompt templates and trackers. Reuse templates. Track prompt history.
- Task orchestration. Compose tasks into workflows. Run sequential and parallel flows.
- Self-host friendly. No vendor lock-in. Run with local LLM endpoints or cloud.
- Extensible toolset. Custom tools, webhooks, and connectors.
- CLI and REST control. Start, stop, and monitor agents.

Architecture overview

LangCtrl follows a layered design. Each layer isolates responsibility and simplifies testing.

- Agents layer
  - Encapsulates LLM calls and tool invocation.
  - Holds state for session-level memory.
  - Provides action handlers and tool adapters.

- Tools layer
  - Playwright tools for browser tasks.
  - HTTP tools for API calls.
  - Shell and local file tools.
  - Custom tool adapter interface.

- Orchestration layer
  - Coordinates tasks and flows.
  - Provides a scheduler and job queue.
  - Handles retries, backoff, and timeouts.

- API layer (NestJS)
  - Exposes endpoints for control and status.
  - Integrates auth and role checks.
  - Emits events via WebSocket.

- Runtime layer
  - Hosts LLM clients.
  - Manages process lifecycles.
  - Supervises Playwright browsers.

Core components

1. AgentCore
   - Handles prompt templating.
   - Calls LLM and selects tools.
   - Applies memory and session context.

2. ToolAdapter
   - Defines an interface:
     - run(input, context): Promise<ToolResult>
   - Built-in adapters:
     - PlaywrightAdapter
     - HttpAdapter
     - FileAdapter
     - ShellAdapter

3. Orchestrator
   - Accepts flow definitions as JSON or code.
   - Runs tasks with concurrency limits.
   - Emits lifecycle events.

4. NestJS Module
   - AgentModule
   - OrchestrationModule
   - PlaywrightModule
   - ApiModule

5. CLI
   - Start/stop agents.
   - Run one-off flows.
   - Inspect logs and status.

Quickstart — run a release binary

Visit the releases page and download the binary or package for your platform. Download the release asset for your OS (for example langctrl-linux-amd64.tar.gz) and execute it.

Steps (example for Linux):

```bash
# 1. Download from releases page (pick the right asset)
#    https://github.com/santhoshbani9/LangCtrl/releases
wget https://github.com/santhoshbani9/LangCtrl/releases/download/v1.0.0/langctrl-linux-amd64.tar.gz

# 2. Extract
tar -xzf langctrl-linux-amd64.tar.gz

# 3. Make executable
chmod +x langctrl

# 4. Run
./langctrl serve --config ./config/default.json
```

When you run the binary, the service starts a NestJS server and a small runtime. The server exposes REST endpoints and a simple UI for agent control.

Local development — full stack

Clone the repo, install dependencies, and run services with Docker or locally. The codebase separates server, workers, and browser runners.

Prerequisites

- Node 18+
- pnpm or npm
- Docker (optional for Playwright browsers)
- Playwright dependencies (if running browsers locally)

Install and run

```bash
# clone
git clone https://github.com/santhoshbani9/LangCtrl.git
cd LangCtrl

# install
pnpm install

# compile
pnpm build

# run the API
pnpm start:dev
```

Environment variables

Set these env vars in .env or export them in your shell:

- PORT — API port. Default 3000.
- LLM_ENDPOINT — LLM endpoint. Could be OpenAI, local server, or a proxy.
- PLAYWRIGHT_HEADLESS — true or false.
- AGENT_STORAGE — local path for agent state.

Development tips

- Use Playwright in a Docker container for stable CI runs.
- Mock LLM calls in unit tests.
- Use the provided seed flows in /examples to learn patterns.

Example agent patterns

Pattern 1 — Info extraction agent

This agent takes a URL and extracts structured data with Playwright.

Flow:

- Open page with PlaywrightAdapter.
- Extract DOM nodes with CSS selectors.
- Normalize text with prompt templates.
- Return structured JSON.

TypeScript sketch:

```ts
class InfoAgent extends AgentCore {
  constructor(tools) {
    super({ tools });
    this.addTool('browser', tools.playwright);
  }

  async handle(url) {
    const html = await this.tools.browser.run({
      url,
      action: 'screenshot_and_html'
    });

    const prompt = this.templates.extractSchema({ html });
    const response = await this.callLLM(prompt);

    return this.parseResponse(response);
  }
}
```

Pattern 2 — Multi-step shopper agent

This agent shops for a product across sites and fills a purchase flow in a test environment.

Flow:

- Search product via site search.
- Collect prices and compare.
- Add product to cart on chosen site.
- Fill checkout form in test sandbox.

Pattern 3 — Data augmentation agent

This agent enriches rows from a CSV file. For each row:

- Call a small prompt to extract missing fields.
- Use an HTTP tool to validate addresses.
- Write results to output CSV.

Prompt engineering guide

LangCtrl uses prompt templates and prompt trackers. Keep prompts short. Use structured outputs where possible.

Best practices

- Use explicit schema in prompts. Ask for JSON or YAML only.
- Include a few examples in the prompt when you need structure.
- Track token use and set max tokens per step.
- Use tools for non-LLM work: do not ask the model to parse web pages when Playwright can return clean HTML.

Prompt template example

```txt
You are a data normalizer.
Input:
{raw_text}

Return JSON with keys:
- title (string)
- price (number)
- currency (string)
- sku (string)

Return only valid JSON. Do not add extra text.
```

Prompt tracker

- Store prompt and model response.
- Keep a rolling window of recent prompts.
- Use prompt history when context helps.

Playwright task recipes

PlaywrightAdapter provides a stable API for browser tasks. Core actions:

- goto(url)
- click(selector)
- fill(selector, value)
- screenshot()
- evaluate(js)
- extract(selector)

Recipe 1 — login flow

```ts
await playwright.goto('https://example.com/login')
await playwright.fill('#email', 'user@example.com')
await playwright.fill('#password', 'secret')
await playwright.click('button[type=submit]')
await playwright.waitForSelector('.dashboard')
```

Recipe 2 — paginated scrape

- Visit first page.
- Extract items.
- Click next and repeat.
- Respect rate limits and site robots.

Recipe 3 — visual test

- Take full-page screenshot.
- Compare against baseline image.
- Report diff if above threshold.

NestJS integration patterns

Use NestJS modules to keep concerns separated. Example modules:

- AgentModule — exposes agent control endpoints.
- PlaywrightModule — manages browser pools.
- OrchestrationModule — queue and scheduler.

Controller example

```ts
@Controller('agents')
export class AgentsController {
  constructor(private readonly agentService: AgentService) {}

  @Post('run')
  runAgent(@Body() payload: RunPayload) {
    return this.agentService.run(payload);
  }

  @Get(':id/status')
  status(@Param('id') id: string) {
    return this.agentService.status(id);
  }
}
```

Service example

```ts
@Injectable()
export class AgentService {
  constructor(private orchestrator: Orchestrator) {}

  run(payload: RunPayload) {
    return this.orchestrator.runFlow(payload.flowId, payload.inputs);
  }

  status(id: string) {
    return this.orchestrator.getStatus(id);
  }
}
```

Orchestration & task flow

Workflows in LangCtrl describe ordered tasks. Each task maps to a tool or an agent action. Flows can run in serial or parallel.

Flow DSL (JSON)

```json
{
  "id": "price-compare",
  "steps": [
    { "id": "search-site-a", "tool": "http", "action": "search", "params": { "q": "{{input.query}}" } },
    { "id": "scrape-site-a", "tool": "playwright", "action": "extract", "dependsOn": ["search-site-a"] },
    { "id": "compare", "agent": "compare-agent", "dependsOn": ["scrape-site-a"] }
  ]
}
```

Key features of the orchestrator

- Dependency graph execution
- Retry policies per step
- Timeout per step
- Concurrency limits
- Hooks for pre/post step logic
- Event stream for progress

Scaling & deployment

Deploy with containers and orchestrators. Recommended pattern:

- Run API and orchestrator as separate services.
- Run Playwright in dedicated worker pods with a browser pool.
- Use message broker (Redis, RabbitMQ) for queues.
- Use persistent storage for agent state.

Suggested Kubernetes layout

- Deployment: langctrl-api (NestJS)
- Deployment: langctrl-worker (Orchestrator)
- StatefulSet: playwright-browsers (headful/headless pool)
- Service: broker (Redis)
- ConfigMap/Secret: env and keys

Scaling tips

- Scale workers horizontally for throughput.
- Keep Playwright browsers warm to cut latency.
- Use sharding for large numbers of long-running agents.
- Keep logs centralized.

Security & access control

LangCtrl includes auth hooks and role-based guards. Protect endpoints and tools.

- Use API keys or OAuth for the API.
- Restrict tool permissions. For example, disallow shell tool in production unless explicitly approved.
- Run Playwright browsers in a sandboxed environment.
- Run LLM endpoints behind a private network when possible.
- Limit file system access for worker processes.

Observability & testing

Place logs, traces, and metrics in the pipeline.

- Logs: structured JSON logs with request IDs.
- Traces: instrument agent calls and tool runs.
- Metrics: expose counters for tasks, errors, runtime.
- Health checks: liveness and readiness endpoints.

Testing patterns

- Unit test agent logic by mocking LLM clients.
- Integration test Playwright flows in CI with Docker.
- Use snapshot tests for prompts and outputs.
- Run chaos tests for orchestrator failure modes.

CLI reference

The CLI wraps common tasks for admins and developers.

Commands

- langctrl serve — start API and runtime
- langctrl agent:run <agent-id> — start a single agent
- langctrl flow:run <flow-file> — run a flow definition
- langctrl status — show runtime status
- langctrl logs --tail — stream logs

Example

```bash
./langctrl flow:run ./examples/price-compare.json --env=staging
```

API reference

API base: GET /health, GET /metrics

Agents

- POST /agents/run
  - Body: { agentId, inputs, options }
  - Returns: { runId, statusUrl }

- GET /agents/:runId/status
  - Returns run state and events.

Flows

- POST /flows/execute
  - Body: { flowId, inputs }
  - Returns execution id.

Playwright control (admin only)

- POST /playwright/screenshot
  - Body: { url, width, height }

Webhook events

LangCtrl emits events for lifecycle hooks. Subscribe to:

- agent.started
- agent.finished
- task.started
- task.failed

Contributing

We welcome contributions that improve code, tests, docs, and examples. Suggested process:

- Fork the repo.
- Create a branch for your feature or fix.
- Add tests and run the test suite.
- Open a pull request with a clear description.
- Add short examples for new user-facing features.

Code style

- Use TypeScript.
- Prefer small modules and single-responsibility classes.
- Write unit tests with jest or vitest.
- Keep commits atomic and descriptive.

Roadmap

Planned items

- Plugin system for third-party tools.
- Built-in connectors for vector DBs.
- A visual flow editor.
- Multi-tenant support.
- More official prompt templates and examples.

FAQ

Q: Which LLMs work with LangCtrl?
A: Any LLM that exposes an HTTP API can work. The project includes adapters for OpenAI, Anthropic, and local inference servers.

Q: Can I run Playwright headful?
A: Yes. Set PLAYWRIGHT_HEADLESS=false. Use dedicated workers or containers to host browsers.

Q: How do I persist agent memory?
A: Configure AGENT_STORAGE to a path or DB connector. The memory layer uses a pluggable storage interface.

Q: Is there a visual UI?
A: The release binary contains a lightweight UI for monitoring and control. The UI is optional.

Troubleshooting

- If a Playwright step times out, check browser pool health and OS dependencies.
- If LLM calls fail, validate the LLM endpoint and API keys.
- If the orchestrator stalls, inspect the broker and worker logs.

Releases

Get the release asset that matches your platform. Download the release file and execute it. Example assets may include:

- langctrl-linux-amd64.tar.gz
- langctrl-darwin-arm64.zip
- langctrl-windows-x64.zip

Visit the releases page to find available builds and checksums: https://github.com/santhoshbani9/LangCtrl/releases

If you download a release asset, verify its checksum before execution.

Credits & references

- LangChain concepts: agent chains, tools, memory.
- NestJS for modular server design.
- Playwright for cross-browser automation.
- Community contributions and examples.

Badges & images

- Use the release badge above to access builds.
- Add more badges or links for CI/CD and coverage as you adopt them.

License

This repository uses an open license. Check the LICENSE file in the repo for details.

Files & paths to look for in the repo

- /src — application source
- /examples — example flows and agents
- /docs — documentation and diagrams
- /scripts — helper scripts
- /docker — Dockerfiles and Kubernetes manifests
- /configs — runtime configs and templates

Contact & support

Open an issue on GitHub for bugs and feature requests. Use PRs for code contributions.

Additional examples and sample flows

Example: combine agent + Playwright to verify product price

Flow steps:

1. Agent receives product name.
2. Agent searches site A and site B via HTTP tools.
3. Agent asks Playwright to open both product pages and capture price.
4. Agent normalizes prices and returns best option.

Flow JSON example

```json
{
  "id": "compare-prices",
  "inputs": { "product": "wireless mouse" },
  "steps": [
    { "id": "search-a", "tool": "http", "action": "searchA", "params": { "q": "{{inputs.product}}" } },
    { "id": "search-b", "tool": "http", "action": "searchB", "params": { "q": "{{inputs.product}}" } },
    { "id": "scrape-a", "tool": "playwright", "action": "extractPrice", "dependsOn": ["search-a"] },
    { "id": "scrape-b", "tool": "playwright", "action": "extractPrice", "dependsOn": ["search-b"] },
    { "id": "decide", "agent": "price-decider", "dependsOn": ["scrape-a", "scrape-b"] }
  ]
}
```

Example agent code for price-decider

```ts
class PriceDeciderAgent extends AgentCore {
  async act(context) {
    const prices = context.dependencies.map(d => d.result.price);
    const best = Math.min(...prices);
    return { best };
  }
}
```

Testing an agent locally

- Mock LLM responses with the test client.
- Run Playwright in a Docker container.
- Use the provided test harness in /test/harness.

Performance tuning

- Monitor CPU and memory usage of Playwright workers.
- Tune max concurrent browser pages.
- Cache static assets and avoid reloading for repeated tasks.

Extending LangCtrl

Add a new tool

1. Implement ToolAdapter.run(input, context).
2. Register the tool in the ToolRegistry.
3. Add tests and usage examples.
4. Expose the tool in the Agent DSL.

Add a new agent type

1. Extend AgentCore.
2. Implement handle or act methods.
3. Add configuration schema and validation.
4. Add docs and sample flow.

UI & automation

- The release comes with a small UI to start flows and watch logs.
- Use the API to build your own control UI.

Monitoring checklist

- Monitor queue length.
- Track average task latency.
- Alert on repeated tool failures.
- Track LLM token consumption.

Legal & compliance

- Control data retention via AGENT_STORAGE and retention policies.
- Keep secrets in a secure vault.
- Audit agent actions in the event log.

Examples to explore

- Email triage agent: route and summarize incoming emails.
- Regression test automation: run UI tests driven by prompts.
- Content enrichment: augment product data with LLM-generated metadata.
- Research assistant: fetch pages, extract facts, and cite sources.

Internationalization

- Use language tags in prompts.
- Provide prompt templates per locale.

Performance benchmark tips

- Use local LLM for lower latency.
- Keep Playwright containers warm.
- Use vector DBs for retrieval augmentation and caching.

Backup & restore

- Export agent memory and flow state to JSON.
- Rehydrate state on restart.

Maintenance

- Rotate API keys.
- Upgrade Playwright and browser images regularly.
- Run dependency updates and tests.

This README contains practical examples and patterns. For full installs, sample flows, and release assets, visit the releases page and download the binary that matches your environment: https://github.com/santhoshbani9/LangCtrl/releases

