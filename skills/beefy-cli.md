# Beefy CLI — Agent Skill

Browse Beefy Finance vaults across 35+ chains. Check APYs, TVL, fees, search by token, and get protocol stats — with rich terminal UI.

## Setup

```bash
curl -sL https://raw.githubusercontent.com/publu/beefy-cli/master/beefy_check.py -o /tmp/beefy_check.py
```

## Quick Reference

| Command | What it does |
|---------|-------------|
| `vault <id>` | Detailed vault info — APY breakdown, fees, TVL, risk, contracts |
| `vaults <chain>` | List all active vaults on a chain with APY and TVL |
| `top [n] [chain]` | Top N vaults by APY (default 10, filters >$1k TVL) |
| `search <token> [chain]` | Find vaults by token name, platform, or ID |
| `stats [chain]` | Protocol overview: total TVL, vault count, chains, best APY |
| `chains` | List all supported chains with vault counts |

## Usage

### Look up a specific vault
```bash
python3 /tmp/beefy_check.py vault morpho-base-steakhouse-high-yield-usdc
```
Shows rich box UI with:
- Chain, token, platform, strategy type
- APY breakdown (base yield, lending/trading, liquid staking)
- Autocompound frequency
- Curator, Beefy fee, risk level
- Contract addresses (vault, strategy, token)

### Browse vaults on a chain
```bash
python3 /tmp/beefy_check.py vaults base
python3 /tmp/beefy_check.py vaults ethereum
python3 /tmp/beefy_check.py vaults sonic
```

### Find best yields
```bash
python3 /tmp/beefy_check.py top 10           # top 10 across all chains
python3 /tmp/beefy_check.py top 5 base       # top 5 on Base
python3 /tmp/beefy_check.py top 20 arbitrum  # top 20 on Arbitrum
```

### Search for vaults by token
```bash
python3 /tmp/beefy_check.py search USDC          # all USDC vaults
python3 /tmp/beefy_check.py search ETH base      # ETH vaults on Base
python3 /tmp/beefy_check.py search morpho         # all Morpho vaults
```

### Protocol stats
```bash
python3 /tmp/beefy_check.py stats           # global stats
python3 /tmp/beefy_check.py stats base      # Base chain stats
```

### List chains
```bash
python3 /tmp/beefy_check.py chains
```

## Example Output

### vault
```
  ┌── morpho-base-steakhouse-high-yield-usdc ──────────┐
  │                                                     │
  │ Chain:           Base (8453)                         │
  │ Token:           USDC                                │
  │ Platform:        Morpho                              │
  │ TVL:             $156,432                            │
  │ Status:          ● Active                            │
  │                                                     │
  ├─────────────────────────────────────────────────────┤
  │                                                     │
  │ APY BREAKDOWN                                       │
  │                                                     │
  │ └─ Lending/trading:                        3.58%    │
  │                                                     │
  │ Compounds:       2190/yr (~6.0/day)                 │
  │ Total APY:       3.58%                              │
  │                                                     │
  ├─────────────────────────────────────────────────────┤
  │                                                     │
  │ Curator:         Steakhouse                         │
  │ Beefy fee:       9.50%                              │
  │ Risk:            ▓▓▓▓▓░░░ Medium                    │
  │                                                     │
  └─────────────────────────────────────────────────────┘
```

### top
```
  # Vault                          Chain      APY           TVL
  ─────────────────────────────────────────────────────────────────
  1 aerodrome-weth-usdc            base      19.02%    $319,599
  2 aerodrome-usdc-aero            base      18.48%    $679,483
  3 morpho-ionic-usdc              base       3.94%    $1.44M
```

## Data Sources

- **Vaults/metadata:** Beefy Finance API (`/vaults/{chain}`)
- **APY breakdown:** Beefy Finance API (`/apy/breakdown`)
- **TVL:** Beefy Finance API (`/tvl`)
- **Fees:** Beefy Finance API (`/fees`)

## Notes

- No API keys or wallet needed — fully read-only
- 35+ chains supported (Base, Ethereum, Arbitrum, Optimism, Sonic, Monad, etc.)
- APY data updates every few minutes as harvests occur
- Rich terminal UI with ANSI colors and box-drawing characters
- Vault IDs use the format: `protocol-chain-token` (e.g. `morpho-base-steakhouse-high-yield-usdc`)
- Search is case-insensitive and matches vault ID, token, name, and platform
