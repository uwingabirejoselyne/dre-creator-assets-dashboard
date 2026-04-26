import { useState } from 'react'
import type { NewAssetPayload, AssetType, AssetStatus } from '../types/asset'

interface Props {
  onSubmit: (payload: NewAssetPayload) => void
  onClose: () => void
}

interface FormFields {
  name: string
  type: AssetType | ''
  status: AssetStatus
  description: string
  tags: string
}

interface FormErrors {
  name?: string
  type?: string
  description?: string
}

const ASSET_TYPES: AssetType[] = ['image', 'video', 'audio', 'document']
const ASSET_STATUSES: AssetStatus[] = ['draft', 'active', 'archived']

function validate(fields: FormFields): FormErrors {
  const errors: FormErrors = {}

  if (!fields.name.trim()) {
    errors.name = 'Name is required.'
  } else if (fields.name.trim().length < 3) {
    errors.name = 'Name must be at least 3 characters.'
  }

  if (!fields.type) {
    errors.type = 'Please select an asset type.'
  }

  if (!fields.description.trim()) {
    errors.description = 'Description is required.'
  } else if (fields.description.trim().length < 10) {
    errors.description = 'Description must be at least 10 characters.'
  }

  return errors
}

export function UploadForm({ onSubmit, onClose }: Props) {
  const [fields, setFields] = useState<FormFields>({
    name: '',
    type: '',
    status: 'draft',
    description: '',
    tags: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  function set<K extends keyof FormFields>(key: K, value: FormFields[K]) {
    setFields((prev) => ({ ...prev, [key]: value }))
    // Clear the error for this field as the user types
    if (errors[key as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }))
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate(fields)

    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    const tags = fields.tags
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean)

    onSubmit({
      name: fields.name.trim(),
      type: fields.type as AssetType,
      status: fields.status,
      description: fields.description.trim(),
      tags,
    })

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <>
        <div className="fixed inset-0 bg-black/50 z-20" onClick={onClose} aria-hidden="true" />
        <div className="fixed inset-0 z-30 flex items-center justify-center px-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-md text-center shadow-2xl">
            <div className="w-12 h-12 bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">Asset created</h3>
            <p className="text-sm text-gray-400 mb-6">Your asset has been added to the dashboard.</p>
            <button
              onClick={onClose}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-6 py-2 rounded-lg transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-20" onClick={onClose} aria-hidden="true" />

      {/* Modal */}
      <div className="fixed inset-0 z-30 flex items-center justify-center px-4">
        <div
          className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]"
          role="dialog"
          aria-label="Upload asset"
        >
          {/* Modal header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
            <h2 className="text-base font-semibold text-white">Upload Asset</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-5">
            {/* Name */}
            <div>
              <label className="block text-sm text-gray-300 mb-1" htmlFor="asset-name">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                id="asset-name"
                type="text"
                value={fields.name}
                onChange={(e) => set('name', e.target.value)}
                placeholder="e.g. Campaign Banner Q3"
                className={`w-full bg-gray-800 border rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-700'
                }`}
              />
              {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm text-gray-300 mb-1" htmlFor="asset-type">
                Type <span className="text-red-400">*</span>
              </label>
              <select
                id="asset-type"
                value={fields.type}
                onChange={(e) => set('type', e.target.value as AssetType | '')}
                className={`w-full bg-gray-800 border rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.type ? 'border-red-500' : 'border-gray-700'
                }`}
              >
                <option value="">Select a type…</option>
                {ASSET_TYPES.map((t) => (
                  <option key={t} value={t} className="capitalize">{t}</option>
                ))}
              </select>
              {errors.type && <p className="text-xs text-red-400 mt-1">{errors.type}</p>}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm text-gray-300 mb-1" htmlFor="asset-status">
                Status
              </label>
              <select
                id="asset-status"
                value={fields.status}
                onChange={(e) => set('status', e.target.value as AssetStatus)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {ASSET_STATUSES.map((s) => (
                  <option key={s} value={s} className="capitalize">{s}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm text-gray-300 mb-1" htmlFor="asset-description">
                Description <span className="text-red-400">*</span>
              </label>
              <textarea
                id="asset-description"
                value={fields.description}
                onChange={(e) => set('description', e.target.value)}
                placeholder="Briefly describe this asset…"
                rows={3}
                className={`w-full bg-gray-800 border rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.description ? 'border-red-500' : 'border-gray-700'
                }`}
              />
              {errors.description && <p className="text-xs text-red-400 mt-1">{errors.description}</p>}
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm text-gray-300 mb-1" htmlFor="asset-tags">
                Tags <span className="text-gray-500 text-xs">(comma-separated, optional)</span>
              </label>
              <input
                id="asset-tags"
                type="text"
                value={fields.tags}
                onChange={(e) => set('tags', e.target.value)}
                placeholder="e.g. campaign, banner, q3"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium py-2.5 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
              >
                Create Asset
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
