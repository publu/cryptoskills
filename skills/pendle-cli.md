# Pendle CLI — Agent Skill

Browse Pendle Finance yield trading markets across 10 chains. Implied APYs, TVL, PT/YT supply, expiry tracking, and protocol stats — with rich terminal UI.

## Setup

```bash
curl -sL https://raw.githubusercontent.com/publu/pendle-cli/master/pendle_check.py -o /tmp/pendle_check.py
```

## Quick Reference

| Command | What it does |
|---------|-------------|
| `markets [chain]` | List active markets sorted by TVL, with ★ for Prime markets |
| `market <name>` | Detailed market info — APY breakdown, supply, yield range, contracts |
| `top [n] [chain]` | Top N markets by implied APY (default 10, filters >$1k TVL) |
| `search <token> [chain]` | Find markets by token name |
| `stats [chain]` | Protocol overview: total TVL, volume, market count, best APY, top chains |
| `chains` | List supported chains with market counts and TVL |

## Usage

### Browse active markets
```bash
python3 /tmp/pendle_check.py markets
python3 /tmp/pendle_check.py markets ethereum
python3 /tmp/pendle_check.py markets arbitrum
```

### Detailed market view
```bash
python3 /tmp/pendle_check.py market wstETH
python3 /tmp/pendle_check.py market sUSDe ethereum
```
Shows rich box UI with:
- Chain, expiry date, days remaining, active/expired status
- TVL, liquidity, 24h volume, swap fee rate
- APY breakdown (underlying yield, swap fees, PENDLE incentives)
- Implied APY, aggregated APY, max boosted APY (with vePENDLE)
- Yield range (min → max)
- PT/YT/SY supply breakdown
- Contract addresses (market, PT, YT, SY)

### Find best yields
```bash
python3 /tmp/pendle_check.py top 10           # top 10 across all chains
python3 /tmp/pendle_check.py top 5 base       # top 5 on Base
python3 /tmp/pendle_check.py top 20 ethereum   # top 20 on Ethereum
```

### Search for markets by token
```bash
python3 /tmp/pendle_check.py search usdc          # all USDC markets
python3 /tmp/pendle_check.py search eth ethereum   # ETH markets on Ethereum
python3 /tmp/pendle_check.py search sUSDe          # all sUSDe markets
```

### Protocol stats
```bash
python3 /tmp/pendle_check.py stats           # global stats
python3 /tmp/pendle_check.py stats ethereum  # Ethereum stats
```

### List chains
```bash
python3 /tmp/pendle_check.py chains
```

## Example Output

### stats
```
  ┌── Protocol Stats ──────────────────────────────────────┐
  │                                                        │
  │ Total TVL:        $2.06B                               │
  │ 24h Volume:       $20.24M                              │
  │ Active markets:   125                                  │
  │ Expired markets:  550                                  │
  │ Prime markets:    10                                   │
  │ Chains:           6                                    │
  │                                                        │
  ├────────────────────────────────────────────────────────┤
  │                                                        │
  │ Avg Implied APY:  6.48%                                │
  │ Best APY: 36.41% (sKAITO on base)                     │
  │ Largest:  $681.98M (sUSDe on swell)                   │
  │                                                        │
  ├────────────────────────────────────────────────────────┤
  │                                                        │
  │ TOP CHAINS BY TVL                                      │
  │                                                        │
  │ Ethereum:         $987.84M                             │
  │ Swell:            $884.59M                             │
  │ Arbitrum:         $80.68M                              │
  │ Hyperliquid:      $74.44M                              │
  │ Bsc:              $19.64M                              │
  │ Base:             $16.43M                              │
  │                                                        │
  └────────────────────────────────────────────────────────┘
```

### market
```
  ┌── wstETH on Ethereum ──────────────────────────────────────┐
  │                                                            │
  │ Chain:            Ethereum (1)                              │
  │ Expiry:           Dec 30, 2027 (672d)                      │
  │ Status:           ● Active                                 │
  │ Categories:       eth                                      │
  │                                                            │
  │ TVL:              $2.47M                                   │
  │ Liquidity:        $2.25M                                   │
  │ 24h Volume:       $0.00                                    │
  │ Swap Fee:         0.05%                                    │
  │                                                            │
  ├────────────────────────────────────────────────────────────┤
  │                                                            │
  │ APY BREAKDOWN                                              │
  │                                                            │
  │ ├─ Underlying yield:                             2.36%     │
  │ ├─ Swap fees:                                    0.00%     │
  │ └─ PENDLE incentives:                            0.66%     │
  │                                                            │
  │ Implied APY:      2.38%                                    │
  │ Aggregated APY:   3.03%                                    │
  │ Max Boosted:      4.01%                                    │
  │ Yield Range:      3.00% → 7.25%                            │
  │                                                            │
  ├────────────────────────────────────────────────────────────┤
  │                                                            │
  │ SUPPLY                                                     │
  │                                                            │
  │ Total PT:         88.89                                    │
  │ Total SY:         842.54                                   │
  │ LP Supply:        510.53                                   │
  │                                                            │
  └────────────────────────────────────────────────────────────┘
```

### top
```
  # Market                     Chain      Expiry       Impl APY           TVL
  ────────────────────────────────────────────────────────────────────────────
  1 sKAITO ★                   base       Apr 09, 2026  36.41%       $2.26M
  2 SolvBTC (SatLayer)         ethereum   Mar 26, 2026  24.60%       $2.48M
  3 sENA                       ethereum   Apr 30, 2026  13.10%       $7.18M
```

## Data Sources

- **Markets/APYs/TVL:** Pendle Finance API (`/v1/markets/all`)
- **Chains:** Pendle Finance API (`/v1/chains`)

## Notes

- No API keys or wallet needed — fully read-only
- 10 chains supported (Ethereum, Arbitrum, Base, BSC, Mantle, Swell, Sonic, Hyperliquid, Optimism, Berachain)
- ★ marks Pendle Prime markets (curated, higher confidence)
- Implied APY = market consensus of future yield (derived from PT/YT prices)
- Max Boosted APY requires vePENDLE staking
- Markets have expiry dates — orange highlighting when <30 days to expiry
- Rich terminal UI with ANSI colors and box-drawing characters
- Search is case-insensitive and matches token name and categories
