# Test Plan

## Scope

Unit and integration tests using Vitest + Testing Library.

## Test Cases

### 1. Asset List renders correctly
- Renders a list of asset cards from mock data
- Shows a loading spinner while data is loading
- Shows a generic empty state when no assets exist and no filters are active
- Shows a filtered empty state with a "Clear filters" button when filters are active
- Clicking "Clear filters" calls the reset handler
- Shows an error message when loading fails

### 2. Search and Filter
- Filtering by search query returns only matching assets (by name, case-insensitive)
- Filtering by type (image/video/audio/document) returns correct subset
- Filtering by status (active/archived/draft) returns correct subset
- Combining search + filter narrows results correctly

### 3. URL State Persistence
- Initial query (`?q=`) is read from the URL on mount and filters results
- Initial type filter (`?type=`) is read from the URL on mount
- Initial status filter (`?status=`) is read from the URL on mount
- Initial sort (`?sort=`) is read from the URL on mount and orders results
- Changing a filter updates the URL via `replaceState`
- Resetting a filter to its default removes that param from the URL
- Unknown or invalid URL param values fall back to defaults silently

### 4. Upload Form validation
- Submitting an empty form shows required field errors
- Submitting with a valid payload calls the handler and shows success state
- File type field only accepts allowed asset types

## Out of Scope

- End-to-end browser tests (Playwright/Cypress) — not required for this assessment
