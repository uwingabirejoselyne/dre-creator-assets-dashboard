import type { Asset, AssetType, AssetStatus } from '../types/asset'

interface Props {
  asset: Asset
  onClick: (asset: Asset) => void
}

const TYPE_STYLES: Record<AssetType, string> = {
  image:    'bg-blue-900 text-blue-300',
  video:    'bg-purple-900 text-purple-300',
  audio:    'bg-green-900 text-green-300',
  document: 'bg-yellow-900 text-yellow-300',
}

const STATUS_STYLES: Record<AssetStatus, string> = {
  active:   'bg-emerald-900 text-emerald-300',
  draft:    'bg-gray-700 text-gray-300',
  archived: 'bg-red-900 text-red-300',
}

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function AssetCard({ asset, onClick }: Props) {
  return (
    <button
      onClick={() => onClick(asset)}
      className="w-full text-left bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-indigo-500 hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="font-semibold text-white truncate">{asset.name}</span>
        <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 capitalize ${STATUS_STYLES[asset.status]}`}>
          {asset.status}
        </span>
      </div>

      <p className="text-sm text-gray-400 line-clamp-2 mb-3">{asset.description}</p>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span className={`px-2 py-0.5 rounded-full capitalize ${TYPE_STYLES[asset.type]}`}>
          {asset.type}
        </span>
        <span>{formatBytes(asset.size)}</span>
        <span>{formatDate(asset.updatedAt)}</span>
      </div>
    </button>
  )
}
