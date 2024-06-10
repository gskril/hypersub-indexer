import { useCollections } from './hooks/useCollections'
import { useSubcriptions } from './hooks/useSubscriptions'

function App() {
  const collections = useCollections()
  const subscriptions = useSubcriptions()

  return (
    <>
      <main>
        <p>hi</p>
      </main>
    </>
  )
}

export default App
