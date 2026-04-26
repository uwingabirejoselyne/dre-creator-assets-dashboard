import type { Asset, AssetType, AssetStatus } from '../types/asset'

interface Props {
  asset: Asset
  onClose: () => void
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
    month: 'long',
    day: 'numeric',
  })
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-gray-500 uppercase tracking-wide">{label}</span>
      <span className="text-sm text-gray-200">{value}</span>
    </div>
  )
}

export function AssetDetail({ asset, onClose }: Props) {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-20"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        className="fixed right-0 top-0 h-full w-full max-w-md bg-gray-900 border-l border-gray-800 z-30 flex flex-col shadow-2xl"
        role="dialog"
        aria-label="Asset details"
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <h2 className="text-base font-semibold text-white truncate pr-4">{asset.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors shrink-0"
            aria-label="Close detail panel"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Panel body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">
          {/* Badges */}
          <div className="flex gap-2">
            <span className={`text-xs px-3 py-1 rounded-full capitalize ${TYPE_STYLES[asset.type]}`}>
              {asset.type}
            </span>
            <span className={`text-xs px-3 py-1 rounded-full capitalize ${STATUS_STYLES[asset.status]}`}>
              {asset.status}
            </span>
          </div>

          {/* Description */}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Description</p>
            <p className="text-sm text-gray-300 leading-relaxed">{asset.description}</p>
          </div>

          {/* Tags */}
          {asset.tags.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Tags</p>
              <div className="flex flex-wrap gap-2">
                {asset.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-800 text-gray-300 border border-gray-700 px-2 py-1 rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Meta */}
          <div className="grid grid-cols-2 gap-4">
            <DetailRow label="Size" value={formatBytes(asset.size)} />
            <DetailRow label="Created" value={formatDate(asset.createdAt)} />
            <DetailRow label="Last updated" value={formatDate(asset.updatedAt)} />
            <DetailRow label="ID" value={asset.id} />
          </div>

          {/* URL */}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">File path</p>
            <code className="text-xs bg-gray-800 text-indigo-300 px-3 py-2 rounded-md block break-all">
              {asset.url}
            </code>
          </div>
        </div>
      </aside>
    </>
  )
}
