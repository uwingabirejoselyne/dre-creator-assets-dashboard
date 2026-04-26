import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { AssetList } from '../components/AssetList'
import type { Asset } from '../types/asset'

const mockAsset: Asset = {
  id: '1',
  name: 'Test Banner',
  type: 'image',
  status: 'active',
  size: 1024000,
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-01-02T00:00:00Z',
  url: '/assets/test-banner.png',
  description: 'A test asset for the dashboard.',
  tags: ['test'],
}

describe('AssetList', () => {
  it('shows a loading spinner while loading', () => {
    render(
      <AssetList assets={[]} loading={true} error={null} onSelectAsset={vi.fn()} />,
    )
    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.getByText(/loading assets/i)).toBeInTheDocument()
  })

  it('shows an error message when loading fails', () => {
    render(
      <AssetList
        assets={[]}
        loading={false}
        error="Failed to load assets. Please try again."
        onSelectAsset={vi.fn()}
      />,
    )
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText(/failed to load assets/i)).toBeInTheDocument()
  })

  it('shows an empty state when there are no assets', () => {
    render(
      <AssetList assets={[]} loading={false} error={null} onSelectAsset={vi.fn()} />,
    )
    expect(screen.getByText(/no assets found/i)).toBeInTheDocument()
  })

  it('renders an asset card for each asset', () => {
    const assets = [mockAsset, { ...mockAsset, id: '2', name: 'Second Asset' }]
    render(
      <AssetList assets={assets} loading={false} error={null} onSelectAsset={vi.fn()} />,
    )
    expect(screen.getByText('Test Banner')).toBeInTheDocument()
    expect(screen.getByText('Second Asset')).toBeInTheDocument()
  })

  it('calls onSelectAsset with the correct asset when a card is clicked', async () => {
    const onSelect = vi.fn()
    render(
      <AssetList assets={[mockAsset]} loading={false} error={null} onSelectAsset={onSelect} />,
    )
    await userEvent.click(screen.getByText('Test Banner'))
    expect(onSelect).toHaveBeenCalledWith(mockAsset)
  })
})
