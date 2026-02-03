# tool-002: JSON Formatter/Minifier

## Purpose
A utility tool to format (prettify) and minify JSON data with syntax validation.

## Method
- Textarea input for JSON paste
- File drop support for JSON files
- JSON.parse for validation and syntax checking
- JSON.stringify with indentation for formatting
- JSON.stringify without indentation for minification
- Clipboard API for copy functionality

## Input/Output
- Input: Raw JSON string or file drop
- Output: Formatted JSON or minified JSON

## Constraints
- Client-side only (no external APIs)
- Max file size: 1MB for performance
- Single file demo component
- Accessibility: keyboard operable textarea and buttons
