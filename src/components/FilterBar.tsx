import type { TypeFilter, StatusFilter } from '../hooks/useAssetFilter'
import type { AssetType, AssetStatus } from '../types/asset'

interface Props {
  typeFilter: TypeFilter
  statusFilter: StatusFilter
  onTypeChange: (value: TypeFilter) => void
  onStatusChange: (value: StatusFilter) => void
}

const TYPE_OPTIONS: { label: string; value: TypeFilter }[] = [
  { label: 'All Types', value: 'all' },
  { label: 'Image',     value: 'image' },
  { label: 'Video',     value: 'video' },
  { label: 'Audio',     value: 'audio' },
  { label: 'Document',  value: 'document' },
]

const STATUS_OPTIONS: { label: string; value: StatusFilter }[] = [
  { label: 'All Status', value: 'all' },
  { label: 'Active',     value: 'active' },
  { label: 'Draft',      value: 'draft' },
  { label: 'Archived',   value: 'archived' },
]

function PillGroup<T extends string>({
  options,
  active,
  onChange,
}: {
  options: { label: string; value: T }[]
  active: T
  onChange: (value: T) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
            active === value
              ? 'bg-indigo-600 border-indigo-600 text-white'
              : 'bg-transparent border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export function FilterBar({ typeFilter, statusFilter, onTypeChange, onStatusChange }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <PillGroup<TypeFilter>
        options={TYPE_OPTIONS}
        active={typeFilter}
        onChange={onTypeChange}
      />
      <div className="hidden sm:block w-px bg-gray-800 self-stretch" />
      <PillGroup<StatusFilter>
        options={STATUS_OPTIONS}
        active={statusFilter}
        onChange={onStatusChange}
      />
    </div>
  )
}
