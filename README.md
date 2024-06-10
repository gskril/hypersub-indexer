# Subscription Token Protocol (STP) Indexer

[Ponder](https://ponder.sh/) indexer for [STP](https://docs.withfabric.xyz/stp/overview), the protocol behind [Hypersub](https://hypersub.withfabric.xyz/).

## Example queries

Get all collections:

```graphql
{
  collections(limit: 1000, orderBy: "createdAt", orderDirection: "desc") {
    items {
      id
      name
      symbol
      chainId
      totalRewardPoints
      totalCreatorEarnings
      totalReferrerRewards
    }
  }
}
```

Get all subscriptions for a given address:

```graphql
{
  subscriptions(
    where: {
      account: "0xb6f6Dce6000cA88cC936B450cEDB16a5c15f157f"
      expiresAt_gt: "1717995000" # timestamp as of this query
    }
  ) {
    items {
      expiresAt
      createdAt
      collection {
        id
        name
        symbol
        chainId
        totalRewardPoints
        totalCreatorEarnings
        totalReferrerRewards
      }
    }
  }
}
```

Learn more about querying the GraphQL API in [Ponder's docs](https://ponder.sh/docs/query/graphql).

## Deploy your own

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/rrJPzB?referralCode=ONtqGs)

Read more in [Ponder's docs](https://ponder.sh/docs/production/deploy).

## Run locally

Install dependencies:

```bash
pnpm install
```

Set your environment variables (RPC URLs):

```bash
cp .env.example .env.local
```

Run the indexer:

```bash
pnpm dev
```
