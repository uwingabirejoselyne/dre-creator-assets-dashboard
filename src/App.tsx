import { useState } from 'react'
import { useAssets } from './hooks/useAssets'
import { AssetList } from './components/AssetList'
import type { Asset } from './types/asset'

function App() {
  const { assets, loading, error } = useAssets()
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-indigo-400">DRE Creator Assets</h1>
          <p className="text-xs text-gray-500 mt-0.5">Digital Realm Entertainment</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          + Upload Asset
        </button>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-100">All Assets</h2>
          {!loading && !error && (
            <span className="text-sm text-gray-500">{assets.length} assets</span>
          )}
        </div>

        <AssetList
          assets={assets}
          loading={loading}
          error={error}
          onSelectAsset={setSelectedAsset}
        />
      </main>

      {/* Temp: show selected asset name */}
      {selectedAsset && (
        <p className="fixed bottom-4 right-4 bg-gray-800 text-white text-sm px-4 py-2 rounded-lg shadow">
          Selected: {selectedAsset.name}
        </p>
      )}
    </div>
  )
}

export default App
