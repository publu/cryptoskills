# Hyperliquid Sentinel

Monitor Hyperliquid perpetual positions, spot balances, funding rates, and market data.

## Usage

When the user asks about Hyperliquid positions, funding rates, market data, or spot balances, use this skill.

### Commands

- **Check perp position**: "check my hyperliquid position for 0x..."
- **Spot balances**: "what are my spot balances on hyperliquid?"
- **Top markets**: "show me hyperliquid markets"
- **Funding rates**: "what are the funding rates on hyperliquid?"

## How It Works

### Hyperliquid Info API

All data comes from the Hyperliquid REST API. No API key required.

**Base URL:** `https://api.hyperliquid.xyz/info`
**Method:** POST
**Content-Type:** application/json

### Key Endpoints

**Perp positions (clearinghouseState):**
```bash
curl -s -X POST https://api.hyperliquid.xyz/info \
  -H "Content-Type: application/json" \
  -d '{"type": "clearinghouseState", "user": "<ADDRESS>"}'
```

Response includes `marginSummary` (accountValue, totalMarginUsed, totalNtlPos) and `assetPositions` array with per-coin position details (szi, entryPx, positionValue, unrealizedPnl, leverage).

**Spot balances (spotClearinghouseState):**
```bash
curl -s -X POST https://api.hyperliquid.xyz/info \
  -H "Content-Type: application/json" \
  -d '{"type": "spotClearinghouseState", "user": "<ADDRESS>"}'
```

Response includes `balances` array with coin, total, and hold amounts.

**Market data + asset contexts (metaAndAssetCtxs):**
```bash
curl -s -X POST https://api.hyperliquid.xyz/info \
  -H "Content-Type: application/json" \
  -d '{"type": "metaAndAssetCtxs"}'
```

Returns `[meta, assetCtxs]`. Meta has `universe` array (coin names, szDecimals). AssetCtxs has markPx, openInterest, dayNtlVlm, funding per coin.

**All mid prices (allMids):**
```bash
curl -s -X POST https://api.hyperliquid.xyz/info \
  -H "Content-Type: application/json" \
  -d '{"type": "allMids"}'
```

**User fills (userFills):**
```bash
curl -s -X POST https://api.hyperliquid.xyz/info \
  -H "Content-Type: application/json" \
  -d '{"type": "userFills", "user": "<ADDRESS>"}'
```

**Open orders (openOrders):**
```bash
curl -s -X POST https://api.hyperliquid.xyz/info \
  -H "Content-Type: application/json" \
  -d '{"type": "openOrders", "user": "<ADDRESS>"}'
```

### Response Decoding

#### clearinghouseState

| Field | Description |
|-------|-------------|
| marginSummary.accountValue | Total account value in USD |
| marginSummary.totalMarginUsed | Margin currently in use |
| marginSummary.totalNtlPos | Total notional position value |
| assetPositions[].position.coin | Coin symbol (BTC, ETH, etc.) |
| assetPositions[].position.szi | Signed size (positive = long, negative = short) |
| assetPositions[].position.entryPx | Entry price |
| assetPositions[].position.positionValue | Current position value in USD |
| assetPositions[].position.unrealizedPnl | Unrealized P&L in USD |
| assetPositions[].position.leverage | Leverage info (type + value) |

#### metaAndAssetCtxs

| Field | Description |
|-------|-------------|
| funding | Current hourly funding rate (multiply by 8760 for annualized) |
| openInterest | Open interest in coin units (multiply by markPx for USD) |
| dayNtlVlm | 24h notional volume in USD |
| markPx | Current mark price |

### Output Format

When reporting positions:
```
=== Hyperliquid — Perpetuals ===

  Account Value:  $12,345.67
  Margin Used:    $4,567.89
  Margin Usage:   37.0%

  COIN       SIDE         SIZE        ENTRY         MARK         uPnL LEVERAGE
  ──────────────────────────────────────────────────────────────────────────
  BTC        LONG       0.1500   62000.0000   65477.0000     +$521.55      10x
  ETH        SHORT      5.0000    2100.0000    1909.3000     +$953.50       5x

  Total uPnL: +$1,475.05
```

When reporting spot:
```
=== Hyperliquid — Spot Balances ===

  TOKEN             TOTAL      AVAILABLE      IN ORDERS
  ────────────────────────────────────────────────────
  USDC           5000.0000      4500.0000       500.0000
  HYPE            200.0000       200.0000         0.0000
```

### Links

- App: https://app.hyperliquid.xyz
- Docs: https://hyperliquid.gitbook.io/hyperliquid-docs
- API: https://api.hyperliquid.xyz/info
