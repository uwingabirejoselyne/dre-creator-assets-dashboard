import type { TypeFilter, StatusFilter } from '../hooks/useAssetFilter'
import type { Asset, AssetType, AssetStatus } from '../types/asset'

interface Props {
  assets: Asset[]
  typeFilter: TypeFilter
  statusFilter: StatusFilter
  onTypeChange: (value: TypeFilter) => void
  onStatusChange: (value: StatusFilter) => void
}

const TYPE_OPTIONS: { label: string; value: TypeFilter; icon: string }[] = [
  { label: 'All Types', value: 'all',      icon: '◈' },
  { label: 'Image',     value: 'image',    icon: '🖼' },
  { label: 'Video',     value: 'video',    icon: '▶' },
  { label: 'Audio',     value: 'audio',    icon: '♪' },
  { label: 'Document',  value: 'document', icon: '📄' },
]

const STATUS_OPTIONS: { label: string; value: StatusFilter; dot: string }[] = [
  { label: 'All',      value: 'all',      dot: 'bg-gray-500' },
  { label: 'Active',   value: 'active',   dot: 'bg-emerald-400' },
  { label: 'Draft',    value: 'draft',    dot: 'bg-gray-400' },
  { label: 'Archived', value: 'archived', dot: 'bg-red-400' },
]

function countByType(assets: Asset[], type: AssetType): number {
  return assets.filter((a) => a.type === type).length
}

function countByStatus(assets: Asset[], status: AssetStatus): number {
  return assets.filter((a) => a.status === status).length
}

export function Sidebar({ assets, typeFilter, statusFilter, onTypeChange, onStatusChange }: Props) {
  return (
    <aside className="w-60 shrink-0 bg-gray-900 border-r border-gray-800 flex flex-col h-screen sticky top-0">
      {/* Branding */}
      <div className="px-5 py-5 border-b border-gray-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            D
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-tight">DRE Creator</p>
            <p className="text-xs text-gray-500 leading-tight">Assets Dashboard</p>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-6">

        {/* Nav */}
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-widest px-2 mb-2">Navigation</p>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-indigo-600/20 text-indigo-400 text-sm font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            All Assets
          </button>
        </div>

        {/* Type filter */}
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-widest px-2 mb-2">Type</p>
          <div className="flex flex-col gap-0.5">
            {TYPE_OPTIONS.map(({ label, value, icon }) => {
              const count = value === 'all' ? assets.length : countByType(assets, value as AssetType)
              return (
                <button
                  key={value}
                  onClick={() => onTypeChange(value)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    typeFilter === value
                      ? 'bg-indigo-600/20 text-indigo-300'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-base leading-none">{icon}</span>
                    {label}
                  </span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-md ${
                    typeFilter === value ? 'bg-indigo-600/30 text-indigo-300' : 'bg-gray-800 text-gray-500'
                  }`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Status filter */}
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-widest px-2 mb-2">Status</p>
          <div className="flex flex-col gap-0.5">
            {STATUS_OPTIONS.map(({ label, value, dot }) => {
              const count = value === 'all' ? assets.length : countByStatus(assets, value as AssetStatus)
              return (
                <button
                  key={value}
                  onClick={() => onStatusChange(value)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    statusFilter === value
                      ? 'bg-indigo-600/20 text-indigo-300'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className={`w-2 h-2 rounded-full ${dot}`} />
                    {label}
                  </span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-md ${
                    statusFilter === value ? 'bg-indigo-600/30 text-indigo-300' : 'bg-gray-800 text-gray-500'
                  }`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-gray-800">
        <p className="text-xs text-gray-600 leading-snug">
          Digital Realm Entertainment<br />
          <span className="text-gray-700">v1.0 · 2026</span>
        </p>
      </div>
    </aside>
  )
}
