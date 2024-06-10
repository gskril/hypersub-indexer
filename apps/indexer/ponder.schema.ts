import { createSchema } from '@ponder/core'

export default createSchema((p) => ({
  Collection: p.createTable({
    id: p.hex(),
    chainId: p.int(),
    name: p.string(),
    symbol: p.string(),
    erc20Address: p.hex(),
    contractURI: p.string(),
    totalRewardPoints: p.bigint(),
    totalCreatorEarnings: p.bigint(),
    totalReferrerRewards: p.bigint(),
    image: p.string().optional(),
    externalLink: p.string().optional(),
    description: p.string().optional(),
    subscriptions: p.many('Subscription.collectionId'),
    purchaseEvents: p.many('PurchaseEvent.collectionId'),
    grantEvents: p.many('GrantEvent.collectionId'),
    createdAt: p.bigint(),
  }),

  Subscription: p.createTable({
    id: p.string(), // collectionId:account
    account: p.hex(),
    tokenId: p.bigint(),
    purchaseEvents: p.many('PurchaseEvent.subscriptionId'),
    grantEvents: p.many('GrantEvent.subscriptionId'),
    collectionId: p.hex().references('Collection.id'),
    collection: p.one('collectionId'),
    expiresAt: p.bigint(),
    createdAt: p.bigint(),
  }),

  PurchaseEvent: p.createTable({
    id: p.string(),
    chainId: p.int(),
    subscriptionId: p.string().references('Subscription.id'),
    subscription: p.one('subscriptionId'),
    collectionId: p.hex().references('Collection.id'),
    collection: p.one('collectionId'),
    account: p.hex(),
    tokenId: p.bigint(),
    tokensTransferred: p.bigint(),
    timePurchased: p.bigint(),
    rewardPoints: p.bigint(),
    expiresAt: p.bigint(),
    timestamp: p.bigint(),
  }),

  GrantEvent: p.createTable({
    id: p.string(),
    chainId: p.int(),
    subscriptionId: p.string().references('Subscription.id'),
    subscription: p.one('subscriptionId'),
    collectionId: p.hex().references('Collection.id'),
    collection: p.one('collectionId'),
    account: p.hex(),
    tokenId: p.bigint(),
    secondsGranted: p.bigint(),
    expiresAt: p.bigint(),
    timestamp: p.bigint(),
  }),
}))
