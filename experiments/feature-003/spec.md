# feature-003: Experiment Favorites (localStorage)

## Purpose
Allow users to bookmark their favorite experiments for quick access.

## Method
- Star button on each experiment card
- localStorage for persistent storage
- Filter tabs: All / Favorites
- Empty state UI when no favorites

## Input/Output
- Input: User clicks star button
- Output: Favorites list saved to localStorage, UI updates

## Constraints
- Client-side only (localStorage)
- No external APIs
- Accessible UI (ARIA labels)
