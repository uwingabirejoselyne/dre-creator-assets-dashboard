import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { useAssetFilter } from '../hooks/useAssetFilter'
import type { Asset } from '../types/asset'

const assets: Asset[] = [
  {
    id: '1',
    name: 'Hero Banner',
    type: 'image',
    status: 'active',
    size: 2000000,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
    url: '/hero-banner.png',
    description: 'Main hero banner.',
    tags: ['banner'],
  },
  {
    id: '2',
    name: 'Intro Reel',
    type: 'video',
    status: 'draft',
    size: 50000000,
    createdAt: '2026-02-01T00:00:00Z',
    updatedAt: '2026-02-01T00:00:00Z',
    url: '/intro-reel.mp4',
    description: 'Intro video reel.',
    tags: ['video'],
  },
  {
    id: '3',
    name: 'Brand Guide',
    type: 'document',
    status: 'archived',
    size: 1000000,
    createdAt: '2026-03-01T00:00:00Z',
    updatedAt: '2026-03-01T00:00:00Z',
    url: '/brand-guide.pdf',
    description: 'Brand guidelines document.',
    tags: ['brand'],
  },
]

describe('useAssetFilter', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '/')
  })

  it('returns all assets when no filter is applied', () => {
    const { result } = renderHook(() => useAssetFilter(assets))
    expect(result.current.filtered).toHaveLength(3)
  })

  it('filters assets by search query (case-insensitive)', () => {
    const { result } = renderHook(() => useAssetFilter(assets))
    act(() => result.current.setQuery('hero'))
    expect(result.current.filtered).toHaveLength(1)
    expect(result.current.filtered[0].name).toBe('Hero Banner')
  })

  it('returns no assets when search query matches nothing', () => {
    const { result } = renderHook(() => useAssetFilter(assets))
    act(() => result.current.setQuery('zzznomatch'))
    expect(result.current.filtered).toHaveLength(0)
  })

  it('filters assets by type', () => {
    const { result } = renderHook(() => useAssetFilter(assets))
    act(() => result.current.setTypeFilter('video'))
    expect(result.current.filtered).toHaveLength(1)
    expect(result.current.filtered[0].type).toBe('video')
  })

  it('filters assets by status', () => {
    const { result } = renderHook(() => useAssetFilter(assets))
    act(() => result.current.setStatusFilter('archived'))
    expect(result.current.filtered).toHaveLength(1)
    expect(result.current.filtered[0].status).toBe('archived')
  })

  it('combines search query and type filter', () => {
    const { result } = renderHook(() => useAssetFilter(assets))
    act(() => {
      result.current.setQuery('intro')
      result.current.setTypeFilter('image') // 'Intro Reel' is a video, not image
    })
    expect(result.current.filtered).toHaveLength(0)
  })
})

describe('useAssetFilter — URL state', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '/')
  })

  it('reads initial query from the URL', () => {
    window.history.replaceState(null, '', '/?q=hero')
    const { result } = renderHook(() => useAssetFilter(assets))
    expect(result.current.query).toBe('hero')
    expect(result.current.filtered).toHaveLength(1)
    expect(result.current.filtered[0].name).toBe('Hero Banner')
  })

  it('reads initial type filter from the URL', () => {
    window.history.replaceState(null, '', '/?type=video')
    const { result } = renderHook(() => useAssetFilter(assets))
    expect(result.current.typeFilter).toBe('video')
    expect(result.current.filtered).toHaveLength(1)
    expect(result.current.filtered[0].type).toBe('video')
  })

  it('reads initial status filter from the URL', () => {
    window.history.replaceState(null, '', '/?status=archived')
    const { result } = renderHook(() => useAssetFilter(assets))
    expect(result.current.statusFilter).toBe('archived')
    expect(result.current.filtered).toHaveLength(1)
    expect(result.current.filtered[0].status).toBe('archived')
  })

  it('reads initial sort from the URL', () => {
    window.history.replaceState(null, '', '/?sort=name-asc')
    const { result } = renderHook(() => useAssetFilter(assets))
    expect(result.current.sort).toBe('name-asc')
    // name-asc: Brand Guide < Hero Banner < Intro Reel
    expect(result.current.filtered[0].name).toBe('Brand Guide')
  })

  it('updates the URL when a filter changes', () => {
    const { result } = renderHook(() => useAssetFilter(assets))
    act(() => result.current.setTypeFilter('audio'))
    expect(window.location.search).toContain('type=audio')
  })

  it('removes a param from the URL when filter is reset to default', () => {
    window.history.replaceState(null, '', '/?type=image')
    const { result } = renderHook(() => useAssetFilter(assets))
    act(() => result.current.setTypeFilter('all'))
    expect(window.location.search).not.toContain('type')
  })

  it('ignores unknown values in URL params and falls back to default', () => {
    window.history.replaceState(null, '', '/?type=gif&status=pending')
    const { result } = renderHook(() => useAssetFilter(assets))
    expect(result.current.typeFilter).toBe('all')
    expect(result.current.statusFilter).toBe('all')
  })
})
