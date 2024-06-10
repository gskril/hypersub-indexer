import { useQuery } from '@tanstack/react-query'

import { breakIntoBatch, truncateAddress } from '@/lib/utils'

export function useEnsNames(addresses: string[] | undefined) {
  return useQuery({
    queryKey: ['ens-names', addresses?.map(truncateAddress)],
    queryFn: async () => {
      if (!addresses || addresses.length === 0) return new Map()

      const batches = breakIntoBatch(addresses, 100)

      const names = await Promise.all(
        batches.map(async (batch) => {
          const res = await fetch(
            'https://ens-api.gregskril.com/batch/addresses',
            {
              method: 'POST',
              body: JSON.stringify({ addresses: batch }),
            }
          )

          const names = (await res.json()) as string[]
          const nameWithAddress = names.map((name, i) => ({
            name,
            address: batch[i],
          }))

          return nameWithAddress
        })
      )

      // Return it as a map with the address as the key and the potential name as the value
      const nameMap = names.flat().reduce((acc, { address, name }) => {
        acc.set(address, name)
        return acc
      }, new Map<string, string>())

      return nameMap
    },
  })
}
