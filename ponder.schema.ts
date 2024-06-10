import { createSchema } from '@ponder/core'

export default createSchema((p) => ({
  Collection: p.createTable({
    id: p.hex(),
    chainId: p.int(),
    name: p.string(),
    symbol: p.string(),
    contractURI: p.string(),
    totalRewardPoints: p.bigint(),
    totalCreatorEarnings: p.bigint(),
    totalReferrerRewards: p.bigint(),
    image: p.string().optional(),
    externalLink: p.string().optional(),
    description: p.string().optional(),
    memberships: p.many('Membership.collectionId'),
    purchaseEvents: p.many('PurchaseEvent.collectionId'),
    grantEvents: p.many('GrantEvent.collectionId'),
  }),

  Membership: p.createTable({
    id: p.string(), // collectionId:account
    account: p.hex(),
    tokenId: p.bigint(),
    purchaseEvents: p.many('PurchaseEvent.membershipId'),
    grantEvents: p.many('GrantEvent.membershipId'),
    collectionId: p.hex().references('Collection.id'),
    collection: p.one('collectionId'),
    expiresAt: p.bigint(),
    createdAt: p.bigint(),
  }),

  PurchaseEvent: p.createTable({
    id: p.string(),
    chainId: p.int(),
    membershipId: p.string().references('Membership.id'),
    membership: p.one('membershipId'),
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
    membershipId: p.string().references('Membership.id'),
    membership: p.one('membershipId'),
    collectionId: p.hex().references('Collection.id'),
    collection: p.one('collectionId'),
    account: p.hex(),
    tokenId: p.bigint(),
    secondsGranted: p.bigint(),
    expiresAt: p.bigint(),
    timestamp: p.bigint(),
  }),
}))
