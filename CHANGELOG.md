# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Search Input now fires `qld-search-input` custom event as a hook to create custom search behaviour. This is essentially a debounced `input` event with additional payload data.

- Search Input has the following parameters added to its API:
  - `form` - configure the component as a form tag.
  - `searchDelay` control the debounce timer
  - `initialSuggestions` - replaces `defaultSuggestions`
  - `dynamicSuggestions` - configuration for dynamic suggestions
  - `searchParams` - replaces `tags`

- New handlebars helper `stringify` to serialize objects.

### Changed

- Search Input has been rebuilt to decouple hardcoded behaviour which assumed a Funnelback back end. See [Upgrade guide]("UPGRADE.md") for details.

- Header component template now requires parameter `searchInputData` to render a Search input, rather than the prerendered HTML string `searchInput` which was unnecessary overhead for consumers. The new method is more inline with handlebars conventions. See [Upgrade guide]("UPGRADE.md") for details.

<!-- ### Deprecated -->

### Removed

- Search input no longer fires `qld-search-submit` because the standard `submit` already fills this role.

- Search Input has had the following parameters removed from its API:
  - `tags` - use `searchParams` instead
  - `defaultSuggestions` - use `initialSuggestions` instead
  - `hasDynamicSuggestions` - use `dynamicSuggestions` instead
  - `hasDefaultSuggestions` - use `initialSuggestions` instead
  - `dynamicSuggestionsServiceLink` - use `dynamicSuggestions` instead

<!-- ### Fixed -->

<!-- ### Security -->
