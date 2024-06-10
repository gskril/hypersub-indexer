import { useQuery } from '@tanstack/react-query'

import { GraphQLResponse } from '@/lib/types'

export function useCollections() {
  const query = `
    {
      collections(
        limit: 1000
        orderBy: "createdAt"
        orderDirection: "desc"
      ) {
        items {
          id
          name
          symbol
          chainId
          createdAt
          erc20Address
          externalLink
          totalRewardPoints
          totalCreatorEarnings
          totalReferrerRewards
        }
      }
    }
  `

  return useQuery({
    refetchInterval: 5000,
    queryKey: ['collections'],
    queryFn: async () => {
      const res = await fetch('https://hypersub-indexer.up.railway.app/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      })

      const { data } = (await res.json()) as GraphQLResponse<{
        collections: {
          items: {
            id: string
            name: string
            symbol: string
            chainId: number
            createdAt: string
            erc20Address: string
            externalLink: string
            totalRewardPoints: string
            totalCreatorEarnings: string
            totalReferrerRewards: string
          }[]
        }
      }>

      return data?.collections.items || []
    },
  })
}
