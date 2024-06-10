import { type Address } from 'viem'

import { ponder } from '@/generated'
import { STPv1Abi } from '../abis/STPv1Abi'

ponder.on('STPv1Factory:Deployment', async ({ event, context }) => {
  const { Collection } = context.db
  const { deployment } = event.args

  const functionCalls = [
    'name',
    'symbol',
    'contractURI',
    'erc20Address',
  ] as const

  const [name, symbol, contractURI, erc20Address] = await Promise.all(
    functionCalls.map((functionName) =>
      context.client.readContract({
        address: deployment,
        abi: STPv1Abi,
        functionName,
      })
    )
  )

  const metadata = await fetch(contractURI!)
    .then((res) => res.json())
    .then((data) => {
      return data as {
        image: string
        external_link: string
        description: string
      }
    })

  await Collection.create({
    id: deployment,
    data: {
      chainId: context.network.chainId,
      name: name as string,
      symbol: symbol as string,
      erc20Address: erc20Address as Address,
      contractURI: contractURI as string,
      totalRewardPoints: 0n,
      totalCreatorEarnings: 0n,
      totalReferrerRewards: 0n,
      image: metadata.image,
      externalLink: metadata.external_link,
      description: metadata.description,
      createdAt: event.block.timestamp,
    },
  })
})
