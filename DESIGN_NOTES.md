# Design Notes

## Architecture

The app uses a flat component structure kept intentionally simple:

- `App.tsx` — layout shell and top-level state
- `components/` — one file per UI concern (AssetList, AssetCard, SearchBar, Sidebar, AssetDetail, UploadForm)
- `data/mockAssets.ts` — static mock data consumed by the MSW handler
- `hooks/useAssets.ts` — fetches assets from the mock API (`GET /api/assets`)
- `hooks/useAssetFilter.ts` — filter, search, sort logic with URL sync
- `mocks/` — MSW handlers, browser worker, and Node server for tests

## State Flow

All filter, search, and sort state lives in `useAssetFilter`. It is returned to `App` and passed down as props. No global state library is needed at this scale.

## Key Decisions

- **Mock API (MSW) over static imports**: MSW intercepts real `fetch` calls at the network level, making the data layer swappable with a real API endpoint without touching hook or component code.
- **URL-persisted filter state**: search query, type, status, and sort are reflected in the URL via `window.history.replaceState`. This makes filters shareable as links and survivable across page refreshes. No router dependency was needed — `replaceState` and `URLSearchParams` are enough.
- **Sort in SearchBar**: the sort dropdown is embedded inside the search bar as one unified control since both are "how do I find/order things" concerns. This keeps the header uncluttered.
- **Context-aware empty state**: `AssetList` receives `isFiltered` and `onClearFilters` props. When filters are active and produce no results, it shows a targeted message and a "Clear filters" button rather than a generic "no data" screen.
- **No router**: a selected asset ID in state drives the detail panel. Simple and transparent.
- **Tailwind only**: no component library — keeps styling visible and reviewable.
- **Vitest + Testing Library**: same ecosystem as the app, zero extra config.

## Trade-offs

- `replaceState` keeps URL sync simple but means the browser back button does not step through filter history. A full router (e.g. React Router) would support that but adds complexity not required here.
- New assets created via the upload form live only in React state (`extraAssets`). They are lost on refresh. Persisting them would require a `POST /api/assets` MSW handler and server-side storage.
