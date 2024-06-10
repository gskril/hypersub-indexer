import { ponder } from '@/generated'

ponder.on('STPv1:Purchase', async ({ event, context }) => {
  const { Collection, Membership, PurchaseEvent } = context.db

  const { account, tokensTransferred, rewardPoints, expiresAt } = event.args

  const collectionId = event.log.address
  const membershipId = `${collectionId}:${account}`

  await PurchaseEvent.create({
    id: event.log.id,
    data: {
      ...event.args,
      membershipId,
      chainId: context.network.chainId,
      collectionId,
      timestamp: event.block.timestamp,
    },
  })

  await Membership.upsert({
    id: membershipId,
    create: {
      account,
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