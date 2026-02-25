# Polymarket Skill

Browse Polymarket prediction markets, check prices, order books, positions, and trade — all via the Polymarket CLI.

## Usage

When the user asks about prediction markets, Polymarket events, odds, positions, or wants to trade on Polymarket, use this skill.

### Commands

- **Browse markets**: "show me polymarket markets"
- **Search markets**: "find polymarket markets about AI"
- **Check price**: "what's the price on the election market?"
- **View positions**: "check my polymarket positions"
- **Place order**: "buy 100 shares of Yes on market X"

## Prerequisites

The `polymarket` CLI must be installed. Install via:

```bash
curl -sSL https://raw.githubusercontent.com/Polymarket/polymarket-cli/main/install.sh | sh
```

Or with Homebrew:
```bash
brew tap Polymarket/polymarket-cli https://github.com/Polymarket/polymarket-cli
brew install polymarket
```

## CLI Reference

All commands use `polymarket` as the base command. Add `-o json` for machine-readable output.

### Markets & Events (No wallet needed)

**List markets:**
```bash
polymarket markets list --limit 10
```

**Search markets:**
```bash
polymarket markets search "AI"
```

**Get specific market:**
```bash
polymarket markets get <CONDITION_ID>
```

**List events:**
```bash
polymarket events list --limit 10
```

**List tags:**
```bash
polymarket tags list
```

### Pricing & Order Book (No wallet needed)

**Get price:**
```bash
polymarket clob price <TOKEN_ID>
```

**View order book:**
```bash
polymarket clob book <TOKEN_ID>
```

**Check midpoint:**
```bash
polymarket clob midpoint <TOKEN_ID>
```

**Check spread:**
```bash
polymarket clob spread <TOKEN_ID>
```

**Price history:**
```bash
polymarket clob price-history <TOKEN_ID>
```

### Portfolio & Positions (Requires wallet)

**View positions:**
```bash
polymarket data positions <ADDRESS>
```

**Portfolio value:**
```bash
polymarket data value <ADDRESS>
```

**Check balance:**
```bash
polymarket clob balance
```

**View your orders:**
```bash
polymarket clob orders
```

**Trade history:**
```bash
polymarket clob trades
```

**Leaderboard:**
```bash
polymarket data leaderboard
```

### Trading (Requires wallet)

**Place limit order:**
```bash
polymarket clob create-order <TOKEN_ID> --side <BUY|SELL> --size <AMOUNT> --price <PRICE>
```

**Place market order:**
```bash
polymarket clob market-order <TOKEN_ID> --side <BUY|SELL> --amount <USDC_AMOUNT>
```

**Cancel order:**
```bash
polymarket clob cancel <ORDER_ID>
```

### On-Chain Operations (Requires wallet)

**Approve contracts:**
```bash
polymarket approve set
```

**Split USDC into conditional tokens:**
```bash
polymarket ctf split <CONDITION_ID> --amount <USDC>
```

**Merge tokens back to USDC:**
```bash
polymarket ctf merge <CONDITION_ID> --amount <AMOUNT>
```

**Redeem winnings:**
```bash
polymarket ctf redeem <CONDITION_ID>
```

### Wallet Management

**Create wallet:**
```bash
polymarket wallet create
```

**Import existing key:**
```bash
polymarket wallet import
```

## Output Formats

All commands support two output modes:
- `--output table` (default) — human-readable tables
- `--output json` or `-o json` — machine-readable JSON

Always use `-o json` when you need to parse the output programmatically.

## Tips

- No wallet is needed to browse markets, check prices, or view order books
- A wallet (private key) is only required for trading and on-chain operations
- Use `markets search` to find markets by keyword before getting details
- Use `-o json` and parse the output when building workflows or comparing markets
- Positions can be checked for any address without wallet auth

## Links

- App: https://polymarket.com
- CLI: https://github.com/Polymarket/polymarket-cli
- Docs: https://docs.polymarket.com
