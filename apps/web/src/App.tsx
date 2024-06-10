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
import { useSubcriptions } from './hooks/useSubscriptions'
import { cn, formatChain, formatTimestamp, truncateAddress } from './lib/utils'

const cardClasses = cn('max-h-[calc(100svh-3rem)] overflow-scroll')

function App() {
  const collections = useCollections()
  const subscriptions = useSubcriptions()

  return (
    <>
      <main className="grid gap-4 p-4 sm:gap-6 sm:p-6 lg:grid-cols-2">
        <Card className={cardClasses}>
          <CardHeader>
            <CardTitle>Subscriptions</CardTitle>
          </CardHeader>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-44 sm:min-w-56">Account</TableHead>
                <TableHead className="min-w-44 sm:min-w-60">
                  Created At
                </TableHead>
                <TableHead className="min-w-56">Collection</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(() => {
                if (subscriptions.data) {
                  return subscriptions.data.map((subscription) => (
                    <TableRow key={subscription.id}>
                      <TableCell>
                        {truncateAddress(subscription.account)}
                      </TableCell>
                      <TableCell>
                        {formatTimestamp(subscription.createdAt)}
                      </TableCell>
                      <TableCell>
                        <a
                          className="hover:opacity-60"
                          href={subscription.collection.externalLink}
                          target="_blank"
                        >
                          {subscription.collection.name} &#8599;
                        </a>
                      </TableCell>
                    </TableRow>
                  ))
                }
              })()}
            </TableBody>
          </Table>
        </Card>

        <Card className={cardClasses}>
          <CardHeader>
            <CardTitle>Collections</CardTitle>
          </CardHeader>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-56">Name</TableHead>
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
                          {collection.name} &#8599;
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
