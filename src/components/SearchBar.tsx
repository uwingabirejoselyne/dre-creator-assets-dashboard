import type { SortOption } from '../hooks/useAssetFilter'

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'Newest first', value: 'date-new' },
  { label: 'Oldest first', value: 'date-old' },
  { label: 'Name A → Z',  value: 'name-asc' },
  { label: 'Name Z → A',  value: 'name-desc' },
]

interface Props {
  value: string
  onChange: (value: string) => void
  sort: SortOption
  onSortChange: (sort: SortOption) => void
}

export function SearchBar({ value, onChange, sort, onSortChange }: Props) {
  return (
    <div className="flex items-center bg-gray-900 border border-gray-700 rounded-lg focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent">
      {/* Search icon */}
      <svg
        className="shrink-0 ml-3 w-4 h-4 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
      </svg>

      {/* Text input */}
      <input
        type="search"
        placeholder="Search assets…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none"
      />

      {/* Divider */}
      <div className="w-px h-5 bg-gray-700 shrink-0" />

      {/* Sort dropdown */}
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        aria-label="Sort assets"
        className="bg-transparent text-gray-400 text-sm pl-3 pr-8 py-2 focus:outline-none cursor-pointer appearance-none"
      >
        {SORT_OPTIONS.map(({ label, value }) => (
          <option key={value} value={value} className="bg-gray-900">{label}</option>
        ))}
      </select>

      {/* Chevron icon for the select */}
      <svg
        className="shrink-0 -ml-6 mr-2 w-3.5 h-3.5 text-gray-500 pointer-events-none"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  )
}
