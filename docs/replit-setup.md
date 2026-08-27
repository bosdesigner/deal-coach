# Running this on Replit

## First run

1. **Import the repo.** Replit → Create → Import from GitHub →
   `bosdesigner/deal-coach`. It's a private repo, so connect your GitHub
   account first.
2. **Add the API key.** Open the **Secrets** pane (lock icon) and add:

   | Key | Value |
   |---|---|
   | `ANTHROPIC_API_KEY` | your key from [console.anthropic.com](https://console.anthropic.com/settings/keys) |

   Use Secrets, **not** a `.env` file — anyone you invite to the Repl can read
   files, and a committed key is a leaked key.
3. **Press Run.** `npm run dev` starts both processes. First boot installs
   dependencies and takes a minute.

Check it came up clean — the console should read:

```
[deal-coach] api on :3001 · model claude-opus-5 · key set
```

`key MISSING` means the secret didn't land. Stop and re-run after adding it;
Secrets are injected at process start, not hot-reloaded.

## How the two processes fit together

In **dev**, two processes run side by side:

- **Vite** on `5173` — serves the UI with hot reload. This is the port Replit
  exposes on port 80.
- **Express** on `3001` — the API. Not exposed. Vite proxies `/api/*` to it.

In **deployment**, there is only **one** process: `npm run build` compiles the
client to `dist/`, then `npm start` runs Express on Replit's `PORT`, serving
both the built UI and `/api`. No Vite, no proxy.

This is why `vite.config.js` deliberately does *not* read `process.env.PORT` —
that variable belongs to the deployed Express process.

## Deploying

Use **Autoscale**. The build and run commands are already in `.replit`. Set
`ANTHROPIC_API_KEY` again in the **deployment's** secrets — workspace secrets
do not carry over automatically.

Keep the deployment private while the licence is unsigned. See
`docs/rights-and-guardrails.md`.

## Troubleshooting

| Symptom | Cause |
|---|---|
| `key MISSING` in the console | Secret not set, or set after the process started. Re-run. |
| "The advisor's API credentials were rejected" | Key is set but invalid or revoked. |
| Replies arrive all at once instead of streaming | Something is buffering the SSE response. Check that nothing was added in front of Express. |
| `npm install` fails on a package URL | This repo's lockfile uses the public npm registry. If Replit's package firewall rewrote it, delete `package-lock.json` and reinstall. |
| Port already in use on Run | A previous process survived. Stop the Repl and start it again. |
| Publish fails: "built successfully but failed to start" | The app bound a port Replit wasn't health-checking. In production `PORT` is assigned by Replit and must win — do not add an `API_PORT` to `.replit`'s `[env]` or to deployment secrets. The boot log names the port it chose. |
