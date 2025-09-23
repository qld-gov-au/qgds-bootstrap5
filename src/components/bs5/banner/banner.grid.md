# Banner Grid Layout Dev Notes

## Mobile (default):

```
|-----------------------------|
| .banner-breadcrumbs         | grid-row: 1 / 2
|-----------------------------|
| .banner-image               | grid-row: 2 / 3
|-----------------------------|
| .banner-content             | grid-row: 3 / 4
|-----------------------------|
```

## Desktop with image (768px and above):

```
|------------------------|---------------------|
| .banner-breadcrumbs    |                     |
| (grid-row 1 / 2)       |                     |
|------------------------|  .banner-image      |
| .banner-content        |  (grid-row: 1 / 3)  |
| (grid-row: 2 / 3)      |                     |
|------------------------|---------------------|
```
