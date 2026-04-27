import { useEffect, useState } from 'react'
import type { Asset } from '../types/asset'

interface UseAssetsResult {
  assets: Asset[]
  loading: boolean
  error: string | null
}

export function useAssets(): UseAssetsResult {
  const [assets, setAssets] = useState<Asset[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetch('/api/assets')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok')
        return res.json() as Promise<Asset[]>
      })
      .then((data) => setAssets(data))
      .catch(() => setError('Failed to load assets. Please try again.'))
      .finally(() => setLoading(false))
  }, [])

  return { assets, loading, error }
}
