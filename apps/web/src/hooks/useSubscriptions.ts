import { useQuery } from '@tanstack/react-query'

import { GraphQLResponse } from '@/lib/types'

export function useSubcriptions() {
  const query = `
    {
      subscriptions(
        limit: 500
        where: {
          expiresAt_gt: "${Math.floor(new Date().getTime() / 1000)}"
        }
        orderBy: "createdAt"
        orderDirection: "desc"
      ) {
        items {
          id
          account
          createdAt
          expiresAt
          collection {
            id
            name
            symbol
            chainId
            externalLink
          }
        }
      }
    }
  `

  return useQuery({
    refetchInterval: 5000,
    queryKey: ['subscriptions'],
    queryFn: async () => {
      const res = await fetch('https://hypersub-indexer.up.railway.app/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      })

      const { data } = (await res.json()) as GraphQLResponse<{
        subscriptions: {
          items: {
            id: string
            account: string
            createdAt: string
            expiresAt: string
            collection: {
              id: string
              name: string
              symbol: string
              chainId: number
              externalLink: string
            }
          }[]
        }
      }>

      return data?.subscriptions.items || []
    },
  })
}
