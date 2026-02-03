# feature-001: Experiment Search/Filter

## Purpose
Enable users to quickly find experiments by category, tags, or search query.

## Method
- Client-side filtering using React useState and useMemo
- Category buttons for viz/tool/weird
- Tag cloud for multiple tag selection
- Real-time search with text input
- Active filters display with clear option

## Input/Output
- Input: User selects category, clicks tags, or types search query
- Output: Filtered experiment list updates in real-time

## Constraints
- Client-side only (no server requests)
- Must work with existing experiments/index.ts structure
- Responsive design for mobile/desktop
- Empty state when no matches found
