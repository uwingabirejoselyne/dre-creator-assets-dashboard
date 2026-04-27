import type { Asset } from '../types/asset'
import { AssetCard } from './AssetCard'

interface Props {
  assets: Asset[]
  loading: boolean
  error: string | null
  onSelectAsset: (asset: Asset) => void
  isFiltered?: boolean
  onClearFilters?: () => void
}

export function AssetList({ assets, loading, error, onSelectAsset, isFiltered, onClearFilters }: Props) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-400" role="status">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p>Loading assets…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-red-400" role="alert">
        <p className="text-lg font-semibold mb-1">Something went wrong</p>
        <p className="text-sm">{error}</p>
      </div>
    )
  }

  if (assets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-500">
        <p className="text-lg font-semibold mb-1">
          {isFiltered ? 'No assets match your filters' : 'No assets found'}
        </p>
        <p className="text-sm mb-4">
          {isFiltered ? 'Try a different search term or clear your filters.' : 'Upload your first asset to get started.'}
        </p>
        {isFiltered && onClearFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-indigo-400 hover:text-indigo-300 border border-indigo-500/40 hover:border-indigo-400 px-4 py-2 rounded-lg transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {assets.map((asset) => (
        <AssetCard key={asset.id} asset={asset} onClick={onSelectAsset} />
      ))}
    </div>
  )
}
