# Conway Terminal — Agent Skill

Sovereign compute for AI agents. Spin up cloud VMs, register domains, run inference, and handle payments — all through MCP tools, paid with USDC on Base.

## Setup

### One-line install (recommended)
```bash
curl -fsSL https://conway.tech/terminal.sh | sh
```
This auto-generates a wallet, provisions an API key, and configures Claude Code.

### Manual install
```bash
npm install -g conway-terminal
claude mcp add conway conway-terminal -e CONWAY_API_KEY=cnwy_k_...
```

Your API key is stored in `~/.conway/config.json` after setup.

## Quick Reference

| Tool | What it does |
|------|-------------|
| `sandbox_create` | Spin up a Linux VM (configurable vCPU, memory, disk, region) |
| `sandbox_exec` | Run shell commands in a sandbox |
| `sandbox_write_file` | Write files to a sandbox |
| `sandbox_read_file` | Read files from a sandbox |
| `sandbox_expose_port` | Get a public URL for a sandbox port |
| `sandbox_list` | List all your sandboxes |
| `sandbox_delete` | Delete a sandbox |
| `domain_search` | Search for available domains with pricing |
| `domain_register` | Register a domain (paid with USDC) |
| `domain_dns_add` | Add DNS records to a domain |
| `domain_dns_list` | List DNS records |
| `chat_completions` | Run inference on frontier models (Claude, GPT, Kimi) |
| `credits_balance` | Check your USDC credit balance |
| `wallet_info` | Get x402 payment wallet details |

## Usage

### Spin up a VM and deploy something
```
> Create a sandbox, install nginx, and expose port 80
```
The agent will call `sandbox_create`, then `sandbox_exec` to install nginx, then `sandbox_expose_port` to get a public URL.

### Register a domain and point it somewhere
```
> Search for available .ai domains with "agent" in the name, register the best one, and point it to my sandbox
```
Uses `domain_search`, `domain_register` (pays USDC automatically via x402), and `domain_dns_add`.

### Run inference
```
> Use chat_completions to ask Claude Opus a question
```
Bills from your Conway credits.

### Check your balance
```
> What's my Conway credits balance?
```
Calls `credits_balance`.

## How Payments Work

Conway uses the **x402 protocol** for machine-to-machine payments:
1. Agent requests a paid resource (VM, domain, inference)
2. API returns HTTP 402 with the price
3. Terminal signs a USDC transfer on Base automatically
4. Payment is verified on-chain via openx402.ai

No human approval needed — the agent's wallet handles it.

## Data & Config

- **Wallet:** `~/.conway/wallet.json` (auto-generated EVM keypair)
- **Config:** `~/.conway/config.json` (API key)
- **API:** `https://api.conway.tech`
- **Payments:** USDC on Base via x402

## Notes

- The agent gets its own cryptographic identity (EVM wallet) on first run
- All actions are signed stablecoin transactions — fully autonomous
- Sandbox VMs are full Linux environments with root access
- PTY tools available for interactive terminal sessions (`sandbox_pty_create`, `sandbox_pty_write`, `sandbox_pty_read`)
- Domain registration includes WHOIS privacy by default
- Works with Claude Code, Claude Desktop, Cursor, and any MCP-compatible client
