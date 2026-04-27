import { useState } from 'react'
import { useAssets } from './hooks/useAssets'
import { useAssetFilter } from './hooks/useAssetFilter'
import { Sidebar } from './components/Sidebar'
import { AssetList } from './components/AssetList'
import { AssetDetail } from './components/AssetDetail'
import { SearchBar } from './components/SearchBar'
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
    sort,
    setSort,
  } = useAssetFilter(allAssets)

  const isFiltered = query !== '' || typeFilter !== 'all' || statusFilter !== 'all'

  function handleClearFilters() {
    setQuery('')
    setTypeFilter('all')
    setStatusFilter('all')
  }

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
    <div className="flex h-screen bg-gray-950 text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        assets={allAssets}
        typeFilter={typeFilter}
        statusFilter={statusFilter}
        onTypeChange={setTypeFilter}
        onStatusChange={setStatusFilter}
      />

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="shrink-0 border-b border-gray-800 px-6 py-3 flex items-center gap-4">
          <div className="flex-1">
            <SearchBar value={query} onChange={setQuery} sort={sort} onSortChange={setSort} />
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {!loading && !error && (
              <span className="text-sm text-gray-500 hidden sm:block">
                {filtered.length} / {allAssets.length} assets
              </span>
            )}
            <button
              onClick={() => setShowUploadForm(true)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
            >
              + Upload Asset
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-6 py-6">
          <h2 className="text-base font-semibold text-gray-300 mb-5">All Assets</h2>
          <AssetList
            assets={filtered}
            loading={loading}
            error={error}
            onSelectAsset={setSelectedAsset}
            isFiltered={isFiltered}
            onClearFilters={handleClearFilters}
          />
        </main>
      </div>

      {/* Detail panel */}
      {selectedAsset && (
        <AssetDetail asset={selectedAsset} onClose={() => setSelectedAsset(null)} />
      )}

      {/* Upload form modal */}
      {showUploadForm && (
        <UploadForm
          onSubmit={handleCreateAsset}
          onClose={() => setShowUploadForm(false)}
        />
      )}
    </div>
  )
}

export default App
