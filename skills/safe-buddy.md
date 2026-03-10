# safe-buddy — Agent Skill

Track Safe multisig wallets across 20+ chains. View signers, pending signatures, transaction history, and watch for live activity — with a rich terminal UI.

## Setup

```bash
curl -sL https://raw.githubusercontent.com/publu/safe-buddy/master/safe_buddy.py -o /tmp/safe_buddy.py
```

## Quick Reference

| Command | What it does |
|---------|-------------|
| `safe <address>` | Overview — owners, threshold, nonce, token balances |
| `txs <address> [limit]` | Recent executed transactions |
| `pending <address>` | Pending txs waiting for signatures + visual signer status |
| `watch <address> [secs]` | Live poll for new transactions (default 15s) |
| `owners <address>` | Full owner list with complete addresses |
| `history <address>` | Full history — multisig + ETH transfers + module txs |
| `networks` | List all supported networks |

All commands accept `--network <name>` or `-n <name>` (default: `mainnet`).

## Usage

### Check pending signatures
```bash
python3 /tmp/safe_buddy.py pending 0xYourSafe --network base
```
Shows each pending tx with:
- Type, destination, value, submission time
- Visual signature bar: `▓▓░░░ 2/3`
- Which addresses have signed and when
- How many more signatures needed

### Safe overview
```bash
python3 /tmp/safe_buddy.py safe 0xYourSafe --network arbitrum
```
Shows:
- All owner addresses, threshold, current nonce
- Token balances with USD values

### Watch for live activity
```bash
python3 /tmp/safe_buddy.py watch 0xYourSafe 30 --network mainnet
```
Polls every 30 seconds and prints when new transactions appear or signatures are added. Press Ctrl+C to stop.

### Recent transactions
```bash
python3 /tmp/safe_buddy.py txs 0xYourSafe 20 --network optimism
```

### Full history
```bash
python3 /tmp/safe_buddy.py history 0xYourSafe --network polygon
```
Includes incoming ETH transfers and module executions — not just multisig txs.

## Supported Networks

`mainnet`, `base`, `arbitrum`, `optimism`, `polygon`, `gnosis`, `avalanche`, `bsc`, `zksync`, `scroll`, `linea`, `blast`, `berachain`, `sepolia`

Aliases: `eth`, `arb`, `op`, `matic`, `xdai`, `avax`, `bnb`

## Data Sources

All data from the [Safe Transaction Service API](https://docs.safe.global/core-api/api-safe-transaction-service) — no API keys required, no wallet needed.

## Requirements

Python 3.6+ — zero external dependencies.
