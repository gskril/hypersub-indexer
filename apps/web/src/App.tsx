import { Card, CardHeader, CardTitle } from './components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './components/ui/table'
import { useCollections } from './hooks/useCollections'
import { useEnsNames } from './hooks/useEnsNames'
import { useSubcriptions } from './hooks/useSubscriptions'
import {
  createEtherscanLink,
  formatChain,
  formatTimestamp,
  truncateAddress,
} from './lib/utils'

function App() {
  const collections = useCollections()
  const subscriptions = useSubcriptions()
  const { data: ensNames } = useEnsNames(
    subscriptions.data?.map((s) => s.account)
  )

  return (
    <>
      <main className="grid gap-4 p-4 sm:gap-6 sm:p-6 lg:grid-cols-2">
        <Card className="max-h-[calc(100svh-3rem)] overflow-scroll">
          <CardHeader>
            <CardTitle>Subscriptions</CardTitle>
          </CardHeader>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-44 sm:min-w-56">
                  Account &#8599;
                </TableHead>
                <TableHead className="min-w-44 sm:min-w-60">
                  Created At
                </TableHead>
                <TableHead className="min-w-56">Collection &#8599;</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(() => {
                if (subscriptions.data) {
                  return subscriptions.data.map((subscription) => {
                    const { account, timestamp, collection } = subscription
                    const ensName = ensNames?.get(subscription.account)

                    return (
                      <TableRow key={subscription.id}>
                        <TableCell>
                          <a
                            className="hover:opacity-60"
                            href={createEtherscanLink(
                              collection.chainId,
                              account
                            )}
                            target="_blank"
                          >
                            {ensName && ensName.length < 20
                              ? ensName
                              : truncateAddress(account)}
                          </a>
                        </TableCell>
                        <TableCell>{formatTimestamp(timestamp)}</TableCell>
                        <TableCell>
                          <a
                            className="hover:opacity-60"
                            href={collection.externalLink}
                            target="_blank"
                          >
                            {collection.name}
                          </a>
                        </TableCell>
                      </TableRow>
                    )
                  })
                }
              })()}
            </TableBody>
          </Table>
        </Card>

        <Card className="max-h-[calc(100svh-3rem)] overflow-scroll">
          <CardHeader>
            <CardTitle>Collections</CardTitle>
          </CardHeader>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-56">Name &#8599;</TableHead>
                <TableHead className="min-w-48 sm:min-w-56">
                  Created At
                </TableHead>
                <TableHead className="min-w-32 sm:min-w-48">Chain</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(() => {
                if (collections.data) {
                  return collections.data.map((collection) => (
                    <TableRow key={collection.id}>
                      <TableCell>
                        <a
                          className="hover:opacity-60"
                          href={collection.externalLink}
                          target="_blank"
                        >
                          {collection.name}
                        </a>
                      </TableCell>
                      <TableCell>
                        {formatTimestamp(collection.createdAt)}
                      </TableCell>
                      <TableCell>{formatChain(collection.chainId)}</TableCell>
                    </TableRow>
                  ))
                }
              })()}
            </TableBody>
          </Table>
        </Card>
      </main>
    </>
  )
}

export default App
