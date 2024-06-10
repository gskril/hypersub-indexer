import { ponder } from '@/generated'

ponder.on('STPv1:Purchase', async ({ event, context }) => {
  const { Collection, Subscription, PurchaseEvent } = context.db
  // prettier-ignore
  const { account, tokenId, tokensTransferred, rewardPoints, expiresAt } = event.args
  const collectionId = event.log.address
  const subscriptionId = `${collectionId}:${account}`

  await PurchaseEvent.create({
    id: event.log.id,
    data: {
      ...event.args,
      subscriptionId,
      chainId: context.network.chainId,
      collectionId,
      timestamp: event.block.timestamp,
    },
  })

  await Subscription.upsert({
    id: subscriptionId,
    create: {
      account,
      tokenId,
      collectionId,
      expiresAt,
      createdAt: event.block.timestamp,
    },
    update: {
      expiresAt: expiresAt,
    },
  })

  await Collection.update({
    id: collectionId,
    data: ({ current }) => ({
      totalRewardPoints: current.totalRewardPoints + rewardPoints,
      totalCreatorEarnings: current.totalCreatorEarnings + tokensTransferred,
    }),
  })
})

ponder.on('STPv1:Grant', async ({ event, context }) => {
  const { GrantEvent, Subscription } = context.db
  const { account, tokenId, expiresAt } = event.args
  const collectionId = event.log.address
  const subscriptionId = `${collectionId}:${account}`

  await GrantEvent.create({
    id: event.log.id,
    data: {
      ...event.args,
      subscriptionId,
      chainId: context.network.chainId,
      collectionId,
      timestamp: event.block.timestamp,
    },
  })

  await Subscription.upsert({
    id: subscriptionId,
    create: {
      account,
      tokenId,
      collectionId,
      expiresAt,
      createdAt: event.block.timestamp,
    },
    update: {
      expiresAt: expiresAt,
    },
  })
})

ponder.on('STPv1:ReferralPayout', async ({ event, context }) => {
  const { Collection } = context.db
  const { rewardAmount } = event.args

  await Collection.update({
    id: event.log.address,
    data: ({ current }) => ({
      totalReferrerRewards: current.totalReferrerRewards + rewardAmount,
    }),
  })
})
