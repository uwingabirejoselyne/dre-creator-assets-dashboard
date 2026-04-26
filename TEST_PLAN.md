# Test Plan

## Scope

Unit and integration tests using Vitest + Testing Library.

## Test Cases

### 1. Asset List renders correctly
- Renders a list of asset cards from mock data
- Shows a loading spinner while data is loading
- Shows an empty state message when no assets exist
- Shows an error message when loading fails

### 2. Search and Filter
- Filtering by search query returns only matching assets (by name)
- Filtering by type (image/video/audio/document) returns correct subset
- Filtering by status (active/archived/draft) returns correct subset
- Combining search + filter narrows results correctly

### 3. Upload Form validation
- Submitting an empty form shows required field errors
- Submitting with a valid payload calls the handler and resets the form
- File type field only accepts allowed asset types

## Out of Scope

- End-to-end browser tests (Playwright/Cypress) — not required for this assessment
- Network/API mocking — app uses local mock data
