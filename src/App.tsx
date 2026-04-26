import { useState } from 'react'
import { useAssets } from './hooks/useAssets'
import { useAssetFilter } from './hooks/useAssetFilter'
import { AssetList } from './components/AssetList'
import { AssetDetail } from './components/AssetDetail'
import { SearchBar } from './components/SearchBar'
import { FilterBar } from './components/FilterBar'
import { UploadForm } from './components/UploadForm'
import type { Asset, NewAssetPayload } from './types/asset'

function App() {
  const { assets: fetchedAssets, loading, error } = useAssets()
  const [extraAssets, setExtraAssets] = useState<Asset[]>([])
  const allAssets = [...fetchedAssets, ...extraAssets]

  const {
    filtered,
    query,
    setQuery,
    typeFilter,
    setTypeFilter,
    statusFilter,
    setStatusFilter,
  } = useAssetFilter(allAssets)

  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [showUploadForm, setShowUploadForm] = useState(false)

  function handleCreateAsset(payload: NewAssetPayload) {
    const newAsset: Asset = {
      ...payload,
      id: crypto.randomUUID(),
      size: 0,
      url: `/assets/${payload.name.toLowerCase().replace(/\s+/g, '-')}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setExtraAssets((prev) => [newAsset, ...prev])
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-indigo-400">DRE Creator Assets</h1>
          <p className="text-xs text-gray-500 mt-0.5">Digital Realm Entertainment</p>
        </div>
        <button
          onClick={() => setShowUploadForm(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
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
              {filtered.length} of {allAssets.length} assets
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

      {/* Detail panel */}
      {selectedAsset && (
        <AssetDetail asset={selectedAsset} onClose={() => setSelectedAsset(null)} />
      )}

      {/* Upload form modal */}
      {showUploadForm && (
        <UploadForm
          onSubmit={(payload) => {
            handleCreateAsset(payload)
          }}
          onClose={() => setShowUploadForm(false)}
        />
      )}
    </div>
  )
}

export default App
