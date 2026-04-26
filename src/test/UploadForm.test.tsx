import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { UploadForm } from '../components/UploadForm'

function renderForm(onSubmit = vi.fn(), onClose = vi.fn()) {
  render(<UploadForm onSubmit={onSubmit} onClose={onClose} />)
}

describe('UploadForm', () => {
  it('shows required field errors when submitted empty', async () => {
    renderForm()
    await userEvent.click(screen.getByRole('button', { name: /create asset/i }))
    expect(screen.getByText(/name is required/i)).toBeInTheDocument()
    expect(screen.getByText(/please select an asset type/i)).toBeInTheDocument()
    expect(screen.getByText(/description is required/i)).toBeInTheDocument()
  })

  it('shows an error when name is shorter than 3 characters', async () => {
    renderForm()
    await userEvent.type(screen.getByLabelText(/name/i), 'AB')
    await userEvent.click(screen.getByRole('button', { name: /create asset/i }))
    expect(screen.getByText(/at least 3 characters/i)).toBeInTheDocument()
  })

  it('shows an error when description is shorter than 10 characters', async () => {
    renderForm()
    await userEvent.type(screen.getByLabelText(/description/i), 'Too short')
    await userEvent.click(screen.getByRole('button', { name: /create asset/i }))
    expect(screen.getByText(/at least 10 characters/i)).toBeInTheDocument()
  })

  it('calls onSubmit with correct payload when form is valid', async () => {
    const onSubmit = vi.fn()
    renderForm(onSubmit)

    await userEvent.type(screen.getByLabelText(/name/i), 'My New Asset')
    await userEvent.selectOptions(screen.getByLabelText(/type/i), 'image')
    await userEvent.type(
      screen.getByLabelText(/description/i),
      'This is a valid description for the asset.',
    )
    await userEvent.type(screen.getByLabelText(/tags/i), 'design, campaign')

    await userEvent.click(screen.getByRole('button', { name: /create asset/i }))

    expect(onSubmit).toHaveBeenCalledOnce()
    expect(onSubmit).toHaveBeenCalledWith({
      name: 'My New Asset',
      type: 'image',
      status: 'draft',
      description: 'This is a valid description for the asset.',
      tags: ['design', 'campaign'],
    })
  })

  it('shows success screen after valid submission', async () => {
    renderForm()
    await userEvent.type(screen.getByLabelText(/name/i), 'My New Asset')
    await userEvent.selectOptions(screen.getByLabelText(/type/i), 'video')
    await userEvent.type(
      screen.getByLabelText(/description/i),
      'A valid description that is long enough.',
    )
    await userEvent.click(screen.getByRole('button', { name: /create asset/i }))
    expect(screen.getByText(/asset created/i)).toBeInTheDocument()
  })
})
