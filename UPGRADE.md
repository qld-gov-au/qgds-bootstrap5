# Upgrade guide

## [Unreleased]

### Search input updates

Search Input has the following parameters added to its API:

- `form` - configure the component as a form tag.
- `searchDelay` control the debounce timer
- `initialSuggestions` - replaces `defaultSuggestions`
- `dynamicSuggestions` - configuration for dynamic suggestions
- `searchParams` - replaces `tags`

Search Input has had the following parameters removed from its API:

- `tags` - use `searchParams` instead
- `defaultSuggestions` - use `initialSuggestions` instead
- `hasDynamicSuggestions` - use `dynamicSuggestions` instead
- `hasDefaultSuggestions` - use `initialSuggestions` instead
- `dynamicSuggestionsServiceLink` - use `dynamicSuggestions` instead

#### Use of a `<form>` element

A Search input may now be rendered as form, removing the need to add you own form markup around the component. While technically it should remain compatible with any wrapping form element, it is recommended to configure the Search input as a form element.

Example data to include in configuration

```json
"form": {
    "action": "https://uat.forgov.qld.gov.au/search",
    "method": "GET"
},
"searchParams": {
    "collection": "ssqld~sp-search",
    "profile": "qld",
    "numranks": "10",
    "tiers": "off"
}
```

Once configured, you should remove any `<form>` and associated hidden `<input>` elements as these are now handled within the Search input template itself.

#### Default suggestions

Use the following guide if your current implementation relies on displaying suggestions in the provided dropdown.

`defaultSuggestions` are now `initialSuggestions`, with a different type definition. Whereas `defaultSuggestions` contained `popularServices` and `categories`, the new `initialSuggestions` is an array of generic `SuggestionGroup` objects.

```ts
type SuggestionGroup = {
  groupLabel: string;
  viewMoreLabel: string;
  viewMoreHref: string;
  items: Array<{
    label: string;
    href: string;
  }>;
};

type InitialSuggestions = SuggestionGroup[] | SuggestionGroup;
```

And so this example `defaultSuggestions` object:

```json
"defaultSuggestions": {
    "popularServicesTitle": "Popular",
    "popularServicesLink": {
        "label": "View more",
        "href": "/queenslanders"
    },
    "popularServices": [
        {
            "title": "Apply for leave now",
            "link": "https://www.forgov.qld.gov.au/submit-a-leave-application"
        },
        {
            ... etc
        }
    ],
    "categoriesTitle": "Featured",
    "categoriesLink": {
      "label": "Find out more",
      "href": "/featured",
    },
    "categories": [
        {
            "title": "Search for directives, policies, circulars, and guidelines",
            "link": "https://www.forgov.qld.gov.au/directives-policies-circulars-and-guidelines"
        },
        {
            ...etc
        }
    ]
}
```

Would become this:

```json
"initialSuggestions": [
    {
        "groupLabel": "Popular",
        "viewMoreLabel": "View more",
        "viewMoreHref": "/queenslanders",
        "items": [
            {
                "label": "Apply for leave now",
                "href": "https://www.forgov.qld.gov.au/submit-a-leave-application"
            },
            {
                ...etc
            },
        ]
    },
    {
        "groupLabel": "Featured",
        "viewMoreLabel": "Find out more",
        "viewMoreHref": "/featured",
        "items": [
            {
                "label": "Search for directives, policies, circulars, and guidelines",
                "href": "https://www.forgov.qld.gov.au/directives-policies-circulars-and-guidelines"
            },
            {
                ... etc
            }
        ]
    }
]
```

#### Dynamic suggestions

Previously default dynamic suggestions functionality was based on CSS class `.site-search`. This has been removed completely in favor of specific configuration option `dynamicSuggestions`.

Example:

```json
"dynamicSuggestions": {
    "useDefaultHandler": true,
    "autocomplete": {
      "endpoint": "https://search.qld.gov.au/s/suggest.json?collection=ssqld~sp-search&profile=qld&fmt=json&alpha=0.5",
      "itemLimit": 4
    },
    "searchResults": {
      "endpoint": "https://search.qld.gov.au/s/search.json?collection=ssqld~sp-search&profile=qld",
      "groupLabel": "Related services",
      "viewMoreHref": "https://www.qld.gov.au/services",
      "viewMoreLabel": "View more",
      "itemLimit": 4
    }
}
```

#### Header search

The Header hbs template previously required a prerendered Search input HTML string as `searchInput` parameter. This has been removed in favor of a `searchInputData` so the Header can be responsible for all rendering. `searchInputData` is a full configuration object for the searchInput component. Also removed from Header API:

- `assets` - configure `searchInputData` instead.
