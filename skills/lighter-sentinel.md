# Lighter Sentinel

Browse Lighter perpetual markets, check positions, funding rates, and exchange stats. Zero-fee perp DEX.

## Usage

When the user asks about Lighter markets, positions, funding rates, or trading data, use this skill.

### Commands

- **Browse markets**: "show me lighter markets"
- **Check position**: "check my lighter position for 0x..."
- **Funding rates**: "what are the funding rates on lighter?"
- **Exchange stats**: "show me lighter stats"

## How It Works

### Lighter API

All data comes from the Lighter REST API. No API key required for read-only queries.

**Base URL:** `https://mainnet.zklighter.elliot.ai/api/v1`

### Key Endpoints

**Markets + volume (exchangeStats):**
```bash
curl -s https://mainnet.zklighter.elliot.ai/api/v1/exchangeStats
```

Returns `order_book_stats` array with per-market: `symbol`, `last_trade_price`, `daily_trades_count`, `daily_base_token_volume`, `daily_quote_token_volume`, `daily_price_change`.

**Market metadata (orderBooks):**
```bash
curl -s https://mainnet.zklighter.elliot.ai/api/v1/orderBooks
```

Returns `order_books` array with `symbol`, `market_id`, `market_type`, `taker_fee`, `maker_fee`, `min_base_amount`, size/price decimal precision.

**Account + positions:**
```bash
curl -s "https://mainnet.zklighter.elliot.ai/api/v1/account?by=l1_address&value=<ADDRESS>"
```

IMPORTANT: Address must be checksummed (mixed-case EIP-55), not lowercased.

Returns `accounts` array. Each account has:
- `account_index`, `collateral`, `available_balance`, `total_asset_value`
- `positions[]` with `symbol`, `position`, `sign` (1=long, -1=short), `avg_entry_price`, `unrealized_pnl`, `realized_pnl`, `liquidation_price`, `initial_margin_fraction`
- `assets[]` for spot balances

Can also query by index:
```bash
curl -s "https://mainnet.zklighter.elliot.ai/api/v1/account?by=index&value=<ACCOUNT_INDEX>"
```

**Funding rates:**
```bash
curl -s https://mainnet.zklighter.elliot.ai/api/v1/funding-rates
```

Returns `funding_rates` array with `market_id`, `symbol`, `exchange` (source), `rate`.

**Recent trades:**
```bash
curl -s "https://mainnet.zklighter.elliot.ai/api/v1/recentTrades?order_book_id=<MARKET_ID>"
```

**Candles:**
```bash
curl -s "https://mainnet.zklighter.elliot.ai/api/v1/candles?order_book_id=<MARKET_ID>&resolution=1h"
```

**Active orders:**
```bash
curl -s "https://mainnet.zklighter.elliot.ai/api/v1/accountActiveOrders?by=index&value=<ACCOUNT_INDEX>"
```

**PnL history:**
```bash
curl -s "https://mainnet.zklighter.elliot.ai/api/v1/pnl?by=index&value=<ACCOUNT_INDEX>"
```

**Liquidations:**
```bash
curl -s "https://mainnet.zklighter.elliot.ai/api/v1/liquidations?by=index&value=<ACCOUNT_INDEX>"
```

### Output Format

When listing markets:
```
LIGHTER — Top Markets by 24h Volume

  MARKET              PRICE        24h VOL    24h CHG    FUNDING
  ──────────────────────────────────────────────────────────────
  BTC          65,520.2000          $1.9B     +3.60%   +0.0096%
  ETH           1,909.3900        $653.4M     +4.65%   +0.0072%
  SOL              82.5060        $130.4M     +7.54%   +0.0088%
```

When showing positions:
```
=== Lighter — Account #42 ===

  Collateral:      $10,000.00
  Available:       $6,500.00
  Total Value:     $10,250.00
  Unrealized PnL:  +$250.00

  MARKET       SIDE         SIZE        ENTRY         uPnL          LIQ
  ────────────────────────────────────────────────────────────────────
  ETH          LONG       5.0000   1,850.0000     +$296.95   1,650.0000
  BTC          SHORT      0.1000  66,000.0000      -$48.02  72,500.0000
```

### Notes

- Lighter is a zero-fee perpetual DEX
- All fees are `0.0000` (taker and maker)
- Address lookup requires EIP-55 checksummed format (mixed case) — do not lowercase
- Funding rates come from multiple sources (lighter, binance, bybit, hyperliquid)
- Markets include crypto perps, forex pairs (EURUSD, USDJPY), commodities (XAU, XAG), and equities (TSLA, NVDA, SPY)

### Links

- App: https://lighter.xyz
- Docs: https://docs.lighter.xyz
- API Docs: https://apidocs.lighter.xyz
- API: https://mainnet.zklighter.elliot.ai/api/v1
