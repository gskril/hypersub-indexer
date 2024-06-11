import { useQuery } from '@tanstack/react-query'

import { GraphQLResponse } from '@/lib/types'

export function useSubcriptions() {
  const query = `
    {
      purchaseEvents(
        limit: 500
        orderBy: "timestamp"
        orderDirection: "desc"
      ) {
        items {
          id
          account
          timestamp
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
      const res = await fetch('https://stp-api.gregskril.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      })

      const { data } = (await res.json()) as GraphQLResponse<{
        purchaseEvents: {
          items: {
            id: string
            account: string
            timestamp: string
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

      return data?.purchaseEvents.items || []
    },
  })
}
