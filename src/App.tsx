import { useState } from 'react'
import { useAssets } from './hooks/useAssets'
import { useAssetFilter } from './hooks/useAssetFilter'
import { AssetList } from './components/AssetList'
import { SearchBar } from './components/SearchBar'
import { FilterBar } from './components/FilterBar'
import type { Asset } from './types/asset'

function App() {
  const { assets, loading, error } = useAssets()
  const {
    filtered,
    query,
    setQuery,
    typeFilter,
    setTypeFilter,
    statusFilter,
    setStatusFilter,
  } = useAssetFilter(assets)

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
        {/* Search + Filter toolbar */}
        <div className="flex flex-col gap-4 mb-6">
          <SearchBar value={query} onChange={setQuery} />
          <FilterBar
            typeFilter={typeFilter}
            statusFilter={statusFilter}
            onTypeChange={setTypeFilter}
            onStatusChange={setStatusFilter}
          />
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-100">All Assets</h2>
          {!loading && !error && (
            <span className="text-sm text-gray-500">
              {filtered.length} of {assets.length} assets
            </span>
          )}
        </div>

        <AssetList
          assets={filtered}
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
