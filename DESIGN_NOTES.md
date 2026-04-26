# Design Notes

## Architecture

The app uses a flat component structure kept intentionally simple:

- `App.tsx` — layout shell and top-level state
- `components/` — one file per UI concern (AssetList, AssetCard, SearchBar, FilterBar, AssetDetail, UploadForm)
- `data/mockAssets.ts` — mock data and TypeScript types
- `hooks/useAssets.ts` — encapsulates filter/search logic away from render code

## State Flow

All filter and search state lives in `App`. It is passed down as props.
No global state library is needed at this scale.

## Key Decisions

- **Mock API over real backend**: keeps the assessment self-contained and runnable with `npm run dev` only.
- **No router**: a selected asset ID in state drives the detail view. Simple and transparent.
- **Tailwind only**: no component library — keeps styling visible and reviewable.
- **Vitest + Testing Library**: same ecosystem as the app, zero extra config.

## Trade-offs

- Moving to a real API would require replacing `mockAssets.ts` with fetch calls inside `useAssets`.
- A URL-based router (React Router) would improve shareability of deep links but adds complexity not required here.
