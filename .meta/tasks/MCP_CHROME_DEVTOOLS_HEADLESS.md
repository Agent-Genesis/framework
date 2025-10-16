# Mission: Run chrome-devtools MCP Server Headless

Problem

- The chrome-devtools MCP server fails to launch Chrome in this environment with the error: “Missing X server to start the headful browser.”
- Root cause: the server tries to start a headful Chrome without a display (no X/Wayland).

Canonical Fix (per official docs)

- Use the built-in `--headless=true` flag on `chrome-devtools-mcp`.
- Source: Chrome DevTools MCP README (ChromeDevTools/chrome-devtools-mcp) — the server supports `--headless` as a config option and recommends passing it via `args`.

What to change

- Update the MCP client configuration for the `chrome-devtools` server to include `--headless=true`.
- Do not rely on `CHROME_HEADLESS=true`; the official server exposes a `--headless` CLI flag instead.

Configuration examples

1. Generic JSON MCP config

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["chrome-devtools-mcp@latest", "--headless=true", "--isolated=true"]
    }
  }
}
```

2. Codex CLI (recommended)

- Add or update via CLI (replaces/creates the server entry):

```
codex mcp add chrome-devtools -- npx -y chrome-devtools-mcp@latest --headless=true --isolated=true
```

- If using TOML config (`.codex/config.toml`), ensure the server entry includes the args above.

3. Claude Code CLI

```
claude mcp add chrome-devtools npx chrome-devtools-mcp@latest -- --headless=true --isolated=true
```

4. VS Code / Copilot

- Use their MCP add flow and include the args:

```
code --add-mcp '{"name":"chrome-devtools","command":"npx","args":["chrome-devtools-mcp@latest","--headless=true","--isolated=true"]}'
```

5. Amp / Cursor / Others

- Wherever the server is declared, add `--headless=true` to the `args` list for `chrome-devtools-mcp@latest`.

Alternative (if sandbox blocks launching Chrome)

- Connect to a running Chrome via DevTools protocol:

1. Start Chrome manually with a temporary profile and remote debugging port:
   - Linux

   ```bash
   /usr/bin/google-chrome --remote-debugging-port=9222 --user-data-dir=/tmp/chrome-profile-stable
   ```

   - macOS

   ```bash
   /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
     --remote-debugging-port=9222 \
     --user-data-dir=/tmp/chrome-profile-stable
   ```

   - Windows

   ```powershell
   "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" \
     --remote-debugging-port=9222 \
     --user-data-dir="%TEMP%\\chrome-profile-stable"
   ```

2. Point the MCP server to it:

```
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": [
        "chrome-devtools-mcp@latest",
        "--browser-url=http://127.0.0.1:9222"
      ]
    }
  }
}
```

Optional helpers

- Logging: set `DEBUG=*` and/or pass `--logFile=/path/to/devtools.log` in args when diagnosing.
- Isolated profile: keep `--isolated=true` to avoid reusing a shared profile between runs.

Validation Steps

1. Restart the MCP client so the new server args take effect.
2. From the client, run a simple Chrome DevTools MCP action like:
   - “Check the performance of https://developers.chrome.com”
   - Or open a page: tool `new_page` to `http://localhost:8000/public/` and verify it loads.
3. Ensure no headful/X server error appears and the tools respond.

Notes about this repo’s local server

- Use `make serve` (runs `python3 -m http.server 8000 --directory public`) to serve the built assets. Visiting `http://localhost:8000/` lists the workspace root; open `http://localhost:8000/public/` to load the app.
- If you change anything under `src/`, run `make build` to refresh `public/` before testing.
